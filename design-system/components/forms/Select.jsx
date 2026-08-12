import React from 'react';
import {Icon} from '../icons/Icon.jsx';

export function Select({label,hint,error,options=[],size='md',disabled=false,id,className='',style,...rest}){
  const uid=React.useId();
  const fid=id||uid;
  return (
    <div className={('sb-field '+className).trim()} style={style}>
      {label&&<label className="sb-field-label" htmlFor={fid}>{label}</label>}
      <div className="sb-input-wrap" data-size={size} data-invalid={error?'1':undefined} data-disabled={disabled?'1':undefined}>
        <select id={fid} className="sb-select" disabled={disabled} {...rest}>
          {options.map(o=>{const v=typeof o==='string'?o:o.value;const l=typeof o==='string'?o:o.label;
            return <option key={v} value={v}>{l}</option>;})}
        </select>
        <Icon name="chevron-down" size={16} color="var(--text-muted)" />
      </div>
      {error?<span className="sb-field-error">{error}</span>:hint?<span className="sb-field-hint">{hint}</span>:null}
    </div>
  );
}
