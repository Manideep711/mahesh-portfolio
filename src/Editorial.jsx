import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useSmoothScroll from './useSmoothScroll'
import './Editorial.css'
gsap.registerPlugin(ScrollTrigger)
function renderSpotlight(el, progress) {
 const width = el.clientWidth, height = el.clientHeight
 const coordinate = (name, size, fallback) => {
   const value = el.style.getPropertyValue(name) || fallback
   return value.includes('%') ? parseFloat(value) * size / 100 : parseFloat(value)
 }
 const x = coordinate('--beam-x', width, '70%')
 const y = coordinate('--beam-y', height, '40%')
 const farthestCorner = Math.hypot(Math.max(x, width - x), Math.max(y, height - y))
 const initial = window.innerWidth <= 650 ? 150 : 210
 // The fully transparent core occupies 55% of the feathered mask radius.
 // Reach the final corner exactly when the pin ends, with no extra hold.
 const radius = initial + (farthestCorner / 0.55 - initial) * progress
 el.style.setProperty('--beam-radius', `${radius}px`)
 el.dataset.revealProgress = String(progress)
}
const base=import.meta.env.BASE_URL
const resume=`${base}Mahesh-Babu-Sanka-Resume-2026.pdf`
const projects=[
 {title:'Clinic Queue & Patient Flow',type:'HEALTHCARE / FULL STACK',text:'A patient management experience connecting responsive interfaces with intelligent workflow automation.',tags:['React','Node.js','REST APIs'],url:'https://mahesh88971.github.io/clinic-queue-and-patient-flow-management/',kind:'clinic',short:['Less waiting.','Better care.']},
 {title:'RESQFLOW',type:'EMERGENCY RESPONSE / IDEATHON',text:'One command center for ambulance dispatch, emergency prioritization, route optimization, and hospital matching. Built with simulated traffic and capacity data.',tags:['Dashboard','Route optimization','AI workflows'],url:'https://mahesh88971.github.io/RESQFLOW/',kind:'resq',short:['Every second','counts.']},
 {title:'Inclusive Digital Culture',type:'CULTATHON / VIT-AP UNIVERSITY',text:'An accessible digital storytelling experience exploring culture, language, and identity through literature and visual expression.',tags:['JavaScript','Responsive UI','Digital culture'],url:'https://mahesh88971.github.io/sign/',kind:'culture',short:['Different voices.','Shared stories.']},
 {title:'MedGuard AI',type:'HEALTHCARE / HACKATHON',text:'A synthetic-data demonstration connecting doctor and pharmacist review queues, medication records, and consent-based caregiver access.',tags:['Healthcare AI','Synthetic data','Consent workflows'],url:'https://mahesh88971.github.io/MedGuard-AI/',kind:'med',short:['Connected care.','Considered consent.']},
 {title:'YUVA',type:'CIVIC TECH / HACKATHON',text:'A civic-tech application helping residents find local services, resources, and community support through a modern frontend and Prisma-powered backend.',tags:['Civic tech','Prisma','Community services'],url:'https://mahesh88971.github.io/YUVA/',kind:'yuva',short:['Your city.','Within reach.']},
]
const skills=[['01','The interface',['REACT','JAVASCRIPT','HTML5','CSS3','TAILWIND CSS']],['02','Behind the scenes',['NODE.JS','EXPRESS.JS','REST APIs','PYTHON','FASTAPI / FLASK']],['03','A little intelligence',['NUMPY','PANDAS','LLM INTEGRATION','OPENAI API','PROMPT ENGINEERING']],['04','The foundations',['MONGODB','MYSQL','GIT','GITHUB','POSTMAN']]]
const links=[['Email','lucky90595812@gmail.com','mailto:lucky90595812@gmail.com'],['LinkedIn','mahesh-babu-sanka','https://linkedin.com/in/mahesh-babu-sanka'],['GitHub','Mahesh88971','https://github.com/Mahesh88971'],['Instagram','@ft.lucky_27','https://www.instagram.com/ft.lucky_27']]
function Hand(){return <svg className="pull-illustration" viewBox="0 0 1000 370" fill="none" aria-hidden="true"><g className="strings" stroke="#282723" strokeWidth="1.5"><path d="M360 161 C490 112 545 58 720 113"/><path d="M370 184 C480 175 601 91 720 128"/><path d="M373 209 C514 258 589 127 720 143"/><path d="M356 229 C497 311 615 193 720 158"/></g><g className="drawing-hand" stroke="#272622" strokeWidth="1.8" strokeLinejoin="round"><path d="M-15 147 L142 134 L162 270 L-15 308Z" fill="#141413"/><path d="M-10 156 L130 146 L148 263 L-10 294Z" stroke="#66645d"/><path d="M138 144 L168 142 L187 258 L158 267Z" fill="#f8f5e9"/><path d="M172 156 C205 147 217 134 242 122 C267 110 309 105 330 109 L380 117 C400 122 398 134 383 137 L326 135 L292 145 C311 144 365 146 388 155 C408 163 405 174 390 175 L321 170 L300 179 C330 177 378 183 393 194 C409 208 398 215 384 211 L326 202 L300 207 C320 209 358 220 370 230 C382 241 372 251 358 243 L315 227 C300 230 286 237 270 237 C244 249 217 248 185 251Z" fill="#eae8e2"/><path d="M220 169 C244 164 261 154 279 153 M225 186 C249 178 268 180 288 179 M236 204 C258 200 279 208 294 209 M209 225 C226 219 239 220 250 225 M307 123 L337 127 M335 158 L366 161 M339 190 L368 197 M330 220 L349 229" opacity=".55"/><path d="M235 151 C253 133 282 124 308 123 M190 235 C201 232 202 215 197 195" opacity=".45"/><circle cx="165" cy="242" r="3" fill="#272622"/><path d="M25 160 L119 153 M30 169 L122 162 M30 276 L140 251" stroke="#53514b" strokeWidth=".7"/></g></svg>}
function PullFooter({onOpen, open}) {
 const stage = useRef(null), gesture = useRef(null), timer = useRef([]), fired = useRef(false)
 const reduce = useReducedMotion()
 const [phase, setPhase] = useState('idle')
 const burst = phase === 'burst' || phase === 'blank'
 useEffect(() => () => { timer.current.forEach(clearTimeout); if(stage.current)gsap.killTweensOf(stage.current.querySelector('.drawing-hand')) }, [])
 useEffect(() => {
   if (!open) { fired.current = false; setPhase('idle'); if(stage.current)gsap.to(stage.current.querySelector('.drawing-hand'),{x:0,y:0,duration:reduce?0:.5,overwrite:true}) }
 }, [open])
 function activate() {
   if (fired.current || open) return
   fired.current = true
   setPhase('burst')
   timer.current.push(setTimeout(() => setPhase('blank'), reduce ? 0 : 550))
   timer.current.push(setTimeout(onOpen, reduce ? 0 : 900))
 }
 useEffect(() => {
   const el = stage.current, button = el.querySelector('.hire-button')
   const svg = el.querySelector('svg'), hand = el.querySelector('.drawing-hand')
   const paths = [...el.querySelectorAll('.strings path')]
   let frame = 0
   function draw() {
     const matrix = svg.getScreenCTM(), handMatrix = hand.getScreenCTM()
     if (matrix && handMatrix) {
       const rect = button.getBoundingClientRect(), inverse = matrix.inverse()
       const endpoint = new DOMPoint(rect.left+7,rect.top+rect.height/2).matrixTransform(inverse)
       paths.forEach((path,i) => {
         path.style.strokeDasharray = 'none'
         path.style.strokeDashoffset = '0'
         const start = new DOMPoint(360+i*3,161+i*22).matrixTransform(handMatrix).matrixTransform(inverse)
         const slack = phase === 'dragging' ? 14 : 36
         path.setAttribute('d',`M${start.x} ${start.y} C${start.x+65} ${start.y+slack} ${endpoint.x-70} ${endpoint.y+slack*(i-1)} ${endpoint.x} ${endpoint.y-22+i*14}`)
       })
     }
     frame = requestAnimationFrame(draw)
   }
   const observer = new IntersectionObserver(([entry])=>{cancelAnimationFrame(frame);if(entry.isIntersecting)frame=requestAnimationFrame(draw)})
   observer.observe(el)
   return ()=>{cancelAnimationFrame(frame);observer.disconnect()}
 }, [phase])
 function down(e) {
   if (fired.current || open) return
   const hand = stage.current.querySelector('.drawing-hand')
   gsap.killTweensOf(hand)
   gesture.current = { x:e.clientX, y:e.clientY, originX:Number(gsap.getProperty(hand,'x')), originY:Number(gsap.getProperty(hand,'y')) }
   e.currentTarget.setPointerCapture(e.pointerId)
   setPhase('dragging')
 }
 function move(e) {
   const drag = gesture.current
   if (!drag || fired.current) return
   const svg = stage.current.querySelector('svg'), rect = svg.getBoundingClientRect()
   const dx = e.clientX-drag.x, dy=e.clientY-drag.y
   const scale=1000/rect.width
   gsap.set(stage.current.querySelector('.drawing-hand'),{x:drag.originX+Math.max(-210,Math.min(180,dx))*scale,y:drag.originY+Math.max(-100,Math.min(100,dy))*scale})
   if (dx < -(window.innerWidth <= 650 ? 65 : 125)) { gesture.current=null; activate() }
 }
 function up() {
   gesture.current=null
   if (!fired.current) {
     setPhase('idle')
     gsap.to(stage.current.querySelector('.drawing-hand'),{x:0,y:0,duration:reduce?0:.7,ease:'elastic.out(1,.65)',overwrite:true})
   }
 }
 return <div className={`pull-stage reference-pull pull-phase-${phase}`} ref={stage}>
   <div className="hand-control" role="button" tabIndex={0} aria-label="Drag the hand left to pull and open contact" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();activate()}}}><Hand/></div>
   <div className="pull-words" aria-hidden="true">{['SHIP','TOGETHER','HELLO','LET’S','BUILD','TALK'].map((word,i)=><motion.span key={word} className={`pull-word word-${i}`} initial={false} animate={burst?{opacity:1,x:0,y:0,scale:1}:{opacity:0,x:(i%2?-90:90),y:(i<3?90:-90),scale:.2}} transition={{duration:reduce?0:.65,ease:[.16,1,.3,1],delay:burst?i*.025:0}}>{word}</motion.span>)}</div>
   <div className="hire-position"><motion.button layoutId="hire-contact-panel" className="hire-button" style={{borderRadius:60,visibility:open?'hidden':'visible'}} whileTap={{scale:.96}} onClick={activate} transition={{layout:{duration:reduce?0:.85,ease:[.22,1,.36,1]}}}><motion.span className="hire-button-copy" animate={{opacity:phase==='blank'?0:1}} transition={{duration:.25}}><strong>HIRE ME</strong><small>Let’s build something extraordinary.</small></motion.span></motion.button></div>
   <span className="pull-note mono">← PULL THE HAND BACK.<br/>OR CLICK TO GET IN TOUCH.</span>
 </div>
}
function Contact({onClose}){
 const dialog=useRef(null);const[status,setStatus]=useState('')
 useEffect(()=>{const previous=document.activeElement,old=document.body.style.overflow;document.body.style.overflow='hidden';dialog.current.querySelector('button').focus();function keydown(e){if(e.key==='Escape')onClose();if(e.key!=='Tab')return;const all=[...dialog.current.querySelectorAll('button,a,input,textarea')];if(e.shiftKey&&document.activeElement===all[0]){e.preventDefault();all.at(-1).focus()}if(!e.shiftKey&&document.activeElement===all.at(-1)){e.preventDefault();all[0].focus()}}document.addEventListener('keydown',keydown);return()=>{document.body.style.overflow=old;document.removeEventListener('keydown',keydown);previous?.focus()}},[onClose])
 async function submit(e){e.preventDefault();setStatus('Sending…');const form=e.currentTarget;try{const res=await fetch('https://formsubmit.co/ajax/lucky90595812@gmail.com',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(form)))});const data=await res.json();if(!res.ok||(data.success!==true&&data.success!=='true'))throw new Error('Unable to send');setStatus('Thank you. Your message has been sent.');form.reset()}catch{setStatus('Could not send. Please use the email link above to reach me directly.')}}
 return <motion.div className="contact-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose}><motion.section ref={dialog} layoutId="hire-contact-panel" className="contact-dialog reference-contact" role="dialog" aria-modal="true" aria-labelledby="contact-title" initial={{borderRadius:50}} animate={{borderRadius:12}} transition={{layout:{duration:.7,ease:[.22,1,.36,1]}}} onClick={e=>e.stopPropagation()}><div className="dialog-top mono"><span>CH. 05 — YOU PULLED<br/>ENOUGH ABOUT MY PORTFOLIO.</span><button onClick={onClose} aria-label="Close contact overlay">CLOSE ×</button></div><h2 id="contact-title">Let’s talk about what<br/><em>I can build for you.</em></h2><div className="dialog-grid"><div><h3>MAHESH BABU SANKA</h3><p>Full-stack development. AI integration.<br/>A useful idea is a good place to start.</p><div className="contact-links">{links.map(([label,value,url])=><a href={url} key={label} target={label==='Email'?undefined:'_blank'} rel="noreferrer"><small className="mono">{label}</small><span>{value} ↗</span></a>)}</div><a href={resume} className="resume-link" download>Download résumé ↓</a></div><form onSubmit={submit}><label>Your name<input name="name" autoComplete="name" required placeholder="What should I call you?"/></label><label>Email<input type="email" name="email" autoComplete="email" required placeholder="you@example.com"/></label><label>Your idea<textarea name="message" rows="3" required placeholder="Tell me what you’re thinking…"/></label><button className="send-button" disabled={status==='Sending…'}>Start a project ↗</button><p className="form-status" role="status">{status}</p></form></div></motion.section></motion.div>
}
export default function Editorial(){
 useEffect(()=>{const frame=requestAnimationFrame(()=>{const id=decodeURIComponent(window.location.hash.slice(1));if(id)document.getElementById(id)?.scrollIntoView({behavior:'instant'})});return()=>cancelAnimationFrame(frame)},[])
 const root=useRef(null),hero=useRef(null);const[lights,setLights]=useState(false),[contact,setContact]=useState(false),[menu,setMenu]=useState(false);const closeContact=useRef(()=>setContact(false)).current
 useSmoothScroll(contact)
 useLayoutEffect(() => {
   const media = gsap.matchMedia()
   media.add('(min-width: 801px) and (min-height: 620px) and (prefers-reduced-motion: no-preference)', () => {
     const section = root.current.querySelector('#work')
     const viewport = section.querySelector('.projects-viewport')
     const track = section.querySelector('.projects-track')
     const ctx = gsap.context(() => {
       gsap.to(track, {
         x: () => -(track.scrollWidth - viewport.clientWidth),
         ease: 'none',
         onUpdate: function () { section.style.setProperty('--projects-progress', String(this.progress())) },
         scrollTrigger: {
           id: 'horizontal-projects', trigger: section,
           refreshPriority: 5,
           start: () => `top top+=${root.current.querySelector('header').offsetHeight}`,
           end: () => `+=${track.scrollWidth - viewport.clientWidth}`,
           pin: true, scrub: true, anticipatePin: 1,
           invalidateOnRefresh: true,
         },
       })
     }, root)
     return () => ctx.revert()
   })
   const refresh = () => { ScrollTrigger.sort(); ScrollTrigger.refresh() }
   const frame = requestAnimationFrame(refresh)
   let active = true
   document.fonts.ready.then(() => { if (active) refresh() })
   return () => { active = false; cancelAnimationFrame(frame); media.revert() }
 }, [])
 useLayoutEffect(() => {
   const media = gsap.matchMedia()
   media.add('(prefers-reduced-motion: no-preference)', () => {
     const ctx = gsap.context(() => {
       gsap.utils.toArray('.skill-group').forEach((row, index) => {
         const direction = index % 2 === 0 ? -1 : 1
         const distance = () => window.innerWidth <= 650 ? 32 : 110
         gsap.fromTo(row.querySelector('.skill-words'),
           { x: () => -direction * distance() },
           { x: () => direction * distance(), ease: 'none',
             scrollTrigger: {
               trigger: row, start: 'top 90%', end: 'top 15%',
               scrub: true, invalidateOnRefresh: true, refreshPriority: -2,
             },
           },
         )
       })
     }, root)
     return () => ctx.revert()
   })
   return () => media.revert()
 }, [])
 useLayoutEffect(() => {
   const media = gsap.matchMedia()
   media.add('(prefers-reduced-motion: no-preference)', () => {
     const ctx = gsap.context(() => {
       gsap.fromTo('.subject-chapter-title',
         { y: 70, clipPath:'inset(100% 0 0 0)' },
         { y:0, clipPath:'inset(0% 0 0 0)', ease:'none',
           scrollTrigger:{trigger:'.subject-divider',start:'top 50%',end:()=>`top top+=${root.current.querySelector('header').offsetHeight}`,scrub:true,refreshPriority:-2},
         },
       )
       // Continue a gentle rise after the ivory cover reaches the header.
       gsap.fromTo('.subject-title-drift', { y:0 }, {
         y:()=>window.innerWidth<=650?-18:-32,ease:'none',
         scrollTrigger:{trigger:'.subject-divider',start:()=>`top top+=${root.current.querySelector('header').offsetHeight}`,end:'bottom top',scrub:true,invalidateOnRefresh:true,refreshPriority:-2},
       })
       gsap.utils.toArray('.statement-line>span').forEach(line => gsap.fromTo(line,{yPercent:24},{yPercent:0,ease:'none',scrollTrigger:{trigger:line.parentElement,start:'top 95%',end:'top 72%',scrub:true,refreshPriority:-2}}))
       gsap.fromTo('.subject-photo', {y:25}, {
         y:0,ease:'none',scrollTrigger:{trigger:'.subject-grid',start:'top 95%',end:'top 65%',scrub:true,refreshPriority:-2},
       })
       gsap.fromTo('.subject-copy', {y:18}, {
         y:0,ease:'none',scrollTrigger:{trigger:'.subject-grid',start:'top 95%',end:'top 65%',scrub:true,refreshPriority:-2},
       })
       const biography = root.current.querySelector('.subject-grid')
       const markers = gsap.utils.toArray('.marker-text')
       const highlightSequence = gsap.timeline({scrollTrigger:{
         id:'biography-highlights', trigger:biography,
         start:()=>`top top+=${root.current.querySelector('header').offsetHeight + 18}`,
         end:()=>`+=${window.innerHeight * 0.85}`,
         pin:true, pinSpacing:true, scrub:true,
         invalidateOnRefresh:true, refreshPriority:7,
       }})
       markers.forEach(mark => highlightSequence.fromTo(mark,
         {'--marker-fill':'0%'}, {'--marker-fill':'100%',duration:1,ease:'none'},
       ))
     }, root)
     return () => ctx.revert()
   })
   return () => media.revert()
 }, [])
 // Consume scroll inside the hero before allowing the next chapter to enter.
 useLayoutEffect(() => {
   const media = gsap.matchMedia()
   media.add('(prefers-reduced-motion: no-preference)', () => {
     const el = hero.current
     const ctx = gsap.context(() => {
       const reveal = gsap.timeline({
         scrollTrigger: {
           id: 'hero-spotlight',
           refreshPriority: 10,
           trigger: el,
           start: () => `top top+=${root.current.querySelector('header').offsetHeight}`,
           end: lights ? 'bottom top' : () => `+=${window.innerHeight * 1.6}`,
           pin: !lights,
           pinSpacing: true,
           scrub: true,
           anticipatePin: 1,
           invalidateOnRefresh: true,
         },
       })
       if (!lights) {
         const beam = { progress: 0 }
         reveal.fromTo(beam, { progress: 0 }, {
           progress: 1, duration: 1, ease: 'none',
           onUpdate: () => renderSpotlight(el, beam.progress),
         }, 0)
       }
       if (!lights) {
         // Once the beam is full, keep the hero beneath the advancing ivory cover.
         // The cover uses normal document scrolling; no extra pinned hold is added.
         const coverDistance = () => hero.current.clientHeight
         gsap.fromTo('.hero-scene', { y: 0 }, {
           y: coverDistance, ease: 'none',
           scrollTrigger: {
             trigger: '.subject-divider',
             start: 'top bottom',
             end: () => `top top+=${root.current.querySelector('header').offsetHeight}`,
             scrub: true, invalidateOnRefresh: true, refreshPriority: 8,
           },
         })
       }
       // Keep scroll drift separate from the children's opening animation.
       // These small offsets share the spotlight's progress and reverse with scroll.
       reveal.fromTo('.surname', { x: 0 }, {
         x: () => window.innerWidth <= 650 ? -14 : -36,
         duration: 1, ease: 'sine.inOut',
       }, 0)
       reveal.fromTo('.identity', { y: 0 }, {
         y: () => window.innerWidth <= 650 ? -12 : -26,
         duration: 1, ease: 'sine.inOut',
       }, 0)
       reveal.fromTo('.portrait-drift', { y: 0 }, {
         y: () => window.innerWidth <= 650 ? -15 : -Math.min(28, el.clientHeight * 0.035),
         duration: 1, ease: 'sine.inOut',
       }, 0)
     }, root)
     return () => ctx.revert()
   })
   return () => media.revert()
 }, [lights])
 useLayoutEffect(()=>{const media=gsap.matchMedia();media.add('(prefers-reduced-motion: no-preference)',()=>{const ctx=gsap.context(()=>{gsap.timeline({defaults:{ease:'power3.out'}}).from('.surname',{y:30,opacity:0,duration:.85}).from('.portrait',{y:45,opacity:0,duration:1},.15).from('.hero-name',{y:35,opacity:0,duration:.75},.3).from('.hero-annotation',{y:12,opacity:0,stagger:.08,duration:.5},.55);gsap.utils.toArray('.reveal').forEach(el=>gsap.from(el,{y:35,opacity:0,duration:.8,scrollTrigger:{trigger:el,start:'top 90%',once:true}}));gsap.utils.toArray('.strings path').forEach((path,i)=>{const len=path.getTotalLength();gsap.fromTo(path,{strokeDasharray:len,strokeDashoffset:len},{strokeDashoffset:0,duration:1.2,delay:i*.1,scrollTrigger:{trigger:'.collaborate',start:'top 75%',once:true}})});},root);return()=>ctx.revert()});return()=>media.revert()},[])
 useEffect(() => {
   const el = hero.current
   let frame = 0
   function move(e) {
     const x = e.clientX, y = e.clientY
     cancelAnimationFrame(frame)
     frame = requestAnimationFrame(() => {
       const r = el.getBoundingClientRect()
       el.style.setProperty('--beam-x', `${Math.max(0, Math.min(r.width, x - r.left))}px`)
       el.style.setProperty('--beam-y', `${Math.max(0, Math.min(r.height, y - r.top))}px`)
       renderSpotlight(el, Number(el.dataset.revealProgress || 0))
     })
   }
   function reset() {
     cancelAnimationFrame(frame)
     el.style.setProperty('--beam-x', '70%')
     el.style.setProperty('--beam-y', '40%')
     renderSpotlight(el, Number(el.dataset.revealProgress || 0))
   }
   el.addEventListener('pointermove', move)
   el.addEventListener('pointerdown', move)
   el.addEventListener('pointerleave', reset)
   return () => {
     cancelAnimationFrame(frame)
     el.removeEventListener('pointermove', move)
     el.removeEventListener('pointerdown', move)
     el.removeEventListener('pointerleave', reset)
   }
 }, [])
 return <div ref={root}><a href="#subject" className="skip-link">Skip to content</a><header className="topbar"><a href="#home" className="brand" aria-label="Mahesh Babu Sanka home">M<span>•</span>S</a><button className="menu-toggle mono" aria-expanded={menu} onClick={()=>setMenu(!menu)}>MENU {menu?'−':'+'}</button><nav className={menu?'navigation open':'navigation'} aria-label="Main navigation">{[['Subject','subject'],['Case files','work'],['Toolkit','toolkit'],['Record','record'],['Hire me','hire']].map(([label,id],i)=><a key={id} href={`#${id}`} onClick={()=>setMenu(false)}><small>0{i+1}</small> {label}</a>)}</nav><button className="light-switch mono" onClick={()=>setLights(!lights)} aria-pressed={lights}><span className={lights?'switch on':'switch'}/><span>LIGHTS {lights?'ON':'OFF'}</span></button></header><main>
 <section id="home" ref={hero} className={`hero ${lights?'':'lights-out'}`} aria-label="Introducing Mahesh Babu Sanka"><div className="hero-scene"><div className="hero-meta mono"><span>A PORTFOLIO IN FIVE CHAPTERS</span><span>VOL. 01 / 2026</span></div><div className="surname" aria-hidden="true">SANKA<span className="red-marker"/></div><div className="yellow-panel"><div className="panel-grid"/></div><span className="figure-label mono hero-annotation">FIG. 01 — THE SUBJECT</span><div className="language-label hero-annotation">PYTHON — MEETS POSSIBILITY</div><svg className="hero-arrow" viewBox="0 0 220 100" fill="none" aria-hidden="true"><path d="M5 82 Q145 100 199 13 M180 19 L200 10 L198 32" stroke="#f8df25" strokeWidth="2"/></svg><div className="hero-note hero-annotation"><span className="circled">code.</span><small className="mono">CURIOSITY, PUT TO WORK</small></div><div className="hero-location mono hero-annotation">VIJAYAWADA, INDIA<br/><span>● REC / PORTFOLIO 2026</span></div><div className="hero-caption hero-annotation"><span className="mono">FULL STACK + AI</span><span className="mini-sticker mono">B.TECH CSE<br/>CLASS OF 2028</span></div><div className="identity"><p className="mono hero-annotation">MAHESH BABU SANKA</p><h1 className="hero-name">MAHESH<span className="name-dot">.</span></h1><p className="hero-description">Computer science student. Full-stack developer.<br/>Building with code, data &amp; a little curiosity.</p></div><div className="portrait-drift"><img className="portrait" src={`${base}portrait-cutout.webp`} alt="Mahesh Babu Sanka, wearing a black suit and white shirt" fetchPriority="high"/></div><div className="dark-veil" aria-hidden="true"/><div className="hero-bottom mono"><span>SCROLL TO EXPLORE ↓</span><span>{lights?'A WORK IN PROGRESS. JUST LIKE ME.':'SCROLL TO BRING THE STORY TO LIGHT.'}</span><a href={resume} download>RÉSUMÉ ↗</a></div></div></section>
 <div className="subject-divider paper" id="subject"><div><span className="mono">CHAPTER 01</span><div className="subject-title-drift"><h2 className="subject-chapter-title">The subject.</h2></div></div></div><section className="subject paper chapter" id="subject-story"><div className="chapter-label mono"><span><b>01</b> THE SUBJECT</span><span>BEHIND THE CODE</span></div><h2 className="statement"><span className="statement-line"><span>STUDYING HOW</span></span><span className="statement-line"><span>TECHNOLOGY WORKS.</span></span><span className="statement-line"><span><em>Building things that matter.</em></span></span></h2><div className="subject-grid"><figure className="subject-photo"><img src={`${base}profile-photo.jpeg`} alt="Portrait of Mahesh" loading="lazy"/><figcaption className="mono">FIG. 02 / ALWAYS A WORK IN PROGRESS</figcaption><span className="photo-cross">+</span></figure><div className="subject-copy"><p className="subject-lead">I’m Mahesh, a <span className="marker-text">B.Tech Computer Science student</span> at R K College of Engineering, Vijayawada. I work across <span className="marker-text">full-stack development and AI integration</span> to turn ideas into useful digital experiences.</p><p>From patient queues to emergency response, I’m drawn to problems with people at the center. I like <span className="marker-text">clear interfaces and practical systems</span>, and figuring out how all the pieces fit.</p><dl className="education-details"><div><dt>DEGREE</dt><dd>B.Tech, Computer Science & Engineering</dd></div><div><dt>INSTITUTION</dt><dd>R K College of Engineering, Vijayawada</dd></div><div><dt>GRADUATION</dt><dd>Expected 2028</dd></div><div><dt>FOCUS</dt><dd>Full-stack development & AI integration</dd></div></dl><a href={resume} download className="text-link">Read the full résumé <span>↗</span></a></div></div></section>
 <section className="work chapter demo-work" id="work"><div className="projects-viewport" tabIndex={0} aria-label="Selected projects, scroll horizontally"><div className="projects-track"><div className="case-introduction"><div className="chapter-label mono"><span><b>02</b> CASE FILES</span></div><h2>FIVE<br/>SYSTEMS.<br/><em>Built to be useful.</em></h2><p>Patient flow. Emergency response. Culture, care, and community. Five projects exploring how code can make everyday systems work better.</p><span className="mono keep-scrolling">KEEP SCROLLING →</span></div>{projects.map((p,i)=><article className={`case-file ${i%2?'reverse':''}`} key={p.title}><div className="case-copy"><span className="case-number">0{i+1}</span><p className="mono small-label">{p.type}</p><h3>{p.title}</h3><p className="case-description">{p.text}</p><div className="project-tags mono">{p.tags.map(tag=><span key={tag}>{tag}</span>)}</div><a href={p.url} target="_blank" rel="noreferrer" className="project-link">OPEN PROJECT <span>↗</span></a></div><a href={p.url} target="_blank" rel="noreferrer" className={`project-art ${p.kind}`} aria-label={`Explore ${p.title}`}><span className="art-top mono">{p.title.toUpperCase()} <span>↗</span></span><strong>{p.short.map(t=><span key={t}>{t}<br/></span>)}</strong><div className="art-interface" aria-hidden="true">{p.kind==='resq'?<><div className="map-grid"><svg viewBox="0 0 400 110"><path d="M10 95 L95 95 L95 28 L210 28 L210 78 L330 78 L330 10 L390 10" stroke="currentColor" strokeWidth="3" fill="none"/></svg></div><div className="interface-bottom mono"><span>DISPATCH</span><span>ROUTE</span><span>COORDINATE</span></div></>:p.kind==='culture'?<div className="culture-letters">Aa <em>అ</em> आ <span>Stories connect us.</span></div>:<><div className="mini-nav"><span>{p.kind==='clinic'?'Patient flow':p.kind==='med'?'Care overview':'Community resources'}</span><i/></div><div className="mini-cards">{(p.kind==='clinic'?['Queue','Patients','Appointments']:p.kind==='med'?['Doctor','Pharmacist','Caregiver']:['Services','Resources','Support']).map(t=><div key={t}><span className="mini-icon">+</span><span>{t}</span><i/></div>)}</div></>}</div><span className="art-caption mono">PROJECT CONCEPT / EXPLORE LIVE ↗</span></a></article>)}</div></div><div className="projects-progress" aria-hidden="true"><span/></div></section>
 <section className="toolkit paper chapter" id="toolkit"><div className="chapter-label mono"><span><b>03</b> THE TOOLKIT</span><span>TOOLS IN SERVICE OF IDEAS</span></div><div className="toolkit-layout"><h2 className="reveal">WHAT I<br/>BUILD <em>with.</em><span className="toolkit-star">✳</span></h2><div>{skills.map(([n,title,items])=><div className="skill-group" key={n}><p className="mono"><span>{n} / </span>{title}</p><div className="skill-words">{items.map((s,i)=><span className={i===0?'highlight-skill':''} key={s}>{s} </span>)}</div></div>)}</div></div></section>
 <section className="record chapter" id="record"><div className="chapter-label mono"><span><b>04</b> THE RECORD</span><span>LEARNING, BY DOING</span></div><h2 className="reveal">THE EVIDENCE,<br/><em>in the making.</em></h2><div className="record-layout"><div className="record-list">{[['01','B.TECH · COMPUTER SCIENCE','R K College of Engineering, Vijayawada','Expected graduation / 2028'],['02','BUILDING UNDER PRESSURE','AOTMS Hackathon','Full-stack application & AI integration'],['03','CULTURE MEETS TECHNOLOGY','Cultathon · VIT-AP University','Inclusive digital experiences'],['04','ALWAYS LEARNING','Technical events & peer coding workshops','Code. Collaborate. Repeat.']].map(([n,title,place,desc])=><div className="record-row reveal" key={n}><span className="mono">{n}</span><div><h3>{title}</h3><p>{place}</p><small className="mono">{desc}</small></div><span>↗</span></div>)}</div><div className="record-note reveal"><span className="mono">A NOTE TO SELF</span><p>Stay curious.<br/>Make it useful.<br/><em>Keep building.</em></p><svg viewBox="0 0 220 60" aria-hidden="true"><path d="M10 40 Q90 12 200 23 M180 9 L203 23 L180 40" fill="none" stroke="currentColor" strokeWidth="2"/></svg><a href={resume} download className="text-link">THE FULL RÉSUMÉ ↗</a></div></div></section>
 <section className="collaborate paper chapter" id="hire"><div className="chapter-label mono"><span><b>05</b> THE NEXT CHAPTER</span><span>THIS PART COULD BE OURS</span></div><h2 className="reveal">PULL ME INTO<br/><em>your team.</em></h2><PullFooter onOpen={()=>setContact(true)} open={contact}/><div className="collab-bottom mono"><span>PREFER IT PLAIN?</span><a href="mailto:lucky90595812@gmail.com">lucky90595812@gmail.com</a><a href={resume} download>Résumé (PDF)</a><a href="https://github.com/Mahesh88971" target="_blank" rel="noreferrer">GitHub</a><a href="https://linkedin.com/in/mahesh-babu-sanka" target="_blank" rel="noreferrer">LinkedIn</a></div></section></main><footer className="mono"><a className="brand" href="#home">M<span>•</span>S</a><span>© {new Date().getFullYear()} MAHESH BABU SANKA</span><div><a href="https://github.com/Mahesh88971" target="_blank" rel="noreferrer">GITHUB ↗</a><a href="https://linkedin.com/in/mahesh-babu-sanka" target="_blank" rel="noreferrer">LINKEDIN ↗</a><a href="#home">BACK TO TOP ↑</a></div></footer><AnimatePresence>{contact&&<Contact onClose={closeContact}/>}</AnimatePresence></div>
}
