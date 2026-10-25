import { contact, education, experiences, projects, skills } from '../../data/config';
import { profile } from './context';

// offline answers from the portfolio data: used when the AI (see ai.ts) is unreachable or out of free quota

export type ReplyLink = { label: string; href: string };
// casual: small talk (hello, thanks) that sounds the same with or without the AI
export type Reply = { text: string; links?: ReplyLink[]; casual?: boolean };

const email = contact.find((c) => c.title === 'Email')?.description ?? '';
const phone = contact.find((c) => c.title === 'Phone Number')?.description ?? '';
const address = contact.find((c) => c.title === 'Address')?.description ?? '';

const links = {
    linkedin: { label: 'LinkedIn', href: profile.linkedin },
    github: { label: 'GitHub', href: profile.github },
    email: { label: 'Send an email', href: `mailto:${email}` },
    resume: { label: 'Download resume', href: profile.resume },
};

// lowercase, strip accents and punctuation so "Node.js" and "node js" compare equal
const normalize = (text: string) =>
    ` ${text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9#+]+/g, ' ')
        .trim()} `;

const has = (text: string, phrase: string) => text.includes(normalize(phrase));

// a word list matches if any question word starts with one of the keywords
const countKeywords = (words: string[], keywords: string[]) =>
    keywords.filter((k) => words.some((w) => w === k || (k.length >= 4 && w.startsWith(k)))).length;

const bulletList = (items: string[]) => items.map((i) => `• ${i}`).join('\n');

// ---------- technologies ----------

const techAliases: Record<string, string[]> = {
    'Node.js': ['node', 'nodejs'],
    NestJS: ['nest', 'nestjs'],
    TypeScript: ['ts'],
    JavaScript: ['js'],
    'Tailwind CSS': ['tailwind', 'tailwindcss'],
    SQL: ['postgres', 'postgresql', 'database', 'databases'],
    'Spring Boot': ['spring', 'springboot'],
    Docker: ['containers', 'containerization'],
    Jenkins: ['ci', 'cd', 'devops'],
    MERN: ['mongodb', 'mongo', 'express'],
};

type Tech = { name: string; terms: string[] };

const techList: Tech[] = (() => {
    const names = [
        ...skills.map((s) => s.skill),
        ...projects.flatMap((p) => p.tags),
        'Angular', 'Flutter', 'Spring Boot', 'MERN', 'WebSocket', 'MySQL', 'JWT', 'NoSQL',
        // common technologies that are not in the portfolio, so the bot can say so
        'Python', 'PHP', 'Vue', 'Kotlin', 'Swift', 'Golang', 'Ruby', 'C++', 'AWS', 'Azure', 'Kubernetes', 'Django', 'Laravel',
    ];
    const byKey = new Map<string, Tech>();
    for (const name of names) {
        const key = normalize(name);
        if (!byKey.has(key)) byKey.set(key, { name, terms: [name] });
    }
    for (const [name, aliases] of Object.entries(techAliases)) {
        const key = normalize(name);
        const tech = byKey.get(key) ?? { name, terms: [name] };
        tech.terms.push(...aliases);
        byKey.set(key, tech);
    }
    // ignore project tags that are topics rather than technologies
    const topics = ['healthcare', 'agriculture', 'animals', 'management', 'notifications', 'real time', 'frontend', 'responsive design', 'particles'];
    return [...byKey.values()].filter((t) => !topics.includes(normalize(t.name).trim()));
})();

const findTechs = (q: string) => {
    const found = techList
        .map((tech) => ({ tech, matched: tech.terms.map(normalize).filter((term) => q.includes(term)) }))
        .filter((f) => f.matched.length);
    // "sql" inside "pl sql" or "js" inside "node js": keep only the longest match
    return found
        .filter((f) => !f.matched.every((term) => found.some((o) => o !== f && o.matched.some((t) => t.length > term.length && t.includes(term)))))
        .map((f) => f.tech);
};

const skillLevel = (tech: Tech) =>
    skills.find((s) => tech.terms.some((term) => normalize(s.skill) === normalize(term)));

