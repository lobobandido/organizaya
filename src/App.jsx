import {useState,useEffect,useMemo} from 'react'
import {track} from '@vercel/analytics'
import {TIPOS,NIVELES,FORMATOS,REGIONES,PLANNER,CAT,FASES,DIA,FRAUDE,PLANB} from './data.js'

const mxn=n=>'$'+Math.round(n).toLocaleString('es-MX')
const load=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}}
const EV0={nombre:'Cumple 5 de Mateo',tipo:'cumple',nivel:'diy',formato:'jardin',region:'puerto',fecha:'',hora:'16:00',adultos:30,ninos:20,tarifa:1}
const G0=[{n:'Familia Pérez',ad:2,ni:2,st:'si',mesa:1},{n:'Tía Lupita',ad:1,ni:0,st:'pend',mesa:2}]

export default function App(){
  const [ev,setEv]=useState(()=>load('dw_ev',EV0))
  const [guests,setGuests]=useState(()=>load('dw_g',G0))
  const [ov,setOv]=useState(()=>load('dw_ov',{}))
  const [tab,setTab]=useState('resumen')
  useEffect(()=>localStorage.setItem('dw_ev',JSON.stringify(ev)),[ev])
  useEffect(()=>localStorage.setItem('dw_g',JSON.stringify(guests)),[guests])
  useEffect(()=>localStorage.setItem('dw_ov',JSON.stringify(ov)),[ov])
  const go=t=>{setTab(t);track('tab',{tab:t})}

  const calc=useMemo(()=>{
    const ad=+ev.adultos||0,ni=+ev.ninos||0,pe=ad+ni,f=REGIONES[ev.region][1]
    const qty={ad,ni,pe,ev:1,mesa:Math.ceil(pe/10),mes:Math.ceil(pe/25),rep:Math.ceil(pe*1.3)}
    const rows=CAT.filter(c=>(!c.t||c.t.includes(ev.tipo))&&(!c.f||c.f.includes(ev.formato))).map(c=>{
      const o=ov[c.id]||{},q=o.q??qty[c.q],unit=o.quote??c.p[ev.tarifa]*f
      return {...c,q,unit,off:!!o.off,quoted:o.quote!=null,total:o.off?0:q*unit}})
    const pl=PLANNER[ev.nivel]?PLANNER[ev.nivel][ev.tarifa]:0
    const total=rows.reduce((a,r)=>a+r.total,0)+pl
    return {rows,pl,total,pe}
  },[ev,ov])

  const set=(k,v)=>setEv(e=>({...e,[k]:v}))
  const setO=(id,p)=>setOv(o=>({...o,[id]:{...o[id],...p}}))
  const tabs=[['resumen','Resumen'],['invitados','Invitados'],['presupuesto','Presupuesto'],['cronograma','Cronograma'],['proveedores','Proveedores'],['planb','Plan B']]

  return <div className="app">
    <header><div className="brand"><Logo/><span><b>Organiza<i>Ya</i></b><small>by DreamWolf</small></span></div><span className="tag">Organiza tu evento · tus datos se quedan en este dispositivo</span></header>
    <nav>{tabs.map(([k,l])=><button key={k} className={tab===k?'on':''} onClick={()=>go(k)}>{l}</button>)}</nav>
    <main>
      {tab==='resumen'&&<Resumen {...{ev,set,calc,guests}}/>}
      {tab==='invitados'&&<Invitados {...{ev,guests,setGuests}}/>}
      {tab==='presupuesto'&&<Presupuesto {...{ev,set,calc,setO}}/>}
      {tab==='cronograma'&&<Cronograma ev={ev}/>}
      {tab==='proveedores'&&<Proveedores/>}
      {tab==='planb'&&<PlanB/>}
    </main>
    <Waitlist/>
  </div>
}

