import type * as React from 'react';

/** Small status marker. Soft fill by default; solid for high-emphasis states. */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: 'neutral' | 'accent' | 'info' | 'positive' | 'caution' | 'critical';
  solid?: boolean;
  dot?: boolean;
  children?: React.ReactNode;
}
export declare function Badge(props: BadgeProps): React.JSX.Element;
