"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container, SectionHeading, ButtonLink } from "@/components/ui";
import { SITE } from "@/lib/site";
import { PRINCIPLES } from "@/lib/content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { 
  faRocket, 
  faCode, 
  faEnvelope,
  faCheckCircle
} from "@fortawesome/free-solid-svg-icons";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      
      <main className="relative bg-lab-navy overflow-hidden">
        {/* Subtle Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-lab-accent/5 blur-[120px] pointer-events-none" />

        <Container className="relative z-10 py-24 sm:py-32">
          
          {/* 1. Crisp Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-24">
            <p className="font-mono text-xs uppercase tracking-widest text-lab-accent mb-4">~/about</p>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-lab-ice mb-6 uppercase leading-[0.95] tracking-tight">
              The Engineering Partner Behind <span className="text-gradient-accent">Growing Businesses</span>
            </h1>
            <p className="text-lg sm:text-xl text-lab-ice/70 leading-relaxed mb-8">
              SoftwareLabs builds, ships, and supports the systems companies run on. We give founders and teams production-grade software without the overhead of building an in-house engineering org from scratch.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lab-blue/30 border border-lab-accent/20 text-lab-ice/80 text-sm font-mono">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              Headquartered in Chandigarh, India — Serving businesses worldwide
            </div>
          </div>

          {/* 2. The Mission (Compact & Direct) */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-32">
            <div data-reveal>
              <SectionHeading 
                path="mission" 
                lines={["Why We", "Exist"]} 
                className="mb-6"
              />
              <p className="text-lab-ice/70 leading-relaxed mb-6 text-lg">
                Great software shouldn't require a massive team or endless delays. We exist to bridge the gap between a great idea and a shipped product.
              </p>
              <ul className="space-y-4">
                {[
                  "Launch platforms 10x faster than traditional builds",
                  "Get a dedicated engineering team, not a ticket queue",
                  "Scale on architecture built for growth from day one"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-lab-ice/80" data-reveal style={{ ["--d" as string]: `${i * 100}ms` }}>
                    <FontAwesomeIcon icon={faCheckCircle} className="text-lab-accent mt-1 size-5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Compact Metrics Card */}
            <div 
              data-reveal 
              style={{ ["--d" as string]: "200ms" }}
              className="relative p-8 rounded-2xl border border-lab-accent/20 bg-lab-blue/10 backdrop-blur-sm"
            >
              <div className="absolute -top-4 -right-4 size-20 bg-lab-accent/10 rounded-full blur-2xl" />
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-4xl font-extrabold text-lab-ice mb-1">10+</div>
                  <div className="text-sm text-lab-ice/50 font-medium">Platforms Shipped</div>
                </div>
                <div>
                  <div className="text-4xl font-extrabold text-lab-ice mb-1">100%</div>
                  <div className="text-sm text-lab-ice/50 font-medium">Client Retention</div>
                </div>
                <div>
                  <div className="text-4xl font-extrabold text-lab-ice mb-1">5+</div>
                  <div className="text-sm text-lab-ice/50 font-medium">Years of Rigor</div>
                </div>
                <div>
                  <div className="text-4xl font-extrabold text-lab-ice mb-1">24/7</div>
                  <div className="text-sm text-lab-ice/50 font-medium">System Reliability</div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Leadership (Clean & Professional) */}
          <div className="mb-32">
            <SectionHeading path="leadership" lines={["Meet the", "Founder"]} className="mb-12" />
            <div className="max-w-4xl mx-auto grid md:grid-cols-[1fr_1.5fr] gap-8 items-center p-8 rounded-2xl border border-lab-accent/15 bg-lab-blue/10 backdrop-blur-sm">
              {/* Avatar Placeholder */}
              <div className="relative aspect-square rounded-xl overflow-hidden border border-lab-accent/20 bg-lab-navy flex items-center justify-center">
                <FontAwesomeIcon icon={faCode} className="size-16 text-lab-accent/30" />
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-lab-navy to-transparent">
                  <span className="font-mono text-xs text-lab-accent">Founder & CEO</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-lab-ice mb-2">{SITE.authorName}</h3>
                <p className="text-lab-accent font-medium mb-4">{SITE.authorHandle}</p>
                <p className="text-lab-ice/70 leading-relaxed mb-6">
                  Paras founded SoftwareLabs to give growing businesses the same engineering rigor, speed, and reliability that large tech companies take for granted. He leads product strategy, system architecture, and customer partnerships end-to-end, ensuring every line of code drives real business value.
                </p>
                <div className="flex gap-3">
                  <a href={SITE.socials.github} target="_blank" rel="noopener noreferrer" className="flex size-10 items-center justify-center rounded-lg border border-lab-accent/20 bg-lab-navy text-lab-ice/70 hover:text-lab-accent hover:border-lab-accent hover:bg-lab-accent/10 transition-all">
                    <FontAwesomeIcon icon={faGithub} className="size-4" />
                  </a>
                  <a href={SITE.socials.linkedin} target="_blank" rel="noopener noreferrer" className="flex size-10 items-center justify-center rounded-lg border border-lab-accent/20 bg-lab-navy text-lab-ice/70 hover:text-lab-accent hover:border-lab-accent hover:bg-lab-accent/10 transition-all">
                    <FontAwesomeIcon icon={faLinkedin} className="size-4" />
                  </a>
                  <a href={SITE.socials.twitter} target="_blank" rel="noopener noreferrer" className="flex size-10 items-center justify-center rounded-lg border border-lab-accent/20 bg-lab-navy text-lab-ice/70 hover:text-lab-accent hover:border-lab-accent hover:bg-lab-accent/10 transition-all">
                    <FontAwesomeIcon icon={faXTwitter} className="size-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Core Values (Tight Grid) */}
          <div className="mb-32">
            <SectionHeading path="values" lines={["Our Engineering", "Manifesto"]} className="mb-12" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PRINCIPLES.slice(0, 6).map((principle, i) => {
                const IconComponent = principle.icon;
                return (
                  <div 
                    key={principle.name} 
                    data-reveal 
                    style={{ ["--d" as string]: `${i * 75}ms` }}
                    className="group p-6 rounded-xl border border-lab-accent/10 bg-lab-blue/10 hover:border-lab-accent/30 hover:bg-lab-blue/20 transition-all duration-300"
                  >
                    <IconComponent className="w-8 h-8 text-lab-accent mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <h4 className="font-bold text-lab-ice mb-2 group-hover:text-lab-accent transition-colors">{principle.name}</h4>
                    <p className="text-sm text-lab-ice/60 leading-relaxed">{principle.text}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5. Crisp CTA */}
          <div className="relative p-10 sm:p-16 rounded-2xl bg-gradient-to-br from-lab-blue/30 via-lab-navy to-lab-blue/30 border border-lab-accent/20 overflow-hidden text-center">
            <div className="absolute inset-0 bg-lab-accent/5 blur-[100px] pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-lab-ice mb-4">
                Ready to Build Your <span className="text-lab-accent">Business Platform</span>?
              </h2>
              <p className="text-lab-ice/70 mb-8 leading-relaxed">
                Talk to our team about your product, timeline, and budget. Let's ship it together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ButtonLink href="#contact" className="min-w-[180px]">
                  Talk to Our Team
                </ButtonLink>
                <ButtonLink href="#products" variant="secondary" className="min-w-[180px]">
                  Explore Products
                </ButtonLink>
              </div>
            </div>
          </div>

        </Container>
      </main>

      <Footer />
    </>
  );
}