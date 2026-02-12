import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

export default function Button({
  children,
  onClick,
  disabled = false,
  variant = 'primary'
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded ${variant === 'primary'
        ? 'bg-blue-500 text-white'
        : 'bg-gray-200 text-black'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'}`}
    >
      {children}
    </button>
  );
}