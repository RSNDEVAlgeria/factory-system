import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const navItems = [
  { label: 'Dashboard', to: '/' },
  { label: 'Inventory', to: '/inventory' },
  { label: 'Purchases', to: '/purchases' },
  { label: 'Suppliers', to: '/suppliers' },
  { label: 'Sales', to: '/sales' },
  { label: 'Reports', to: '/reports' },
  { label: 'Settings', to: '/settings' },
];

const Sidebar = ({ position = 'side', locale, t }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const NavButtons = () => (
    <>
      {navItems.map((item) => {
        const isActive =
          location.pathname === item.to || (item.to !== '/' && location.pathname.startsWith(item.to));
        return (
          <button
            key={item.to}
            type="button"
            onClick={() => navigate(item.to)}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition ${
              isActive ? 'bg-accent text-white' : 'text-background/70 hover:bg-accent/40'
            }`}
          >
            <span className="text-xs">●</span>
            <span>
              {t(locale, `nav.${item.label.toLowerCase()}`) || item.label}
            </span>
          </button>
        );
      })}
    </>
  );

  if (position === 'top') {
    return (
      <div className="flex flex-col bg-primary text-background shadow-card">
        <div className="flex items-center justify-between px-5 py-3">
          <div className="text-lg font-bold tracking-wide">Invo Parts</div>
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 0.8, y: 0 }} className="text-xs text-background/60">
            Offline first · Auto-save
          </motion.div>
        </div>
        <div className="flex gap-2 overflow-auto px-3 pb-3">
          <NavButtons />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-[136px] flex-col bg-primary text-background shadow-card">
      <div className="px-3 py-4 text-base font-bold leading-tight tracking-wide text-center">
        {t(locale, 'appName')}
      </div>
      <nav className="flex-1 space-y-1 px-3">
        <NavButtons />
      </nav>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 0.8, y: 0 }}
        className="p-4 text-xs text-background/60"
      >
        Offline first · Auto-save
      </motion.div>
    </div>
  );
};

export default Sidebar;
