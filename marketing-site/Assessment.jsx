/* Design-system components are resolved LAZILY, at render time rather than at
   module-eval time. A template mounts this file through <x-import>, whose fetch
   races the bundle <script> — a top-level destructure would capture undefined. */
const __ds=n=>{const C=p=>React.createElement(window.SandroBusinessDesignSystem_06f5c8[n],p);C.displayName=n;return C};
const Section=__ds('Section'), EditorialColumns=__ds('EditorialColumns'), Kicker=__ds('Kicker'), Input=__ds('Input'), Select=__ds('Select'), Checkbox=__ds('Checkbox'), Switch=__ds('Switch'), Button=__ds('Button'), Rule=__ds('Rule'), Badge=__ds('Badge'), Icon=__ds('Icon'), Reveal=__ds('Reveal'), StatBlock=__ds('StatBlock');

const ASSESS_Q=[
  {id:'runs',label:'How much of the business runs without you?',options:['I am involved in everything','Some functions are delegated','A management team runs day to day']},
  {id:'revenue',label:'How is your revenue built?',options:['Concentrated in a few accounts','Mixed','Broad and recurring']},
  {id:'books',label:'How clean are the financials?',options:['Cash basis, no review','Reviewed','Audited']},
  {id:'estate',label:'What is already in place on the estate and tax side?',options:['Nothing yet','A will','Trusts and entity structures']},
  {id:'timing',label:'When would you want to transition?',options:['No timeline yet','Three to five years','12 to 18 months, or already in a deal']}
];

function Assessment(){
  const [a,setA]=React.useState({});
  const [sent,setSent]=React.useState(false);
  const answered=ASSESS_Q.filter(q=>a[q.id]).length;
  const score=ASSESS_Q.reduce((s,q)=>s+(a[q.id]?Number(a[q.id]):0),0);
  const track=score>=8?['Ready to sell','Phase III','var(--sb-khaki-500)']:answered===ASSESS_Q.length?['Build value first','Phase II','var(--sb-azure-500)']:['Still exploring','Phase I','var(--sb-aqua-500)'];
  return <main>
    <Section tone="light">
      <EditorialColumns aside={<React.Fragment>
        <Kicker>Start here</Kicker>
        <p style={{font:'var(--type-p3)',color:'var(--text-muted)'}}>
          A short survey on the business, your timeline, and what you want from both. About ten minutes, nothing to tally, and it places you on a track before anyone gets on a call.
        </p>
        <Rule />
        <div style={{display:'flex',flexDirection:'column',gap:'var(--space-3)'}}>
          <span style={{font:'var(--type-small)',letterSpacing:'var(--tracking-kicker)',textTransform:'uppercase',color:'var(--text-subtle)'}}>Progress</span>
          <div style={{height:4,background:'var(--surface-sunken)',borderRadius:2,overflow:'hidden'}}>
            <div style={{height:'100%',width:(answered/ASSESS_Q.length*100)+'%',background:'var(--sb-gradient-keyline)',transition:'width var(--dur-slow) var(--ease-out-expo)'}} />
          </div>
          <span style={{font:'var(--type-small)',color:'var(--text-muted)'}}>{answered} of {ASSESS_Q.length} answered</span>
        </div>
      </React.Fragment>}>
        <h1 style={{font:'var(--type-display)',maxWidth:'20ch'}}>Know where you stand.</h1>
        {sent
          ? <div style={{marginTop:'var(--space-12)',padding:'var(--space-10)',border:'1px solid var(--border-hairline)',borderRadius:'var(--radius-md)',background:'var(--surface-card)',maxWidth:640,boxShadow:'var(--shadow-sm)',position:'relative',overflow:'hidden'}}>
              <span style={{position:'absolute',left:0,top:0,right:0,height:3,background:track[2]}} />
              <Badge tone="positive" dot>Received</Badge>
              <h2 style={{font:'var(--type-display)',marginTop:'var(--space-5)'}}>{track[0]}</h2>
              <p style={{font:'var(--type-p1)',color:'var(--text-muted)',marginTop:'var(--space-4)'}}>
                Your planning work begins at <strong style={{color:'var(--text-display)'}}>{track[1]}</strong>. A Sandro Senior Partner will reach out within one business day to book the discovery call.
              </p>
            </div>
          : <form style={{maxWidth:680,marginTop:'var(--space-12)',display:'flex',flexDirection:'column',gap:'var(--space-10)'}}
              onSubmit={e=>{e.preventDefault();setSent(true)}}>
              {ASSESS_Q.map((q,i)=>
                <Reveal key={q.id} index={i}>
                  <fieldset style={{border:0,padding:0,margin:0}}>
                    <legend style={{font:'var(--type-body-headline)',color:'var(--text-display)',padding:0,marginBottom:'var(--space-5)'}}>
                      <span style={{fontFamily:'var(--font-display)',color:'var(--sb-aqua-500)',marginRight:10}}>{'0'+(i+1)}</span>{q.label}
                    </legend>
                    <div style={{display:'flex',flexDirection:'column',gap:'var(--space-4)'}}>
                      {q.options.map((o,oi)=>
                        <Checkbox key={o} radio name={q.id} label={o}
                          checked={a[q.id]===String(oi)} onChange={()=>setA({...a,[q.id]:String(oi)})} />)}
                    </div>
                  </fieldset>
                </Reveal>)}
              <Rule />
              <div className="sb-cols" data-cols="2" style={{gap:'var(--space-6)'}}>
                <Input label="Full name" placeholder="Alex Moreau" required />
                <Input label="Work email" type="email" placeholder="you@yourcompany.com" required />
                <Input label="Company" placeholder="Moreau Industrial" style={{gridColumn:'1 / -1'}} />
                <Select label="Approximate revenue" options={['Under $5M','$5M – $25M','$25M – $100M','Over $100M']} />
                <Select label="How you found us" options={['Referred by my CPA or attorney','Owner briefing','Webinar','Search']} />
              </div>
              <Checkbox label="Send me the owner briefings." />
              <div style={{display:'flex',gap:'var(--space-5)',alignItems:'center',flexWrap:'wrap'}}>
                <Button variant="primary" size="lg" iconRight="ArrowRight">Submit the assessment</Button>
              </div>
            </form>}
      </EditorialColumns>
    </Section>
  </main>;
}
Object.assign(window,{Assessment});
