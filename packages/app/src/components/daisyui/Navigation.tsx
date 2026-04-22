import { cloneElement, ReactElement } from 'react';

export interface NavigationItem {
  key: string;
  element: ReactElement;
}

export interface NavigationProps {
  brand: ReactElement<{ className?: string }>;
  items: Record<string, ReactElement>;
}

export function Navigation({ brand, items }: NavigationProps) {
  return (
    <div
      className="
      navbar bg-base-100
      max-lg:justify-center max-lg:border-t
      lg:border-b
    "
    >
      <div
        className="
        navbar-start
        max-lg:hidden
      "
      >
        {cloneElement(brand, { className: 'btn btn-ghost text-xl' } as any)}
      </div>
      <div className="navbar-center">
        <nav>
          <ul className="menu menu-horizontal gap-2">
            {Object.entries(items).map(([key, item]) => (
              <li key={key}>{item}</li>
            ))}
          </ul>
        </nav>
      </div>
      <div
        className="
        navbar-end
        max-lg:hidden
      "
      ></div>
    </div>
  );
}
