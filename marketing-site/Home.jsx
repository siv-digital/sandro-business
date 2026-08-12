/* Design-system components are resolved LAZILY, at render time rather than at
   module-eval time. A template mounts this file through <x-import>, whose fetch
   races the bundle <script> — a top-level destructure would capture undefined. */
const __ds=n=>{const C=p=>React.createElement(window.SandroBusinessDesignSystem_06f5c8[n],p);C.displayName=n;return C};
const Section=__ds('Section'), EditorialColumns=__ds('EditorialColumns'), Reveal=__ds('Reveal'), Kicker=__ds('Kicker'), Rule=__ds('Rule'), Button=__ds('Button'), Card=__ds('Card'), StatBlock=__ds('StatBlock'), Sunburst=__ds('Sunburst'), Icon=__ds('Icon'), Badge=__ds('Badge'), Logo=__ds('Logo');

const HOME_PHASES=[
  ['I','Discovery & diagnostics','Know where you stand','Assessment survey, discovery call, and a market-based valuation of the business.','Target04'],
  ['II','Value & wealth assessment','See the full picture','Personal financial plan and wealth gap analysis, then value enhancement only if the gap calls for it.','Scales02'],
  ['III','Pre-sale planning','Put your plans in place','Estate plan and wealth plan, set before a buyer ever appears.','ShieldTick'],
  ['IV','Sale & transition','Sell the business','Confidential memorandum, indications of interest, letter of intent, closing.','TrendUp01'],
  ['V','Wealth integration','Manage the wealth','Post-sale tax, wealth integration, investment management, for good.','Bank']
];

const HOME_INSIGHTS=[
  ['Sequence','The structures that only work early','Why the estate and tax work has to exist before a buyer puts a number on the company.','workingSession'],
  ['Valuation','What a buyer discounts and why','How much of the business runs without you, and what that costs at close.','cityArchitecture'],
  ['After','The day after the wire hits','The question owners ask last and think about first.','advisorsTablet']
];

/* ---------- HERO ----------
   Rebuilt: the sunburst is used as what it is — a sunrise. Rays occupy the
   lower band and dissolve upward, an aqua horizon hairline draws across, and
   the type sits centred in the clean air above it. No purple disc, no
   left-stacked column, and no scrim needed: the contrast comes from geometry.
   Reference register: Northern Trust / Rockefeller — full-bleed band, small
   kicker, one large statement, one line of support, one primary action. */
function HomeHero({go}){
  return <section className="sb-hero sb-dark">
    <Sunburst variant="horizon" opacity={0.72}>
      <div className="sb-hero-copy">
        <Reveal><Kicker>The Business Owner Journey</Kicker></Reveal>
        <Reveal index={1} mode="wipe">
          <h1 style={{font:'var(--type-hero)',fontSize:'clamp(38px,min(5.1vw,8.2svh),76px)',color:'var(--sb-offwhite)',maxWidth:'25ch',margin:'var(--space-4) auto 0'}}>
            From the business you built to the wealth it becomes.
          </h1>
        </Reveal>
        <Reveal index={2}><p style={{font:'var(--type-subtitle)',letterSpacing:'var(--tracking-sub)',color:'var(--text-on-inverse-muted)',maxWidth:'62ch',margin:'var(--space-5) auto 0'}}>
          Most of your net worth sits inside one illiquid asset. Five phases, one team, one plan — from a first conversation through the sale and into post-close wealth integration.
        </p></Reveal>
        <Reveal index={3}><div style={{display:'flex',gap:'var(--space-5)',marginTop:'var(--space-10)',justifyContent:'center',flexWrap:'wrap'}}>
          <Button variant="accent" size="lg" iconRight="ArrowRight" onClick={()=>go('Assessment')}>Take the assessment</Button>
          <Button variant="secondary" size="lg" onClick={()=>go('Journey')}>See the five phases</Button>
        </div></Reveal>
      </div>
    </Sunburst>

    {/* the three journey facts sit ON the horizon line — the editorial rhythm
        that replaces the old stacked left column */}
    <div className="sb-hero-factsbar">
      <div className="sb-hero-facts" style={{maxWidth:'var(--container-max)',margin:'0 auto'}}>
        {[['1–5 years','From a transition'],['5 phases','In the order they happen'],['3 tracks','Where you enter']].map(([v,l],i)=>
          <Reveal key={v} index={i} delay={500}>
            <div className="sb-hero-fact" data-first={i?undefined:'1'}>
              <span style={{font:'var(--type-h3)',color:'var(--sb-offwhite)'}}>{v}</span>
              <span style={{font:'var(--type-small)',letterSpacing:'var(--tracking-kicker)',textTransform:'uppercase',color:'var(--text-on-inverse-muted)'}}>{l}</span>
            </div>
          </Reveal>)}
      </div>
    </div>
  </section>;
}

