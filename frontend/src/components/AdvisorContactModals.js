import { useState, useRef, useEffect } from "react";
import { X, Mail, MessageSquare, Phone, Send, Loader2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

// Email Modal Component
export const EmailModal = ({ onClose, advisor, user }) => {
  const [subject, setSubject] = useState(`Application Inquiry - ${user?.first_name} ${user?.last_name}`);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }
    
    setSending(true);
    // Simulate sending (in production, this would call an API)
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSending(false);
    toast.success("Email sent successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4 sm:p-6" data-testid="email-modal">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md h-auto max-h-[80vh] glass-card rounded-3xl flex flex-col overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7B68EE] to-[#9B59B6] flex items-center justify-center">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Send Email</h3>
              <p className="text-slate-500 text-xs">to {advisor?.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">To</Label>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
              <img 
                src={advisor?.avatar_url} 
                alt={advisor?.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <p className="text-white text-sm font-medium">{advisor?.name}</p>
                <p className="text-slate-500 text-xs">{advisor?.email}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">Subject</Label>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="h-11 bg-black/30 border-white/[0.08] text-white rounded-xl px-4"
              placeholder="Subject line..."
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">Message</Label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[150px] bg-black/30 border-white/[0.08] text-white rounded-xl px-4 py-3 resize-none"
              placeholder="Type your message here..."
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <Button
            onClick={handleSend}
            disabled={sending || !message.trim()}
            className="w-full bg-[#7B68EE] hover:bg-[#6B5AD8] text-white rounded-full py-6"
          >
            {sending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Email
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

// Text Message Modal Component
export const TextModal = ({ onClose, advisor, user }) => {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: `Hi ${user?.first_name}! This is a direct message to ${advisor?.name}. How can I help you today?`
    }
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      const viewport = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    
    setSending(true);
    // Simulate response
    await new Promise(resolve => setTimeout(resolve, 1000));
    setMessages(prev => [...prev, { 
      role: "system", 
      content: "Thank you for your message! I've received it and will respond shortly. Is there anything else I can help you with?" 
    }]);
    setSending(false);
    toast.success("Text message sent!");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4 sm:p-6" data-testid="text-modal">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md h-[600px] max-h-[80vh] glass-card rounded-3xl flex flex-col overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#28A745] to-[#20C997] flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Text Message</h3>
              <p className="text-slate-500 text-xs">to {advisor?.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg"
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
                    ? "bg-[#00B4D8]" 
                    : "bg-gradient-to-br from-[#28A745] to-[#20C997]"
                }`}>
                  {message.role === "user" ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <img 
                      src={advisor?.avatar_url} 
                      alt={advisor?.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                </div>
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.role === "user"
                      ? "bg-[#00B4D8] text-white rounded-tr-sm"
                      : "bg-white/10 text-white rounded-tl-sm"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {sending && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#28A745] to-[#20C997] flex items-center justify-center">
                  <img 
                    src={advisor?.avatar_url} 
                    alt={advisor?.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </div>
                <div className="bg-white/10 p-3 rounded-2xl rounded-tl-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t border-white/10">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 h-12 bg-black/30 border-white/[0.08] text-white rounded-full px-5"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || sending}
              className="w-12 h-12 bg-[#28A745] hover:bg-[#218838] text-white rounded-full p-0"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Call Modal Component
export const CallModal = ({ onClose, advisor, user }) => {
  const [callState, setCallState] = useState("ready"); // ready, connecting, connected, ended
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    let interval;
    if (callState === "connected") {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callState]);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCall = () => {
    setCallState("connecting");
    setTimeout(() => {
      setCallState("connected");
      toast.success("Call connected!");
    }, 2000);
  };

  const handleEndCall = () => {
    setCallState("ended");
    toast.info(`Call ended. Duration: ${formatDuration(callDuration)}`);
    setTimeout(onClose, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" data-testid="call-modal">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={callState === "ready" ? onClose : undefined} />
      
      <div className="relative w-full max-w-sm glass-card rounded-3xl flex flex-col overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              callState === "connected" 
                ? "bg-gradient-to-br from-[#28A745] to-[#20C997] animate-pulse" 
                : "bg-gradient-to-br from-[#00B4D8] to-[#0096B4]"
            }`}>
              <Phone className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">
                {callState === "ready" && "Voice Call"}
                {callState === "connecting" && "Connecting..."}
                {callState === "connected" && "Call Connected"}
                {callState === "ended" && "Call Ended"}
              </h3>
              <p className="text-slate-500 text-xs">
                {callState === "connected" ? formatDuration(callDuration) : advisor?.phone}
              </p>
            </div>
          </div>
          {callState === "ready" && (
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col items-center">
          <div className={`relative mb-6 ${callState === "connected" ? "animate-pulse" : ""}`}>
            <img 
              src={advisor?.avatar_url} 
              alt={advisor?.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-white/10"
            />
            {callState === "connected" && (
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full bg-[#28A745] text-white text-xs font-medium">
                Connected
              </div>
            )}
            {callState === "connecting" && (
              <div className="absolute inset-0 rounded-full border-4 border-[#00B4D8] border-t-transparent animate-spin" />
            )}
          </div>
          
          <h4 className="text-white text-xl font-semibold mb-1">{advisor?.name}</h4>
          <p className="text-slate-400 text-sm mb-2">{advisor?.title}</p>
          <p className="text-[#00B4D8] text-sm">{advisor?.phone}</p>
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-white/10 flex justify-center gap-4">
          {callState === "ready" && (
            <>
              <Button
                onClick={onClose}
                variant="outline"
                className="w-14 h-14 rounded-full border-white/20 text-white hover:bg-white/5 p-0"
              >
                <X className="w-6 h-6" />
              </Button>
              <Button
                onClick={handleCall}
                className="w-14 h-14 rounded-full bg-[#28A745] hover:bg-[#218838] text-white p-0"
              >
                <Phone className="w-6 h-6" />
              </Button>
            </>
          )}
          {(callState === "connecting" || callState === "connected") && (
            <Button
              onClick={handleEndCall}
              className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 text-white p-0"
            >
              <Phone className="w-6 h-6 rotate-[135deg]" />
            </Button>
          )}
          {callState === "ended" && (
            <p className="text-slate-400">Call ended</p>
          )}
        </div>
      </div>
    </div>
  );
};
