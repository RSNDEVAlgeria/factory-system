import React from 'react';
import { NavLink } from 'react-router-dom';

const TopTabs = ({ base, t, locale }) => {
  if (base !== '/inventory') return <div className="h-4" />;

  const tabs = [
    { label: t(locale, 'inventory.tabs.all'), to: '/inventory', exact: true },
    { label: t(locale, 'inventory.tabs.categories'), to: '/inventory/categories', exact: true },
  ];

  if (!tabs) return <div className="h-4" />;

  return (
    <div className="flex items-center gap-6 border-b border-muted/50 bg-background px-6 pt-4">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.exact}
          className={({ isActive }) =>
            `pb-3 text-sm font-semibold transition ${
              isActive ? 'text-accent border-b-2 border-accent' : 'text-primary/70 hover:text-primary'
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