/* ---------- FULL-BLEED BAND ----------
   The Northern Trust move: a wide photographic band carrying one statement,
   which breaks the page rhythm between two editorial sections.

   The photograph is the SandroWealth signage, and it dictates the composition.
   Its subject — logo on bright stone — occupies the LEFT half, measured at
   luminance ~173 there against ~65 for the glass entrance on the right. So the
   quote goes right, right-aligned, over the naturally dark side: the parent
   firm's mark reads as the evidence and the statement answers it across the
   frame, rather than the two fighting for the same corner. A bottom scrim would
   have had to flood the stone (and the logo) to make left-aligned type legible.
   --scrim-right darkens only past halfway, so the subject is untouched. */
function HomeBand(){
  return <section className="sb-band" style={{position:'relative',minHeight:'62vh',display:'flex',alignItems:'flex-end',overflow:'hidden'}}>
    <img src={window.sandroSignage} alt="The SandroWealth entrance" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}} />
    <div className="sb-band-scrim" />
    <div className="sb-band-inner" style={{position:'relative',zIndex:2,maxWidth:'var(--container-max)',margin:'0 auto',width:'100%',padding:'var(--space-20) var(--gutter-lg)',display:'flex',justifyContent:'flex-end'}}>
      {/* The wrapper is wider than the quote on purpose: the quote wants a fixed
          measure, but the kicker under it must not wrap — at 20ch it broke into
          three lines and detached from its keyline. */}
      {/* WIDTH, not max-width: this div is a flex item, so with only a max-width it
          shrinks to the balanced text width and the quote's own measure never
          governs — which is what stacked this sentence into four short lines. */}
      <div style={{textAlign:'right',width:'min(720px,100%)'}}>
        <Reveal mode="wipe">
          {/* The measure is in em, so it scales WITH the type: a fixed px measure
              held two lines at 1280 but let the whole sentence collapse onto one
              720px line at 1024, which shot across the frame into the bright side
              at 3.7:1. 21em keeps two lines at every size. */}
                    <p style={{font:'var(--type-quote)',fontSize:'clamp(23px,2.6vw,40px)',color:'var(--sb-offwhite)',margin:'0 0 0 auto',width:'min(21em,100%)',textWrap:'balance'}}>
            The exit is the only transaction of its size you will ever run.
          </p>
        </Reveal>
        <Reveal index={1}><div style={{display:'flex',alignItems:'center',justifyContent:'flex-end',gap:'var(--space-5)',marginTop:'var(--space-8)'}}>
          {/* Everything a breakpoint needs to change lives in CSS, not inline —
              an inline style beats a media query, so a phone rule written against
              an inline-styled property silently does nothing. */}
          <span className="sb-band-kicker" style={{font:'var(--type-small)',letterSpacing:'var(--tracking-kicker)',textTransform:'uppercase',color:'rgba(255,254,246,.72)'}}>One engagement, five phases</span>
          <span className="sb-band-keyline" />
        </div></Reveal>
      </div>
    </div>
  </section>;
}

