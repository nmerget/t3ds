import { HTMLAttributes, ReactNode } from 'react';

export interface CardProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'title'
> {
  title?: ReactNode;
  actions?: ReactNode;
}

export function Card({
  title,
  actions,
  className = '',
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={`
      card bg-base-200 shadow-sm
      ${className}
    `}
      {...props}
    >
      <div className="card-body gap-6">
        {title && <h2 className="card-title">{title}</h2>}
        {children}
        {actions && <div className="card-actions">{actions}</div>}
      </div>
    </div>
  );
}
