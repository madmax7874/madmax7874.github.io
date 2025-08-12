import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Award, BookOpen } from 'lucide-react';

const education = [
  {
    id: 1,
    degree: "Masters of Science in Computer Science",
    institution: "University of Massachusetts, Amherst",
    year: "Aug 2025 - Present",
    description: "Specialized in Machine Learning and Distributed Systems. Graduated Magna Cum Laude.",
    achievements: [],
    icon: GraduationCap
  },
  {
    id: 2,
    degree: "Bachelor of Technology in Computer Engineering",
    institution: "Dwarkadas J Sanghvi College of Engineering",
    year: "Aug 2019 - May 2023",
    description: "Comprehensive study of software development, algorithms, and system design.",
    achievements: [],
    icon: BookOpen
  }
];

const certifications = [
  // {
  //   name: "Google Cloud Professional",
  //   issuer: "Google",
  //   year: "2021",
  //   icon: Award
  // }
];

export const EducationSection = () => {
  return (
    <section id="education" className="py-20 relative overflow-hidden">
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
            Education
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            My academic journey that shaped my expertise
          </p>
        </motion.div>

        {/* Education */}
        <div className="">
          <motion.h3
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-semibold mb-8 text-primary flex items-center gap-3"
          >
            <GraduationCap className="h-6 w-6" />
            Academic Background
          </motion.h3>

          <div className="grid md:grid-cols-2 gap-8">
            {education.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card className="p-6 h-full bg-card/80 backdrop-blur-sm border-border/50 shadow-elegant hover:shadow-glow transition-all duration-300 group">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <edu.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-foreground mb-1">
                        {edu.degree}
                      </h4>
                      <p className="text-lg text-primary font-medium">
                        {edu.institution}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {edu.year}
                      </p>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {edu.description}
                  </p>

                  {edu.achievements.length ? <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">Key Achievements:</p>
                    <div className="flex flex-wrap gap-2">
                      {edu.achievements.map((achievement) => (
                        <Badge
                          key={achievement}
                          variant="secondary"
                          className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                        >
                          {achievement}
                        </Badge>
                      ))}
                    </div>
                  </div> : null}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        {certifications.length ? <div>
          <motion.h3
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-semibold mb-8 text-primary flex items-center gap-3"
          >
            <Award className="h-6 w-6" />
            Professional Certifications
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Card className="p-6 text-center bg-card/80 backdrop-blur-sm border-border/50 shadow-elegant hover:shadow-glow transition-all duration-300 group">
                  <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 text-primary w-fit group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <cert.icon className="h-8 w-8" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    {cert.name}
                  </h4>
                  <p className="text-primary font-medium mb-1">
                    {cert.issuer}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {cert.year}
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