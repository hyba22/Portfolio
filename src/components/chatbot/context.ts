import { contact, education, experiences, projects, skills } from '../../data/config';

// facts about Hiba that are not in config.ts (same as the home section)
export const profile = {
    name: 'Hiba Bouslahi',
    summary:
        'Hiba Bouslahi is a versatile full-stack developer with hands-on experience in React, Angular, TypeScript and NestJS. ' +
        'She is proficient in both SQL and NoSQL databases and has a strong background in DevOps with Jenkins. ' +
        'She is passionate about building scalable applications and keeps improving her skills in software development and automation.',
    spokenLanguages: ['English', 'French', 'Arabic'],
    linkedin: 'https://www.linkedin.com/in/hiba-bouslahi/',
    github: 'https://github.com/hyba22',
    resume: '/Bouslahi_Hiba_Resume.pdf',
};

// everything the AI is allowed to know, as plain text. Used by the Cloudflare Worker (worker/index.ts)
export function buildPortfolioContext() {
    return [
        `# About\n${profile.summary}\nSpoken languages: ${profile.spokenLanguages.join(', ')}.`,
        `# Contact\n${contact.map((c) => `- ${c.title}: ${c.description}`).join('\n')}\n- LinkedIn: ${profile.linkedin}\n- GitHub: ${profile.github}\n- Resume (PDF download on this site): ${profile.resume}\n- There is also a contact form on this page.`,
        `# Education\n${education.map((e) => `- ${e.title}: ${e.description}`).join('\n')}`,
        `# Skills\n${skills.map((s) => s.skill).join(', ')}. Also used in projects: Angular, Spring Boot, Flutter, MySQL, WebSocket.`,
        `# Experience\n${experiences.map((e) => `- ${e.title} at ${e.company} (${e.year}): ${e.description}`).join('\n')}`,
        `# Projects\n${projects.map((p) => `- ${p.title} (${p.category}): ${p.description} Built with: ${p.tags.join(', ')}. Link: ${p.githubLink}${'liveLink' in p && p.liveLink ? ` Live website: ${p.liveLink}` : ''}`).join('\n')}`,
    ].join('\n\n');
}
