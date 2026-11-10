import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, RefreshCw } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { PROFILE_DATA } from '../../data/profile';
import { PROJECTS_DATA } from '../../data/projects';
import { CERTIFICATES_DATA } from '../../data/certificates';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

// Comprehensive Knowledge Engine covering all aspects of Joe Tom James
function answerUserQuery(rawInput: string): string {
  const q = rawInput.toLowerCase().trim();

  // 1. Greetings & Identity
  if (/^(hi|hello|hey|yo|namaste|greetings|hola)\b/.test(q) || q.includes('who are you') || q.includes('what are you')) {
    return "Hello! I'm JoeBot, Joe Tom James's personal AI agent. I can tell you about his AI builds, software stack, education at VIT-AP, internship at FlyRank AI, certifications, or how to contact him. What would you like to know?";
  }

  // 2. Who is Joe / Background / Overview / About
  if (q.includes('who is joe') || q.includes('about joe') || q.includes('bio') || q.includes('tell me about') || q.includes('introduce')) {
    return "Joe Tom James is an AI Developer and Computer Science Engineering student currently pursuing Integrated M.Tech at VIT-AP University. He builds thoughtful AI systems, production frontend architectures, and intelligent software interfaces.";
  }

  // 3. Current Education / College / Degree / University
  if (q.includes('education') || q.includes('college') || q.includes('university') || q.includes('vit') || q.includes('study') || q.includes('studying') || q.includes('degree') || q.includes('m.tech') || q.includes('school')) {
    return "Joe is currently pursuing an Integrated M.Tech in Computer Science and Engineering at VIT-AP University (2024 – Present), focusing on Data Structures, Algorithms, AI Systems, DBMS, and Modern Web Architectures. He completed his Higher Secondary Education in Computer Science at St. Joseph's HSS.";
  }

  // 4. Internship & Industry Experience / FlyRank
  if (q.includes('intern') || q.includes('experience') || q.includes('flyrank') || q.includes('job') || q.includes('company') || q.includes('work experience')) {
    return "Joe served as an AI Frontend Engineer Intern at FlyRank AI Corp. (July – September 2026), where he designed and engineered responsive web interfaces and custom AI interface modules using React, TypeScript, and modern component systems (Credential ID: FR-D11-FA720-E6D08).";
  }

  // 5. Specific Projects (ClinicFlow, Ayur Mannoor, Samatraya, Waste Boat, etc.)
  if (q.includes('clinicflow')) {
    return "ClinicFlow is Joe's full-stack Healthcare SaaS management platform featuring multi-role administrative workflows, automated invoice billing, digital prescriptions, and real-time appointment scheduling built with React, TypeScript, and PostgreSQL.";
  }
  if (q.includes('ayur') || q.includes('mannoor')) {
    return "Ayur Mannoor is a digital Ayurvedic healthcare portal Joe developed to modernize patient appointments, treatment inquiries, and holistic clinic management.";
  }
  if (q.includes('samatraya')) {
    return "Samatraya is a modern web application Joe built to streamline event coordination, participant management, and digital scheduling.";
  }
  if (q.includes('boat') || q.includes('waste')) {
    return "The Waste Collecting Boat is a specialized sensor-driven robotics hardware prototype Joe built to detect and collect surface water debris autonomously.";
  }
  if (q.includes('project') || q.includes('portfolio') || q.includes('build') || q.includes('work') || q.includes('apps')) {
    return `Joe has developed ${PROJECTS_DATA.length} flagship engineering projects: 1) ClinicFlow (Healthcare SaaS), 2) Ayur Mannoor (Ayurvedic Portal), 3) Samatraya (Event Platform), 4) Waste Collecting Boat (Robotics), 5) University Event Management System, and 6) interactive client platforms. You can click 'VIEW PROJECTS' to explore full architecture case studies!`;
  }

  // 6. Technical Stack, Languages, Tools & Skills
  if (q.includes('stack') || q.includes('skill') || q.includes('language') || q.includes('tech') || q.includes('tools') || q.includes('react') || q.includes('python') || q.includes('frontend') || q.includes('ai') || q.includes('machine learning')) {
    return "Joe's engineering stack comprises: Languages & Frameworks: React, TypeScript, Next.js, JavaScript, Python, C++, HTML5/CSS3. Styling: Tailwind CSS. Databases & Backend: PostgreSQL, REST APIs, SQL. AI Tools: Claude/Gemini APIs, Prompt Engineering, Agent Architectures. Development Tools: Git, Vite, Linux, Node.js.";
  }

  // 7. Certificates & Certifications
  if (q.includes('certificate') || q.includes('certif') || q.includes('license') || q.includes('credential') || q.includes('hedera') || q.includes('hcda') || q.includes('blockchain')) {
    return `Joe holds ${CERTIFICATES_DATA.length} verified technical certifications across AI, Blockchain, Software, and Cloud: including Front-end AI Engineering (FlyRank), AI Fluency, Hedera Certified Developer Associate (HCDA Blockchain), and Cloud Developer credentials. Click on the Certificates section to preview them full-screen!`;
  }

  // 8. Contact Information / Hire / Email / Phone / Location
  if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('phone') || q.includes('whatsapp') || q.includes('reach') || q.includes('call') || q.includes('message')) {
    return `You can get in touch with Joe directly via email at ${PROFILE_DATA.email} or WhatsApp/phone at ${PROFILE_DATA.phone}. He is based in ${PROFILE_DATA.location} and open to exciting AI engineering and frontend opportunities!`;
  }

  // 9. Location / Where is he from / Based
  if (q.includes('location') || q.includes('where') || q.includes('kerala') || q.includes('kannur') || q.includes('city')) {
    return `Joe is from ${PROFILE_DATA.location}. He is currently based in Andhra Pradesh for his studies at VIT-AP University.`;
  }

  // 10. Resume / CV
  if (q.includes('resume') || q.includes('cv') || q.includes('download')) {
    return "You can download Joe's verified PDF resume directly using the 'Resume' button in the top navigation header or hero section!";
  }

  // 11. Social Media Links
  if (q.includes('github') || q.includes('linkedin') || q.includes('instagram') || q.includes('social')) {
    return `Connect with Joe online: GitHub: ${PROFILE_DATA.socials.github} | LinkedIn: ${PROFILE_DATA.socials.linkedin} | Instagram: @joe_tom_james`;
  }

  // 12. Creative / Photography / Video
  if (q.includes('creative') || q.includes('photo') || q.includes('video') || q.includes('hobby') || q.includes('passionate')) {
    return "Beyond software, Joe is passionate about visual storytelling, photography, videography, and color grading. Check out the Creative Studio section below to explore his visual journal!";
  }

  // 13. Direct specific answer fallback
  return `Regarding "${rawInput}": Joe Tom James is an AI Developer and Integrated M.Tech CSE student at VIT-AP University. He specializes in AI frontends, React, TypeScript, and intelligent web platforms like ClinicFlow. Feel free to ask about his specific projects, tech stack, FlyRank internship, or contact details!`;
}

