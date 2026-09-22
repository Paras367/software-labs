import { Container } from "@/components/ui";
import { STATS } from "@/lib/content";

export function Stats() {
  return (
    <section aria-label="Brand statement" className="relative border-y border-lab-accent/10 bg-lab-blue/15">
      <Container>
        <div className="grid grid-cols-2 divide-x divide-y divide-lab-accent/10 sm:grid-cols-4 sm:divide-y-0">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              data-reveal
              style={{ ["--d" as string]: `${i * 90}ms` }}
              className="px-5 py-9 text-center sm:px-3"
            >
              <p className="font-mono text-3xl font-bold text-lab-accent sm:text-4xl">{s.value}</p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-lab-ice/45">{s.label}</p>
            </div>
          ))}
        </div>
        <p className="pb-6 text-center font-mono text-[11px] text-lab-ice/30">a brand statement, not an audited metric</p>
      </Container>
    </section>
  );
}
