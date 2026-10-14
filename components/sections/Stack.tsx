"use client";

import { Container, SectionHeading } from "@/components/ui";
import { STACK } from "@/lib/content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faCode } from "@fortawesome/free-solid-svg-icons";

const OpenAIIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.2819 9.8211a5.5267 5.5267 0 0 0-.4736-4.5548 5.5934 5.5934 0 0 0-6.012-2.6837A5.5377 5.5377 0 0 0 11.6168.5a5.5934 5.5934 0 0 0-5.3364 3.8764 5.5377 5.5377 0 0 0-3.6987 2.6837 5.5934 5.5934 0 0 0 .687 6.3445 5.5377 5.5377 0 0 0 .4736 4.5548 5.5934 5.5934 0 0 0 6.012 2.6837A5.5377 5.5377 0 0 0 13.3832 23.5a5.5934 5.5934 0 0 0 5.3364-3.8764 5.5377 5.5377 0 0 0 3.6987-2.6837 5.5934 5.5934 0 0 0-.6877-7.1188ZM13.3832 21.7a3.7044 3.7044 0 0 1-2.3728-.8558l.1176-.0671 3.9401-2.2755a.9544.9544 0 0 0 .4736-.8212v-5.5577l1.6647.9622a.0864.0864 0 0 1 .0472.0671v4.6019a3.7097 3.7097 0 0 1-3.8704 3.9461ZM5.4186 18.3a3.701 3.701 0 0 1-3.7073-3.2457 3.656 3.656 0 0 1 .3726-2.2624l.1176.0707 3.9401 2.2755a.9544.9544 0 0 0 .9472 0l4.8137-2.7791v1.9244a.0864.0864 0 0 1-.0353.0707L7.8277 16.65A3.7044 3.7044 0 0 1 5.4186 18.3ZM4.3842 6.5a3.7044 3.7044 0 0 1 3.8704-3.9461 3.656 3.656 0 0 1 2.1305.687l-.1176.0671-3.9401 2.2755a.9544.9544 0 0 0-.4736.8212v5.5577l-1.6647-.9622a.0864.0864 0 0 1-.0472-.0671V6.5Zm13.5449 3.15-4.8137-2.7791V4.9465a.0864.0864 0 0 1 .0353-.0707l3.7401-2.1598a3.7044 3.7044 0 0 1 5.5524 3.1962 3.656 3.656 0 0 1-.3726 2.2624l-.1176-.0707-4.0231-2.3227Zm-7.1817 4.0677-2.0265-1.1702V10.207l2.0265-1.1702 2.0265 1.1702v2.3405l-2.0265 1.1702Zm9.8917 2.0362a3.7044 3.7044 0 0 1-1.8552 3.1998v-.1342l-.0001-4.5519a.9544.9544 0 0 0-.4736-.8212l-4.8137-2.7791 1.6647-.9622a.0864.0864 0 0 1 .0825 0l3.9401 2.2755a3.7044 3.7044 0 0 1 1.4547 3.7733ZM6.401 9.375l-1.6647.9622V8.4128a.0864.0864 0 0 1 .0353-.0707l3.9401-2.2755a3.7044 3.7044 0 0 1 3.7073 0l1.6647.9622-3.9401 2.2755a.9544.9544 0 0 0-.4736.8212v5.5577l-1.6647-.9622a.0864.0864 0 0 1-.0472-.0671V9.375Z"
      fill="currentColor"
    />
  </svg>
);


import {
  siNextdotjs,
  siReact,
  siTypescript,
  siTailwindcss,
  siNodedotjs,
  siPython,
  siDocker,
  siGithub,
  siVercel,
  siSupabase,
  siPostgresql,
  siStripe,
  siRedis,
  siPrisma,
  siFramer,
  siCloudflare,
} from "simple-icons";

const BrandIcon = ({
  name,
  className,
}: {
  name: string;
  className?: string;
}) => {
  const n = name.toLowerCase();

  const brands = [
    { match: () => n.includes("next"), icon: siNextdotjs },
    { match: () => n.includes("react"), icon: siReact },
    { match: () => n.includes("type"), icon: siTypescript },
    { match: () => n.includes("tailwind"), icon: siTailwindcss },
    { match: () => n.includes("node"), icon: siNodedotjs },
    { match: () => n.includes("python"), icon: siPython },
    { match: () => n.includes("docker"), icon: siDocker },
    { match: () => n.includes("github"), icon: siGithub },
    { match: () => n.includes("vercel"), icon: siVercel },
    { match: () => n.includes("supabase"), icon: siSupabase },
    {
      match: () => n.includes("postgres") || n.includes("sql"),
      icon: siPostgresql,
    },
    { match: () => n.includes("stripe"), icon: siStripe },
    { match: () => n.includes("openai"), icon: OpenAIIcon },
    { match: () => n.includes("redis"), icon: siRedis },
    { match: () => n.includes("prisma"), icon: siPrisma },
    { match: () => n.includes("framer"), icon: siFramer },
    { match: () => n.includes("cloudflare"), icon: siCloudflare },
  ];

  const brand = brands.find((item) => item.match());

  if (!brand) return null;

  if (typeof brand.icon === "function") {
    const Icon = brand.icon;
    return <Icon className={className} />;
  }

  return (
    <svg
      className={className}
      role="img"
      aria-label={brand.icon.title}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={brand.icon.path} />
    </svg>
  );
};


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

        {/* Simple, clean grid without any distracting tabs or search */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {STACK.map((tech, i) => {
            const CustomIcon = BrandIcon({ name: tech.name, className: "size-6" });
            
            return (
              <div
                key={tech.name}
                data-reveal
                style={{ ["--d" as string]: `${i * 30}ms` }}
                className="group relative flex items-center gap-3 rounded-xl border border-lab-accent/10 bg-lab-blue/10 p-4 backdrop-blur-sm transition-all duration-300 hover:border-lab-accent/30 hover:bg-lab-blue/20 hover:-translate-y-1 hover:shadow-xl hover:shadow-lab-accent/5"
              >
                {/* Bulletproof Icon Rendering Logic */}
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-lab-accent/20 bg-lab-navy text-lab-ice transition-all duration-300 group-hover:border-lab-accent group-hover:bg-lab-accent group-hover:text-lab-navy group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-lab-accent/20">
                  {CustomIcon ? (
                    CustomIcon
                  ) : typeof tech.icon === 'function' ? (
                    <tech.icon className="size-5" />
                  ) : (
                    <FontAwesomeIcon icon={faCode} className="size-5" />
                  )}
                </div>
                
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-lab-ice transition-colors duration-300 group-hover:text-white">
                    {tech.name}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-lab-ice/40 transition-colors duration-300 group-hover:text-lab-accent">
                    {tech.kind}
                  </p>
                </div>

                {/* Laptop Feature: "Visit" Action on Hover */}
                <div className="absolute right-3 top-3 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2">
                  <FontAwesomeIcon 
                    icon={faArrowUpRightFromSquare} 
                    className="size-3 text-lab-accent/60 hover:text-lab-accent cursor-pointer" 
                  />
                </div>

                {/* Subtle Hover Glow */}
                <div className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none shadow-[inset_0_0_20px_-5px_rgba(99,102,241,0.15)]" />
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}