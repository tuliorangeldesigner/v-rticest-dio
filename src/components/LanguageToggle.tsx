import { useLanguage, type Language } from '@/lib/language';

const languageOptions: { value: Language; label: string }[] = [
  { value: 'pt', label: 'PT' },
  { value: 'en', label: 'EN' },
];

const LanguageToggle = ({ className = '' }: { className?: string }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      data-no-translate
      className={`language-toggle ${className}`}
      role="group"
      aria-label="Language selector"
    >
      {languageOptions.map((option) => {
        const isActive = language === option.value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setLanguage(option.value)}
            aria-pressed={isActive}
            className={`language-toggle__button ${isActive ? 'language-toggle__button--active' : ''}`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageToggle;
