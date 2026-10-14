import { Container, ButtonLink, Cursor } from "@/components/ui";

export function CTA() {
  return (
    <section id="contact" className="relative overflow-hidden bg-lab-navy py-24 sm:py-32">
      {/* 1. Layered Ambient Background */}
      <div aria-hidden className="glow-field absolute inset-0 opacity-60" />
      <div aria-hidden className="absolute inset-0 bg-grid-dark opacity-20" />
      
      {/* Subtle Vignette to draw focus to the center */}
      <div 
        aria-hidden 
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--lab-navy)_90%)] pointer-events-none" 
      />

      <Container className="relative z-10 text-center">
        {/* 2. Premium Typography with Gradient Accent */}
        <h2
          data-reveal
          className="mx-auto max-w-4xl text-[clamp(2.2rem,6vw,4rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-lab-ice"
        >
          Ready to build something{" "}
          <span className="text-gradient-accent">amazing</span>?
        </h2>
        
        <p 
          data-reveal 
          style={{ ["--d" as string]: "100ms" }} 
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-lab-ice/60 sm:text-lg"
        >
          Explore our production-ready source code, start your next project, or partner with SoftwareLabs to engineer the future.
        </p>

        {/* 3. Elevated Button Group */}
        <div
          data-reveal
          style={{ ["--d" as string]: "200ms" }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <ButtonLink href="#products" className="min-w-[180px]">
            Explore Products
          </ButtonLink>
          
          <div className="hidden sm:block h-8 w-px bg-lab-accent/30" />
          
          <ButtonLink 
            href="mailto:softwarelabschd@gmail.com" 
            variant="secondary" 
            className="min-w-[180px]"
          >
            Start a Project
          </ButtonLink>
        </div>

        {/* 4. Glowing Terminal Prompt */}
        <div
          data-reveal
          style={{ ["--d" as string]: "300ms" }}
          className="mt-16 inline-flex items-center gap-3 rounded-lg border border-lab-accent/20 bg-lab-blue/10 px-5 py-3 font-mono text-sm text-lab-ice/70 backdrop-blur-sm shadow-[0_0_30px_-10px_rgba(91,155,213,0.15)] hover:border-lab-accent/40 hover:bg-lab-blue/20 transition-all duration-300 group"
        >
          <span className="text-lab-accent font-bold">➜</span>
          <span className="text-blue-400">~/softwarelabs</span>
          <span className="text-lab-ice/90">npm run ship --production</span>
          <Cursor className="ml-1" />
          
          {/* Subtle hover glow effect on the terminal block */}
          <div className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none shadow-[inset_0_0_20px_-5px_rgba(91,155,213,0.2)]" />
        </div>
      </Container>
    </section>
  );
}