import React, { useState, useEffect, useRef, useCallback } from 'react';
import Graph from './Graph';
import DPTable from './DPTable';
import Controls from './Controls';
import Explanation from './Explanation';
import { getExamplesForAlgorithm } from '../data';
import type { Example } from '../types';
import '../styles/main.css';

interface VisualizerProps {
  algorithmId: string;
  onBack: () => void;
}

const AUTO_PLAY_INTERVAL_MS = 1800;

const Visualizer: React.FC<VisualizerProps> = ({ algorithmId, onBack }) => {
  // ── Load examples for this algorithm from data/<algorithmId>/ ───────────
  const examples: Example[] = getExamplesForAlgorithm(algorithmId);

  const [selectedExampleId, setSelectedExampleId] = useState<string>(
    examples[0]?.id ?? ''
  );

  const example: Example =
    examples.find((e) => e.id === selectedExampleId) ?? examples[0];

  // ── Playback state ───────────────────────────────────────────────────────
  const [stepIndex, setStepIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isStarted = stepIndex >= 0;
  const currentStep = isStarted ? example.steps[stepIndex] : null;
  const visibleUpToRow = currentStep?.rowIndex ?? -1;

  // ── Controls ─────────────────────────────────────────────────────────────
  const stopAuto = useCallback(() => {
    if (autoRef.current !== null) {
      clearInterval(autoRef.current);
      autoRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const handleNext = useCallback(() => {
    setStepIndex((prev) => {
      const next = prev + 1;
      if (next >= example.steps.length - 1) stopAuto();
      return Math.min(next, example.steps.length - 1);
    });
  }, [example.steps.length, stopAuto]);

  const handleReset = useCallback(() => {
    stopAuto();
    setStepIndex(-1);
  }, [stopAuto]);

  const handleToggleAuto = useCallback(() => {
    if (isPlaying) {
      stopAuto();
    } else {
      setIsPlaying(true);
      autoRef.current = setInterval(() => {
        setStepIndex((prev) => {
          const next = prev + 1;
          if (next >= example.steps.length - 1) {
            stopAuto();
            return example.steps.length - 1;
          }
          return next;
        });
      }, AUTO_PLAY_INTERVAL_MS);
    }
  }, [isPlaying, stopAuto, example.steps.length]);

  // Reset when example changes
  useEffect(() => {
    handleReset();
  }, [selectedExampleId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Cleanup on unmount
  useEffect(() => () => stopAuto(), [stopAuto]);

  // ── Guard: no examples loaded ────────────────────────────────────────────
  if (!example) {
    return (
      <div className="app">
        <div className="visualizer__empty">
          <p>No examples found for algorithm: <code>{algorithmId}</code></p>
          <button className="app__back-btn" onClick={onBack}>← Back</button>
        </div>
      </div>
    );
  }

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="app">
      {/* Header */}
      <header className="app__header">
        <div className="app__header-inner">
          <div className="app__header-left">
            <button className="app__back-btn" onClick={onBack} aria-label="Back to home">
              ← Home
            </button>
            <div>
              <h1 className="app__title">{example.name}</h1>
              <p className="app__subtitle">// {example.algorithm}</p>
            </div>
          </div>

          {/* Example switcher — only shown if algorithm has multiple examples */}
          {examples.length > 1 && (
            <div className="example-selector">
              <label htmlFor="example-select" className="example-selector__label">
                Example:
              </label>
              <select
                id="example-select"
                className="example-selector__select"
                value={selectedExampleId}
                onChange={(e) => setSelectedExampleId(e.target.value)}
              >
                {examples.map((ex) => (
                  <option key={ex.id} value={ex.id}>
                    {ex.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </header>

      {/* Main */}
      <main className="app__main">
        <div className="app__description">
          <span className="badge">{example.algorithm}</span>
          <span className="description-text">{example.description}</span>
        </div>

        <div className="app__panels">
          <section className="panel" aria-label="Graph visualization">
            <p className="panel__label">// digraph G</p>
            <Graph
              nodes={example.nodes}
              edges={example.edges}
              currentStep={currentStep}
            />
            <Legend />
          </section>

          <section className="panel" aria-label="DP table">
            <p className="panel__label">// OPT(i, v) — min cost to reach t</p>
            <DPTable
              columns={example.tableColumns}
              rows={example.tableRows}
              visibleUpToRow={visibleUpToRow}
              currentStep={currentStep}
            />
            <Controls
              currentStep={stepIndex}
              totalSteps={example.steps.length}
              isPlaying={isPlaying}
              onNext={handleNext}
              onReset={handleReset}
              onToggleAuto={handleToggleAuto}
            />
          </section>
        </div>

        <Explanation step={currentStep} isStarted={isStarted} />
      </main>

      <footer className="app__footer">
        <span>Algorithm Visualizer · built with React + Vite</span>
      </footer>
    </div>
  );
};

// ── Legend ───────────────────────────────────────────────────────────────────
const Legend: React.FC = () => (
  <div className="legend">
    {[
      { color: 'var(--node-v)', label: 'source node' },
      { color: 'var(--node-t)', label: 'target node t' },
      { color: 'var(--yellow)', label: 'edge being checked' },
      { color: 'var(--green)', label: 'optimal path' },
    ].map(({ color, label }) => (
      <div key={label} className="legend__item">
        <span className="legend__dot" style={{ background: color }} />
        <span className="legend__label">{label}</span>
      </div>
    ))}
  </div>
);

export default Visualizer;
