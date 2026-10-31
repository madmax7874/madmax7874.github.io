import React from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useRef, useState, useCallback, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';


const experiences = [
  {
    id: 6,
    company: "Lightmatter",
    position: "Software Engineer Intern",
    duration: "May 2026 - Present",
    description: [
      "Engineered high-throughput telemetry pipelines and backend services by evaluating MQTT vs. Kafka message brokers and benchmarking 5 database architectures (MongoDB, PostgreSQL, InfluxDB, Snowflake, MongoDB Timeseries), deploying Python and MQTT infrastructure across AWS and physical racks with bunkerM to increase telemetry data throughput by 3x and optimize memory efficiency for real-time chip metrics.",
      "Released automated configuration and deployment mechanisms within the Failure In Test (FIT) Orchestrator, building GUI controls for hardware/software versioning and surfacing automated monitoring modes on rack dashboards to eliminate manual hardware tuning and cut setup time by 40%.",
      "Optimized low-latency database queries and backend endpoints for key monitoring interfaces (JP-GUI), resolving performance bottlenecks on historical BER endpoints and accelerating end-to-end telemetry retrieval by 60% to prepare backend services for customer production releases.",
      "Engineered Kubernetes deployment pipelines to migrate legacy Ansible server infrastructure, automating release processes to reduce manual deployment steps by 80% for system configuration updates."
    ],
    technologies: ["Python", "MongoDB", "MQTT", "Kafka", "AWS", "Kubernetes", "Snowflake"],
    side: "right"
  },
  {
    id: 7,
    company: "American Equity",
    position: "Software Engineer Intern",
    duration: "Mar 2025 - May 2025",
    description: [
      "Architected AWS API Gateway proxy layer to intercept traffic, eliminating 100% of direct endpoint exposure.",
      "Engineered a secure Tableau Cloud embedding framework using JWT for SSO, accelerating enterprise license procurement.",
      "Spearheaded an AI sprint to implement tickets using LLM models via spec-driven development, validating outputs for enterprise deployment and establishing training frameworks for cross-functional teams."
    ],
    technologies: ["AWS", "API Gateway", "Tableau Cloud", "JWT", "LLM", "Python"],
    side: "left"
  },
  {
    id: 1,
    company: "Institutional Shareholder Services",
    position: "Software Development Engineer",
    duration: "Jul 2023 - Jul 2025",
    description: [
      "Upgraded the core ISS file storage and retrieval system by implementing a hybrid approach utilizing vector storage and RAG, reducing average query latency by 65% (from 500ms to 175ms) with a high retrieval F1-score of 0.62+.",
      "Developed real-time ETL pipeline aggregating 15M+ daily rows of data into InfluxDB with visualizations for data analytics, which helped catch node crashes during peaks and prevented 80% of resource wastage from idle nodes.",
      "Demonstrated strong team collaboration while designing a fintech data extraction system that parsed unstructured documents using Named Entity Recognition and fine-tuned LLMs, achieving 96% accuracy and eliminating manual data entry.",
      "Coded scalable web crawlers in Java and TypeScript for 12+ countries fetching 50+ documents from financial markets daily.",
      "Built a React dashboard to monitor 8+ applications, widely adopted by Data Architecture team, reducing debugging time by 60%.",
      "Worked on PDF-to-HTML converter in Java and JavaScript adding position-aware logic, improving parsing accuracy to 98%."
    ],
    technologies: ["Java", "TypeScript", "Python", "React", "InfluxDB", "Vector Storage", "RAG", "LLM", "NER", "Grafana"],
    side: "right"
  },
  {
    id: 2,
    company: "Vedika AI",
    position: "Lead Software Engineer Intern",
    duration: "Mar 2023 - Jul 2023",
    description: [
      "Stepped up to lead daily scrums and development sprints in CTO's absence, delivering the MVP on time which contributed to the company being selected as a top 50 EdTech startup globally in the 2024 GSV Cup.",
      "Architected the entire application infrastructure, utilizing Next.js for the frontend dashboard and Python on AWS for the backend, designing scalable workflows that supported large-scale data ingestion.",
      "Utilized LangChain to perform advanced prompt engineering on LLMs, enabling the system to generate highly personalized educational content and engineered a data pipeline processing 700GB of content."
    ],
    technologies: ["Next.js", "Python", "AWS", "LangChain", "LLM", "Prompt Engineering"],
    side: "left"
  },
  {
    id: 3,
    company: "Buyceps",
    position: "Software Developer Intern",
    duration: "Dec 2022 - Mar 2023",
    description: [
      "Contributed to e-commerce platform enhancements by developing modular features.",
      "Optimized backend APIs and improved overall site performance for smoother customer experiences."
    ],
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "Redux", "JavaScript"],
    side: "right"
  },
  {
    id: 4,
    company: "Studypaq",
    position: "Software Engineer Intern",
    duration: "Jun 2022 - Dec 2022",
    description: [
      "Led the website redesign and development of 10+ features using Angular and Sass, optimizing site performance to achieve a 50% boost in SEO scores while crafting a responsive interface that significantly increased mobile conversion rates.",
      "Integrated PayPal REST APIs for secure and seamless payment processing, and leveraged TikTok & YouTube APIs to source personalized content, driving engagement to 5000+ TikTok views and processing 100+ daily transactions.",
      "Implemented CI/CD pipelines using Docker, Jenkins, and AWS for frontend and backend, cutting deployment time by 80%."
    ],
    technologies: ["Angular", "Sass", "PayPal API", "TikTok API", "YouTube API", "Docker", "Jenkins", "AWS", "CI/CD"],
    side: "left"
  },
  {
    id: 5,
    company: "Dreams International",
    position: "Full-Stack Developer Intern",
    duration: "Jul 2021 - Oct 2021",
    description: [
      "Developed responsive, SEO-optimized business websites with admin dashboards.",
      "Built REST APIs and designed efficient MySQL schemas to power content workflows."
    ],
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "MySQL", "Netlify", "Heroku"],
    side: "right"
  }
];

