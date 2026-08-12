import type * as React from 'react';

/** Checkbox, or a radio when radio is set (same box, pill radius, dot mark). */
export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  radio?: boolean;
}
export declare function Checkbox(props: CheckboxProps): React.JSX.Element;
