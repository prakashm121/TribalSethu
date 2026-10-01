import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  Globe, 
  HelpCircle, 
  ChevronRight,
  Maximize2,
  Minimize2,
  FileText,
  AlertTriangle,
  CreditCard,
  CheckCircle2
} from 'lucide-react';
import { useAppStore } from '../../stores/useAppStore';
import { chatbotService } from '../../services/chatbotService';
import { useLocation, useNavigate } from 'react-router-dom';

export const JagoChatbot: React.FC = () => {
  const { isJagoOpen, toggleJago, setJagoOpen, chatMessages, addChatMessage, openDigiLockerModal } = useAppStore();
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedLang, setSelectedLang] = useState('en');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isJagoOpen) {
      scrollToBottom();
    }
  }, [chatMessages, isJagoOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    // Add user message
    addChatMessage({
      sender: 'user',
      text: query
    });
    setInputText('');
    setIsTyping(true);

    try {
      const response = await chatbotService.askJago(query, selectedLang);
      setIsTyping(false);
      addChatMessage({
        sender: 'jago',
        text: response.reply,
        quickActions: response.quickActions
      });
    } catch {
      setIsTyping(false);
      addChatMessage({
        sender: 'jago',
        text: 'I am here to assist with your tribal scholarships. Please feel free to check your application status or document requirements.'
      });
    }
  };

  const handleQuickAction = (action: string) => {
    if (action === 'status' || action === 'application_detail') {
      navigate('/student/applications/TS-2026-004821');
      setJagoOpen(false);
    } else if (action === 'deficiency') {
      navigate('/student/verification');
      setJagoOpen(false);
    } else if (action === 'payment') {
      navigate('/student/payments');
      setJagoOpen(false);
    } else if (action === 'documents') {
      navigate('/student/documents');
      setJagoOpen(false);
    } else if (action === 'digilocker') {
      openDigiLockerModal();
    } else if (action === 'profile') {
      navigate('/student/profile');
      setJagoOpen(false);
    }
  };

  const suggestedPrompts = [
    { text: "What's my application status?", icon: FileText },
    { text: "Why is my application pending?", icon: AlertTriangle },
    { text: "When will I receive my scholarship?", icon: CreditCard },
    { text: "What documents do I need?", icon: CheckCircle2 }
  ];

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleJago}
        aria-label="Open JAGO AI Assistant"
        className={`fixed bottom-6 right-6 z-40 bg-[#123C32] hover:bg-[#0A241E] text-white rounded-full shadow-xl flex items-center gap-2.5 border-2 border-[#E8B84A] transition-all group ${location.pathname === '/' ? 'sm:hidden min-h-11 min-w-11 justify-center p-2' : 'px-4 py-3'}`}
      >
        <div className="relative">
          <Sparkles className="w-5 h-5 text-[#E8B84A] animate-pulse" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#123C32]"></span>
        </div>
        {location.pathname !== '/' && <div className="text-left">
          <div className="text-xs text-[#E8B84A] font-bold uppercase tracking-wider leading-none">AI Guide</div>
          <div className="text-sm font-bold leading-tight">Ask JAGO</div>
        </div>}
      </motion.button>

      {/* Slide-in Drawer */}
      <AnimatePresence>
        {isJagoOpen && (
          <div className="fixed inset-0 z-50 pointer-events-none flex justify-end">
            {/* Backdrop on mobile */}
            <div 
              onClick={() => setJagoOpen(false)} 
              className="absolute inset-0 bg-black/40 backdrop-blur-2xs pointer-events-auto md:bg-transparent md:backdrop-blur-none"
            />

            <motion.div
              initial={{ x: '100%', opacity: 0.6 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0.6 }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
              className="relative w-full sm:w-[420px] h-full bg-white shadow-2xl flex flex-col pointer-events-auto border-l border-[#E2DDD2]"
            >
              {/* Header */}
              <div className="bg-[#123C32] text-white p-4 flex items-center justify-between border-b border-[#E8B84A]/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E8B84A] text-[#123C32] flex items-center justify-center font-black shadow-xs">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading font-bold text-base text-white">JAGO</h3>
                      <span className="text-[10px] bg-[#E8B84A]/20 text-[#E8B84A] font-semibold px-2 py-0.5 rounded-full border border-[#E8B84A]/40">
                        AI Assistant
                      </span>
                    </div>
                    <p className="text-xs text-white/80">Your Unified Tribal Scholarship Guide</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {/* Language Selector */}
                  <div className="relative">
                    <select
                      value={selectedLang}
                      onChange={(e) => setSelectedLang(e.target.value)}
                      className="bg-black/30 text-white text-xs rounded-lg px-2 py-1 pr-6 border border-white/20 appearance-none cursor-pointer focus:outline-hidden"
                    >
                      <option value="en" className="text-black">English</option>
                      <option value="hi" className="text-black">हिन्दी (Hindi)</option>
                      <option value="or" className="text-black">ଓଡ଼ିଆ (Odia)</option>
                      <option value="te" className="text-black">తెలుగు (Telugu)</option>
                      <option value="ta" className="text-black">தமிழ் (Tamil)</option>
                      <option value="ml" className="text-black">മലയാളം (Malayalam)</option>
                    </select>
                    <Globe className="w-3 h-3 text-white/70 absolute right-1.5 top-2 pointer-events-none" />
                  </div>

                  <button
                    onClick={() => setJagoOpen(false)}
                    className="p-1.5 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Notice Bar */}
              <div className="bg-[#FAF0EB] px-4 py-2 text-[11px] text-[#C86B43] font-medium border-b border-[#E2DDD2] flex items-center justify-between">
                <span>⚡ Live context: Asha Tirkey (NIT Rourkela)</span>
                <span className="font-semibold text-emerald-700">● Online</span>
              </div>

              {/* Chat Message Stream */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F7F5EF]/60">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-start gap-2 max-w-[88%]">
                      {msg.sender === 'jago' && (
                        <div className="w-7 h-7 rounded-lg bg-[#123C32] text-white flex items-center justify-center shrink-0 mt-0.5">
                          <Bot className="w-4 h-4 text-[#E8B84A]" />
                        </div>
                      )}
                      <div>
                        <div
                          className={`p-3 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                            msg.sender === 'user'
                              ? 'bg-[#123C32] text-white rounded-tr-xs'
                              : 'bg-white text-[#17221F] border border-[#E2DDD2] rounded-tl-xs'
                          }`}
                        >
                          {msg.text}
                        </div>
                        <span className="text-[10px] text-[#82918D] mt-1 block px-1">
                          {msg.timestamp}
                        </span>

                        {/* Quick Action buttons */}
                        {msg.quickActions && msg.quickActions.length > 0 && (
                          <div className="mt-2.5 flex flex-wrap gap-1.5">
                            {msg.quickActions.map((qa, i) => (
                              <button
                                key={i}
                                onClick={() => handleQuickAction(qa.action)}
                                className="text-xs bg-white hover:bg-[#FAF0EB] text-[#C86B43] border border-[#C86B43]/30 hover:border-[#C86B43] font-medium px-2.5 py-1 rounded-full shadow-2xs transition-colors flex items-center gap-1 cursor-pointer"
                              >
                                <span>{qa.label}</span>
                                <ChevronRight className="w-3 h-3 text-[#C86B43]" />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#123C32] text-white flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-[#E8B84A]" />
                    </div>
                    <div className="bg-white border border-[#E2DDD2] p-3 rounded-2xl rounded-tl-xs flex items-center gap-1.5 shadow-xs">
                      <span className="w-2 h-2 bg-[#123C32] rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-[#123C32] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-2 h-2 bg-[#123C32] rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Questions Pill bar */}
              <div className="p-2.5 bg-white border-t border-[#E2DDD2] flex items-center gap-1.5 overflow-x-auto whitespace-nowrap no-scrollbar">
                {suggestedPrompts.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(p.text)}
                    className="shrink-0 text-[11px] bg-[#F7F5EF] hover:bg-[#FAF0EB] text-[#123C32] hover:text-[#C86B43] px-2.5 py-1 rounded-lg border border-[#E2DDD2] transition-colors flex items-center gap-1"
                  >
                    <p.icon className="w-3 h-3 text-[#E8B84A]" />
                    <span>{p.text}</span>
                  </button>
                ))}
              </div>

              {/* Input Footer */}
              <div className="p-3 bg-white border-t border-[#E2DDD2]">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Ask anything about ST scholarships..."
                    className="flex-1 bg-[#F7F5EF] border border-[#E2DDD2] focus:border-[#123C32] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#17221F] placeholder-[#82918D] focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim() || isTyping}
                    className="bg-[#123C32] hover:bg-[#0A241E] text-white p-2.5 rounded-xl disabled:opacity-40 transition-colors shrink-0 shadow-xs cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-[#E8B84A]" />
                  </button>
                </form>
                <div className="text-[10px] text-center text-[#82918D] mt-2">
                  JAGO is an AI public service assistant grounded in Ministry of Tribal Affairs guidelines.
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
