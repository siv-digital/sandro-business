import type * as React from 'react';

/** Page band with the brand's vertical rhythm. Dark tones apply .sb-dark automatically. */
export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  tone?: 'light' | 'ivory' | 'dark' | 'deep' | 'wash' | 'live';
  size?: 'md' | 'sm' | 'flush';
  width?: 'default' | 'narrow' | 'wide';
  children?: React.ReactNode;
}
export declare function Section(props: SectionProps): React.JSX.Element;
