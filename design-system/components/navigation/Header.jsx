import React from 'react';
import {Logo} from '../brand/Logo.jsx';
import {Button} from '../core/Button.jsx';
import {Icon} from '../icons/Icon.jsx';

export function Header({items=[],active,onNavigate,tone='light',logoUnit='business',cta,onCta,className='',style,...rest}){
  const dark=tone==='dark'||tone==='transparent';
  const [open,setOpen]=React.useState(false);
  /* The panel only exists below the nav breakpoint. If the viewport grows past
     it while the panel is open the links would otherwise be left in a sheet
     that is no longer rendered as one. */
  React.useEffect(()=>{
    if(!open) return undefined;
    const mq=window.matchMedia('(min-width:821px)');
    const close=()=>setOpen(false);
    mq.addEventListener('change',close);
    return ()=>mq.removeEventListener('change',close);
  },[open]);
  const nav=(key)=>{setOpen(false);if(onNavigate)onNavigate(key);};
  /* Sticky chrome over unknown ground. The translucent rest state only works over
     the field the header starts on; once the page scrolls, white sections pass
     under it and the ivory logo and links disappear. data-scrolled lets CSS swap
     to a near-opaque ground. Passive listener + a rAF gate so this cannot
     contribute to scroll jank, and it reads the state once on mount because a
     reload can restore a scrolled position. */
  const [scrolled,setScrolled]=React.useState(false);
  React.useEffect(()=>{
    let queued=false,last=0;
    const read=()=>{queued=false;setScrolled(last>18);};
    const measure=(t)=>{
      /* Whichever thing actually scrolls: the window in a standalone page, or an
         inner element when the header is mounted inside a scrolling host (a
         template preview, an embedded frame). A window-only listener silently
         never fires in the second case, so the header would stay translucent. */
      const el=t&&t.scrollTop!==undefined&&t!==document?t:null;
      last=Math.max(window.scrollY||0,document.documentElement.scrollTop||0,el?el.scrollTop:0);
      if(!queued){queued=true;requestAnimationFrame(read);}
    };
    const onScroll=(e)=>measure(e.target);
    measure(null);
    /* capture:true because scroll does not bubble — this is what catches an inner
       scroller without knowing which element it is. */
    document.addEventListener('scroll',onScroll,{capture:true,passive:true});
    return ()=>document.removeEventListener('scroll',onScroll,{capture:true});
  },[]);
  return (
    <header className={('sb-header '+(dark?'sb-dark ':'')+className).trim()} data-t={tone} data-scrolled={scrolled?'1':undefined} data-open={open?'1':undefined} style={style} {...rest}>
      <Logo unit={logoUnit} tone={dark?'ivory':'titanium'} height={28} />
      <button type="button" className="sb-nav-toggle" aria-label={open?'Close menu':'Open menu'} aria-expanded={open}
        onClick={()=>setOpen(o=>!o)}>
        <Icon name={open?'XClose':'Menu01'} size={22} />
      </button>
      <nav className="sb-nav" data-open={open?'1':undefined}>
        {items.map(it=>{
          const label=typeof it==='string'?it:it.label;
          const key=typeof it==='string'?it:(it.id||it.label);
          return <button key={key} type="button" className="sb-nav-link" data-active={active===key?'1':undefined}
            onClick={()=>nav(key)}>{label}</button>;
        })}
        {cta&&<Button variant={dark?'accent':'primary'} size="sm" onClick={()=>{setOpen(false);if(onCta)onCta();}}>{cta}</Button>}
      </nav>
    </header>
  );
}
