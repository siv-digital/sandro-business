import type * as React from 'react';

/** Square icon-only control. Always give it a label — it becomes aria-label and title. */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  label: string;
  variant?: 'quiet' | 'outline' | 'solid' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
}
export declare function IconButton(props: IconButtonProps): React.JSX.Element;
