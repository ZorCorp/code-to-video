import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {Screen} from './screens';

interface ScreenSlideProps {
  screen: Screen;
  isLast: boolean;
}

export const ScreenSlide: React.FC<ScreenSlideProps> = ({screen, isLast}) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  // Fade in
  const fadeIn = spring({
    frame,
    fps,
    config: {damping: 20, stiffness: 80},
    durationInFrames: 20,
  });

  // Subtle zoom in over the full duration
  const scale = interpolate(frame, [0, durationInFrames], [1, 1.04], {
    extrapolateRight: 'clamp',
  });

  // Fade out near end (unless last screen)
  const fadeOut = isLast
    ? 1
    : interpolate(frame, [durationInFrames - 20, durationInFrames], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });

  const opacity = Math.min(fadeIn, fadeOut);

  const isMobile = screen.device === 'mobile';

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0a0a1a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
      }}
    >
      {/* Background gradient */}
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse at center, #001a3a 0%, #0a0a1a 70%)',
        }}
      />

      {/* Device mockup */}
      <div
        style={{
          position: 'relative',
          transform: `scale(${scale})`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Screen image with device frame */}
        <div
          style={{
            borderRadius: isMobile ? 36 : 20,
            overflow: 'hidden',
            boxShadow: '0 40px 120px rgba(0,0,0,0.8), 0 0 0 2px rgba(255,255,255,0.1)',
            border: `${isMobile ? 8 : 12}px solid #1a1a2e`,
            maxHeight: isMobile ? 700 : 560,
            maxWidth: isMobile ? 340 : 900,
          }}
        >
          <Img
            src={staticFile(screen.imagePath)}
            style={{
              display: 'block',
              maxHeight: isMobile ? 684 : 536,
              maxWidth: isMobile ? 324 : 876,
              objectFit: 'cover',
            }}
          />
        </div>
      </div>

      {/* Bottom text overlay */}
      <div
        style={{
          position: 'absolute',
          bottom: 60,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}
      >
        {/* Device badge */}
        <div
          style={{
            backgroundColor: '#C4972F',
            color: '#fff',
            fontSize: 13,
            fontWeight: 700,
            padding: '4px 14px',
            borderRadius: 20,
            letterSpacing: 1,
            fontFamily: 'sans-serif',
            textTransform: 'uppercase',
          }}
        >
          {isMobile ? 'Mobile' : 'Tablet / Kiosk'}
        </div>

        {/* Title */}
        <div
          style={{
            color: '#ffffff',
            fontSize: 28,
            fontWeight: 700,
            fontFamily: 'sans-serif',
            textAlign: 'center',
            textShadow: '0 2px 12px rgba(0,0,0,0.8)',
          }}
        >
          {screen.title}
        </div>

        {/* Description */}
        <div
          style={{
            color: 'rgba(255,255,255,0.65)',
            fontSize: 16,
            fontFamily: 'sans-serif',
            textAlign: 'center',
            maxWidth: 700,
            textShadow: '0 1px 6px rgba(0,0,0,0.8)',
          }}
        >
          {screen.description}
        </div>
      </div>
    </AbsoluteFill>
  );
};
