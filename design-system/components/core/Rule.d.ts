import type * as React from 'react';

/** A hairline. Horizontal separators and the full-height vertical column rule. */
export interface RuleProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical';
  tone?: 'hairline' | 'strong' | 'accent' | 'warm' | 'gradient';
  /** scaleX draw-in on mount. Horizontal only. */
  animated?: boolean;
  thickness?: number | string;
}
export declare function Rule(props: RuleProps): React.JSX.Element;
