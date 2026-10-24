import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FaPaperPlane, FaRobot, FaTimes } from 'react-icons/fa';
import { askAI, type ChatTurn } from './ai';
import { answerQuestion, suggestions, type Reply } from './knowledge';
import './chatbot.css';

type Message = { id: number; from: 'bot' | 'user'; reply: Reply };

// a markdown link [label](url), or a bare url / email / the resume path
const linkPattern = /\[([^\]]+)\]\(([^)\s]+)\)|(https?:\/\/[^\s)]+[^\s).,!?]|mailto:\S+|\/Bouslahi_Hiba_Resume\.pdf)/g;

const linkLabel = (href: string) =>
    href.startsWith('/') ? 'Download resume' : href.replace(/^(https?:\/\/|mailto:)/, '').replace(/\/$/, '');

// AI answers come as light markdown: drop the ** and make links clickable
const MessageText = ({ text }: { text: string }) => {
    const clean = text.replace(/\*\*(.+?)\*\*/g, '$1').replace(/^\s*[*-]\s+/gm, '• ');
    const parts: React.ReactNode[] = [];
    let last = 0;
    for (const match of clean.matchAll(linkPattern)) {
        const href = match[2] ?? match[3];
        parts.push(clean.slice(last, match.index));
        parts.push(
            <a key={match.index} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                {match[1] ?? linkLabel(href)}
            </a>
        );
        last = match.index + match[0].length;
    }
    parts.push(clean.slice(last));
    return <>{parts}</>;
};

// said once, the first time the AI is unavailable and the written answers take over
const offlineNotes = [
    "My AI brain is taking a little break right now 😅, so here's the short version:",
    "I'm running in simple mode for a moment (my AI side is resting), but here's what I can tell you:",
];

const welcome: Message = {
    id: 0,
    from: 'bot',
    reply: { text: "Hi there! 👋 I'm Hiba's assistant. Ask me anything about her: her skills, her projects, her experience, or how to get in touch." },
};

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([welcome]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const listRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const nextId = useRef(1);
    const toldOffline = useRef(false);

    // keep the latest message in view
    useEffect(() => {
        listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
    }, [messages, isTyping]);

    useEffect(() => {
        if (!isOpen) return;
        inputRef.current?.focus();
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [isOpen]);

    const ask = async (question: string) => {
        const text = question.trim();
        if (!text || isTyping) return;
        const userMessage: Message = { id: nextId.current++, from: 'user', reply: { text } };
        setMessages((m) => [...m, userMessage]);
        setInput('');
        setIsTyping(true);

        // the conversation so far, so the AI understands follow-ups like "and what about her studies?"
        const history: ChatTurn[] = [...messages.slice(1), userMessage].map((m) => ({
            role: m.from === 'user' ? 'user' : 'assistant',
            content: m.reply.text,
        }));
        // wait at least a short moment so even instant offline answers feel like a reply
        const [aiAnswer] = await Promise.all([askAI(history), new Promise((resolve) => setTimeout(resolve, 700))]);
        let reply: Reply = aiAnswer ? { text: aiAnswer } : answerQuestion(text);
        if (!aiAnswer && !reply.casual && !toldOffline.current) {
            toldOffline.current = true;
            const note = offlineNotes[nextId.current % offlineNotes.length];
            reply = { ...reply, text: `${note}\n\n${reply.text}` };
        }

        const botMessage: Message = { id: nextId.current++, from: 'bot', reply };
        setMessages((m) => [...m, botMessage]);
        setIsTyping(false);
    };

    return (
        <div className="chatbot">
            <AnimatePresence>
                {isOpen && (
                    <motion.section
                        className="chatbot-panel"
                        role="dialog"
                        aria-label="Chat with Hiba's assistant"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.25 }}
                    >
                        {/* header */}
                        <header className="chatbot-header">
                            <div className="chatbot-avatar">
                                <FaRobot />
                            </div>
                            <div className="chatbot-header-text">
                                <h2>Hiba's Assistant</h2>
                                <span>
                                    <i className="chatbot-online-dot" /> Ask me about Hiba
                                </span>
                            </div>
                            <button className="chatbot-close" onClick={() => setIsOpen(false)} aria-label="Close chat">
                                <FaTimes />
                            </button>
                        </header>

                        {/* messages */}
                        <div className="chatbot-messages" ref={listRef} aria-live="polite">
                            {messages.map((m) => (
                                <div key={m.id} className={`chatbot-message ${m.from}`}>
                                    <p><MessageText text={m.reply.text} /></p>
                                    {m.reply.links && (
                                        <div className="chatbot-links">
                                            {m.reply.links.map((l) => (
                                                <a
                                                    key={l.href}
                                                    href={l.href}
                                                    target={l.href.startsWith('http') ? '_blank' : undefined}
                                                    rel="noopener noreferrer"
                                                    download={l.href.endsWith('.pdf') ? true : undefined}
                                                >
                                                    {l.label}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            {isTyping && (
                                <div className="chatbot-message bot chatbot-typing" aria-label="Assistant is typing">
                                    <span /><span /><span />
                                </div>
                            )}
                        </div>

                        {/* quick questions */}
                        <div className="chatbot-suggestions">
                            {suggestions.map((s) => (
                                <button key={s} onClick={() => ask(s)} disabled={isTyping}>
                                    {s}
                                </button>
                            ))}
                        </div>

                        {/* input */}
                        <form
                            className="chatbot-form"
                            onSubmit={(e) => {
                                e.preventDefault();
                                ask(input);
                            }}
                        >
                            <input
                                ref={inputRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask a question..."
                                aria-label="Your question"
                                maxLength={300}
                            />
                            <button type="submit" aria-label="Send" disabled={!input.trim() || isTyping}>
                                <FaPaperPlane />
                            </button>
                        </form>
                    </motion.section>
                )}
            </AnimatePresence>

            {/* floating robot button */}
            <motion.button
                className={`chatbot-toggle ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen((o) => !o)}
                aria-label={isOpen ? 'Close chat' : 'Open chat with Hiba\'s assistant'}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
            >
                {isOpen ? <FaTimes /> : <FaRobot />}
            </motion.button>
        </div>
    );
};

export default ChatBot;
