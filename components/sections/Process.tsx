import { Container, SectionHeading } from "@/components/ui";
import { STEPS } from "@/lib/content";

export function Process() {
  return (
    <section id="process" className="relative bg-lab-navy py-24 sm:py-32">
      <Container>
        <SectionHeading path="process" lines={["From idea to", "production."]} />

        <ol className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-lab-accent/40 to-transparent lg:block"
          />
          {STEPS.map(({ n, title, text, output }, i) => (
            <li key={n} data-reveal style={{ ["--d" as string]: `${i * 90}ms` }} className="relative">
              <div className="relative z-10 flex size-12 items-center justify-center rounded-full border border-lab-accent/40 bg-lab-navy font-mono text-sm font-bold text-lab-accent">
                {n}
              </div>
              <h3 className="mt-5 text-lg font-bold uppercase tracking-wide text-lab-ice">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-lab-ice/55">{text}</p>
              <p className="mt-3 font-mono text-xs text-lab-accent/70">$ {output}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
