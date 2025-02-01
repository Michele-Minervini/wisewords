import React from 'react';
import AphorismCard from './AphorismCard';

/**
 * AphorismList renders a grid of aphorism cards.
 */
function AphorismList({ aphorisms, onAphorismClick }) {
  return (
    <div className="aphorism-grid">
      {aphorisms.map(aphorism => (
        <AphorismCard
          key={aphorism.id}
          aphorism={aphorism}
          onClick={onAphorismClick}
        />
      ))}
    </div>
  );
}

export default AphorismList;
