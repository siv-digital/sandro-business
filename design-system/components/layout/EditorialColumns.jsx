import React from 'react';
import {Rule} from '../core/Rule.jsx';

/* The brand book's signature page composition: a narrow label column, a single
   full-height hairline, and a wide content column. */
export function EditorialColumns({aside,children,className='',style,...rest}){
  return (
    <div className={('sb-edcols '+className).trim()} style={style} {...rest}>
      <div className="sb-edcols-aside">{aside}</div>
      <Rule orientation="vertical" />
      <div>{children}</div>
    </div>
  );
}
