import { ArrowRight, GitFork } from "lucide-react";
import { Container, ButtonLink } from "@/components/ui";
import { HeroBackground } from "@/components/HeroBackground";
import { TerminalPanel } from "@/components/TerminalPanel";
import { SITE } from "@/lib/site";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pb-24 pt-32 sm:pb-32 sm:pt-40">
      {/* Ambient Background */}
      <HeroBackground />
      
      {/* Bottom Fade for Seamless Section Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-lab-navy to-transparent pointer-events-none" />

      <Container className="relative grid items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        {/* Left Column: Content */}
        <div className="relative z-10">
          {/* Premium HUD-Style Badge */}
          <span 
            className="inline-flex items-center gap-2.5 rounded-full border border-lab-accent/40 bg-lab-blue/30 px-4 py-1.5 font-mono text-[11px] font-medium uppercase tracking-widest text-lab-accent shadow-[0_0_20px_-5px_rgba(99,102,241,0.3)] backdrop-blur-md animate-[fadeInDown_0.8s_ease-out_forwards]"
            style={{ opacity: 0, animationDelay: "0.1s" }}
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lab-accent opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-lab-accent" />
            </span>
            SOFTWARELABS // ENGINEERING LAB
          </span>

          {/* Cinematic Staggered Heading */}
          <h1 className="mt-8 text-[clamp(2.6rem,6.4vw,4.75rem)] font-extrabold uppercase leading-[0.94] tracking-display text-lab-ice">
            <span className="block animate-[fadeInUp_0.8s_ease-out_forwards]" style={{ opacity: 0, animationDelay: "0.2s" }}>
              We build
            </span>
            <span className="block animate-[fadeInUp_0.8s_ease-out_forwards]" style={{ opacity: 0, animationDelay: "0.35s" }}>
              software that
            </span>
            <span className="relative mt-1 inline-block animate-[fadeInUp_0.8s_ease-out_forwards]" style={{ opacity: 0, animationDelay: "0.5s" }}>
              {/* Holographic Glow Effect behind accent text */}
              <span className="absolute inset-0 blur-2xl bg-lab-accent/30" aria-hidden />
              <span className="relative text-lab-accent">does the work.</span>
            </span>
          </h1>

          {/* Subtext with Terminal Aesthetic */}
          <div className="mt-8 animate-[fadeInUp_0.8s_ease-out_forwards]" style={{ opacity: 0, animationDelay: "0.65s" }}>
            <p className="max-w-lg text-lg leading-relaxed text-lab-ice/80">
              Developer-built software, digital products and code engineered for the real world.
            </p>
            <p className="mt-3 font-mono text-sm text-lab-ice/40 flex items-center gap-2">
              <span className="text-lab-accent">➜</span> From source code to production.
            </p>
          </div>

          {/* Action Buttons */}
          <div 
            className="mt-10 flex flex-wrap items-center gap-4 animate-[fadeInUp_0.8s_ease-out_forwards]" 
            style={{ opacity: 0, animationDelay: "0.8s" }}
          >
            <ButtonLink href="#products">Explore Products</ButtonLink>
            <ButtonLink href="#contact" variant="secondary">
              Build With Us
            </ButtonLink>
          </div>

          {/* Enhanced Interactive GitHub Link */}
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-10 inline-flex items-center gap-2 rounded-full border border-transparent px-3 py-2 font-mono text-sm text-lab-ice/50 transition-all duration-300 hover:border-lab-accent/30 hover:bg-lab-accent/5 hover:pl-4 hover:text-lab-accent animate-[fadeInUp_0.8s_ease-out_forwards]"
            style={{ opacity: 0, animationDelay: "0.95s" }}
          >
            <GitFork aria-hidden className="size-4 transition-transform duration-300 group-hover:-rotate-12" />
            <span>View GitHub</span>
            <ArrowRight 
              aria-hidden 
              className="size-3.5 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 opacity-70" 
            />
          </a>
        </div>

        {/* Right Column: Floating Terminal Display */}
        <div 
          className="relative mx-auto w-full max-w-md lg:max-w-none animate-[fadeIn_1.2s_ease-out_forwards]" 
          style={{ opacity: 0, animationDelay: "0.4s" }}
        >
          {/* Ambient Glow Backdrop for Terminal */}
          <div className="absolute -inset-4 bg-lab-accent/10 blur-[60px] rounded-full pointer-events-none" />
          <div className="absolute -inset-1 bg-gradient-to-b from-lab-accent/20 to-transparent rounded-xl pointer-events-none" />
          
          {/* Terminal Panel */}
          <div className="relative transform transition-transform duration-500 hover:scale-[1.01]">
            <TerminalPanel />
          </div>
        </div>
      </Container>

      {/* Inline Keyframes for Staggered Animations (No extra CSS file needed) */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </section>
  );
}