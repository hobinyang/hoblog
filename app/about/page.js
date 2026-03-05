import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'About — Sanctuary',
  description: 'About the author of Sanctuary — a quiet corner of the internet.',
};

export default function AboutPage() {
  return (
    <>
      <Header />

      <main className="fade-in delay-1">
        <section className="bio-section">
          <div className="portrait-frame">
            <div className="portrait-placeholder">
              <svg
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--text-light-brown)"
                strokeWidth="0.5"
              >
                <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" />
                <path d="M12 15C14.2091 15 16 13.2091 16 11C16 8.79086 14.2091 7 12 7C9.79086 7 8 8.79086 8 11C8 13.2091 9.79086 15 12 15Z" />
                <path d="M6 21C6 18.2386 8.68629 16 12 16C15.3137 16 18 18.2386 18 21" />
              </svg>
            </div>
          </div>
          <div className="bio-content">
            <p>
              I find myself most present in the quiet spaces between notes,
              where the dust motes dance in shafts of afternoon light.
            </p>
            <p>
              My work is a slow conversation with the seasons — an attempt to
              capture the fleeting warmth of a memory before it dissolves into
              the blue of evening.
            </p>
            <p>Here, everything is soft. Everything is allowed to breathe.</p>
          </div>
        </section>

        <h2 style={{ textAlign: 'center', fontStyle: 'italic', fontWeight: 400, fontSize: '1.8rem', marginBottom: '2rem' }}>
          Current Internal State
        </h2>
        <section className="mood-board">
          <div className="mood-card">
            <span className="mood-label">Listening</span>
            <div className="mood-value">Wind-borne Echoes</div>
          </div>
          <div className="mood-card">
            <span className="mood-label">Reading</span>
            <div className="mood-value">Letters to a Young Poet</div>
          </div>
          <div className="mood-card">
            <span className="mood-label">Feeling</span>
            <div className="mood-value">Quietly Hopeful</div>
          </div>
        </section>

        <section className="inspirations fade-in delay-2">
          <h2>Kindred Spirits &amp; Sources</h2>
          <ul className="inspiration-list">
            <li>Morning Mist</li>
            <li>Debussy</li>
            <li>Pressed Ferns</li>
            <li>Kodak Gold</li>
            <li>Satie</li>
            <li>Unlined Paper</li>
            <li>The Golden Hour</li>
          </ul>
        </section>
      </main>

      <Footer />
    </>
  );
}
