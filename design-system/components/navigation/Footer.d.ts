import type * as React from 'react';

/** Titanium footer. */
export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  columns?: Array<{ title: string; links: string[] }>;
  note?: React.ReactNode;
  /** Approved disclosure copy. Nothing renders when unset. */
  disclosure?: React.ReactNode;
}
export declare function Footer(props: FooterProps): React.JSX.Element;
