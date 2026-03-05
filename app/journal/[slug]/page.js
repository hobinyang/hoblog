import Link from 'next/link';
import { notFound } from 'next/navigation';
import BlobArt from '@/components/BlobArt';
import Footer from '@/components/Footer';
import { getEntryBySlug, getAllEntrySlugs, getAdjacentEntries } from '@/lib/content';

export async function generateStaticParams() {
  const slugs = getAllEntrySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const entry = await getEntryBySlug(slug);
    return {
      title: `${entry.title} — Sanctuary`,
      description: `${entry.title} — A journal entry from Sanctuary.`,
    };
  } catch {
    return { title: 'Entry Not Found — Sanctuary' };
  }
}

export default async function JournalEntryPage({ params }) {
  const { slug } = await params;

  let entry;
  try {
    entry = await getEntryBySlug(slug);
  } catch {
    notFound();
  }

  const { prev, next } = getAdjacentEntries(slug);

  // Split content to apply drop cap to first paragraph
  const paragraphs = entry.contentHtml
    .split(/<\/?p>/g)
    .filter((p) => p.trim().length > 0);

  return (
    <>
      <header className="entry-detail-header fade-in">
        <Link href="/" className="back-nav">
          ← Back to Sanctuary
        </Link>
        <h1 className="entry-title">{entry.title}</h1>
        <div className="entry-meta">
          {entry.dateFormatted} {entry.readTime && `• ${entry.readTime}`}
        </div>
      </header>

      <section
        className="entry-hero-art fade-in"
        style={{ animationDelay: '0.2s' }}
      >
        <BlobArt
          config={entry.blobs}
          style={{ width: '100%', height: '100%' }}
        />
      </section>

      <article
        className="entry-content fade-in"
        style={{ animationDelay: '0.4s' }}
      >
        {paragraphs.map((para, i) => {
          if (i === 0) {
            const firstChar = para.trim().charAt(0);
            const rest = para.trim().slice(1);
            return (
              <p key={i}>
                <span className="drop-cap">{firstChar}</span>
                {rest}
              </p>
            );
          }
          return <p key={i} dangerouslySetInnerHTML={{ __html: para }} />;
        })}
      </article>

      {entry.tags && entry.tags.length > 0 && (
        <div
          className="mood-tags fade-in"
          style={{ animationDelay: '0.6s' }}
        >
          {entry.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      )}

      <nav
        className="entry-navigation fade-in"
        style={{ animationDelay: '0.8s' }}
      >
        {prev ? (
          <Link href={`/journal/${prev.slug}/`} className="nav-item prev">
            <span className="nav-label">Previous Entry</span>
            <span className="nav-title">{prev.title}</span>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/journal/${next.slug}/`}
            className="nav-item next"
            style={{ textAlign: 'right' }}
          >
            <span className="nav-label">Next Entry</span>
            <span className="nav-title">{next.title}</span>
          </Link>
        ) : (
          <div />
        )}
      </nav>

      <Footer />
    </>
  );
}
