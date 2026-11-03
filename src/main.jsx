import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowDown, ArrowRight, ChevronRight, Heart, Instagram, Linkedin, Menu, Play, School, Sparkles, Users, X, Youtube } from "lucide-react";
import { siteContent } from "./data/siteContent";
import "./styles.css";

const navItems = [["The Film", "#film"], ["The Story", "#story"], ["Our Impact", "#impact"], ["Partner With Us", "#partner"]];
function Button({ children, href, tone = "yellow", icon = false, className = "", onClick }) { const classes = `button button--${tone} ${className}`; const content = <>{children}{icon && <ArrowRight size={17} strokeWidth={2.5} />}</>; return href ? <a className={classes} href={href}>{content}</a> : <button className={classes} onClick={onClick}>{content}</button>; }
function Wordmark() { return <a href="#top" className="wordmark" aria-label="Girls Battling Realities home"><span>GBR.</span><i>Girls Battling<br />Realities</i></a>; }
function Navigation() { const [open, setOpen] = useState(false); const [scrolled, setScrolled] = useState(false); useEffect(() => { const update = () => setScrolled(window.scrollY > 28); update(); window.addEventListener("scroll", update, { passive: true }); return () => window.removeEventListener("scroll", update); }, []); return <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}><Wordmark /><nav className="nav__links" aria-label="Main navigation">{navItems.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</nav><Button href="#partner" className="nav__cta">Support the girls</Button><button className="menu-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button><div className={`mobile-menu ${open ? "mobile-menu--open" : ""}`}>{navItems.map(([label, href]) => <a href={href} key={href} onClick={() => setOpen(false)}>{label}<ChevronRight size={18} /></a>)}<Button href="#partner" onClick={() => setOpen(false)}>Support the girls</Button></div></header>; }
function Reveal({ children, className = "" }) { return <div className={`reveal ${className}`}>{children}</div>; }
function SectionIntro({ kicker, children }) { return <div className="section-intro"><p>{kicker}</p>{children}</div>; }
function Hero() { return <section className="hero" id="top" style={{ "--image": `url(${siteContent.images.hero})` }}><div className="hero__grain" /><div className="hero__body"><Reveal><p className="eyebrow">A documentary by Soroti Cricket Academy <b>×</b> Laten Media</p></Reveal><h1 className="hero__title" aria-label="Girls Battling Realities"><span>Girls</span><span>Battling</span><span>Realities.</span></h1><Reveal className="hero__bottom"><div><p className="hero__line">Their realities. Their resilience. Their future.</p><p className="hero__summary">A story of courage, cricket and the power of opportunity.</p></div><div className="hero__actions"><Button href="#film" icon>Watch the film</Button><Button href="#partner" tone="clear">Support the girls</Button></div></Reveal></div><a className="scroll-cue" href="#film"><span>Scroll to begin</span><ArrowDown size={18} /></a></section>; }
function FilmSection({ onPlay }) { return <section id="film" className="film section-padding"><div className="film__media image-frame"><img src={siteContent.images.film} alt="Girls playing cricket outdoors" /><button className="play-button" aria-label="Play documentary trailer" onClick={onPlay}><Play fill="currentColor" size={24} /></button><div className="film__caption glass">A film about courage, belonging and possibility.</div></div><Reveal className="film__copy"><SectionIntro kicker="The documentary"><h2>More than a game.<br />A chance at a future.</h2></SectionIntro><p>Girls face challenges that threaten their education and opportunities. Through cricket and community support, they are finding strength, purpose and a reason to keep going.</p><Button href="#story" tone="outline" icon>Explore the story</Button></Reveal></section>; }
function RealitySection() { const details = ["Barriers to education", "Limited opportunities", "The fight for a better future"]; return <section id="story" className="reality" style={{ "--image": `url(${siteContent.images.reality})` }}><div className="reality__content"><Reveal><h2>Behind every girl<br />is a story worth telling.</h2><p>Every challenge is real. So is the determination to overcome it.</p></Reveal><div className="reality__tags">{details.map((detail, index) => <Reveal key={detail}><div className="glass reality__tag"><b>0{index + 1}</b>{detail}</div></Reveal>)}</div></div></section>; }
function OpportunitySection() { const items = [[School, "Education"], [Sparkles, "Confidence"], [Users, "Mentorship"], [Heart, "Opportunity"]]; return <section className="opportunity section-padding"><div className="opportunity__heading"><SectionIntro kicker="The opening"><h2>Cricket<br />opens doors.</h2></SectionIntro><p>More than sport, it creates space for learning, confidence, connection and opportunity.</p></div><div className="opportunity__grid"><div className="opportunity__image"><img src={siteContent.images.cricket} alt="Cricket player fielding a ball" /></div><div className="opportunity__benefits">{items.map(([Icon, label]) => <div className="benefit glass" key={label}><Icon size={23} /><span>{label}</span></div>)}</div></div></section>; }
function StoriesSection() { return <section className="stories section-padding"><SectionIntro kicker="Voices of the game"><h2>Her story<br />is still being written.</h2></SectionIntro><div className="story-grid">{siteContent.stories.map((story, index) => <article className={`story-card story-card--${index + 1}`} key={story.name}><img src={story.image} alt={`Portrait of ${story.name}`} loading="lazy" /><div className="story-card__shade" /><div className="story-card__content"><p>Her story</p><h3>{story.name}</h3><blockquote>“{story.quote}”</blockquote><span aria-hidden="true"><ArrowRight size={19} /></span></div></article>)}</div><p className="placeholder-note">Quotes remain editable placeholders pending documentary participant approval.</p></section>; }
function AnimatedNumber({ value }) {
  const target = Number.parseInt(value, 10);
  const suffix = value.replace(String(target), "");
  const [count, setCount] = useState(0);
  const numberRef = useRef(null);
  const hasPlayed = useRef(false);

  useEffect(() => {
    const node = numberRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const animate = () => {
      if (hasPlayed.current) return;
      hasPlayed.current = true;
      if (reducedMotion) { setCount(target); return; }
      const duration = 1600;
      const startedAt = performance.now();
      let frame;
      const tick = (now) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        setCount(Math.round(target * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(frame);
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { animate(); observer.disconnect(); }
    }, { threshold: 0.45 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [target]);

  return <strong ref={numberRef} aria-label={value}>{count}{suffix}</strong>;
}
function ImpactSection() { return <section id="impact" className="impact section-padding"><div className="impact__top"><SectionIntro kicker="The ripple effect"><h2>Changing the game.<br />Changing futures.</h2></SectionIntro><p>Every number represents a story, a possibility and a future.</p></div><div className="impact__stats">{siteContent.impact.map(([value, label]) => <div className="stat" key={label}><AnimatedNumber value={value} /><span>{label}</span></div>)}</div></section>; }
function PartnershipSection() { const options = [["Impact Partner", "Support the long-term vision."], ["Programme Partner", "Help fund meaningful opportunities."], ["Community Partner", "Contribute resources, skills and support."]]; return <section id="partner" className="partner" style={{ "--image": `url(${siteContent.images.partnership})` }}><div className="partner__inner glass"><SectionIntro kicker="Partnership"><h2>Be part of her<br />next chapter.</h2></SectionIntro><p>Help create opportunities for girls through cricket, education and community support.</p><div className="partner__options">{options.map(([name, copy]) => <div key={name}><h3>{name}</h3><p>{copy}</p></div>)}</div><div className="partner__actions"><Button href={siteContent.contact.partnerLink} icon>Become a partner</Button><Button href="#contact" tone="clear">Contact the team</Button></div></div></section>; }
function FinalCTA() { return <section className="final-cta" style={{ "--image": `url(${siteContent.images.finalCta})` }}><div><p className="eyebrow">The next chapter starts now</p><h2>Every girl deserves<br />a chance to rewrite her story.</h2><Button href="#partner" icon>Support the girls</Button><p className="final-cta__line">Their realities. Their resilience. Their future.</p></div></section>; }
function Footer() { return <footer id="contact" className="footer"><div className="footer__top"><Wordmark /><p>Girls Battling Realities is a documentary initiative in collaboration with Soroti Cricket Academy and Laten Media.</p><a className="footer__email" href={`mailto:${siteContent.contact.email}`}>{siteContent.contact.email}</a></div><div className="footer__bottom"><div className="footer__links">{navItems.map(([name, href]) => <a href={href} key={name}>{name}</a>)}</div><div className="socials"><a href={siteContent.contact.social.instagram} aria-label="Instagram placeholder"><Instagram /></a><a href={siteContent.contact.social.youtube} aria-label="YouTube placeholder"><Youtube /></a><a href={siteContent.contact.social.linkedin} aria-label="LinkedIn placeholder"><Linkedin /></a></div><small>© {new Date().getFullYear()} GBR. All rights reserved.</small></div></footer>; }
function VideoModal({ close }) { return <div className="video-modal" role="dialog" aria-modal="true" aria-label="Documentary film"><button onClick={close} aria-label="Close video"><X /></button><div className="video-modal__inner">{siteContent.videoUrl ? <iframe src={siteContent.videoUrl} title="Girls Battling Realities documentary trailer" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /> : <><Play size={42} fill="currentColor" /><h2>Film coming soon</h2><p>Add your YouTube or Vimeo embed URL in <code>src/data/siteContent.js</code>.</p></>}</div></div>; }
function App() { const [videoOpen, setVideoOpen] = useState(false); useEffect(() => { const observer = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")), { threshold: 0.14 }); document.querySelectorAll(".reveal").forEach((el) => observer.observe(el)); return () => observer.disconnect(); }, []); return <><Navigation /><main><Hero /><FilmSection onPlay={() => setVideoOpen(true)} /><RealitySection /><OpportunitySection /><StoriesSection /><ImpactSection /><PartnershipSection /><FinalCTA /></main><Footer />{videoOpen && <VideoModal close={() => setVideoOpen(false)} />}</>; }
createRoot(document.getElementById("root")).render(<App />);
