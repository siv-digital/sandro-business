import React from 'react';
import {Kicker} from '../brand/Kicker.jsx';

const SIZES={sm:'var(--text-3xl)',md:'var(--text-4xl)',lg:'var(--text-5xl)',xl:'var(--text-6xl)'};

export function StatBlock({value,label,kicker,size='lg',tone,align='left',className='',style,...rest}){
  return (
    <div className={('sb-stat '+className).trim()} data-tone={tone} style={{textAlign:align,...style}} {...rest}>
      {kicker&&<Kicker dash={false}>{kicker}</Kicker>}
      <div className="sb-stat-value" style={{fontSize:SIZES[size]||SIZES.lg}}>{value}</div>
      {label&&<div style={{font:'var(--type-body-sm)',color:'var(--text-muted)',maxWidth:'32ch'}}>{label}</div>}
    </div>
  );
}
