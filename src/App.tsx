import ThreeBackground from "./components/background/ThreeBackground"
import Navbar from "./components/Navbar/Navbar"
import {useEffect } from "react"
import AOS from "aos";
import "aos/dist/aos.css";
import Home from "./components/home/Home"
import Education from "./components/education/Education";
import Skills from "./components/skills/Skills";
import Experience from "./components/experiences/Experience";
import Project from "./components/projects/Project";
import Contact from "./components/contact/Contact";
import Footer from "./components/footer/Footer";

function App() {
  
   useEffect(() => {
      AOS.init({
        duration: 1000,
        once: false, 
        offset: 100,
      });
      document.documentElement.classList.add("dark");
   }, []);

 

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <ThreeBackground />
      <Navbar />
      <div className="relative z-10">
        <Home />
        <Education />
        <Skills />
        <Experience />
        <Project />
        <Contact />
        <Footer />
      </div>
    </div>
  )
}

export default App
