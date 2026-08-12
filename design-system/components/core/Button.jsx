import React from 'react';
import {Icon} from '../icons/Icon.jsx';

export function Button({variant='primary',size='md',iconLeft,iconRight,loading=false,disabled=false,full=false,href,children,className='',style,...rest}){
  const As=href?'a':'button';
  const glyph=size==='lg'?20:size==='sm'?15:17;
  return (
    <As {...(href?{href}:{type:'button'})} className={('sb-btn '+className).trim()}
      data-v={variant} data-size={size} data-full={full?'1':undefined} data-loading={loading?'1':undefined}
      disabled={As==='button'?(disabled||loading):undefined} aria-disabled={disabled?'true':undefined}
      style={style} {...rest}>
      {iconLeft&&<Icon name={iconLeft} size={glyph} />}
      <span>{children}</span>
      {iconRight&&<Icon name={iconRight} size={glyph} />}
    </As>
  );
}
