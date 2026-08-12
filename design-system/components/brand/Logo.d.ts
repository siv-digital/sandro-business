import type * as React from 'react';

/**
 * The Sandro lockup: sunburst symbol + wordmark. Business is the default unit.
 */
export interface LogoProps extends React.HTMLAttributes<HTMLElement> {
  /** Which business unit's wordmark to set. */
  unit?: 'business' | 'wealth';
  /** Ink colour. Must contrast with the field behind it. */
  tone?: 'ivory' | 'titanium';
  /** Symbol edge in px; the wordmark and gap scale from this. Keep >= 28. */
  height?: number;
  /** Drop the wordmark — favicons, avatars, genuinely tight spaces only. */
  symbolOnly?: boolean;
  /** Renders as an anchor when set. */
  href?: string;
}
export declare function Logo(props: LogoProps): React.JSX.Element;
