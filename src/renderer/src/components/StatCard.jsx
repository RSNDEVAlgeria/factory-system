import React from 'react';
import { motion } from 'framer-motion';
import { FiPackage, FiAlertTriangle, FiFileText, FiUsers } from 'react-icons/fi';

const iconMap = {
  '📦': FiPackage,
  '⚠️': FiAlertTriangle,
  '🧾': FiFileText,
  '🏭': FiUsers,
};

const StatCard = ({ label, value, icon, alert }) => {
  const Icon = iconMap[icon] || FiPackage;
  const isAlert = alert || false;
  
  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}
      className="card p-5 relative overflow-hidden"
    >
      <div className={`absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-5 ${isAlert ? 'bg-danger' : 'bg-accent'}`} />
      <div className="flex items-start justify-between">
        <div className={`p-2.5 rounded-lg ${isAlert ? 'bg-danger/10' : 'bg-accent/10'}`}>
          <Icon size={20} className={isAlert ? 'text-danger' : 'text-accent'} />
        </div>
        {isAlert ? (
          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-danger/10 text-danger">
            Alert
          </span>
        ) : null}
      </div>
      <div className="mt-4">
        <div className="text-2xl font-bold text-primary tracking-tight">{value}</div>
        <div className="text-sm text-muted mt-0.5">{label}</div>
      </div>
    </motion.div>
  );
};

export default StatCard;
