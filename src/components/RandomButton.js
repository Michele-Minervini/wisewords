import React from 'react';

/**
 * RandomButton triggers a callback to select a random aphorism.
 */
function RandomButton({ onClick }) {
  return (
    <button onClick={onClick} style={{ padding: '5px 10px', cursor: 'pointer' }}>
      Random Aphorism
    </button>
  );
}

export default RandomButton;
