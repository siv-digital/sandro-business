import React from 'react';

/* ---- Motion arming: the switch every entrance state in this system hangs off ----
   components.css keeps every hidden from-state scoped under
   html[data-sb-motion="1"], so the finished state is the unconditional default
   and NOTHING can be invisible because an animation failed to run. This is the
   only code that sets that flag, and it does so only after two consecutive
   requestAnimationFrame callbacks have actually been delivered — which proves
   frames are advancing in this host. Print, PDF pagination, PPTX/screenshot
   capture, background tabs and embedded webviews never get past the first rAF,
   so they simply never arm and render the finished design, unanimated.
   Reduced motion never arms either. Runs once, at bundle eval, before React
   mounts anything, so there is no visible flash. */
if(typeof document!=='undefined'&&typeof requestAnimationFrame==='function'){
  const reduce=typeof matchMedia==='function'&&matchMedia('(prefers-reduced-motion:reduce)').matches;
  if(!reduce) requestAnimationFrame(()=>requestAnimationFrame(()=>{document.documentElement.dataset.sbMotion='1';}));
}

/* Nearest scrollable ancestor, used as the IntersectionObserver root. The
   viewport is the WRONG root whenever this system is mounted inside a host that
   scrolls its own container (a template preview, a design canvas frame, an
   embedded panel): the observer then reports "not intersecting" forever, which
   also suppresses the dead-observer timeout below, and content stays hidden.
   Returns null (= viewport) when the page itself is the scroller. */
function scrollRoot(el){
  for(let p=el.parentElement;p&&p!==document.body&&p!==document.documentElement;p=p.parentElement){
    const o=getComputedStyle(p).overflowY;
    if((o==='auto'||o==='scroll')&&p.scrollHeight>p.clientHeight+1) return p;
  }
  return null;
}

/* The Business motion primitive: rise-and-fade (or an editorial clip-path wipe)
   on first entry, staggered by index. When motion is not armed this renders as
   plain static content — see the arming note above. */
export function Reveal({children,index=0,delay=0,mode='rise',as='div',threshold=0.15,className='',style,...rest}){
  const As=as;
  const ref=React.useRef(null);
  const [inView,setInView]=React.useState(false);
  React.useEffect(()=>{
    const el=ref.current;
    if(!el) return;
    let shown=false;
    const show=()=>{if(!shown){shown=true;setInView(true);}};
    /* FAIL OPEN. A reveal must never be the reason content is invisible.
       Three guards, because print, PDF pagination, screenshot capture and some
       embedded webviews either lack IntersectionObserver or never deliver its
       callbacks:
       1. already in view on mount -> reveal synchronously, no observer needed;
       2. no IntersectionObserver at all -> reveal;
       3. observer exists but never reports within 400ms -> reveal anyway.
       A live observer always fires an initial callback for each observed element,
       so (3) only trips when the observer is genuinely dead — below-fold content
       still animates on scroll as intended. */
    const root=scrollRoot(el);
    const box=root?root.getBoundingClientRect():{top:0,bottom:window.innerHeight||0};
    const b=el.getBoundingClientRect();
    if(b.top<box.bottom-(box.bottom-box.top)*0.06&&b.bottom>box.top){show();return;}
    if(typeof IntersectionObserver==='undefined'){show();return;}
    let reported=false;
    const io=new IntersectionObserver(es=>{reported=true;es.forEach(e=>{if(e.isIntersecting){show();io.disconnect();}});},{root,threshold});
    io.observe(el);
    /* Re-measures rather than only trusting `reported`: on mount the element may
       have had no layout box yet (a zero rect fails the check above), and an
       observer can report a false negative in a host the root guess missed. */
    const t=setTimeout(()=>{
      if(shown) return;
      if(!reported){show();return;}
      const r=el.getBoundingClientRect();
      const rb=root?root.getBoundingClientRect():{top:0,bottom:window.innerHeight||0};
      if(r.bottom>rb.top&&r.top<rb.bottom) show();
    },400);
    return ()=>{clearTimeout(t);io.disconnect();};
  },[threshold]);
  const delayStyle={transitionDelay:(delay+index*70)+'ms'};
  if(mode==='wipe'){
    return <As ref={ref} className={className} data-mode="wipe" style={style} {...rest}>
      <span className="sb-wipe-inner" data-in={inView?'1':undefined} style={delayStyle}>{children}</span>
    </As>;
  }
  return <As ref={ref} className={('sb-reveal '+className).trim()} data-in={inView?'1':undefined} data-mode={mode}
    style={{...delayStyle,...style}} {...rest}>{children}</As>;
}
