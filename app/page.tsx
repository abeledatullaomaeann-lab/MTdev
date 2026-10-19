'use client'

import { useState, type FormEvent } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, GitBranch, Link, Mail, MapPin, Send, X } from 'lucide-react'


const projects = [
  { title: 'Campus Event Management System',image: '/event.jpg', type: 'Campus platform', description: 'A practical campus platform that helps organize events, manage participants, and keep university activities running smoothly.', tags: ['React', 'Node.js', 'MongoDB'], tone: 'project-blue' },
  { title: 'PHINMA Araullo University CLE Reviewer',image: '/CLE.jpg', type: 'Criminology board exam reviewer', description: 'Your ultimate criminology board exam reviewer for building confidence through focused study materials and practice.', tags: ['Next.js', 'UI/UX', 'Education'], tone: 'project-warm' },
  { title: 'LabGuard', type: 'Laboratory safety platform',image: '/Labguard.png', description: 'A focused digital tool designed to help students follow laboratory procedures, check safety requirements, and work with greater confidence.', tags: ['React', 'Safety', 'UI/UX'], tone: 'project-green' ,url:"https://labguard.it.com/"},
  { title: 'HK-SAMMS', type: 'Attendance checker',image: '/Hk.png', description: 'A scheduling system for HK Scholars of PHINMA Araullo University that automates duty assignments, minimizes scheduling conflicts, and improves schedule management and accessibility.', tags: ['React', 'Node.js', 'Mongodb'], tone: 'project-green', url: 'https://final-hksamms.vercel.app/'},
]

