import React from 'react';
import '../styles/Controls.css';

interface ControlsProps {
  currentStep: number;       // -1 = not started
  totalSteps: number;
  isPlaying: boolean;
  onNext: () => void;
  onReset: () => void;
  onToggleAuto: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  currentStep,
  totalSteps,
  isPlaying,
  onNext,
  onReset,
  onToggleAuto,
}) => {
  const isAtEnd = currentStep >= totalSteps - 1;
  const displayStep = currentStep < 0 ? 0 : currentStep + 1;

  return (
    <div className="controls" role="group" aria-label="Playback controls">
      <button
        className="btn btn-reset"
        onClick={onReset}
        aria-label="Reset to beginning"
      >
        ↺ Reset
      </button>

      <button
        className="btn btn-next"
        onClick={onNext}
        disabled={isAtEnd}
        aria-label="Advance to next step"
      >
        Next Step →
      </button>

      <button
        className={`btn btn-auto ${isPlaying ? 'btn-auto--playing' : ''}`}
        onClick={onToggleAuto}
        aria-label={isPlaying ? 'Pause auto-play' : 'Start auto-play'}
      >
        {isPlaying ? '⏸ Pause' : '▶ Auto'}
      </button>

      <span className="step-counter" aria-live="polite">
        step {displayStep} / {totalSteps}
      </span>
    </div>
  );
};

export default Controls;
