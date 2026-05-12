'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
  role: 'bot' | 'user';
  text: string;
}

const initialMessages: Message[] = [
  { role: 'bot', text: 'Welcome to TS Aromatics. How can we help you today? You can ask about products, pricing, samples, or technical specifications.' },
];

const quickReplies = [
  'Tell me about your essential oils',
  'How do I request a sample?',
  'What are your minimum order quantities?',
  'Do you provide COA documents?',
];

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function handleSend(text: string) {
    if (!text.trim()) return;
    const userMsg: Message = { role: 'user', text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      const botMsg: Message = {
        role: 'bot',
        text: 'Thank you for your message. Our team typically responds within 2 hours during business hours. For urgent enquiries, please use the contact form or email us directly at info@tsaromatics.com.',
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 800);
  }

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-[var(--color-primary)] text-white shadow-lg hover:brightness-110 transition-all active:scale-[0.95] flex items-center justify-center"
          aria-label="Open chat"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 left-6 z-50 w-[360px] max-[400px]:left-3 max-[400px]:right-3 max-[400px]:w-auto glass rounded-2xl border border-[var(--color-border)] shadow-2xl overflow-hidden animate-[fadeSlide_0.2s_ease-out] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)] bg-[var(--color-surface-1)]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center">
                <span className="text-xs font-bold text-white">TS</span>
              </div>
              <div>
                <p className="text-xs font-bold">TS Aromatics</p>
                <p className="text-[10px] text-[var(--color-accent-green)]">Online</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-[var(--color-muted)] hover:text-[var(--color-text-main)] transition-colors">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 max-h-[320px] flex flex-col gap-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] rounded-xl px-4 py-2.5 text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[var(--color-primary)] text-white rounded-tr-sm'
                      : 'bg-[var(--color-surface-1)] text-[var(--color-text-main)] rounded-tl-sm border border-[var(--color-border)]'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Quick replies */}
          {messages.length <= 2 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {quickReplies.map((qr) => (
                <button
                  key={qr}
                  onClick={() => handleSend(qr)}
                  className="text-[10px] px-3 py-1.5 rounded-full border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-text-main)] hover:border-[var(--color-primary)] transition-colors"
                >
                  {qr}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-4 py-3 border-t border-[var(--color-border)] flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
              placeholder="Type your message..."
              className="flex-1 h-10 px-4 rounded-xl bg-[var(--color-surface-1)] border border-[var(--color-border)] text-xs text-[var(--color-text-main)] outline-none focus:border-[var(--color-primary)] transition-colors"
            />
            <button
              onClick={() => handleSend(input)}
              disabled={!input.trim()}
              className="w-10 h-10 rounded-xl bg-[var(--color-primary)] text-white flex items-center justify-center disabled:opacity-40 hover:brightness-110 transition-all active:scale-[0.95]"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
