import { easeInOut } from 'framer-motion';

const animationDuration =2; 

export const variants = {
    initial:{pathLength:0,strokeOpacity:1,fillOpacity:0},
    animate:{
        pathLength:1,
        strokeOpacity:0,
        fillOpacity:1,
        transition:{
            duration:animationDuration,
            ease:easeInOut,
            strokeOpacity:{
                delay:animationDuration
            },
            fillOpacity:{
                delay:animationDuration
            }
        }
    }
}

//eduction data 
export const  education = [
    {
        id :1,
        title : 'Business Intelligence Bachelor',
        description : 'Earned a Bachelor degree in Business Intelligence from IHEC Carthage University. The program provided a strong foundation in data analysis, warehousing, and visualization, focusing on transforming data into strategic business insights.'
    },
    {
        id:2,
        title : 'Software Engineer Degree',
        description : "Graduated with a Software Engineer Diploma from TEK-UP University, specializing in Web and Mobile Development. Gained hands-on experience in modern development frameworks, UI/UX principles, and cross-platform application deployment."
    }
]

// skills data

export const skills = [
    {
        skill: "React",
        percentage: 80,
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
    },
    {
        skill: "HTML",
        percentage: 80,
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg'
    },
    {
        skill: "CSS",
        percentage: 80,
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg'
    },
    {
        skill: "Tailwind",
        percentage: 65,
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg'
    },
    {
        skill: "Figma",
        percentage: 65,
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg'
    },
    {
        skill: "TypeScript",
        percentage: 70,
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'
    },
    {
        skill: "Node.js",
        percentage: 70,
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg'
    },
    {
        skill: "NestJS",
        percentage: 80,
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg'
    },
    {
        skill: "SQL",
        percentage: 80,
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg'
    },
    {
        skill: "PL/SQL",
        percentage: 70,
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg'
    },
    {
        skill: "Docker",
        percentage: 70,
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg'
    },
    {
        skill: "Jenkins",
        percentage: 75,
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg'
    },
    {
        skill: "JavaScript",
        percentage: 85,
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
    },
    {
        skill: "Git",
        percentage: 85,
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg'
    },
    {
        skill: "GitHub",
        percentage: 85,
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg'
    },
];

// my experience - career 
export const experiences =[
    {
        id:1,
        title:'Web Developer intern',
        company:'Tunisian Post Office',
        year:'2022 - 4 months',
        description:'As an intern at the Post Office, I applied the MERN stack to build a custom web application for managing interns and their projects. This involved creating features for user roles, project assignment, and performance tracking for a 4-month development period.',
        icon:'https://img.icons8.com/ios-filled/64/ffffff/briefcase-settings.png'
    },
    {
        id:2,
        title:'Software Development Intern',
        company:'Tekup University',
        year:'2025 - 3 months',
        description:'Developed "SmartFalleh," a full-stack solution to assist agricultural workers with administrative procedures and ministry-related processes. Built a responsive web application using modern frameworks and created a complementary Flutter mobile app for on-the-go accessibility. Gained experience in cross-platform mobile development, UI/UX implementation, and integrating administrative workflow features into digital solutions.',
        icon:'https://img.icons8.com/ios-filled/64/ffffff/briefcase-settings.png'
    },
    {
        id:3,
        title:'Customer adviser',
        company:'Teleperformance',
        year:'2022 - 2026',
        description:'Served as a Customer Advisor for Bouygues Telecom, specializing in internet box products and services. Responsibilities include resolving technical issues, optimizing customer connectivity, providing personalized support, and maintaining high client satisfaction through effective communication and problem-solving',
        icon:'https://img.icons8.com/ios-filled/64/ffffff/customer-support.png'
    },
    {
        id:4,
        title:'LLS interpreter',
        company:'Teleperformance',
        year:'2026 - present',
        description:'Serve as a dedicated French-English interpreter for LanguageLine Solutions, supporting vital interactions between service providers and their clients. Specialize in high-stakes domains such as medical diagnosis, insurance claims, financial consultations, and social services, ensuring accurate, neutral, and empathetic communication for every call.',
        icon:'https://img.icons8.com/ios-filled/64/ffffff/translation.png'
    },
    {
        id:5,
        title:'Software engineer intern',
        company:'Arabsoft',
        year:'2026 - 4 months',
        description:'Developed a real-time chat module for product complaint management. Set up secure WebSocket communication with JWT authentication, built an automated priority scoring system (Level 1-3) using keyword analysis, and enabled administrators to collaborate on resolving complaints. Contributed across the full stack using Spring Boot, React with TypeScript, and MySQL, with Docker for containerization and Jenkins for DevOps.',
        icon:'https://img.icons8.com/ios-filled/64/ffffff/server.png'
    }
    
]

