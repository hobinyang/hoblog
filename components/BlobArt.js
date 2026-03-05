/**
 * BlobArt — renders procedural abstract art from a config object.
 * Each entry defines its own blob shapes via frontmatter.
 */
export default function BlobArt({ config, className = '', style = {} }) {
  if (!config) return null;

  const { bg = '#E8F1F2', shapes = [] } = config;

  // Default blob shape styles by position
  const positionStyles = {
    'top-left': { width: '40%', height: '40%', top: '10%', left: '10%', borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
    'top-right': { width: '35%', height: '35%', top: '10%', right: '10%', borderRadius: '40% 60% 70% 30% / 50% 30% 70% 50%' },
    'bottom-left': { width: '30%', height: '30%', bottom: '15%', left: '10%', borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' },
    'bottom-right': { width: '30%', height: '30%', bottom: '15%', right: '10%', borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' },
    'center': { width: '25%', height: '25%', top: '40%', left: '40%', borderRadius: '50%' },
    'center-right': { width: '20%', height: '20%', top: '50%', left: '60%', borderRadius: '50%' },
    'center-left': { width: '20%', height: '20%', top: '50%', left: '20%', borderRadius: '50%' },
  };

  const sizeMultipliers = {
    small: 0.6,
    medium: 1,
    large: 1.4,
  };

  return (
    <div className={`pattern-bg ${className}`} style={{ background: bg, ...style }}>
      {shapes.map((shape, i) => {
        const base = positionStyles[shape.position] || positionStyles['center'];
        const mult = sizeMultipliers[shape.size] || 1;

        return (
          <div
            key={i}
            className="blob"
            style={{
              ...base,
              backgroundColor: shape.color,
              width: `calc(${base.width} * ${mult})`,
              height: `calc(${base.height} * ${mult})`,
            }}
          />
        );
      })}

      {/* Botanical SVG line art overlay */}
      <svg className="botanical-svg" viewBox="0 0 100 100">
        <path d="M30,80 Q50,50 30,20" stroke="rgba(92, 61, 50, 0.15)" fill="none" />
        <path d="M30,80 Q60,60 70,30" stroke="rgba(92, 61, 50, 0.15)" fill="none" />
      </svg>
    </div>
  );
}