// --- SVG path generation ---
// The track is an S-curve that swings to the right side for "right" experiences
// and to the left side for "left" experiences.
// We build the path as a series of cubic bezier curves.
//
// Coordinate system:
//   x: 0 (left edge) to TRACK_WIDTH (right edge)
//   y: grows downward
//
// Each experience occupies a vertical "slot". Between slots the road curves
// from one side to the other.

const TRACK_WIDTH = 1200;  // SVG viewBox width
const CARD_HEIGHT = 420;   // vertical space per experience slot
const CURVE_TRANSITION = 400; // vertical space for S-curve transition between cards
const PADDING_TOP = 60;
const PADDING_BOTTOM = 60;

// The x positions the road reaches on each side
const X_RIGHT = TRACK_WIDTH * 0.82; // rightmost point
const X_LEFT = TRACK_WIDTH * 0.18;  // leftmost point
const X_CENTER = TRACK_WIDTH * 0.5;

function buildTrackPath(): { path: string; totalHeight: number; cardPositions: { x: number; y: number; side: string }[] } {
  const cardPositions: { x: number; y: number; side: string }[] = [];
  let d = '';
  let y = PADDING_TOP;

  // Start from center top with a short straight section
  d += `M ${X_CENTER} ${y}`;
  const startStraightY = y + 40;
  d += ` L ${X_CENTER} ${startStraightY}`;
  y = startStraightY;

  for (let i = 0; i < experiences.length; i++) {
    const exp = experiences[i];
    const targetX = exp.side === 'right' ? X_RIGHT : X_LEFT;
    const prevX = i === 0 ? X_CENTER : (experiences[i - 1].side === 'right' ? X_RIGHT : X_LEFT);

    // Curve from previous position to this experience's side
    if (i === 0) {
      // First: curve from center to target side
      const curveEndY = y + CURVE_TRANSITION;
      const cp1x = prevX;
      const cp1y = y + CURVE_TRANSITION * 0.5;
      const cp2x = targetX;
      const cp2y = curveEndY - CURVE_TRANSITION * 0.5;
      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${targetX} ${curveEndY}`;
      y = curveEndY;
    } else if (prevX !== targetX) {
      // S-curve transition between sides
      const curveEndY = y + CURVE_TRANSITION;
      const cp1x = prevX;
      const cp1y = y + CURVE_TRANSITION * 0.4;
      const cp2x = targetX;
      const cp2y = curveEndY - CURVE_TRANSITION * 0.4;
      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${targetX} ${curveEndY}`;
      y = curveEndY;
    }

    // Record the position where the card should appear (at the start of the straight)
    const cardY = y + CARD_HEIGHT * 0.5;
    cardPositions.push({ x: targetX, y: cardY, side: exp.side });

    // Straight (or very slight) segment while at this side
    const straightEndY = y + CARD_HEIGHT;
    d += ` L ${targetX} ${straightEndY}`;
    y = straightEndY;
  }

  // End: go back to center then continue straight down
  const lastX = experiences[experiences.length - 1].side === 'right' ? X_RIGHT : X_LEFT;
  const endY = y + CURVE_TRANSITION;
  d += ` C ${lastX} ${y + CURVE_TRANSITION * 0.5}, ${X_CENTER} ${endY - CURVE_TRANSITION * 0.5}, ${X_CENTER} ${endY}`;
  // Straight segment so the car ends pointing straight down
  const finalY = endY + 120;
  d += ` L ${X_CENTER} ${finalY}`;
  y = finalY + PADDING_BOTTOM;

  return { path: d, totalHeight: y, cardPositions };
}