// contact data 
export const contact = [
    {
        id: 1,
        title: 'Address',
        description: '23 Rue Imam Tarmadhi, Ksar Said 2009, Tunis, Tunisia',
        icon: 'https://img.icons8.com/ios-filled/50/ffffff/address--v1.png'
    },
    {
        id: 2,
        title: 'Phone Number',
        description: '+216 50 159 271',
        icon: 'https://img.icons8.com/ios-filled/50/ffffff/phone.png'
    },
    {
        id: 3,
        title: 'Email',
        description: 'bouslahihiba55@gmail.com',
        icon: 'https://img.icons8.com/pastel-glyph/50/ffffff/new-post--v1.png'
    }
]

//projects
export const projects = [
  {
  id: 1,
  title: 'My Portfolio Website',
  description: 'A responsive personal portfolio website built with React, TypeScript, and Tailwind CSS, featuring modern animations, project showcase, and contact integration to demonstrate web development skills.',
  category: 'Frontend Development - Personal Portfolio',
  tags: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Responsive Design'],
  githubLink: 'https://github.com/hyba22/Portfolio.git',
  },
  {
  id: 2,
  title: 'OtakuTN',
  description: 'A Flutter mobile application for anime and manga enthusiasts, featuring content discovery, user ratings, and comments. Academic project showcasing mobile development skills.',
  category: 'Mobile Development - Anime/Manga App',
  tags: ['Flutter', 'Dart', 'REST API', 'Firebase'],
  githubLink: 'https://github.com/hyba22/otakutn',
  },
  {
  id: 3,
  title: 'MedFlow - Healthcare Management',
  description: 'A web application for medical appointment scheduling and patient management system, designed to streamline healthcare workflows and improve clinic efficiency.',
  category: 'Healthcare Management',
  tags: ['React', 'TypeScript', 'REST API', 'Healthcare', 'NestJs', 'Stripe', 'Tailwind', 'MySql'],
  githubLink: 'https://github.com/jesser-bensalah/MedFlow/tree/HybaRepo',
  },
  {
    id: 4,
    title: 'Forstek',
    description: 'An incubation platform connecting interns, job seekers, and entrepreneurs with opportunities, project collaboration, and startup resources in a unified ecosystem.',
    category: 'Career & Startup Platform',
    tags: ['React', 'CSS', 'NestJs', 'Agriculture', 'Cloudflare', 'AI','MySql'],
    githubLink: 'https://github.com/hyba22/Forstek/tree/hybaRepository',
  },
  {
  id: 5,
  title: 'EventFlow',
  description: 'A real-time event management web application featuring live updates, notifications, and attendee coordination with WebSocket integration for instant communication.',
  category: 'Web Event Management',
  tags: ['HTML', 'CSS', 'JavaScript', 'WebSocket', 'Real-time', 'Notifications'],
  githubLink: 'https://github.com/hyba22/WebServices/tree/hybarepo',
  },
  {
  id: 6,
  title: 'SmartFalleh',
  description: 'Digital platform connecting agricultural workers with ministry services online, digitizing manual processes for better accessibility.',
  category: 'Agri-Tech Platform',
  tags: ['React', 'CSS', 'NestJs', 'Agriculture', 'Jenkins', 'Devops','MySql'],
  githubLink: 'https://github.com/abirmansour/smartFalleh/tree/HybaRepo',
  },
  {
  id: 7,
  title: 'Zanimaux',
  description: 'Digital dashboard platform for pet zoo connecting clients with suppliers, managing animal records, appointments, and inventory in a unified system.',
  category: 'Management Dashboard',
  tags: ['C#', 'CSS', 'JavaScript', 'animals', 'Management','SqLite'],
  githubLink: 'https://github.com/hyba22/gestionAnimalerie',
  },
  {
  id: 8,
  title: 'Old Portfolio Version',
  description: 'A responsive personal portfolio website built as a single-page crafted with React and enriched with dynamic particle animations.',
  category: 'Personal Portfolio',
  tags: ['React', 'CSS', 'JavaScript', 'Particles', 'Frontend'],
  githubLink: 'https://github.com/hyba22/NewPortfolio',
  },
  {
  id: 9,
  title: 'Smart Complaint',
  description: 'Real-time complaint management system with intelligent priority scoring, multi-admin collaboration, and secure WebSocket communication for enterprise SaaS platforms.',
  category: 'PFE / Real-Time Systems',
  tags: ['Spring Boot', 'WebSocket', 'React','TypeScript', 'JWT', 'Jenkins', 'Docker', 'AI', 'Cloudflare', 'MySQL'],
  githubLink: 'https://github.com/hyba22/smartComplaint',
  },
  {
  id: 10,
  title: 'Interpreters Help',
  description: 'A Windows desktop app for interpreters that transcribes whatever the computer is playing (video calls, videos, podcasts) and translates it live, side by side. Runs 100% offline with local AI models (Whisper and NLLB-200).',
  category: 'Desktop App - AI Live Transcription & Translation',
  tags: ['Tauri', 'Rust', 'React', 'TypeScript', 'AI', 'Whisper', 'NLLB-200', 'Offline'],
  githubLink: 'https://github.com/hyba22/interpretersHelp/releases/latest',
  }
];
