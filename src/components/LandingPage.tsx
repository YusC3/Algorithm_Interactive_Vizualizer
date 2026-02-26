import React, { useState } from 'react';
import { getExamplesForAlgorithm } from '../data';

const isLive = (id: string) => getExamplesForAlgorithm(id).length > 0;
import '../styles/LandingPage.css';

export interface AlgorithmCard {
  id: string;
  title: string;
  category: string;
  tags: string[];
  description: string;
  complexity: { time: string; space: string };
  status: 'available' | 'coming-soon';
  visual: React.ReactNode;
}

const ALGORITHMS: AlgorithmCard[] = [
  {
    id: 'bellman-ford',
    title: 'Bellman-Ford',
    category: 'Dynamic Programming',
    tags: ['shortest path', 'graph', 'dp', 'negative weights'],
    description: 'Single-source shortest paths on weighted digraphs, including negative edge weights.',
    complexity: { time: 'O(mn)', space: 'O(n²)' },
    status: isLive('bellman-ford') ? 'available' : 'coming-soon',
    visual: <BellmanFordPreview />,
  },
  {
    id: 'sequence-alignment',
    title: 'Sequence Alignment',
    category: 'Dynamic Programming',
    tags: ['edit distance', 'dp', 'strings', 'bioinformatics'],
    description: 'Find the minimum cost alignment between two strings using gap and mismatch penalties.',
    complexity: { time: 'O(mn)', space: 'O(mn)' },
    status: 'coming-soon',
    visual: <SeqAlignPreview />,
  },
  {
    id: 'dijkstra',
    title: 'Dijkstra',
    category: 'Greedy',
    tags: ['shortest path', 'graph', 'greedy', 'non-negative'],
    description: 'Efficient shortest paths for graphs with non-negative edge weights using a priority queue.',
    complexity: { time: 'O(m log n)', space: 'O(n)' },
    status: 'coming-soon',
    visual: <DijkstraPreview />,
  },
  {
    id: 'knapsack',
    title: '0/1 Knapsack',
    category: 'Dynamic Programming',
    tags: ['dp', 'optimization', 'subset'],
    description: 'Maximize value of items in a knapsack subject to a weight capacity constraint.',
    complexity: { time: 'O(nW)', space: 'O(nW)' },
    status: 'coming-soon',
    visual: <KnapsackPreview />,
  },
];

const CATEGORIES = ['All', ...Array.from(new Set(ALGORITHMS.map((a) => a.category)))];

