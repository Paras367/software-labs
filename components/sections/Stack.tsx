import { Container, SectionHeading } from "@/components/ui";
import { STACK } from "@/lib/content";

// Define the order of categories for consistent rendering
const CATEGORIES = ["Frontend", "Backend", "DevOps", "AI"] as const;

export function Stack() {
  return (
    <section id="developers" className="relative bg-lab-navy py-24 sm:py-32 overflow-hidden">
      {/* Subtle technical grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      <Container className="relative z-10">
        <SectionHeading 
          path="stack" 
          lines={["Our tech is", "our toolbox."]} 
          className="mb-16"
        >
          We use battle-tested, modern technologies to build fast, scalable, and secure products.
        </SectionHeading>

        <div className="grid gap-12 lg:grid-cols-2">
          {CATEGORIES.map((category, catIndex) => {
            const techs = STACK.filter((tech) => tech.category === category);
            if (techs.length === 0) return null;

            return (
              <div 
                key={category} 
                data-reveal 
                style={{ ["--d" as string]: `${catIndex * 100}ms` }}
                className="relative"
              >
                {/* Category Header with Lines */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-gradient-to-r from-lab-accent/30 to-transparent" />
                  <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-lab-accent">
                    {category}
                  </h3>
                  <div className="h-px flex-1 bg-gradient-to-l from-lab-accent/30 to-transparent" />
                </div>

                {/* Tech Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {techs.map((tech, i) => (
                    <div
                      key={tech.name}
                      className="group relative flex items-center gap-3 rounded-lg border border-lab-accent/10 bg-lab-blue/10 p-3 backdrop-blur-sm transition-all duration-300 hover:border-lab-accent/30 hover:bg-lab-blue/20 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-lab-accent/5"
                      style={{ transitionDelay: `${i * 30}ms` }}
                    >
                      {/* Icon Box */}
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-md border border-lab-accent/20 bg-lab-navy text-lab-accent transition-all duration-300 group-hover:border-lab-accent group-hover:bg-lab-accent group-hover:text-lab-navy group-hover:scale-110">
                        <tech.icon className="size-4" />
                      </div>
                      
                      {/* Text Info */}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-lab-ice transition-colors duration-300 group-hover:text-white">
                          {tech.name}
                        </p>
                        <p className="font-mono text-[10px] uppercase tracking-wider text-lab-ice/40 transition-colors duration-300 group-hover:text-lab-ice/70">
                          {tech.kind}
                        </p>
                      </div>

                      {/* Subtle Hover Glow */}
                      <div className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none shadow-[inset_0_0_20px_-5px_rgba(99,102,241,0.15)]" />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}