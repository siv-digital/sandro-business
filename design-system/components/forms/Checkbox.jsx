import React from 'react';
import {Icon} from '../icons/Icon.jsx';

export function Checkbox({label,radio=false,disabled=false,className='',style,...rest}){
  return (
    <label className={('sb-check '+className).trim()} data-radio={radio?'1':undefined}
      data-disabled={disabled?'1':undefined} style={style}>
      <input type={radio?'radio':'checkbox'} disabled={disabled} {...rest} />
      <span className="sb-check-box">{radio?<span style={{width:8,height:8,borderRadius:999,background:'currentColor'}} />:<Icon name="check" size={12} strokeWidth={3} />}</span>
      {label&&<span>{label}</span>}
    </label>
  );
}
