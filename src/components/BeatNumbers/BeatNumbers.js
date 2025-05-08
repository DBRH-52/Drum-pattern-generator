import React from 'react';
import BeatNumbersView from './BeatNumbersView';
import { generateBeatNumbers } from '../../utils/helpers';

// Generate and pass beat number data to the view
const BeatNumbers = ({ currentTimeSignature, measureCount }) => {
  // Generate an array of beat objects based on the time signature and number of measures
  const beatNumbers = generateBeatNumbers(currentTimeSignature.beats, measureCount);

  // Render the view withthe calcualted beat numbers
  return (
    <BeatNumbersView beatNumbers={beatNumbers} />
  );
};

export default BeatNumbers;