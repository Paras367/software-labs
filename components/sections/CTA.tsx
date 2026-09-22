import { Container, ButtonLink, Cursor } from "@/components/ui";

export function CTA() {
  return (
    <section id="contact" className="relative overflow-hidden bg-[#081b34] py-24 sm:py-32">
      <div aria-hidden className="glow-field absolute inset-0 opacity-70" />
      <div aria-hidden className="absolute inset-0 bg-grid-dark opacity-30" />
      <Container className="relative text-center">
        <h2
          data-reveal
          className="mx-auto max-w-3xl text-[clamp(2.1rem,5.6vw,3.75rem)] font-extrabold uppercase leading-[0.98] tracking-display text-lab-ice"
        >
          Ready to build something?
        </h2>
        <p data-reveal style={{ ["--d" as string]: "90ms" }} className="mx-auto mt-5 max-w-md text-lab-ice/65">
          Explore the code, start a project, or build with SoftwareLabs.
        </p>

        <div
          data-reveal
          style={{ ["--d" as string]: "160ms" }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <ButtonLink href="#products">Explore Products</ButtonLink>
          <ButtonLink href="mailto:hello@softwarelabs.dev" variant="secondary" arrow={false}>
            Start a Project
          </ButtonLink>
        </div>

        <p
          data-reveal
          style={{ ["--d" as string]: "230ms" }}
          className="mx-auto mt-12 inline-block rounded-md border border-lab-accent/25 bg-lab-navy/70 px-5 py-3 font-mono text-sm text-lab-ice/65"
        >
          softwarelabs@build:~$ ship --production
          <Cursor />
        </p>
      </Container>
    </section>
  );
}
