import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pages = [
  '/',
  '/privacy/',
  '/terms/',
  '/ai-setup/',
  '/ai-data/',
  '/accessibility/',
  '/content-rights/',
];
const fileFor = (route) => route === '/'
  ? path.join(root, 'index.html')
  : path.join(root, route.slice(1), 'index.html');
const htmlFor = (route) => readFileSync(fileFor(route), 'utf8');
const meta = (html, property) => {
  const escaped = property.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = html.match(new RegExp(`<meta\\s+(?:name|property)=["']${escaped}["']\\s+content=["']([^"']+)["']`, 'i'));
  return match?.[1] ?? '';
};
const canonical = (html) => html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i)?.[1] ?? '';

test('each public page exists and has a unique www canonical and matching social URL', () => {
  const canonicals = pages.map((route) => {
    assert.ok(existsSync(fileFor(route)), `missing ${route}`);
    const html = htmlFor(route);
    const expected = `https://www.dermaprivate.app${route}`;
    assert.equal(canonical(html), expected, `${route} canonical`);
    assert.equal(meta(html, 'og:url'), expected, `${route} og:url`);
    return canonical(html);
  });
  assert.equal(new Set(canonicals).size, pages.length);
});

test('homepage leads with compatibility and explains owned products, Snapshot, Today, and Journey', () => {
  const html = htmlFor('/');
  assert.match(html, /<h1[^>]*>Know what you’re layering\.<\/h1>/i);
  assert.match(html, /products you already own/i);
  assert.match(html, /ingredient compatibility/i);
  assert.match(html, /14-day preview and with Pro/i);
  assert.match(html, /skin profile and routine stay on your iPhone by default/i);
  for (const label of ['Routine Snapshot', 'Today', 'Journey']) assert.match(html, new RegExp(label, 'i'));
  assert.doesNotMatch(html, /illustrative app preview|role=["']img["'][^>]*illustrative/i);
});

test('how it works and features explain the compatibility, Today, and Pro gates', () => {
  const html = htmlFor('/');
  for (const phrase of ['Know what you’re layering', 'Start with your products', 'Check how products fit together', 'Follow today’s plan', 'Ingredient compatibility', 'A plan for today', 'Journey', 'Optional AI Assist']) {
    assert.ok(html.toLowerCase().includes(phrase.toLowerCase()), `missing content: ${phrase}`);
  }
  assert.match(html, /With Pro, use Journey to review your routine history over time/i);
  assert.match(html, /Ingredient compatibility is available during the 14-day preview and with Pro/i);
  assert.match(html, /Your skin profile and routine stay on your device by default/i);
  assert.match(html, /Snapshot is a cosmetic planning tool\. It does not assess or diagnose a skin condition\./i);
  assert.doesNotMatch(html, /class=["']journey-label["']>\s*0[1-3]\s*[—–-]/i, 'step labels should not repeat their numbered index');
});

test('homepage uses one current-build hero screenshot and no fabricated UI preview', () => {
  const html = htmlFor('/');
  assert.equal((html.match(/class=["']hero-app-screen["']/g) ?? []).length, 1);
  assert.match(html, /\/assets\/screenshots\/today-routine-build12\.png/);
  assert.match(html, /alt=["']DermaPrivate Today view/i);
  assert.match(readFileSync(path.join(root, 'README.md'), 'utf8'), /iPhone 17 Simulator.*1\.0\.1 \(12\).*October 13, 2026/);
});

test('AI and data use distinguishes the website, local app data, and provider requests', () => {
  const privacy = htmlFor('/privacy/');
  const aiData = htmlFor('/ai-data/');
  assert.match(privacy, /website/i);
  assert.match(privacy, /mobile app/i);
  assert.match(aiData, /Groq/i);
  assert.match(aiData, /BYOK/i);
  assert.match(aiData, /website/i);
  assert.doesNotMatch(htmlFor('/'), /directly from your device to Groq|direct to Groq/i);
});

test('Privacy page uses the permanent URL and the supplied effective and updated policy', () => {
  const html = htmlFor('/privacy/');
  assert.equal(canonical(html), 'https://www.dermaprivate.app/privacy/');
  assert.equal(meta(html, 'og:url'), 'https://www.dermaprivate.app/privacy/');
  assert.match(html, /<h1>DermaPrivate Privacy Policy<\/h1>/);
  assert.match(html, /Effective date:\s*October 15, 2026/i);
  assert.match(html, /Last updated:\s*October 14, 2026/i);
  assert.match(html, /Amanchi Labs LLC, doing business as Amanchi Labs/);
  assert.match(html, /100 most recent entries/);
  assert.match(html, /cached locally for 30 days/);
  assert.match(html, /support@amanchilabs\.com/);
  for (let section = 1; section <= 16; section++) assert.match(html, new RegExp(`<h2>${section}\\.`), `missing policy section ${section}`);
});

test('accessibility page is candid and does not claim untested feature support', () => {
  const html = htmlFor('/accessibility/');
  assert.match(html, /evaluation.*pending|not yet evaluated|review.*pending/i);
  assert.match(html, /accessibility feedback/i);
  assert.doesNotMatch(html, /supports VoiceOver|supports Dynamic Type|fully accessible/i);
});

test('Content Rights page distinguishes attribution from permission and separates license layers', () => {
  const html = htmlFor('/content-rights/');
  assert.match(html, /<h1>DermaPrivate Content Rights &amp; Attribution<\/h1>/);
  assert.match(html, /Last updated:\s*October 15, 2026/i);
  assert.match(html, /does not grant visitors permission to reuse third-party materials/i);
  assert.match(html, /does not.*by itself.*sponsorship, endorsement, certification, or a partnership/i);
  assert.match(html, /Open Database License \(ODbL\)/i);
  assert.match(html, /Database Contents License/i);
  assert.match(html, /Creative Commons Attribution.?ShareAlike/i);
  assert.match(html, /image.*license.*version|version.*image.*license/i);
  assert.match(html, /brand-hosted image|publicly accessible.*does not.*permission/i);
  assert.match(html, /support@amanchilabs\.com/);
  assert.doesNotMatch(html, /all (?:brand )?images are used with permission|every image is licensed|all third-party content is cleared/i);
  for (const link of ['https://world.openbeautyfacts.org/', 'https://openfoodfacts.github.io/documentation/docs/Product-Opener/api/tutorials/license-be-on-the-legal-side/', 'https://opendatacommons.org/licenses/odbl/1-0/', 'https://opendatacommons.org/licenses/dbcl/1-0/']) assert.ok(html.includes(link), `missing rights reference ${link}`);
});

test('all pages share accessible site navigation and a footer with key links', () => {
  for (const route of pages) {
    const html = htmlFor(route);
    assert.match(html, /aria-label=["']Primary navigation["']/i, `${route} nav`);
    assert.match(html, /aria-expanded=["']false["']/i, `${route} mobile menu state`);
    assert.match(html, /<footer\b/i, `${route} footer`);
    for (const target of ['/privacy/', '/terms/', '/ai-setup/', '/ai-data/', '/accessibility/']) {
      assert.ok(html.includes(`href="${target}"`), `${route} missing ${target}`);
    }
    assert.match(html.match(/<footer\b[\s\S]*?<\/footer>/i)?.[0] ?? '', /<a href=["']\/content-rights\/["'][^>]*>Content Rights<\/a>/i, `${route} missing Content Rights footer link`);
  }
});

test('shared header stays pinned while scrolling and anchor targets clear it', () => {
  const css = readFileSync(path.join(root, 'style.css'), 'utf8');
  assert.match(css, /\.site-header\s*\{[^}]*position:\s*sticky/i);
  assert.match(css, /\.site-header\s*\{[^}]*top:\s*0/i);
  assert.match(css, /scroll-padding-top:\s*calc\(var\(--header-height\)/i);
});

test('header navigation groups every requested link under Product, Privacy & access, and Support', () => {
  for (const route of pages) {
    const html = htmlFor(route);
    const nav = html.match(/<nav\s+id=["']site-nav["'][\s\S]*?<\/nav>/i)?.[0] ?? '';
    for (const group of ['Product', 'Privacy &amp; access', 'Support']) {
      assert.match(nav, new RegExp(`<summary[^>]*>\\s*${group}\\s*<`, 'i'), `${route} missing ${group} group`);
    }
    for (const href of ['/#how-it-works', '/#features', '/#faq', '/privacy/', '/ai-data/', '/ai-setup/', '/accessibility/', '/terms/', 'mailto:support@amanchilabs.com', 'mailto:support@amanchilabs.com?subject=Accessibility%20feedback']) {
      assert.ok(nav.includes(`href="${href}"`), `${route} navigation missing ${href}`);
    }
  }
});

test('support contacts use the Amanchi Labs address on every page', () => {
  for (const route of pages) {
    const html = htmlFor(route);
    assert.doesNotMatch(html, /support\.dermaprivate@gmail\.com/i, `${route} has the previous support address`);
    assert.match(html, /mailto:support@amanchilabs\.com/i, `${route} is missing the support contact`);
  }
});

test('opening a header group closes any other open group', () => {
  const script = readFileSync(path.join(root, 'script.js'), 'utf8');
  assert.match(script, /\.nav-group\s*>\s*summary/);
  assert.match(script, /\.nav-group\[open\]/);
  assert.match(script, /group\s*!==\s*selectedGroup[\s\S]*?group\.open\s*=\s*false/);
});

test('following a navigation link closes every disclosure and the mobile menu', () => {
  const script = readFileSync(path.join(root, 'script.js'), 'utf8');
  assert.match(script, /nav\.addEventListener\(['"]click['"][\s\S]*?nav\.querySelectorAll\(['"]\.nav-group\[open\]['"]\)[\s\S]*?group\.open\s*=\s*false[\s\S]*?closeMenu\(\)/);
});

test('every local link and local asset resolves, and in-page links have a target', () => {
  for (const route of pages) {
    const html = htmlFor(route);
    const anchorTags = html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["'][^>]*>/gi);
    for (const [, href] of anchorTags) {
      if (href.startsWith('mailto:') || href.startsWith('https://')) continue;
      const url = new URL(href, `https://www.dermaprivate.app${route}`);
      const targetRoute = url.pathname || route;
      const targetPath = targetRoute.endsWith('/')
        ? path.join(root, targetRoute === '/' ? 'index.html' : targetRoute.slice(1), targetRoute === '/' ? '' : 'index.html')
        : path.join(root, targetRoute.slice(1));
      assert.ok(existsSync(targetPath), `${route} has broken local link ${href}`);
      if (url.hash) {
        const targetHtml = targetRoute === route ? html : readFileSync(targetPath, 'utf8');
        assert.ok(targetHtml.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `${route} has missing anchor ${href}`);
      }
    }

    const localAssets = html.matchAll(/\b(?:src|href)=["'](\/(?:assets|style\.css|script\.js)[^"']*)["']/gi);
    for (const [, asset] of localAssets) assert.ok(existsSync(path.join(root, asset.slice(1))), `${route} missing asset ${asset}`);
  }
});

test('site has no analytics, marketing pixels, remote scripts, or video embeds', () => {
  for (const route of pages) {
    const html = htmlFor(route);
    assert.doesNotMatch(html, /<script[^>]+src=["']https?:/i, `${route} remote script`);
    assert.doesNotMatch(html, /<iframe\b|<video\b|<track\b|rel=["'](?:preload|preconnect)["'][^>]*https?:/i, `${route} remote media`);
    assert.doesNotMatch(html, /google-analytics|googletagmanager|gtag\(|fbq\(|pixel\.js/i, `${route} tracking code`);
  }
});

test('robots and sitemap use the preferred host and include every information page', () => {
  const robots = readFileSync(path.join(root, 'robots.txt'), 'utf8');
  const sitemap = readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
  assert.match(robots, /Sitemap:\s*https:\/\/www\.dermaprivate\.app\/sitemap\.xml/);
  for (const route of pages) assert.ok(sitemap.includes(`<loc>https://www.dermaprivate.app${route}</loc>`), `sitemap missing ${route}`);
  assert.doesNotMatch(sitemap, /onrender\.com|https:\/\/dermaprivate\.app\//);
});

test('FAQ reflects current direct brand links and contains no affiliate claims', () => {
  const html = htmlFor('/');
  const faq = html.match(/<section id=["']faq["'][\s\S]*?<\/section>/i)?.[0] ?? '';
  assert.equal((faq.match(/class=["']faq-item["']/g) ?? []).length, 8);
  for (const phrase of ['Do I have to use Routine Snapshot, or can I build my own routine?', 'What does ingredient compatibility tell me?', 'Is DermaPrivate medical advice?', 'Where is my routine and skin profile stored?', 'What information is sent when I use an online feature?', 'What does AI Assist share, and can it change my routine?', 'Are product links affiliate links?', 'What’s included with Pro?']) assert.ok(faq.includes(phrase), `missing FAQ: ${phrase}`);
  assert.match(faq, /go directly to brand websites/i);
  assert.match(faq, /does not currently earn a commission or receive purchase attribution/i);
  assert.doesNotMatch(faq, /may earn a commission|conditional.*affiliate|affiliate status depends/i);
});
