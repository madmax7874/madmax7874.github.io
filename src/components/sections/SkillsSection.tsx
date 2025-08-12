import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Code, Palette, Database, Cloud, Smartphone, Globe } from 'lucide-react';

const skillCategories = [
  // {
  //   title: "Frontend Development",
  //   icon: Code,
  //   skills: [
  //     { name: "React", level: 95 },
  //     { name: "TypeScript", level: 90 },
  //     { name: "Vue.js", level: 85 },
  //     { name: "Next.js", level: 88 },
  //     { name: "Tailwind CSS", level: 92 }
  //   ]
  // },
  // {
  //   title: "Backend Development",
  //   icon: Database,
  //   skills: [
  //     { name: "Node.js", level: 90 },
  //     { name: "Python", level: 85 },
  //     { name: "PostgreSQL", level: 88 },
  //     { name: "MongoDB", level: 82 },
  //     { name: "GraphQL", level: 80 }
  //   ]
  // },
  // {
  //   title: "Cloud & DevOps",
  //   icon: Cloud,
  //   skills: [
  //     { name: "AWS", level: 85 },
  //     { name: "Docker", level: 88 },
  //     { name: "Kubernetes", level: 75 },
  //     { name: "CI/CD", level: 82 },
  //     { name: "Terraform", level: 70 }
  //   ]
  // },
  // {
  //   title: "Design & UI/UX",
  //   icon: Palette,
  //   skills: [
  //     { name: "Figma", level: 85 },
  //     { name: "Adobe Creative Suite", level: 80 },
  //     { name: "User Research", level: 75 },
  //     { name: "Prototyping", level: 82 },
  //     { name: "Design Systems", level: 88 }
  //   ]
  // }
];

const technologyCategories = [
  {
    title: "Languages",
    items: [
      "Python", "JavaScript", "C/C++", "SQL", "TypeScript", "Java", "HTML", "CSS", "R"
    ],
  },
  {
    title: "Frameworks",
    items: [
      "NextJS", "React", "Node.js", "Express.JS", "DJango", "Flask", "Fast-API", "SpringBoot", "Scikit learn", "PyTorch", "LangChain"
    ],
  },
  {
    title: "Databases",
    items: [
      "MySQL", "Microsoft SQL server", "PostgreSQL", "MongoDB", "InfluxDB"
    ],
  },
  {
    title: "Developer Tools",
    items: [
      "AWS", "Docker", "Git", "Grafana", "Graylog", "Jenkins", "Kafka", "Kubernetes", "Kuma", "Minio", "Redis", "Sentry", "SVN"
    ],
  },
];


const languages = [
  // { name: "English", level: "Native" },
  // { name: "Spanish", level: "Fluent" },
  // { name: "French", level: "Intermediate" },
  // { name: "German", level: "Basic" }
];

export const SkillsSection = () => {
  return (
    <section id="skills" className="py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-starry-bg opacity-20"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-hero-gradient bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and professional competencies
          </p>
        </motion.div>

        {/* Technical Skills */}
        {skillCategories.length ? <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-semibold mb-8 text-primary flex items-center gap-3"
          >
            <Code className="h-6 w-6" />
            Technical Proficiency
          </motion.h3>

          <div className="grid lg:grid-cols-2 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              >
                <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50 shadow-elegant hover:shadow-glow transition-all duration-300 group h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <category.icon className="h-6 w-6" />
                    </div>
                    <h4 className="text-xl font-semibold text-foreground">
                      {category.title}
                    </h4>
                  </div>

                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: (categoryIndex * 0.2) + (skillIndex * 0.1) }}
                        className="space-y-2"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-foreground">
                            {skill.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {skill.level}%
                          </span>
                        </div>
                        <Progress
                          value={skill.level}
                          className="h-2 bg-muted"
                        />
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div> : null}

        {/* Technologies */}
        <div className="">
          <motion.h3
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-semibold mb-8 text-primary flex items-center gap-3"
          >
            <Globe className="h-6 w-6" />
            Technologies & Tools
          </motion.h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {technologyCategories.map((category, catIdx) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: catIdx * 0.2 }}
              >
                <h4 className="font-semibold text-lg mb-4 text-primary">{category.title}</h4>
                <div className="flex flex-wrap gap-3">
                  {category.items.map((tech, idx) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      <Badge
                        variant="secondary"
                        className="bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-pointer px-4 py-2 text-sm"
                      >
                        {tech}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Languages */}
        {languages.length ? <div>
          <motion.h3
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-semibold mb-8 text-primary flex items-center gap-3"
          >
            <Smartphone className="h-6 w-6" />
            Languages
          </motion.h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {languages.map((lang, index) => (
              <motion.div
                key={lang.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="p-4 text-center bg-card/80 backdrop-blur-sm border-border/50 shadow-elegant hover:shadow-glow transition-all duration-300">
                  <h4 className="font-semibold text-foreground mb-1">
                    {lang.name}
                  </h4>
                  <p className="text-sm text-primary">
                    {lang.level}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div> : null}
      </div>
    </section>
  );
};