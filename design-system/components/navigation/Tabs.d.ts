import type * as React from 'react';

/** Underlined tab row. The active rule draws in from the left. */
export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: Array<string | { id: string; label: string }>;
  value?: string;
  onChange?: (id: string) => void;
}
export declare function Tabs(props: TabsProps): React.JSX.Element;
