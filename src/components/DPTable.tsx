import React from 'react';
import type { TableRow, AlgorithmStep } from '../types';
import '../styles/DPTable.css';

interface DPTableProps {
  columns: string[];         // e.g. ["v", "A", "B", "t"]
  rows: TableRow[];          // Full table data
  visibleUpToRow: number;    // How many rows to show (0-indexed)
  currentStep: AlgorithmStep | null;
}

// Column header color CSS variables in order
const COL_COLOR_VARS = ['--node-v', '--node-a', '--node-b', '--node-t'];

const DPTable: React.FC<DPTableProps> = ({
  columns,
  rows,
  visibleUpToRow,
  currentStep,
}) => {
  const getCellClass = (rowIndex: number, colIndex: number): string => {
    // Only style cells in the currently active row
    if (rowIndex !== currentStep?.rowIndex) return '';

    if (currentStep?.isFinal && currentStep.improvedCols.includes(colIndex)) {
      return 'cell-final';
    }
    if (currentStep?.activeCol === colIndex) {
      return 'cell-active';
    }
    if (currentStep?.improvedCols.includes(colIndex)) {
      return 'cell-improved';
    }
    return '';
  };

  return (
    <div className="dp-table-wrapper" role="table" aria-label="DP table">
      <table className="dp-table">
        <thead>
          <tr>
            <th className="th-row-label" scope="col"></th>
            {columns.map((col, ci) => (
              <th
                key={col}
                scope="col"
                className="th-col"
                style={{ color: `var(${COL_COLOR_VARS[ci] ?? '--text'})` }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={row.i} className={ri > visibleUpToRow ? 'row-hidden' : ''}>
              <td className="td-row-label">i = {row.i}</td>
              {row.values.map((val, ci) => (
                <td
                  key={ci}
                  id={`cell-${ri}-${ci}`}
                  className={[
                    'td-cell',
                    val === '∞' ? 'cell-inf' : '',
                    ri <= visibleUpToRow ? getCellClass(ri, ci) : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {ri <= visibleUpToRow ? val : '—'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DPTable;
