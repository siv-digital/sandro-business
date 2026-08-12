import type * as React from 'react';

/** Rise-and-fade (or editorial wipe) on scroll into view. The Business motion primitive. */
export interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  /** Sibling position; multiplies the 70ms stagger. */
  index?: number;
  /** Extra delay in ms on top of the stagger. */
  delay?: number;
  /** 'rise' = 20px translate + fade · 'wipe' = clip-path reveal from the baseline, for display type. */
  mode?: 'rise' | 'wipe';
  as?: keyof React.JSX.IntrinsicElements;
  threshold?: number;
  children?: React.ReactNode;
}
export declare function Reveal(props: RevealProps): React.JSX.Element;
