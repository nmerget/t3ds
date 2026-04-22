import { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ className = '', children, ...props }: ButtonProps) {
  return (
    <button
      className={`
      btn
      ${className}
    `}
      {...props}
    >
      {children}
    </button>
  );
}
