'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'ㅈournal' },
    { href: '/gallery/', label: 'ㄱallery' },
    { href: '/about/', label: 'ㅇbout' },
  ];

  return (
    <header className="site-header fade-in">
      <h1 className="site-title">
        <Link href="/">Sanctuary</Link>
      </h1>
      <div className="site-subtitle">A Collection of Thoughts &amp; Reflections</div>
      <nav className="site-nav">
        {navItems.map(({ href, label }) => {
          const isActive =
            href === '/'
              ? pathname === '/' || pathname === ''
              : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={isActive ? 'active' : ''}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
