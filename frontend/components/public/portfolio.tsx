import { ArrowUpRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { GalleryDialog } from "./gallery-dialog";
import { MobileMenu } from "./mobile-menu";
import { Spotlight } from "../visual/spotlight";
import type { Portfolio, Project } from "@/lib/types";

const links = [
  ["About", "#about"],
  ["Work", "#work"],
  ["Experience", "#experience"],
  ["Contact", "#contact"],
] as const;

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)]">
      {project.coverImageUrl ? (
        <img src={project.coverImageUrl} alt={project.coverImageAlt ?? project.title} className="aspect-[16/9] w-full object-cover transition duration-300 group-hover:scale-[1.02]" />
      ) : (
        <div className="flex aspect-[16/9] items-end bg-[linear-gradient(135deg,var(--surface-elevated),var(--background))] p-5 text-sm text-[var(--text-secondary)]">No cover image</div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--mint)]">{project.slug}</p>
        <h3 className="mt-3 font-display text-2xl font-bold">{project.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-7 text-[var(--text-secondary)]">{project.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.techStack.map((tech) => <span key={tech} className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--text-secondary)]">{tech}</span>)}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {project.projectUrl ? <a className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[var(--mint)] px-4 py-2 text-sm font-bold text-[var(--background)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--mint)]" href={project.projectUrl} target="_blank" rel="noreferrer">Live demo <ArrowUpRight size={16} /></a> : null}
          {project.sourceUrl ? <a className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-semibold hover:border-[var(--mint)] focus-visible:outline-2 focus-visible:outline-[var(--mint)]" href={project.sourceUrl} target="_blank" rel="noreferrer">Source code <Github size={16} /></a> : null}
          <GalleryDialog gallery={project.gallery} />
        </div>
      </div>
    </article>
  );
}

