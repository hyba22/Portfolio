import './education.css';
import { education } from '../../data/config';
import { motion } from 'framer-motion';

export default function Education() {
    return (
        <div className='education-container relative mt-20' id='education'>
            {/* decorative blobs */}
            <div className="education-blob-1 hidden md:block" />
            <div className="education-blob-2 hidden md:block" />
            
            {/* title */}
            <motion.div 
                className='education-title'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <h1>About my <span>studies</span></h1>
            </motion.div>

            {/* cards */}
            <div className='education-grid'>
                {education.map((item, index) => (
                    <motion.div
                        key={item.id}
                        className='education-card'
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ 
                            duration: 0.8, 
                            ease: 'easeOut', 
                            delay: index * 0.2 
                        }}
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        {/* animated gradient border */}
                        <div className='gradient-border' />
                        <div className='education-card-inner'>
                            <h2 className='education-card-title'>
                                {item.title}
                            </h2>
                            <p className='education-card-description'>
                                {item.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}