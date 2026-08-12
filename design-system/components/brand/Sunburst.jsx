import React from 'react';
import {Mark} from './Mark.jsx';
import {sbSunburstPaths,sbSunburstViewBox} from './sunburst-data.js';

/* Five documented permutations of the sunburst, all from the client's own
   artwork — nothing redrawn.

   CONTRAST RULE (this is why the component owns the scrim): in v1 display type
   sat directly on the rays and was unreadable. Any variant that can sit behind
   content now emits a scrim layer itself, and content must be passed as
   children so it lands above that scrim on z-index 3. There is no way to place
   text on bare rays through this API. */
export function Sunburst({
  variant='square',tone='ivory',size=200,src,drift=false,opacity=1,
  scrim,children,className='',style,...rest
}){
  const defaultScrim={field:'solid',arc:'bottom',halo:null,square:null,rays:null,bloom:null};
  const s=scrim===undefined?defaultScrim[variant]:scrim;
  /* The ray fan is inline VECTOR (sunburst-data.js): sharp at any monitor size,
     and no sibling assets/ directory to break in a published or copied-out page.
     Fills are currentColor, so ray colour is set by `color` in CSS.
     `src` still accepts a raster override for one-off art. */
  const Rays=({style:rs})=>src
    ? <img src={src} alt="" style={rs} />
    : <svg viewBox={sbSunburstViewBox} aria-hidden="true" focusable="false" style={rs}>
        {sbSunburstPaths.map((d,i)=><path key={i} d={d} fill="currentColor" />)}
      </svg>;

  if(variant==='square'){
    return <span className={('sb-sun '+className).trim()} data-variant="square" style={{opacity,...style}} {...rest}>
      <Mark tone={tone} size={size} />
    </span>;
  }
  if(variant==='rays'){
    return <span className={('sb-sun '+className).trim()} data-variant="rays"
      style={{height:Math.round(size*0.26),width:size,opacity,...style}} {...rest}>
      <Mark tone={tone} size={size} />
    </span>;
  }
  if(variant==='horizon'){
    /* Full-bleed rising sun. The rays occupy the LOWER band and fade out
       upward through a mask, so the upper two-thirds of the frame is clean
       ground for display type — contrast by geometry, not by scrim.
       The three layers are wrapped in .sb-sun-lift, which carries the
       scroll-linked sunrise parallax (see components.css). */
    return <span className={('sb-sun '+className).trim()} data-variant="horizon" style={style} {...rest}>
      <span className="sb-sun-lift">
        <span className="sb-sun-glow" />
        <span className="sb-sun-rays" style={{opacity}}>
          <Rays />
        </span>
        <span className="sb-sun-horizon" />
      </span>
      {children&&<span className="sb-sun-content">{children}</span>}
    </span>;
  }
  if(variant==='bloom'){
    /* The sun as ATMOSPHERE rather than a band. The artwork is oversized and its
       centre is pushed below the bottom edge, so only the soft upper fan enters
       the frame; a radial mask fades it out in every direction, so it has no
       edge anywhere and dissolves into whatever sits behind it.
       The mask lives on .sb-sun-bloom-field (section-sized), NOT on the artwork:
       the artwork is oversized, so a mask scaled to IT would keep the rays at
       full strength across the whole section and wash the type. Masking in
       section space is what makes the falloff independent of --bloom-w. Use this when
       the sunburst should be the ground the content sits IN — the `horizon`
       variant clips to a band with a keyline, which reads as a separate strip
       in any section short enough that the band cannot be a real horizon.
       No scrim: the mask is weakest exactly where content sits (upper middle)
       and strongest below it, so contrast comes from the falloff.
       The wash sits OUTSIDE the masked field on purpose. It carries no rays, so
       it cannot wash type, and being unmasked it lifts the whole lower field
       off flat titanium instead of only tracing the fan. */
    return <span className={('sb-sun '+className).trim()} data-variant="bloom" style={{position:'absolute',inset:0,...style}} {...rest}>
      <span className="sb-sun-bloom-wash" />
      <span className="sb-sun-bloom-field">
        <span className="sb-sun-bloom-glow" />
        <span className="sb-sun-bloom" style={{opacity}}>
          <Rays />
        </span>
      </span>
      {children&&<span className="sb-sun-content">{children}</span>}
    </span>;
  }
  if(variant==='halo'){
    return <span className={('sb-sun '+className).trim()} data-variant="halo" data-drift={drift?'1':undefined}
      style={{width:size,height:size,background:'var(--sb-gradient-signature)',...style}} {...rest}>
      <span style={{position:'absolute',left:'50%',bottom:'-14%',transform:'translateX(-50%)',width:'118%',opacity}}>
        <Rays style={{width:'100%',height:'auto'}} />
      </span>
      {s&&<span className="sb-sun-scrim" data-scrim={s} />}
      {children&&<span className="sb-sun-content">{children}</span>}
    </span>;
  }
  const cover=variant==='field';
  return (
    <span className={('sb-sun '+className).trim()} data-variant={variant} data-drift={drift?'1':undefined}
      style={cover?{position:'absolute',inset:0,...style}:{width:size,...style}} {...rest}>
      <span style={cover
        ?{position:'absolute',right:'-6%',bottom:'-34%',width:'78%',opacity}
        :{display:'block',opacity}}>
        {variant==='field'||variant==='arc'
          ? <Rays style={{width:'100%',height:'auto'}} />
          : <Mark tone={tone} size="100%" style={{width:'100%',height:'auto'}} />}
      </span>
      {s&&<span className="sb-sun-scrim" data-scrim={s} />}
      {children&&<span className="sb-sun-content">{children}</span>}
    </span>
  );
}
