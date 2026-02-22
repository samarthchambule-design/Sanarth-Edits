import React from 'react';

const ChatBubble = ({ message }) => {
  const isUser = message.type === 'user';
  
  // Format timestamp
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Render content with basic markdown-like formatting
  const renderContent = (content) => {
    // Split by newlines and process
    const lines = content.split('\n');
    
    return lines.map((line, index) => {
      // Check for bold text (**text**)
      if (line.includes('**')) {
        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        return (
          <p key={index} className="mb-1">
            {parts.map((part, i) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <span key={i} className="font-semibold text-white">{part.slice(2, -2)}</span>;
              }
              return <span key={i}>{part}</span>;
            })}
          </p>
        );
      }
      
      // Check for bullet points
      if (line.match(/^[\s]*[•*-]\s/)) {
        return (
          <p key={index} className="mb-1 flex items-start gap-2">
            <span className="text-accent-purple mt-1">•</span>
            <span>{line.replace(/^[\s]*[•*-]\s/, '')}</span>
          </p>
        );
      }
      
      // Check for numbered lists
      if (line.match(/^\d+[.]\s/)) {
        return (
          <p key={index} className="mb-1 flex items-start gap-2">
            <span className="text-accent-blue min-w-[1.5rem]">{line.match(/^\d+/)[0]}.</span>
            <span>{line.replace(/^\d+.\s/, '')}</span>
          </p>
        );
      }
      
      // Regular paragraph
      return line ? <p key={index} className="mb-1">{line}</p> : <p key={index} className="mb-2"></p>;
    });
  };

  return (
    <div className={`flex items-start gap-2 ${isUser ? 'justify-end' : ''} ${isUser ? 'message-user' : 'message-ai'}`}>
      {/* AI Avatar */}
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple flex items-center justify-center flex-shrink-0 mt-1">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      )}
      
      {/* Message Bubble */}
      <div 
        className={`
          max-w-[80%] rounded-2xl p-3 
          ${isUser 
            ? 'bg-gradient-to-r from-accent-blue to-accent-purple rounded-tr-md' 
            : 'bg-navy-light border border-glass-border rounded-tl-md'
          }
        `}
      >
        <div className={`text-sm ${isUser ? 'text-white' : 'text-gray-200'}`}>
          {renderContent(message.content)}
        </div>
        
        {/* Timestamp */}
        <div className={`text-xs mt-1 ${isUser ? 'text-white/60' : 'text-gray-500'}`}>
          {formatTime(message.timestamp)}
        </div>
      </div>
      
      {/* User has no avatar, just alignment */}
      {isUser && <div className="w-8 flex-shrink-0"></div>}
    </div>
  );
};

export default ChatBubble;
