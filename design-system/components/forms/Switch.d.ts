import type * as React from 'react';

/** Binary toggle. Aqua when on — the one place accent colour signals state. */
export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
}
export declare function Switch(props: SwitchProps): React.JSX.Element;
