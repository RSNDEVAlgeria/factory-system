import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiHome, FiPackage, FiShoppingCart, FiTruck, FiBarChart2, FiSettings } from 'react-icons/fi';

const navItems = [
  { label: 'Dashboard', to: '/', icon: FiHome },
  { label: 'Inventory', to: '/inventory', icon: FiPackage },
  { label: 'Purchases', to: '/purchases', icon: FiShoppingCart },
  { label: 'Suppliers', to: '/suppliers', icon: FiTruck },
  { label: 'Sales', to: '/sales', icon: FiBarChart2 },
  { label: 'Reports', to: '/reports', icon: FiBarChart2 },
  { label: 'Settings', to: '/settings', icon: FiSettings },
];

const Sidebar = ({ position = 'side', locale, t }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const NavButtons = () => (
    <>
      {navItems.map((item) => {
        const isActive =
          location.pathname === item.to || (item.to !== '/' && location.pathname.startsWith(item.to));
        const Icon = item.icon;
        return (
          <button
            key={item.to}
            type="button"
            onClick={() => navigate(item.to)}
            className={`flex items-center gap-3 rounded px-3 py-2.5 text-sm font-medium transition-all duration-150 w-full ${
              isActive 
                ? 'bg-accent text-white shadow-md' 
                : 'text-slate-300 hover:bg-white/10'
            }`}
          >
            <Icon size={18} />
            <span className="text-xs uppercase tracking-wide">
              {t(locale, `nav.${item.label.toLowerCase()}`) || item.label}
            </span>
          </button>
        );
      })}
    </>
  );

  if (position === 'top') {
    return (
      <div className="flex flex-col bg-primary text-white shadow-lg border-b border-slate-700">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-accent rounded flex items-center justify-center font-bold text-sm">
              IP
            </div>
            <div className="text-lg font-semibold tracking-tight">{t(locale, 'appName')}</div>
          </div>
          <div className="flex gap-1 overflow-auto">
            <NavButtons />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-[180px] flex-col bg-primary text-white shadow-xl">
      <div className="px-4 py-5 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-accent rounded flex items-center justify-center font-bold text-sm">
            IP
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight">{t(locale, 'appName')}</span>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">Management</span>
          </div>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        <NavButtons />
      </nav>
      <div className="px-4 py-3 border-t border-slate-700">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-success rounded-full"></div>
          <span className="text-xs text-slate-400">System Online</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
