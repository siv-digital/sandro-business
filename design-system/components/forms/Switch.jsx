import React from 'react';

export function Switch({label,disabled=false,className='',style,...rest}){
  return (
    <label className={('sb-switch '+className).trim()} data-disabled={disabled?'1':undefined} style={style}>
      <input type="checkbox" role="switch" disabled={disabled} {...rest} />
      <span className="sb-switch-track" />
      {label&&<span>{label}</span>}
    </label>
  );
}
