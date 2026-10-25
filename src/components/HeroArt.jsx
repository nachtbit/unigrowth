// Original UniGrowth hero animation (pure SVG + CSS, no external assets):
// a path from the student (left) to the university (right) draws itself,
// growth bars rise, and an arrow pulses. Animation is disabled for users
// who prefer reduced motion (see index.css).
export default function HeroArt() {
  return (
    <svg className="hero-art" viewBox="0 0 520 440" role="img" aria-label="Growth illustration">
      <circle className="hero-art__blob" cx="270" cy="220" r="200" />
      <circle className="hero-art__ring hero-art__ring--1" cx="270" cy="220" r="150" />
      <circle className="hero-art__ring hero-art__ring--2" cx="270" cy="220" r="105" />

      {/* growth bars */}
      <g className="hero-art__bars">
        <rect className="bar bar--1" x="150" y="270" width="46" height="90" rx="14" />
        <rect className="bar bar--2" x="214" y="230" width="46" height="130" rx="14" />
        <rect className="bar bar--3" x="278" y="180" width="46" height="180" rx="14" />
        <rect className="bar bar--4" x="342" y="120" width="46" height="240" rx="14" />
      </g>

      {/* path from student to university */}
      <path
        className="hero-art__path"
        d="M70 360 C 140 330, 170 250, 240 230 S 360 150, 440 70"
        fill="none"
        pathLength="1"
      />
      <circle className="hero-art__start" cx="70" cy="360" r="14" />
      <circle className="hero-art__start-core" cx="70" cy="360" r="6" />

      {/* arrow */}
      <g className="hero-art__arrow">
        <path d="M418 52h46v46" fill="none" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M464 52L410 106" fill="none" strokeWidth="14" strokeLinecap="round" />
      </g>

      {/* floating dots */}
      <circle className="dot dot--1" cx="95" cy="120" r="9" />
      <circle className="dot dot--2" cx="470" cy="300" r="12" />
      <circle className="dot dot--3" cx="400" cy="395" r="7" />
    </svg>
  )
}
