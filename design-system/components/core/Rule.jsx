import React from 'react';

export function Rule({orientation='horizontal',tone='hairline',animated=false,thickness,className='',style,...rest}){
  const o=orientation==='vertical'?'v':'h';
  const t=thickness?(o==='h'?{height:thickness}:{width:thickness}):null;
  return <hr className={('sb-rule '+className).trim()} data-o={o} data-t={tone}
    data-anim={animated?'1':undefined} style={{...t,...style}} {...rest} />;
}
