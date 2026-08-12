import type * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary = khaki fill (the file's own button) · accent = aqua #0BA0BD · gradient = the live signature gradient, for the one hero CTA · secondary = keyline · ghost = quiet · link = inline */
  variant?: 'primary' | 'accent' | 'gradient' | 'secondary' | 'ghost' | 'link';
  /** On `accent` only: deepens the fill to aqua-700 so the label can be white. */
  'data-ink'?: 'light';
  size?: 'sm' | 'md' | 'lg';
  /** Sandro icon name (PascalCase, see components/icons/Icon.d.ts) rendered before the label. */
  iconLeft?: string;
  /** Lucide icon name rendered after the label. 'ArrowRight' is the house CTA. */
  iconRight?: string;
  /** Sheen sweep; label hidden, pointer events off. */
  loading?: boolean;
  disabled?: boolean;
  full?: boolean;
  /** Renders as an anchor when set. */
  href?: string;
  children?: React.ReactNode;
}
export declare function Button(props: ButtonProps): React.JSX.Element;
