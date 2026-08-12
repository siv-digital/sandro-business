import type * as React from 'react';

/** Pill-shaped filter/category token. The only pill in the system besides avatars. */
export interface TagProps extends React.HTMLAttributes<HTMLElement> {
  active?: boolean;
  /** Supplying onClick renders a <button>. */
  onClick?: () => void;
  children?: React.ReactNode;
}
export declare function Tag(props: TagProps): React.JSX.Element;
