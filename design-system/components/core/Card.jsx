import React from 'react';
import {Kicker} from '../brand/Kicker.jsx';

export function Card({kicker,title,body,media,mediaAlt='',footer,interactive=false,flat=false,href,children,className='',style,...rest}){
  const As=href?'a':'div';
  return (
    <As {...(href?{href}:{})} className={('sb-card '+className).trim()}
      data-interactive={interactive||href?'1':undefined} data-flat={flat?'1':undefined} style={style} {...rest}>
      {media&&<div className="sb-card-media"><img src={media} alt={mediaAlt} /></div>}
      {(kicker||title||body||footer)&&(
        <div className="sb-card-body">
          {kicker&&<Kicker dash={false}>{kicker}</Kicker>}
          {title&&<h3 style={{fontSize:'var(--text-xl)',lineHeight:1.24}}>{title}</h3>}
          {body&&<p style={{font:'var(--type-body-sm)',color:'var(--text-muted)'}}>{body}</p>}
          {footer&&<div style={{marginTop:'var(--space-2)'}}>{footer}</div>}
        </div>
      )}
      {children}
    </As>
  );
}
