import React from 'react';
import BeatNumbersView from './BeatNumbersView';
import { generateBeatNumbers } from '../../utils/helpers';

const BeatNumbers = ({ currentTimeSignature, measureCount }) => {
  const beatNumbers = generateBeatNumbers(currentTimeSignature.beats, measureCount);

  return (
    <BeatNumbersView beatNumbers={beatNumbers} />
  );
};

export default BeatNumbers;