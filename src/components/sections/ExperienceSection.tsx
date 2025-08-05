import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { useRef, useLayoutEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import carImage from '@/assets/car.png';

const experiences = [
  {
    id: 1,
    company: "Institutional Shareholder Services",
    position: "Software Developer",
    duration: "Jan 2025 - Jul 2025",
    description: "Leading development of scalable web applications using React, Node.js, and AWS. Mentoring junior developers and architecting cloud solutions.",
    technologies: ["React", "Node.js", "AWS", "PostgreSQL", "Docker"],
    side: "left"
  },
  {
    id: 2,
    company: "Institutional Shareholder Services",
    position: "Junior Software Developer",
    duration: "Jul 2023 - Jan 2025",
    description: "Built responsive web applications from scratch. Collaborated closely with design team to implement pixel-perfect UIs.",
    technologies: ["Vue.js", "Express.js", "MongoDB", "Redis"],
    side: "right"
  },
  {
    id: 3,
    company: "Vedika.ai",
    position: "Lead Software Developer Intern",
    duration: "Mar 2023 - Jul 2023",
    description: "Developed interactive websites for various clients. Focused on performance optimization and cross-browser compatibility.",
    technologies: ["React", "TypeScript", "SASS", "Webpack"],
    side: "left"
  },
  {
    id: 4,
    company: "Buyceps",
    position: "Software Developer Intern",
    duration: "Dec 2022 - Mar 2023",
    description: "Created custom websites for small businesses. Handled everything from design to deployment and client training.",
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    side: "right"
  },
  {
    id: 5,
    company: "Studypaq",
    position: "Software Developer Intern",
    duration: "Jun 2022 - Dec 2022",
    description: "Developed interactive websites for various clients. Focused on performance optimization and cross-browser compatibility.",
    technologies: ["React", "TypeScript", "SASS", "Webpack"],
    side: "left"
  },
  {
    id: 6,
    company: "Dreams International",
    position: "Full-Satck Developer Intern",
    duration: "Jul 2021 - Oct 2021",
    description: "Created custom websites for small businesses. Handled everything from design to deployment and client training.",
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    side: "right"
  }
];

export const ExperienceSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const roadRef = useRef<HTMLDivElement>(null);
  const carY = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const progressPercentage = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);
  
  useLayoutEffect(() => {
    const road = roadRef.current;
    if (!road) return;
    const roadRect = road.getBoundingClientRect();
    const roadHeight = roadRect.height;
    
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const carOffset = roadHeight * progressPercentage.get();
      carY.set(carOffset);
    });

    return () => unsubscribe();
  }, [scrollYProgress, carY]);

  return (
    <section id="experience" className="py-20 relative overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
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
          className="absolute left-1/2 bottom-0 w-1 bg-gradient-to-b from-primary via-primary-glow to-primary transform -translate-x-1/2 opacity-30 hidden md:block"
          style={{
            top: "10%",
          }}
        >
          <motion.div
            className="w-full bg-primary"
            style={{
              height: progressPercentage,
              transition: "height 0.3s ease-out"
            }}
          />
        </div>

        {/* Animated Car */}
        <motion.div
          ref={carRef}
          className="absolute z-20 hidden md:block top-0"
          style={{
            left: 'calc(50% - 2rem)', // center horizontally, adjust for car width
            y: carY,
            top: "10%"
          }}
        >
          <motion.div
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
          </motion.div>
        </motion.div>

        {/* Experience Cards */}
        <div className="space-y-24 relative z-10">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: exp.side === "left" ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`flex ${exp.side === "left" ? "justify-start" : "justify-end"}`}
            >
              <Card className={`w-full max-w-md p-6 bg-card/80 backdrop-blur-sm border-border/50 shadow-elegant hover:shadow-glow transition-all duration-300 ${exp.side === "left" ? "mr-auto ml-0" : "ml-auto mr-0"
                }`}>
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

                  <p className="text-muted-foreground leading-relaxed">
                    {exp.description}
                  </p>

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