import {motion} from 'framer-motion';
import { contact } from '../../data/config';
import './contact.css';

export default function Contact(){
    return(
       <article className="container relative font-sans text-white rounded-lg p-16" id="contact">
           {/* Title Section */}
            <motion.div 
                className='contact-title'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <h1>Get in <span>Touch</span></h1>
            </motion.div>

            <section className='contact-container mt-32'>
                <section className='contact-info'>
    {contact.map((data, index) => (
        <motion.article
            key={data.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className='contact-item-wrapper'
        >
            {/* Card container */}
            <div className='contact-card'>
                <div className='contact-card-content'>
                    {/* Optional icon - you can keep or remove */}
                    {data.icon && (
                        <div className='contact-icon'>
                            <img src={data.icon} alt={data.title} width={40} height={40} />
                        </div>
                    )}
                    
                    <div className='contact-text-content'>
                        <h3 className='contact-card-title'>{data.title}</h3>
                        <p className='contact-card-description'>{data.description}</p>
                    </div>
                </div>
            </div>
        </motion.article>
    ))}
</section>
                
                <motion.article 
                transition={{duration:0.5, delay:0.6}}
                initial={{opacity:0}}
                animate={{opacity:1}}
                className='contact-form-container'
                >
                    <form action="" className='contact-form'>
                        <div className='form-fields'>
                            <label htmlFor='name' className='form-label'>
                                <input 
                                    type="text" 
                                    id="name" 
                                    required 
                                    placeholder='Your Name' 
                                    className='form-input' 
                                />
                            </label>
                            
                            <label htmlFor='email' className='form-label'>
                                <input 
                                    type="email" 
                                    id="email" 
                                    required 
                                    placeholder='Your Email' 
                                    className='form-input' 
                                />
                            </label>
                            
                            <label htmlFor='phone' className='form-label'>
                                <input 
                                    type="tel" 
                                    id="phone" 
                                    required 
                                    placeholder='Your Phone Number' 
                                    className='form-input' 
                                />
                            </label>

                            <label htmlFor='message' className='form-label'>
                                <textarea 
                                    rows={6}  
                                    id="message" 
                                    required 
                                    placeholder='Message' 
                                    className='form-textarea'
                                />
                            </label>
                            
                            <div className='form-submit'>
                                <button className='submit-button'>
                                    Send Message
                                </button>
                            </div>
                        </div>
                    </form>
                </motion.article>
            </section>
       </article>
    )
}