import type * as React from 'react';

/**
 * The brand book's page composition: narrow label column, one full-height hairline, wide content column.
 */
export interface EditorialColumnsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Left column: kicker plus a short paragraph. Keep it under ~40 words. */
  aside?: React.ReactNode;
  children?: React.ReactNode;
}
export declare function EditorialColumns(props: EditorialColumnsProps): React.JSX.Element;
