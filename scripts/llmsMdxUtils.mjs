/**
 * MDX/Markdown helpers for scripts/generate-llms-full.mjs (plain-text LLM bundles).
 */

/** Strip MDX import lines and JSX display components for plain-text context bundles. */
export function stripMdxForPlainText(text) {
  let out = text
    .replace(/^import\s+.+$/gm, '')
    .replace(/<[A-Z][A-Za-z0-9]*(?:\s[^>]*)?\/>/g, '')
    .replace(/<UniversityMarquee\b[\s\S]*?<\/UniversityMarquee>/g, '');

  return out.trim();
}

export function stripYamlFrontmatter(text) {
  if (!text.startsWith('---\n')) {
    return text.trim();
  }

  const end = text.indexOf('\n---\n', 4);
  if (end === -1) {
    return text.trim();
  }

  return text.slice(end + 5).trim();
}

export function stripFrontmatterAndMdxForLlms(text) {
  return stripMdxForPlainText(stripYamlFrontmatter(text));
}
