// address of the Cloudflare Worker in worker/ (not a secret: it only answers this site)
const chatApiUrl = import.meta.env.VITE_CHAT_API_URL ?? 'https://hiba-chat-portfolio.forstek.workers.dev';

export type ChatTurn = { role: 'user' | 'assistant'; content: string };

// asks the AI; returns null when it is unreachable so the caller can use the offline answers
export async function askAI(history: ChatTurn[]): Promise<string | null> {
    if (!chatApiUrl) return null;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
        const response = await fetch(chatApiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: history }),
            signal: controller.signal,
        });
        if (!response.ok) return null;
        const data = (await response.json()) as { answer?: string };
        return data.answer?.trim() || null;
    } catch {
        return null;
    } finally {
        clearTimeout(timeout);
    }
}
