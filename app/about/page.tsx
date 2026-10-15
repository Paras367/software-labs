"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container, SectionHeading, ButtonLink } from "@/components/ui";
import { SITE } from "@/lib/site";
import { PRINCIPLES, STEPS } from "@/lib/content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faRocket, faCode, faEnvelope, faCheckCircle, faQuoteLeft, 
  faStar, faGlobe, faHandshake, faLightbulb, faArrowRight 
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin, faXTwitter } from "@fortawesome/free-brands-svg-icons";

// ============================================================================
// DATA CONSTANTS
// ============================================================================

const MILESTONES = [
  { year: "2024", title: "SoftwareLabs Founded", desc: "Paras Dhiman starts SoftwareLabs to help businesses ship reliable software without the friction of traditional hiring.", icon: faRocket },
  { year: "2024", title: "First Clients Onboarded", desc: "Early SaaS and e-commerce teams come on board, kicking off a track record of on-time, production-grade delivery.", icon: faHandshake },
  { year: "2025", title: "AI & Automation Added", desc: "The platform expands to include AI-assisted workflows, helping clients cut manual operations and move faster.", icon: faLightbulb },
  { year: "2026", title: "Scaling Nationwide & Beyond", desc: "SoftwareLabs crosses 10+ shipped platforms, serving businesses across India and international markets.", icon: faGlobe },
];

