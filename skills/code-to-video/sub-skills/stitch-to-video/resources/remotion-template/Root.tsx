import React from 'react';
import {Composition} from 'remotion';
import {WalkthroughComposition} from './WalkthroughComposition';
import {FPS, SCREENS, TRANSITION_DURATION} from './screens';

const TITLE_DURATION = 90;

const totalFrames =
  TITLE_DURATION +
  SCREENS.reduce(
    (acc, screen) =>
      acc + Math.round(screen.durationInSeconds * FPS) + TRANSITION_DURATION,
    0
  );

export const Root: React.FC = () => {
  return (
    <Composition
      id="WalkthroughComposition"
      component={WalkthroughComposition}
      durationInFrames={totalFrames}
      fps={FPS}
      width={1280}
      height={720}
    />
  );
};
