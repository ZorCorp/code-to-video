// ============================================================
// screens.ts — Fill in this array based on your Stitch screens.
// AI will auto-generate this file with actual content.
// ============================================================

export interface Screen {
  id: string;
  title: string;
  description: string;
  imagePath: string;
  device: 'tablet' | 'mobile';
  durationInSeconds: number;
}

export const SCREENS: Screen[] = [
  // Example screens — AI will replace with actual content
  {
    id: '01',
    title: 'First Page',
    description: 'Describe what this page does',
    imagePath: 'assets/screens/01-first-screen.png',
    device: 'tablet',
    durationInSeconds: 4,
  },
  {
    id: '02',
    title: 'Second Page',
    description: 'Describe what this page does',
    imagePath: 'assets/screens/02-second-screen.png',
    device: 'mobile',
    durationInSeconds: 3.5,
  },
];

export const FPS = 30;
export const TRANSITION_DURATION = 20; // frames

export const totalDurationInFrames = SCREENS.reduce(
  (acc, screen) => acc + screen.durationInSeconds * FPS + TRANSITION_DURATION,
  0
);
