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
    const radius = 35;  
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
            <div className="relative w-28 h-28 md:w-32 md:h-32"> {/* Increased from w-20/h-20 to w-28/h-28 */}
                <svg 
                    className="w-full h-full -rotate-90" 
                    viewBox="0 0 100 100"
                >
                    {/* Background circle - increased radius to 35 */}
                    <circle 
                        cx="50" 
                        cy="50" 
                        r="35" 
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.15)"
                        strokeWidth="8"
                    />
                    
                    {/* Progress circle - increased radius to 35 */}
                    <motion.circle 
                        cx="50" 
                        cy="50" 
                        r="35" 
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
                
                {/* Center content - Both icon and percentage INSIDE */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center justify-center w-full h-full p-2">
                        {/* Icon - larger */}
                        <div className="flex items-center justify-center mb-1">
                            <img 
                                src={icon} 
                                alt={skill} 
                                className="w-7 h-7 md:w-8 md:h-8"  // Increased from w-5/h-5
                                loading="lazy"
                            />
                        </div>
                        
                        {/* Percentage - larger text */}
                        <p className="text-white font-bold text-sm md:text-base mt-0">
                            {percentage}%
                        </p>
                    </div>
                </div>
            </div>
            
            {/* Skill name below circle */}
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

            {/* Skills Grid - Adjusted columns for larger circles */}
            <div className='skills-grid max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 px-4'>
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