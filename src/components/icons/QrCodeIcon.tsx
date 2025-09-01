import React from 'react';

interface IconProps {
  className?: string;
}

const QrCodeIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor" 
      strokeWidth={2}
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M12 4v16m8-8H4" 
      />
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M3 10h4v4H3zM17 10h4v4h-4zM3 3h4v4H3zM17 3h4v4h-4z"
      />
       <path strokeLinecap="round" strokeLinejoin="round" d="M12 4L12 4M12 20L12 20M4 12L4 12M20 12L20 12M12 12h.01" />
    </svg>
  );
};

export default QrCodeIcon;
