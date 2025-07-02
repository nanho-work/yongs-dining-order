'use client'
import React from 'react';

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className = '', ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`border border-gray-300 rounded px-3 py-2 w-full resize-y focus:outline-none focus:ring-2 focus:ring-black ${className}`}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';