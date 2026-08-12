import React from 'react';

const TONES={
  neutral:{soft:['var(--surface-sunken)','var(--text-muted)'],solid:['var(--sb-titanium-800)','var(--sb-offwhite)']},
  accent:{soft:['var(--surface-accent-soft)','var(--text-accent)'],solid:['var(--sb-aqua-500)','var(--sb-aqua-900)']},
  info:{soft:['var(--feedback-info-soft)','var(--sb-azure-700)'],solid:['var(--sb-azure-500)','var(--sb-light-000)']},
  positive:{soft:['var(--feedback-positive-soft)','var(--feedback-positive)'],solid:['var(--feedback-positive)','var(--sb-offwhite)']},
  caution:{soft:['var(--feedback-caution-soft)','var(--sb-khaki-700)'],solid:['var(--sb-moderate)','var(--sb-titanium-800)']},
  critical:{soft:['var(--feedback-critical-soft)','var(--feedback-critical)'],solid:['var(--feedback-critical)','var(--sb-offwhite)']}
};

export function Badge({children,tone='neutral',solid=false,dot=false,className='',style,...rest}){
  const [bg,fg]=(TONES[tone]||TONES.neutral)[solid?'solid':'soft'];
  return <span className={('sb-badge '+className).trim()} style={{background:bg,color:fg,...style}} {...rest}>
    {dot&&<span className="sb-badge-dot" />}{children}
  </span>;
}
