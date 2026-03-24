import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {ScreenSlide} from './ScreenSlide';
import {FPS, SCREENS, TRANSITION_DURATION} from './screens';

// ============================================================
// TitleCard — Edit here to customize the intro title card
// ============================================================
const TitleCard: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const logoScale = spring({frame, fps, config: {damping: 14, stiffness: 60}, durationInFrames: 30});
  const textOpacity = interpolate(frame, [20, 45], [0, 1], {extrapolateRight: 'clamp'});
  const subtitleOpacity = interpolate(frame, [40, 65], [0, 1], {extrapolateRight: 'clamp'});
  const fadeOut = interpolate(frame, [70, 90], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #003366 0%, #001a3a 60%, #0a0014 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fadeOut,
      }}
    >
      {/* Accent line */}
      <div style={{
        width: 80,
        height: 4,
        backgroundColor: '#C4972F',
        borderRadius: 2,
        marginBottom: 32,
        transform: `scaleX(${logoScale})`,
      }} />

      {/* Main title — update to your project name */}
      <div style={{
        color: '#ffffff',
        fontSize: 52,
        fontWeight: 800,
        fontFamily: 'sans-serif',
        textAlign: 'center',
        opacity: textOpacity,
        letterSpacing: -1,
      }}>
        Project Name
      </div>

      <div style={{
        color: '#C4972F',
        fontSize: 26,
        fontWeight: 600,
        fontFamily: 'sans-serif',
        textAlign: 'center',
        opacity: textOpacity,
        marginTop: 8,
        letterSpacing: 2,
      }}>
        Project English Name
      </div>

      {/* Accent line */}
      <div style={{
        width: 80,
        height: 4,
        backgroundColor: '#C4972F',
        borderRadius: 2,
        margin: '32px 0 24px',
        transform: `scaleX(${logoScale})`,
      }} />

      <div style={{
        color: 'rgba(255,255,255,0.7)',
        fontSize: 20,
        fontFamily: 'sans-serif',
        textAlign: 'center',
        opacity: subtitleOpacity,
      }}>
        POC Demo
      </div>

      <div style={{
        color: 'rgba(196,151,47,0.8)',
        fontSize: 14,
        fontFamily: 'sans-serif',
        marginTop: 12,
        opacity: subtitleOpacity,
        letterSpacing: 3,
        textTransform: 'uppercase',
      }}>
        Powered by AI
      </div>
    </AbsoluteFill>
  );
};

export const WalkthroughComposition: React.FC = () => {
  const TITLE_DURATION = 90; // 3 seconds at 30fps

  let currentFrame = 0;

  return (
    <AbsoluteFill style={{backgroundColor: '#0a0a1a'}}>
      {/* Title card */}
      <Sequence from={0} durationInFrames={TITLE_DURATION}>
        <TitleCard />
      </Sequence>

      {/* Screen slides */}
      {SCREENS.map((screen, index) => {
        if (index === 0) {
          currentFrame = TITLE_DURATION;
        }

        const screenDurationInFrames = Math.round(screen.durationInSeconds * FPS);
        const startFrame = currentFrame;
        currentFrame += screenDurationInFrames + TRANSITION_DURATION;

        return (
          <Sequence
            key={screen.id}
            from={startFrame}
            durationInFrames={screenDurationInFrames + TRANSITION_DURATION}
          >
            <ScreenSlide
              screen={screen}
              isLast={index === SCREENS.length - 1}
            />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
