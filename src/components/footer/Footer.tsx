import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          
          {/* social icons */}
          <div className="social-icons">
            <a 
              href="https://www.linkedin.com/in/hiba-bouslahi/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="icon-link"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="icon" />
            </a>
            <a 
              href="mailto:bouslahihiba55@gmail.com"
              className="icon-link"
              aria-label="Email"
            >
              <FaEnvelope className="icon" />
            </a>
            <a 
              href="https://github.com/hyba22" 
              target="_blank" 
              rel="noopener noreferrer"
              className="icon-link"
              aria-label="GitHub"
            >
              <FaGithub className="icon" />
            </a>
          </div>

          {/* copyright */}
          <div className="copyright">
            <span>© {new Date().getFullYear()} Hiba Bouslahi.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;