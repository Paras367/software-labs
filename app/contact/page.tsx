"use client";

import { useState, FormEvent, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container, ButtonLink } from "@/components/ui";
import { SITE } from "@/lib/site";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faEnvelope, faLocationDot, faPaperPlane, 
  faCheckCircle, faClock, faBolt, faCode,
  faChevronDown, faChevronUp, 
  faKeyboard, faSave, faCircleCheck, faCircleXmark,
  faRocket, faLightbulb, faGear, faQuestionCircle,
  faArrowRight
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin, faXTwitter } from "@fortawesome/free-brands-svg-icons";

// ============================================================================
// DATA CONSTANTS
// ============================================================================

const QUICK_TEMPLATES = [
  { icon: faRocket, label: "New Project", text: "Hi! I'm interested in building a new software product. I'd love to discuss timelines, budget, and technical requirements." },
  { icon: faGear, label: "Technical Help", text: "Hi! I need technical assistance with an existing project. Can we schedule a call to discuss the architecture?" },
  { icon: faLightbulb, label: "AI Integration", text: "Hi! I'm looking to integrate AI/automation into my workflow. What solutions do you offer?" },
  { icon: faQuestionCircle, label: "Just Exploring", text: "Hi! I'm just exploring options right now. Could you share more about your services and pricing?" },
];

const BUSINESS_HOURS = { open: 9, close: 21, timezone: "Asia/Kolkata" };

// ============================================================================
// HELPERS
// ============================================================================

function useCurrentTime(timezone: string) {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: timezone });
}

function isBusinessHoursNow(open: number, close: number): boolean {
  const hour = new Date().getHours();
  return hour >= open && hour < close;
}

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const }
  })
};

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// ============================================================================
// FLOATING LABEL INPUT COMPONENT
// ============================================================================

