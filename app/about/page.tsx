"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faArrowRight,
  faCode,
  faRocket,
  faLightbulb,
  faUsers,
  faAward,
  faCheckCircle,
  faQuoteLeft,
  faEnvelope,
  faStar,
  faShieldHalved,
  faServer,
  faHeadset,
  faChartLine,
  faLayerGroup,
  faPlug,
  faLock,
  faGlobe,
  faUser,
  faBuilding,
  faHandshake,
} from "@fortawesome/free-solid-svg-icons";
import { Container, SectionHeading } from "@/components/ui";
import { SITE } from "@/lib/site";
import { PRINCIPLES, STEPS, STATS } from "@/lib/content";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface Leader {
  name: string;
  role: string;
  bio: string;
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

interface Milestone {
  year: string;
  title: string;
  description: string;
  icon: any;
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
}

interface PlatformPillar {
  title: string;
  description: string;
  icon: any;
  items: string[];
  color: string;
}

interface TrustPoint {
  icon: any;
  title: string;
  description: string;
}

// ============================================================================
// DATA CONSTANTS
// ============================================================================

const LEADER: Leader = {
  name: "Paras Dhiman",
  role: "Founder & CEO",
  bio: "Paras founded SoftwareLabs to give growing businesses the same engineering rigor, speed, and reliability that large tech companies take for granted — without the overhead of building an in-house team from scratch. He leads product, architecture, and customer partnerships end to end.",
  socials: {
    github: SITE.github,
    linkedin: SITE.socials?.linkedin || "#",
    twitter: SITE.socials?.twitter || "#",
  },
};

const CAPABILITIES = [
  { name: "Product Strategy", level: 92 },
  { name: "Platform Architecture", level: 95 },
  { name: "Cloud & DevOps", level: 88 },
  { name: "AI & Automation", level: 85 },
  { name: "Customer Success", level: 90 },
];

const MILESTONES: Milestone[] = [
  {
    year: "2024",
    title: "SoftwareLabs Founded",
    description: "Paras Dhiman starts SoftwareLabs with one goal: help businesses ship reliable software without the usual friction of hiring, vendors, and delays.",
    icon: faRocket,
  },
  {
    year: "2024",
    title: "First Clients Onboarded",
    description: "Early SaaS and e-commerce teams come on board for platform builds, kicking off a track record of on-time, production-grade delivery.",
    icon: faHandshake,
  },
  {
    year: "2025",
    title: "AI & Automation Added",
    description: "The platform expands to include AI-assisted workflows and automation, helping clients cut manual ops and move faster.",
    icon: faLightbulb,
  },
  {
    year: "2026",
    title: "Scaling Nationwide & Beyond",
    description: "SoftwareLabs crosses 10+ shipped platforms and starts serving businesses across India and international markets.",
    icon: faGlobe,
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "SoftwareLabs delivered beyond our expectations. The architecture and code quality set a new bar for our engineering team.",
    author: "Sarah Chen",
    role: "CTO",
    company: "TechVentures Inc.",
    rating: 5,
  },
  {
    quote: "They moved fast without cutting corners. Onboarding, migration, and support all felt like working with an in-house team.",
    author: "Marcus Johnson",
    role: "Lead Developer",
    company: "StartupXYZ",
    rating: 5,
  },
  {
    quote: "Working with Paras and the SoftwareLabs team was a turning point for us. Their AI integration got us to market three times faster.",
    author: "Emily Rodriguez",
    role: "Product Manager",
    company: "InnovateLabs",
    rating: 5,
  },
];

const PLATFORM_PILLARS: PlatformPillar[] = [
  {
    title: "Core Platform",
    description: "A dependable foundation your business can build on — designed for uptime, not just launch day.",
    icon: faLayerGroup,
    items: ["Multi-tenant Architecture", "Role-based Access", "Usage Analytics", "Admin Dashboards"],
    color: "from-blue-500 to-cyan-400",
  },
  {
    title: "Integrations & API",
    description: "Connect SoftwareLabs into the tools your team already runs on, with a clean, documented API.",
    icon: faPlug,
    items: ["REST & Webhook APIs", "Payment Gateways", "CRM & Email Sync", "Custom Connectors"],
    color: "from-purple-500 to-pink-400",
  },
  {
    title: "Security & Compliance",
    description: "Built with enterprise data-handling practices from day one — not bolted on after the fact.",
    icon: faShieldHalved,
    items: ["Encrypted Data at Rest", "Access Auditing", "Role-based Permissions", "Regular Security Reviews"],
    color: "from-green-500 to-emerald-400",
  },
  {
    title: "AI & Automation",
    description: "Automation layers and AI-assisted workflows that cut manual work out of daily operations.",
    icon: faLightbulb,
    items: ["Workflow Automation", "AI-assisted Support", "Smart Reporting", "Predictive Insights"],
    color: "from-orange-500 to-red-400",
  },
];

const TRUST_POINTS: TrustPoint[] = [
  {
    icon: faServer,
    title: "Built for Reliability",
    description: "Infrastructure and monitoring designed to keep your business running, with proactive alerts before issues reach your users.",
  },
  {
    icon: faHeadset,
    title: "Real Support, Real People",
    description: "Direct access to the team that built your platform — no ticket queues disappearing into a black hole.",
  },
  {
    icon: faLock,
    title: "Data Handled Responsibly",
    description: "Sensible defaults on encryption, access control, and backups so your data stays yours.",
  },
  {
    icon: faChartLine,
    title: "Built to Scale With You",
    description: "Architecture decisions made for where your business is headed, not just where it is today.",
  },
];

const ACHIEVEMENTS = [
  { icon: faBuilding, value: "50+", label: "Businesses Served", description: "Across SaaS, e-commerce & services" },
  { icon: faUsers, value: "1000+", label: "End Users Supported", description: "Across 30+ countries" },
  { icon: faAward, value: "100%", label: "Client Satisfaction", description: "5-star rated delivery" },
  { icon: faChartLine, value: "10x", label: "Faster Time-to-Market", description: "Vs. building in-house from scratch" },
];

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

function StatsCounter({ end, suffix = "", prefix = "", duration = 2000, label }: { end: number; suffix?: string; prefix?: string; duration?: number; label: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) return;
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));
      if (progress < 1) animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => { if (animationFrame) cancelAnimationFrame(animationFrame); };
  }, [isVisible, end, duration]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    const element = document.getElementById(`stats-${label}`);
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, [label]);

  return (
    <div id={`stats-${label}`} className="text-center p-6 rounded-xl bg-lab-blue/20 border border-lab-accent/20 backdrop-blur-sm transition-all duration-300 hover:border-lab-accent/40 hover:shadow-lg hover:shadow-lab-accent/10">
      <div className="text-4xl sm:text-5xl font-bold text-lab-ice mb-2">{prefix}{count}{suffix}</div>
      <div className="text-sm text-lab-ice/60 font-medium">{label}</div>
    </div>
  );
}

