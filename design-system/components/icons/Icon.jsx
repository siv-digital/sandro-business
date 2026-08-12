import icons from './icon-data.js';

/* The real Sandro icon set — 1,173 glyphs extracted from the Sandro Prism
   Figma file (Design-system → Icon Library). Single-colour, painted with
   currentColor. Names are PascalCase; see Icon.d.ts for the full index. */
export function Icon({name,size=20,color='currentColor',className='',style,...rest}){
  const d=icons[name];
  if(!d) return null;
  return (
    <svg width={size} height={size} viewBox={d.viewBox} fill="none" aria-hidden="true"
      className={className}
      style={{display:'inline-block',flex:'none',color,...style}}
      // body strings are emitter-controlled <path> markup — geometry,
      // numeric fills and transforms only; no .fig-authored text reaches them.
      dangerouslySetInnerHTML={{__html:d.body}}
      {...rest} />
  );
}
export default Icon;
