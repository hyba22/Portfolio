import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import './navbar.css'
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const [activeSection, setActiveSection] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const navItems = [
        {id : 'education', name: 'Education'},
        {id : 'experience', name: 'Experience'},
        {id : 'skills', name: 'My Skills'},
        {id : 'projects', name: 'Projects'},
        {id : 'about', name: 'About me'},
        {id : 'contact', name: 'Contact'},
    ]

    const handleNavClick = (itemName : string) => {
        setActiveSection(itemName.toLowerCase());
        setIsMenuOpen(false);
    };

    return(
        <div className="navbar flex justify-center w-full fixed z-50 top-4">
            <motion.nav 
                initial={{ y: -100 }} 
                animate={{ y: 0 }} 
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center rounded-2xl px-4 lg:px-8 py-2 shadow-lg overflow-hidden"
                layout 
            >
                <motion.div 
                    className="navcontainer flex flex-col w-full lg:flex-row lg:items-center lg:justify-between"
                    layout 
                    transition={{
                        type: "spring",
                        damping: 25,
                        stiffness: 300,
                        duration: 0.3
                    }}
                >
                    {/* Top row with logo and hamburger button - always visible */}
                    <div className="flex items-center justify-between w-full">
                        {/* Logo section */}
                        <div className="flex items-center">
                            <Link to='/' className="logo flex no-underline items-center space-x-2">
                                <span className="font-bold text-white">Portfolio</span>
                            </Link>
                        </div>
                        
                        {/* Hamburger button visible on small screens - Clean styling */}
                        <button
                            className="hamburger-btn text-white lg:hidden p-0 m-0 border-0 bg-transparent focus:outline-none focus:ring-0 focus:ring-offset-0 hover:bg-transparent active:bg-transparent"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle navigation menu"
                        >
                            <motion.div
                                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {isMenuOpen ? (
                                    <FaTimes size={24} className="text-white" />
                                ) : (
                                    <FaBars size={24} className="text-white" />
                                )}
                            </motion.div>
                        </button>
                        
                        {/* Desktop menu - hidden on mobile */}
                        <div className="navItems hidden lg:flex items-center space-x-6">
                            {navItems.map((item) => (
                                <Link key={item.id} to={`#${item.id}`} className="nav-link relative no-underline text-white" onClick={() => handleNavClick(item.name)}>
                                    <motion.span 
                                        className="font-medium duration-300"
                                        whileHover={{scale:1.05}}
                                        whileTap={{scale:0.95}}>
                                        {item.name}
                                    </motion.span>
                                </Link>
                            ))}
                        </div>
                    </div>
                    
                    {/* Mobile dropdown menu - appears below when open */}
                    {isMenuOpen && (
                        <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mobile-menu flex flex-col items-start w-full mt-4 lg:hidden"
                        >
                            {navItems.map((item) => (
                                <Link
                                    key={item.id}
                                 to={`#${item.id}`}
                                    className="nav-link no-underline w-full p-2 rounded-md text-white duration-200 "
                                    onClick={() => handleNavClick(item.name)}
                                >
                                    <span className="">
                                        {item.name}
                                    </span>
                                </Link>
                            ))}
                        </motion.div>
                    )}
                </motion.div>
            </motion.nav>
        </div>
    )
}

export default Navbar;