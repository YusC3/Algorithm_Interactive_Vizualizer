import React from 'react';
import type { GraphNode, GraphEdge, AlgorithmStep } from '../types';
import '../styles/Graph.css';

interface GraphProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  currentStep: AlgorithmStep | null;
}

const Graph: React.FC<GraphProps> = ({ nodes, edges, currentStep }) => {
  const highlightSet = new Set(currentStep?.highlightEdges ?? []);
  const optimalSet   = new Set(currentStep?.optimalEdges ?? []);

  const getEdgeClass = (edgeId: string): string => {
    if (optimalSet.has(edgeId))   return 'edge-path optimal';
    if (highlightSet.has(edgeId)) return 'edge-path highlight';
    return 'edge-path';
  };

  const getWeightClass = (edgeId: string): string => {
    if (optimalSet.has(edgeId))   return 'edge-weight optimal';
    if (highlightSet.has(edgeId)) return 'edge-weight highlight';
    return 'edge-weight';
  };

  return (
    <svg
      className="graph-svg"
      viewBox="0 0 460 270"
      aria-label="Directed graph visualization"
    >
      <defs>
        <marker id="arrow-default" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" className="arrow-default" />
        </marker>
        <marker id="arrow-highlight" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" className="arrow-highlight" />
        </marker>
        <marker id="arrow-optimal" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" className="arrow-optimal" />
        </marker>
      </defs>

      {/* Render edges first (behind nodes) */}
      {edges.map((edge) => {
        const cls = getEdgeClass(edge.id);
        const markerUrl = cls.includes('optimal')
          ? 'url(#arrow-optimal)'
          : cls.includes('highlight')
          ? 'url(#arrow-highlight)'
          : 'url(#arrow-default)';

        return (
          <g key={edge.id}>
            <path
              id={edge.id}
              className={cls}
              d={edge.pathD}
              markerEnd={markerUrl}
            />
            <text
              className={getWeightClass(edge.id)}
              x={edge.weightPos.x}
              y={edge.weightPos.y}
            >
              {edge.weight}
            </text>
          </g>
        );
      })}

      {/* Render nodes */}
      {nodes.map((node) => (
        <g key={node.id}>
          <circle
            className="node-circle"
            cx={node.x}
            cy={node.y}
            r={28}
            style={{ stroke: `var(${node.colorVar})` }}
          />
          <text
            className="node-label"
            x={node.x}
            y={node.y}
            style={{ fill: `var(${node.colorVar})` }}
          >
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
};

export default Graph;
