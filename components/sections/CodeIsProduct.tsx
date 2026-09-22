import { Container } from "@/components/ui";
import { CodeBlock } from "@/components/CodeBlock";

export function CodeIsProduct() {
  return (
    <section className="relative overflow-hidden bg-[#08182e] py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-dark opacity-40" />
      <Container className="relative grid gap-14 lg:grid-cols-2 lg:items-center">
        <div data-reveal>
          <h2 className="text-[clamp(2.3rem,6vw,4.25rem)] font-extrabold uppercase leading-[0.92] tracking-display text-lab-ice">
            Code
            <br />
            is
            <br />
            <span className="text-lab-accent">the product.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-lab-ice/60">
            We don&apos;t just build interfaces.
            <br />
            We engineer systems.
          </p>
        </div>
        <div data-reveal style={{ ["--d" as string]: "150ms" }}>
          <CodeBlock />
        </div>
      </Container>
    </section>
  );
}
