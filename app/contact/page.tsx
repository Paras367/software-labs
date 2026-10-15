"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container, ButtonLink } from "@/components/ui";
import { SITE } from "@/lib/site";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faEnvelope, faLocationDot, faPaperPlane, 
  faCheckCircle,
  faClock, faBolt, faCode
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin, faXTwitter } from "@fortawesome/free-brands-svg-icons";

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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "saas",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call (Replace with your actual Resend/API logic later)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: "", email: "", company: "", projectType: "saas", message: "" });
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <>
      <Navbar />
      
      <main className="relative bg-lab-navy overflow-hidden min-h-screen">
        {/* Subtle Background Grid & Glow */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-lab-accent/5 blur-[120px] pointer-events-none" />

        {/* Added pt-32 to account for fixed navbar */}
        <Container className="relative z-10 pt-32 pb-24 sm:pt-40 sm:pb-32">
          
          {/* 1. Hero Section - MAXIMUM CONTRAST */}
          <motion.div 
            initial="hidden" animate="visible" variants={container}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <motion.p variants={fadeInUp} custom={0} className="font-mono text-xs uppercase tracking-widest text-lab-accent mb-4 font-bold">~/contact</motion.p>
            <motion.h1 variants={fadeInUp} custom={1} className="text-4xl sm:text-6xl font-extrabold text-white mb-6 uppercase leading-[0.95] tracking-tight">
              Let's Build Something <span className="text-lab-accent">Amazing</span>
            </motion.h1>
            <motion.p variants={fadeInUp} custom={2} className="text-lg sm:text-xl text-white mb-8 leading-relaxed font-medium">
              Have a project in mind? Fill out the form below or reach out directly. We typically respond within 24 hours.
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 max-w-6xl mx-auto">
            
            {/* 2. Contact Info & Expectations (Left Column) */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={container}
              className="space-y-8"
            >
              {/* Direct Contact Methods */}
              <div className="p-8 rounded-2xl border border-lab-accent/30 bg-lab-blue/20 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <FontAwesomeIcon icon={faEnvelope} className="text-lab-accent" />
                  Direct Contact
                </h3>
                <div className="space-y-4">
                  <a href={`mailto:${SITE.email}`} className="flex items-center gap-4 text-white hover:text-lab-accent transition-colors group">
                    <div className="size-10 rounded-lg bg-lab-navy border border-lab-accent/30 flex items-center justify-center group-hover:border-lab-accent group-hover:bg-lab-accent/10 transition-all">
                      <FontAwesomeIcon icon={faEnvelope} className="text-lab-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-lab-ice/60 font-medium">Email Us</p>
                      <p className="font-semibold">{SITE.email}</p>
                    </div>
                  </a>
                  
                  <div className="flex items-center gap-4 text-white">
                    <div className="size-10 rounded-lg bg-lab-navy border border-lab-accent/30 flex items-center justify-center">
                      <FontAwesomeIcon icon={faLocationDot} className="text-lab-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-lab-ice/60 font-medium">Headquarters</p>
                      <p className="font-semibold">Chandigarh, India (Remote Worldwide)</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-6 border-t border-lab-accent/20">
                  <p className="text-sm text-lab-ice/60 font-medium mb-4">Connect with us</p>
                  <div className="flex gap-3">
                    {[
                      { icon: faGithub, href: SITE.socials.github, label: "GitHub" },
                      { icon: faLinkedin, href: SITE.socials.linkedin, label: "LinkedIn" },
                      { icon: faXTwitter, href: SITE.socials.twitter, label: "Twitter" }
                    ].map((social, i) => (
                      <a 
                        key={i} 
                        href={social.href} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label={social.label}
                        className="flex size-10 items-center justify-center rounded-lg border border-lab-accent/30 bg-lab-navy text-white hover:text-lab-accent hover:border-lab-accent hover:bg-lab-accent/10 transition-all"
                      >
                        <FontAwesomeIcon icon={social.icon} className="size-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* What to Expect */}
              <div className="p-8 rounded-2xl border border-lab-accent/20 bg-lab-blue/10 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <FontAwesomeIcon icon={faClock} className="text-lab-accent" />
                  What to Expect
                </h3>
                <ul className="space-y-4">
                  {[
                    { icon: faBolt, title: "Fast Response", desc: "We reply to all inquiries within 24 hours." },
                    { icon: faCode, title: "Technical Deep-Dive", desc: "We'll schedule a quick call to understand your architecture needs." },
                    { icon: faCheckCircle, title: "Clear Proposal", desc: "You'll receive a detailed scope, timeline, and transparent pricing." }
                  ].map((item, i) => (
                    <motion.li key={i} variants={fadeInUp} custom={i} className="flex items-start gap-4">
                      <div className="mt-1 size-6 rounded-full bg-lab-accent/10 border border-lab-accent/30 flex items-center justify-center shrink-0">
                        <FontAwesomeIcon icon={item.icon} className="text-lab-accent text-xs" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">{item.title}</p>
                        <p className="text-sm text-lab-ice/70 font-medium">{item.desc}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* 3. Contact Form (Right Column) */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} custom={0}
              className="relative"
            >
              <div className="p-8 sm:p-10 rounded-2xl border border-lab-accent/30 bg-lab-blue/20 backdrop-blur-sm">
                {isSuccess ? (
                  <div className="text-center py-12">
                    <div className="size-16 mx-auto mb-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                      <FontAwesomeIcon icon={faCheckCircle} className="size-8 text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-lab-ice/70 font-medium mb-6">Thanks for reaching out. We'll get back to you within 24 hours.</p>
                    <button 
                      onClick={() => setIsSuccess(false)}
                      className="text-lab-accent font-semibold hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-semibold text-white">Full Name <span className="text-lab-accent">*</span></label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full rounded-lg border border-lab-accent/30 bg-lab-navy/50 px-4 py-3 text-white placeholder:text-lab-ice/30 focus:border-lab-accent focus:outline-none focus:ring-1 focus:ring-lab-accent transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-semibold text-white">Email Address <span className="text-lab-accent">*</span></label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@company.com"
                          className="w-full rounded-lg border border-lab-accent/30 bg-lab-navy/50 px-4 py-3 text-white placeholder:text-lab-ice/30 focus:border-lab-accent focus:outline-none focus:ring-1 focus:ring-lab-accent transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="company" className="text-sm font-semibold text-white">Company (Optional)</label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Acme Inc."
                          className="w-full rounded-lg border border-lab-accent/30 bg-lab-navy/50 px-4 py-3 text-white placeholder:text-lab-ice/30 focus:border-lab-accent focus:outline-none focus:ring-1 focus:ring-lab-accent transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="projectType" className="text-sm font-semibold text-white">Project Type <span className="text-lab-accent">*</span></label>
                        <select
                          id="projectType"
                          name="projectType"
                          required
                          value={formData.projectType}
                          onChange={handleChange}
                          className="w-full rounded-lg border border-lab-accent/30 bg-lab-navy/50 px-4 py-3 text-white focus:border-lab-accent focus:outline-none focus:ring-1 focus:ring-lab-accent transition-all appearance-none cursor-pointer"
                          style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%235b9bd5' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
                        >
                          <option value="saas">SaaS Application</option>
                          <option value="ai">AI / Automation Tool</option>
                          <option value="custom">Custom Software</option>
                          <option value="other">Other / Not Sure</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-semibold text-white">Project Details <span className="text-lab-accent">*</span></label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your goals, timeline, and any technical requirements..."
                        className="w-full rounded-lg border border-lab-accent/30 bg-lab-navy/50 px-4 py-3 text-white placeholder:text-lab-ice/30 focus:border-lab-accent focus:outline-none focus:ring-1 focus:ring-lab-accent transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full !py-3.5 text-base font-bold flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="size-4 border-2 border-lab-navy/30 border-t-lab-navy rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <FontAwesomeIcon icon={faPaperPlane} className="size-4" />
                        </>
                      )}
                    </button>
                    
                    <p className="text-center text-xs text-lab-ice/40 font-medium">
                      By submitting, you agree to our Privacy Policy. We respect your data.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </Container>
      </main>

      <Footer />
    </>
  );
}