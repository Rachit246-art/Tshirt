import React from 'react';
import { useNavigate } from 'react-router-dom';

export const VisitStudioButton: React.FC = () => {
  const navigate = useNavigate();
  return (
    <button 
      onClick={() => navigate('/studio')}
      className="visit-studio-btn hover:opacity-90 active:scale-95 transition-all duration-200 pointer-events-auto shrink-0 cursor-pointer"
      style={{
        backgroundColor: '#e50000',
        color: '#ffffff',
        border: 'none',
        borderRadius: '4px',
        padding: '5px 12px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '28px',
        boxShadow: '0 2px 8px rgba(229, 0, 0, 0.4)'
      }}
    >
      <span 
        style={{
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
          textTransform: 'uppercase',
          letterSpacing: '0.18em',
          fontSize: '11px',
          fontWeight: 700,
          lineHeight: 1,
          color: '#ffffff'
        }}
      >
        STUDIO
      </span>
    </button>
  );
};
