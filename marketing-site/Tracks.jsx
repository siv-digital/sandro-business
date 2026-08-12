/* Design-system components are resolved LAZILY, at render time rather than at
   module-eval time. A template mounts this file through <x-import>, whose fetch
   races the bundle <script> — a top-level destructure would capture undefined. */
const __ds=n=>{const C=p=>React.createElement(window.SandroBusinessDesignSystem_06f5c8[n],p);C.displayName=n;return C};
const Section=__ds('Section'), Reveal=__ds('Reveal'), Kicker=__ds('Kicker'), Rule=__ds('Rule'), Button=__ds('Button'), Badge=__ds('Badge'), Icon=__ds('Icon'), Card=__ds('Card'), Tag=__ds('Tag'), StatBlock=__ds('StatBlock');

const TRACKS_DATA=[
  {id:'exploring',name:'Still exploring',accent:'var(--sb-aqua-500)',soft:'var(--surface-accent-soft)',
   sub:'No timeline yet. Learning what the options are.',enters:'Phase I',band:'Hasn\u2019t taken the assessment',
   persona:'—',quote:'What are my options, actually?',
   body:'You enter at the beginning. The assessment and discovery call cost you thirty minutes, and the valuation puts a real number behind every option you are weighing. No obligation follows you out.',
   cadence:'Owner briefings and the owner list. Start when ready.'},
  {id:'value',name:'Build value first',accent:'var(--sb-azure-500)',soft:'var(--feedback-info-soft)',
   sub:'Three to five years out. The number isn\u2019t there yet.',enters:'Phase II',band:'Assessment score 0 to 7',
   persona:'The Value Builder',quote:'I want to sell. I just can\u2019t afford to yet.',
   body:'You enter at the full picture. The financial plan and gap analysis size the gap, and value enhancement closes it inside the business. When the value is there, you rejoin the line with a stronger hand.',
   cadence:'Checked each quarter against the number that set your track. Re-valued when it counts.'},
  {id:'ready',name:'Ready to sell',accent:'var(--sb-khaki-500)',soft:'var(--surface-warm-soft)',
   sub:'Selling in the next 12 to 18 months, or already in a deal.',enters:'Phase III',band:'Assessment score 8 to 10',
   persona:'The Committed Seller',quote:'I\u2019ve decided. Now I need to not screw it up.',
   body:'You enter where sequence matters most. With a valuation already in hand, the estate and wealth plans come first. Then the sale runs as one process, and the proceeds become one plan.',
   cadence:'Fast-tracked past value acceleration. Sandro stays at the table as quarterback.'}
];

function Tracks(){
  const [sel,setSel]=React.useState('ready');
  const t=TRACKS_DATA.find(x=>x.id===sel);
  return <main>
    <Section tone="light" size="sm">
      <Kicker>One journey, three ways in</Kicker>
      <Reveal mode="wipe"><h1 style={{font:'var(--type-display)',fontSize:'clamp(34px,4.2vw,56px)',maxWidth:'24ch',marginTop:'var(--space-5)'}}>A track is where you start, not a category you are filed under.</h1></Reveal>
      <p style={{font:'var(--type-p1)',color:'var(--text-muted)',maxWidth:'62ch',marginTop:'var(--space-5)'}}>
        Every owner starts the same way. The assessment and a thirty-minute discovery call come first on every track. What they decide is where the planning work begins.
      </p>

      <div style={{display:'flex',gap:'var(--space-3)',marginTop:'var(--space-10)',flexWrap:'wrap'}}>
        {TRACKS_DATA.map(x=><Tag key={x.id} active={sel===x.id} onClick={()=>setSel(x.id)}>{x.name}</Tag>)}
      </div>

      <div className="sb-cols" data-split="b" style={{marginTop:'var(--space-10)',gap:'var(--space-8)',alignItems:'start'}}>
        <div style={{position:'relative',padding:'var(--space-10)',borderRadius:'var(--radius-md)',border:'1px solid var(--border-hairline)',background:'var(--surface-card)',boxShadow:'var(--shadow-sm)',overflow:'hidden'}}>
          <span style={{position:'absolute',left:0,top:0,right:0,height:3,background:t.accent}} />
          <div style={{display:'flex',alignItems:'center',gap:'var(--space-4)',flexWrap:'wrap'}}>
            <span style={{font:'var(--type-small)',letterSpacing:'var(--tracking-kicker)',textTransform:'uppercase',color:t.accent}}>Enters at {t.enters}</span>
            <span style={{width:1,height:12,background:'var(--border-hairline)'}} />
            <span style={{font:'var(--type-small)',color:'var(--text-subtle)'}}>{t.band}</span>
          </div>
          <h2 style={{font:'var(--type-display)',marginTop:'var(--space-5)'}}>{t.name}</h2>
          <p style={{font:'var(--type-p2)',color:'var(--text-body)',marginTop:'var(--space-4)'}}>{t.sub}</p>
          <blockquote style={{margin:'var(--space-8) 0 0',padding:'var(--space-6)',background:t.soft,borderRadius:'var(--radius-md)',font:'var(--type-quote)',fontSize:'var(--text-2xl)',color:'var(--text-display)'}}>
            {'\u201C'+t.quote+'\u201D'}
            {t.persona!=='—'&&<span style={{display:'block',font:'var(--type-small)',letterSpacing:'var(--tracking-kicker)',textTransform:'uppercase',color:'var(--text-muted)',marginTop:'var(--space-5)'}}>{t.persona}</span>}
          </blockquote>
          <p style={{font:'var(--type-p1)',color:'var(--text-muted)',marginTop:'var(--space-8)',maxWidth:'62ch'}}>{t.body}</p>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:'var(--space-6)'}}>
          <div style={{padding:'var(--space-6)',border:'1px solid var(--border-hairline)',borderRadius:'var(--radius-md)',background:'var(--surface-sunken)'}}>
            <Kicker dash={false}>Cadence</Kicker>
            <p style={{font:'var(--type-p3)',color:'var(--text-body)',marginTop:'var(--space-4)'}}>{t.cadence}</p>
          </div>
          <div style={{padding:'var(--space-6)',border:'1px solid var(--border-hairline)',borderRadius:'var(--radius-md)'}}>
            <Kicker dash={false}>Every owner</Kicker>
            <div style={{marginTop:'var(--space-4)'}}>
              {['Assessment survey · 10 minutes','Discovery call · 30 minutes','Market-based valuation'].map((s,i)=>
                <div key={s} style={{display:'flex',gap:'var(--space-4)',alignItems:'center',padding:'var(--space-3) 0',borderTop:i?'1px solid var(--border-hairline)':'none'}}>
                  <Icon name="Check" size={16} color="var(--sb-positive)" /><span style={{font:'var(--type-p3)',color:'var(--text-body)'}}>{s}</span>
                </div>)}
            </div>
          </div>
          <Button variant="primary" full size="lg" iconRight="ArrowRight">Take the assessment</Button>
        </div>
      </div>
    </Section>
  </main>;
}
Object.assign(window,{Tracks});
