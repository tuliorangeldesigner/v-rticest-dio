import { createContext, ReactNode, useContext, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { enToPt, ptToEn, TranslationDictionary } from './translations';

export type Language = 'pt' | 'en';

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
};

const STORAGE_KEY = 'tr-designer-language';
const LanguageContext = createContext<LanguageContextValue | null>(null);

const normalizeText = (value: string) => value.replace(/\s+/g, ' ').trim();

const preserveOuterSpacing = (source: string, replacement: string) => {
  const leading = source.match(/^\s*/)?.[0] ?? '';
  const trailing = source.match(/\s*$/)?.[0] ?? '';
  return `${leading}${replacement}${trailing}`;
};

const shouldSkipNode = (node: Node) => {
  const parent = node.parentElement;
  if (!parent) return true;
  return Boolean(parent.closest('script, style, noscript, code, pre, [data-no-translate]'));
};

const translateTextNode = (node: Text, dictionary: TranslationDictionary) => {
  const current = node.nodeValue ?? '';
  const normalized = normalizeText(current);
  if (!normalized) return;

  const replacement = dictionary[normalized];
  if (!replacement || replacement === normalized) return;

  node.nodeValue = preserveOuterSpacing(current, replacement);
};

const translateAttributes = (root: ParentNode, dictionary: TranslationDictionary) => {
  const attributes = ['aria-label', 'placeholder', 'title', 'alt'];
  const selector = attributes.map((attribute) => `[${attribute}]`).join(',');
  const elements = [
    ...(root instanceof HTMLElement && root.matches(selector) ? [root] : []),
    ...Array.from(root.querySelectorAll<HTMLElement>(selector)),
  ];

  elements.forEach((element) => {
    if (element.closest('[data-no-translate]')) return;

    attributes.forEach((attribute) => {
      const value = element.getAttribute(attribute);
      if (!value) return;

      const replacement = dictionary[normalizeText(value)];
      if (replacement) {
        element.setAttribute(attribute, replacement);
      }
    });
  });
};

const translateDocumentMetadata = (dictionary: TranslationDictionary) => {
  const translatedTitle = dictionary[normalizeText(document.title)];
  if (translatedTitle) {
    document.title = translatedTitle;
  }

  document
    .querySelectorAll<HTMLMetaElement>(
      'meta[name="description"], meta[property="og:title"], meta[property="og:description"], meta[name="twitter:title"], meta[name="twitter:description"]'
    )
    .forEach((meta) => {
      const content = meta.getAttribute('content');
      if (!content) return;

      const replacement = dictionary[normalizeText(content)];
      if (replacement) {
        meta.setAttribute('content', replacement);
      }
    });
};

const getDictionary = (language: Language) => (language === 'en' ? ptToEn : enToPt);

const translateTree = (root: Node, language: Language) => {
  const dictionary = language === 'en' ? ptToEn : enToPt;

  if (root.nodeType === Node.TEXT_NODE) {
    translateTextNode(root as Text, dictionary);
    return;
  }

  if (!(root instanceof Document || root instanceof DocumentFragment || root instanceof Element)) {
    return;
  }

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => (shouldSkipNode(node) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
  });

  let current = walker.nextNode();
  while (current) {
    translateTextNode(current as Text, dictionary);
    current = walker.nextNode();
  }

  translateAttributes(root, dictionary);
};

const translateDocument = (language: Language) => {
  const dictionary = getDictionary(language);

  translateTree(document.body, language);
  translateDocumentMetadata(dictionary);
};

const readInitialLanguage = (): Language => {
  if (typeof window === 'undefined') return 'pt';

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === 'en' || stored === 'pt' ? stored : 'pt';
  } catch {
    return 'pt';
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(readInitialLanguage);
  const isTranslatingRef = useRef(false);
  const idleRef = useRef<number | null>(null);
  const pendingRootsRef = useRef<Set<Node>>(new Set());
  const pendingMetadataRef = useRef(false);

  const commitLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    if (typeof window === 'undefined') return;

    try {
      window.localStorage.setItem(STORAGE_KEY, nextLanguage);
    } catch {
      // localStorage can be unavailable in privacy modes.
    }
  };

  const applyLanguage = (roots?: Node[]) => {
    if (typeof document === 'undefined') return;

    isTranslatingRef.current = true;
    document.documentElement.lang = language === 'en' ? 'en' : 'pt-BR';
    document.documentElement.dataset.language = language;

    if (roots?.length) {
      roots.forEach((root) => translateTree(root, language));
      if (pendingMetadataRef.current) {
        translateDocumentMetadata(getDictionary(language));
        pendingMetadataRef.current = false;
      }
    } else {
      translateDocument(language);
    }

    window.setTimeout(() => {
      isTranslatingRef.current = false;
    }, 0);
  };

  const schedulePendingTranslation = () => {
    if (typeof window === 'undefined') return;
    if (idleRef.current !== null) return;

    const run = () => {
      idleRef.current = null;
      const roots = Array.from(pendingRootsRef.current);
      pendingRootsRef.current.clear();
      if (roots.length || pendingMetadataRef.current) {
        applyLanguage(roots);
      }
    };

    idleRef.current =
      'requestIdleCallback' in window
        ? window.requestIdleCallback(run, { timeout: 300 })
        : window.setTimeout(run, 80);
  };

  const cancelPendingTranslation = () => {
    if (typeof window === 'undefined' || idleRef.current === null) return;

    if ('cancelIdleCallback' in window) {
      window.cancelIdleCallback(idleRef.current);
    } else {
      window.clearTimeout(idleRef.current);
    }

    idleRef.current = null;
  };

  const setLanguage = (nextLanguage: Language) => {
    if (nextLanguage === language) {
      return;
    }

    commitLanguage(nextLanguage);
  };

  useLayoutEffect(() => {
    if (typeof document === 'undefined') return;

    cancelPendingTranslation();
    pendingRootsRef.current.clear();
    pendingMetadataRef.current = false;
    applyLanguage();

    if (language === 'pt') {
      return;
    }

    const observer = new MutationObserver((mutations) => {
      if (isTranslatingRef.current) return;

      mutations.forEach((mutation) => {
        const target = mutation.target;
        if (target === document.head || document.head.contains(target)) {
          pendingMetadataRef.current = true;
          return;
        }

        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (
              node.nodeType === Node.ELEMENT_NODE ||
              node.nodeType === Node.TEXT_NODE ||
              node.nodeType === Node.DOCUMENT_FRAGMENT_NODE
            ) {
              pendingRootsRef.current.add(node);
            }
          });
          return;
        }

        pendingRootsRef.current.add(target);
      });

      if (pendingRootsRef.current.size || pendingMetadataRef.current) {
        schedulePendingTranslation();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['aria-label', 'placeholder', 'title', 'alt'],
    });

    observer.observe(document.head, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['content'],
    });

    return () => {
      observer.disconnect();
      cancelPendingTranslation();
    };
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () => setLanguage(language === 'pt' ? 'en' : 'pt'),
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider');
  }
  return context;
};
