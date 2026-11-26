import { FormEvent, useEffect, useState } from 'react'

const encarniImage = '/assets/encarni.png'
const labialesImage = '/assets/labiales.png'
const encarniHomeImage = '/assets/encarni-home.png'
const labialesHomeImage = '/assets/labiales-home.jpg'
const solenImage = '/assets/solen.jpg'
const evelinImage = '/assets/evelin.png'
const beatrizImage = '/assets/beatriz.png'
const arletteImage = '/assets/arlette.png'

type Page = 'home' | 'work' | 'project' | 'services' | 'studio' | 'contact'

const pages: { id: Page; label: string }[] = [
  { id: 'home', label: 'Inicio' },
  { id: 'work', label: 'Trabajo' },
  { id: 'project', label: 'Proyectos' },
  { id: 'services', label: 'Servicios' },
  { id: 'studio', label: 'Estudio' },
  { id: 'contact', label: 'Contacto' },
]

function getPage(): Page {
  const route = window.location.hash.replace('#/', '').toLowerCase()
  return pages.some(({ id }) => id === route) ? (route as Page) : 'home'
}

function navigate(page: Page) {
  window.location.hash = `/${page}`
}

function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <div className={`wordmark ${light ? 'wordmark--light' : ''}`} aria-label="amelia studio">
      <span>amelia</span>
      <small>studio</small>
    </div>
  )
}

