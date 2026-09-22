"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faTwitter,
  faProductHunt,
} from "@fortawesome/free-brands-svg-icons";
import {
  faArrowRight,
  faCode,
  faRocket,
  faLightbulb,
  faUsers,
  faAward,
  faChartLine,
  faShieldAlt,
  faInfinity,
  faCheckCircle,
  faQuoteLeft,
  faEnvelope,
  faMapMarkerAlt,
  faCalendar,
  faGraduationCap,
  faBriefcase,
  faHeart,
  faStar,
  faTrophy,
  faGem,
  faFire,
  faBolt, // Replaced faZap with faBolt
  faBrain,
  faLaptopCode,
  faCloud,
  faDatabase,
  faMobileAlt,
  faPalette,
  faCog,
  faLayerGroup,
  faProjectDiagram,
  faCodeBranch,
  faTerminal,
  faServer,
  faMicrochip,
  faUser,
  faSearch,
  faCogs,
  faBug,
} from "@fortawesome/free-solid-svg-icons";
import { Container, SectionHeading } from "@/components/ui";
import { SITE } from "@/lib/site";
import { PRINCIPLES, STEPS, STATS } from "@/lib/content";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  skills: string[];
}

interface Milestone {
  year: string;
  title: string;
  description: string;
  icon: any; // Font Awesome icon
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
}

interface ProductCategory {
  title: string;
  description: string;
  icon: any; // Font Awesome icon
  items: string[];
  color: string;
}

// ============================================================================
// DATA CONSTANTS
// ============================================================================

const FOUNDER: TeamMember = {
  name: "Paras Dhiman",
  role: "Founder & Lead Engineer",
  bio: "Passionate software engineer and entrepreneur with a vision to democratize access to production-grade code. Paras founded SoftwareLabs to bridge the gap between idea and execution, providing developers and businesses with the tools they need to ship faster.",
  image: "/icon.svg", // TODO: Add actual image
  socials: {
    github: SITE.github,
    linkedin: SITE.socials.linkedin,
    twitter: SITE.socials.twitter,
  },
  skills: [
    "Full-Stack Development",
    "System Architecture",
    "AI/ML Integration",
    "DevOps",
    "Product Strategy",
    "Open Source",
  ],
};

const MILESTONES: Milestone[] = [
  {
    year: "2024",
    title: "SoftwareLabs Founded",
    description: "Paras Dhiman establishes SoftwareLabs with a mission to engineer exceptional digital products and developer tools.",
    icon: faRocket,
  },
  {
    year: "2024",
    title: "First Products Launched",
    description: "Released initial suite of premium source code products and developer tools, gaining traction in the community.",
    icon: faCode,
  },
  {
    year: "2025",
    title: "AI Integration",
    description: "Expanded offerings to include AI-powered systems and workflows, staying ahead of the technology curve.",
    icon: faBrain,
  },
  {
    year: "2026",
    title: "Global Recognition",
    description: "Reached 10+ shipped projects and established SoftwareLabs as a trusted name in premium software engineering.",
    icon: faTrophy,
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "SoftwareLabs delivered beyond our expectations. The code quality and architecture were exceptional, setting a new standard for our development team.",
    author: "Sarah Chen",
    role: "CTO",
    company: "TechVentures Inc.",
    rating: 5,
  },
  {
    quote: "The source code templates from SoftwareLabs saved us months of development time. Clean, well-documented, and production-ready.",
    author: "Marcus Johnson",
    role: "Lead Developer",
    company: "StartupXYZ",
    rating: 5,
  },
  {
    quote: "Working with Paras and the SoftwareLabs team was a game-changer. Their expertise in AI integration helped us launch our product 3x faster.",
    author: "Emily Rodriguez",
    role: "Product Manager",
    company: "InnovateLabs",
    rating: 5,
  },
];

const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    title: "Web Applications",
    description: "Full-stack, production-ready web applications built with modern technologies and best practices.",
    icon: faLaptopCode,
    items: ["SaaS Platforms", "E-commerce Solutions", "Dashboard Systems", "Real-time Applications"],
    color: "from-blue-500 to-cyan-400",
  },
  {
    title: "Source Code",
    description: "Premium, reusable codebases and boilerplates designed to accelerate your development workflow.",
    icon: faCode,
    items: ["Next.js Templates", "React Components", "TypeScript Utilities", "API Boilerplates"],
    color: "from-purple-500 to-pink-400",
  },
  {
    title: "Developer Tools",
    description: "CLI tools, SDKs, and utilities that make developers more productive and efficient.",
    icon: faTerminal,
    items: ["CLI Applications", "Build Tools", "Code Generators", "Testing Frameworks"],
    color: "from-green-500 to-emerald-400",
  },
  {
    title: "AI Systems",
    description: "Intelligent applications powered by cutting-edge AI and machine learning technologies.",
    icon: faBrain,
    items: ["Chatbot Systems", "RAG Applications", "AI Workflows", "ML Pipelines"],
    color: "from-orange-500 to-red-400",
  },
];