function HomePhases(){
  return <Section tone="light">
    <EditorialColumns aside={<React.Fragment>
      <Kicker>The phased approach</Kicker>
      <p style={{font:'var(--type-p3)',color:'var(--text-muted)'}}>You spent decades turning an idea into an enterprise. The exit is the only transaction of its size you will ever run.</p>
    </React.Fragment>}>
      <h2 style={{font:'var(--type-display)',maxWidth:'24ch'}}>Five phases. One team. One plan.</h2>
      <div style={{marginTop:'var(--space-12)'}}>
        {HOME_PHASES.map(([n,t,head,b,ic],i)=>
          <Reveal key={n} index={i}>
            <div className="sb-phase">
              <span style={{fontFamily:'var(--font-display)',fontSize:'var(--text-3xl)',lineHeight:1,color:'var(--text-accent)'}}>{n}</span>
              {/* Alignment is a CSS concern here, not an inline one: the phone row
                  pairs this glyph with the numeral and needs to centre them, and an
                  inline alignSelf cannot be undone by a media query. */}
              <Icon name={ic} size={22} color="var(--sb-khaki-500)" />
              <div>
                <h3 style={{font:'var(--type-h3)'}}>{head}</h3>
                <span style={{font:'var(--type-small)',letterSpacing:'var(--tracking-kicker)',textTransform:'uppercase',color:'var(--text-subtle)',display:'block',marginTop:6}}>{t}</span>
              </div>
              <p style={{font:'var(--type-p3)',color:'var(--text-muted)',maxWidth:'48ch'}}>{b}</p>
            </div>
          </Reveal>)}
        <Rule tone="gradient" thickness={2} animated />
      </div>
    </EditorialColumns>
  </Section>;
}

function HomeTracks({go}){
  /* One hue, three depths — the tracks are stages of a journey, not categories,
     so they differ by intensity of the same aqua rather than by hue. */
  const T=[
    ['Still exploring','No timeline yet. Learning what the options are.','Enters at Phase I',1],
    ['Build value first','Three to five years out. The number isn\u2019t there yet.','Enters at Phase II',2],
    ['Ready to sell','Selling in the next 12 to 18 months, or already in a deal.','Enters at Phase III',3]
  ];
  return <Section tone="dark">
    <Kicker>One journey, three ways in</Kicker>
    <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',gap:'var(--space-10)',flexWrap:'wrap',marginTop:'var(--space-5)'}}>
      <h2 style={{font:'var(--type-display)',color:'var(--sb-offwhite)',maxWidth:'22ch'}}>A track is where you start, not a category you are filed under.</h2>
      <Button variant="link" onClick={()=>go('Tracks')}>Compare the tracks</Button>
    </div>
    <div className="sb-cols" data-cols="3" style={{gap:'var(--space-6)',marginTop:'var(--space-16)'}}>
      {T.map(([t,b,e,n],i)=>
        <Reveal key={t} index={i}>
          <div style={{position:'relative',padding:'var(--space-8)',border:'1px solid var(--border-hairline)',borderRadius:'var(--radius-md)',background:'var(--surface-card)',overflow:'hidden',height:'100%',boxSizing:'border-box'}}>
            <span style={{position:'absolute',inset:0,background:`var(--sb-wash-track-${n})`,pointerEvents:'none'}} />
            <span style={{position:'absolute',left:0,top:0,bottom:0,width:3,background:`var(--sb-gradient-track-${n})`}} />
            <span style={{position:'relative',font:'var(--type-small)',letterSpacing:'var(--tracking-kicker)',textTransform:'uppercase',color:'var(--sb-aqua-300)'}}>{e}</span>
            <h3 style={{position:'relative',font:'var(--type-h2)',color:'var(--sb-offwhite)',marginTop:'var(--space-4)'}}>{t}</h3>
            <p style={{position:'relative',font:'var(--type-p3)',color:'var(--text-on-inverse-muted)',marginTop:'var(--space-4)'}}>{b}</p>
          </div>
        </Reveal>)}
    </div>
  </Section>;
}

function HomeProof(){
  return <Section tone="ivory" size="sm">
    <div className="sb-cols" data-cols="3">
      {[['Of a mid-market owner\u2019s net worth','Up to 80%','Sits inside the operating business — one illiquid, undiversified asset.'],
        ['Assessment','10 min','Online, nothing to tally, and it places you on a track before anyone gets on a call.'],
        ['Baseline valuation','Complimentary','A real number behind every option you are weighing.']].map(([k,v,l],i)=>
        <Reveal key={k} index={i}><StatBlock kicker={k} value={v} label={l} size="md" /></Reveal>)}
    </div>
  </Section>;
}

