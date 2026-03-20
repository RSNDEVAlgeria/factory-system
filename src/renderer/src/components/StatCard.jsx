import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ label, value, icon, alert }) => (
  <motion.div
    whileHover={{ y: -2, boxShadow: '0 8px 20px rgba(0,0,0,0.12)' }}
    className="rounded-md border border-muted bg-surface p-4 shadow-card"
  >
    <div className="flex items-center justify-between">
      <div className="text-muted">{icon}</div>
      {alert ? (
        <span className="rounded-full bg-danger/20 px-2 py-1 text-xs font-semibold text-danger">Alert</span>
      ) : null}
    </div>
    <div className="mt-3 text-2xl font-bold text-primary">{value}</div>
    <div className="text-sm text-primary/70">{label}</div>
  </motion.div>
);

export default StatCard;