const ACHIEVEMENTS = [
  {
    icon: faCode,
    value: "50K+",
    label: "Lines of Code Written",
    description: "Clean, tested, production-ready",
  },
  {
    icon: faUsers,
    value: "1000+",
    label: "Developers Served",
    description: "Across 30+ countries",
  },
  {
    icon: faAward,
    value: "100%",
    label: "Client Satisfaction",
    description: "5-star rated delivery",
  },
  {
    icon: faBolt, // Fixed: Replaced faZap with faBolt
    value: "10x",
    label: "Faster Delivery",
    description: "Compared to industry average",
  },
];

// ============================================================================
// COMPONENT: StatsCounter (Animated Counter)
// ============================================================================

interface StatsCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  label: string;
}

function StatsCounter({ end, suffix = "", prefix = "", duration = 2000, label }: StatsCounterProps) {
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

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [isVisible, end, duration]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    const element = document.getElementById(`stats-${label}`);
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, [label]);

  return (
    <div
      id={`stats-${label}`}
      className="text-center p-6 rounded-xl bg-lab-blue/20 border border-lab-accent/20 backdrop-blur-sm transition-all duration-300 hover:border-lab-accent/40 hover:shadow-lg hover:shadow-lab-accent/10"
    >
      <div className="text-4xl sm:text-5xl font-bold text-lab-ice mb-2">
        {prefix}
        {count}
        {suffix}
      </div>
      <div className="text-sm text-lab-ice/60 font-medium">{label}</div>
    </div>
  );
}

// ============================================================================
// COMPONENT: SkillBar (Animated Progress Bar)
// ============================================================================

interface SkillBarProps {
  skill: string;
  level: number;
  delay?: number;
}

