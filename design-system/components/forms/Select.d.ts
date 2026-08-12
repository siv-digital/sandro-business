import type * as React from 'react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  /** Strings, or { value, label } pairs. */
  options?: Array<string | { value: string; label: string }>;
  size?: 'sm' | 'md';
}
export declare function Select(props: SelectProps): React.JSX.Element;
