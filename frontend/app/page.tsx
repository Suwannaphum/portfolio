type Skill = {
  id: string;
  name: string;
  category: string | null;
};

type Experience = {
  id: string;
  title: string;
  organization: string;
  type: string | null;
  startDate: string;
  endDate: string | null;
  summary: string | null;
  highlights: string[];
};

type ProjectImage = {
  id: string;
  imageUrl: string;
  alt: string;
};

type Project = {
  id: string;
  title: string;
  slug: string;
  description: string;
  techStack: string[];
  coverImageUrl: string | null;
  coverImageAlt: string | null;
  projectUrl: string | null;
  sourceUrl: string | null;
  gallery: ProjectImage[];
};

type Portfolio = {
  name: string;
  headline: string;
  bio: string;
  location: string | null;
  email: string | null;
  avatarUrl: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  resumeUrl: string | null;
  skills: Skill[];
  experiences: Experience[];
  projects: Project[];
};

const apiUrl = process.env.BACKEND_URL ?? 'http://127.0.0.1:3000';

async function getPortfolio(): Promise<Portfolio> {
  const response = await fetch(apiUrl + '/portfolio', { cache: 'no-store' });

  if (!response.ok) {
    throw new Error('Portfolio API returned ' + response.status);
  }

  return response.json() as Promise<Portfolio>;
}

function formatDate(value: string | null) {
  if (!value) return 'Present';

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
}