export const ExperienceSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const trailPathRef = useRef<SVGPathElement>(null);
  const [carPos, setCarPos] = useState<{ x: number; y: number; angle: number }>({ x: X_CENTER, y: PADDING_TOP, angle: 90 });
  const [trackData] = useState(() => buildTrackPath());
  const [svgScale, setSvgScale] = useState(1);
  const [renderedHeight, setRenderedHeight] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Compute the ratio between SVG coordinate space and rendered pixels
  const updateScale = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    // The SVG fills the container width; compute scale from that
    const containerWidth = container.querySelector('.experience-track-wrapper')?.getBoundingClientRect().width ?? container.getBoundingClientRect().width;
    const scale = containerWidth / TRACK_WIDTH;
    setSvgScale(scale);
    setRenderedHeight(trackData.totalHeight * scale);
  }, [trackData.totalHeight]);

  useEffect(() => {
    // Small delay to ensure DOM layout has been computed
    const timer = setTimeout(() => {
      updateScale();
      const pathEl = pathRef.current;
      if (pathEl) {
        const startPoint = pathEl.getPointAtLength(0);
        const nextPoint = pathEl.getPointAtLength(Math.min(4, pathEl.getTotalLength()));
        const dx = nextPoint.x - startPoint.x;
        const dy = nextPoint.y - startPoint.y;
        const initialAngle = (Math.abs(dx) > 0.0001 || Math.abs(dy) > 0.0001)
          ? Math.atan2(dy, dx) * (180 / Math.PI)
          : 90;
        setCarPos({ x: startPoint.x, y: startPoint.y, angle: initialAngle });
      }
    }, 50);

    window.addEventListener('resize', updateScale);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateScale);
    };
  }, [updateScale]);

  // Map scroll progress to car progress
  const progressPercentage = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Update car position along the SVG path + trail
  useMotionValueEvent(progressPercentage, "change", (progress) => {
    const pathEl = pathRef.current;
    const trailEl = trailPathRef.current;
    if (!pathEl) return;

    const totalLength = pathEl.getTotalLength();
    const currentLength = totalLength * Math.max(0, Math.min(progress, 1));

    // Update trail
    if (trailEl) {
      trailEl.style.strokeDasharray = `${currentLength} ${totalLength}`;
    }

    // Get current point and tangent using centered difference
    const point = pathEl.getPointAtLength(currentLength);
    const delta = 2;
    const pPrev = pathEl.getPointAtLength(Math.max(0, currentLength - delta));
    const pNext = pathEl.getPointAtLength(Math.min(totalLength, currentLength + delta));
    const dx = pNext.x - pPrev.x;
    const dy = pNext.y - pPrev.y;
    const angle = (Math.abs(dx) > 0.0001 || Math.abs(dy) > 0.0001)
      ? Math.atan2(dy, dx) * (180 / Math.PI)
      : 90;

    setCarPos({ x: point.x, y: point.y, angle });
  });

  return (
    <section id="experience" className="py-20 relative overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 bg-hero-gradient bg-clip-text text-transparent">
            Experience Journey
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Follow my career path as the car drives through my professional journey
          </p>
        </motion.div>

        {/* --- Track + Car layer (desktop only) --- */}
        <div className="experience-track-wrapper relative hidden lg:block" style={{ height: renderedHeight || 'auto' }}>
          {/* SVG Track */}
          <svg
            ref={svgRef}
            className="absolute inset-0 w-full pointer-events-none"
            viewBox={`0 0 ${TRACK_WIDTH} ${trackData.totalHeight}`}
            preserveAspectRatio="xMidYMin meet"
            style={{ height: '100%' }}
          >
            {/* Road surface (wide, faded) */}
            <path
              d={trackData.path}
              fill="none"
              strokeWidth="48"
              strokeLinecap="round"
              className="stroke-muted-foreground/10"
            />
            {/* Road outline */}
            <path
              d={trackData.path}
              fill="none"
              strokeWidth="4"
              strokeLinecap="round"
              className="stroke-muted-foreground/20"
            />
            {/* Hidden full path for measuring */}
            <path
              ref={pathRef}
              d={trackData.path}
              fill="none"
              stroke="transparent"
              strokeWidth="1"
            />
            {/* Glowing trail behind car */}
            <path
              ref={trailPathRef}
              d={trackData.path}
              fill="none"
              strokeWidth="6"
              strokeLinecap="round"
              className="stroke-primary"
              style={{
                strokeDasharray: '0 99999',
                filter: 'drop-shadow(0 0 6px hsl(var(--primary) / 0.6))',
              }}
            />
            {/* Dashed center line */}
            <path
              d={trackData.path}
              fill="none"
              strokeWidth="2"
              strokeDasharray="16 24"
              className="stroke-muted-foreground/30"
            />
            {/* Dots at experience positions */}
            {trackData.cardPositions.map((pos, i) => (
              <circle
                key={i}
                cx={pos.x}
                cy={pos.y}
                r="10"
                className="fill-primary/30"
              />
            ))}
            {/* Car rendered inside SVG — F1 proportions: ~2.8:1 length:width */}
            <g transform={`translate(${carPos.x}, ${carPos.y}) rotate(${carPos.angle + 90})`}>
              {/* Glow */}
              <ellipse rx="16" ry="32" fill="hsl(var(--primary))" opacity="0.16" filter="url(#carGlow)" />

              {/* Rear wing main plane */}
              <rect x="-13" y="24" width="26" height="3" rx="0.8" fill="hsl(var(--accent))" />
              {/* Rear wing DRS line */}
              <line x1="-12" y1="25.5" x2="12" y2="25.5" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.6" />
              {/* Rear wing endplates */}
              <rect x="-14.5" y="22.5" width="2" height="6" rx="0.6" fill="hsl(var(--accent))" />
              <rect x="12.5" y="22.5" width="2" height="6" rx="0.6" fill="hsl(var(--accent))" />
              {/* Rear wing pylon / support */}
              <rect x="-1" y="20" width="2" height="5" rx="0.5" fill="hsl(var(--accent))" opacity="0.8" />
              {/* Rain light */}
              <circle cx="0" cy="27" r="1.2" fill="#ef4444" />

              {/* Rear wheels (wide, chunky F1 tyres: width 8.5, height 14) */}
              <rect x="-16.5" y="8" width="8.5" height="14" rx="2.5" fill="var(--wheel-color, #111)" />
              <rect x="8" y="8" width="8.5" height="14" rx="2.5" fill="var(--wheel-color, #111)" />
              {/* Rear wheel rims */}
              <rect x="-13" y="12.5" width="1.5" height="5" rx="0.5" fill="hsl(var(--primary))" opacity="0.4" />
              <rect x="11.5" y="12.5" width="1.5" height="5" rx="0.5" fill="hsl(var(--primary))" opacity="0.4" />

              {/* Rear suspension wishbones */}
              <line x1="-6" y1="12" x2="-8.5" y2="14" stroke="hsl(var(--foreground))" strokeWidth="0.8" opacity="0.6" />
              <line x1="6" y1="12" x2="8.5" y2="14" stroke="hsl(var(--foreground))" strokeWidth="0.8" opacity="0.6" />

              {/* Main body — sleek aerodynamic F1 profile */}
              <path
                d="M-3,-28 L3,-28 L4,-18 L5.5,-10 L8.5,-2 L8.5,14 L7.5,21 L5,24 L-5,24 L-7.5,21 L-8.5,14 L-8.5,-2 L-5.5,-10 L-4,-18 Z"
                fill="hsl(var(--primary))"
                stroke="hsl(var(--border))"
                strokeWidth="0.6"
              />

              {/* Sidepods sculpting */}
              <path d="M-8.5,-2 L-11,2 L-11,13 L-8.5,18 Z" fill="hsl(var(--primary))" opacity="0.85" />
              <path d="M8.5,-2 L11,2 L11,13 L8.5,18 Z" fill="hsl(var(--primary))" opacity="0.85" />

              {/* Cockpit / halo safety system */}
              <ellipse cx="0" cy="4" rx="3.5" ry="5.5" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="0.6" />
              {/* Driver helmet */}
              <circle cx="0" cy="5" r="2.2" fill="hsl(var(--accent))" />
              {/* Halo bar */}
              <path d="M-4,1 Q0,-3 4,1" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.9" />
              <line x1="0" y1="-3" x2="0" y2="1.5" stroke="hsl(var(--foreground))" strokeWidth="0.9" opacity="0.9" />

              {/* Front wheels (meaty F1 front tyres: width 6.5, height 13) */}
              <rect x="-15" y="-19" width="6.5" height="13" rx="2.5" fill="var(--wheel-color, #111)" />
              <rect x="8.5" y="-19" width="6.5" height="13" rx="2.5" fill="var(--wheel-color, #111)" />
              {/* Front wheel rims */}
              <rect x="-12.5" y="-14.5" width="1.5" height="4" rx="0.5" fill="hsl(var(--primary))" opacity="0.4" />
              <rect x="11" y="-14.5" width="1.5" height="4" rx="0.5" fill="hsl(var(--primary))" opacity="0.4" />

              {/* Front suspension wishbones */}
              <line x1="-4" y1="-17" x2="-8.5" y2="-15" stroke="hsl(var(--foreground))" strokeWidth="0.8" opacity="0.6" />
              <line x1="-5" y1="-11" x2="-8.5" y2="-13" stroke="hsl(var(--foreground))" strokeWidth="0.8" opacity="0.6" />
              <line x1="4" y1="-17" x2="8.5" y2="-15" stroke="hsl(var(--foreground))" strokeWidth="0.8" opacity="0.6" />
              <line x1="5" y1="-11" x2="8.5" y2="-13" stroke="hsl(var(--foreground))" strokeWidth="0.8" opacity="0.6" />

              {/* Nose cone tip */}
              <path d="M-3,-28 L3,-28 L1.8,-32 L-1.8,-32 Z" fill="hsl(var(--primary))" />

              {/* Front wing */}
              <rect x="-14" y="-33" width="28" height="2.5" rx="0.6" fill="hsl(var(--accent))" />
              {/* Front wing endplates */}
              <rect x="-15.5" y="-34.5" width="2" height="5.5" rx="0.6" fill="hsl(var(--accent))" />
              <rect x="13.5" y="-34.5" width="2" height="5.5" rx="0.6" fill="hsl(var(--accent))" />
            </g>
            <defs>
              <filter id="carGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="8" />
              </filter>
            </defs>
          </svg>

          {/* Experience cards positioned next to their track waypoints */}
          {experiences.map((exp, index) => {
            const pos = trackData.cardPositions[index];
            // Card sits on the opposite side of the road from the curve direction
            // If the road goes RIGHT, the card is on the RIGHT (next to the road apex)
            const cardStyle: React.CSSProperties = {
              position: 'absolute',
              top: (pos.y - CARD_HEIGHT * 0.4) * svgScale,
              width: '38%',
              ...(pos.side === 'right'
                ? { right: 0 }
                : { left: 0 }),
            };

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: pos.side === 'right' ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                style={cardStyle}
              >
                <ExperienceCard exp={exp} />
              </motion.div>
            );
          })}
        </div>

        {/* --- Mobile / tablet fallback (simple timeline) --- */}
        <div className="relative z-10 lg:hidden space-y-8">
          {/* Simple center line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/20" />
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="pl-10 relative"
            >
              {/* Dot on the line */}
              <div className="absolute left-[11px] top-8 w-3 h-3 rounded-full bg-primary shadow-glow" />
              <ExperienceCard exp={exp} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Extracted card component ---
function ExperienceCard({ exp }: { exp: typeof experiences[number] }) {
  return (
    <Card className="p-8 bg-card/80 backdrop-blur-sm border-border/50 shadow-elegant hover:shadow-glow transition-all duration-300">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-primary mb-1">
              {exp.position}
            </h3>
            <p className="text-lg font-medium text-foreground">
              {exp.company}
            </p>
            <p className="text-sm text-muted-foreground">
              {exp.duration}
            </p>
          </div>
          <div className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-glow animate-glow"></div>
        </div>

        <ul className="list-disc pl-5 text-muted-foreground leading-relaxed space-y-2">
          {exp.description.map((point, idx) => (
            <li key={idx}>{point}</li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {exp.technologies.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}