function CapabilityBar({ skill, level, delay = 0 }: { skill: string; level: number; delay?: number }) {
  const [width, setWidth] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => setWidth(level), delay);
    return () => clearTimeout(timer);
  }, [isVisible, level, delay]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    const element = document.getElementById(`capability-${skill}`);
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, [skill]);

  return (
    <div id={`capability-${skill}`} className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-lab-ice">{skill}</span>
        <span className="text-sm text-lab-accent">{level}%</span>
      </div>
      <div className="h-2 bg-lab-navy rounded-full overflow-hidden border border-lab-accent/20">
        <div className="h-full bg-gradient-to-r from-lab-accent to-blue-400 rounded-full transition-all duration-1000 ease-out" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

function TimelineItem({ milestone, index, isLast }: { milestone: Milestone; index: number; isLast: boolean }) {
  return (
    <div className="relative pl-8 sm:pl-32 py-6 group">
      {!isLast && <div className="absolute left-0 sm:left-40 top-0 bottom-0 w-px bg-gradient-to-b from-lab-accent/50 to-transparent" />}
      <div className="absolute left-0 sm:left-0 top-8 w-24 sm:w-32">
        <span className="inline-block px-3 py-1 rounded-full bg-lab-accent/20 border border-lab-accent/40 text-lab-accent text-sm font-mono font-bold">{milestone.year}</span>
      </div>
      <div className="absolute left-0 sm:left-40 top-6 -translate-x-1/2">
        <div className="size-10 rounded-full bg-lab-navy border-2 border-lab-accent flex items-center justify-center shadow-lg shadow-lab-accent/20 group-hover:scale-110 transition-transform duration-300">
          <FontAwesomeIcon icon={milestone.icon} className="text-lab-accent text-sm" />
        </div>
      </div>
      <div className="ml-0 sm:ml-48 p-6 rounded-xl bg-lab-blue/20 border border-lab-accent/20 backdrop-blur-sm hover:border-lab-accent/40 transition-all duration-300 hover:shadow-xl hover:shadow-lab-accent/10">
        <h3 className="text-xl font-bold text-lab-ice mb-2">{milestone.title}</h3>
        <p className="text-lab-ice/70 leading-relaxed">{milestone.description}</p>
      </div>
    </div>
  );
}

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  return (
    <div className="p-8 rounded-2xl bg-lab-blue/20 border border-lab-accent/20 backdrop-blur-sm hover:border-lab-accent/40 transition-all duration-300 hover:shadow-xl hover:shadow-lab-accent/10 group" style={{ animationDelay: `${index * 150}ms` }}>
      <FontAwesomeIcon icon={faQuoteLeft} className="text-4xl text-lab-accent/20 mb-4 group-hover:text-lab-accent/40 transition-colors duration-300" />
      <div className="flex gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400 text-sm" />)}
      </div>
      <p className="text-lab-ice/80 leading-relaxed mb-6 italic">"{testimonial.quote}"</p>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-lab-accent to-blue-500 flex items-center justify-center text-lab-navy font-bold">{testimonial.author.charAt(0)}</div>
        <div>
          <div className="font-semibold text-lab-ice">{testimonial.author}</div>
          <div className="text-sm text-lab-ice/50">{testimonial.role} at {testimonial.company}</div>
        </div>
      </div>
    </div>
  );
}

