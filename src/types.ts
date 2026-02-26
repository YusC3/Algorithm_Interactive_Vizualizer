// ─── Graph Data Types ────────────────────────────────────────────────────────

export interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
  colorVar: string; // CSS variable name e.g. "--node-v"
}

export interface GraphEdge {
  id: string;
  from: string;
  to: string;
  weight: number;
  pathD: string;             // SVG path "d" attribute
  weightPos: { x: number; y: number };
}

// ─── DP Step Types ───────────────────────────────────────────────────────────

export interface AlgorithmStep {
  label: string;             // e.g. "i = 1"
  tag: string;               // Short badge text e.g. "Base Case"
  rowIndex: number;          // Which DP table row this step reveals
  activeCol: number | null;  // Column index currently being evaluated
  improvedCols: number[];    // Columns that improved this step
  highlightEdges: string[];  // Edge IDs to highlight (being checked)
  optimalEdges: string[];    // Edge IDs that form the optimal path so far
  isFinal: boolean;
  explanation: string;       // HTML string with <strong>, <em> etc.
}

// ─── Table Types ─────────────────────────────────────────────────────────────

export interface TableRow {
  i: number;
  values: string[]; // "∞" or numeric string
}

// ─── Full Example Type ───────────────────────────────────────────────────────

export interface Example {
  id: string;
  name: string;
  algorithm: string;
  description: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
  target: string;
  steps: AlgorithmStep[];
  tableColumns: string[];    // e.g. ["v", "A", "B", "t"]
  tableRows: TableRow[];
}