function Logo(){return <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true"><path d="M4 6l6 5h12l6-5v13c0 6-6 9-12 9S4 25 4 19z" fill="#0B4F5C"/><circle cx="12" cy="18" r="1.8" fill="#F2A900"/><circle cx="20" cy="18" r="1.8" fill="#F2A900"/></svg>}

function Resumen({ev,set,calc,guests}){
  const conf=guests.filter(g=>g.st==='si').reduce((a,g)=>a+g.ad+g.ni,0)
  const inp=(k,l,t='text')=><label>{l}<input type={t} value={ev[k]} onChange={e=>set(k,t==='number'?+e.target.value:e.target.value)}/></label>
  const sel=(k,l,o)=><label>{l}<select value={ev[k]} onChange={e=>set(k,e.target.value)}>{Object.entries(o).map(([v,x])=><option key={v} value={v}>{Array.isArray(x)?x[0]:x}</option>)}</select></label>
  return <section>
    <div className="hero"><span>Total estimado</span><strong>{mxn(calc.total)}</strong><em>{calc.pe>0?mxn(calc.total/calc.pe)+' por persona':''}</em></div>
    <div className="grid">{inp('nombre','Nombre del evento')}{sel('tipo','Tipo de evento',TIPOS)}{sel('nivel','Nivel de servicio',NIVELES)}{sel('formato','Formato',FORMATOS)}{sel('region','Región',REGIONES)}{inp('fecha','Fecha','date')}{inp('hora','Hora de inicio','time')}{inp('adultos','Adultos','number')}{inp('ninos','Niños','number')}
    <label>Rango de precios<select value={ev.tarifa} onChange={e=>set('tarifa',+e.target.value)}><option value={0}>Económico</option><option value={1}>Típico</option><option value={2}>Premium</option></select></label></div>
    <p className="note">Invitados confirmados: <b>{conf}</b> de {calc.pe} planeados.</p>
  </section>
}

function Invitados({ev,guests,setGuests}){
  const [n,setN]=useState('')
  const upd=(i,p)=>setGuests(g=>g.map((x,j)=>j===i?{...x,...p}:x))
  const msg=g=>encodeURIComponent(`Hola ${g.n}, te invitamos a ${ev.nombre}${ev.fecha?' el '+ev.fecha:''} a las ${ev.hora}. ¿Nos confirmas tu asistencia respondiendo SÍ o NO?`)
  return <section>
    <form className="row" onSubmit={e=>{e.preventDefault();if(!n.trim())return;setGuests(g=>[...g,{n:n.trim(),ad:1,ni:0,st:'pend',mesa:''}]);setN('');track('guest_added')}}>
      <input placeholder="Nombre del invitado o familia" value={n} onChange={e=>setN(e.target.value)}/><button className="pri">Agregar</button></form>
    {guests.length===0&&<p className="note">Agrega tu primer invitado y envíale la invitación por WhatsApp.</p>}
    {guests.map((g,i)=><div className="card guest" key={i}><b>{g.n}</b>
      <label>Adultos<input type="number" min="0" value={g.ad} onChange={e=>upd(i,{ad:+e.target.value})}/></label>
      <label>Niños<input type="number" min="0" value={g.ni} onChange={e=>upd(i,{ni:+e.target.value})}/></label>
      <label>Mesa<input value={g.mesa} onChange={e=>upd(i,{mesa:e.target.value})}/></label>
      <select value={g.st} onChange={e=>upd(i,{st:e.target.value})}><option value="pend">Pendiente</option><option value="si">Confirmó</option><option value="no">No va</option></select>
      <a className="wa" target="_blank" rel="noreferrer" href={`https://wa.me/?text=${msg(g)}`} onClick={()=>track('whatsapp_invite')}>Invitar por WhatsApp</a>
      <button className="ghost" onClick={()=>setGuests(x=>x.filter((_,j)=>j!==i))}>Quitar</button></div>)}
  </section>
}

function Presupuesto({calc,setO}){
  const groups=[...new Set(calc.rows.map(r=>r.g))]
  return <section>
    <p className="note">Precios: <b>V</b> dato de Veracruz, <b>N</b> referencia nacional, <b>E</b> estimado. Escribe lo que te coticen y el total se actualiza.</p>
    {calc.pl>0&&<div className="card line"><span>Planner / coordinación</span><b>{mxn(calc.pl)}</b></div>}
    {groups.map(g=><div key={g}><h3>{g}</h3>{calc.rows.filter(r=>r.g===g).map(r=>
      <div className={'card line'+(r.off?' off':'')} key={r.id}>
        <label className="chk"><input type="checkbox" checked={!r.off} onChange={e=>setO(r.id,{off:!e.target.checked})}/>{r.n}<small className={'src '+r.s}>{r.s}</small></label>
        <input className="q" type="number" min="0" value={r.q} onChange={e=>setO(r.id,{q:+e.target.value})} aria-label="Cantidad"/>
        <input className="q p" type="number" min="0" placeholder={Math.round(r.unit)} value={r.quoted?r.unit:''} onChange={e=>setO(r.id,{quote:e.target.value===''?null:+e.target.value})} aria-label="Precio cotizado"/>
        <b>{mxn(r.total)}</b></div>)}</div>)}
    <div className="card line total"><span>Total</span><b>{mxn(calc.total)}</b></div>
  </section>
}

function Cronograma({ev}){
  const [h,m]=(ev.hora||'16:00').split(':').map(Number)
  const t=o=>{const x=((h*60+m+o)%1440+1440)%1440;return String(Math.floor(x/60)).padStart(2,'0')+':'+String(x%60).padStart(2,'0')}
  return <section>
    {FASES.map(([f,ts])=><div className="card" key={f}><h3>{f}</h3><ul>{ts.map((x,i)=>{
      if(Array.isArray(x)){return (x[0]===ev.tipo||x[0]===ev.formato)?<li key={i}>{x[1]}</li>:null}
      return <li key={i}>{x}</li>})}</ul></div>)}
    <div className="card"><h3>El día del evento</h3><ul className="tl">{DIA.map(([o,x])=><li key={o}><b>{t(o)}</b> {x}</li>)}</ul></div>
  </section>
}

function Proveedores(){
  const [prov,setProv]=useState(()=>load('dw_p',[]))
  const [n,setN]=useState('')
  useEffect(()=>localStorage.setItem('dw_p',JSON.stringify(prov)),[prov])
  const tog=(i,k)=>setProv(p=>p.map((x,j)=>j===i?{...x,c:x.c.includes(k)?x.c.filter(y=>y!==k):[...x.c,k]}:x))
  const sem=c=>c.length>=5?['verde','Confiable']:c.length>=3?['amarillo','Con reservas']:['rojo','No pagues anticipo']
  return <section>
    <p className="note">En Veracruz una banquetera estafó a más de 100 familias con anticipos de 80 % a cuentas personales. Califica cada proveedor antes de pagar.</p>
    <form className="row" onSubmit={e=>{e.preventDefault();if(!n.trim())return;setProv(p=>[...p,{n:n.trim(),c:[]}]);setN('')}}>
      <input placeholder="Nombre del proveedor" value={n} onChange={e=>setN(e.target.value)}/><button className="pri">Agregar</button></form>
    {prov.map((p,i)=>{const [c,l]=sem(p.c);return <div className="card" key={i}><div className="line"><b>{p.n}</b><span className={'light '+c}>{l}</span></div>
      {FRAUDE.map(k=><label className="chk" key={k}><input type="checkbox" checked={p.c.includes(k)} onChange={()=>tog(i,k)}/>{k}</label>)}</div>})}
  </section>
}

function PlanB(){return <section>{PLANB.map(([t,d])=><div className="card" key={t}><h3>{t}</h3><p>{d}</p></div>)}</section>}

function Waitlist(){
  const [v,setV]=useState(''),[s,setS]=useState(load('dw_w',false))
  const send=async e=>{e.preventDefault();if(!v.trim())return
    const url=import.meta.env.VITE_WAITLIST_URL
    try{if(url)await fetch(url,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({contacto:v,origen:document.referrer||'directo'})})}catch{}
    track('waitlist');localStorage.setItem('dw_w','true');setS(true)}
  return <footer>{s?<b>Listo, te avisamos cuando abramos el acceso.</b>:<form onSubmit={send} className="row"><span>Entra primero a la versión completa:</span>
    <input placeholder="Correo o WhatsApp" value={v} onChange={e=>setV(e.target.value)}/><button className="pri">Unirme a la lista</button></form>}</footer>
}
