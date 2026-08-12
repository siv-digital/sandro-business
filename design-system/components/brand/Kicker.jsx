import React from 'react';

export function Kicker({children,dash=true,as='div',className='',style,...rest}){
  const As=as;
  return <As className={('sb-kick '+className).trim()} style={style} {...rest}>
    {dash&&<span className="sb-kick-dash" />}
    <span>{children}</span>
  </As>;
}
