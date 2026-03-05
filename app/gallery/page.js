'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import galleryData from '@/content/gallery.json';

function GalleryArt({ item }) {
  const { art, height } = item;

  const svgContent = {
    'circle-wave': (
      <svg width="60%" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="35" fill={art.color} opacity="0.6" />
        <path d="M20 80 Q50 20 80 80" stroke="var(--text-dark-brown)" strokeWidth="0.5" fill="none" />
      </svg>
    ),
    'rect-line': (
      <svg width="70%" viewBox="0 0 100 150">
        <rect x="20" y="30" width="60" height="90" fill={art.color} opacity="0.4" />
        <line x1="10" y1="10" x2="90" y2="140" stroke="var(--text-light-brown)" strokeWidth="0.3" />
      </svg>
    ),
    'circle': (
      <svg width="50%" viewBox="0 0 100 100">
        <path d="M50 10 A40 40 0 0 1 50 90 A40 40 0 0 1 50 10" fill={art.color} opacity="0.5" />
      </svg>
    ),
    'double-circle': (
      <svg width="80%" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="20" fill={art.color} />
        <circle cx="80" cy="40" r="15" fill="var(--text-light-brown)" opacity="0.2" />
      </svg>
    ),
    'cross': (
      <svg width="60%" viewBox="0 0 100 100">
        <path d="M10 10 L90 90 M90 10 L10 90" stroke={art.color} strokeWidth="0.2" />
      </svg>
    ),
    'ellipse': (
      <svg width="70%" viewBox="0 0 100 140">
        <ellipse cx="50" cy="70" rx="30" ry="50" fill={art.color} opacity="0.3" />
      </svg>
    ),
  };

  return (
    <div className="art-bg" style={{ background: art.bg, height: `${height}px` }}>
      {svgContent[art.type] || null}
    </div>
  );
}

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const categories = ['All', 'Paintings', 'Sketches', 'Digital'];

  const filteredItems =
    activeFilter === 'All'
      ? galleryData
      : galleryData.filter((item) => item.category === activeFilter);

  return (
    <>
      <Header />

      <div className="gallery-subtitle fade-in delay-1">The Gallery</div>

      <div className="category-filter fade-in" style={{ animationDelay: '0.2s' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
            onClick={() => setActiveFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="masonry-grid fade-in" style={{ animationDelay: '0.4s' }}>
        {filteredItems.map((item) => (
          <div key={item.id} className="masonry-item">
            <GalleryArt item={item} />
            <div className="hover-overlay">
              <div className="overlay-title">{item.title}</div>
              <div className="overlay-date">
                {item.category} • {item.date}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
}
