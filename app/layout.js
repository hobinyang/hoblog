import '@/styles/globals.css';
import AmbientEffects from '@/components/AmbientEffects';

export const metadata = {
  title: "Hobin's Corner",
  description: "A lot of nonsense with a pinch of salt",
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
