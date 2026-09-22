import { Container, SectionHeading } from "@/components/ui";
import { PRINCIPLES, PIPELINE } from "@/lib/content";

export function Culture() {
  return (
    <section id="about" className="relative bg-lab-navy py-24 sm:py-32">
      <Container>
        <SectionHeading path="about" lines={["Built by developers.", "For developers."]} />

        <ul className="mt-14 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
          {PRINCIPLES.map(({ icon: Icon, name, text }, i) => (
            <li key={name} data-reveal style={{ ["--d" as string]: `${(i % 3) * 80}ms` }} className="flex gap-4">
              <Icon aria-hidden className="mt-0.5 size-5 shrink-0 text-lab-accent" />
              <div>
                <p className="font-semibold text-lab-ice">{name}</p>
                <p className="mt-1 text-sm leading-relaxed text-lab-ice/55">{text}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-20 border-t border-lab-accent/15 pt-14">
          <p className="mb-8 font-mono text-xs text-lab-ice/40">~/pipeline</p>
          <ol className="grid gap-0 sm:grid-cols-3 lg:grid-cols-6">
            {PIPELINE.map(({ stage, note }, i) => (
              <li
                key={stage}
                data-reveal
                style={{ ["--d" as string]: `${i * 70}ms` }}
                className="group relative border-t-2 border-lab-accent/20 py-6 pr-4 transition-colors duration-300 hover:border-lab-accent sm:border-l-2 sm:border-t-0 sm:pl-5 sm:pt-0"
              >
                <span className="font-mono text-[11px] text-lab-ice/35">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-2 text-sm font-bold uppercase tracking-wide text-lab-ice">{stage}</p>
                <p className="mt-1 text-xs leading-relaxed text-lab-ice/45">{note}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
