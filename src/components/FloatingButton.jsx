import React from 'react';

const FloatingButton = ({ isOpen, onClick }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Pulse ring effect */}
      {!isOpen && (
        <div className="absolute inset-0 rounded-full">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple opacity-30 pulse-ring"></div>
        </div>
      )}
      
      {/* Main button */}
      <button
        onClick={onClick}
        className={`
          relative w-16 h-16 rounded-full 
          bg-gradient-to-r from-accent-blue to-accent-purple 
          shadow-lg hover:shadow-xl 
          transition-all duration-300 ease-out
          flex items-center justify-center
          group
          ${isOpen ? 'rotate-90' : 'hover:scale-110 animate-pulse-glow'}
        `}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {/* Icon - X when open, AI icon when closed */}
        {isOpen ? (
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="relative">
            {/* Spark/AI Icon */}
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M13 10V3L4 14h7v7l9-11h-7z" 
              />
            </svg>
            {/* Small sparkle */}
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full opacity-70 animate-ping"></div>
          </div>
        )}
        
        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      </button>

      {/* Tooltip */}
      {!isOpen && (
        <div className="absolute right-20 top-1/2 -translate-y-1/2 glass px-3 py-1.5 rounded-lg opacity-0 animate-fade-in pointer-events-none">
          <span className="text-sm text-white whitespace-nowrap">Chat with Samarth</span>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full border-8 border-transparent border-l-white/10"></div>
        </div>
      )}
    </div>
  );
};

export default FloatingButton;
