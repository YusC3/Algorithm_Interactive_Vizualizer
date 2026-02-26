# Algorithm Interactive Visualizer

An interactive web app for visualizing dynamic programming algorithms on directed graphs — built with **React + TypeScript + Vite**.

🌐 **Live site:** [https://yourusername.github.io/Algorithm_Interactive_Vizualizer/](https://yourusername.github.io/Algorithm_Interactive_Vizualizer/)

---

## Features

- **Step-by-step graph visualization** — nodes, edges, and weights highlighted as the algorithm runs
- **DP table** — fills in row by row with active/improved/final cell states
- **Interactive controls** — Next Step, Reset, Auto-play
- **Explanation panel** — contextual description at each step
- **JSON-driven examples** — add your own graphs without touching component code

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite | Dev server + build |
| CSS Modules (per component) | Scoped styles |
| GitHub Pages (`/docs`) | Deployment |

---

## Local Development

```bash
# 1. Clone
git clone https://github.com/yourusername/Algorithm_Interactive_Vizualizer.git
cd Algorithm_Interactive_Vizualizer

# 2. Install
npm install

# 3. Dev server (hot reload)
npm run dev

# 4. Production preview
npm run build
npm run preview
```

---

## GitHub Pages Deployment

The Vite config outputs to `/docs` with the correct base path:

```bash
npm run build
# Commits /docs to main branch
git add docs
git commit -m "deploy"
git push
```

Then in GitHub repo → **Settings → Pages**:
- Branch: `main`
- Folder: `/docs`

---

## Adding Custom Examples

Edit `src/data/examples.json`. Each example follows this structure:

```jsonc
{
  "id": "my-example",
  "name": "My Custom Graph",
  "algorithm": "bellman-ford",
  "description": "Short description shown in the UI.",
  "nodes": [
    { "id": "s", "label": "s", "x": 80, "y": 110, "colorVar": "--node-v" }
    // ...
  ],
  "edges": [
    {
      "id": "e-sA", "from": "s", "to": "A", "weight": 3,
      "pathD": "M 108,105 Q 180,70 252,105",
      "weightPos": { "x": 178, "y": 72 }
    }
    // ...
  ],
  "target": "t",
  "tableColumns": ["s", "A", "t"],
  "tableRows": [
    { "i": 0, "values": ["∞", "∞", "0"] }
    // ...
  ],
  "steps": [
    {
      "label": "i = 0",
      "tag": "Base Case",
      "rowIndex": 0,
      "activeCol": null,
      "improvedCols": [],
      "highlightEdges": [],
      "optimalEdges": [],
      "isFinal": false,
      "explanation": "With <strong>0 edges</strong>, only <em>t</em> knows its distance."
    }
    // ...
  ]
}
```

**Node color variables available:**
- `--node-v` (cyan)
- `--node-a` (purple)
- `--node-b` (orange)
- `--node-t` (green)

---

## Folder Structure

```
algorithm-visualizer/
├── public/                  # Static assets
├── src/
│   ├── components/
│   │   ├── Graph.tsx        # SVG digraph rendering
│   │   ├── DPTable.tsx      # DP table with step highlighting
│   │   ├── Controls.tsx     # Next / Reset / Auto buttons
│   │   └── Explanation.tsx  # Step explanation panel
│   ├── data/
│   │   └── examples.json    # All example graphs + steps
│   ├── styles/
│   │   ├── main.css         # Global styles + CSS variables
│   │   ├── Graph.css
│   │   ├── DPTable.css
│   │   ├── Controls.css
│   │   └── Explanation.css
│   ├── types.ts             # Shared TypeScript interfaces
│   ├── App.tsx              # Root component + state logic
│   └── main.tsx             # React entry point
├── docs/                    # Production build → GitHub Pages
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## Roadmap

- [ ] Multiple algorithms (Dijkstra, Floyd-Warshall)
- [ ] User-uploaded JSON graphs
- [ ] Dark / light mode toggle
- [ ] Animated edge transitions
- [ ] Mobile-optimized layout
