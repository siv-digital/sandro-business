import React from 'react';
import {Icon} from '../icons/Icon.jsx';

export function IconButton({name,label,variant='quiet',size='md',disabled=false,href,className='',style,...rest}){
  const As=href?'a':'button';
  return (
    <As {...(href?{href}:{type:'button'})} className={('sb-iconbtn '+className).trim()}
      data-v={variant} data-size={size} disabled={As==='button'?disabled:undefined}
      aria-label={label} title={label} style={style} {...rest}>
      <Icon name={name} size={size==='sm'?16:size==='lg'?22:19} />
    </As>
  );
}
