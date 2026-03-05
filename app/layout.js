import '@/styles/globals.css';
import AmbientEffects from '@/components/AmbientEffects';

export const metadata = {
  title: 'Sanctuary',
  description: 'A collection of thoughts & reflections — a quiet corner of the internet.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AmbientEffects />
        <div className="container">
          {children}
        </div>
      </body>
    </html>
  );
}
