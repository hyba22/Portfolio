import { motion } from 'framer-motion';
import './experience.css';
import { experiences } from '../../data/config';

interface ExperienceProps {
  title: string;
  company: string;
  icon: string;
  year: string;
  description: string; 
}

const ExperienceSection = ({ title, company, icon, year, description }: ExperienceProps) => {
    return (
        <motion.div
            className="card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false }}
        >
            <div className="card-content">
                <img src={icon} alt="icon" />
                <div className="card-text">
                    <h3>{title}</h3>
                    <p className="company">{company}</p>
                    <p className="year">{year}</p>
                    <p className="description">{description}</p>
                </div>
            </div>
        </motion.div>
    );
}

export default function Experience() {
    return (
        <div className="relative container mx-auto px-4 py-12 lg:p-16" id="experience">
            {/* Title*/}
            <div className="exp-title text-center mb-12 lg:mb-16">
                <motion.h1
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    My <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-secondary animate-pulse-slow">Experience</span>
                </motion.h1>
            </div>
            
            {/* Cards Section */}
            <div className="cards">
                {experiences.map((exp) => (
                    <ExperienceSection  
                        key={exp.id} 
                        title={exp.title} 
                        company={exp.company} 
                        year={exp.year} 
                        description={exp.description} 
                        icon={exp.icon} 
                    />
                ))}
            </div>
        </div>
    );
}