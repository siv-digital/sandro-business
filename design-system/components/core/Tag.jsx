import React from 'react';

export function Tag({children,active=false,onClick,className='',style,...rest}){
  const As=onClick?'button':'span';
  return <As {...(onClick?{type:'button',onClick}:{})} className={('sb-tag '+className).trim()}
    data-active={active?'1':undefined} data-clickable={onClick?'1':undefined} style={style} {...rest}>{children}</As>;
}