export function PublicPortfolio({ data }: { data: Portfolio | null }) {
  if (!data) {
    return <main className="mx-auto flex min-h-screen max-w-5xl items-center px-6"><div><p className="eyebrow">Portfolio</p><h1 className="font-display text-5xl font-bold">Portfolio unavailable</h1><p className="mt-4 text-[var(--text-secondary)]">The portfolio API is not available yet. Start the backend and refresh.</p></div></main>;
  }

  const { profile } = data;
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <header className="sticky top-0 z-30 border-b border-[var(--border)]/70 bg-[var(--background)]/90 backdrop-blur">
        <div className="relative mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#top" className="font-display text-lg font-bold tracking-tight">{profile.name || "Portfolio"}<span className="text-[var(--mint)]">.</span></a>
          <nav aria-label="Primary navigation" className="hidden items-center gap-6 md:flex">
            {links.map(([label, href]) => <a key={href} href={href} className="text-sm text-[var(--text-secondary)] hover:text-[var(--foreground)]">{label}</a>)}
          </nav>
          <MobileMenu />
        </div>
      </header>

      <main id="main-content">
        <section id="top" className="relative mx-auto grid max-w-6xl gap-10 overflow-hidden px-5 pb-24 pt-20 sm:px-8 md:grid-cols-[1.2fr_0.8fr] md:items-center md:pt-28">
          <Spotlight />
          <div className="relative z-10">
            {profile.availableForOpportunities ? <p className="eyebrow"><span className="mr-2 inline-block h-2 w-2 rounded-full bg-[var(--mint)]" />Available for opportunities</p> : null}
            <p className="mt-5 text-sm uppercase tracking-[0.2em] text-[var(--text-secondary)]">Developer / Software Engineer</p>
            <h1 className="mt-4 max-w-4xl font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-7xl">{profile.headline}</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">{profile.bio}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#work" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[var(--mint)] px-5 py-3 text-sm font-bold text-[var(--background)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--mint)]">Explore my work <ArrowUpRight size={16} /></a>
              {profile.email ? <a href={`mailto:${profile.email}`} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[var(--border)] px-5 py-3 text-sm font-semibold hover:border-[var(--mint)] focus-visible:outline-2 focus-visible:outline-[var(--mint)]">Contact me <Mail size={16} /></a> : null}
            </div>
          </div>
          <div className="relative z-10 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5">
            {profile.avatarUrl ? <img src={profile.avatarUrl} alt={profile.avatarAlt ?? profile.name} className="aspect-square w-full rounded-2xl object-cover" /> : <div className="grid aspect-square place-items-center rounded-2xl bg-[linear-gradient(135deg,var(--surface-elevated),var(--background))] text-7xl font-bold text-[var(--mint)]">{profile.name.slice(0, 1).toUpperCase()}</div>}
            <div className="mt-5 flex items-center justify-between gap-4 text-sm"><span className="text-[var(--text-secondary)]">Based in</span><strong>{profile.location ?? "Remote"}</strong></div>
          </div>
        </section>

        <section id="about" className="section-shell"><div className="section-heading"><p className="eyebrow">01 / About</p><h2>Systems with a human edge.</h2></div><div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr]"><p className="text-lg leading-8 text-[var(--text-secondary)]">{profile.bio}</p><div><p className="eyebrow">Core toolkit</p><div className="mt-4 flex flex-wrap gap-3">{data.skills.map((skill) => <span key={skill.id} className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm">{skill.name}<span className="ml-2 text-xs text-[var(--text-secondary)]">{skill.category}</span></span>)}</div></div></div></section>

        <section id="work" className="section-shell"><div className="section-heading"><p className="eyebrow">02 / Selected work</p><h2>Things I shipped.</h2></div>{data.projects.length ? <div className="grid gap-6 lg:grid-cols-2">{data.projects.map((project) => <ProjectCard key={project.id} project={project} />)}</div> : <p className="rounded-2xl border border-dashed border-[var(--border)] p-8 text-[var(--text-secondary)]">Selected work will be available soon.</p>}</section>

        <section id="experience" className="section-shell"><div className="section-heading"><p className="eyebrow">03 / Experience</p><h2>Where I learned the craft.</h2></div><div className="space-y-4">{data.experiences.map((experience) => <article key={experience.id} className="grid gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:grid-cols-[0.35fr_1fr]"><p className="text-sm text-[var(--mint)]">{experience.startDate} — {experience.endDate ?? "Present"}</p><div><h3 className="font-display text-2xl font-bold">{experience.title}</h3><p className="mt-1 text-[var(--text-secondary)]">{experience.organization}{experience.type ? ` · ${experience.type}` : ""}</p>{experience.summary ? <p className="mt-4 leading-7 text-[var(--text-secondary)]">{experience.summary}</p> : null}{experience.highlights.length ? <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[var(--text-secondary)]">{experience.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul> : null}</div></article>)}</div></section>

        <section id="contact" className="section-shell pb-28"><div className="rounded-3xl border border-[var(--mint)]/40 bg-[var(--surface)] p-7 sm:p-10"><p className="eyebrow">04 / Contact</p><h2 className="mt-4 max-w-2xl font-display text-4xl font-bold">Have a problem worth solving?</h2><p className="mt-4 max-w-2xl leading-7 text-[var(--text-secondary)]">I&apos;m open to thoughtful product work, technical conversations, and collaborations.</p><div className="mt-7 flex flex-wrap gap-3">{profile.email ? <a href={`mailto:${profile.email}`} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[var(--mint)] px-5 py-3 text-sm font-bold text-[var(--background)]"><Mail size={16} />{profile.email}</a> : null}{profile.githubUrl ? <a href={profile.githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[var(--border)] px-4 py-3 text-sm"><Github size={16} />GitHub</a> : null}{profile.linkedinUrl ? <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[var(--border)] px-4 py-3 text-sm"><Linkedin size={16} />LinkedIn</a> : null}{profile.resumeUrl ? <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[var(--border)] px-4 py-3 text-sm"><Download size={16} />Download CV</a> : null}</div></div></section>
      </main>
      <footer className="border-t border-[var(--border)] px-5 py-8 sm:px-8"><div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 text-sm text-[var(--text-secondary)]"><span>{profile.name} · {new Date().getFullYear()}</span><a href="#top" className="hover:text-[var(--foreground)]">Back to top ↑</a></div></footer>
    </>
  );
}
