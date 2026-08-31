import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp, Bot, LoaderCircle, RotateCcw, Sparkles, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { trackAssistant } from '@/lib/assistantAnalytics';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

const suggestions = [
  'Qual serviço combina com meu projeto?',
  'Como funciona o processo?',
  'Vocês também desenvolvem sites?',
];

const hiddenRoutes = ['/portal', '/briefing', '/admin'];

const getLinkLabel = (url: string) =>
  url.startsWith('https://api.whatsapp.com/send?') ? 'Conversar pelo WhatsApp →' : url;

const renderMessageContent = (content: string) =>
  content.split(/(https?:\/\/[^\s]+)/g).map((part, index) =>
    /^https?:\/\//.test(part) ? (
      <a key={`${part}-${index}`} href={part} target="_blank" rel="noopener noreferrer" className="my-1 inline-flex border border-accent/50 bg-accent/10 px-3 py-2 font-medium text-accent transition-colors hover:bg-accent hover:text-accent-foreground">
        {getLinkLabel(part)}
      </a>
    ) : (
      part
    ),
  );

const PortfolioAssistant = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const isHidden = hiddenRoutes.some((route) => pathname.startsWith(route));

  useEffect(() => {
    if (!isOpen) return;
    trackAssistant('assistant_open');
    const focusId = window.setTimeout(() => inputRef.current?.focus(), 250);
    const heartbeatId = window.setInterval(() => trackAssistant('heartbeat'), 60_000);
    return () => {
      window.clearTimeout(focusId);
      window.clearInterval(heartbeatId);
      trackAssistant('assistant_close');
    };
  }, [isOpen]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => () => abortRef.current?.abort(), []);

  if (isHidden) return null;

  const sendMessage = async (text: string) => {
    const content = text.trim();
    if (!content || isLoading) return;

    trackAssistant('message_sent', { role: 'user', content });

    const nextMessages = [...messages, { role: 'user' as const, content }].slice(-9);
    setMessages(nextMessages);
    setInput('');
    setError('');
    setIsLoading(true);

    abortRef.current = new AbortController();

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
        signal: abortRef.current.signal,
      });
      const responseText = await response.text();
      let data: { reply?: string; error?: string } = {};

      try {
        data = responseText ? (JSON.parse(responseText) as typeof data) : {};
      } catch {
        throw new Error('O assistente recebeu uma resposta inválida. Tente novamente.');
      }

      if (!response.ok || !data.reply) throw new Error(data.error || 'Não foi possível responder agora.');
      trackAssistant('assistant_reply', { role: 'assistant', content: data.reply });
      setMessages((current) => [...current, { role: 'assistant', content: data.reply! }]);
    } catch (requestError) {
      if ((requestError as Error).name !== 'AbortError') {
        setError((requestError as Error).message || 'Falha de conexão. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    void sendMessage(input);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      void sendMessage(input);
    }
  };

  const resetConversation = () => {
    abortRef.current?.abort();
    setMessages([]);
    setError('');
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-4 left-4 z-[80] sm:bottom-6 sm:left-6">
      <AnimatePresence>
        {isOpen && (
          <motion.section
            role="dialog"
            aria-label="Assistente virtual da TR Designer"
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.19, 1, 0.22, 1] }}
            className="mb-3 flex h-[min(620px,calc(100dvh-6rem))] w-[min(390px,calc(100vw-2rem))] flex-col overflow-hidden border border-border bg-card/95 shadow-2xl shadow-black/50 backdrop-blur-xl"
          >
            <header className="flex items-center justify-between border-b border-border px-4 py-3.5">
              <div className="flex min-w-0 items-center gap-3">
                <div className="relative grid h-10 w-10 shrink-0 place-items-center bg-accent text-accent-foreground">
                  <Bot className="h-5 w-5" />
                  <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-card bg-emerald-400" />
                </div>
                <div className="min-w-0">
                  <h2 className="truncate font-syne text-sm font-bold">Assistente TR</h2>
                  <p className="text-[11px] text-muted-foreground">Estratégia, design e performance</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button onClick={resetConversation} className="p-2 text-muted-foreground transition-colors hover:text-foreground" aria-label="Reiniciar conversa">
                    <RotateCcw className="h-4 w-4" />
                  </button>
                )}
                <button onClick={() => setIsOpen(false)} className="p-2 text-muted-foreground transition-colors hover:text-foreground" aria-label="Fechar assistente">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </header>

            <div ref={listRef} data-lenis-prevent className="flex-1 space-y-4 overflow-y-auto px-4 py-5" aria-live="polite">
              <div className="max-w-[90%] border-l-2 border-accent bg-secondary/70 px-4 py-3 text-sm leading-relaxed">
                Olá! Posso ajudar você a entender qual solução da TR Designer faz mais sentido para seu projeto.
              </div>

              {messages.length === 0 && (
                <div className="space-y-2 pt-1">
                  <p className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    <Sparkles className="h-3.5 w-3.5 text-accent" /> Comece por aqui
                  </p>
                  {suggestions.map((suggestion) => (
                    <button key={suggestion} onClick={() => void sendMessage(suggestion)} className="block w-full border border-border bg-background/40 px-3.5 py-3 text-left text-sm transition-colors hover:border-accent/60 hover:bg-accent/5">
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              {messages.map((message, index) => (
                <div key={`${message.role}-${index}`} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[88%] whitespace-pre-wrap px-4 py-3 text-sm leading-relaxed ${message.role === 'user' ? 'bg-foreground text-background' : 'border-l-2 border-accent bg-secondary/70 text-foreground'}`}>
                    {renderMessageContent(message.content)}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <LoaderCircle className="h-4 w-4 animate-spin text-accent" /> Pensando…
                </div>
              )}
              {error && <p role="alert" className="border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive-foreground">{error}</p>}
            </div>

            <form onSubmit={handleSubmit} className="border-t border-border bg-background/40 p-3">
              <div className="flex items-end gap-2 border border-border bg-card p-1.5 focus-within:border-accent/70">
                <textarea ref={inputRef} value={input} onChange={(event) => setInput(event.target.value.slice(0, 800))} onKeyDown={handleKeyDown} rows={1} placeholder="Pergunte sobre seu projeto…" className="max-h-24 min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted-foreground" aria-label="Sua pergunta" />
                <button type="submit" disabled={!input.trim() || isLoading} className="grid h-10 w-10 shrink-0 place-items-center bg-accent text-accent-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-35" aria-label="Enviar mensagem">
                  <ArrowUp className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 text-center text-[10px] text-muted-foreground">IA pode cometer erros. Confirme detalhes na proposta.</p>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen((current) => !current)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="flex h-14 items-center gap-3 bg-accent px-4 text-sm font-semibold text-accent-foreground shadow-xl shadow-black/30"
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Fechar Chatbot TR' : 'Conversar com o Chatbot TR'}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
        <span>CHATBOT TR</span>
      </motion.button>
    </div>
  );
};

export default PortfolioAssistant;
