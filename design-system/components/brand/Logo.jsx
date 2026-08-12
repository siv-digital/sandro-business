import React from 'react';
import {Mark} from './Mark.jsx';

export function Logo({unit='business',tone='ivory',height=40,symbolOnly=false,href,className='',style,...rest}){
  const ink=tone==='titanium'?'var(--sb-titanium-800)':'var(--sb-ivory)';
  const word=unit==='wealth'?'SandroWealth':'SandroBusiness';
  const As=href?'a':'span';
  return (
    <As {...(href?{href}:{})} aria-label={word} className={('sb-logo '+className).trim()}
      style={{gap:Math.round(height*0.24),...style}} {...rest}>
      <Mark tone={tone} size={height} />
      {!symbolOnly&&<span className="sb-logo-word" style={{fontSize:Math.round(height*0.72),color:ink}}>{word}</span>}
    </As>
  );
}
