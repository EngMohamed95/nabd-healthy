// Build-time only: renders the landing page to static HTML so crawlers that
// don't run JavaScript (Bing, social previews, AI crawlers) still see the content.
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.tsx';
import { LanguageProvider } from './lib/LanguageContext.tsx';
import type { Language } from './lib/i18n';

export function render(language: Language) {
  return renderToString(
    <StrictMode>
      <LanguageProvider initialLanguage={language}>
        <App />
      </LanguageProvider>
    </StrictMode>,
  );
}