function SkillBar({ skill, level, delay = 0 }: SkillBarProps) {
  const [width, setWidth] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => setWidth(level), delay);
    return () => clearTimeout(timer);
  }, [isVisible, level, delay]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    const element = document.getElementById(`skill-${skill}`);
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, [skill]);

  return (
    <div id={`skill-${skill}`} className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-lab-ice">{skill}</span>
        <span className="text-sm text-lab-accent">{level}%</span>
      </div>
      <div className="h-2 bg-lab-navy rounded-full overflow-hidden border border-lab-accent/20">
        <div
          className="h-full bg-gradient-to-r from-lab-accent to-blue-400 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENT: TimelineItem
// ============================================================================

interface TimelineItemProps {
  milestone: Milestone;
  index: number;
  isLast: boolean;
}

function TimelineItem({ milestone, index, isLast }: TimelineItemProps) {
  return (
    <div className="relative pl-8 sm:pl-32 py-6 group">
      {!isLast && (
        <div className="absolute left-0 sm:left-40 top-0 bottom-0 w-px bg-gradient-to-b from-lab-accent/50 to-transparent" />
      )}
      <div className="absolute left-0 sm:left-0 top-8 w-24 sm:w-32">
        <span className="inline-block px-3 py-1 rounded-full bg-lab-accent/20 border border-lab-accent/40 text-lab-accent text-sm font-mono font-bold">
          {milestone.year}
        </span>
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

// ============================================================================
// COMPONENT: TestimonialCard
// ============================================================================

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  return (
    <div
      className="p-8 rounded-2xl bg-lab-blue/20 border border-lab-accent/20 backdrop-blur-sm hover:border-lab-accent/40 transition-all duration-300 hover:shadow-xl hover:shadow-lab-accent/10 group"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <FontAwesomeIcon icon={faQuoteLeft} className="text-4xl text-lab-accent/20 mb-4 group-hover:text-lab-accent/40 transition-colors duration-300" />
      <div className="flex gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400 text-sm" />
        ))}
      </div>
      <p className="text-lab-ice/80 leading-relaxed mb-6 italic">"{testimonial.quote}"</p>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-lab-accent to-blue-500 flex items-center justify-center text-lab-navy font-bold">
          {testimonial.author.charAt(0)}
        </div>
        <div>
          <div className="font-semibold text-lab-ice">{testimonial.author}</div>
          <div className="text-sm text-lab-ice/50">{testimonial.role} at {testimonial.company}</div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENT: ProductCategoryCard
// ============================================================================

interface ProductCategoryCardProps {
  category: ProductCategory;
  index: number;
}

function ProductCategoryCard({ category, index }: ProductCategoryCardProps) {
  return (
    <div
      className="relative p-8 rounded-2xl bg-lab-blue/20 border border-lab-accent/20 backdrop-blur-sm overflow-hidden group hover:border-lab-accent/40 transition-all duration-500"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
        <FontAwesomeIcon icon={category.icon} className="text-2xl text-white" />
      </div>
      <h3 className="text-2xl font-bold text-lab-ice mb-3">{category.title}</h3>
      <p className="text-lab-ice/70 mb-6 leading-relaxed">{category.description}</p>
      <ul className="space-y-2">
        {category.items.map((item, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-lab-ice/60 group-hover:text-lab-ice/80 transition-colors duration-300">
            <FontAwesomeIcon icon={faCheckCircle} className="text-lab-accent text-xs" />
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex items-center gap-2 text-lab-accent opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
        <span className="text-sm font-semibold">Explore</span>
        <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENT: FounderCard
// ============================================================================

function FounderCard() {
  const skills = [
    { name: "Full-Stack Development", level: 95 },
    { name: "System Architecture", level: 90 },
    { name: "AI/ML Integration", level: 85 },
    { name: "DevOps & Cloud", level: 88 },
    { name: "Product Strategy", level: 92 },
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div className="relative">
        <div className="absolute inset-0 bg-lab-accent/20 blur-[100px] rounded-full" />
        <div className="relative z-10 aspect-square rounded-2xl overflow-hidden border-2 border-lab-accent/30 shadow-2xl shadow-lab-accent/20">
          <div className="w-full h-full bg-gradient-to-br from-lab-blue via-lab-navy to-lab-blue flex items-center justify-center">
            <div className="text-center p-8">
              <FontAwesomeIcon icon={faUser} className="text-8xl text-lab-accent/40 mb-4" />
              <p className="text-lab-ice/60 font-mono text-sm">{FOUNDER.name}</p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-lab-navy to-transparent">
            <div className="flex gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-lab-ice">5+</div>
                <div className="text-xs text-lab-ice/60">Years Exp.</div>
              </div>
              <div className="w-px bg-lab-accent/30" />
              <div>
                <div className="text-2xl font-bold text-lab-ice">50+</div>
                <div className="text-xs text-lab-ice/60">Projects</div>
              </div>
              <div className="w-px bg-lab-accent/30" />
              <div>
                <div className="text-2xl font-bold text-lab-ice">100%</div>
                <div className="text-xs text-lab-ice/60">Commitment</div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -top-4 -right-4 z-20 px-4 py-2 rounded-lg bg-lab-accent text-lab-navy font-bold shadow-lg shadow-lab-accent/30 animate-pulse">
          Founder
        </div>
      </div>

      <div>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lab-blue/40 border border-lab-accent/30 text-lab-accent text-sm font-mono mb-6">
          <FontAwesomeIcon icon={faStar} className="text-xs" />
          Meet the Founder
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold text-lab-ice mb-4">{FOUNDER.name}</h2>
        <p className="text-xl text-lab-accent mb-6 font-medium">{FOUNDER.role}</p>
        <p className="text-lab-ice/70 leading-relaxed mb-8">{FOUNDER.bio}</p>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-lab-ice mb-6 flex items-center gap-2">
            <FontAwesomeIcon icon={faCode} className="text-lab-accent" />
            Core Expertise
          </h3>
          {skills.map((skill, index) => (
            <SkillBar key={skill.name} skill={skill.name} level={skill.level} delay={index * 100} />
          ))}
        </div>

        <div className="flex gap-4">
          {Object.entries(FOUNDER.socials).map(([platform, url]) =>
            url && url !== "#" ? (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-lg border border-lab-accent/30 bg-lab-blue/30 flex items-center justify-center text-lab-ice/70 hover:text-lab-accent hover:border-lab-accent hover:bg-lab-accent/10 transition-all duration-300 hover:shadow-lg hover:shadow-lab-accent/20"
                aria-label={platform}
              >
                <FontAwesomeIcon
                  icon={platform === "github" ? faGithub : platform === "linkedin" ? faLinkedin : faTwitter}
                  className="text-lg"
                />
              </a>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT: About
// ============================================================================

export function About() {
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
            About <span className="text-lab-accent">SoftwareLabs</span>
          </h1>
          <p className="text-xl text-lab-ice/70 leading-relaxed">
            We engineer exceptional digital products and developer tools that empower builders to ship faster, scale smarter, and innovate fearlessly.
          </p>
        </div>

        {/* Founder Section */}
        <div className="mb-32">
          <SectionHeading path="founder" lines={["Meet the", "Founder"]} tone="dark" className="mb-12" />
          <FounderCard />
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
                  <p className="text-lab-ice/70 leading-relaxed mb-6">
                    To democratize access to production-grade software by providing developers and businesses with premium tools, templates, and expertise that accelerate development and eliminate technical debt.
                  </p>
                  <ul className="space-y-3">
                    {["Ship 10x faster with our proven boilerplates", "Learn from production-ready code examples", "Build with confidence using tested patterns"].map((item, i) => (
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
                  <p className="text-lab-ice/70 leading-relaxed mb-6">
                    A world where every developer has access to the tools and knowledge needed to build exceptional software, and where technical excellence is the standard, not the exception.
                  </p>
                  <ul className="space-y-3">
                    {["Empower 1 million developers by 2030", "Set new standards for code quality", "Bridge the gap between learning and shipping"].map((item, i) => (
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
                  // FIX: Render Lucide icon from lib/content as a React component, not FontAwesome
                  const IconComponent = principle.icon;
                  return (
                    <div
                      key={principle.name}
                      className="p-6 rounded-xl bg-lab-navy/50 border border-lab-accent/20 hover:border-lab-accent/40 transition-all duration-300 group"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
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

        {/* What We Build */}
        <div className="mb-32">
          <SectionHeading path="products" lines={["What We", "Build"]} tone="dark" className="mb-12" />
          <div className="grid md:grid-cols-2 gap-6">
            {PRODUCT_CATEGORIES.map((category, index) => (
              <ProductCategoryCard key={category.title} category={category} index={index} />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-32">
          <SectionHeading path="stats" lines={["By the", "Numbers"]} tone="dark" className="mb-12" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat) => (
              <StatsCounter
                key={stat.label}
                end={parseInt(stat.value) || 0}
                suffix={stat.value.includes("+") ? "+" : ""}
                label={stat.label}
              />
            ))}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {ACHIEVEMENTS.map((achievement, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-lab-blue/20 border border-lab-accent/20 backdrop-blur-sm hover:border-lab-accent/40 transition-all duration-300"
              >
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

        {/* Tech Stack */}
        <div className="mb-32">
          <SectionHeading path="stack" lines={["Tech", "Stack"]} tone="dark" className="mb-12" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {["Nx", "Re", "Ts", "Nd", "Cf", "Sb", "Pg", "Py", "Tw", "Gh", "Ai", "Dk"].map((tech, index) => (
              <div
                key={tech}
                className="group p-6 rounded-xl bg-lab-blue/20 border border-lab-accent/20 text-center hover:border-lab-accent/40 hover:bg-lab-accent/10 transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="text-2xl font-bold text-lab-accent mb-1 group-hover:scale-110 transition-transform duration-300">{tech}</div>
                <div className="text-sm font-medium text-lab-ice mb-1">Technology</div>
                <div className="text-xs text-lab-ice/50">Stack</div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-32">
          <SectionHeading path="testimonials" lines={["Client", "Stories"]} tone="dark" className="mb-12" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="mb-32">
          <SectionHeading path="process" lines={["How We", "Work"]} tone="dark" className="mb-12" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, index) => {
              // FIX: Render Lucide icon from lib/content as a React component, not FontAwesome
              const IconComponent = step.icon;
              return (
                <div
                  key={step.n}
                  className="relative p-6 rounded-xl bg-lab-blue/20 border border-lab-accent/20 backdrop-blur-sm hover:border-lab-accent/40 transition-all duration-300 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-4xl font-bold text-lab-accent/20 absolute top-4 right-4 group-hover:text-lab-accent/40 transition-colors duration-300">
                    {step.n}
                  </div>
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
              Ready to Build Something <span className="text-lab-accent">Amazing</span>?
            </h2>
            <p className="text-xl text-lab-ice/70 mb-10 leading-relaxed">
              Let's collaborate to bring your vision to life with production-grade code, modern architecture, and relentless attention to detail.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-lab-accent text-lab-navy font-bold hover:bg-lab-ice transition-all duration-300 hover:shadow-xl hover:shadow-lab-accent/30 hover:scale-105"
              >
                <FontAwesomeIcon icon={faEnvelope} />
                Get in Touch
              </a>
              <a
                href="#products"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-lab-accent/40 bg-lab-blue/30 text-lab-ice font-semibold hover:border-lab-accent hover:bg-lab-blue/50 transition-all duration-300"
              >
                <FontAwesomeIcon icon={faCode} />
                View Products
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}