// pick one phrasing at random so the same question doesn't always get the exact same words
const pick = (...options: string[]) => options[Math.floor(Math.random() * options.length)];

// "a, b and c"
const joinNatural = (items: string[]) =>
    items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;

// job titles in the data are written like CV lines, so lowercase the first letter inside a sentence
const lowerFirst = (text: string) => text.charAt(0).toLowerCase() + text.slice(1);

// "an LLS interpreter", "a web developer"
const withArticle = (title: string) => `${/^([aeiou]|lls)/i.test(title) ? 'an' : 'a'} ${title}`;

// "MedFlow - Healthcare Management" reads better as just "MedFlow" in a sentence
const shortTitle = (p: { title: string }) => p.title.split(' - ')[0];

const techAnswer = (techList: Tech[]): Reply => {
    const parts = techList.map((tech) => {
        const mentions = (text: string) => tech.terms.some((term) => has(normalize(text), term));
        const level = skillLevel(tech);
        const inProjects = projects.filter((p) => p.tags.some(mentions) || mentions(p.description));
        const inJobs = experiences.filter((e) => mentions(e.description));
        const inBio = mentions(profile.summary);

        if (!level && !inProjects.length && !inJobs.length && !inBio) {
            return pick(
                `Hmm, I don't see ${tech.name} anywhere in Hiba's portfolio. She's a quick learner though, so it's worth asking her directly through the contact form!`,
                `${tech.name} isn't something Hiba lists here, as far as I can tell. If it matters for your project, just drop her a message. She'll give you an honest answer.`
            );
        }
        const lines = [
            level
                ? pick(`Yes! ${tech.name} is one of Hiba's skills.`, `Definitely, ${tech.name} is part of her toolkit.`)
                : pick(`Yes, Hiba has worked with ${tech.name}.`, `She has, yes! ${tech.name} shows up in her work.`),
        ];
        if (inJobs.length) lines.push(`She used it professionally as ${joinNatural(inJobs.map((e) => `${withArticle(lowerFirst(e.title))} at ${e.company}`))}.`);
        if (inProjects.length) lines.push(`You can see it in action in ${inProjects.length === 1 ? 'her project' : 'these projects'}: ${joinNatural(inProjects.map((p) => p.title))}.`);
        return lines.join('\n');
    });
    return { text: parts.join('\n\n') };
};

// ---------- canned answers ----------

