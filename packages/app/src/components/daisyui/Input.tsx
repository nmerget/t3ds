import { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, id, className = '', ...props }: InputProps) {
  return (
    <label className="input w-full">
      {label && <span className="label">{label}</span>}
      <input id={id} className={className} {...props} />
    </label>
  );
}
