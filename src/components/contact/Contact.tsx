import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { contact } from '../../data/config';
import './contact.css';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;
    
    setIsSubmitting(true);

    
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.error('EmailJS credentials are missing!');
    toast.error('Email service is not configured. Please contact me directly.');
    setIsSubmitting(false);
    return;
  }

    emailjs
      .sendForm(serviceId, templateId, form.current, publicKey)
      .then(
        () => {
          toast.success('Message sent successfully!');
          form.current?.reset();
        },
        (error) => {
          console.error('Failed to send message:', error);
          toast.error(error.text || 'Failed to send message. Please try again.');
        }
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <article className="container relative font-sans text-white rounded-lg p-16" id="contact">
      {/* title */}
      <motion.div
        className='contact-title'
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h1>Get in <span>Touch</span></h1>
      </motion.div>

      {/* contact container */}
      <div className='contact-container mt-32'>
        <div className='contact-info'>
          {contact.map((data) => (
            <motion.article
              key={data.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className='contact-item-wrapper'
            >
              <div className='contact-card'>
                <div className='contact-card-content'>
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
        </div>
                
        <motion.article 
          transition={{duration: 0.5, delay: 0.6}}
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          className='contact-form-container'
        >
          <form ref={form} onSubmit={sendEmail} className='contact-form'>
            <div className='form-fields'>
              <label htmlFor='name' className='form-label'>
                <input 
                  type="text" 
                  name="from_name"
                  id="name" 
                  required 
                  placeholder='Your Name' 
                  className='form-input' 
                />
              </label>
              
              <label htmlFor='email' className='form-label'>
                <input 
                  type="email" 
                  name="from_email"
                  id="email" 
                  required 
                  placeholder='Your Email' 
                  className='form-input' 
                />
              </label>
              
              <label htmlFor='phone' className='form-label'>
                <input 
                  type="tel" 
                  name="phone"
                  id="phone" 
                  required 
                  placeholder='Your Phone Number' 
                  className='form-input' 
                />
              </label>

              <label htmlFor='message' className='form-label'>
                <textarea 
                  rows={6}  
                  name="message"
                  id="message" 
                  required 
                  placeholder='Message' 
                  className='form-textarea'
                />
              </label>
              
              <div className='form-submit'>
                <button 
                  type="submit" 
                  className='submit-button'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </div>
          </form>
        </motion.article>
        <ToastContainer position="top-right" autoClose={5000} />
      </div>
    </article>
  );
};

export default Contact;