import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EntryCard from '@/components/EntryCard';
import { getAllEntries } from '@/lib/content';

export const metadata = {
  title: 'Sanctuary — A Collection of Thoughts & Reflections',
  description: 'A quiet corner of the internet for journal entries, visual art, and personal reflection.',
};

export default function HomePage() {
  const entries = getAllEntries();

  return (
    <>
      <Header />

      <h2 className="section-title fade-in delay-1">Recent Entries</h2>

      <div className="entry-grid fade-in delay-2">
        {entries.map((entry) => (
          <EntryCard key={entry.slug} entry={entry} />
        ))}
      </div>

      <Footer />
    </>
  );
}
