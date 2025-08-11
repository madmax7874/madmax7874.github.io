import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, FileText } from 'lucide-react';

const projects = [
  // {
  //   id: 1,
  //   title: "E-Commerce Platform",
  //   description: "A full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard.",
  //   image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
  //   technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "AWS"],
  //   liveUrl: "#",
  //   githubUrl: "#",
  //   category: "Web Development"
  // }
];

const publications = [
  {
    title: "Track Learning Agent Using Multi-objective Reinforcement Learning",
    journal: "Congress on Intelligent Systems",
    year: "2024",
    description: "Proposed a Pareto Q-learning based Multi-Objective Reinforcement Learning (MORL) framework for track navigation, enabling agents to simultaneously optimize conflicting goals such as minimizing steps, maximizing rewards, and avoiding collisions.",
    url: "https://link.springer.com/chapter/10.1007/978-981-99-9037-5_3"
  },
  {
    title: "Easier Web Navigation Using Intent Classification, Web Scarping and NLP Approaches",
    journal: "5th International Conference on Advances in Science and Technology (ICAST)",
    year: "2022",
    description: "Developed a dynamic Natural Language User Interface (NLUI) combining data scraping, intent classification (99.1% accuracy), and NLP to enable intuitive text/voice-based web navigation with enhanced context understanding.",
    url: "https://ieeexplore.ieee.org/document/10039559"
  },
  {
    title: "Travel Buddy",
    journal: "",
    year: "2022",
    description: "Full-stack travel planning platform in React, built with a consistent design language and clean code practices, featuring itinerary creation, checklists, and expense tracking through interactive visualizations.",
    url: "your-travel-buddy.netlify.app"
  }
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-night-gradient opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-hero-gradient bg-clip-text text-transparent">
            Projects & Publications
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A showcase of my work and contributions to the developer community
          </p>
        </motion.div>

        {/* Projects */}
        {projects.length ? <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-semibold mb-8 text-primary flex items-center gap-3"
          >
            <ExternalLink className="h-6 w-6" />
            Featured Projects
          </motion.h3>
          
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Card className="overflow-hidden bg-card/80 backdrop-blur-sm border-border/50 shadow-elegant hover:shadow-glow transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h4>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {project.category}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <Badge 
                          key={tech}
                          variant="outline"
                          className="border-primary/20 text-primary hover:bg-primary/10 transition-colors"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-3">
                      <Button size="sm" className="flex-1">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div> : null}

        {/* Publications */}
        <div>
          {/* <motion.h3
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-semibold mb-8 text-primary flex items-center gap-3"
          >
            <FileText className="h-6 w-6" />
            Research Publications
          </motion.h3> */}
          
          <div className="space-y-6">
            {publications.map((pub, index) => (
              <motion.div
                key={pub.title}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50 shadow-elegant hover:shadow-glow transition-all duration-300 group">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                        {pub.title}
                      </h4>
                      <p className="text-primary font-medium mb-1">
                        {pub.journal} • {pub.year}
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        {pub.description}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="ml-4">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};