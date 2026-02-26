import { useState, useRef, useEffect } from "react";
import { useAuth, API } from "@/App";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Send, Sparkles, Loader2, Bot, User } from "lucide-react";

const AIChat = ({ onClose }) => {
  const { token } = useAuth();
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm Journey, your AI assistant for the USA.edu application process. I can help you with:\n\n• Application status and requirements\n• Program information (Occupational Therapy, Nursing, Education & Certificates)\n• Document guidance\n• Campus information\n• Financial aid questions\n\nHow can I help you today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const quickQuestions = [
    "What documents do I need?",
    "Tell me about the programs",
    "What are the deadlines?",
    "Campus locations?"
  ];

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const sendMessage = async (text = input) => {
    if (!text.trim() || loading) return;

    const userMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${API}/chat`,
        { message: text, session_id: sessionId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSessionId(response.data.session_id);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.data.response }
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4 sm:p-6" data-testid="ai-chat-modal">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Chat Window */}
      <div className="relative w-full max-w-md h-[600px] max-h-[80vh] glass-card rounded-3xl flex flex-col overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00677F] to-[#7B68EE] flex items-center justify-center animate-pulse-glow">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Ask Journey</h3>
              <p className="text-slate-500 text-xs">AI Application Assistant</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg"
            data-testid="close-chat-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === "user" 
                    ? "bg-[#00677F]" 
                    : "bg-gradient-to-br from-[#00677F] to-[#7B68EE]"
                }`}>
                  {message.role === "user" ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] p-4 ${
                    message.role === "user"
                      ? "chat-bubble-user"
                      : "chat-bubble-ai"
                  }`}
                  data-testid={`chat-message-${index}`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00677F] to-[#7B68EE] flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="chat-bubble-ai p-4">
                  <div className="flex gap-1">
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Quick Questions */}
        {messages.length <= 2 && (
          <div className="px-4 pb-2">
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => sendMessage(question)}
                  className="px-3 py-1.5 text-xs rounded-full bg-white/5 border border-white/10 text-slate-300 hover:border-[#00677F]/50 hover:text-white transition-all"
                  data-testid={`quick-question-${index}`}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-white/10">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your question..."
              className="flex-1 h-12 bg-black/20 border-white/10 focus:border-[#A1D8E0] text-white placeholder:text-slate-600 rounded-xl"
              disabled={loading}
              data-testid="chat-input"
            />
            <Button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              className="h-12 w-12 bg-[#00677F] hover:bg-[#135163] rounded-xl p-0"
              data-testid="send-message-btn"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
