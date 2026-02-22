import React, { useState, useRef, useEffect } from 'react';
import FloatingButton from './FloatingButton';
import ChatBubble from './ChatBubble';

// AI personality and responses
const AI_PERSONALITY = {
  name: "Samarth",
  role: "Professional Video Editor",
  tone: "confident, premium, friendly, smart, concise",
  goal: "Convert visitors into paying clients"
};

// Predefined responses
const PREDEFINED_RESPONSES = {
  greeting: [
    "Hey there! 👋 I'm Samarth, your personal video editing consultant. How can I help you today?",
    "Hi! I'm Samarth - ready to help you create something amazing! What brings you here?",
    "Welcome! 🎬 I'm Samarth, and I'm here to help bring your vision to life. What would you like to know?"
  ],
  services: `I offer a range of premium video editing services:

🎬 **Video Editing** - Professional editing for any content type
📱 **Social Media Reels** - Scroll-stopping short-form content  
🎨 **Color Grading** - Cinematic color correction & grading
✂️ **Motion Graphics** - Dynamic graphics & animations
🎥 **Commercials** - High-impact advertising videos
📽️ **YouTube Editing** - Engaging long-form content

Which type of project are you interested in?`,
  pricing: `Great question! My pricing varies based on project complexity:

💰 **Starting at $150** for basic edits
💰 **$300-500** for professional projects
💰 **$500+** for commercial/high-end work

I offer flexible packages tailored to your needs. What's your approximate budget so I can suggest the best option?`,
  delivery: `⏱️ **Fast Turnaround Times:**

• **Social Media Reels**: 24-48 hours
• **Standard Videos**: 3-5 days
• **Complex Projects**: 7-10 days

Rush delivery available for urgent projects! What's your timeline?`,
  reels: `Absolutely! 🎯 I specialize in creating viral-worthy Reels and Shorts:

✅ Scroll-stopping hooks
✅ Trending sounds & effects
✅ Smooth transitions
✅ Optimized for maximum reach

Want to see some examples? I can share my portfolio!`,
  brands: `Definitely! 🏢 I work with:

✅ **Brands & Agencies**
✅ **Content Creators**
✅ **Startups & Businesses**
✅ **Influencers & Personal Brands**

I've helped 50+ clients elevate their visual content. Would you like to see case studies?`,
  hire: `Here's how to get started:

1️⃣ **Tell me about your project** - Type, duration, goals
2️⃣ **Share your budget & timeline** 
3️⃣ **We'll hop on a free call** to discuss details
4️⃣ **I deliver your vision** ✨

Ready to start? Just tell me about your project!`,
  default: `Thanks for your interest! I'm here to help you create amazing video content. 

Feel free to ask me about:
• Services & pricing
• Turnaround times  
• Portfolio examples
• How to hire me

What would you like to know?`
};

// Lead qualification questions
const QUALIFICATION_QUESTIONS = [
  { key: 'type', question: 'What type of video are you looking to create?' },
  { key: 'duration', question: 'What\'s the approximate duration of the video?' },
  { key: 'budget', question: 'What\'s your budget range?' },
  { key: 'deadline', question: 'When is your deadline?' },
  { key: 'platform', question: 'What platform is this for? (Instagram / YouTube / Ads / Other)' }
];

// Check if user message matches predefined keywords
const matchResponse = (message) => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.match(/(hi|hey|hello|what's up|hi there)/)) {
    return { type: 'greeting', response: PREDEFINED_RESPONSES.greeting[Math.floor(Math.random() * PREDEFINED_RESPONSES.greeting.length)] };
  }
  if (lowerMessage.match(/(services|what do you do|what can you do|offer)/)) {
    return { type: 'services', response: PREDEFINED_RESPONSES.services };
  }
  if (lowerMessage.match(/(cost|price|pricing|charge|how much|expensive|budget)/)) {
    return { type: 'pricing', response: PREDEFINED_RESPONSES.pricing };
  }
  if (lowerMessage.match(/(fast|quick|turnaround|delivery|how long|time)/)) {
    return { type: 'delivery', response: PREDEFINED_RESPONSES.delivery };
  }
  if (lowerMessage.match(/(reel|reels|short|shorts|instagram|tiktok|social media)/)) {
    return { type: 'reels', response: PREDEFINED_RESPONSES.reels };
  }
  if (lowerMessage.match(/(brand|brands|business|company|agency)/)) {
    return { type: 'brands', response: PREDEFINED_RESPONSES.brands };
  }
  if (lowerMessage.match(/(hire|contact|work with you|get started|book)/)) {
    return { type: 'hire', response: PREDEFINED_RESPONSES.hire };
  }
  
  return { type: 'default', response: PREDEFINED_RESPONSES.default };
};

const AIAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: PREDEFINED_RESPONSES.greeting[0],
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [qualificationData, setQualificationData] = useState({});
  const [qualificationStep, setQualificationStep] = useState(-1);
  const [showBooking, setShowBooking] = useState(false);
  
  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Handle sending message
  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      processAIResponse(inputValue);
    }, 1000 + Math.random() * 500);
  };

  // Process AI response
  const processAIResponse = (userMessage) => {
    // Check if we're in qualification flow
    if (qualificationStep >= 0) {
      handleQualification(userMessage);
      return;
    }

    const matched = matchResponse(userMessage);
    
    // Check if we should start qualification
    if (matched.type === 'services' || matched.type === 'pricing' || matched.type === 'hire') {
      setQualificationStep(0);
    }

    const aiMessage = {
      id: Date.now() + 1,
      type: 'ai',
      content: matched.response,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsTyping(false);
  };

  // Handle qualification flow
  const handleQualification = (answer) => {
    const currentQuestion = QUALIFICATION_QUESTIONS[qualificationStep];
    
    // Update qualification data with current answer
    const updatedData = {
      ...qualificationData,
      [currentQuestion.key]: answer
    };
    setQualificationData(updatedData);

    // Move to next question or show booking
    if (qualificationStep < QUALIFICATION_QUESTIONS.length - 1) {
      setQualificationStep(prev => prev + 1);
      
      const nextQuestion = QUALIFICATION_QUESTIONS[qualificationStep + 1];
      setTimeout(() => {
        const aiMessage = {
          id: Date.now() + 1,
          type: 'ai',
          content: nextQuestion.question,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
      }, 500);
    } else {
      // Show booking CTA
      setShowBooking(true);
      setTimeout(() => {
        const aiMessage = {
          id: Date.now() + 1,
          type: 'ai',
          content: `Perfect! I've got all the details. Based on what you've shared:\n\n📹 ${updatedData.type || 'Video project'}\n⏱️ ${updatedData.duration || 'TBD'}\n💰 ${updatedData.budget || 'TBD'}\n📅 ${updatedData.deadline || 'TBD'}\n📱 ${updatedData.platform || 'TBD'}\n\nWould you like to book a free consultation call to discuss your project in detail?`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
      }, 500);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Quick reply buttons
  const quickReplies = [
    "What services do you offer?",
    "How much do you charge?",
    "How fast is delivery?",
    "Can you edit reels?"
  ];

  return (
    <>
      <FloatingButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      
      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] h-[500px] glass-dark rounded-2xl shadow-2xl overflow-hidden flex flex-col z-50 animate-in slide-in-from-bottom-4 fade-in duration-300">
          {/* Header */}
          <div className="p-4 border-b border-glass-border bg-gradient-to-r from-accent-blue/20 to-accent-purple/20">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-navy"></div>
              </div>
              <div>
                <h3 className="font-semibold text-white">{AI_PERSONALITY.name}</h3>
                <p className="text-xs text-gray-400">{AI_PERSONALITY.role}</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="ml-auto p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <ChatBubble key={message.id} message={message} />
            ))}
            
            {isTyping && (
              <div className="flex items-start gap-2 message-ai">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="bg-navy-light rounded-2xl rounded-tl-md p-3 flex items-center gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length <= 2 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInputValue(reply);
                    setTimeout(handleSend, 100);
                  }}
                  className="text-xs px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-gray-300"
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          {/* Booking CTA */}
          {showBooking && (
            <div className="px-4 pb-2 flex gap-2">
              <button className="flex-1 py-2.5 bg-gradient-to-r from-accent-blue to-accent-purple rounded-xl font-medium text-sm hover:opacity-90 transition-opacity">
                Book a Call
              </button>
              <button className="flex-1 py-2.5 glass rounded-xl font-medium text-sm hover:bg-white/10 transition-colors">
                Send Details
              </button>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-glass-border">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 bg-navy-light border border-glass-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent-blue transition-colors placeholder-gray-500"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="p-2.5 bg-gradient-to-r from-accent-blue to-accent-purple rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAgent;
