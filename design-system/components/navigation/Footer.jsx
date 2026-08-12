import React from 'react';
import {Logo} from '../brand/Logo.jsx';
import {Rule} from '../core/Rule.jsx';

export function Footer({columns=[],note,disclosure,className='',style,...rest}){
  return (
    <footer className={('sb-footer sb-dark '+className).trim()} style={style} {...rest}>
      <div className="sb-footer-top" style={{maxWidth:'var(--container-max)',margin:'0 auto'}}>
        <div style={{display:'flex',flexDirection:'column',gap:'var(--space-5)'}}>
          <Logo unit="business" tone="ivory" height={30} />
          {note&&<p style={{font:'var(--type-body-sm)',color:'var(--text-on-inverse-muted)',maxWidth:'28ch'}}>{note}</p>}
        </div>
        <div className="sb-footer-cols">
          {columns.map(col=>(
            <div key={col.title} style={{display:'flex',flexDirection:'column',gap:'var(--space-3)'}}>
              <div className="sb-kicker" style={{color:'var(--text-on-inverse-muted)'}}>{col.title}</div>
              {col.links.map(l=><a key={l} href="#" style={{font:'var(--type-body-sm)',color:'var(--sb-ivory)',borderBottomColor:'transparent'}}>{l}</a>)}
            </div>
          ))}
        </div>
      </div>
      <div style={{maxWidth:'var(--container-max)',margin:'var(--space-16) auto 0'}}>
        <Rule tone="hairline" />
        {disclosure&&<p style={{font:'var(--type-small)',color:'var(--text-on-inverse-muted)',marginTop:'var(--space-5)'}}>{disclosure}</p>}
      </div>
    </footer>
  );
}
