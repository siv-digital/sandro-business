import type * as React from 'react';

/** The Sandro sunburst symbol, inlined as a data URI from the client's master PNG. */
export interface MarkProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Ink colour. Ivory on dark fields, titanium on light. */
  tone?: 'ivory' | 'titanium';
  /** Rendered square edge in px. */
  size?: number | string;
  /** Override the inlined artwork (e.g. a licensed SVG once one exists). */
  src?: string;
}
export declare function Mark(props: MarkProps): React.JSX.Element;
export declare const sbMarkIvory: string;
export declare const sbMarkTitanium: string;
