import React from 'react';

export function Input({label,hint,error,prefix,suffix,size='md',disabled=false,id,className='',style,...rest}){
  const uid=React.useId();
  const fid=id||uid;
  return (
    <div className={('sb-field '+className).trim()} style={style}>
      {label&&<label className="sb-field-label" htmlFor={fid}>{label}</label>}
      <div className="sb-input-wrap" data-size={size} data-invalid={error?'1':undefined} data-disabled={disabled?'1':undefined}>
        {prefix&&<span className="sb-affix">{prefix}</span>}
        <input id={fid} className="sb-input" disabled={disabled} aria-invalid={error?'true':undefined} {...rest} />
        {suffix&&<span className="sb-affix">{suffix}</span>}
      </div>
      {error?<span className="sb-field-error">{error}</span>:hint?<span className="sb-field-hint">{hint}</span>:null}
    </div>
  );
}
