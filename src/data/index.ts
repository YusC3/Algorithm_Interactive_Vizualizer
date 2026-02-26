import bellmanFordExamples from './bellman-ford';
import type { Example } from '../types';

/**
 * Registry mapping algorithm ID → array of Example objects.
 *
 * To add a new algorithm:
 *   1. Create src/data/<algorithm-id>/example1.json  (and more as needed)
 *   2. Create src/data/<algorithm-id>/index.ts
 *   3. Import and add it here.
 */
const exampleRegistry: Record<string, Example[]> = {
  'bellman-ford': bellmanFordExamples,
  // 'sequence-alignment': sequenceAlignmentExamples,
  // 'dijkstra': dijkstraExamples,
  // 'knapsack': knapsackExamples,
};

/**
 * Get all examples for a given algorithm ID.
 * Returns an empty array if the algorithm has no examples yet.
 */
export function getExamplesForAlgorithm(algorithmId: string): Example[] {
  return exampleRegistry[algorithmId] ?? [];
}

/**
 * Flat list of ALL examples across all algorithms.
 */
export function getAllExamples(): Example[] {
  return Object.values(exampleRegistry).flat();
}

export default exampleRegistry;
