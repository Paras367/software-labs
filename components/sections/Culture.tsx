import { Container, SectionHeading } from "@/components/ui";
import { PRINCIPLES, PIPELINE } from "@/lib/content";

export function Culture() {
  return (
    <section id="about" className="relative bg-lab-navy py-20 sm:py-32 overflow-hidden">
      {/* Subtle technical grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      <Container className="relative z-10">
        <SectionHeading 
          path="about" 
          lines={["Built by developers.", "For developers."]} 
          className="mb-12 sm:mb-16"
        >
          We don't just write code. We enforce standards that guarantee quality, security, and scale.
        </SectionHeading>

        {/* Principles Grid */}
        <ul className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-20 sm:mb-24">
          {PRINCIPLES.map(({ icon: Icon, name, text, category, impact }, i) => (
            <li 
              key={name} 
              data-reveal 
              style={{ ["--d" as string]: `${i * 80}ms` }} 
              className="group relative flex flex-col rounded-xl border border-lab-accent/10 bg-lab-blue/10 p-5 sm:p-6 backdrop-blur-sm transition-all duration-300 hover:border-lab-accent/30 hover:bg-lab-blue/20 hover:-translate-y-1 hover:shadow-xl hover:shadow-lab-accent/5"
            >
              {/* Header: Icon & Category */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-lab-accent/20 bg-lab-navy text-lab-accent transition-all duration-300 group-hover:border-lab-accent group-hover:bg-lab-accent group-hover:text-lab-navy group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-lab-accent/20">
                  <Icon className="size-5" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-lab-ice/30 group-hover:text-lab-accent/60 transition-colors">
                  {category}
                </span>
              </div>
              
              {/* Content */}
              <h3 className="text-base sm:text-lg font-bold text-lab-ice mb-2 group-hover:text-lab-accent transition-colors">
                {name}
              </h3>
              <p className="text-sm leading-relaxed text-lab-ice/60 flex-1">
                {text}
              </p>
              
              {/* Impact Metric Footer */}
              <div className="mt-5 sm:mt-6 pt-4 border-t border-lab-accent/10">
                <span className="inline-flex items-center gap-2 text-xs font-bold text-lab-accent">
                  <span className="size-1.5 rounded-full bg-lab-accent animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                  {impact}
                </span>
              </div>
            </li>
          ))}
        </ul>

        {/* Pipeline Section */}
        <div className="relative">
          {/* Section Divider */}
          <div className="flex items-center gap-4 mb-8 sm:mb-12">
            <div className="h-px flex-1 bg-gradient-to-r from-lab-accent/30 to-transparent" />
            <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-lab-accent whitespace-nowrap">
              ~/pipeline
            </h3>
            <div className="h-px flex-1 bg-gradient-to-l from-lab-accent/30 to-transparent" />
          </div>

          {/* Mobile: Vertical Timeline | Desktop: Horizontal Stepper */}
          <div className="relative">
            {/* Desktop Connecting Line */}
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lab-accent/40 to-transparent" />
            
            <ol className="relative space-y-8 lg:space-y-0 lg:grid lg:grid-cols-6 lg:gap-4">
              {PIPELINE.map(({ stage, note, icon: Icon, duration }, i) => (
                <li
                  key={stage}
                  data-reveal
                  style={{ ["--d" as string]: `${i * 100}ms` }}
                  className="relative pl-10 lg:pl-0 group"
                >
                  {/* Mobile Vertical Connecting Line */}
                  {i !== PIPELINE.length - 1 && (
                    <div className="absolute left-3.5 top-7 bottom-[-32px] w-px bg-lab-accent/20 lg:hidden" />
                  )}

                  {/* Step Node */}
                  <div className="absolute left-0 top-0 flex size-7 items-center justify-center rounded-full border-2 border-lab-accent bg-lab-navy text-lab-accent transition-all duration-300 group-hover:border-lab-accent group-hover:bg-lab-accent group-hover:text-lab-navy group-hover:shadow-[0_0_15px_-3px_rgba(99,102,241,0.6)] lg:static lg:mx-auto lg:mb-4 lg:size-16">
                    <Icon className="size-3.5 lg:size-6" />
                    {/* Step Number Badge */}
                    <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-lab-accent text-[9px] font-bold text-lab-navy shadow-sm border border-lab-navy lg:size-5 lg:text-[10px]">
                      {i + 1}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <div className="lg:text-center">
                    {/* Duration Badge */}
                    <span className="mb-2 inline-block rounded-full bg-lab-blue/30 px-2.5 py-0.5 font-mono text-[10px] font-medium text-lab-accent border border-lab-accent/20 group-hover:bg-lab-accent/10 transition-colors lg:mb-3">
                      {duration}
                    </span>
                    
                    <h4 className="text-sm font-bold uppercase tracking-wide text-lab-ice mb-1 group-hover:text-lab-accent transition-colors lg:mb-1.5">
                      {stage}
                    </h4>
                    <p className="text-xs leading-relaxed text-lab-ice/50 lg:max-w-[160px] lg:mx-auto">
                      {note}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}