function FloatingInput({
  id, name, type = "text", value, onChange, placeholder, required, success
}: {
  id: string; name: string; type?: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string; required?: boolean; success?: boolean;
}) {
  const isFilled = value.length > 0;
  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`peer w-full rounded-lg border bg-lab-navy/50 px-4 pt-6 pb-2 text-white placeholder-transparent focus:outline-none focus:ring-1 transition-all ${
          success ? "border-emerald-400/50 focus:border-emerald-400 focus:ring-emerald-400" : "border-lab-accent/30 focus:border-lab-accent focus:ring-lab-accent"
        }`}
      />
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-200 pointer-events-none ${
          isFilled ? "top-2 text-[10px] text-lab-accent font-bold uppercase tracking-wider" : "top-3.5 text-sm text-lab-ice/60"
        }`}
      >
        {placeholder}{required && <span className="text-lab-accent ml-0.5">*</span>}
      </label>
      <div className="absolute right-3 top-1/2 -translate-y-1/2">
        {success && <FontAwesomeIcon icon={faCircleCheck} className="text-emerald-400 size-4" />}
      </div>
    </div>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "", email: "", company: "", projectType: "saas", message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showExpectations, setShowExpectations] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const currentTime = useCurrentTime(BUSINESS_HOURS.timezone);
  const isOnline = isBusinessHoursNow(BUSINESS_HOURS.open, BUSINESS_HOURS.close);

  // --- Auto-save to localStorage ---
  useEffect(() => {
    const saved = localStorage.getItem("contact-draft");
    if (saved) {
      try { setFormData(JSON.parse(saved)); } catch {}
    }
  }, []);

  useEffect(() => {
    if (formData.name || formData.email || formData.message) {
      localStorage.setItem("contact-draft", JSON.stringify(formData));
      setSavedAt(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
  }, [formData]);

  // --- Keyboard shortcut: Ctrl/Cmd + Enter to submit ---
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter" && !isSubmitting && !isSuccess) {
        const form = document.getElementById("contact-form");
        if (form) (form as HTMLFormElement).requestSubmit();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isSubmitting, isSuccess]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const applyTemplate = (text: string) => {
    setFormData({ ...formData, message: text });
    textareaRef.current?.focus();
  };

  const clearDraft = () => {
    localStorage.removeItem("contact-draft");
    setFormData({ name: "", email: "", company: "", projectType: "saas", message: "" });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: "", email: "", company: "", projectType: "saas", message: "" });
    localStorage.removeItem("contact-draft");
    setTimeout(() => setIsSuccess(false), 5000);
  };

  // --- Form progress ---
  const requiredFields = ["name", "email", "message"];
  const filledRequired = requiredFields.filter(f => formData[f as keyof typeof formData].trim().length > 0).length;
  const progress = Math.round((filledRequired / requiredFields.length) * 100);

  // --- Character counter ---
  const maxChars = 1000;
  const charCount = formData.message.length;
  const charPercent = (charCount / maxChars) * 100;

  return (
    <>
      <Navbar />
      
      <main className="relative bg-lab-navy overflow-hidden min-h-screen">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-lab-accent/5 blur-[120px] pointer-events-none" />

        {/* Increased max-w and padding for better breathing room */}
        <Container className="relative z-10 pt-28 pb-32 sm:pt-36 sm:pb-40">
          
          {/* 1. Hero Section */}
          <motion.div 
            initial="hidden" animate="visible" variants={container}
            className="text-center max-w-3xl mx-auto mb-16 sm:mb-24"
          >
            <motion.p variants={fadeInUp} custom={0} className="font-mono text-xs uppercase tracking-widest text-lab-accent mb-4 font-bold">~/contact</motion.p>
            <motion.h1 variants={fadeInUp} custom={1} className="text-4xl sm:text-6xl font-extrabold text-white mb-6 uppercase leading-[0.95] tracking-tight">
              Let's Build Something <span className="text-lab-accent">Amazing</span>
            </motion.h1>
            <motion.p variants={fadeInUp} custom={2} className="text-base sm:text-xl text-white mb-8 leading-relaxed font-medium">
              Have a project in mind? Fill out the form below or reach out directly. We typically respond within 24 hours.
            </motion.p>

            {/* Live Status Badge */}
            <motion.div variants={fadeInUp} custom={3} className="inline-flex flex-col sm:flex-row items-center gap-3 px-5 py-3 rounded-full bg-lab-blue/30 border border-lab-accent/30 text-white text-sm font-mono">
              <div className="flex items-center gap-2">
                <span className="relative flex size-2">
                  <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${isOnline ? "bg-emerald-400" : "bg-amber-400"}`} />
                  <span className={`relative inline-flex size-2 rounded-full ${isOnline ? "bg-emerald-400" : "bg-amber-400"}`} />
                </span>
                <span className="font-semibold">{isOnline ? "Online Now" : "Offline"}</span>
              </div>
              <span className="hidden sm:inline text-lab-ice/40">·</span>
              <span className="text-lab-ice/70 text-xs">Chandigarh · {currentTime}</span>
            </motion.div>
          </motion.div>

          {/* Wider grid gap and better proportions */}
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-16 max-w-7xl mx-auto">
            
            {/* 2. LEFT COLUMN: Contact Info */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={container}
              className="space-y-8 order-2 lg:order-1"
            >
              {/* Direct Contact Card */}
              <div className="p-6 sm:p-8 rounded-2xl border border-lab-accent/30 bg-lab-blue/20 backdrop-blur-sm group hover:border-lab-accent/50 transition-all duration-500">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <FontAwesomeIcon icon={faEnvelope} className="text-lab-accent" />
                  Direct Contact
                </h3>
                <div className="space-y-5">
                  <a href={`mailto:${SITE.email}`} className="flex items-center gap-4 text-white hover:text-lab-accent transition-colors group/link">
                    <div className="size-12 rounded-lg bg-lab-navy border border-lab-accent/30 flex items-center justify-center group-hover/link:border-lab-accent group-hover/link:bg-lab-accent/10 group-hover/link:scale-110 transition-all">
                      <FontAwesomeIcon icon={faEnvelope} className="text-lab-accent text-lg" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-lab-ice/60 font-medium uppercase tracking-wider mb-0.5">Email Us</p>
                      <p className="font-semibold truncate">{SITE.email}</p>
                    </div>
                    <FontAwesomeIcon icon={faArrowRight} className="size-3 text-lab-ice/30 group-hover/link:text-lab-accent group-hover/link:translate-x-1 transition-all" />
                  </a>
                  
                  <div className="flex items-center gap-4 text-white">
                    <div className="size-12 rounded-lg bg-lab-navy border border-lab-accent/30 flex items-center justify-center">
                      <FontAwesomeIcon icon={faLocationDot} className="text-lab-accent text-lg" />
                    </div>
                    <div>
                      <p className="text-xs text-lab-ice/60 font-medium uppercase tracking-wider mb-0.5">Headquarters</p>
                      <p className="font-semibold">Chandigarh, India</p>
                      <p className="text-xs text-lab-ice/50">Remote Worldwide</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-6 border-t border-lab-accent/20">
                  <p className="text-xs text-lab-ice/60 font-medium uppercase tracking-wider mb-4">Connect with us</p>
                  <div className="flex gap-3">
                    {[
                      { icon: faGithub, href: SITE.socials.github, label: "GitHub" },
                      { icon: faLinkedin, href: SITE.socials.linkedin, label: "LinkedIn" },
                      { icon: faXTwitter, href: SITE.socials.twitter, label: "Twitter" }
                    ].map((social, i) => (
                      <a 
                        key={i} href={social.href} target="_blank" rel="noopener noreferrer" 
                        aria-label={social.label}
                        className="flex size-11 items-center justify-center rounded-lg border border-lab-accent/30 bg-lab-navy text-white hover:text-lab-accent hover:border-lab-accent hover:bg-lab-accent/10 hover:scale-110 transition-all"
                      >
                        <FontAwesomeIcon icon={social.icon} className="size-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* What to Expect - Reliable, non-buggy layout */}
              <div className="rounded-2xl border border-lab-accent/20 bg-lab-blue/10 backdrop-blur-sm">
                {/* Mobile Toggle */}
                <button
                  type="button"
                  onClick={() => setShowExpectations(!showExpectations)}
                  className="w-full flex items-center justify-between p-6 text-left lg:hidden"
                >
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <FontAwesomeIcon icon={faClock} className="text-lab-accent" />
                    What to Expect
                  </h3>
                  <FontAwesomeIcon 
                    icon={showExpectations ? faChevronUp : faChevronDown} 
                    className="text-lab-accent transition-transform"
                  />
                </button>

                {/* Desktop Header */}
                <div className="hidden lg:block p-6 pb-0">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
                    <FontAwesomeIcon icon={faClock} className="text-lab-accent" />
                    What to Expect
                  </h3>
                </div>

                {/* Content (Always visible on desktop, toggleable on mobile) */}
                <div className={`lg:block ${showExpectations ? 'block' : 'hidden'}`}>
                  <ul className="p-6 pt-0 lg:pt-0 space-y-6">
                    {[
                      { icon: faBolt, title: "Fast Response", desc: "We reply to all inquiries within 24 hours." },
                      { icon: faCode, title: "Technical Deep-Dive", desc: "We'll schedule a quick call to understand your architecture needs." },
                      { icon: faCheckCircle, title: "Clear Proposal", desc: "You'll receive a detailed scope, timeline, and transparent pricing." }
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <div className="mt-1 size-9 rounded-full bg-lab-accent/10 border border-lab-accent/30 flex items-center justify-center shrink-0">
                          <FontAwesomeIcon icon={item.icon} className="text-lab-accent text-sm" />
                        </div>
                        <div>
                          <p className="font-bold text-white text-sm mb-1">{item.title}</p>
                          <p className="text-sm text-lab-ice font-medium leading-relaxed">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Quick Reply Templates - Desktop Only */}
              <div className="hidden lg:block p-6 rounded-2xl border border-lab-accent/20 bg-lab-blue/10 backdrop-blur-sm">
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-wider">
                  <FontAwesomeIcon icon={faLightbulb} className="text-lab-accent" />
                  Quick Templates
                </h3>
                <p className="text-xs text-lab-ice/50 mb-4">Click to pre-fill your message</p>
                <div className="grid grid-cols-2 gap-3">
                  {QUICK_TEMPLATES.map((t, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => applyTemplate(t.text)}
                      className="flex items-center gap-2 p-3 rounded-lg border border-lab-accent/20 bg-lab-navy/50 text-left hover:border-lab-accent/50 hover:bg-lab-accent/10 transition-all group"
                    >
                      <FontAwesomeIcon icon={t.icon} className="text-lab-accent size-3 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-semibold text-white">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* 3. RIGHT COLUMN: Contact Form */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp} custom={0}
              className="relative order-1 lg:order-2"
            >
              <div className="p-6 sm:p-8 rounded-2xl border border-lab-accent/30 bg-lab-blue/20 backdrop-blur-sm lg:sticky lg:top-28">
                
                {/* Form Header with Progress */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <FontAwesomeIcon icon={faPaperPlane} className="text-lab-accent" />
                      Send a Message
                    </h3>
                    <span className="text-xs font-mono text-lab-accent font-bold">{progress}% Complete</span>
                  </div>
                  <div className="h-1.5 w-full bg-lab-navy rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-lab-accent to-blue-400"
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </div>

                {/* Auto-save indicator */}
                {savedAt && !isSuccess && (
                  <div className="mb-6 flex items-center gap-2 text-xs text-lab-ice/50 font-mono bg-lab-navy/30 p-2 rounded-lg border border-lab-accent/10">
                    <FontAwesomeIcon icon={faSave} className="text-lab-accent/60 size-3" />
                    <span>Draft auto-saved at {savedAt}</span>
                    <button type="button" onClick={clearDraft} className="text-lab-accent hover:underline ml-auto font-semibold">Clear</button>
                  </div>
                )}

                {isSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="size-20 mx-auto mb-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                      <FontAwesomeIcon icon={faCheckCircle} className="size-10 text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-lab-ice/70 font-medium mb-6">Thanks for reaching out. We'll get back to you within 24 hours.</p>
                    <button 
                      onClick={() => setIsSuccess(false)}
                      className="text-lab-accent font-semibold hover:underline text-sm"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <FloatingInput
                        id="name" name="name" value={formData.name}
                        onChange={handleChange as any}
                        placeholder="Full Name" required
                        success={formData.name.trim().length > 2}
                      />
                      <FloatingInput
                        id="email" name="email" type="email" value={formData.email}
                        onChange={handleChange as any}
                        placeholder="Email Address" required
                        success={/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)}
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <FloatingInput
                        id="company" name="company" value={formData.company}
                        onChange={handleChange as any}
                        placeholder="Company (Optional)"
                      />
                      <div className="relative">
                        <label htmlFor="projectType" className="absolute -top-2 left-3 bg-lab-blue/20 px-1.5 text-[10px] text-lab-accent font-bold uppercase tracking-wider rounded">
                          Project Type <span className="text-lab-accent">*</span>
                        </label>
                        <select
                          id="projectType" name="projectType" required
                          value={formData.projectType} onChange={handleChange}
                          className="w-full rounded-lg border border-lab-accent/30 bg-lab-navy/50 px-4 pt-6 pb-2 text-white focus:border-lab-accent focus:outline-none focus:ring-1 focus:ring-lab-accent transition-all appearance-none cursor-pointer"
                          style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%235b9bd5' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.25em 1.25em' }}
                        >
                          <option value="saas">SaaS Application</option>
                          <option value="ai">AI / Automation Tool</option>
                          <option value="custom">Custom Software</option>
                          <option value="other">Other / Not Sure</option>
                        </select>
                      </div>
                    </div>

                    {/* Message with character counter */}
                    <div className="relative">
                      <textarea
                        ref={textareaRef}
                        id="message" name="message" required
                        rows={5} maxLength={maxChars}
                        value={formData.message} onChange={handleChange}
                        onFocus={() => setFocusedField("message")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Tell us about your goals, timeline, and technical requirements..."
                        className={`peer w-full rounded-lg border bg-lab-navy/50 px-4 pt-6 pb-2 text-white placeholder-transparent focus:outline-none focus:ring-1 transition-all resize-none ${
                          focusedField === "message" ? "border-lab-accent ring-1 ring-lab-accent" : "border-lab-accent/30"
                        }`}
                      />
                      <label htmlFor="message" className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                        formData.message.length > 0 ? "top-2 text-[10px] text-lab-accent font-bold uppercase tracking-wider" : "top-3.5 text-sm text-lab-ice/60"
                      }`}>
                        Project Details <span className="text-lab-accent">*</span>
                      </label>
                      
                      {/* Character counter bar */}
                      <div className="mt-2 flex items-center justify-between gap-3">
                        <div className="flex-1 h-1.5 bg-lab-navy rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-300 ${charPercent > 90 ? "bg-red-400" : charPercent > 70 ? "bg-amber-400" : "bg-lab-accent"}`}
                            style={{ width: `${Math.min(charPercent, 100)}%` }}
                          />
                        </div>
                        <span className={`text-[10px] font-mono font-bold ${charPercent > 90 ? "text-red-400" : "text-lab-ice/50"}`}>
                          {charCount}/{maxChars}
                        </span>
                      </div>
                    </div>

                    {/* Quick templates - Mobile Only */}
                    <div className="lg:hidden">
                      <p className="text-[10px] text-lab-ice/50 font-mono uppercase tracking-wider mb-3 flex items-center gap-1">
                        <FontAwesomeIcon icon={faLightbulb} className="text-lab-accent" /> Quick templates
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {QUICK_TEMPLATES.map((t, i) => (
                          <button
                            key={i} type="button"
                            onClick={() => applyTemplate(t.text)}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-lab-accent/20 bg-lab-navy/50 text-xs font-semibold text-white hover:border-lab-accent/50 hover:bg-lab-accent/10 transition-all active:scale-95"
                          >
                            <FontAwesomeIcon icon={t.icon} className="text-lab-accent size-3" />
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full !py-4 text-base font-bold flex items-center justify-center gap-2 mt-2 rounded-lg border border-lab-accent/40 bg-lab-accent text-lab-navy transition-all hover:bg-lab-accent/90 disabled:opacity-70 disabled:cursor-not-allowed"
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
                    
                    <p className="text-center text-[10px] text-lab-ice/40 font-medium flex items-center justify-center gap-1.5">
                      <FontAwesomeIcon icon={faKeyboard} className="size-2.5" />
                      Press <kbd className="px-1.5 py-0.5 rounded border border-lab-accent/30 bg-lab-navy font-mono text-lab-ice/60">Ctrl</kbd>+<kbd className="px-1.5 py-0.5 rounded border border-lab-accent/30 bg-lab-navy font-mono text-lab-ice/60">Enter</kbd> to submit
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