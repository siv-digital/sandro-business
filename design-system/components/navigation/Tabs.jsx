import React from 'react';

export function Tabs({items=[],value,onChange,className='',style,...rest}){
  return (
    <div className={('sb-tabs '+className).trim()} role="tablist" style={style} {...rest}>
      {items.map(it=>{
        const id=typeof it==='string'?it:it.id;
        const label=typeof it==='string'?it:it.label;
        return <button key={id} type="button" role="tab" aria-selected={value===id}
          className="sb-tab" data-active={value===id?'1':undefined} onClick={()=>onChange&&onChange(id)}>{label}</button>;
      })}
    </div>
  );
}
