import type * as React from 'react';

/** Oversized Baskerville numeral + label. Generalised from the brand book's section numbers. */
export interface StatBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  value: React.ReactNode;
  label?: React.ReactNode;
  kicker?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** 'accent' paints the numeral with the signature gradient. One per screen. */
  tone?: 'accent';
  align?: 'left' | 'center' | 'right';
}
export declare function StatBlock(props: StatBlockProps): React.JSX.Element;