function HomeStatement(){
  return <Section tone="light">
    <div className="sb-cols" data-split="a" style={{gap:'var(--space-24)',alignItems:'center'}}>
      <Reveal>
        <Kicker>Why sequence decides the outcome</Kicker>
        <blockquote style={{margin:'var(--space-6) 0 0',font:'var(--type-quote)',fontSize:'clamp(24px,2.5vw,38px)',color:'var(--text-display)'}}>
          The structures that change your after-tax outcome have to exist before a buyer puts a number on the company.
        </blockquote>
        <p style={{font:'var(--type-p1)',color:'var(--text-muted)',maxWidth:'48ch',marginTop:'var(--space-6)'}}>
          The IRS respects structures set up well ahead of a sale, not ones bolted on the month before close. One team quarterbacks the whole thing, and the sale is the middle of the process — not the end of it.
        </p>
        <div style={{marginTop:'var(--space-8)'}}><Button variant="accent" data-ink="light" iconRight="ArrowRight">How Phase III runs</Button></div>
      </Reveal>
      <Reveal index={1}><div style={{overflow:'hidden',borderRadius:'var(--radius-md)'}}>
        <img src={window.workingSession} alt="An owner in a working session with advisors" style={{width:'100%',display:'block',aspectRatio:'4/3',objectFit:'cover'}} />
      </div></Reveal>
    </div>
  </Section>;
}

function HomeInsights(){
  return <Section tone="light" size="sm">
    <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',gap:'var(--space-8)'}}>
      <div><Kicker>Owner briefings</Kicker><h2 style={{font:'var(--type-display)',marginTop:'var(--space-4)'}}>Written for owners, not for search engines.</h2></div>
      <Button variant="link">All briefings</Button>
    </div>
    <div className="sb-cols" data-cols="3" style={{marginTop:'var(--space-12)'}}>
      {HOME_INSIGHTS.map(([k,t,b,img],i)=>
        <Reveal key={t} index={i}><Card interactive kicker={k} title={t} body={b} media={window[img]} /></Reveal>)}
    </div>
  </Section>;
}

/* THE CLOSING FIELD: #030303 → #232B36, centred, 188×51 buttons.
   Deliberately NOT a band treatment. `horizon` clips the rays to a fixed strip
   closed by a keyline — right in the hero (980px tall, so the band reads as a
   real horizon far below the type), wrong here: in a ~440px section the same
   geometry produces a decorative strip fenced off along the bottom, which makes
   the sunburst an afterthought rather than the ground of the section.
   `bloom` instead oversizes the artwork and drops its centre below the bottom
   edge, then fades it radially in every direction — no clipped band, no keyline,
   no edge anywhere — so the type sits INSIDE the sun instead of above it. The
   mask is weakest through the middle where the copy sits and strongest below the
   buttons, so contrast comes from the falloff and no scrim is needed.
   The top keyline is gone too: the tone change from the light section above is
   the transition, so this reads as continuous ground, not a boxed-off panel. */
function HomeCTA({go}){
  return <section className="sb-dark" style={{background:'var(--sb-gradient-base)',padding:'var(--section-y) var(--gutter-lg)',position:'relative',overflow:'hidden'}}>
    <Sunburst variant="bloom" opacity={0.42} />
    <div style={{position:'relative',zIndex:3,maxWidth:900,margin:'0 auto',display:'flex',flexDirection:'column',alignItems:'center',gap:'var(--space-6)',textAlign:'center'}}>
      <Reveal mode="wipe"><h2 style={{font:'var(--type-display)',color:'var(--sb-light-000)',maxWidth:'22ch'}}>Start with an honest read of where you stand.</h2></Reveal>
      <Reveal index={1}><p style={{font:'var(--type-subtitle)',letterSpacing:'var(--tracking-sub)',color:'var(--text-on-inverse-muted)',maxWidth:'52ch'}}>
        The assessment and a thirty-minute discovery call come first on every track. No obligation follows you out.
      </p></Reveal>
      <Reveal index={2}><div className="sb-btn-row" style={{marginTop:'var(--space-4)'}}>
        <Button variant="accent" size="lg" iconRight="ArrowRight" onClick={()=>go('Assessment')}>Take the assessment</Button>
        <Button variant="secondary" size="lg">Get the Playbook</Button>
      </div></Reveal>
    </div>
  </section>;
}

function Home({go}){
  return <main><HomeHero go={go}/><HomePhases/><HomeBand/><HomeTracks go={go}/><HomeProof/><HomeStatement/><HomeInsights/><HomeCTA go={go}/></main>;
}
Object.assign(window,{Home});
