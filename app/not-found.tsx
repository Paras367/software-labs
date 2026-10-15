"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container, ButtonLink } from "@/components/ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faHome, faSearch, faCube, faTerminal, 
  faArrowRight, faExclamationTriangle, faCodeBranch 
} from "@fortawesome/free-solid-svg-icons";

const SUGGESTED_LINKS = [
  { label: "Home", href: "/", icon: faHome },
  { label: "Products", href: "/#products", icon: faCube },
  { label: "About Us", href: "/about", icon: faCodeBranch },
  { label: "Contact", href: "/#contact", icon: faTerminal },
];

export default function NotFound() {
  return (
    <>
      <Navbar />

      <main className="relative min-h-screen bg-lab-navy overflow-hidden flex items-center">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-96 bg-lab-accent/10 blur-[150px] pointer-events-none" />

        <Container className="relative z-10 py-32">
          <div className="max-w-4xl mx-auto text-center">
            
            {/* Glitchy 404 Number */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative mb-8"
            >
              {/* Background glow behind number */}
              <div className="absolute inset-0 blur-3xl bg-lab-accent/20 rounded-full" />
              
              <h1 className="relative text-[clamp(8rem,20vw,14rem)] font-extrabold text-white leading-none tracking-tighter">
                <span className="relative inline-block">
                  4
                  {/* Glitch layer 1 */}
                  <span className="absolute inset-0 text-lab-accent/30 animate-pulse translate-x-1">4</span>
                </span>
                <span className="relative inline-block text-lab-accent">
                  0
                  {/* Glitch layer 2 */}
                  <span className="absolute inset-0 text-white/20 -translate-x-1">0</span>
                </span>
                <span className="relative inline-block">
                  4
                  {/* Glitch layer 3 */}
                  <span className="absolute inset-0 text-lab-accent/30 animate-pulse -translate-x-1">4</span>
                </span>
              </h1>

              {/* Scanline overlay on the number */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                  backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)"
                }}
              />
            </motion.div>

            {/* Terminal-Style Error Block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-10 inline-block"
            >
              <div className="rounded-xl border border-lab-accent/30 bg-lab-blue/20 backdrop-blur-sm px-6 py-4 font-mono text-left max-w-2xl mx-auto">
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-lab-accent/20">
                  <span className="size-2.5 rounded-full bg-red-500/80" />
                  <span className="size-2.5 rounded-full bg-yellow-500/80" />
                  <span className="size-2.5 rounded-full bg-green-500/80" />
                  <span className="ml-2 text-[10px] uppercase tracking-widest text-lab-ice/50">
                    error.log
                  </span>
                </div>
                <div className="space-y-1.5 text-sm">
                  <p className="text-lab-ice/80">
                    <span className="text-lab-accent">$</span> 
                    <span className="text-blue-400"> curl </span>
                    <span className="text-lab-ice">/requested-path</span>
                  </p>
                  <p className="text-red-400 flex items-center gap-2">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="size-3" />
                    <span>ERROR 404: Resource not found</span>
                  </p>
                  <p className="text-lab-ice/60">
                    <span className="text-lab-accent">→</span> The page you're looking for doesn't exist or has been moved.
                  </p>
                  <p className="text-lab-ice/60">
                    <span className="text-lab-accent">→</span> Check the URL or navigate back to safety.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-white mb-10 font-medium max-w-xl mx-auto"
            >
              Looks like this route hasn't been deployed yet. Let's get you back on track.
            </motion.p>

            {/* Primary CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-12"
            >
              <ButtonLink href="/" className="min-w-[200px] !py-3.5 text-base">
                Back to Home
                <FontAwesomeIcon icon={faArrowRight} className="size-4" />
              </ButtonLink>
            </motion.div>

            {/* Suggested Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <p className="font-mono text-xs uppercase tracking-widest text-lab-accent/60 mb-5">
                Or explore these routes:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
                {SUGGESTED_LINKS.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
                    className="group flex items-center justify-center gap-2 rounded-lg border border-lab-accent/20 bg-lab-blue/20 px-4 py-3 text-sm font-semibold text-white hover:border-lab-accent/50 hover:bg-lab-accent/10 hover:text-lab-accent transition-all duration-300"
                  >
                    <FontAwesomeIcon icon={link.icon} className="size-4 text-lab-accent group-hover:scale-110 transition-transform" />
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Terminal Footer */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mt-16 font-mono text-xs text-lab-ice/40 flex items-center justify-center gap-1"
            >
              <span className="text-lab-accent">softwarelabs@build</span>:
              <span className="text-blue-400">~</span>$ 
              <span className="text-lab-ice/60">git checkout main</span>
              <span className="inline-block size-1.5 animate-pulse bg-lab-accent rounded-sm ml-1" />
            </motion.p>

          </div>
        </Container>
      </main>

      <Footer />
    </>
  );
}