export const MiniAIChatbot: React.FC = () => {
  const { isLightMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [robotBlink, setRobotBlink] = useState(false);
  const [isWaving, setIsWaving] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: "Hi! I'm JoeBot. Ask me anything about Joe's projects, skills, education, or experience!",
      time: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Robot eyes blinking and occasional cheerful wave
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setRobotBlink(true);
      setTimeout(() => setRobotBlink(false), 200);
    }, 3200);

    const waveInterval = setInterval(() => {
      setIsWaving(true);
      setTimeout(() => setIsWaving(false), 1200);
    }, 7000);

    return () => {
      clearInterval(blinkInterval);
      clearInterval(waveInterval);
    };
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen]);

  const handleSend = (textToSend?: string) => {
    const userText = (textToSend || input).trim();
    if (!userText) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = answerUserQuery(userText);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  const quickPrompts = ["What projects has he built?", "What is his tech stack?", "FlyRank AI internship", "How to contact him?"];

  return (
    <div className="relative mt-8 sm:mt-12 flex flex-col items-center">
      {/* 
        1. STANDALONE INTERACTIVE AI ROBOT
      */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="group relative cursor-pointer flex flex-col items-center select-none"
        title="Click to talk with JoeBot"
      >
        {/* Floating Ambient Aura */}
        <div 
          className="absolute -inset-4 rounded-full blur-xl pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity duration-500"
          style={{ backgroundColor: 'var(--accent-glow)' }}
        />

        {/* Speech Bubble Cue */}
        <motion.div 
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="mb-2 px-3.5 py-1.5 rounded-full border text-[11px] font-mono tracking-wider flex items-center justify-center shadow-lg backdrop-blur-md"
          style={{
            backgroundColor: isLightMode ? '#FFFFFF' : 'rgba(15, 18, 25, 0.9)',
            borderColor: 'var(--accent-color)',
            color: 'var(--text-primary)'
          }}
        >
          <span>{isOpen ? 'Close Chat' : 'Click me to chat!'}</span>
        </motion.div>

        {/* Floating Robot Body */}
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [0, 1.5, -1.5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative group-hover:scale-110 transition-transform duration-300"
        >
          <svg viewBox="0 0 100 120" className="w-28 h-32 drop-shadow-2xl">
            {/* Hologram Base */}
            <ellipse cx="50" cy="114" rx="28" ry="5" fill="var(--accent-color)" opacity="0.3" className="animate-pulse" />
            <path d="M42 98 Q50 112 58 98" fill="var(--accent-color)" opacity="0.6" />

            {/* Arms */}
            <rect x="18" y="58" width="8" height="22" rx="4" fill={isLightMode ? '#CBD5E1' : '#1E2330'} stroke="var(--accent-color)" strokeWidth="1.5" />
            <motion.g
              animate={isWaving ? { rotate: [0, 25, -15, 25, 0] } : { rotate: 0 }}
              style={{ transformOrigin: "78px 58px" }}
            >
              <rect x="74" y="58" width="8" height="22" rx="4" fill={isLightMode ? '#CBD5E1' : '#1E2330'} stroke="var(--accent-color)" strokeWidth="1.5" />
              <circle cx="78" cy="82" r="5" fill="var(--accent-color)" />
            </motion.g>

            {/* Torso */}
            <rect x="28" y="50" width="44" height="48" rx="14" fill={isLightMode ? '#E2E8F0' : '#121620'} stroke="var(--accent-color)" strokeWidth="2" />
            <circle cx="50" cy="72" r="9" fill={isLightMode ? '#0284C7' : '#0B0F19'} stroke="var(--accent-color)" strokeWidth="1.5" />
            <circle cx="50" cy="72" r="4.5" fill="#34D399" />

            {/* Antenna */}
            <line x1="50" y1="20" x2="50" y2="8" stroke="var(--accent-color)" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="50" cy="6" r="4" fill="#34D399" className="animate-pulse" />

            {/* Ears */}
            <rect x="18" y="24" width="5" height="12" rx="2" fill="var(--accent-color)" />
            <rect x="77" y="24" width="5" height="12" rx="2" fill="var(--accent-color)" />

            {/* Head */}
            <rect x="23" y="14" width="54" height="34" rx="12" fill={isLightMode ? '#F1F5F9' : '#161B26'} stroke="var(--accent-color)" strokeWidth="2" />
            <rect x="28" y="19" width="44" height="22" rx="7" fill="#040711" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

            {/* Eyes */}
            <ellipse 
              cx="40" 
              cy="30" 
              rx="4" 
              ry={robotBlink ? "0.4" : "4.5"} 
              fill="#34D399" 
              className="transition-all duration-150"
            />
            <ellipse 
              cx="60" 
              cy="30" 
              rx="4" 
              ry={robotBlink ? "0.4" : "4.5"} 
              fill="#34D399" 
              className="transition-all duration-150"
            />
            <path d="M44 36 Q50 39 56 36" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8" />
          </svg>
        </motion.div>

        {/* Robot Name */}
        <span className="font-mono text-xs font-bold uppercase tracking-widest mt-2" style={{ color: 'var(--accent-color)' }}>
          JoeBot AI
        </span>
      </div>

      {/* 
        2. CLEAN, MODERN CHAT DRAWER / POPUP
        Rendered as an overlay directly positioned on the right
      */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 bottom-4 z-50 sm:inset-auto sm:absolute sm:left-[115%] sm:-top-8 sm:w-[380px] md:w-[420px] rounded-2xl border p-4 sm:p-5 shadow-2xl backdrop-blur-2xl flex flex-col max-h-[85vh]"
            style={{
              backgroundColor: isLightMode ? '#FFFFFF' : 'rgba(12, 14, 20, 0.98)',
              borderColor: 'var(--accent-color)',
              boxShadow: '0 25px 50px -12px var(--accent-glow)'
            }}
          >
            {/* Header */}
            <div 
              className="flex items-center justify-between pb-3 mb-3 border-b shrink-0"
              style={{ borderColor: 'var(--bg-card-border)' }}
            >
              <div className="flex items-center space-x-2">
                <span className="font-sans font-bold text-sm sm:text-base" style={{ color: 'var(--text-primary)' }}>
                  JoeBot AI Assistant
                </span>
                <span className="text-[9px] font-mono font-semibold uppercase px-2 py-0.5 rounded border border-emerald-500/20 text-emerald-400 bg-emerald-500/10">
                  ONLINE
                </span>
              </div>

              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => setMessages([{ id: '1', sender: 'bot', text: "Chat reset! What would you like to know about Joe?", time: 'Now' }])}
                  className="p-1.5 rounded-md border hover:scale-105 transition-all cursor-pointer"
                  style={{ borderColor: 'var(--bg-card-border)', color: 'var(--text-muted)' }}
                  title="Reset conversation"
                  aria-label="Reset conversation"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-md border hover:scale-105 transition-all cursor-pointer"
                  style={{ borderColor: 'var(--bg-card-border)', color: 'var(--text-muted)' }}
                  title="Close chat"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div 
              ref={chatScrollRef}
              className="h-56 sm:h-64 overflow-y-auto space-y-3 pr-1 scrollbar-thin text-xs mb-3 flex-1"
            >
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div 
                    className={`p-3 rounded-2xl max-w-[88%] leading-relaxed ${
                      m.sender === 'user' ? 'text-white rounded-br-xs' : 'rounded-bl-xs border'
                    }`}
                    style={{
                      backgroundColor: m.sender === 'user' 
                        ? 'var(--accent-color)' 
                        : (isLightMode ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)'),
                      borderColor: m.sender === 'user' ? 'transparent' : 'var(--bg-card-border)',
                      color: m.sender === 'user' ? '#FFFFFF' : 'var(--text-primary)'
                    }}
                  >
                    {m.text}
                  </div>
                  <span className="text-[9px] font-mono mt-0.5 px-1.5" style={{ color: 'var(--text-muted)' }}>
                    {m.time}
                  </span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center space-x-1.5 p-2 rounded-lg w-fit" style={{ backgroundColor: isLightMode ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              )}
            </div>

            {/* Quick Prompt Pills */}
            <div className="flex flex-wrap gap-1.5 mb-3 shrink-0">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  className="text-[10px] font-mono px-2.5 py-1 rounded-md border transition-all hover:scale-105 cursor-pointer"
                  style={{
                    backgroundColor: isLightMode ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.03)',
                    borderColor: 'var(--bg-card-border)',
                    color: 'var(--text-secondary)'
                  }}
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center space-x-2 pt-2 border-t shrink-0"
              style={{ borderColor: 'var(--bg-card-border)' }}
            >
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about Joe..."
                className="flex-1 bg-transparent text-xs py-2 px-3 rounded-lg border focus:outline-none transition-colors"
                style={{
                  borderColor: 'var(--bg-card-border)',
                  color: 'var(--text-primary)'
                }}
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2.5 rounded-lg transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: 'var(--accent-color)',
                  color: '#FFFFFF'
                }}
                aria-label="Send Message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
