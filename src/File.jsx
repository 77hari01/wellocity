import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun, Mail, Phone, MapPin, Github, Linkedin, Twitter, Download, ExternalLink, ChevronUp, Briefcase, Code, Database, Award, Calendar, ArrowRight, Sparkles, Zap, Target } from 'lucide-react';

// Theme Context
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

// Data
const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with payment integration",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    category: "Web",
    github: "#",
    live: "#"
  },
  {
    id: 2,
    title: "AI Dashboard",
    description: "Analytics dashboard with ML-powered insights",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    tech: ["React", "Python", "TensorFlow", "D3.js"],
    category: "UI",
    github: "#",
    live: "#"
  },
  {
    id: 3,
    title: "Social Media API",
    description: "RESTful API for social networking platform",
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&h=600&fit=crop",
    tech: ["Node.js", "Express", "PostgreSQL", "Redis"],
    category: "API",
    github: "#",
    live: "#"
  },
  {
    id: 4,
    title: "Mobile Banking App",
    description: "Secure mobile banking with biometric auth",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
    tech: ["React Native", "Firebase", "Node.js"],
    category: "Mobile",
    github: "#",
    live: "#"
  }
];

const skills = {
  frontend: ["React", "Vue.js", "TypeScript", "Tailwind CSS", "Next.js", "Redux"],
  backend: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Express", "Django"],
  tools: ["Git", "Docker", "AWS", "Figma", "Jest", "Webpack"]
};

const experiences = [
  {
    title: "Senior Full Stack Developer",
    company: "Tech Corp Inc.",
    duration: "2022 - Present",
    description: "Led development of microservices architecture, mentored junior developers, and improved system performance by 40%."
  },
  {
    title: "Frontend Developer",
    company: "Digital Agency",
    duration: "2020 - 2022",
    description: "Built responsive web applications for clients, implemented design systems, and optimized load times."
  },
  {
    title: "Junior Developer",
    company: "StartUp Hub",
    duration: "2019 - 2020",
    description: "Developed features for SaaS platform, participated in code reviews, and collaborated with design team."
  }
];

// Preloader Component
const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2500);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="preloader"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="preloader-spinner-container"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="spinner-ring spinner-purple"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="spinner-ring spinner-cyan"
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="preloader-text"
          >
            Loading Experience...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Advanced Background Component
const AdvancedBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="advanced-background">
      <div className="gradient-mesh" />
      
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -100, 50, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="gradient-orb orb-purple"
      />
      <motion.div
        animate={{
          x: [0, -100, 50, 0],
          y: [0, 100, -50, 0],
          scale: [1, 1.3, 0.9, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="gradient-orb orb-cyan"
      />
      <motion.div
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -50, 50, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="gradient-orb orb-blue"
      />
      
      <motion.div
        animate={{
          x: `${mousePosition.x}%`,
          y: `${mousePosition.y}%`,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
        className="mouse-follower"
      />

      <div className="grid-overlay" />
      
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.1, 0.5, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
          className="floating-particle"
          style={{
            width: Math.random() * 4 + 1,
            height: Math.random() * 4 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

// Navbar Component
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-container">
          <div className="navbar-content">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="navbar-logo"
            >
              <motion.div 
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
                className="logo-icon"
              >
                <Sparkles size={20} />
              </motion.div>
              <span className="logo-text">Portfolio</span>
            </motion.div>

            <div className="navbar-menu">
              {['home', 'about', 'projects', 'skills', 'experience', 'contact'].map((item) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="nav-link"
                >
                  {item}
                  <span className="nav-link-underline" />
                </motion.button>
              ))}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="theme-toggle"
              >
                {theme === 'dark' ? <Sun size={20} className="theme-icon-sun" /> : <Moon size={20} />}
              </motion.button>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="mobile-menu-btn"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mobile-menu"
            >
              <div className="mobile-menu-content">
                {['home', 'about', 'projects', 'skills', 'experience', 'contact'].map((item) => (
                  <motion.button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    whileHover={{ x: 10 }}
                    className="mobile-menu-link"
                  >
                    {item}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

// Hero Component
const Hero = () => {
  return (
    <section id="home" className="hero-section">
      <AdvancedBackground />

      <div className="hero-container">
        <div className="hero-grid">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="hero-image-col"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="hero-image-wrapper"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="hero-ring ring-outer"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="hero-ring ring-inner"
              />
              
              <div className="hero-image-container">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop"
                  alt="Profile"
                  className="hero-image"
                />
                <div className="hero-image-overlay" />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="hero-badge"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="badge-indicator"
                />
                <span className="badge-text">Available for work</span>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-content-col"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="hero-welcome-badge">
                <Zap size={16} className="badge-icon-yellow" />
                Welcome to my digital space
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="hero-title"
            >
              <span className="title-hi">Hi, I'm</span>{' '}
              <span className="title-name">John Doe</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="hero-subtitle"
            >
              Full Stack Developer{' '}
              <span className="subtitle-amp">&</span>{' '}
              Creative Problem Solver
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="hero-description"
            >
              Transforming ideas into elegant, scalable solutions. With 5+ years of experience,
              I specialize in building cutting-edge web applications that make a difference.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="hero-buttons"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="btn-content">
                  Let's Talk
                  <ArrowRight className="btn-arrow" size={20} />
                </span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary"
              >
                <Download size={20} />
                Download CV
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="hero-social"
            >
              {[
                { Icon: Github, href: "#" },
                { Icon: Linkedin, href: "#" },
                { Icon: Twitter, href: "#" }
              ].map(({ Icon, href }, idx) => (
                <motion.a
                  key={idx}
                  href={href}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="social-link"
                >
                  <Icon size={22} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// About Component
const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-grid-bg" />
      
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="section-badge badge-purple"
          >
            Get To Know Me
          </motion.span>
          <h2 className="section-title">
            About <span className="title-gradient">Me</span>
          </h2>
        </motion.div>

        <div className="about-grid">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="about-content"
          >
            <div className="about-text">
              <p className="text-large">
                I'm a <span className="text-highlight">passionate developer</span> who loves creating beautiful, functional web experiences. My journey in tech started over 5 years ago, and I haven't looked back since.
              </p>
              <p className="text-medium">
                I specialize in building scalable applications using modern technologies. Whether it's crafting pixel-perfect UIs or architecting robust backend systems, I bring dedication and expertise to every project.
              </p>
              <p className="text-medium">
                When I'm not coding, you'll find me exploring new technologies, contributing to open source, or sharing knowledge with the dev community.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="stats-grid"
            >
              {[
                { number: "5+", label: "Years Experience", icon: Calendar },
                { number: "50+", label: "Projects Done", icon: Target },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="stat-card"
                >
                  <div className="stat-card-glow" />
                  <div className="stat-card-content">
                    <stat.icon className="stat-icon" />
                    <div className="stat-number">{stat.number}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-gradient"
            >
              <Download size={20} />
              Download Resume
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="about-visual"
          >
            <motion.div
              animate={{ rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="about-card-wrapper"
            >
              <div className="about-card-glow" />
              <div className="about-card">
                <div className="about-initials">
                  <span className="initials-text">JD</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Projects Component
const Projects = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Web', 'UI', 'API', 'Mobile'];

  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="projects-section">
      <div className="projects-bg" />
      
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="section-badge badge-cyan"
          >
            My Work
          </motion.span>
          <h2 className="section-title">
            Featured <span className="title-gradient">Projects</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="filter-buttons"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setFilter(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`filter-btn ${filter === cat ? 'filter-btn-active' : ''}`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        <div className="projects-grid">
          <AnimatePresence mode="wait">
            {filtered.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="project-card-wrapper"
              >
                <div className="project-card-glow" />
                <div className="project-card">
                  <div className="project-image-wrapper">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-image"
                    />
                    <div className="project-overlay" />
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="project-hover"
                    >
                      <motion.a
                        href={project.github}
                        whileHover={{ scale: 1.2 }}
                        className="project-link"
                      >
                        <Github size={24} />
                      </motion.a>
                      <motion.a
                        href={project.live}
                        whileHover={{ scale: 1.2 }}
                        className="project-link"
                      >
                        <ExternalLink size={24} />
                      </motion.a>
                    </motion.div>
                  </div>
                  
                  <div className="project-content">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    <div className="project-tech">
                      {project.tech.map((tech) => (
                        <span key={tech} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

// Skills Component
const Skills = () => {
  return (
    <section id="skills" className="skills-section">
      <div className="skills-bg" />
      
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="section-badge badge-blue"
          >
            My Expertise
          </motion.span>
          <h2 className="section-title">
            Technical <span className="title-gradient">Skills</span>
          </h2>
        </motion.div>

        <div className="skills-grid">
          {Object.entries(skills).map(([category, items], idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="skill-card-wrapper"
            >
              <div className="skill-card-glow" />
              <div className="skill-card">
                <div className="skill-header">
                  {category === 'frontend' && (
                    <div className="skill-icon icon-purple">
                      <Code size={28} />
                    </div>
                  )}
                  {category === 'backend' && (
                    <div className="skill-icon icon-cyan">
                      <Database size={28} />
                    </div>
                  )}
                  {category === 'tools' && (
                    <div className="skill-icon icon-blue">
                      <Award size={28} />
                    </div>
                  )}
                  <h3 className="skill-category">{category}</h3>
                </div>
                <div className="skill-list">
                  {items.map((skill, skillIdx) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 + skillIdx * 0.05 }}
                      whileHover={{ x: 10, scale: 1.02 }}
                      className="skill-item-wrapper"
                    >
                      <div className="skill-item">
                        <span>{skill}</span>
                        <motion.div
                          initial={{ rotate: 0 }}
                          whileHover={{ rotate: 180 }}
                          transition={{ duration: 0.3 }}
                          className="skill-badge"
                        >
                          <Sparkles size={14} />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Experience Timeline
const Experience = () => {
  return (
    <section id="experience" className="experience-section">
      <div className="experience-bg" />
      
      <div className="experience-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="section-badge badge-pink"
          >
            Career Journey
          </motion.span>
          <h2 className="section-title">
            Work <span className="title-gradient">Experience</span>
          </h2>
        </motion.div>

        <div className="timeline-wrapper">
          <div className="timeline-line" />

          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className={`timeline-item ${idx % 2 === 0 ? 'timeline-left' : 'timeline-right'}`}
            >
              <motion.div
                whileHover={{ scale: 1.5 }}
                className="timeline-dot"
              />

              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="timeline-card-wrapper"
              >
                <div className="timeline-card-glow" />
                <div className="timeline-card">
                  <div className="timeline-duration">
                    <Calendar size={18} />
                    <span>{exp.duration}</span>
                  </div>
                  <h3 className="timeline-title">{exp.title}</h3>
                  <div className="timeline-company">
                    <Briefcase size={16} />
                    <span>{exp.company}</span>
                  </div>
                  <p className="timeline-description">{exp.description}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Component
const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent successfully! 🚀');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-bg" />
      
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="section-badge badge-green"
          >
            Let's Connect
          </motion.span>
          <h2 className="section-title">
            Get In <span className="title-gradient">Touch</span>
          </h2>
          <p className="section-subtitle">
            Have a project in mind? Let's work together to create something amazing!
          </p>
        </motion.div>

        <div className="contact-grid">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="contact-info"
          >
            {[
              { Icon: Mail, title: "Email", content: "john.doe@example.com" },
              { Icon: Phone, title: "Phone", content: "+1 (555) 123-4567" },
              { Icon: MapPin, title: "Location", content: "San Francisco, CA" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ x: 10, scale: 1.02 }}
                className="contact-item-wrapper"
              >
                <div className="contact-item-glow" />
                <div className="contact-item">
                  <div className="contact-icon">
                    <item.Icon size={24} />
                  </div>
                  <div className="contact-text">
                    <h3>{item.title}</h3>
                    <p>{item.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="social-section"
            >
              <h3 className="social-title">Follow Me</h3>
              <div className="social-links">
                {[
                  { Icon: Github, href: "#" },
                  { Icon: Linkedin, href: "#" },
                  { Icon: Twitter, href: "#" }
                ].map(({ Icon, href }, idx) => (
                  <motion.a
                    key={idx}
                    href={href}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="social-link-large"
                  >
                    <Icon size={24} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="contact-form-wrapper"
          >
            <div className="form-group">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="form-input form-input-cyan"
              />
            </div>

            <div className="form-group">
              <textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={6}
                className="form-textarea"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={handleSubmit}
              className="form-submit"
            >
              Send Message
              <ArrowRight size={20} />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-bg" />
      
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.9 }}
        className="scroll-top"
      >
        <ChevronUp size={24} />
      </motion.button>

      <div className="footer-container">
        <div className="footer-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="footer-social"
          >
            {[Github, Linkedin, Twitter].map((Icon, idx) => (
              <motion.a
                key={idx}
                href="#"
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="footer-social-link"
              >
                <Icon size={24} />
              </motion.a>
            ))}
          </motion.div>

          <div className="footer-divider" />

          <div className="footer-text">
            <p className="footer-copyright">
              © {new Date().getFullYear()} <span className="footer-name">John Doe</span>. All rights reserved.
            </p>
            <p className="footer-credits">
              <span>Crafted with</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="footer-heart"
              >
                ❤️
              </motion.span>
              <span>using React & Framer Motion</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App
function App() {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    setTimeout(() => setShowPreloader(false), 2500);
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <ThemeProvider>
      <div className="app-container">
        {showPreloader && <Preloader />}
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
        <Footer />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Inter', sans-serif;
          overflow-x: hidden;
          background: #0a0a0a;
        }

        .app-container {
          min-height: 100vh;
          background-color: #111827;
          color: white;
        }

        /* Preloader Styles */
        .preloader {
          position: fixed;
          inset: 0;
          z-index: 50;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(to bottom right, #111827, #581c87, #111827);
        }

        .preloader-spinner-container {
          position: relative;
          width: 80px;
          height: 80px;
        }

        .spinner-ring {
          position: absolute;
          inset: 0;
          width: 80px;
          height: 80px;
          border: 4px solid transparent;
          border-radius: 50%;
        }

        .spinner-purple {
          border-top-color: #a855f7;
          filter: blur(2px);
        }

        .spinner-cyan {
          border-bottom-color: #06b6d4;
          filter: blur(1px);
        }

        .preloader-text {
          margin-top: 32px;
          font-size: 18px;
          font-weight: 600;
          background: linear-gradient(to right, #c084fc, #67e8f9);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        @media (min-width: 768px) {
          .preloader-text {
            font-size: 20px;
          }
        }

        /* Advanced Background */
        .advanced-background {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .gradient-mesh {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at top, rgba(109, 40, 217, 0.2), transparent);
        }

        .gradient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
        }

        .orb-purple {
          top: -160px;
          right: -160px;
          width: 300px;
          height: 300px;
          background-color: #a855f7;
          opacity: 0.2;
        }

        @media (min-width: 768px) {
          .orb-purple {
            width: 500px;
            height: 500px;
          }
        }

        .orb-cyan {
          bottom: -160px;
          left: -160px;
          width: 300px;
          height: 300px;
          background-color: #06b6d4;
          opacity: 0.2;
        }

        @media (min-width: 768px) {
          .orb-cyan {
            width: 500px;
            height: 500px;
          }
        }

        .orb-blue {
          top: 33.333%;
          right: 25%;
          width: 250px;
          height: 250px;
          background-color: #3b82f6;
          opacity: 0.15;
        }

        @media (min-width: 768px) {
          .orb-blue {
            width: 400px;
            height: 400px;
          }
        }

        .mouse-follower {
          position: absolute;
          width: 400px;
          height: 400px;
          background: linear-gradient(to right, rgba(192, 132, 252, 0.2), rgba(236, 72, 153, 0.2));
          border-radius: 50%;
          filter: blur(120px);
          transform: translate(-50%, -50%);
          pointer-events: none;
          display: none;
        }

        @media (min-width: 1024px) {
          .mouse-follower {
            display: block;
            width: 600px;
            height: 600px;
          }
        }

        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(139, 92, 246, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          mask-image: radial-gradient(ellipse 80% 50% at 50% 50%, black, transparent);
        }

        @media (min-width: 768px) {
          .grid-overlay {
            background-size: 100px 100px;
          }
        }

        .floating-particle {
          position: absolute;
          background: white;
          border-radius: 50%;
        }

        /* Navbar Styles */
        .scroll-progress {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(to right, #a855f7, #ec4899, #06b6d4);
          transform-origin: left;
          z-index: 50;
        }

        @media (min-width: 768px) {
          .scroll-progress {
            height: 4px;
          }
        }

        .navbar {
          position: fixed;
          width: 100%;
          z-index: 40;
          transition: all 0.5s;
          background: transparent;
        }

        .navbar-scrolled {
          background: rgba(17, 24, 39, 0.95);
          backdrop-filter: blur(24px);
          box-shadow: 0 25px 50px -12px rgba(168, 85, 247, 0.1);
          border-bottom: 1px solid rgba(168, 85, 247, 0.1);
        }

        .navbar-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 16px;
        }

        @media (min-width: 640px) {
          .navbar-container {
            padding: 0 24px;
          }
        }

        .navbar-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 70px;
        }

        @media (min-width: 768px) {
          .navbar-content {
            height: 80px;
          }
        }

        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .logo-icon {
          width: 36px;
          height: 36px;
          background: linear-gradient(to bottom right, #a855f7, #06b6d4);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        @media (min-width: 768px) {
          .logo-icon {
            width: 40px;
            height: 40px;
          }
        }

        .logo-text {
          font-size: 20px;
          font-weight: 700;
          background: linear-gradient(to right, #c084fc, #f472b6, #67e8f9);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        @media (min-width: 768px) {
          .logo-text {
            font-size: 24px;
          }
        }

        .navbar-menu {
          display: none;
          align-items: center;
          gap: 4px;
        }

        @media (min-width: 768px) {
          .navbar-menu {
            display: flex;
          }
        }

        .nav-link {
          padding: 8px 16px;
          color: #d1d5db;
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.3s;
          text-transform: capitalize;
          position: relative;
          font-size: 15px;
        }

        @media (min-width: 1024px) {
          .nav-link {
            padding: 8px 20px;
            font-size: 16px;
          }
        }

        .nav-link:hover {
          color: white;
        }

        .nav-link-underline {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(to right, #a855f7, #06b6d4);
          transition: width 0.3s;
        }

        .nav-link:hover .nav-link-underline {
          width: 100%;
        }

        .theme-toggle {
          margin-left: 12px;
          padding: 10px;
          border-radius: 50%;
          background: linear-gradient(to bottom right, rgba(168, 85, 247, 0.2), rgba(6, 182, 212, 0.2));
          border: none;
          cursor: pointer;
          transition: all 0.3s;
        }

        @media (min-width: 1024px) {
          .theme-toggle {
            margin-left: 16px;
            padding: 12px;
          }
        }

        .theme-toggle:hover {
          background: linear-gradient(to bottom right, rgba(168, 85, 247, 0.3), rgba(6, 182, 212, 0.3));
        }

        .theme-icon-sun {
          color: #facc15;
        }

        .mobile-menu-btn {
          display: block;
          padding: 8px;
          border-radius: 8px;
          background: rgba(168, 85, 247, 0.2);
          border: none;
          color: white;
          cursor: pointer;
          transition: background 0.3s;
        }

        @media (min-width: 768px) {
          .mobile-menu-btn {
            display: none;
          }
        }

        .mobile-menu-btn:hover {
          background: rgba(168, 85, 247, 0.3);
        }

        .mobile-menu {
          background: rgba(17, 24, 39, 0.98);
          backdrop-filter: blur(24px);
          border-top: 1px solid rgba(168, 85, 247, 0.1);
        }

        .mobile-menu-content {
          padding: 20px 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        @media (min-width: 640px) {
          .mobile-menu-content {
            padding: 24px 16px;
            gap: 12px;
          }
        }

        .mobile-menu-link {
          display: block;
          width: 100%;
          text-align: left;
          padding: 12px 16px;
          color: #d1d5db;
          background: none;
          border: none;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.3s;
          text-transform: capitalize;
          font-size: 16px;
        }

        .mobile-menu-link:hover {
          color: white;
          background: rgba(168, 85, 247, 0.1);
        }

        /* Hero Section */
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .hero-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 100px 16px 60px;
          position: relative;
          z-index: 10;
        }

        @media (min-width: 640px) {
          .hero-container {
            padding: 110px 24px 70px;
          }
        }

        @media (min-width: 768px) {
          .hero-container {
            padding: 120px 24px 80px;
          }
        }

        @media (min-width: 1024px) {
          .hero-container {
            padding: 140px 32px 80px;
          }
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          align-items: center;
        }

        @media (min-width: 640px) {
          .hero-grid {
            gap: 40px;
          }
        }

        @media (min-width: 768px) {
          .hero-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 48px;
          }
        }

        @media (min-width: 1024px) {
          .hero-grid {
            gap: 64px;
          }
        }

        .hero-image-col {
          order: 2;
        }

        @media (min-width: 768px) {
          .hero-image-col {
            order: 1;
          }
        }

        .hero-image-wrapper {
          position: relative;
        }

        .hero-ring {
          position: absolute;
          border-radius: 24px;
          opacity: 0.3;
        }

        @media (min-width: 768px) {
          .hero-ring {
            border-radius: 32px;
          }
        }

        .ring-outer {
          inset: -12px;
          background: linear-gradient(to right, #a855f7, #ec4899, #06b6d4);
          filter: blur(24px);
        }

        @media (min-width: 768px) {
          .ring-outer {
            inset: -16px;
            filter: blur(32px);
          }
        }

        .ring-inner {
          inset: -6px;
          background: linear-gradient(to right, #06b6d4, #3b82f6, #a855f7);
          filter: blur(18px);
          opacity: 0.2;
        }

        @media (min-width: 768px) {
          .ring-inner {
            inset: -8px;
            filter: blur(24px);
          }
        }

        .hero-image-container {
          position: relative;
          width: 100%;
          aspect-ratio: 1;
          max-width: 280px;
          margin: 0 auto;
          border-radius: 20px;
          overflow: hidden;
          border: 3px solid rgba(168, 85, 247, 0.2);
          box-shadow: 0 20px 40px -10px rgba(168, 85, 247, 0.2);
        }

        @media (min-width: 480px) {
          .hero-image-container {
            max-width: 320px;
          }
        }

        @media (min-width: 640px) {
          .hero-image-container {
            max-width: 360px;
            border-radius: 22px;
          }
        }

        @media (min-width: 768px) {
          .hero-image-container {
            max-width: 380px;
            border: 4px solid rgba(168, 85, 247, 0.2);
            border-radius: 24px;
            box-shadow: 0 25px 50px -12px rgba(168, 85, 247, 0.2);
          }
        }

        @media (min-width: 1024px) {
          .hero-image-container {
            max-width: 448px;
          }
        }

        .hero-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hero-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(88, 28, 135, 0.5), transparent);
        }

        .hero-badge {
          position: absolute;
          bottom: -14px;
          left: 33%;
          transform: translateX(-50%);
          padding: 10px 20px;
          background: linear-gradient(to right, #a855f7, #06b6d4);
          border-radius: 50px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
        }

        @media (min-width: 640px) {
          .hero-badge {
            bottom: -16px;
            padding: 10px 24px;
            gap: 8px;
            font-size: 14px;
          }
        }

        .badge-indicator {
          width: 10px;
          height: 10px;
          background-color: #4ade80;
          border-radius: 50%;
        }

        @media (min-width: 640px) {
          .badge-indicator {
            width: 12px;
            height: 12px;
          }
        }

        .badge-text {
          color: white;
          font-weight: 600;
        }

        .hero-content-col {
          order: 1;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        @media (min-width: 640px) {
          .hero-content-col {
            gap: 22px;
          }
        }

        @media (min-width: 768px) {
          .hero-content-col {
            order: 2;
            text-align: left;
            gap: 24px;
          }
        }

        .hero-welcome-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          background: linear-gradient(to right, rgba(168, 85, 247, 0.2), rgba(6, 182, 212, 0.2));
          color: #c084fc;
          border-radius: 50px;
          font-size: 13px;
          font-weight: 600;
          border: 1px solid rgba(168, 85, 247, 0.3);
          backdrop-filter: blur(4px);
          margin: 0 auto;
        }

        @media (min-width: 640px) {
          .hero-welcome-badge {
            gap: 8px;
            padding: 8px 16px;
            font-size: 14px;
          }
        }

        @media (min-width: 768px) {
          .hero-welcome-badge {
            margin: 0;
          }
        }

        .badge-icon-yellow {
          color: #facc15;
        }

        .hero-title {
          font-size: 32px;
          font-weight: 700;
          line-height: 1.2;
        }

        @media (min-width: 480px) {
          .hero-title {
            font-size: 36px;
          }
        }

        @media (min-width: 640px) {
          .hero-title {
            font-size: 44px;
          }
        }

        @media (min-width: 768px) {
          .hero-title {
            font-size: 52px;
          }
        }

        @media (min-width: 1024px) {
          .hero-title {
            font-size: 64px;
          }
        }

        @media (min-width: 1280px) {
          .hero-title {
            font-size: 72px;
          }
        }

        .title-hi {
          color: white;
        }

        .title-name {
          background: linear-gradient(to right, #c084fc, #f472b6, #67e8f9);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradient 3s ease infinite;
          background-size: 200% 200%;
        }

        .hero-subtitle {
          font-size: 18px;
          font-weight: 600;
          color: #d1d5db;
        }

        @media (min-width: 480px) {
          .hero-subtitle {
            font-size: 20px;
          }
        }

        @media (min-width: 640px) {
          .hero-subtitle {
            font-size: 22px;
          }
        }

        @media (min-width: 768px) {
          .hero-subtitle {
            font-size: 24px;
          }
        }

        @media (min-width: 1024px) {
          .hero-subtitle {
            font-size: 28px;
          }
        }

        @media (min-width: 1280px) {
          .hero-subtitle {
            font-size: 30px;
          }
        }

        .subtitle-amp {
          color: #c084fc;
        }

        .hero-description {
          font-size: 15px;
          color: #9ca3af;
          line-height: 1.75;
          max-width: 576px;
          margin: 0 auto;
        }

        @media (min-width: 640px) {
          .hero-description {
            font-size: 16px;
          }
        }

        @media (min-width: 768px) {
          .hero-description {
            font-size: 17px;
            margin: 0;
          }
        }

        @media (min-width: 1024px) {
          .hero-description {
            font-size: 18px;
          }
        }

        .hero-buttons {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding-top: 12px;
          justify-content: center;
        }

        @media (min-width: 480px) {
          .hero-buttons {
            flex-direction: row;
            gap: 14px;
          }
        }

        @media (min-width: 640px) {
          .hero-buttons {
            gap: 16px;
            padding-top: 16px;
          }
        }

        @media (min-width: 768px) {
          .hero-buttons {
            justify-content: flex-start;
          }
        }

        .btn-primary {
          position: relative;
          padding: 14px 28px;
          background: linear-gradient(to right, #a855f7, #06b6d4);
          color: white;
          border-radius: 50px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          overflow: hidden;
          font-size: 15px;
        }

        @media (min-width: 640px) {
          .btn-primary {
            padding: 16px 32px;
            font-size: 16px;
          }
        }

        .btn-content {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .btn-arrow {
          transition: transform 0.3s;
        }

        .btn-primary:hover .btn-arrow {
          transform: translateX(4px);
        }

        .btn-secondary {
          padding: 14px 28px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(4px);
          color: white;
          border-radius: 50px;
          font-weight: 600;
          border: 2px solid rgba(168, 85, 247, 0.3);
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 15px;
        }

        @media (min-width: 640px) {
          .btn-secondary {
            padding: 16px 32px;
            font-size: 16px;
          }
        }

        .btn-secondary:hover {
          border-color: rgba(168, 85, 247, 0.6);
          background: rgba(255, 255, 255, 0.1);
        }

        .hero-social {
          display: flex;
          gap: 12px;
          padding-top: 12px;
          justify-content: center;
        }

        @media (min-width: 640px) {
          .hero-social {
            gap: 16px;
            padding-top: 16px;
          }
        }

        @media (min-width: 768px) {
          .hero-social {
            justify-content: flex-start;
          }
        }

        .social-link {
          padding: 10px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(4px);
          border-radius: 50%;
          border: 1px solid rgba(168, 85, 247, 0.2);
          color: #9ca3af;
          transition: all 0.3s;
          display: inline-flex;
          text-decoration: none;
        }

        @media (min-width: 640px) {
          .social-link {
            padding: 12px;
          }
        }

        .social-link:hover {
          color: white;
          border-color: rgba(168, 85, 247, 0.5);
        }

        /* Section Styles */
        .about-section, .projects-section, .skills-section, .experience-section, .contact-section {
          padding: 60px 0;
          position: relative;
          overflow: hidden;
        }

        @media (min-width: 640px) {
          .about-section, .projects-section, .skills-section, .experience-section, .contact-section {
            padding: 80px 0;
          }
        }

        @media (min-width: 1024px) {
          .about-section, .projects-section, .skills-section, .experience-section, .contact-section {
            padding: 100px 0;
          }
        }

        @media (min-width: 1280px) {
          .about-section, .projects-section, .skills-section, .experience-section, .contact-section {
            padding: 128px 0;
          }
        }

        .about-section {
          background: linear-gradient(to bottom, #111827, #111827, #1f2937);
        }

        .projects-section {
          background: linear-gradient(to bottom, #1f2937, #111827, #111827);
        }

        .skills-section {
          background: linear-gradient(to bottom, #111827, #1f2937, #111827);
        }

        .experience-section {
          background: linear-gradient(to bottom, #111827, #1f2937, #111827);
        }

        .contact-section {
          background: linear-gradient(to bottom, #111827, rgba(88, 28, 135, 0.1), #111827);
        }

        .about-grid-bg, .projects-bg, .skills-bg, .experience-bg, .contact-bg {
          position: absolute;
          inset: 0;
        }

        .about-grid-bg {
          background-image: 
            linear-gradient(rgba(139, 92, 246, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        .projects-bg {
          background: radial-gradient(ellipse at center, rgba(109, 40, 217, 0.1), transparent);
        }

        .skills-bg {
          background-image: 
            linear-gradient(rgba(6, 182, 212, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.03) 1px, transparent 1px);
          background-size: 100px 100px;
        }

        .experience-bg {
          background: radial-gradient(ellipse at bottom, rgba(109, 40, 217, 0.1), transparent);
        }

        .contact-bg {
          background-image: 
            linear-gradient(rgba(168, 85, 247, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168, 85, 247, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        .section-container {
          max-width: fit;
          margin: 0 auto;
          padding: 0 16px;
          position: relative;
          z-index: 10;
        }

        @media (min-width: 640px) {
          .section-container {
            padding: 0 24px;
          }
        }

        @media (min-width: 1024px) {
          .section-container {
            padding: 0 32px;
          }
        }

        .section-header {
          text-align: center;
          margin-bottom: 48px;
        }

        @media (min-width: 640px) {
          .section-header {
            margin-bottom: 60px;
          }
        }

        @media (min-width: 1024px) {
          .section-header {
            margin-bottom: 80px;
          }
        }

        .section-badge {
          display: inline-block;
          padding: 6px 14px;
          border-radius: 50px;
          font-weight: 600;
          margin-bottom: 12px;
          border: 1px solid;
          font-size: 13px;
        }

        @media (min-width: 640px) {
          .section-badge {
            padding: 8px 16px;
            margin-bottom: 16px;
            font-size: 14px;
          }
        }

        .badge-purple {
          background: rgba(168, 85, 247, 0.1);
          border-color: rgba(168, 85, 247, 0.2);
          color: #c084fc;
        }

        .badge-cyan {
          background: rgba(6, 182, 212, 0.1);
          border-color: rgba(6, 182, 212, 0.2);
          color: #67e8f9;
        }

        .badge-blue {
          background: rgba(59, 130, 246, 0.1);
          border-color: rgba(59, 130, 246, 0.2);
          color: #60a5fa;
        }

        .badge-pink {
          background: rgba(236, 72, 153, 0.1);
          border-color: rgba(236, 72, 153, 0.2);
          color: #f9a8d4;
        }

        .badge-green {
          background: rgba(34, 197, 94, 0.1);
          border-color: rgba(34, 197, 94, 0.2);
          color: #4ade80;
        }

        .section-title {
          font-size: 32px;
          font-weight: 700;
          color: white;
        }

        @media (min-width: 480px) {
          .section-title {
            font-size: 36px;
          }
        }

        @media (min-width: 640px) {
          .section-title {
            font-size: 42px;
          }
        }

        @media (min-width: 768px) {
          .section-title {
            font-size: 48px;
          }
        }

        @media (min-width: 1024px) {
          .section-title {
            font-size: 56px;
          }
        }

        @media (min-width: 1280px) {
          .section-title {
            font-size: 60px;
          }
        }

        .title-gradient {
          background: linear-gradient(to right, #c084fc, #67e8f9);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .section-subtitle {
          font-size: 16px;
          color: #9ca3af;
          max-width: 672px;
          margin: 16px auto 0;
          line-height: 1.6;
        }

        @media (min-width: 640px) {
          .section-subtitle {
            font-size: 18px;
          }
        }

        @media (min-width: 768px) {
          .section-subtitle {
            font-size: 20px;
          }
        }

        /* About Section */
        .about-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          align-items: center;
        }

        @media (min-width: 768px) {
          .about-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 48px;
          }
        }

        @media (min-width: 1024px) {
          .about-grid {
            gap: 64px;
          }
        }

        .about-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        @media (min-width: 768px) {
          .about-content {
            gap: 24px;
          }
        }

        .about-text {
          max-width: none;
        }

        .text-large {
          font-size: 17px;
          color: #d1d5db;
          line-height: 1.75;
          margin-bottom: 14px;
        }

        @media (min-width: 640px) {
          .text-large {
            font-size: 18px;
            margin-bottom: 16px;
          }
        }

        @media (min-width: 768px) {
          .text-large {
            font-size: 20px;
          }
        }

        .text-highlight {
          color: #c084fc;
          font-weight: 600;
        }

        .text-medium {
          font-size: 15px;
          color: #9ca3af;
          line-height: 1.75;
          margin-bottom: 14px;
        }

        @media (min-width: 640px) {
          .text-medium {
            font-size: 16px;
            margin-bottom: 16px;
          }
        }

        @media (min-width: 768px) {
          .text-medium {
            font-size: 18px;
          }
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          padding-top: 20px;
        }

        @media (min-width: 640px) {
          .stats-grid {
            gap: 20px;
          }
        }

        @media (min-width: 768px) {
          .stats-grid {
            gap: 24px;
            padding-top: 24px;
          }
        }

        .stat-card {
          position: relative;
        }

        .stat-card-glow {
          position: absolute;
          inset: -3px;
          background: linear-gradient(to bottom right, rgba(168, 85, 247, 0.2), rgba(6, 182, 212, 0.2));
          border-radius: 14px;
          filter: blur(16px);
          opacity: 0.2;
          transition: opacity 0.5s;
        }

        @media (min-width: 768px) {
          .stat-card-glow {
            inset: -4px;
            border-radius: 16px;
            filter: blur(20px);
          }
        }

        .stat-card:hover .stat-card-glow {
          opacity: 0.3;
        }

        .stat-card-content {
          position: relative;
          padding: 20px;
          border-radius: 14px;
          background: linear-gradient(to bottom right, rgba(31, 41, 55, 0.5), rgba(17, 24, 39, 0.5));
          backdrop-filter: blur(4px);
          border: 1px solid rgba(168, 85, 247, 0.2);
          transition: border-color 0.3s;
        }

        @media (min-width: 768px) {
          .stat-card-content {
            padding: 24px;
            border-radius: 16px;
          }
        }

        .stat-card:hover .stat-card-content {
          border-color: rgba(168, 85, 247, 0.4);
        }

        .stat-icon {
          width: 28px;
          height: 28px;
          margin-bottom: 10px;
          background: linear-gradient(to right, #a855f7, #06b6d4);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        @media (min-width: 768px) {
          .stat-icon {
            width: 32px;
            height: 32px;
            margin-bottom: 12px;
          }
        }

        .stat-number {
          font-size: 30px;
          font-weight: 700;
          background: linear-gradient(to right, #a855f7, #06b6d4);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          margin-bottom: 6px;
        }

        @media (min-width: 768px) {
          .stat-number {
            font-size: 36px;
            margin-bottom: 8px;
          }
        }

        .stat-label {
          color: #9ca3af;
          font-weight: 500;
          font-size: 13px;
        }

        @media (min-width: 640px) {
          .stat-label {
            font-size: 14px;
          }
        }

        .btn-gradient {
          margin-top: 24px;
          padding: 14px 28px;
          background: linear-gradient(to right, #a855f7, #06b6d4);
          color: white;
          border-radius: 50px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: box-shadow 0.3s;
          font-size: 15px;
        }

        @media (min-width: 640px) {
          .btn-gradient {
            margin-top: 28px;
            padding: 16px 32px;
            font-size: 16px;
          }
        }

        @media (min-width: 768px) {
          .btn-gradient {
            margin-top: 32px;
          }
        }

        .btn-gradient:hover {
          box-shadow: 0 20px 25px -5px rgba(168, 85, 247, 0.5);
        }

        .about-visual {
          position: relative;
        }

        .about-card-wrapper {
          position: relative;
        }

        .about-card-glow {
          position: absolute;
          inset: -12px;
          background: linear-gradient(to right, #a855f7, #ec4899, #06b6d4);
          border-radius: 20px;
          filter: blur(28px);
          opacity: 0.2;
        }

        @media (min-width: 768px) {
          .about-card-glow {
            inset: -16px;
            border-radius: 24px;
            filter: blur(32px);
          }
        }

        .about-card {
          position: relative;
          background: linear-gradient(to bottom right, #1f2937, #111827);
          border-radius: 20px;
          padding: 24px;
          border: 1px solid rgba(168, 85, 247, 0.2);
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5);
        }

        @media (min-width: 768px) {
          .about-card {
            border-radius: 24px;
            padding: 32px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          }
        }

        .about-initials {
          aspect-ratio: 1;
          background: linear-gradient(to bottom right, rgba(168, 85, 247, 0.2), rgba(6, 182, 212, 0.2));
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(4px);
        }

        @media (min-width: 768px) {
          .about-initials {
            border-radius: 16px;
          }
        }

        .initials-text {
          font-size: 72px;
          font-weight: 700;
          background: linear-gradient(to bottom right, #c084fc, #67e8f9);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        @media (min-width: 640px) {
          .initials-text {
            font-size: 80px;
          }
        }

        @media (min-width: 768px) {
          .initials-text {
            font-size: 96px;
          }
        }

        /* Projects Section */
        .filter-buttons {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        @media (min-width: 640px) {
          .filter-buttons {
            gap: 12px;
            margin-bottom: 48px;
          }
        }

        @media (min-width: 1024px) {
          .filter-buttons {
            margin-bottom: 64px;
          }
        }

        .filter-btn {
          padding: 10px 20px;
          border-radius: 50px;
          font-weight: 600;
          transition: all 0.3s;
          border: 1px solid rgba(168, 85, 247, 0.2);
          background: rgba(31, 41, 55, 0.5);
          color: #d1d5db;
          cursor: pointer;
          font-size: 14px;
        }

        @media (min-width: 640px) {
          .filter-btn {
            padding: 12px 24px;
            font-size: 15px;
          }
        }

        .filter-btn:hover {
          background: rgba(55, 65, 81, 0.5);
        }

        .filter-btn-active {
          background: linear-gradient(to right, #a855f7, #06b6d4);
          color: white;
          box-shadow: 0 10px 15px -3px rgba(168, 85, 247, 0.5);
          border-color: transparent;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }

        @media (min-width: 640px) {
          .projects-grid {
            gap: 24px;
          }
        }

        @media (min-width: 768px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 28px;
          }
        }

        @media (min-width: 1024px) {
          .projects-grid {
            gap: 32px;
          }
        }

        .project-card-wrapper {
          position: relative;
        }

        .project-card-glow {
          position: absolute;
          inset: -3px;
          background: linear-gradient(to right, #a855f7, #06b6d4);
          border-radius: 20px;
          filter: blur(1px);
          opacity: 0.25;
          transition: opacity 0.5s;
        }

        @media (min-width: 768px) {
          .project-card-glow {
            inset: -4px;
            border-radius: 24px;
          }
        }

        .project-card-wrapper:hover .project-card-glow {
          opacity: 0.75;
        }

        .project-card {
          position: relative;
          background: #111827;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(168, 85, 247, 0.2);
          transition: border-color 0.3s;
        }

        @media (min-width: 768px) {
          .project-card {
            border-radius: 24px;
          }
        }

        .project-card:hover {
          border-color: rgba(168, 85, 247, 0.4);
        }

        .project-image-wrapper {
          position: relative;
          aspect-ratio: 16/9;
          overflow: hidden;
        }

        .project-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s;
        }

        .project-card:hover .project-image {
          transform: scale(1.1);
        }

        .project-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, #111827, rgba(17, 24, 39, 0.5), transparent);
          opacity: 0.6;
          transition: opacity 0.3s;
        }

        .project-card:hover .project-overlay {
          opacity: 0.8;
        }

        .project-hover {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom right, rgba(168, 85, 247, 0.2), rgba(6, 182, 212, 0.2));
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        @media (min-width: 768px) {
          .project-hover {
            gap: 16px;
          }
        }

        .project-link {
          padding: 14px;
          background: rgba(17, 24, 39, 0.9);
          backdrop-filter: blur(4px);
          border-radius: 50%;
          border: 1px solid rgba(168, 85, 247, 0.3);
          color: white;
          transition: border-color 0.3s;
          display: inline-flex;
          text-decoration: none;
        }

        @media (min-width: 768px) {
          .project-link {
            padding: 16px;
          }
        }

        .project-link:hover {
          border-color: #a855f7;
        }

        .project-content {
          padding: 20px;
        }

        @media (min-width: 768px) {
          .project-content {
            padding: 24px;
          }
        }

        .project-title {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 8px;
          color: white;
          transition: all 0.3s;
        }

        @media (min-width: 768px) {
          .project-title {
            font-size: 24px;
          }
        }

        .project-card:hover .project-title {
          background: linear-gradient(to right, #c084fc, #67e8f9);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .project-description {
          color: #9ca3af;
          margin-bottom: 14px;
          line-height: 1.75;
          font-size: 14px;
        }

        @media (min-width: 640px) {
          .project-description {
            font-size: 15px;
            margin-bottom: 16px;
          }
        }

        .project-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        @media (min-width: 640px) {
          .project-tech {
            gap: 8px;
          }
        }

        .tech-tag {
          padding: 4px 10px;
          background: rgba(168, 85, 247, 0.1);
          border: 1px solid rgba(168, 85, 247, 0.2);
          color: #c084fc;
          border-radius: 50px;
          font-size: 12px;
          font-weight: 500;
        }

        @media (min-width: 640px) {
          .tech-tag {
            padding: 4px 12px;
            font-size: 14px;
          }
        }

        /* Skills Section */
        .skills-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }

        @media (min-width: 640px) {
          .skills-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
        }

        @media (min-width: 1024px) {
          .skills-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 28px;
          }
        }

        @media (min-width: 1280px) {
          .skills-grid {
            gap: 32px;
          }
        }

        .skill-card-wrapper {
          position: relative;
        }

        .skill-card-glow {
          position: absolute;
          inset: -3px;
          background: linear-gradient(to right, #a855f7, #06b6d4);
          border-radius: 20px;
          filter: blur(1px);
          opacity: 0.2;
          transition: opacity 0.5s;
        }

        @media (min-width: 768px) {
          .skill-card-glow {
            inset: -4px;
            border-radius: 24px;
          }
        }

        .skill-card-wrapper:hover .skill-card-glow {
          opacity: 0.4;
        }

        .skill-card {
          position: relative;
          padding: 24px;
          border-radius: 20px;
          background: linear-gradient(to bottom right, rgba(31, 41, 55, 0.5), rgba(17, 24, 39, 0.5));
          backdrop-filter: blur(4px);
          border: 1px solid rgba(168, 85, 247, 0.2);
          transition: border-color 0.3s;
        }

        @media (min-width: 768px) {
          .skill-card {
            padding: 28px;
            border-radius: 22px;
          }
        }

        @media (min-width: 1024px) {
          .skill-card {
            padding: 32px;
            border-radius: 24px;
          }
        }

        .skill-card:hover {
          border-color: rgba(168, 85, 247, 0.4);
        }

        .skill-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 24px;
        }

        @media (min-width: 768px) {
          .skill-header {
            gap: 12px;
            margin-bottom: 28px;
          }
        }

        @media (min-width: 1024px) {
          .skill-header {
            margin-bottom: 32px;
          }
        }

        .skill-icon {
          padding: 10px;
          border-radius: 10px;
        }

        @media (min-width: 768px) {
          .skill-icon {
            padding: 12px;
            border-radius: 12px;
          }
        }

        .icon-purple {
          background: rgba(168, 85, 247, 0.2);
          color: #c084fc;
        }

        .icon-cyan {
          background: rgba(6, 182, 212, 0.2);
          color: #67e8f9;
        }

        .icon-blue {
          background: rgba(59, 130, 246, 0.2);
          color: #60a5fa;
        }

        .skill-category {
          font-size: 20px;
          font-weight: 700;
          color: white;
          text-transform: capitalize;
        }

        @media (min-width: 768px) {
          .skill-category {
            font-size: 22px;
          }
        }

        @media (min-width: 1024px) {
          .skill-category {
            font-size: 24px;
          }
        }

        .skill-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        @media (min-width: 768px) {
          .skill-list {
            gap: 14px;
          }
        }

        @media (min-width: 1024px) {
          .skill-list {
            gap: 16px;
          }
        }

        .skill-item-wrapper {
          position: relative;
        }

        .skill-item {
          padding: 10px 14px;
          background: rgba(31, 41, 55, 0.5);
          border-radius: 10px;
          color: #d1d5db;
          font-weight: 500;
          transition: all 0.3s;
          cursor: pointer;
          border: 1px solid transparent;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 14px;
        }

        @media (min-width: 768px) {
          .skill-item {
            padding: 12px 16px;
            border-radius: 12px;
            font-size: 15px;
          }
        }

        .skill-item:hover {
          background: rgba(55, 65, 81, 0.5);
          border-color: rgba(168, 85, 247, 0.3);
        }

        .skill-badge {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: linear-gradient(to bottom right, #a855f7, #06b6d4);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        @media (min-width: 768px) {
          .skill-badge {
            width: 24px;
            height: 24px;
          }
        }

        /* Experience Section */
        .experience-container {
          max-width: 1024px;
          margin: 0 auto;
          padding: 0 16px;
          position: relative;
          z-index: 10;
        }

        @media (min-width: 640px) {
          .experience-container {
            padding: 0 24px;
          }
        }

        @media (min-width: 1024px) {
          .experience-container {
            padding: 0 32px;
          }
        }

        .timeline-wrapper {
          position: relative;
        }

        .timeline-line {
          position: absolute;
          left: 16px;
          height: 100%;
          width: 2px;
          background: linear-gradient(to bottom, #a855f7, #ec4899, #06b6d4);
        }

        @media (min-width: 640px) {
          .timeline-line {
            left: 24px;
          }
        }

        @media (min-width: 768px) {
          .timeline-line {
            left: 50%;
            transform: translateX(-50%);
          }
        }

        .timeline-item {
          position: relative;
          margin-bottom: 48px;
        }

        @media (min-width: 768px) {
          .timeline-item {
            margin-bottom: 64px;
          }
        }

        .timeline-left {
          padding-right: 0;
          text-align: left;
        }

        @media (min-width: 768px) {
          .timeline-left {
            padding-right: 50%;
            text-align: right;
          }
        }

        .timeline-right {
          padding-left: 0;
          margin-left: 0;
          text-align: left;
        }

        @media (min-width: 768px) {
          .timeline-right {
            padding-left: 50%;
            margin-left: auto;
            width: 50%;
          }
        }

        .timeline-dot {
          position: absolute;
          left: 16px;
          top: 24px;
          width: 20px;
          height: 20px;
          background: linear-gradient(to right, #a855f7, #06b6d4);
          border-radius: 50%;
          border: 3px solid #111827;
          box-shadow: 0 8px 12px -3px rgba(168, 85, 247, 0.5);
          z-index: 10;
          transform: translateX(-50%);
        }

        @media (min-width: 640px) {
          .timeline-dot {
            left: 24px;
            top: 28px;
          }
        }

        @media (min-width: 768px) {
          .timeline-dot {
            left: auto;
            top: 32px;
            width: 24px;
            height: 24px;
            border: 4px solid #111827;
            box-shadow: 0 10px 15px -3px rgba(168, 85, 247, 0.5);
          }
          
          .timeline-left .timeline-dot {
            right: -12px;
          }
          
          .timeline-right .timeline-dot {
            left: -12px;
          }
        }

        .timeline-card-wrapper {
          margin-left: 48px;
        }

        @media (min-width: 640px) {
          .timeline-card-wrapper {
            margin-left: 56px;
          }
        }

        @media (min-width: 768px) {
          .timeline-card-wrapper {
            margin-left: 0;
          }
        }

        .timeline-card-glow {
          position: absolute;
          inset: -3px;
          background: linear-gradient(to right, #a855f7, #06b6d4);
          border-radius: 14px;
          filter: blur(1px);
          opacity: 0.2;
          transition: opacity 0.5s;
        }

        @media (min-width: 768px) {
          .timeline-card-glow {
            inset: -4px;
            border-radius: 16px;
          }
        }

        .timeline-card-wrapper:hover .timeline-card-glow {
          opacity: 0.4;
        }

        .timeline-card {
          position: relative;
          padding: 20px;
          background: linear-gradient(to bottom right, rgba(31, 41, 55, 0.8), rgba(17, 24, 39, 0.8));
          backdrop-filter: blur(4px);
          border-radius: 14px;
          border: 1px solid rgba(168, 85, 247, 0.2);
          transition: border-color 0.3s;
        }

        @media (min-width: 640px) {
          .timeline-card {
            padding: 24px;
          }
        }

        @media (min-width: 768px) {
          .timeline-card {
            padding: 28px;
            border-radius: 16px;
          }
        }

        @media (min-width: 1024px) {
          .timeline-card {
            padding: 32px;
          }
        }

        .timeline-card:hover {
          border-color: rgba(168, 85, 247, 0.4);
        }

        .timeline-duration {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 10px;
          color: #c084fc;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        @media (min-width: 640px) {
          .timeline-duration {
            gap: 8px;
            margin-bottom: 12px;
            font-size: 14px;
          }
        }

        .timeline-title {
          font-size: 18px;
          font-weight: 700;
          color: white;
          margin-bottom: 6px;
          transition: all 0.3s;
        }

        @media (min-width: 640px) {
          .timeline-title {
            font-size: 20px;
            margin-bottom: 8px;
          }
        }

        @media (min-width: 768px) {
          .timeline-title {
            font-size: 22px;
          }
        }

        @media (min-width: 1024px) {
          .timeline-title {
            font-size: 24px;
          }
        }

        .timeline-card:hover .timeline-title {
          background: linear-gradient(to right, #c084fc, #67e8f9);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .timeline-company {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 12px;
          color: #9ca3af;
          font-weight: 500;
          font-size: 14px;
        }

        @media (min-width: 640px) {
          .timeline-company {
            gap: 8px;
            margin-bottom: 14px;
            font-size: 15px;
          }
        }

        @media (min-width: 768px) {
          .timeline-company {
            margin-bottom: 16px;
          }
        }

        .timeline-description {
          color: #d1d5db;
          line-height: 1.75;
          font-size: 14px;
        }

        @media (min-width: 640px) {
          .timeline-description {
            font-size: 15px;
          }
        }

        @media (min-width: 768px) {
          .timeline-description {
            font-size: 16px;
          }
        }

        /* Contact Section */
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }

        @media (min-width: 768px) {
          .contact-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 40px;
          }
        }

        @media (min-width: 1024px) {
          .contact-grid {
            gap: 48px;
          }
        }

        @media (min-width: 1280px) {
          .contact-grid {
            gap: 64px;
          }
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        @media (min-width: 768px) {
          .contact-info {
            gap: 24px;
          }
        }

        .contact-item-wrapper {
          position: relative;
        }

        .contact-item-glow {
          position: absolute;
          inset: -3px;
          background: linear-gradient(to right, #a855f7, #ec4899);
          border-radius: 14px;
          filter: blur(1px);
          opacity: 0.2;
          transition: opacity 0.5s;
        }

        @media (min-width: 768px) {
          .contact-item-glow {
            inset: -4px;
            border-radius: 16px;
          }
        }

        .contact-item-wrapper:hover .contact-item-glow {
          opacity: 0.4;
        }

        .contact-item {
          position: relative;
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 18px;
          border-radius: 14px;
          background: rgba(31, 41, 55, 0.5);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(168, 85, 247, 0.2);
          transition: border-color 0.3s;
        }

        @media (min-width: 640px) {
          .contact-item {
            gap: 14px;
            padding: 20px;
          }
        }

        @media (min-width: 768px) {
          .contact-item {
            gap: 16px;
            padding: 24px;
            border-radius: 16px;
          }
        }

        .contact-item:hover {
          border-color: rgba(168, 85, 247, 0.4);
        }

        .contact-icon {
          padding: 10px;
          background: linear-gradient(to bottom right, #a855f7, #ec4899);
          border-radius: 10px;
          color: white;
          display: flex;
          flex-shrink: 0;
        }

        @media (min-width: 768px) {
          .contact-icon {
            padding: 12px;
            border-radius: 12px;
          }
        }

        .contact-text h3 {
          font-weight: 700;
          color: white;
          margin-bottom: 4px;
          font-size: 16px;
        }

        @media (min-width: 768px) {
          .contact-text h3 {
            font-size: 18px;
          }
        }

        .contact-text p {
          color: #9ca3af;
          font-size: 14px;
          word-break: break-word;
        }

        @media (min-width: 768px) {
          .contact-text p {
            font-size: 15px;
          }
        }

        .social-section {
          padding-top: 20px;
        }

        @media (min-width: 768px) {
          .social-section {
            padding-top: 24px;
          }
        }

        .social-title {
          font-size: 18px;
          font-weight: 700;
          color: white;
          margin-bottom: 12px;
        }

        @media (min-width: 768px) {
          .social-title {
            font-size: 20px;
            margin-bottom: 16px;
          }
        }

        .social-links {
          display: flex;
          gap: 12px;
        }

        @media (min-width: 768px) {
          .social-links {
            gap: 16px;
          }
        }

        .social-link-large {
          padding: 14px;
          background: linear-gradient(to bottom right, #374151, #111827);
          border-radius: 10px;
          color: white;
          box-shadow: 0 8px 12px -3px rgba(0, 0, 0, 0.3);
          transition: box-shadow 0.3s;
          display: inline-flex;
          text-decoration: none;
        }

        @media (min-width: 768px) {
          .social-link-large {
            padding: 16px;
            border-radius: 12px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
          }
        }

        .social-link-large:hover {
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
        }

        .contact-form-wrapper {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        @media (min-width: 768px) {
          .contact-form-wrapper {
            gap: 24px;
          }
        }

        .form-group {
          width: 100%;
        }

        .form-input {
          width: 100%;
          padding: 14px 20px;
          border-radius: 10px;
          background: rgba(31, 41, 55, 0.5);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(168, 85, 247, 0.2);
          outline: none;
          transition: all 0.3s;
          color: white;
          font-size: 15px;
        }

        @media (min-width: 768px) {
          .form-input {
            padding: 16px 24px;
            border-radius: 12px;
            font-size: 16px;
          }
        }

        .form-input::placeholder {
          color: #6b7280;
        }

        .form-input:focus {
          border-color: #a855f7;
          box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.5);
        }

        .form-input-cyan:focus {
          border-color: #06b6d4;
          box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.5);
        }

        .form-textarea {
          width: 100%;
          padding: 14px 20px;
          border-radius: 10px;
          background: rgba(31, 41, 55, 0.5);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(59, 130, 246, 0.2);
          outline: none;
          transition: all 0.3s;
          color: white;
          font-size: 15px;
          resize: none;
          font-family: 'Inter', sans-serif;
        }

        @media (min-width: 768px) {
          .form-textarea {
            padding: 16px 24px;
            border-radius: 12px;
            font-size: 16px;
          }
        }

        .form-textarea::placeholder {
          color: #6b7280;
        }

        .form-textarea:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
        }

        .form-submit {
          width: 100%;
          padding: 14px 28px;
          background: linear-gradient(to right, #a855f7, #06b6d4);
          color: white;
          border-radius: 10px;
          font-weight: 700;
          font-size: 16px;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        @media (min-width: 768px) {
          .form-submit {
            padding: 16px 32px;
            border-radius: 12px;
            font-size: 18px;
          }
        }

        .form-submit:hover {
          box-shadow: 0 20px 25px -5px rgba(168, 85, 247, 0.5);
        }

        /* Footer */
        .footer {
          position: relative;
          background: black;
          color: white;
          padding: 48px 0;
          overflow: hidden;
        }

        @media (min-width: 768px) {
          .footer {
            padding: 64px 0;
          }
        }

        .footer-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(88, 28, 135, 0.2), transparent);
        }

        .scroll-top {
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
          padding: 14px;
          background: linear-gradient(to right, #a855f7, #06b6d4);
          border-radius: 50%;
          box-shadow: 0 20px 40px -10px rgba(168, 85, 247, 0.5);
          z-index: 10;
          border: none;
          color: white;
          cursor: pointer;
        }

        @media (min-width: 768px) {
          .scroll-top {
            top: -24px;
            padding: 16px;
            box-shadow: 0 25px 50px -12px rgba(168, 85, 247, 0.5);
          }
        }

        .footer-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 16px;
          position: relative;
          z-index: 10;
        }

        @media (min-width: 640px) {
          .footer-container {
            padding: 0 24px;
          }
        }

        .footer-content {
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        @media (min-width: 768px) {
          .footer-content {
            gap: 32px;
          }
        }

        .footer-social {
          display: flex;
          justify-content: center;
          gap: 16px;
        }

        @media (min-width: 768px) {
          .footer-social {
            gap: 24px;
          }
        }

        .footer-social-link {
          padding: 10px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(4px);
          border-radius: 50%;
          border: 1px solid rgba(168, 85, 247, 0.2);
          color: white;
          transition: all 0.3s;
          display: inline-flex;
          text-decoration: none;
        }

        @media (min-width: 768px) {
          .footer-social-link {
            padding: 12px;
          }
        }

        .footer-social-link:hover {
          border-color: rgba(168, 85, 247, 0.6);
          background: rgba(255, 255, 255, 0.1);
        }

        .footer-divider {
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(168, 85, 247, 0.5), transparent);
        }

        .footer-text {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        @media (min-width: 768px) {
          .footer-text {
            gap: 8px;
          }
        }

        .footer-copyright {
          color: #9ca3af;
          font-size: 15px;
        }

        @media (min-width: 768px) {
          .footer-copyright {
            font-size: 18px;
          }
        }

        .footer-name {
          color: white;
          font-weight: 600;
        }

        .footer-credits {
          font-size: 13px;
          color: #6b7280;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          flex-wrap: wrap;
        }

        @media (min-width: 768px) {
          .footer-credits {
            font-size: 14px;
            gap: 8px;
          }
        }

        .footer-heart {
          color: #ef4444;
        }

        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        ::-webkit-scrollbar {
          width: 10px;
        }

        @media (min-width: 768px) {
          ::-webkit-scrollbar {
            width: 12px;
          }
        }

        ::-webkit-scrollbar-track {
          background: #0a0a0a;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #a855f7, #06b6d4);
          border-radius: 6px;
          border: 2px solid #0a0a0a;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #9333ea, #0891b2);
        }

        ::selection {
          background: rgba(168, 85, 247, 0.3);
          color: white;
        }

        *:focus-visible {
          outline: 2px solid #a855f7;
          outline-offset: 4px;
          border-radius: 4px;
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </ThemeProvider>
  );
}

export default App;