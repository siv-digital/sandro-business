/* Design-system components are resolved LAZILY, at render time rather than at
   module-eval time. A template mounts this file through <x-import>, whose fetch
   races the bundle <script> — a top-level destructure would capture undefined. */
const __ds=n=>{const C=p=>React.createElement(window.SandroBusinessDesignSystem_06f5c8[n],p);C.displayName=n;return C};
const Section=__ds('Section'), EditorialColumns=__ds('EditorialColumns'), Reveal=__ds('Reveal'), Kicker=__ds('Kicker'), Rule=__ds('Rule'), Tabs=__ds('Tabs'), Button=__ds('Button'), Badge=__ds('Badge'), Icon=__ds('Icon'), StatBlock=__ds('StatBlock'), Sunburst=__ds('Sunburst'), Card=__ds('Card');

const JOURNEY_PHASES={
  i:{n:'I',title:'Know where you stand',label:'Discovery & diagnostics',
    who:['You','Your Sandro Senior Partner','A senior business strategist'],
    what:['Assessment survey, taken online in about ten minutes','A structured discovery call','A market-based valuation of the business'],
    produces:'Complimentary baseline valuation, ending with your track',
    note:'Phase I is three steps, in order. Most owners have never done all three.'},
  ii:{n:'II',title:'See the full picture',label:'Value & wealth assessment',
    who:['You','Your Sandro Senior Partner','Financial planner','Value growth advisor'],
    what:['Personal financial plan','Wealth gap analysis','Value enhancement, only if the gap calls for it'],
    produces:'Personal financial plan',
    note:'The gap is a number, so the work has a finish line.'},
  iii:{n:'III',title:'Put your plans in place',label:'Pre-sale planning',
    who:['You','Your Sandro Senior Partner','Estate & tax counsel','Attorneys'],
    what:['Estate plan','Wealth plan, set before a buyer ever appears'],
    produces:'Estate, tax and wealth plan',
    note:'Sequence is the whole game here.'},
  iv:{n:'IV',title:'Sell the business',label:'Sale & transition',
    who:['You','Your Sandro Senior Partner','M&A advisor','Attorneys'],
    what:['Confidential memorandum','Indications of interest','Letter of intent','Closing'],
    produces:'M&A execution',
    note:'Sandro stays at the table as quarterback.'},
  v:{n:'V',title:'Manage the wealth',label:'Wealth integration',
    who:['You','Your Sandro Senior Partner','Financial planner','The full Sandro team'],
    what:['Post-sale tax','Wealth integration','Investment management, for good'],
    produces:'Sandro\u2019s core expertise',
    note:'The sale is the middle of the process, not the end of it.'}
};
const JOURNEY_ORDER=['i','ii','iii','iv','v'];

function Journey(){
  const [k,setK]=React.useState('i');
  const p=JOURNEY_PHASES[k];
  return <main>
    <section className="sb-dark" style={{position:'relative',background:'var(--sb-gradient-signature)',overflow:'hidden',padding:'var(--space-24) var(--gutter-lg)'}}>
      <Sunburst variant="field" opacity={0.26} scrim="solid" />
      <div style={{position:'relative',zIndex:3,maxWidth:'var(--container-max)',margin:'0 auto'}}>
        <Kicker>The phased approach</Kicker>
        <Reveal mode="wipe"><h1 style={{font:'var(--type-display)',fontSize:'clamp(34px,4.4vw,58px)',color:'var(--sb-offwhite)',maxWidth:'20ch',marginTop:'var(--space-5)'}}>Five phases. One team. One plan.</h1></Reveal>
        <p style={{font:'var(--type-subtitle)',letterSpacing:'var(--tracking-sub)',color:'var(--text-on-inverse-muted)',maxWidth:'56ch',marginTop:'var(--space-5)'}}>
          One engagement carries the full lifecycle. Here is the whole arc: who is at the table, what happens, and what each phase produces.
        </p>
      </div>
    </section>

    <Section tone="light">
      <Tabs items={JOURNEY_ORDER.map(id=>({id,label:'Phase '+JOURNEY_PHASES[id].n}))} value={k} onChange={setK} />
      <div style={{marginTop:'var(--space-12)'}}>
        <EditorialColumns aside={<React.Fragment>
          <span style={{fontFamily:'var(--font-display)',fontSize:'var(--text-5xl)',lineHeight:1,color:'var(--sb-aqua-500)'}}>{p.n}</span>
          <Kicker dash={false}>{p.label}</Kicker>
          <p style={{font:'var(--type-p3)',color:'var(--text-muted)'}}>{p.note}</p>
          <Rule tone="accent" animated />
          <span style={{font:'var(--type-small)',letterSpacing:'var(--tracking-kicker)',textTransform:'uppercase',color:'var(--text-warm)'}}>Produces</span>
          <span style={{font:'var(--type-body-headline)',color:'var(--text-display)'}}>{p.produces}</span>
        </React.Fragment>}>
          <h2 style={{font:'var(--type-display)',maxWidth:'22ch'}}>{p.title}</h2>
          <div className="sb-cols" data-cols="2" style={{gap:'var(--space-16)',marginTop:'var(--space-12)'}}>
            <div>
              <span style={{font:'var(--type-small)',letterSpacing:'var(--tracking-kicker)',textTransform:'uppercase',color:'var(--text-subtle)'}}>Who</span>
              <div style={{marginTop:'var(--space-5)'}}>
                {p.who.map((w,i)=><Reveal key={w} index={i}><div style={{display:'flex',gap:'var(--space-4)',alignItems:'center',padding:'var(--space-4) 0',borderTop:'1px solid var(--border-hairline)'}}>
                  <Icon name="Users01" size={18} color="var(--sb-khaki-500)" /><span style={{font:'var(--type-p1)',color:'var(--text-body)'}}>{w}</span>
                </div></Reveal>)}
              </div>
            </div>
            <div>
              <span style={{font:'var(--type-small)',letterSpacing:'var(--tracking-kicker)',textTransform:'uppercase',color:'var(--text-subtle)'}}>What happens</span>
              <div style={{marginTop:'var(--space-5)'}}>
                {p.what.map((w,i)=><Reveal key={w} index={i}><div style={{display:'flex',gap:'var(--space-4)',alignItems:'flex-start',padding:'var(--space-4) 0',borderTop:'1px solid var(--border-hairline)'}}>
                  <span style={{fontFamily:'var(--font-display)',fontSize:'var(--text-md)',color:'var(--sb-aqua-500)',minWidth:22}}>{'0'+(i+1)}</span>
                  <span style={{font:'var(--type-p1)',color:'var(--text-body)'}}>{w}</span>
                </div></Reveal>)}
              </div>
            </div>
          </div>
        </EditorialColumns>
      </div>
    </Section>

    <Section tone="ivory" size="sm">
      <div style={{display:'flex',alignItems:'center',gap:'var(--space-6)',flexWrap:'wrap'}}>
        <Badge tone="caution" dot>Tracks move</Badge>
        <p style={{font:'var(--type-p1)',color:'var(--text-body)',maxWidth:'70ch'}}>
          Timelines change, offers arrive early, and value work finishes ahead of schedule. When your situation moves, your entry point moves with it.
        </p>
      </div>
    </Section>
  </main>;
}
Object.assign(window,{Journey});
