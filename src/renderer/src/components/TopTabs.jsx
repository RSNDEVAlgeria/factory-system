import React from 'react';
import { NavLink } from 'react-router-dom';

const TopTabs = ({ base, t, locale }) => {
  if (base !== '/inventory') return <div className="h-6" />;

  const tabs = [
    { label: t(locale, 'inventory.tabs.all'), to: '/inventory', exact: true },
    { label: t(locale, 'inventory.tabs.categories'), to: '/inventory/categories', exact: true },
  ];

  if (!tabs) return <div className="h-6" />;

  return (
    <div className="flex items-center gap-1 bg-background border-b border-border px-6 pt-4 pb-0">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.exact}
          className={({ isActive }) =>
            `px-4 py-3 text-sm font-medium transition-all duration-150 border-b-2 ${
              isActive 
                ? 'text-accent border-accent' 
                : 'text-muted border-transparent hover:text-primary hover:border-slate-300'
            }`
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </div>
  );
};

export default TopTabs;