export default async function Home() {
  const portfolio = await getPortfolio();

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-[var(--mint)] focus:px-4 focus:py-3 focus:text-[var(--background)]"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-20 border-b border-[var(--border)]/80 bg-[var(--background)]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
          <a href="#top" className="font-mono text-sm font-bold tracking-[0.2em] text-[var(--mint)]">
            {portfolio.name.toUpperCase()}
          </a>
          <nav aria-label="Primary navigation" className="flex max-w-[70%] gap-4 overflow-x-auto whitespace-nowrap text-xs text-[var(--text-secondary)] sm:gap-6 sm:text-sm">
            <a className="transition hover:text-[var(--mint)]" href="#about">About</a>
            <a className="transition hover:text-[var(--mint)]" href="#work">Work</a>
            <a className="transition hover:text-[var(--mint)]" href="#experience">Experience</a>
            <a className="transition hover:text-[var(--mint)]" href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <div id="top" className="mx-auto max-w-6xl px-6 lg:px-8">
        <section id="content" className="grid gap-6 py-20 lg:grid-cols-[1.6fr_0.8fr] lg:py-28">
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 sm:p-12">
            <p className="mb-6 font-mono text-xs tracking-[0.25em] text-[var(--mint)]">FULL STACK DEVELOPER</p>
            <h1 className="max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
              {portfolio.name}
            </h1>
            <p className="mt-6 max-w-2xl text-2xl leading-tight text-[var(--mint)] sm:text-3xl">
              {portfolio.headline}
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
              {portfolio.bio}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="rounded-xl bg-[var(--mint)] px-5 py-3 font-semibold text-[var(--background)] transition hover:brightness-110" href="#work">
                Explore my work
              </a>
              {portfolio.email && (
                <a className="rounded-xl border border-[var(--border)] px-5 py-3 font-semibold transition hover:border-[var(--mint)] hover:text-[var(--mint)]" href={'mailto:' + portfolio.email}>
                  Contact me
                </a>
              )}
            </div>
          </div>

          <aside className="flex flex-col justify-between rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8">
            <div>
              <p className="font-mono text-xs tracking-[0.25em] text-[var(--text-secondary)]">01 / PROFILE</p>
              <div className="mt-8 flex h-24 w-24 items-center justify-center rounded-2xl bg-[var(--mint)] text-4xl font-bold text-[var(--background)]">
                {portfolio.name.charAt(0)}
              </div>
            </div>
            <div className="mt-12 space-y-4 text-sm text-[var(--text-secondary)]">
              {portfolio.location && <p><span className="text-[var(--mint)]">Location</span><br />{portfolio.location}</p>}
              <p><span className="text-[var(--mint)]">Published projects</span><br />{portfolio.projects.length}</p>
              {portfolio.githubUrl && <a className="block transition hover:text-[var(--mint)]" href={portfolio.githubUrl} target="_blank" rel="noreferrer">GitHub ↗</a>}
              {portfolio.linkedinUrl && <a className="block transition hover:text-[var(--mint)]" href={portfolio.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn ↗</a>}
            </div>
          </aside>
        </section>

        <section id="about" className="grid scroll-mt-24 gap-6 py-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 sm:p-10">
            <p className="font-mono text-xs tracking-[0.25em] text-[var(--mint)]">02 / ABOUT</p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Build with purpose.</h2>
            <p className="mt-5 max-w-2xl leading-8 text-[var(--text-secondary)]">{portfolio.bio}</p>
          </div>
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 sm:p-10">
            <p className="font-mono text-xs tracking-[0.25em] text-[var(--mint)]">03 / STACK</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {portfolio.skills.map((skill) => (
                <span key={skill.id} className="rounded-full border border-[var(--border)] px-4 py-2 text-sm text-[var(--text-primary)]">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="scroll-mt-24 py-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs tracking-[0.25em] text-[var(--mint)]">04 / SELECTED WORK</p>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Things I&apos;ve built.</h2>
            </div>
            <span className="font-mono text-sm text-[var(--text-secondary)]">{portfolio.projects.length.toString().padStart(2, '0')} projects</span>
          </div>
          {portfolio.projects.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-[var(--border)] p-10 text-[var(--text-secondary)]">Selected work will be available soon.</div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {portfolio.projects.map((project) => (
                <article key={project.id} className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] transition hover:-translate-y-1 hover:border-[var(--mint)]">
                  {project.coverImageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className="aspect-[16/9] w-full object-cover" src={project.coverImageUrl} alt={project.coverImageAlt ?? project.title} loading="lazy" />
                  ) : (
                    <div className="flex aspect-[16/9] items-center justify-center bg-[var(--surface-elevated)] font-mono text-sm text-[var(--mint)]">{project.slug}</div>
                  )}
                  <div className="p-7">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-2xl font-bold">{project.title}</h3>
                      <span className="font-mono text-xs text-[var(--mint)]">PUBLISHED</span>
                    </div>
                    <p className="mt-4 leading-7 text-[var(--text-secondary)]">{project.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.techStack.map((tech) => <span key={tech} className="rounded-md bg-[var(--surface-elevated)] px-2.5 py-1 text-xs text-[var(--text-secondary)]">{tech}</span>)}
                    </div>
                    <div className="mt-7 flex flex-wrap gap-5 text-sm font-semibold">
                      {project.projectUrl && <a className="text-[var(--mint)] hover:underline" href={project.projectUrl} target="_blank" rel="noreferrer">Live demo ↗</a>}
                      {project.sourceUrl && <a className="text-[var(--text-primary)] hover:text-[var(--mint)]" href={project.sourceUrl} target="_blank" rel="noreferrer">Source code ↗</a>}
                      {project.gallery.length > 0 && <span className="text-[var(--text-secondary)]">{project.gallery.length} gallery image{project.gallery.length === 1 ? '' : 's'}</span>}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section id="experience" className="scroll-mt-24 py-20">
          <p className="font-mono text-xs tracking-[0.25em] text-[var(--mint)]">05 / EXPERIENCE</p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Where I&apos;ve learned.</h2>
          <div className="mt-8 space-y-4">
            {portfolio.experiences.map((experience) => (
              <article key={experience.id} className="grid gap-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-7 md:grid-cols-[0.35fr_1fr]">
                <p className="font-mono text-sm text-[var(--mint)]">{formatDate(experience.startDate)} — {formatDate(experience.endDate)}</p>
                <div>
                  <h3 className="text-xl font-bold">{experience.title}</h3>
                  <p className="mt-1 text-[var(--text-secondary)]">{experience.organization}{experience.type ? ' · ' + experience.type : ''}</p>
                  {experience.summary && <p className="mt-4 leading-7 text-[var(--text-secondary)]">{experience.summary}</p>}
                  {experience.highlights.length > 0 && <ul className="mt-4 list-inside list-disc space-y-1 text-sm text-[var(--text-secondary)]">{experience.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 py-20">
          <div className="rounded-3xl border border-[var(--mint)] bg-[var(--surface)] p-8 sm:p-12">
            <p className="font-mono text-xs tracking-[0.25em] text-[var(--mint)]">06 / CONTACT</p>
            <h2 className="mt-4 max-w-2xl text-4xl font-bold sm:text-5xl">Let&apos;s build something useful.</h2>
            <div className="mt-8 flex flex-wrap gap-5 text-sm font-semibold">
              {portfolio.email && <a className="rounded-xl bg-[var(--mint)] px-5 py-3 text-[var(--background)] hover:brightness-110" href={'mailto:' + portfolio.email}>Email me</a>}
              {portfolio.resumeUrl && <a className="rounded-xl border border-[var(--border)] px-5 py-3 hover:border-[var(--mint)] hover:text-[var(--mint)]" href={portfolio.resumeUrl} target="_blank" rel="noreferrer">Download CV</a>}
            </div>
          </div>
        </section>

        <footer className="flex flex-col gap-3 border-t border-[var(--border)] py-8 text-sm text-[var(--text-secondary)] sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {portfolio.name}</span>
          <a className="hover:text-[var(--mint)]" href="#top">Back to top ↑</a>
        </footer>
      </div>
    </main>
  );
}