const TESTIMONIALS = [
  { quote: "SoftwareLabs delivered beyond expectations. The architecture and code quality set a new bar for our engineering team.", author: "Sarah Chen", role: "CTO", company: "TechVentures Inc." },
  { quote: "They moved fast without cutting corners. Onboarding, migration, and support all felt like working with an in-house team.", author: "Marcus Johnson", role: "Lead Developer", company: "StartupXYZ" },
  { quote: "Working with Paras and the team was a turning point. Their AI integration got us to market three times faster.", author: "Emily Rodriguez", role: "Product Manager", company: "InnovateLabs" },
];

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const }
  })
};

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function AboutPage() {
  return (
    <>
      <Navbar />
      
      <main className="relative bg-lab-navy overflow-hidden">
        {/* Subtle Background Grid & Glow */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-lab-accent/5 blur-[120px] pointer-events-none" />

        <Container className="relative z-10 py-24 sm:py-32">
          
          {/* 1. Crisp Hero Section - MAXIMUM CONTRAST */}
          <motion.div 
            initial="hidden" animate="visible" variants={container}
            className="text-center max-w-3xl mx-auto mb-24"
          >
            <motion.p variants={fadeInUp} custom={0} className="font-mono text-xs uppercase tracking-widest text-lab-accent mb-4 font-bold">~/about</motion.p>
            <motion.h1 variants={fadeInUp} custom={1} className="text-4xl sm:text-6xl font-extrabold text-white mb-6 uppercase leading-[0.95] tracking-tight drop-shadow-lg">
              The Engineering Partner Behind <span className="text-lab-accent">Growing Businesses</span>
            </motion.h1>
            <motion.p variants={fadeInUp} custom={2} className="text-lg sm:text-xl text-white mb-8 leading-relaxed font-medium">
              SoftwareLabs builds, ships, and supports the systems companies run on. We give founders production-grade software without the overhead of building an in-house engineering org from scratch.
            </motion.p>
            <motion.div variants={fadeInUp} custom={3} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lab-blue/50 border border-lab-accent/40 text-white text-sm font-mono font-semibold">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              Headquartered in Chandigarh, India — Serving businesses worldwide
            </motion.div>
          </motion.div>

          {/* 2. Mission & Metrics - MAXIMUM CONTRAST */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={container}
            className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-32"
          >
            <div>
              <SectionHeading path="mission" lines={["Why We", "Exist"]} className="mb-6" />
              <p className="text-white mb-6 text-lg leading-relaxed font-medium">
                Great software shouldn't require a massive team or endless delays. We exist to bridge the gap between a great idea and a shipped product.
              </p>
              <ul className="space-y-4">
                {[
                  "Launch platforms 10x faster than traditional builds",
                  "Get a dedicated engineering team, not a ticket queue",
                  "Scale on architecture built for growth from day one"
                ].map((item, i) => (
                  <motion.li key={i} variants={fadeInUp} custom={i} className="flex items-start gap-3 text-white font-medium">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-lab-accent mt-1 size-5" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <motion.div variants={fadeInUp} custom={4} className="relative p-8 rounded-2xl border border-lab-accent/40 bg-lab-blue/30 backdrop-blur-sm">
              <div className="absolute -top-4 -right-4 size-20 bg-lab-accent/20 rounded-full blur-2xl" />
              <div className="grid grid-cols-2 gap-8">
                {[
                  { val: "10+", label: "Platforms Shipped" },
                  { val: "100%", label: "Client Retention" },
                  { val: "5+", label: "Years of Rigor" },
                  { val: "24/7", label: "System Reliability" }
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-4xl font-extrabold text-white mb-1">{stat.val}</div>
                    <div className="text-sm text-white font-semibold">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* 3. Leadership - MAXIMUM CONTRAST */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={container}
            className="mb-32"
          >
            <SectionHeading path="leadership" lines={["Meet the", "Founder"]} className="mb-12" />
            <motion.div variants={fadeInUp} custom={0} className="max-w-4xl mx-auto grid md:grid-cols-[1fr_1.5fr] gap-8 items-center p-8 rounded-2xl border border-lab-accent/30 bg-lab-blue/30 backdrop-blur-sm">
              <div className="relative aspect-square rounded-xl overflow-hidden border border-lab-accent/40 bg-lab-navy flex items-center justify-center">
                <FontAwesomeIcon icon={faCode} className="size-16 text-lab-accent/60" />
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-lab-navy to-transparent">
                  <span className="font-mono text-xs text-lab-accent font-bold">Founder & CEO</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{SITE.authorName}</h3>
                <p className="text-lab-accent font-bold mb-4">{SITE.authorHandle}</p>
                <p className="text-white leading-relaxed mb-6 font-medium">
                  Paras founded SoftwareLabs to give growing businesses the same engineering rigor, speed, and reliability that large tech companies take for granted. He leads product strategy, system architecture, and customer partnerships end-to-end.
                </p>
                <div className="flex gap-3">
                  {[
                    { icon: faGithub, href: SITE.socials.github },
                    { icon: faLinkedin, href: SITE.socials.linkedin },
                    { icon: faXTwitter, href: SITE.socials.twitter }
                  ].map((social, i) => (
                    <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="flex size-10 items-center justify-center rounded-lg border border-lab-accent/40 bg-lab-navy text-white hover:text-lab-accent hover:border-lab-accent hover:bg-lab-accent/20 transition-all">
                      <FontAwesomeIcon icon={social.icon} className="size-4" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* 4. Core Values - MAXIMUM CONTRAST */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={container}
            className="mb-32"
          >
            <SectionHeading path="values" lines={["Our Engineering", "Manifesto"]} className="mb-12" />
            <motion.div variants={container} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PRINCIPLES.slice(0, 6).map((principle, i) => {
                const IconComponent = principle.icon;
                return (
                  <motion.div 
                    key={principle.name} variants={fadeInUp} custom={i}
                    className="group p-6 rounded-xl border border-lab-accent/30 bg-lab-blue/30 hover:border-lab-accent/50 hover:bg-lab-blue/40 transition-all duration-300"
                  >
                    <IconComponent className="w-8 h-8 text-lab-accent mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <h4 className="font-bold text-white mb-2 group-hover:text-lab-accent transition-colors">{principle.name}</h4>
                    <p className="text-sm text-white leading-relaxed font-medium">{principle.text}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* 5. Our Journey (Timeline) - MAXIMUM CONTRAST */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={container}
            className="mb-32"
          >
            <SectionHeading path="journey" lines={["Our", "Journey"]} className="mb-12" />
            <div className="relative">
              {/* Desktop Connecting Line */}
              <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lab-accent/60 to-transparent" />
              
              <motion.div variants={container} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 relative">
                {MILESTONES.map((m, i) => (
                  <motion.div key={m.year} variants={fadeInUp} custom={i} className="group relative flex flex-col items-center text-center lg:items-start lg:text-left">
                    {/* Node */}
                    <div className="relative z-10 flex size-16 items-center justify-center rounded-full border-2 border-lab-accent/40 bg-lab-navy text-lab-accent transition-all duration-300 group-hover:border-lab-accent group-hover:bg-lab-accent group-hover:text-lab-navy group-hover:shadow-[0_0_20px_-5px_rgba(91,155,213,0.5)] mb-4 lg:mb-6">
                      <FontAwesomeIcon icon={m.icon} className="size-6" />
                    </div>
                    <span className="mb-2 inline-block rounded-full bg-lab-blue/40 px-3 py-1 font-mono text-[10px] font-bold text-lab-accent border border-lab-accent/40">
                      {m.year}
                    </span>
                    <h4 className="text-base font-bold uppercase tracking-wide text-white mb-1.5 group-hover:text-lab-accent transition-colors">
                      {m.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-white font-medium max-w-[280px]">
                      {m.desc}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* 6. How We Deliver (Process) - MAXIMUM CONTRAST */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={container}
            className="mb-32"
          >
            <SectionHeading path="process" lines={["How We", "Deliver"]} className="mb-12" />
            <motion.div variants={container} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {STEPS.map((step, i) => {
                const IconComponent = step.icon;
                return (
                  <motion.div key={step.n} variants={fadeInUp} custom={i} className="relative p-6 rounded-xl border border-lab-accent/30 bg-lab-blue/30 hover:border-lab-accent/50 hover:bg-lab-blue/40 transition-all duration-300 group">
                    <div className="text-4xl font-bold text-lab-accent/30 absolute top-4 right-4 group-hover:text-lab-accent/50 transition-colors duration-300">{step.n}</div>
                    <IconComponent className="w-8 h-8 text-lab-accent mb-4" />
                    <h4 className="font-bold text-white mb-2 group-hover:text-lab-accent transition-colors">{step.title}</h4>
                    <p className="text-sm text-white leading-relaxed mb-4 font-medium">{step.text}</p>
                    <div className="pt-4 border-t border-lab-accent/30">
                      <span className="text-xs font-mono text-lab-accent font-bold">Output: {step.output}</span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* 7. Testimonials - MAXIMUM CONTRAST */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={container}
            className="mb-32"
          >
            <SectionHeading path="testimonials" lines={["Trusted", "By Teams"]} className="mb-12" />
            <motion.div variants={container} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t, i) => (
                <motion.div key={i} variants={fadeInUp} custom={i} className="p-8 rounded-2xl border border-lab-accent/30 bg-lab-blue/30 backdrop-blur-sm hover:border-lab-accent/50 transition-all duration-300">
                  <FontAwesomeIcon icon={faQuoteLeft} className="text-3xl text-lab-accent/50 mb-4" />
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, idx) => <FontAwesomeIcon key={idx} icon={faStar} className="text-yellow-400 text-xs" />)}
                  </div>
                  <p className="text-white leading-relaxed mb-6 italic text-sm font-medium">"{t.quote}"</p>
                  <div>
                    <div className="font-bold text-white text-sm">{t.author}</div>
                    <div className="text-xs text-white font-semibold">{t.role}, {t.company}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* 8. Crisp CTA - MAXIMUM CONTRAST */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} custom={0}
            className="relative p-10 sm:p-16 rounded-2xl bg-gradient-to-br from-lab-blue/40 via-lab-navy to-lab-blue/40 border border-lab-accent/40 overflow-hidden text-center"
          >
            <div className="absolute inset-0 bg-lab-accent/5 blur-[100px] pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg">
                Ready to Build Your <span className="text-lab-accent">Business Platform</span>?
              </h2>
              <p className="text-white mb-8 leading-relaxed font-medium">
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
          </motion.div>

        </Container>
      </main>

      <Footer />
    </>
  );
}