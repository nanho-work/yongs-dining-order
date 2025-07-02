'use client'
import React from 'react';

export const Button = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
      {...props}
    >
      {children}
    </button>
  );
};