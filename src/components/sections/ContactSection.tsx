import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Mail, Phone, MapPin, Github, Linkedin, Instagram } from 'lucide-react';

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "rushabhshah@umass.edu",
    href: "mailto:rushabhshah@umass.edu"
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 (887) 928-1020",
    href: "tel:+918879281020"
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Amherst, MA, USA",
    href: "https://www.google.com/maps/place/Amherst,+MA,+USA/@42.3677343,-72.5880581,22029m"
  }
];

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/madmax7874/",
    username: "@madmax7874"
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rushabhshah7874/",
    username: "rushabhshah7874"
  },
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://www.linkedin.com/in/rushabhhhshahh/",
    username: "@rushabhhhshahh"
  }
];

export const ContactSection = () => {
  return (
    <section id="contact" className="py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-night-gradient opacity-20"></div>
      <div className="absolute inset-0 bg-starry-bg opacity-30"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-hero-gradient bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="w-full max-w-lg mx-auto md:max-w-3xl md:mx-auto lg:max-w-none lg:w-auto lg:mx-0">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Contact Details */}
              <Card className="p-8 bg-card/80 backdrop-blur-sm border-border/50 shadow-elegant w-full max-w-lg mx-auto md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0">
                <h3 className="text-2xl font-semibold mb-6 text-primary">Contact Information</h3>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={info.label}
                      href={info.href}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      // whileHover={{ x: 5 }}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent/50 transition-all duration-300 group"
                    >
                      <div className="p-2 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        <info.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{info.label}</p>
                        <p className="text-muted-foreground">{info.value}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
          <div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Social Links */}
              <Card className="p-8 bg-card/80 backdrop-blur-sm border-border/50 shadow-elegant w-full max-w-lg mx-auto md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0">
                <h3 className="text-2xl font-semibold mb-6 text-primary">Connect With Me</h3>
                <div className="space-y-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      // whileHover={{ x: 5 }}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent/50 transition-all duration-300 group"
                    >
                      <div className="p-2 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        <social.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{social.label}</p>
                        <p className="text-muted-foreground">{social.username}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};