function PlatformPillarCard({ pillar, index }: { pillar: PlatformPillar; index: number }) {
  return (
    <div className="relative p-8 rounded-2xl bg-lab-blue/20 border border-lab-accent/20 backdrop-blur-sm overflow-hidden group hover:border-lab-accent/40 transition-all duration-500" style={{ animationDelay: `${index * 100}ms` }}>
      <div className={`absolute inset-0 bg-gradient-to-br ${pillar.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
        <FontAwesomeIcon icon={pillar.icon} className="text-2xl text-white" />
      </div>
      <h3 className="text-2xl font-bold text-lab-ice mb-3">{pillar.title}</h3>
      <p className="text-lab-ice/70 mb-6 leading-relaxed">{pillar.description}</p>
      <ul className="space-y-2">
        {pillar.items.map((item, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-lab-ice/60 group-hover:text-lab-ice/80 transition-colors duration-300">
            <FontAwesomeIcon icon={faCheckCircle} className="text-lab-accent text-xs" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function TrustCard({ point, index }: { point: TrustPoint; index: number }) {
  return (
    <div className="p-6 rounded-xl bg-lab-blue/20 border border-lab-accent/20 backdrop-blur-sm hover:border-lab-accent/40 transition-all duration-300 group" style={{ animationDelay: `${index * 75}ms` }}>
      <div className="w-12 h-12 rounded-lg bg-lab-accent/10 border border-lab-accent/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
        <FontAwesomeIcon icon={point.icon} className="text-lab-accent text-lg" />
      </div>
      <h4 className="font-bold text-lab-ice mb-2">{point.title}</h4>
      <p className="text-sm text-lab-ice/60 leading-relaxed">{point.description}</p>
    </div>
  );
}

function LeadershipCard() {
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div className="relative">
        <div className="absolute inset-0 bg-lab-accent/20 blur-[100px] rounded-full" />
        <div className="relative z-10 aspect-square rounded-2xl overflow-hidden border-2 border-lab-accent/30 shadow-2xl shadow-lab-accent/20">
          <div className="w-full h-full bg-gradient-to-br from-lab-blue via-lab-navy to-lab-blue flex items-center justify-center">
            <div className="text-center p-8">
              <FontAwesomeIcon icon={faUser} className="text-8xl text-lab-accent/40 mb-4" />
              <p className="text-lab-ice/60 font-mono text-sm">{LEADER.name}</p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-lab-navy to-transparent">
            <div className="flex gap-6 text-center">
              <div><div className="text-2xl font-bold text-lab-ice">5+</div><div className="text-xs text-lab-ice/60">Years Exp.</div></div>
              <div className="w-px bg-lab-accent/30" />
              <div><div className="text-2xl font-bold text-lab-ice">50+</div><div className="text-xs text-lab-ice/60">Clients Served</div></div>
              <div className="w-px bg-lab-accent/30" />
              <div><div className="text-2xl font-bold text-lab-ice">100%</div><div className="text-xs text-lab-ice/60">Commitment</div></div>
            </div>
          </div>
        </div>
        <div className="absolute -top-4 -right-4 z-20 px-4 py-2 rounded-lg bg-lab-accent text-lab-navy font-bold shadow-lg shadow-lab-accent/30 animate-pulse">Founder</div>
      </div>

      <div>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lab-blue/40 border border-lab-accent/30 text-lab-accent text-sm font-mono mb-6">
          <FontAwesomeIcon icon={faStar} className="text-xs" /> Leadership
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold text-lab-ice mb-4">{LEADER.name}</h2>
        <p className="text-xl text-lab-accent mb-6 font-medium">{LEADER.role}</p>
        <p className="text-lab-ice/70 leading-relaxed mb-8">{LEADER.bio}</p>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-lab-ice mb-6 flex items-center gap-2">
            <FontAwesomeIcon icon={faCode} className="text-lab-accent" /> Core Capabilities
          </h3>
          {CAPABILITIES.map((cap, index) => <CapabilityBar key={cap.name} skill={cap.name} level={cap.level} delay={index * 100} />)}
        </div>

        <div className="flex gap-4">
          {Object.entries(LEADER.socials).map(([platform, url]) =>
            url && url !== "#" ? (
              <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-lg border border-lab-accent/30 bg-lab-blue/30 flex items-center justify-center text-lab-ice/70 hover:text-lab-accent hover:border-lab-accent hover:bg-lab-accent/10 transition-all duration-300 hover:shadow-lg hover:shadow-lab-accent/20" aria-label={platform}>
                <FontAwesomeIcon icon={platform === "github" ? faGithub : platform === "linkedin" ? faLinkedin : faTwitter} className="text-lg" />
              </a>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT (DEFAULT EXPORT REQUIRED FOR Next.js App Router)
// ============================================================================

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<"mission" | "vision" | "values">("mission");

  return (
    <section id="about" className="relative py-32 bg-lab-navy overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-lab-navy via-lab-blue/10 to-lab-navy" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-lab-accent/5 blur-[120px] pointer-events-none" />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="font-mono text-xs uppercase tracking-widest text-lab-accent mb-4">~/about</p>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-lab-ice mb-6 uppercase leading-tight">
            The Software Partner Behind <span className="text-lab-accent">Growing Businesses</span>
          </h1>
          <p className="text-xl text-lab-ice/70 leading-relaxed mb-6">
            SoftwareLabs is a business software platform and engineering partner — we build, ship, and support the systems companies run on, so founders and teams can focus on customers instead of infrastructure.
          </p>
          <p className="text-sm text-lab-ice/50 font-mono">🇮🇳 Headquartered in Chandigarh, India — serving businesses worldwide</p>
        </div>

        {/* Trust bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-32">
          {TRUST_POINTS.map((point, index) => (
            <TrustCard key={point.title} point={point} index={index} />
          ))}
        </div>

        {/* Mission/Vision/Values Tabs */}
        <div className="mb-32">
          <SectionHeading path="philosophy" lines={["Our", "Philosophy"]} tone="dark" className="mb-12" />
          <div className="flex gap-4 mb-12">
            {(["mission", "vision", "values"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-semibold capitalize transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-lab-accent text-lab-navy shadow-lg shadow-lab-accent/30"
                    : "bg-lab-blue/30 text-lab-ice/70 border border-lab-accent/20 hover:border-lab-accent/40"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-8 rounded-2xl bg-lab-blue/20 border border-lab-accent/20 backdrop-blur-sm">
            {activeTab === "mission" && (
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-lab-ice mb-4">Our Mission</h3>
                  <p className="text-lab-ice/70 leading-relaxed mb-6">To give growing businesses production-grade software and the team behind it — without the cost and time of building an engineering org from scratch.</p>
                  <ul className="space-y-3">
                    {["Launch platforms 10x faster than an in-house build", "Get a real engineering team, not a ticket queue", "Scale on architecture built for growth from day one"].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <FontAwesomeIcon icon={faCheckCircle} className="text-lab-accent mt-1" />
                        <span className="text-lab-ice/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-center">
                  <FontAwesomeIcon icon={faRocket} className="text-9xl text-lab-accent/20" />
                </div>
              </div>
            )}

            {activeTab === "vision" && (
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-lab-ice mb-4">Our Vision</h3>
                  <p className="text-lab-ice/70 leading-relaxed mb-6">A world where any business, anywhere, can run on software that's fast, secure, and built to last — backed by a partner that treats their product like its own.</p>
                  <ul className="space-y-3">
                    {["Become the go-to software partner for 1,000+ businesses", "Set the standard for delivery speed and support quality", "Bridge the gap between a great idea and a shipped product"].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <FontAwesomeIcon icon={faCheckCircle} className="text-lab-accent mt-1" />
                        <span className="text-lab-ice/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-center">
                  <FontAwesomeIcon icon={faLightbulb} className="text-9xl text-lab-accent/20" />
                </div>
              </div>
            )}

            {activeTab === "values" && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {PRINCIPLES.map((principle, index) => {
                  const IconComponent = principle.icon;
                  return (
                    <div key={principle.name} className="p-6 rounded-xl bg-lab-navy/50 border border-lab-accent/20 hover:border-lab-accent/40 transition-all duration-300 group" style={{ animationDelay: `${index * 50}ms` }}>
                      <IconComponent className="w-8 h-8 text-lab-accent mb-4 group-hover:scale-110 transition-transform duration-300" />
                      <h4 className="font-bold text-lab-ice mb-2">{principle.name}</h4>
                      <p className="text-sm text-lab-ice/60 leading-relaxed">{principle.text}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* The Platform */}
        <div className="mb-32">
          <SectionHeading path="platform" lines={["The", "Platform"]} tone="dark" className="mb-12" />
          <div className="grid md:grid-cols-2 gap-6">
            {PLATFORM_PILLARS.map((pillar, index) => (
              <PlatformPillarCard key={pillar.title} pillar={pillar} index={index} />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-32">
          <SectionHeading path="stats" lines={["By the", "Numbers"]} tone="dark" className="mb-12" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat) => (
              <StatsCounter key={stat.label} end={parseInt(stat.value) || 0} suffix={stat.value.includes("+") ? "+" : ""} label={stat.label} />
            ))}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {ACHIEVEMENTS.map((achievement, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-lab-blue/20 border border-lab-accent/20 backdrop-blur-sm hover:border-lab-accent/40 transition-all duration-300">
                <FontAwesomeIcon icon={achievement.icon} className="text-4xl text-lab-accent mb-4" />
                <div className="text-3xl font-bold text-lab-ice mb-1">{achievement.value}</div>
                <div className="text-sm font-medium text-lab-ice/80 mb-1">{achievement.label}</div>
                <div className="text-xs text-lab-ice/50">{achievement.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-32">
          <SectionHeading path="journey" lines={["Our", "Journey"]} tone="dark" className="mb-12" />
          <div className="relative">
            {MILESTONES.map((milestone, index) => (
              <TimelineItem key={milestone.year} milestone={milestone} index={index} isLast={index === MILESTONES.length - 1} />
            ))}
          </div>
        </div>

        {/* Leadership */}
        <div className="mb-32">
          <SectionHeading path="leadership" lines={["Meet the", "Founder"]} tone="dark" className="mb-12" />
          <LeadershipCard />
        </div>

        {/* Testimonials */}
        <div className="mb-32">
          <SectionHeading path="testimonials" lines={["Trusted", "By Teams"]} tone="dark" className="mb-12" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="mb-32">
          <SectionHeading path="process" lines={["How We", "Deliver"]} tone="dark" className="mb-12" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={step.n} className="relative p-6 rounded-xl bg-lab-blue/20 border border-lab-accent/20 backdrop-blur-sm hover:border-lab-accent/40 transition-all duration-300 group" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="text-4xl font-bold text-lab-accent/20 absolute top-4 right-4 group-hover:text-lab-accent/40 transition-colors duration-300">{step.n}</div>
                  <div className="mb-4">
                    <IconComponent className="w-8 h-8 text-lab-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-lab-ice mb-2">{step.title}</h3>
                  <p className="text-sm text-lab-ice/70 mb-4">{step.text}</p>
                  <div className="pt-4 border-t border-lab-accent/20">
                    <span className="text-xs font-mono text-lab-accent">Output: {step.output}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative p-12 sm:p-20 rounded-3xl bg-gradient-to-br from-lab-blue/40 via-lab-navy to-lab-blue/40 border border-lab-accent/30 overflow-hidden">
          <div className="absolute inset-0 bg-lab-accent/5 blur-[100px]" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-lab-accent/10 blur-[120px] rounded-full" />
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold text-lab-ice mb-6">
              Ready to Build Your <span className="text-lab-accent">Business Platform</span>?
            </h2>
            <p className="text-xl text-lab-ice/70 mb-10 leading-relaxed">
              Talk to our team about your product, timeline, and budget — and get a plan for how SoftwareLabs can ship it with you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-lab-accent text-lab-navy font-bold hover:bg-lab-ice transition-all duration-300 hover:shadow-xl hover:shadow-lab-accent/30 hover:scale-105">
                <FontAwesomeIcon icon={faEnvelope} /> Talk to Our Team
              </a>
              <a href="#products" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-lab-accent/40 bg-lab-blue/30 text-lab-ice font-semibold hover:border-lab-accent hover:bg-lab-blue/50 transition-all duration-300">
                <FontAwesomeIcon icon={faLayerGroup} /> Explore the Platform
              </a>
            </div>
            <p className="mt-8 text-xs text-lab-ice/40 font-mono">Built with ❤️ in Chandigarh, India — by SoftwareLabs</p>
          </div>
        </div>
      </Container>
    </section>
  );
}