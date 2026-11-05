// Post-build step: turns the client-rendered SPA into two static, crawlable pages
// (/ in Arabic, /en/ in English) with full SEO tags, and writes sitemap.xml.
// Runs after `vite build` (client) and `vite build --ssr` (server bundle).
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const serverEntry = path.join(root, 'dist-server', 'entry-server.js')

const SITE = 'https://nabdassist.com'
const OG_IMAGE = `${SITE}/og-cover.jpg`

const pages = {
  ar: {
    path: '/',
    lang: 'ar',
    dir: 'rtl',
    locale: 'ar_AR',
    title: 'نبض | منصة الطبيب الذكية بالذكاء الاصطناعي لإدارة العيادات والتقارير الطبية',
    description:
      'نبض منصة طبية مدعومة بالذكاء الاصطناعي تساعد الطبيب على كتابة التقارير الطبية وإدارة العيادة والمرضى والتحاليل والأشعة والروشتات، وتوفر حتى 4 ساعات يومياً.',
    imageAlt: 'منصة نبض الطبية - ذكاء يخدم الطبيب ورعاية أفضل للمريض',
    siteName: 'نبض',
  },
  en: {
    path: '/en/',
    lang: 'en',
    dir: 'ltr',
    locale: 'en_US',
    title: 'Nabd | AI Medical Assistant for Doctors, Clinics & Medical Reports',
    description:
      'Nabd is an AI-powered medical platform that helps doctors write clinical reports, manage clinics, patients, labs, scans and prescriptions, saving up to 4 hours a day.',
    imageAlt: 'Nabd AI medical platform - intelligence that serves the doctor',
    siteName: 'Nabd',
  },
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function structuredData(p) {
  const url = SITE + p.path
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE}/#organization`,
        name: 'Nabd',
        alternateName: ['نبض', 'Nabd Assist', 'مساعد نبض'],
        url: `${SITE}/`,
        logo: `${SITE}/icon-512.png`,
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE}/#website`,
        url: `${SITE}/`,
        name: p.siteName,
        inLanguage: ['ar', 'en'],
        publisher: { '@id': `${SITE}/#organization` },
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: p.title,
        description: p.description,
        inLanguage: p.lang,
        isPartOf: { '@id': `${SITE}/#website` },
        primaryImageOfPage: OG_IMAGE,
      },
      {
        '@type': 'SoftwareApplication',
        name: p.siteName,
        applicationCategory: 'HealthApplication',
        applicationSubCategory: 'Clinic management & AI medical reporting',
        operatingSystem: 'Web',
        url: 'https://app.nabdassist.com/',
        description: p.description,
        inLanguage: ['ar', 'en'],
        image: OG_IMAGE,
        publisher: { '@id': `${SITE}/#organization` },
      },
    ],
  }
}

function headFor(p) {
  const url = SITE + p.path
  const other = p.lang === 'ar' ? pages.en : pages.ar
  return `<title>${esc(p.title)}</title>
    <meta name="description" content="${esc(p.description)}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <link rel="canonical" href="${url}" />
    <link rel="alternate" hreflang="ar" href="${SITE}${pages.ar.path}" />
    <link rel="alternate" hreflang="en" href="${SITE}${pages.en.path}" />
    <link rel="alternate" hreflang="x-default" href="${SITE}${pages.ar.path}" />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${esc(p.siteName)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${esc(p.title)}" />
    <meta property="og:description" content="${esc(p.description)}" />
    <meta property="og:image" content="${OG_IMAGE}" />
    <meta property="og:image:secure_url" content="${OG_IMAGE}" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="661" />
    <meta property="og:image:alt" content="${esc(p.imageAlt)}" />
    <meta property="og:locale" content="${p.locale}" />
    <meta property="og:locale:alternate" content="${other.locale}" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(p.title)}" />
    <meta name="twitter:description" content="${esc(p.description)}" />
    <meta name="twitter:image" content="${OG_IMAGE}" />
    <meta name="twitter:image:alt" content="${esc(p.imageAlt)}" />

    <script type="application/ld+json">${JSON.stringify(structuredData(p)).replace(/</g, '\\u003c')}</script>`
}

const { render } = await import(pathToFileURL(serverEntry).href)
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const seoBlock = /<!--seo:start-->[\s\S]*?<!--seo:end-->/

if (!seoBlock.test(template) || !template.includes('<!--app-html-->')) {
  throw new Error('dist/index.html is missing the <!--seo:start/end--> or <!--app-html--> markers')
}

for (const p of Object.values(pages)) {
  const html = template
    .replace(/<html lang="[^"]*" dir="[^"]*">/, `<html lang="${p.lang}" dir="${p.dir}">`)
    .replace(seoBlock, headFor(p))
    .replace('<!--app-html-->', render(p.lang))
  const outDir = path.join(dist, p.path)
  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(path.join(outDir, 'index.html'), html)
  console.log(`prerendered ${p.path} (${(html.length / 1024).toFixed(0)} KB)`)
}

const today = new Date().toISOString().slice(0, 10)
const alternates = Object.values(pages)
  .map((p) => `    <xhtml:link rel="alternate" hreflang="${p.lang}" href="${SITE}${p.path}" />`)
  .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${pages.ar.path}" />`)
  .join('\n')
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${Object.values(pages)
  .map((p) => `  <url>\n    <loc>${SITE}${p.path}</loc>\n    <lastmod>${today}</lastmod>\n${alternates}\n  </url>`)
  .join('\n')}
</urlset>
`
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap)
console.log('wrote sitemap.xml')
