import React from 'react';

const TONES={
  light:{background:'var(--surface-page)'},
  ivory:{background:'var(--sb-khaki-100)'},
  dark:{background:'var(--sb-titanium-800)'},
  deep:{background:'var(--sb-ink)'},
  wash:{background:'var(--sb-gradient-dawn)'},
  live:{background:'var(--sb-gradient-live)',backgroundSize:'280% 280%',animation:'sb-gradient-shift var(--dur-gradient) var(--ease-in-out) -8s infinite'}
};

export function Section({tone='light',size='md',width='default',children,className='',style,...rest}){
  const dark=tone==='dark'||tone==='deep'||tone==='wash';
  return (
    <section className={('sb-section '+(dark?'sb-dark ':'')+className).trim()} data-size={size} data-w={width}
      style={{...TONES[tone],...style}} {...rest}>
      <div className="sb-section-inner">{children}</div>
    </section>
  );
}
