import type * as React from 'react';

/**
 * Sticky 76px site header. Transparent over a dark hero, glass over light content.
 */
export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  items?: Array<string | { id: string; label: string }>;
  active?: string;
  onNavigate?: (id: string) => void;
  tone?: 'light' | 'dark' | 'transparent';
  logoUnit?: 'business' | 'wealth';
  /** Label for the trailing call to action. Omit for a nav-only header. */
  cta?: string;
}
export declare function Header(props: HeaderProps): React.JSX.Element;
