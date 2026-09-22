import { Container, SectionHeading } from "@/components/ui";
import { STACK } from "@/lib/content";

export function Stack() {
  return (
    <section id="developers" className="relative bg-lab-blue/10 py-24 sm:py-32">
      <Container>
        <SectionHeading path="stack" lines={["Our stack is", "a toolbox."]} />

        <ul className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-lab-accent/15 bg-lab-accent/15 sm:grid-cols-3 lg:grid-cols-4">
          {STACK.map(({ symbol, name, kind }, i) => (
            <li
              key={name}
              data-reveal
              style={{ ["--d" as string]: `${(i % 4) * 70}ms` }}
              className="group flex items-center gap-3.5 bg-lab-navy px-5 py-5 transition-colors duration-300 hover:bg-lab-blue/30"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-md border border-lab-accent/25 font-mono text-xs font-bold text-lab-accent transition-colors duration-300 group-hover:border-lab-accent">
                {symbol}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-lab-ice">{name}</p>
                <p className="font-mono text-[10px] uppercase tracking-wide text-lab-ice/35">{kind}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
