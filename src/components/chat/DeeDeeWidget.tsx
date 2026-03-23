'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Sparkles, Send, RotateCcw } from 'lucide-react';
import type { ChatMessage } from '@/types';

const QUICK_REPLIES = [
  'I need packaging for pastries',
  'What canopy tents do you have?',
  'Tell me about bulk pricing',
  'Upcoming events?',
];

export function DeeDeeWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Oops! Something went wrong. Try again or reach out on WhatsApp!",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setInput('');
  };

  return (
    <>
      {/* Chat toggle button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-crown-lavender rounded-full shadow-lg hover:scale-110 transition-transform animate-bounce-in"
          aria-label="Chat with DeeDee"
        >
          <Sparkles size={24} className="text-crown-dark" />
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-4 right-4 z-50 w-[90vw] max-w-[380px] h-[70vh] max-h-[560px] bg-crown-dark-card border border-crown-dark-surface rounded-2xl shadow-2xl flex flex-col animate-bounce-in overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-crown-dark-surface border-b border-crown-dark-surface">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-crown-lavender flex items-center justify-center">
                <Sparkles size={16} className="text-crown-dark" />
              </div>
              <div>
                <p className="text-sm font-bold text-crown-white">DeeDee</p>
                <p className="text-xs text-crown-muted">Crown Crumb Assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={resetChat}
                className="p-1.5 text-crown-muted hover:text-crown-white transition-colors"
                aria-label="Reset chat"
              >
                <RotateCcw size={16} />
              </button>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 text-crown-muted hover:text-crown-white transition-colors"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.length === 0 && (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-crown-lavender/20 flex items-center justify-center mx-auto mb-4">
                  <Sparkles size={28} className="text-crown-lavender" />
                </div>
                <p className="text-sm font-bold text-crown-white mb-1">
                  Hey! Mi name is DeeDee
                </p>
                <p className="text-xs text-crown-muted mb-4">
                  How can I help you today?
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {QUICK_REPLIES.map((qr) => (
                    <button
                      key={qr}
                      onClick={() => sendMessage(qr)}
                      className="px-3 py-1.5 text-xs bg-crown-dark-surface text-crown-muted hover:text-crown-lime hover:border-crown-lime border border-crown-dark-surface rounded-full transition-colors"
                    >
                      {qr}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-crown-lime text-crown-dark rounded-br-md'
                      : 'bg-crown-dark-surface text-crown-white rounded-bl-md'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-crown-dark-surface px-4 py-3 rounded-2xl rounded-bl-md">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-crown-lavender rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-crown-lavender rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-crown-lavender rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="px-3 py-3 border-t border-crown-dark-surface">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask DeeDee anything..."
                className="flex-1 px-4 py-2.5 bg-crown-dark-surface text-crown-white text-sm rounded-full border border-crown-dark-surface focus:border-crown-lime focus:outline-none placeholder:text-crown-muted"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="p-2.5 bg-crown-lime text-crown-dark rounded-full disabled:opacity-50 hover:bg-crown-lime/90 transition-colors"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
