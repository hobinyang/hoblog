import Link from 'next/link';
import BlobArt from './BlobArt';

export default function EntryCard({ entry, delay = 0 }) {
  const { slug, title, date, category, blobs } = entry;

  return (
    <Link href={`/journal/${slug}/`} className="card">
      <div className="card-image-wrapper">
        <BlobArt config={blobs} />
      </div>
      <div className="card-meta">
        <div className="card-title">{title}</div>
        <div className="card-date">
          {date} {category && `• ${category}`}
        </div>
      </div>
    </Link>
  );
}
