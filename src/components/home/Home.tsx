import { motion } from 'framer-motion';
import './Home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    return (
        <div className="home-container" id='home'>
            {/* decorative blobs */}
            <div className="home-blob-top hidden md:block"></div>
            <div className="home-blob-bottom hidden md:block"></div>
            
            <div className="home-content">
                {/* main heading */}
                <motion.h1 
                    className="home-title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Hi, I'm <span className="gradient-text">Hiba Bouslahi</span>
                </motion.h1>
                
                {/* description */}
                <motion.p 
                    className="home-description"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Error delectus, 
                    vero ullam ut quis ex blanditiis expedita sapiente libero laboriosam 
                    facilis nam dolorum ipsam reiciendis tempore obcaecati, nemo quos nesciunt.
                </motion.p>
                
                {/* buttons */}
                <motion.div
                    className="buttons-container"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <motion.button
                        className="hire-me-btn"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            navigate('#contact', { replace: true });
                            // force a scroll to the contact section
                            const contactSection = document.getElementById('contact');
                            if (contactSection) {
                                contactSection.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}

                    >
                        Hire me
                    </motion.button>
                    <motion.button
                        className="download-btn"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            const fileId = '1dQ0ukWie-3T_xyKndtQbTrU-zAFQSsJ7';
                            const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
                            const link = document.createElement('a');
                            link.href = downloadUrl;
                            link.target = '_blank';
                            link.download = 'Bouslahi-Hiba-Resume.pdf';
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                        }}
                    >
                        <svg
                            className="download-icon"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M12 16L16 11H13V4H11V11H8L12 16ZM19 18H5V20H19V18Z" />
                        </svg>
                        <span>Download Resume</span>
                    </motion.button>
                </motion.div>
            </div>
            {/* self picture */}
            <figure className='lg:h-full md:flex md:justify-end mt-20 md:mt-0'>
                <motion.div className='w-[350px] h-[350px] md:w-[400px] flex justify-center items-center p-3 rounded-full overflow-hidden relative'
                animate={{
                    backgroundColor:["#533986", "#5a7de4", "#5a96e4"],
                    scale: [1, 1.1, 1],
                    rotate: [1,5,5,1],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatType: "reverse",
                }}>
                    <div className='absolute inset-0 rounded-full bg-gradient-to-r from-[#533986] to-[#5a7de4] blur-3xl opacity-60 h-full w-full'/>
                        <img src="src/assets/me.jpeg" alt="self-pic" 
                        className='relative z-10 h-[300px] w-[300px] rounded-full shadow-2xl transform transition-transform duration-500 ease-in-out hover:scale-110'/>
                </motion.div>
            </figure>
        </div>
    );
}

export default Home;