function Header({ current }: { current: Page }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="logo-area">
        <a href="#/home" className="logo-link" aria-label="Amelia Studio, inicio">
          <Wordmark />
        </a>
      </div>
      <nav className={`nav-bar ${menuOpen ? 'nav-bar--open' : ''}`} aria-label="Navegación principal">
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span>Menú</span>
          <span className="menu-lines" aria-hidden="true" />
        </button>
        <div className="nav-links">
          {pages.map(({ id, label }) => (
            <a
              key={id}
              className={current === id ? 'active' : ''}
              href={`#/${id}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <Wordmark light />
      <p>© 2026 AMELIA STUDIO. Todos los derechos reservados.</p>
    </footer>
  )
}

function ProjectCard({
  title,
  image,
  kind,
}: {
  title: string
  image?: string
  kind?: 'solen'
}) {
  return (
    <a className="project-card" href="#/project" aria-label={`Ver proyecto ${title}`}>
      <div className="project-card__frame">
        {kind === 'solen' ? <img src={solenImage} alt="Identidad visual del proyecto SOLEN" /> : <img src={image} alt="" />}
        <span className="project-card__index">0{title === 'ENCARNI' ? 1 : title === 'LABIALES' ? 2 : 3}</span>
      </div>
      <div className="project-card__caption">
        <span>{title}</span>
        <span aria-hidden="true">↗</span>
      </div>
    </a>
  )
}

function HomePage() {
  const team = [
    { name: 'Evelin Ramírez', role: 'Dirección creativa', image: evelinImage },
    { name: 'Beatriz Montalvo', role: 'Diseño e ilustración', image: beatrizImage, flushRole: true },
    { name: 'Arlette Salcedo', role: 'Desarrollo y fotografía', image: arletteImage, flushRole: true },
  ]

  return (
    <>
      <main>
        <section className="intro section-shell">
          <p className="eyebrow">Estudio creativo independiente — Desde 2021</p>
          <div className="intro__grid">
            <h1>Ideas con alma,<br /><em>diseño con intención.</em></h1>
            <p className="intro__copy">
              En Amelia transformamos ideas en marcas con personalidad. Creamos identidades visuales,
              logotipos y papelería creativa para emprendedores y negocios que buscan comunicar su
              esencia de manera auténtica. Nos distingue nuestra creatividad, cercanía y cuidado por
              cada detalle, creando diseños que conectan y cuentan historias.
            </p>
          </div>
        </section>

        <section className="projects section-shell">
          <div className="section-heading">
            <p className="eyebrow">Una selección de</p>
            <h2>Proyectos destacados</h2>
          </div>
          <div className="project-grid">
            <ProjectCard title="ENCARNI" image={encarniHomeImage} />
            <ProjectCard title="LABIALES" image={labialesHomeImage} />
            <ProjectCard title="SOLEN" kind="solen" />
          </div>
        </section>

        <section className="service-strip" aria-label="Servicios principales">
          {['Branding', 'Fotografía', 'Ilustración'].map((service, index) => (
            <div key={service}>
              <span>0{index + 1}</span>
              <h3>{service}</h3>
            </div>
          ))}
        </section>

        <section className="team section-shell">
          <div className="section-heading section-heading--split">
            <div>
              <p className="eyebrow">Las personas detrás de</p>
              <h2>Amelia studio</h2>
            </div>
            <p>Tres miradas, una misma sensibilidad.</p>
          </div>
          <div className="team-grid">
            {team.map((person, index) => (
              <article className="team-card" key={person.name}>
                <div className="team-card__image">
                  <img src={person.image} alt={`Retrato de ${person.name}`} />
                  <span>0{index + 1}</span>
                </div>
                <h3>{person.name}</h3>
                <p className={person.flushRole ? 'team-card__role--flush' : undefined}>{person.role}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}

function WorkPage() {
  return (
    <main className="page-main work-page section-shell">
      <header className="page-title">
        <p className="eyebrow">Archivo seleccionado — 2021/2026</p>
        <h1>Trabajo que habla<br /><em>por sí mismo.</em></h1>
      </header>
      <div className="work-grid">
        <a href="#/project" className="work-item">
          <div className="work-item__image"><img src={encarniImage} alt="Ilustración editorial Encarní" /></div>
          <p><strong>ENCARNI</strong><span>Ilustración — 2025</span></p>
        </a>
        <a href="#/project" className="work-item work-item--offset">
          <div className="work-item__image"><img src={labialesImage} alt="Fotografía artística de labiales" /></div>
          <p><strong>LABIALES</strong><span>Fotografía — 2024</span></p>
        </a>
        <a href="#/project" className="work-banner">
          <img className="solen-image--wide" src={solenImage} alt="Identidad visual del proyecto SOLEN" />
          <p><strong>SOLEN</strong><span>Branding — 2023</span></p>
        </a>
      </div>
      <p className="work-summary">
        Combinamos estrategia, intuición y oficio para construir universos visuales completos.
        Nos movemos entre disciplinas porque cada historia pide una forma distinta de ser contada.
      </p>
    </main>
  )
}

const caseStudies = [
  {
    title: 'ENCARNI',
    category: 'Ilustración editorial',
    image: encarniHomeImage,
    problem: 'Traducir una historia íntima y vital en un retrato contemporáneo, sin perder su calidez.',
    process: 'Trazos manuales, capas de color y una paleta terracota construyeron una imagen táctil y cercana.',
    result: 'Una pieza editorial con carácter propio, capaz de sostener la identidad visual de la publicación.',
  },
  {
    title: 'LABIALES',
    category: 'Fotografía & dirección de arte',
    image: labialesHomeImage,
    problem: 'Presentar una colección de color desde una mirada artística, sensual y alejada del catálogo.',
    process: 'Creamos composiciones escultóricas con pigmento, luz lateral y texturas de alto contraste.',
    result: 'Una campaña magnética y versátil que elevó la percepción del producto en digital y editorial.',
  },
  {
    title: 'SOLEN',
    category: 'Branding',
    solen: true,
    problem: 'Dar forma a una marca de cuidado solar que se sintiera natural, serena y contemporánea.',
    process: 'Partimos del ciclo del sol para definir un símbolo, una voz limpia y una paleta cálida.',
    result: 'Un sistema flexible y reconocible que conecta bienestar, belleza y una actitud consciente.',
  },
]

function ProjectPage() {
  return (
    <main className="page-main project-page section-shell">
      <header className="page-title page-title--center">
        <p className="eyebrow">Casos de estudio</p>
        <h1>El detalle es<br /><em>la diferencia.</em></h1>
      </header>
      <div className="case-list">
        {caseStudies.map((study, index) => (
          <article className={`case-study ${index % 2 ? 'case-study--reverse' : ''}`} key={study.title}>
            <div className="case-study__visual">
              {study.solen
                ? <img src={solenImage} alt="Identidad visual del proyecto SOLEN" />
                : <img src={study.image} alt={`Proyecto ${study.title}`} />}
              <span className="case-number">0{index + 1}</span>
            </div>
            <div className="case-study__content">
              <p className="eyebrow">{study.category}</p>
              <h2>{study.title}</h2>
              <div className="case-facts">
                {[
                  ['Problema', study.problem],
                  ['Proceso', study.process],
                  ['Resultado', study.result],
                ].map(([label, text]) => (
                  <div key={label}>
                    <h3>{label}</h3>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}

function ServicesPage() {
  const services = [
    ['Fotografía', 'Fotografía creativa y dirección de arte para productos y marcas con personalidad.'],
    ['Branding', 'Identidades visuales completas, logotipos y papelería creativa diseñadas para conectar.'],
    ['Ilustración', 'Ilustración editorial y personalizada que aporta un carácter único a cada proyecto.'],
  ]

  return (
    <main className="page-main services-page section-shell">
      <header className="page-title">
        <p className="eyebrow">Lo que hacemos</p>
        <h1>Tres disciplinas,<br /><em>infinitas historias.</em></h1>
      </header>
      <div className="services-list">
        {services.map(([title, description], index) => (
          <article key={title}>
            <span>0{index + 1}</span>
            <h2>{title}</h2>
            <p>{description}</p>
            <a href="#/contact" aria-label={`Consultar sobre ${title}`}>Hablemos <span>↗</span></a>
          </article>
        ))}
      </div>
    </main>
  )
}

function StudioPage() {
  return (
    <main className="page-main studio-page">
      <div className="section-shell">
        <header className="page-title">
          <p className="eyebrow">Nosotras</p>
          <h1>Un estudio pequeño<br /><em>para grandes ideas.</em></h1>
        </header>
        <div className="studio-story">
          <article className="studio-block studio-block--left">
            <span>01</span>
            <p className="eyebrow">Historia</p>
            <h2>Todo empezó con una conversación.</h2>
            <p>
              Amelia nació del encuentro de tres diseñadoras gráficas con una visión compartida:
              crear un espacio donde la estrategia y la sensibilidad pudieran convivir. Desde 2021,
              acompañamos a marcas que quieren hacer las cosas de una manera más humana.
            </p>
          </article>
          <article className="studio-block studio-block--right">
            <span>02</span>
            <p className="eyebrow">Filosofía</p>
            <h2>Diseñamos desde la escucha.</h2>
            <p>
              Creemos en la autenticidad por encima de las tendencias, en la cercanía durante todo el
              proceso y en el cuidado de esas pequeñas decisiones que hacen memorable una identidad.
            </p>
          </article>
          <article className="studio-block studio-block--left studio-block--location">
            <span>03</span>
            <p className="eyebrow">Ubicación</p>
            <h2>Madrid, España.</h2>
            <p>Calle de Moratín, 28<br />Barrio de las Letras<br />28014 Madrid</p>
          </article>
        </div>
      </div>
      <section className="map" aria-label="Mapa de la ubicación de Amelia Studio en Madrid">
        <div className="map__street map__street--one" />
        <div className="map__street map__street--two" />
        <div className="map__street map__street--three" />
        <div className="map__river" />
        <div className="map__label map__label--one">Paseo del Prado</div>
        <div className="map__label map__label--two">C. de Atocha</div>
        <div className="map__pin"><span>A</span></div>
        <p>AMELIA STUDIO<br /><small>MADRID · 40.4125° N</small></p>
      </section>
    </main>
  )
}

function InstagramIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" className="fill" /></svg>
}

function TikTokIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4v10.5a4.5 4.5 0 1 1-3.5-4.38" /><path d="M14 4c.7 2.7 2.2 4.2 5 4.5" /></svg>
}

function BehanceIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h6.2a4 4 0 0 1 0 8H4zM4 13h6.8a3 3 0 0 1 0 6H4zM15 6h5M14.5 14h6a4 4 0 1 0-1 3.2" /></svg>
}

function ContactPage() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const body = new URLSearchParams()
    formData.forEach((value, key) => body.append(key, String(value)))

    setFormStatus('submitting')

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })

      if (!response.ok) throw new Error(`Netlify form submission failed: ${response.status}`)

      form.reset()
      setFormStatus('success')
    } catch {
      setFormStatus('error')
    }
  }

  return (
    <main className="page-main contact-page section-shell">
      <header className="page-title page-title--center">
        <p className="eyebrow">Cuéntanos tu idea</p>
        <h1>Creemos algo<br /><em>juntas.</em></h1>
        <p className="contact-intro">Cada gran proyecto empieza con un hola.</p>
      </header>
      <form
        className="contact-form"
        name="contact"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        onSubmit={submit}
      >
        <input type="hidden" name="form-name" value="contact" />
        <div className="netlify-honeypot" aria-hidden="true">
          <label>
            No completar este campo
            <input name="bot-field" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <div className="form-row">
          <label>
            <span>Nombre</span>
            <input name="name" type="text" required placeholder="Tu nombre" />
          </label>
          <label>
            <span>Correo electrónico</span>
            <input name="email" type="email" required placeholder="tu@correo.com" />
          </label>
        </div>
        <label>
          <span>Asunto</span>
          <input name="subject" type="text" required placeholder="¿En qué podemos ayudarte?" />
        </label>
        <label>
          <span>Mensaje</span>
          <textarea name="message" required rows={5} placeholder="Háblanos de tu proyecto..." />
        </label>
        <button type="submit" disabled={formStatus === 'submitting'}>
          {formStatus === 'submitting' ? 'ENVIANDO' : formStatus === 'success' ? 'ENVIADO' : 'ENVIAR'} <span>↗</span>
        </button>
        {formStatus === 'success' && (
          <p className="form-success" role="status">Gracias por escribirnos. Te responderemos muy pronto.</p>
        )}
        {formStatus === 'error' && (
          <p className="form-error" role="alert">No pudimos enviar tu mensaje. Inténtalo de nuevo.</p>
        )}
      </form>
      <div className="socials">
        <p className="eyebrow">Redes sociales</p>
        <div>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramIcon /></a>
          <a href="https://tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok"><TikTokIcon /></a>
          <a href="https://behance.net" target="_blank" rel="noreferrer" aria-label="Behance"><BehanceIcon /></a>
        </div>
      </div>
    </main>
  )
}

function App() {
  const [page, setPage] = useState<Page>(getPage)

  useEffect(() => {
    const handleRoute = () => {
      setPage(getPage())
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    window.addEventListener('hashchange', handleRoute)
    if (!window.location.hash) navigate('home')
    return () => window.removeEventListener('hashchange', handleRoute)
  }, [])

  const PageComponent = {
    home: HomePage,
    work: WorkPage,
    project: ProjectPage,
    services: ServicesPage,
    studio: StudioPage,
    contact: ContactPage,
  }[page]

  return (
    <div className="app">
      <Header current={page} />
      <div key={page} className="page-transition">
        <PageComponent />
      </div>
      <Footer />
    </div>
  )
}

export default App
