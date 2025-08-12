import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useLayoutEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import F1CarIcon from '@/assets/F1CarIcon.tsx';

const experiences = [
  {
    id: 1,
    company: "Institutional Shareholder Services",
    position: "Software Developer",
    duration: "Feb 2025 - Jul 2025",
    description: [
      "Designed automated alerting systems and centralized alert managers across Node.js, Java, and Python, integrating with Slack, Teams, and email for root-level traceability.",
      "Built high-accuracy data extraction systems, scalable financial web crawlers, and a PDF-to-HTML converter with 98% parsing accuracy, reducing manual intervention and boosting operational efficiency."
    ],
    technologies: ["Python", "Java", "Node.js", "MySQL", "Grafana", "Kuma", "Slack API", "PDFBox", "Regex", "Machine Learning"],
    side: "left"
  },
  {
    id: 2,
    company: "Institutional Shareholder Services",
    position: "Junior Software Developer",
    duration: "Jul 2023 - Jan 2025",
    description: [
      "Engineered real-time ETL pipelines from Kafka, Kubernetes, MongoDB, and Redis into InfluxDB, creating actionable Grafana visualizations for analytics and resource planning.",
      "Built custom dashboards and a React-based monitoring tool adopted company-wide, halving debugging times for 8+ applications."
    ],
    technologies: ["Java", "React", "Kafka", "Kubernetes", "MongoDB", "Redis", "InfluxDB", "Grafana"],
    side: "right"
  },
  {
    id: 3,
    company: "Vedika.ai",
    position: "Software Developer Intern",
    duration: "Mar 2023 - Jul 2023",
    description: [
      "Led end-to-end MVP development, translating 100+ Figma frames into a Next.js frontend, architecting Python-based backends, and designing complete MongoDB schemas.",
      "Implemented AI-powered features including LLM prompt engineering, OCR-based OMR scoring, and vector database content structuring and retrieval to enhance LLM performance."
    ],
    technologies: ["Next.js", "AWS", "Python", "LangChain", "MongoDB", "Vector DB", "OCR", "PayPal API", "YouTube API", "TikTok API", "Figma"],
    side: "left"
  },
  {
    id: 4,
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
    id: 5,
    company: "Studypaq",
    position: "Software Developer Intern",
    duration: "Jun 2022 - Dec 2022",
    description: [
      "Implemented new platform features for a collaborative learning environment.",
      "Optimized performance and ensured seamless, responsive UI across devices."
    ],
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "AWS S3", "JavaScript"],
    side: "left"
  },
  {
    id: 6,
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

export const ExperienceSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const roadRef = useRef<HTMLDivElement>(null);
  const [carY, setCarY] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const progressPercentage = useTransform(scrollYProgress, (latest) => {
    const section = containerRef.current;
    if (!section) return 0;
    const offsetRatio = 125 / window.innerHeight;
    if (latest < offsetRatio) return 0;
    const scaled = (latest - offsetRatio) / (1 - offsetRatio);
    return Math.min(scaled / (1 - offsetRatio), 1);
  });

  useLayoutEffect(() => {
    const road = roadRef.current;
    if (!road) return;
    const roadRect = road.getBoundingClientRect();

    const unsubscribe = progressPercentage.on("change", (progress) => {
      setCarY(roadRect.height * progress);
    });

    return () => unsubscribe();
  }, [progressPercentage]);

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

        {/* Road/Timeline as a div */}
        <div
          ref={roadRef}
          className="absolute left-1/2 bottom-0 w-1 bg-gradient-to-b from-primary via-primary-glow to-primary transform -translate-x-1/2 opacity-30 hidden lg:block"
          style={{
            top: "5%",
          }}
        >
          <motion.div
            className="w-full bg-primary"
            style={{
              height: progressPercentage,
              // transition: "height 0.3s ease-out"
            }}
          />
        </div>

        {/* Animated Car */}
        <motion.div
          className="absolute z-20 hidden lg:block top-0"
          style={{
            left: 'calc(50% - 1rem)', // center horizontally, adjust for car width
            y: carY,
            top: "5%"
          }}
        >
          <F1CarIcon className="w-8 h-16" />
          {/* <motion.div
            className="relative"
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <img
              src={carImage}
              alt="Journey Car"
              className="w-16 h-8 object-contain filter drop-shadow-lg"
            />
            <div className="absolute -inset-2 bg-primary/20 rounded-full blur-md -z-10 animate-glow"></div>
          </motion.div> */}
        </motion.div>

        {/* Experience Cards */}
        <div className="relative z-10 grid grid-cols-12 gap-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: exp.side === "left" ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={
                `col-span-12 flex justify-center lg:col-span-12 ` +
                (exp.side === "left"
                  ? "lg:justify-start"
                  : "lg:justify-end")
              }
            >
              <Card
                className={
                  `w-full p-8 bg-card/80 backdrop-blur-sm border-border/50 shadow-elegant hover:shadow-glow transition-all duration-300 mx-4 ` +
                  `max-w-full sm:max-w-2xl lg:max-w-lg ` +
                  `col-span-10 ` +
                  (exp.side === "left"
                    ? "lg:mr-auto lg:ml-0"
                    : "lg:ml-auto lg:mr-0")
                }
              >
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
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};