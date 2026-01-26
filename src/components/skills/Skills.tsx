import { motion } from 'framer-motion';
import { skills } from '../../data/config';
import './skills.css';

interface SkillCircleProps {
  skill: string;
  percentage: number;
  icon: string;
  index: number;
}

const SkillCircle = ({ skill, percentage, icon, index }: SkillCircleProps) => {
    const radius = 30;  
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    
    return ( 
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ 
                duration: 0.4,
                delay: index * 0.03,
                ease: "easeOut"
            }}
            className="skill-circle-container flex flex-col items-center"
        >
            <div className="relative w-16 h-16 md:w-20 md:h-20"> 
                <svg 
                    className="w-full h-full -rotate-90" 
                    viewBox="0 0 100 100"
                >
                    {/* background circle */}
                    <circle 
                        cx="50" 
                        cy="50" 
                        r="30" 
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.15)"
                        strokeWidth="8"
                    />
                    
                    {/* progress circle */}
                    <motion.circle 
                        cx="50" 
                        cy="50" 
                        r="30" 
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        whileInView={{ strokeDashoffset }}
                        viewport={{ once: true }}
                        transition={{ 
                            duration: 1.2, 
                            ease: "easeInOut",
                            delay: index * 0.05 + 0.2
                        }}
                        className="skill-progress-circle"
                    />
                </svg>
                
                {/* center content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center justify-center w-full h-full p-2">
                        {/* icon */}
                        <div className="flex items-center justify-center mb-1">
                            <img 
                                src={icon} 
                                alt={skill} 
                                className="w-5 h-5 md:w-6 md:h-6"  
                                loading="lazy"
                            />
                        </div> 
                        {/* percentage */}
                        <p className="text-white font-bold text-sm md:text-base mt-0">
                            {percentage}%
                        </p>
                    </div>
                </div>
            </div>        
            {/* skill name */}
            <p className="text-white text-xs font-medium mt-2 opacity-90 tracking-wider uppercase text-center">
                {skill}
            </p>
        </motion.div>
    );
};

export default function Skills() {
    return (
        <section className='skills-section py-16 md:py-20 px-4 relative' id='skills'>
            {/* Title */}
            <div className='skills-title text-center mb-12 lg:mb-16'>
                <motion.h1
                    className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4'
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    My <span className='text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-secondary animate-pulse-slow'>Skills</span>
                </motion.h1>
            </div>

            {/* Skills Grid */}
            <div className='skills-grid'>
                {skills.map((item, index) => (
                    <SkillCircle 
                        key={index}
                        skill={item.skill} 
                        percentage={item.percentage} 
                        icon={item.icon}
                        index={index}
                    />
                ))}
            </div>
        </section>
    );
}