import React from 'react';
import type { AlgorithmStep } from '../types';
import '../styles/Explanation.css';

interface ExplanationProps {
  step: AlgorithmStep | null;
  isStarted: boolean;
}

const DEFAULT_HTML =
  'Press <strong>Next Step</strong> to begin. We build the OPT table row by row, starting from <strong>i = 0</strong> — the base case where only <em>t</em> knows its own distance (0).';

const Explanation: React.FC<ExplanationProps> = ({ step, isStarted }) => {
  const isFinal = step?.isFinal ?? false;
  const hasHighlight = (step?.highlightEdges?.length ?? 0) > 0;

  const borderColor = isFinal
    ? 'var(--green)'
    : hasHighlight
    ? 'var(--yellow)'
    : 'var(--accent)';

  return (
    <div
      className="explanation"
      style={{ borderLeftColor: borderColor }}
      role="status"
      aria-live="polite"
    >
      {step && (
        <span className="explanation__tag" style={{ backgroundColor: isFinal ? 'rgba(16,185,129,0.2)' : undefined, color: isFinal ? 'var(--green)' : undefined }}>
          {step.tag}
        </span>
      )}
      <span
        dangerouslySetInnerHTML={{
          __html: isStarted && step ? step.explanation : DEFAULT_HTML,
        }}
      />
    </div>
  );
};

export default Explanation;