export default function Page() {
  const [activeProject, setActiveProject] = useState(0)
  const [modalProject, setModalProject] = useState<number | null>(null)
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    setFormStatus('sending')
    try {
      const res = await fetch('/api/contact', { method: 'POST', body: new FormData(form) })
      if (res.ok) { setFormStatus('sent'); form.reset() } else setFormStatus('error')
    } catch {
      setFormStatus('error')
    }
  }
  const project = projects[activeProject]

  const moveProject = (direction: number) => {
    setActiveProject((current) => (current + direction + projects.length) % projects.length)
  }

  return <main>
    <header className="site-header">
      <a className="wordmark" href="#home" aria-label="Mae Ann home"><span className="mark-badge"><span>MT</span></span><span className="mark-name">Mae Ann<span className="mark-dot">.</span></span></a>
      <nav aria-label="Primary navigation"><a href="#home">Home</a><a href="#about">About</a><a href="#projects">Work</a><a href="#education">Journey</a><a href="#contact">Contact</a><a className="cv-link" href="/cv.pdf">Download CV</a></nav>
    </header>

    <section id="home" className="hero section-shell">
      <div className="hero-copy"><p className="eyebrow">Creative technology student</p><h1>Hi, I&apos;m <strong>Mae Ann.</strong></h1><p className="intro">I create purposeful digital experiences that bring clarity to ideas and make everyday interactions feel more natural.</p><div className="hero-actions"><a className="button button-primary" href="#projects">View my work <ArrowUpRight size={17} /></a><a className="button button-ghost" href="#contact">Get in touch</a></div><div className="stats"><div><strong>04+</strong><span>Projects completed</span></div><div><strong>IT</strong><span>Student &amp; creator</span></div><div><strong>100%</strong><span>Curiosity</span></div></div></div>
      <div className="portrait-wrap"><div className="portrait-glow" /><div className="portrait-card"><img src="/profile.jpg" alt="A calm study desk with a laptop, notebook, and green plant" /></div><span className="portrait-caption">Developer / Designer<br /><strong>Philippines</strong></span></div>
    </section>

    <section id="about" className="about section-shell"><div className="section-label"><span>01</span><span>About me</span></div><div className="about-grid"><div><p className="eyebrow">A little about me</p><h2>Curious by nature,<br /><em>purposeful by design.</em></h2></div><div className="about-body"><p className="large-copy">I&apos;m an Information Technology student who enjoys turning questions into practical, meaningful digital work.</p><p>I learn best by building: exploring interfaces, improving small details, and creating projects that are useful to the people who use them. Every experience helps me grow with more confidence and purpose.</p><div className="skill-list"><span>React</span><span>Next.js</span><span>JavaScript</span><span>PHP</span><span>MongoDB</span><span>MySQL</span><span>UI / UX</span><span>Git &amp; GitHub</span></div></div></div></section>

    <section id="projects" className="projects section-shell"><div className="section-label"><span>02</span><span>Projects</span></div><div className="projects-heading"><div><p className="eyebrow">Things I have built</p><h2>Small ideas,<br /><em>real outcomes.</em></h2></div><div className="carousel-tools"><span>{String(activeProject + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span><button type="button" onClick={() => moveProject(-1)} aria-label="Previous project"><ArrowLeft size={18} /></button><button type="button" onClick={() => moveProject(1)} aria-label="Next project"><ArrowRight size={18} /></button></div></div><div className="project-carousel" aria-live="polite"><div className="carousel-track">{[-1, 0, 1].map((offset) => { const index = (activeProject + offset + projects.length) % projects.length; const item = projects[index]; return <article key={`${item.title}-${offset}`} className={`project-card ${item.tone} ${offset === 0 ? 'is-current' : offset < 0 ? 'is-previous' : 'is-next'}`}><div className="project-visual">{item.image ? <img src={item.image} alt={`${item.title} screenshot`} /> : <><span>0{index + 1}</span><div className="visual-window"><i /><i /><i /></div></>}</div><div className="project-info"><p className="project-type">{item.type}</p><h3>{item.title}</h3><p>{item.description}</p><div className="tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div>{item.url ? <a href={item.url} target="_blank" rel="noopener noreferrer" aria-label={`View ${item.title} project`}>View project <ArrowUpRight size={18} /></a> : <button type="button" className="view-btn" onClick={() => setModalProject(index)} aria-label={`View ${item.title} project`}>View project <ArrowUpRight size={18} /></button>}</div></article> })}</div></div><div className="carousel-dots" aria-label="Choose a project">{projects.map((item, index) => <button key={item.title} type="button" className={index === activeProject ? 'is-active' : ''} onClick={() => setActiveProject(index)} aria-label={`Show project ${index + 1}`} />)}</div></section>

    <section id="education" className="education section-shell"><div className="section-label"><span>03</span><span>Background</span></div><div className="education-heading"><p className="eyebrow">Learning &amp; growth</p><h2>Education <em>&amp; experience.</em></h2><p>Building a strong foundation through study, practice, and real projects.</p></div><div className="education-grid"><article className="education-card"><span className="year">2022 — Present</span><h3>Bachelor of Science in Information Technology</h3><p>PHINMA Araullo University</p><span className="card-note">Student • Creator • Learner</span></article><article className="education-card accent-card"><span className="year">Experience</span><h3>Growing through real projects.</h3><p>Building school systems, interface concepts, and practical web experiences while learning modern development tools.</p><span className="card-note">Projects • Practice • Progress</span></article></div></section>

    <section id="contact" className="contact section-shell"><div className="section-label"><span>04</span><span>Get in touch</span></div><div className="contact-content"><div><p className="eyebrow">Say hello</p><h2>Have an idea?<br /><em>Let&apos;s talk about it.</em></h2><p>Whether it&apos;s a project, a question, or a new opportunity, I&apos;d be happy to hear from you.</p><div className="contact-details"><span><Mail size={17} /> maea.tullao@phinmaed.com</span><span><MapPin size={17} /> +63 970 172 8522</span><span><MapPin size={17} /> Philippines</span></div></div><form className="contact-form" onSubmit={sendMessage}><label>Name *<input name="name" required placeholder="Your name" /></label><label>Email *<input name="email" type="email" required placeholder="your.email@example.com" /></label><label>Subject *<input name="subject" required placeholder="What is this about?" /></label><label>Message *<textarea name="message" required placeholder="Tell me more about your project or idea..." rows={4} /></label><button className="button button-primary" type="submit" disabled={formStatus === 'sending'}>{formStatus === 'sending' ? 'Sending...' : 'Send message'} <Send size={16} /></button>{formStatus === 'sent' && <p className="form-status">Thank you! Your message was sent.</p>}{formStatus === 'error' && <p className="form-status form-error">Something went wrong. Please try again or email me directly.</p>}</form></div><footer><span>⚡ Quick response · I typically reply within 24 hours.</span><div className="socials"><a href="https://github.com" aria-label="GitHub"><GitBranch size={18} /></a><a href="https://linkedin.com" aria-label="LinkedIn"><Link size={18} /></a></div></footer></section>
  {modalProject !== null && <div className="modal-backdrop" onClick={() => setModalProject(null)}><div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}><button type="button" className="modal-close" onClick={() => setModalProject(null)} aria-label="Close"><X size={18} /></button>{projects[modalProject].image && <img src={projects[modalProject].image} alt={`${projects[modalProject].title} screenshot`} />}<div className="modal-body"><p className="project-type">{projects[modalProject].type}</p><h3>{projects[modalProject].title}</h3><p>{projects[modalProject].description}</p><div className="tags">{projects[modalProject].tags.map(tag => <span key={tag}>{tag}</span>)}</div></div></div></div>}
  </main>
}
