import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const journalDirectory = path.join(process.cwd(), 'content', 'journal');

/**
 * Get all journal entries, sorted by date (newest first).
 */
export function getAllEntries() {
  if (!fs.existsSync(journalDirectory)) return [];

  const fileNames = fs.readdirSync(journalDirectory).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));

  const entries = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx?$/, '');
    const fullPath = path.join(journalDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      date: data.date || '',
      dateFormatted: data.date ? formatDate(data.date) : '',
      category: data.category || '',
      tags: data.tags || [],
      readTime: data.readTime || '',
      blobs: data.blobs || null,
    };
  });

  return entries.sort((a, b) => (a.date > b.date ? -1 : 1));
}

/**
 * Get a single journal entry by slug, including rendered HTML content.
 */
export async function getEntryBySlug(slug) {
  const mdPath = path.join(journalDirectory, `${slug}.md`);
  const mdxPath = path.join(journalDirectory, `${slug}.mdx`);

  const fullPath = fs.existsSync(mdxPath) ? mdxPath : mdPath;
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark()
    .use(html, { sanitize: false })
    .process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title || slug,
    date: data.date || '',
    dateFormatted: data.date ? formatDate(data.date) : '',
    category: data.category || '',
    tags: data.tags || [],
    readTime: data.readTime || '',
    blobs: data.blobs || null,
    contentHtml,
  };
}

/**
 * Get all entry slugs for static path generation.
 */
export function getAllEntrySlugs() {
  if (!fs.existsSync(journalDirectory)) return [];

  return fs
    .readdirSync(journalDirectory)
    .filter(f => f.endsWith('.md') || f.endsWith('.mdx'))
    .map(f => f.replace(/\.mdx?$/, ''));
}

/**
 * Get adjacent entries for prev/next navigation.
 */
export function getAdjacentEntries(slug) {
  const entries = getAllEntries();
  const index = entries.findIndex(e => e.slug === slug);

  return {
    prev: index < entries.length - 1 ? entries[index + 1] : null,
    next: index > 0 ? entries[index - 1] : null,
  };
}

/**
 * Format a date string to a readable format.
 */
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
