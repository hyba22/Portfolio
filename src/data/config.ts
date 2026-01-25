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
        id:2,
        title:'Customer adviser',
        company:'Teleperformance',
        year:'2022 - present',
        description:'Served as a Customer Advisor for Bouygues Telecom, specializing in internet box products and services. Responsibilities include resolving technical issues, optimizing customer connectivity, providing personalized support, and maintaining high client satisfaction through effective communication and problem-solving',
        icon:'https://img.icons8.com/ios-filled/64/ffffff/customer-support.png'
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
    title: 'My portfolio',
    description: 'A project made to learn Angular and PrimeNG with JWT authentication and CRUD operations.',
    category: 'Web Development',
    tags: ['Angular', 'PrimeNG', 'JWT', 'SQLite', 'CRUD'],
    githubLink: 'https://github.com/yourusername/todo-list',
  },
  {
    id: 2,
    title: 'E-commerce Platform',
    description: 'Full-stack e-commerce solution with React, Node.js, and MongoDB.',
    category: 'Full Stack',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
    githubLink: 'https://github.com/hyba22/otakutn',
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'Real-time weather application with forecast and location-based services.',
    category: 'Frontend',
    tags: ['React', 'TypeScript', 'API', 'Chart.js', 'Tailwind'],
    githubLink: 'https://github.com/yourusername/weather-app',
  }
];