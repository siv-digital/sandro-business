import type * as React from 'react';

/** Uppercase, wide-tracked eyebrow label. The brand's most-repeated device. */
export interface KickerProps extends React.HTMLAttributes<HTMLElement> {
  /** Leading 28px aqua hairline that draws in on mount. */
  dash?: boolean;
  as?: keyof React.JSX.IntrinsicElements;
  children?: React.ReactNode;
}
export declare function Kicker(props: KickerProps): React.JSX.Element;
