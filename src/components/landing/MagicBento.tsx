"use client";

import { useRef, useEffect, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import './MagicBento.css';

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = '139, 92, 246'; // violet-500 rgb
const MOBILE_BREAKPOINT = 768;

// Card visual components — one per feature
const CardVisuals: Record<number, () => React.ReactNode> = {
  // ATS Score Analyzer — circular score gauge + keyword bars
  0: () => (
    <div className="flex flex-col gap-3 mt-3 mb-4">
      <div className="flex items-center gap-4">
        <div className="relative w-20 h-20 flex-shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="34" stroke="#e4e4e7" strokeWidth="8" fill="none" />
            <circle cx="40" cy="40" r="34" stroke="#8b5cf6" strokeWidth="8" fill="none"
              strokeDasharray="213.6" strokeDashoffset="34" strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-zinc-900">94</span>
            <span className="text-[9px] text-zinc-500 font-medium">SCORE</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          {[["Keywords", "90%", "bg-violet-500"], ["Format", "72%", "bg-blue-400"], ["Skills", "85%", "bg-emerald-400"]].map(([label, w, color]) => (
            <div key={label}>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-zinc-500">{label}</span>
                <span className="font-semibold text-zinc-700">{w}</span>
              </div>
              <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                <div className={`h-full ${color} rounded-full`} style={{ width: w }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        {["Python", "SQL", "React", "AWS"].map(k => (
          <span key={k} className="px-2 py-0.5 bg-violet-50 text-violet-600 text-[10px] font-semibold rounded-full border border-violet-100">{k}</span>
        ))}
      </div>
    </div>
  ),
  // AI Enhancement — before/after text transform
  1: () => (
    <div className="mt-3 mb-4 space-y-2">
      <div className="p-2.5 rounded-xl bg-red-50 border border-red-100">
        <div className="text-[10px] font-bold text-red-400 uppercase tracking-wider mb-1">Before</div>
        <p className="text-xs text-red-400 line-through leading-relaxed">Helped team with data stuff and made things faster</p>
      </div>
      <div className="flex justify-center">
        <div className="w-7 h-7 rounded-full bg-violet-500 flex items-center justify-center shadow-md shadow-violet-200">
          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
        </div>
      </div>
      <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100">
        <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider mb-1">After AI</div>
        <p className="text-xs text-emerald-700 font-medium leading-relaxed">Engineered data pipelines processing 10TB/day, reducing query time by 60% saving $40K annually</p>
      </div>
    </div>
  ),
  // Bullet Rewriter — list of rewrites
  2: () => (
    <div className="mt-3 mb-4 space-y-2">
      {[
        { weak: "Did reports", strong: "Authored 12 executive reports" },
        { weak: "Helped customers", strong: "Resolved 200+ tickets/month" },
        { weak: "Worked on code", strong: "Shipped 45 features to prod" },
      ].map((item, i) => (
        <div key={i} className="flex items-start gap-2">
          <span className="mt-0.5 w-4 h-4 flex-shrink-0 rounded-full bg-violet-100 flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
          </span>
          <div>
            <p className="text-[10px] text-zinc-400 line-through">{item.weak}</p>
            <p className="text-[11px] text-zinc-700 font-medium">{item.strong}</p>
          </div>
        </div>
      ))}
    </div>
  ),
  // Formatting Fixer — resume layout skeleton
  3: () => (
    <div className="mt-3 mb-4 bg-zinc-50 rounded-xl border border-zinc-100 p-3 space-y-2">
      <div className="flex gap-2 items-center">
        <div className="w-8 h-8 rounded-full bg-violet-200 flex-shrink-0" />
        <div className="space-y-1 flex-1">
          <div className="h-2 bg-zinc-300 rounded w-3/4" />
          <div className="h-1.5 bg-zinc-200 rounded w-1/2" />
        </div>
        <div className="text-[9px] font-bold text-violet-500 bg-violet-50 px-1.5 py-0.5 rounded">Fixed</div>
      </div>
      <div className="h-px bg-zinc-200" />
      {[75, 90, 60, 80].map((w, i) => (
        <div key={i} className="flex gap-2 items-center">
          <div className="w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
          <div className="h-1.5 bg-zinc-200 rounded" style={{ width: `${w}%` }} />
        </div>
      ))}
    </div>
  ),
  // Job Tracker — kanban-style mini board
  4: () => (
    <div className="mt-3 mb-4 grid grid-cols-3 gap-1.5 text-center">
      {[
        { label: "Applied", count: 12, color: "bg-blue-50 border-blue-100 text-blue-600" },
        { label: "Interview", count: 5, color: "bg-amber-50 border-amber-100 text-amber-600" },
        { label: "Offer", count: 2, color: "bg-emerald-50 border-emerald-100 text-emerald-600" },
      ].map(c => (
        <div key={c.label} className={`rounded-xl border p-2 ${c.color}`}>
          <div className="text-xl font-bold">{c.count}</div>
          <div className="text-[9px] font-semibold uppercase tracking-wider opacity-75">{c.label}</div>
        </div>
      ))}
      <div className="col-span-3 mt-1 space-y-1">
        {[{ co: "Google", role: "SWE II", status: "Interview", dot: "bg-amber-400" }, { co: "Stripe", role: "PM", status: "Offer", dot: "bg-emerald-400" }].map(j => (
          <div key={j.co} className="flex items-center justify-between rounded-lg bg-zinc-50 border border-zinc-100 px-2.5 py-1.5">
            <div className="flex items-center gap-1.5">
              <div className={`w-1.5 h-1.5 rounded-full ${j.dot}`} />
              <span className="text-[11px] font-semibold text-zinc-700">{j.co}</span>
              <span className="text-[10px] text-zinc-400">{j.role}</span>
            </div>
            <span className="text-[9px] font-bold text-zinc-500">{j.status}</span>
          </div>
        ))}
      </div>
    </div>
  ),
  // Job Description Tailoring — match percentage + keywords
  5: () => (
    <div className="mt-3 mb-4 space-y-2.5">
      <div className="flex items-center gap-3 p-2.5 rounded-xl bg-violet-50 border border-violet-100">
        <div className="relative w-14 h-14 flex-shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r="22" stroke="#ede9fe" strokeWidth="6" fill="none" />
            <circle cx="28" cy="28" r="22" stroke="#7c3aed" strokeWidth="6" fill="none"
              strokeDasharray="138.2" strokeDashoffset="22" strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold text-violet-700">84%</span>
          </div>
        </div>
        <div>
          <p className="text-xs font-bold text-violet-700">JD Match Score</p>
          <p className="text-[10px] text-violet-500 mt-0.5">Senior Product Manager @ Meta</p>
        </div>
      </div>
      <div>
        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Missing Keywords Added</p>
        <div className="flex flex-wrap gap-1">
          {["Roadmap", "OKRs", "A/B Testing", "Agile", "GTM"].map(k => (
            <span key={k} className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-medium rounded-full border border-emerald-100">+ {k}</span>
          ))}
        </div>
      </div>
    </div>
  ),
};

import React from 'react';

const cardData = [
  {
    color: '#ffffff',
    title: 'ATS Score Analyzer',
    description: 'Get a precise score of how well your resume matches ATS algorithms. Real-time feedback and instant fix suggestions.',
    label: 'Core Feature'
  },
  {
    color: '#ffffff',
    title: 'AI Enhancement',
    description: 'Transform weak bullet points into impactful, quantified achievements with a single click.',
    label: 'Writing'
  },
  {
    color: '#ffffff',
    title: 'Bullet Rewriter',
    description: 'Instant strong action verbs and professional formatting.',
    label: 'Polishing'
  },
  {
    color: '#ffffff',
    title: 'Formatting Fixer',
    description: 'Auto-align dates, bullets, and margins for a perfect look.',
    label: 'Design'
  },
  {
    color: '#ffffff',
    title: 'Job Tracker',
    description: 'Manage unlimited versions tailored to specific applications.',
    label: 'Management'
  },
  {
    color: '#ffffff',
    title: 'Job Description Tailoring',
    description: 'Paste any job description and let AI instantly rewrite your resume to highlight the exact skills required.',
    label: 'Targeting'
  }
];

const createParticleElement = (x: number, y: number, color = DEFAULT_GLOW_COLOR) => {
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.cssText = `
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 10px rgba(${color}, 0.8);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const calculateSpotlightValues = (radius: number) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75
});

const updateCardGlowProperties = (card: HTMLElement, mouseX: number, mouseY: number, glow: number, radius: number) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;

  card.style.setProperty('--glow-x', `${relativeX}%`);
  card.style.setProperty('--glow-y', `${relativeY}%`);
  card.style.setProperty('--glow-intensity', glow.toString());
  card.style.setProperty('--glow-radius', `${radius}px`);
};

const ParticleCard = ({
  children,
  className = '',
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = false,
  enableMagnetism = false
}: any) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLElement[]>([]);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef<HTMLElement[]>([]);
  const particlesInitialized = useRef(false);
  const magnetismAnimationRef = useRef<any>(null);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;

    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill();

    particlesRef.current.forEach(particle => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'back.in(1.7)',
        onComplete: () => {
          particle.parentNode?.removeChild(particle);
        }
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;

    if (!particlesInitialized.current) {
      initializeParticles();
    }

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;

        const clone = particle.cloneNode(true) as HTMLElement;
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);

        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });

        gsap.to(clone, {
          x: (Math.random() - 0.5) * 150,
          y: (Math.random() - 0.5) * 150,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: 'none',
          repeat: -1,
          yoyo: true
        });

        gsap.to(clone, {
          opacity: 0.2,
          duration: 1.5,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true
        });
      }, index * 100);

      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;

    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 3,
          rotateY: 3,
          duration: 0.3,
          ease: 'power2.out',
          transformPerspective: 1000
        });
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }

      if (enableMagnetism) {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableTilt && !enableMagnetism) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        gsap.to(element, {
          rotateX,
          rotateY,
          duration: 0.1,
          ease: 'power2.out',
          transformPerspective: 1000
        });
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.03;
        const magnetY = (y - centerY) * 0.03;

        magnetismAnimationRef.current = gsap.to(element, {
          x: magnetX,
          y: magnetY,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (!clickEffect) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );

      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.15) 0%, rgba(${glowColor}, 0.05) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;

      element.appendChild(ripple);

      gsap.fromTo(
        ripple,
        {
          scale: 0,
          opacity: 1
        },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => ripple.remove()
        }
      );
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('click', handleClick);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('click', handleClick);
      clearAllParticles();
    };
  }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor]);

  return (
    <div
      ref={cardRef}
      className={`${className} particle-container`}
      style={{ ...style, position: 'relative', overflow: 'hidden' }}
    >
      {children}
    </div>
  );
};

const GlobalSpotlight = ({
  gridRef,
  disableAnimations = false,
  enabled = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR
}: any) => {
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const isInsideSection = useRef(false);

  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return;

    const spotlight = document.createElement('div');
    spotlight.className = 'global-spotlight';
    spotlight.style.cssText = `
      position: fixed;
      width: ${spotlightRadius * 2}px;
      height: ${spotlightRadius * 2}px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.12) 0%,
        rgba(${glowColor}, 0.06) 15%,
        transparent 50%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current || !gridRef.current) return;

      const section = gridRef.current.closest('.bento-section');
      const rect = section?.getBoundingClientRect();
      const mouseInside =
        rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;

      isInsideSection.current = mouseInside || false;
      const cards = gridRef.current.querySelectorAll('.magic-bento-card');

      if (!mouseInside) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
        cards.forEach((card: any) => {
          card.style.setProperty('--glow-intensity', '0');
        });
        return;
      }

      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
      let minDistance = Infinity;

      cards.forEach((card: any) => {
        const cardElement = card as HTMLElement;
        const cardRect = cardElement.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance =
          Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);

        minDistance = Math.min(minDistance, effectiveDistance);

        let glowIntensity = 0;
        if (effectiveDistance <= proximity) {
          glowIntensity = 1;
        } else if (effectiveDistance <= fadeDistance) {
          glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
        }

        updateCardGlowProperties(cardElement, e.clientX, e.clientY, glowIntensity, spotlightRadius);
      });

      gsap.to(spotlightRef.current, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
      });

      const targetOpacity =
        minDistance <= proximity
          ? 0.8
          : minDistance <= fadeDistance
            ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8
            : 0;

      gsap.to(spotlightRef.current, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.2 : 0.5,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      isInsideSection.current = false;
      gridRef.current?.querySelectorAll('.magic-bento-card').forEach((card: any) => {
        card.style.setProperty('--glow-intensity', '0');
      });
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

  return null;
};

const BentoCardGrid = ({ children, gridRef }: any) => (
  <div className="card-grid bento-section" ref={gridRef}>
    {children}
  </div>
);

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

const MagicBento = ({
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = false,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = true
}: any) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;

  return (
    <>
      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={shouldDisableAnimations}
          enabled={enableSpotlight}
          spotlightRadius={spotlightRadius}
          glowColor={glowColor}
        />
      )}

      <BentoCardGrid gridRef={gridRef}>
        {cardData.map((card, index) => {
          const baseClassName = `magic-bento-card w-full h-full ${textAutoHide ? 'magic-bento-card--text-autohide' : ''} ${enableBorderGlow ? 'magic-bento-card--border-glow' : ''}`;
          const cardProps = {
            className: baseClassName,
            style: {
              backgroundColor: card.color,
              '--glow-color': glowColor
            } as any
          };

          if (enableStars) {
            return (
              <ParticleCard
                key={index}
                {...cardProps}
                disableAnimations={shouldDisableAnimations}
                particleCount={particleCount}
                glowColor={glowColor}
                enableTilt={enableTilt}
                clickEffect={clickEffect}
                enableMagnetism={enableMagnetism}
              >
                <div className="magic-bento-card__header">
                  <div className="magic-bento-card__label">{card.label}</div>
                  <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center">
                     <div className="w-5 h-5 bg-violet-500 rounded-full animate-pulse" />
                  </div>
                </div>
                {/* Per-card visual illustration */}
                {CardVisuals[index] && CardVisuals[index]()}
                <div className="magic-bento-card__content">
                  <h2 className="magic-bento-card__title">{card.title}</h2>
                  <p className="magic-bento-card__description">{card.description}</p>
                </div>
              </ParticleCard>
            );
          }

          return (
            <div
              key={index}
              {...cardProps}
              ref={(el) => {
                if (!el) return;

                const handleMouseMove = (e: MouseEvent) => {
                  if (shouldDisableAnimations) return;

                  const rect = el.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;

                  if (enableTilt) {
                    const rotateX = ((y - centerY) / centerY) * -10;
                    const rotateY = ((x - centerX) / centerX) * 10;
                    gsap.to(el, {
                      rotateX,
                      rotateY,
                      duration: 0.1,
                      ease: 'power2.out',
                      transformPerspective: 1000
                    });
                  }

                  if (enableMagnetism) {
                    const magnetX = (x - centerX) * 0.05;
                    const magnetY = (y - centerY) * 0.05;
                    gsap.to(el, {
                      x: magnetX,
                      y: magnetY,
                      duration: 0.3,
                      ease: 'power2.out'
                    });
                  }
                };

                const handleMouseLeave = () => {
                  if (shouldDisableAnimations) return;

                  if (enableTilt) {
                    gsap.to(el, {
                      rotateX: 0,
                      rotateY: 0,
                      duration: 0.3,
                      ease: 'power2.out'
                    });
                  }

                  if (enableMagnetism) {
                    gsap.to(el, {
                      x: 0,
                      y: 0,
                      duration: 0.3,
                      ease: 'power2.out'
                    });
                  }
                };

                const handleClick = (e: MouseEvent) => {
                  if (!clickEffect || shouldDisableAnimations) return;

                  const rect = el.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;

                  const maxDistance = Math.max(
                    Math.hypot(x, y),
                    Math.hypot(x - rect.width, y),
                    Math.hypot(x, y - rect.height),
                    Math.hypot(x - rect.width, y - rect.height)
                  );

                  const ripple = document.createElement('div');
                  ripple.style.cssText = `
                    position: absolute;
                    width: ${maxDistance * 2}px;
                    height: ${maxDistance * 2}px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(${glowColor}, 0.2) 0%, rgba(${glowColor}, 0.1) 30%, transparent 70%);
                    left: ${x - maxDistance}px;
                    top: ${y - maxDistance}px;
                    pointer-events: none;
                    z-index: 1000;
                  `;

                  el.appendChild(ripple);

                  gsap.fromTo(
                    ripple,
                    {
                      scale: 0,
                      opacity: 1
                    },
                    {
                      scale: 1,
                      opacity: 0,
                      duration: 0.8,
                      ease: 'power2.out',
                      onComplete: () => ripple.remove()
                    }
                  );
                };

                el.addEventListener('mousemove', handleMouseMove);
                el.addEventListener('mouseleave', handleMouseLeave);
                el.addEventListener('click', handleClick);
              }}
            >
              <div className="magic-bento-card__header">
                <div className="magic-bento-card__label">{card.label}</div>
              </div>
              <div className="magic-bento-card__content">
                <h2 className="magic-bento-card__title">{card.title}</h2>
                <p className="magic-bento-card__description">{card.description}</p>
              </div>
            </div>
          );
        })}
      </BentoCardGrid>
    </>
  );
};

export default MagicBento;