const answers = {
    greeting: (): Reply => ({
        casual: true,
        text: pick(
            "Hi there! 👋 I'm Hiba's assistant. What would you like to know about her? Her projects, her experience, how to reach her... ask away!",
            "Hello! Nice to meet you. 😊 I can tell you all about Hiba: her skills, her work, her studies. Where should we start?",
            "Hey! Glad you stopped by. Ask me anything about Hiba and I'll do my best to help."
        ),
    }),
    thanks: (): Reply => ({
        casual: true,
        text: pick(
            "You're very welcome! Anything else you're curious about?",
            "My pleasure! 😊 Feel free to ask if something else comes to mind.",
            "Happy to help! And if you'd like to talk to Hiba herself, the contact form is right on this page."
        ),
    }),
    bot: (): Reply => ({
        casual: true,
        text: "I'm Hiba's little assistant 🤖. I know everything that's on this portfolio, so I can answer questions about her work and background. For anything more personal or detailed, Hiba would love to hear from you directly!",
    }),
    about: (): Reply => ({
        text:
            "Hiba Bouslahi is a full-stack developer from Tunis who loves building apps that are clean, scalable and actually useful. 💻\n\n" +
            'She works across the whole stack: React, Angular and TypeScript on the front end, NestJS and Spring Boot on the back end, SQL and NoSQL databases, and DevOps with Docker and Jenkins.\n\n' +
            `She speaks ${joinNatural(profile.spokenLanguages)} fluently, and right now she also works as ${joinNatural(
                currentJobs().map((e) => `${withArticle(e.title)} at ${e.company}`)
            )}. She's always learning something new!`,
        links: [links.resume, links.linkedin],
    }),
    skills: (): Reply => {
        const groups: [string, string[]][] = [
            ['Front end', ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind', 'Figma']],
            ['Back end and databases', ['Node.js', 'NestJS', 'SQL', 'PL/SQL']],
            ['DevOps and tools', ['Docker', 'Jenkins', 'Git', 'GitHub']],
        ];
        const grouped = groups.flatMap(([, names]) => names);
        const others = skills.map((s) => s.skill).filter((name) => !grouped.includes(name));
        const lines = groups
            .map(([label, names]) => [label, names.filter((n) => skills.some((s) => s.skill === n))] as const)
            .filter(([, names]) => names.length)
            .map(([label, names]) => `${label}: ${joinNatural([...names])}`);
        if (others.length) lines.push(`Also: ${joinNatural(others)}`);
        return {
            text: `Hiba has a pretty wide toolkit! Here's what she works with:\n${bulletList(lines)}\n\nShe's also used Angular, Spring Boot, Flutter, MySQL and WebSocket in her projects. Curious about a specific one? Just ask, like "does she know Docker?"`,
        };
    },
    experience: (): Reply => ({
        text: `Hiba's path is a bit of everything, which is what makes it interesting:\n${bulletList(experiences.map((e) => `${e.title} at ${e.company} (${e.year})`))}\n\nWant the details on one of them? Just mention the company name.`,
    }),
    current: (): Reply => ({
        text: currentJobs()
            .map((e) => `These days Hiba works as ${withArticle(e.title)} at ${e.company}.\n\n${e.description}`)
            .join('\n\n'),
    }),
    education: (): Reply => ({
        text: `Hiba has two degrees, one in data and one in software, which is a nice mix!\n\n${education.map((e) => `• ${e.title}: ${e.description}`).join('\n\n')}`,
    }),
    projects: (): Reply => ({
        text: `Oh, she's been busy! Hiba has built ${projects.length} projects so far:\n${bulletList(projects.map((p) => `${p.title}: ${p.category}`))}\n\nAsk me about any of them by name and I'll tell you more.`,
        links: [links.github],
    }),
    project: (p: (typeof projects)[number]): Reply => ({
        text: `${pick(`Ah, ${shortTitle(p)}! Good choice.`, `Sure, let me tell you about ${shortTitle(p)}.`, `${shortTitle(p)}, one of my favorites!`)}\n\n${p.description}\n\nTech used: ${p.tags.join(', ')}.`,
        links: [
            ...('liveLink' in p && p.liveLink ? [{ label: 'Open the website', href: p.liveLink }] : []),
            { label: p.githubLink.includes('/releases') ? 'Download the app' : 'See the code on GitHub', href: p.githubLink },
        ],
    }),
    job: (list: typeof experiences): Reply => ({
        text: list
            .map((e) => {
                const ongoing = /present/i.test(e.year);
                return `${ongoing ? 'Right now Hiba works' : 'Hiba worked'} as ${withArticle(e.title)} at ${e.company} (${e.year}).\n\n${e.description}`;
            })
            .join('\n\n'),
    }),
    contact: (): Reply => ({
        text: `Hiba would love to hear from you! 😊 Here's how to reach her:\n• Email: ${email}\n• Phone: ${phone}\n• Address: ${address}\n\nOr just use the contact form on this page, she reads every message.`,
        links: [links.email, links.linkedin],
    }),
    email: (): Reply => ({
        text: pick(`Sure! Her email is ${email}. She usually replies quickly.`, `You can write to her at ${email}. Don't be shy!`),
        links: [links.email],
    }),
    phone: (): Reply => ({ text: `Of course, her number is ${phone}. If you're calling from abroad, that's a Tunisian number (+216).` }),
    address: (): Reply => ({ text: `Hiba lives in Tunis, Tunisia 🇹🇳 (${address}).` }),
    linkedin: (): Reply => ({ text: "Here's her LinkedIn. Feel free to connect, she's happy to grow her network!", links: [links.linkedin] }),
    github: (): Reply => ({ text: 'Want to see her code? Here is her GitHub, with all her projects.', links: [links.github] }),
    resume: (): Reply => ({ text: "Of course! Here's her resume, ready to download. 📄", links: [links.resume] }),
    languages: (): Reply => ({
        text: `Hiba speaks ${joinNatural(profile.spokenLanguages)} fluently! 🌍 In fact, languages are part of her job: she works as a professional French-English interpreter for LanguageLine Solutions.`,
    }),
    hire: (): Reply => ({
        text: `Great question! Hiba is a full-stack developer with React, TypeScript, NestJS, Spring Boot, SQL, Docker and Jenkins under her belt, and she's open to talking about opportunities.\n\nThe best way is to email her at ${email} or send a message through the contact form. I'm sure she'd be happy to chat!`,
        links: [links.email, links.linkedin, links.resume],
    }),
    fallback: (): Reply => ({
        text: pick(
            "Hmm, I'm not sure about that one, sorry! 😅 I only know what's on Hiba's portfolio. Try asking about her skills, projects, experience or studies.",
            "Good question, but I don't have the answer to that! I'm best with things like her projects, skills, experience or how to contact her. And for anything else, Hiba is just a message away."
        ),
    }),
};

function currentJobs() {
    return experiences.filter((e) => /present/i.test(e.year));
}

// ---------- matching ----------

const intents: { name: keyof typeof answers; keywords: string[] }[] = [
    { name: 'skills', keywords: ['skill', 'tech', 'stack', 'know', 'programming', 'framework', 'tool', 'good', 'competence', 'technolog', 'expert', 'strength'] },
    { name: 'experience', keywords: ['experience', 'work', 'worked', 'job', 'career', 'intern', 'company', 'companies', 'employ', 'position', 'role', 'stage'] },
    { name: 'education', keywords: ['study', 'studied', 'studies', 'degree', 'university', 'school', 'education', 'diploma', 'bachelor', 'graduat', 'formation', 'etude', 'college'] },
    { name: 'projects', keywords: ['project', 'projet', 'built', 'build', 'app', 'apps', 'application', 'portfolio', 'made', 'create', 'realisation'] },
    { name: 'about', keywords: ['who', 'yourself', 'herself', 'introduce', 'describe', 'summary', 'profile', 'background', 'hiba', 'presente', 'qui'] },
    { name: 'contact', keywords: ['contact', 'reach', 'touch', 'joindre', 'coordonnee'] },
    { name: 'hire', keywords: ['hire', 'hiring', 'available', 'availability', 'freelance', 'recruit', 'opportunit', 'offer', 'embauche'] },
];

const stopwords = new Set(
    'a an the is are was were be been do does did what which who whom how when where why can could would should will i you he she her his your my me we they it its of in on at to for with and or about tell give show list any some has have had this that there from by as please hiba'.split(' ')
);

// last resort: return the portfolio entry sharing the most words with the question
function searchEverything(words: string[]): Reply | null {
    const useful = words.filter((w) => w.length > 2 && !stopwords.has(w));
    if (!useful.length) return null;
    const docs: { text: string; reply: () => Reply }[] = [
        ...projects.map((p) => ({ text: `${p.title} ${p.category} ${p.description} ${p.tags.join(' ')}`, reply: () => answers.project(p) })),
        ...experiences.map((e) => ({ text: `${e.title} ${e.company} ${e.description}`, reply: () => answers.job([e]) })),
        ...education.map((e) => ({ text: `${e.title} ${e.description}`, reply: () => ({ text: `That sounds like her ${e.title}!\n\n${e.description}` }) })),
        { text: profile.summary, reply: answers.about },
    ];
    let best: { score: number; reply: () => Reply } | null = null;
    for (const doc of docs) {
        const docWords = normalize(doc.text).trim().split(' ');
        const score = countKeywords(docWords, useful);
        if (score > 0 && (!best || score > best.score)) best = { score, reply: doc.reply };
    }
    return best ? best.reply() : null;
}

export function answerQuestion(question: string): Reply {
    const q = normalize(question);
    const words = q.trim().split(' ').filter(Boolean);
    const compact = q.replace(/ /g, '');
    if (!words.length) return answers.greeting();

    const any = (...phrases: string[]) => phrases.some((p) => has(q, p));
    const startsWithAny = (...stems: string[]) => countKeywords(words, stems) > 0;

    if (words.length <= 3 && any('hi', 'hello', 'hey', 'bonjour', 'salut', 'good morning', 'good evening', 'salam')) return answers.greeting();
    if (any('thanks', 'thank you', 'thx', 'merci')) return answers.thanks();
    if (any('are you a bot', 'are you an ai', 'are you real', 'are you human', 'what are you', 'who are you')) return answers.bot();

    // direct contact details
    if (any('linkedin')) return answers.linkedin();
    if (any('github', 'source code', 'repo', 'repository') && !startsWithAny('project')) return answers.github();
    if (any('email', 'e mail', 'mail', 'gmail')) return answers.email();
    if (any('phone', 'call her', 'whatsapp', 'telephone', 'numero')) return answers.phone();
    if (any('address', 'live', 'lives', 'located', 'location', 'based', 'city', 'country', 'where is she from', 'where are you from', 'adresse', 'habite')) return answers.address();
    if (any('resume', 'cv', 'curriculum')) return answers.resume();

    // spoken languages (not programming languages)
    if (any('speak', 'spoken', 'fluent', 'french', 'english', 'arabic', 'langue', 'interpreter', 'interpreting', 'translation') || (startsWithAny('language') && !any('programming', 'coding', 'code'))) {
        if (any('interpreter', 'interpreting', 'translation')) return answers.job(experiences.filter((e) => /interpreter/i.test(e.title)));
        return answers.languages();
    }

    // a specific project by name
    const project = projects.find((p) => {
        const name = normalize(p.title.split(' - ')[0]);
        return q.includes(name) || compact.includes(name.replace(/ /g, ''));
    });
    if (project) return answers.project(project);

    // a specific company
    const companyAliases: Record<string, string[]> = {
        'Tunisian Post Office': ['post office', 'poste', 'tunisian post'],
        'Tekup University': ['tekup', 'tek up'],
        Teleperformance: ['teleperformance', 'bouygues', 'customer adviser', 'customer advisor'],
        Arabsoft: ['arabsoft', 'arab soft'],
    };
    const companies = Object.entries(companyAliases)
        .filter(([, aliases]) => any(...aliases))
        .map(([company]) => company);
    if (companies.length) {
        const jobs = experiences.filter((e) => companies.includes(e.company));
        const reply = answers.job(any('customer adviser', 'customer advisor', 'bouygues') ? jobs.filter((e) => /customer/i.test(e.title)) : jobs);
        if (companies.includes('Tekup University')) {
            const degree = education.find((e) => /tek-up/i.test(e.description));
            if (degree) reply.text += `\n\nFun fact: TEK-UP is also where she earned her ${degree.title}! 🎓`;
        }
        return reply;
    }

    if (any('ihec', 'carthage', 'business intelligence')) return answers.education();
    if (any('currently', 'current', 'right now', 'nowadays', 'these days', 'now')) {
        if (!startsWithAny('skill', 'project', 'learn')) return answers.current();
    }

    // questions about a technology: "does she know Docker?", "projects with React"
    const techs = findTechs(q);
    if (techs.length) return techAnswer(techs);

    // general topic
    const scored = intents
        .map((intent) => ({ name: intent.name, score: countKeywords(words, intent.keywords) }))
        .filter((i) => i.score > 0)
        .sort((a, b) => b.score - a.score);
    if (scored.length) {
        // "who is hiba" should not lose to a stray keyword
        const top = scored[0].name === 'about' && scored.length > 1 && !any('who', 'introduce', 'yourself', 'herself', 'describe', 'profile', 'summary', 'background') ? scored[1].name : scored[0].name;
        return (answers[top] as () => Reply)();
    }

    return searchEverything(words) ?? answers.fallback();
}

export const suggestions = ['Who is Hiba?', 'Skills', 'Projects', 'Experience', 'Education', 'Contact'];
