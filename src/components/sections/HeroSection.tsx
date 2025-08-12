import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Github, Linkedin, Mail, Download } from 'lucide-react';
import profileImage from '@/assets/Rushabh Shah white bg.png';

export const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background with gradient and starry effect */}
      <div className="absolute inset-0 bg-hero-gradient opacity-20"></div>
      <div className="absolute inset-0 bg-starry-bg opacity-30"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="relative mx-auto w-48 h-48 mb-8">
              <div className="absolute inset-0 bg-hero-gradient rounded-full animate-glow"></div>
              <img
                src={profileImage}
                alt="Profile"
                className="relative w-full h-full object-cover rounded-full border-4 border-background shadow-elegant"
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-6 bg-hero-gradient bg-clip-text text-transparent"
          >
            Rushabh Shah  
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Software developer and researcher passionate about building systems at the intersection of AI and real world problem solving.
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-12"
          >
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow hover:shadow-elegant transition-all duration-300"
              asChild
            >
              <a href="mailto:rushabhshah@umass.edu">
                <Mail className="mr-2 h-5 w-5" />
                Get In Touch
              </a>
            </Button>
            {/* <Button 
              variant="outline" 
              size="lg"
              className="border-primary/20 text-primary hover:bg-primary/10 hover:border-primary/40 transition-all duration-300"
            >
              <Download className="mr-2 h-5 w-5" />
              Download CV
            </Button> */}
          </motion.div>

          {/* About Me Card */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Card className="max-w-2xl mx-auto p-8 bg-card/50 backdrop-blur-sm border-border/50">
              <h2 className="text-2xl font-semibold mb-4 text-primary">About Me</h2>
              <p className="text-muted-foreground leading-relaxed">
                I'm a software developer and aspiring researcher passionate about building intelligent systems that bridge the gap between traditional software engineering and AI-driven automation. With industry experience at ISS and hands-on work with startups, I've tackled real-world challenges across full-stack development, natural language interfaces, and reinforcement learning. I'm especially driven to craft solutions that scale efficiently and enhance everyday human experiences through thoughtful design and smart technology.
              </p>
            </Card>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex items-center justify-center gap-4 mt-8"
          >
            {[
              { icon: Github, href: "https://github.com/madmax7874/", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/rushabhshah7874/", label: "LinkedIn" },
              { icon: Mail, href: "mailto:rushabhshah@umass.edu", label: "Email" },
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-full bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-primary/10 hover:border-primary/40 transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};