interface LandingPageProps {
  onNavigate: (algorithmId: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filtered = ALGORITHMS.filter((alg) => {
    const matchesCategory = activeCategory === 'All' || alg.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      alg.title.toLowerCase().includes(q) ||
      alg.tags.some((t) => t.includes(q)) ||
      alg.category.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="landing">
      {/* Hero */}
      <header className="landing__hero">
        <div className="landing__hero-glow" />
        <p className="landing__hero-eyebrow">// interactive learning</p>
        <h1 className="landing__hero-title">
          Algorithm<br />Visualizer
        </h1>
        <p className="landing__hero-sub">
          Step through classic algorithms one move at a time.
          <br />Watch data structures evolve. Build real intuition.
        </p>

        {/* Search */}
        <div className="landing__search-wrap">
          <span className="landing__search-icon">⌕</span>
          <input
            className="landing__search"
            type="text"
            placeholder="Search algorithms, topics, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search algorithms"
          />
          {searchQuery && (
            <button className="landing__search-clear" onClick={() => setSearchQuery('')}>✕</button>
          )}
        </div>
      </header>

      {/* Category filter */}
      <div className="landing__filters">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`landing__filter-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
        <span className="landing__filter-count">{filtered.length} algorithm{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Cards grid */}
      <main className="landing__grid">
        {filtered.map((alg) => (
          <article
            key={alg.id}
            className={`alg-card ${alg.status === 'coming-soon' ? 'alg-card--soon' : ''} ${hoveredId === alg.id ? 'alg-card--hovered' : ''}`}
            onMouseEnter={() => setHoveredId(alg.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => alg.status === 'available' && onNavigate(alg.id)}
            role={alg.status === 'available' ? 'button' : 'article'}
            tabIndex={alg.status === 'available' ? 0 : undefined}
            onKeyDown={(e) => e.key === 'Enter' && alg.status === 'available' && onNavigate(alg.id)}
            aria-label={`${alg.title} — ${alg.status === 'available' ? 'click to open' : 'coming soon'}`}
          >
            {/* Visual preview area */}
            <div className="alg-card__visual">
              {alg.visual}
              {alg.status === 'coming-soon' && (
                <div className="alg-card__soon-overlay">
                  <span>Coming Soon</span>
                </div>
              )}
            </div>

            {/* Card body */}
            <div className="alg-card__body">
              <div className="alg-card__meta">
                <span className="alg-card__category">{alg.category}</span>
                {alg.status === 'available' && (
                  <span className="alg-card__status-badge">● Live</span>
                )}
              </div>

              <h2 className="alg-card__title">{alg.title}</h2>
              <p className="alg-card__desc">{alg.description}</p>

              <div className="alg-card__complexity">
                <span className="alg-card__complexity-item">
                  <span className="alg-card__complexity-label">Time</span>
                  <code>{alg.complexity.time}</code>
                </span>
                <span className="alg-card__complexity-sep">·</span>
                <span className="alg-card__complexity-item">
                  <span className="alg-card__complexity-label">Space</span>
                  <code>{alg.complexity.space}</code>
                </span>
              </div>

              <div className="alg-card__tags">
                {alg.tags.map((tag) => (
                  <span key={tag} className="alg-card__tag">{tag}</span>
                ))}
              </div>
            </div>

            {alg.status === 'available' && (
              <div className="alg-card__cta">
                Visualize →
              </div>
            )}
          </article>
        ))}
      </main>

      <footer className="landing__footer">
        <span>Algorithm Visualizer · built with React + Vite · open source</span>
      </footer>
    </div>
  );
};

// ─── SVG Preview Components ──────────────────────────────────────────────────

function BellmanFordPreview() {
  return (
    <svg viewBox="0 0 200 120" className="preview-svg">
      {/* Edges */}
      <path d="M 35,55 Q 90,25 135,55" stroke="#2a3f5f" strokeWidth="1.5" fill="none" markerEnd="url(#arr)" />
      <path d="M 35,65 Q 95,105 165,75" stroke="#2a3f5f" strokeWidth="1.5" fill="none" markerEnd="url(#arr)" />
      <path d="M 150,50 Q 163,60 163,68" stroke="#2a3f5f" strokeWidth="1.5" fill="none" markerEnd="url(#arr)" />
      {/* Optimal path highlight */}
      <path d="M 35,55 Q 90,25 135,55" stroke="#10b981" strokeWidth="2.5" fill="none" markerEnd="url(#arr-g)"
        style={{ filter: 'drop-shadow(0 0 4px #10b981)' }} />
      <defs>
        <marker id="arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="#2a3f5f" />
        </marker>
        <marker id="arr-g" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="#10b981" />
        </marker>
      </defs>
      {/* Nodes */}
      <circle cx="30" cy="60" r="18" fill="#0a0e1a" stroke="#00d4ff" strokeWidth="2" />
      <text x="30" y="60" textAnchor="middle" dominantBaseline="central" fill="#00d4ff" fontSize="11" fontWeight="bold">v</text>
      <circle cx="145" cy="52" r="18" fill="#0a0e1a" stroke="#7c3aed" strokeWidth="2" />
      <text x="145" y="52" textAnchor="middle" dominantBaseline="central" fill="#7c3aed" fontSize="11" fontWeight="bold">A</text>
      <circle cx="145" cy="95" r="18" fill="#0a0e1a" stroke="#ff6b35" strokeWidth="2" />
      <text x="145" y="95" textAnchor="middle" dominantBaseline="central" fill="#ff6b35" fontSize="11" fontWeight="bold">B</text>
      <circle cx="175" cy="72" r="18" fill="#0a0e1a" stroke="#10b981" strokeWidth="2" />
      <text x="175" y="72" textAnchor="middle" dominantBaseline="central" fill="#10b981" fontSize="11" fontWeight="bold">t</text>
      {/* Weight labels */}
      <text x="88" y="28" fill="#fbbf24" fontSize="9" fontWeight="bold" textAnchor="middle">2</text>
      <text x="92" y="105" fill="#64748b" fontSize="9" fontWeight="bold" textAnchor="middle">7</text>
    </svg>
  );
}

function SeqAlignPreview() {
  const cells = [
    ['',  '',  'P', 'A', 'L', 'A', 'T', 'E'],
    ['',  '0', '2', '4', '6', '8', '10','12'],
    ['P', '2', '0', '2', '4', '6', '8', '10'],
    ['A', '4', '2', '0', '2', '4', '6', '8'],
    ['L', '6', '4', '2', '0', '2', '4', '6'],
  ];
  return (
    <svg viewBox="0 0 200 120" className="preview-svg">
      {cells.map((row, ri) =>
        row.map((cell, ci) => {
          const highlight = ri === 4 && ci === 4;
          return (
            <g key={`${ri}-${ci}`}>
              <rect
                x={ci * 24 + 4} y={ri * 22 + 4}
                width="21" height="19" rx="2"
                fill={highlight ? 'rgba(0,212,255,0.2)' : 'rgba(255,255,255,0.03)'}
                stroke={highlight ? '#00d4ff' : '#1e2d45'}
                strokeWidth="0.5"
              />
              <text
                x={ci * 24 + 14.5} y={ri * 22 + 14}
                textAnchor="middle" dominantBaseline="central"
                fill={highlight ? '#00d4ff' : ci === 0 || ri === 0 ? '#64748b' : '#e2e8f0'}
                fontSize="7"
                fontWeight={highlight ? 'bold' : 'normal'}
              >
                {cell}
              </text>
            </g>
          );
        })
      )}
    </svg>
  );
}

function DijkstraPreview() {
  return (
    <svg viewBox="0 0 200 120" className="preview-svg">
      <defs>
        <marker id="darr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="#2a3f5f" />
        </marker>
      </defs>
      {[
        ['M 40,60 L 95,30', '3'], ['M 40,60 L 95,90', '1'],
        ['M 110,30 L 160,55', '4'], ['M 110,90 L 160,65', '2'],
        ['M 95,30 L 95,90', '5'],
      ].map(([d, w], i) => (
        <g key={i}>
          <path d={d} stroke="#2a3f5f" strokeWidth="1.5" fill="none" markerEnd="url(#darr)" />
          <text fill="#64748b" fontSize="8"
            x={+d.split(' ')[1].split(',')[0] + (+d.split(' ')[3].split(',')[0] - +d.split(' ')[1].split(',')[0]) / 2}
            y={+d.split(' ')[1].split(',')[1] + (+d.split(' ')[3].split(',')[1] - +d.split(' ')[1].split(',')[1]) / 2 - 4}
            textAnchor="middle">{w}</text>
        </g>
      ))}
      {[
        [35, 60, '#fbbf24', 'S'], [100, 30, '#64748b', 'A'],
        [100, 90, '#64748b', 'B'], [165, 60, '#10b981', 'T'],
      ].map(([cx, cy, stroke, label]) => (
        <g key={label as string}>
          <circle cx={cx as number} cy={cy as number} r="14" fill="#0a0e1a" stroke={stroke as string} strokeWidth="2"
            style={label === 'S' ? { filter: 'drop-shadow(0 0 6px #fbbf24)' } : undefined} />
          <text x={cx as number} y={cy as number} textAnchor="middle" dominantBaseline="central"
            fill={stroke as string} fontSize="9" fontWeight="bold">{label as string}</text>
        </g>
      ))}
    </svg>
  );
}

function KnapsackPreview() {
  const items = [
    { w: 2, v: 3, color: '#00d4ff' },
    { w: 3, v: 4, color: '#7c3aed' },
    { w: 4, v: 5, color: '#ff6b35' },
    { w: 5, v: 6, color: '#10b981' },
  ];
  return (
    <svg viewBox="0 0 200 120" className="preview-svg">
      {/* Table header */}
      <text x="10" y="14" fill="#64748b" fontSize="7">w →</text>
      {[0,1,2,3,4,5].map((w) => (
        <text key={w} x={30 + w * 26} y="14" fill="#64748b" fontSize="7" textAnchor="middle">{w}</text>
      ))}
      {/* Rows */}
      {[0,1,2,3].map((ri) => (
        <g key={ri}>
          <circle cx="12" cy={28 + ri * 22} r="7" fill="#0a0e1a" stroke={items[ri].color} strokeWidth="1.5" />
          <text x="12" y={28 + ri * 22} textAnchor="middle" dominantBaseline="central"
            fill={items[ri].color} fontSize="6">{ri+1}</text>
          {[0,1,2,3,4,5].map((ci) => {
            const val = Math.min(ri * 2 + ci, 9);
            const highlight = ri === 3 && ci === 5;
            return (
              <g key={ci}>
                <rect x={19 + ci * 26} y={18 + ri * 22} width="22" height="17" rx="2"
                  fill={highlight ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.03)'}
                  stroke={highlight ? '#10b981' : '#1e2d45'} strokeWidth="0.5" />
                <text x={30 + ci * 26} y={27 + ri * 22} textAnchor="middle" dominantBaseline="central"
                  fill={highlight ? '#10b981' : '#e2e8f0'} fontSize="7"
                  fontWeight={highlight ? 'bold' : 'normal'}>{val}</text>
              </g>
            );
          })}
        </g>
      ))}
    </svg>
  );
}

export default LandingPage;
