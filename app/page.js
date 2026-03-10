import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EntryCard from '@/components/EntryCard';
import { getAllEntries } from '@/lib/content';

export const metadata = {
  title: 'Hobnon\'s Corner',
  description: 'A lot of nonsense with a pinch of salt',
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
