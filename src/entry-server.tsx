// Build-time only: renders the landing page to static HTML so crawlers that
// don't run JavaScript (Bing, social previews, AI crawlers) still see the content.
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.tsx';
import { LanguageProvider, type Page } from './lib/LanguageContext.tsx';
import type { Language } from './lib/i18n';

export function render(language: Language, page: Page = 'home') {
  return renderToString(
    <StrictMode>
      <LanguageProvider initialLanguage={language} initialPage={page}>
        <App />
      </LanguageProvider>
    </StrictMode>,
  );
}

// Titles/descriptions for the legal pages, read by scripts/prerender.js.
export { LEGAL_PAGES, legalContent } from './lib/legal';
