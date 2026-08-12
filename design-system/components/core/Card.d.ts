import type * as React from 'react';

/**
 * White surface, hairline border, 10px radius. Hover lift is 2px and nothing more.
 */
export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  kicker?: React.ReactNode;
  title?: React.ReactNode;
  body?: React.ReactNode;
  /** Image URL for the 16:10 media area. Hard top corners, scales 1.03 on hover. */
  media?: string;
  mediaAlt?: string;
  footer?: React.ReactNode;
  /** Enables the hover lift. Implied when href is set. */
  interactive?: boolean;
  /** Removes the resting shadow — for cards inside an already-elevated surface. */
  flat?: boolean;
  href?: string;
  children?: React.ReactNode;
}
export declare function Card(props: CardProps): React.JSX.Element;
