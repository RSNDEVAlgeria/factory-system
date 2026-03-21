import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiClock, FiAlertCircle } from 'react-icons/fi';

const sampleSales = [
  { label: 'Mon', total: 420 },
  { label: 'Tue', total: 610 },
  { label: 'Wed', total: 380 },
  { label: 'Thu', total: 760 },
  { label: 'Fri', total: 540 },
  { label: 'Sat', total: 920 },
  { label: 'Sun', total: 310 },
];

const samplePending = 280;
const sampleLowStock = 6;
const categoryShare = [
  { label: 'Brakes', value: 30, color: '#3b82f6' },
  { label: 'Engine', value: 22, color: '#10b981' },
  { label: 'Ignition', value: 18, color: '#f59e0b' },
  { label: 'Electrical', value: 15, color: '#6366f1' },
  { label: 'Suspension', value: 15, color: '#8b5cf6' },
];

const ReportsPage = ({ animationsEnabled = true, isCompact = false }) => {
  const maxValue = useMemo(() => Math.max(...sampleSales.map((s) => s.total), 1), []);
  const wrapMotion = (props) => (animationsEnabled ? props : { initial: false, animate: false, transition: { duration: 0 } });
  const pad = isCompact ? 'p-4' : 'p-5';

  return (
    <div className="space-y-5">
      <div className="card p-5">
        <h2 className="text-base font-semibold text-primary">Business Overview</h2>
        <p className="text-sm text-muted mt-1">
          Weekly snapshot of sales, pending receivables, and low stock alerts. (Static demo data)
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <motion.div
          {...wrapMotion({ initial: { y: 10, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { delay: 0.05 } })}
          className="card p-5"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-accent/10">
              <FiTrendingUp size={20} className="text-accent" />
            </div>
            <div>
              <div className="text-sm text-muted">Total Sales (week)</div>
              <div className="text-2xl font-bold text-primary tracking-tight">$3,940</div>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-success">
            <FiTrendingUp size={14} />
            <span>+12% vs last week</span>
          </div>
        </motion.div>

        <motion.div
          {...wrapMotion({ initial: { y: 10, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { delay: 0.1 } })}
          className="card p-5"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-warning/10">
              <FiClock size={20} className="text-warning" />
            </div>
            <div>
              <div className="text-sm text-muted">Pending (pay later)</div>
              <div className="text-2xl font-bold text-primary tracking-tight">${samplePending.toFixed(0)}</div>
            </div>
          </div>
          <div className="mt-3 text-xs text-muted">
            Collect soon to improve cash flow
          </div>
        </motion.div>

        <motion.div
          {...wrapMotion({ initial: { y: 10, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { delay: 0.15 } })}
          className="card p-5"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-danger/10">
              <FiAlertCircle size={20} className="text-danger" />
            </div>
            <div>
              <div className="text-sm text-muted">Low Stock Items</div>
              <div className="text-2xl font-bold text-primary tracking-tight">{sampleLowStock}</div>
            </div>
          </div>
          <div className="mt-3 text-xs text-muted">
            Restock before weekend peak
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className={`card ${pad}`}>
          <div className="flex items-center justify-between mb-5">
            <div className="text-sm font-semibold text-primary">Weekly Sales</div>
            <div className="text-xs text-muted bg-slate-100 px-2 py-1 rounded">Last 7 days</div>
          </div>
          <div className="flex items-end gap-3 h-44">
            {sampleSales.map((s, idx) => (
              <motion.div
                key={s.label}
                {...wrapMotion({
                  initial: { scaleY: 0 },
                  animate: { scaleY: s.total / maxValue },
                  transition: { delay: 0.05 * idx, type: 'spring', stiffness: 120, damping: 15 },
                })}
                className="relative flex-1 rounded-t bg-accent/80 hover:bg-accent transition-colors cursor-pointer group"
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  ${s.total.toFixed(0)}
                </div>
                <div className="absolute bottom-[-24px] left-1/2 -translate-x-1/2 text-xs text-muted">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className={`card ${pad}`}>
          <div className="flex items-center justify-between mb-5">
            <div className="text-sm font-semibold text-primary">Category Distribution</div>
            <div className="text-xs text-muted bg-slate-100 px-2 py-1 rounded">By parts</div>
          </div>
          <div className="flex gap-6 items-center">
            <svg viewBox="0 0 36 36" className="h-36 w-36 flex-shrink-0">
              <circle cx="18" cy="18" r="16" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
              {(() => {
                let offset = 0;
                return categoryShare.map((c) => {
                  const dash = (c.value / 100) * 100.53;
                  const circ = 100.53;
                  const el = (
                    <circle
                      key={c.label}
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      stroke={c.color}
                      strokeWidth="3.5"
                      strokeDasharray={`${dash} ${circ - dash}`}
                      strokeDashoffset={-offset}
                      strokeLinecap="round"
                    />
                  );
                  offset += dash;
                  return el;
                });
              })()}
            </svg>
            <div className="space-y-2.5 flex-1">
              {categoryShare.map((c) => (
                <div key={c.label} className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-sm flex-shrink-0" style={{ background: c.color }}></span>
                  <span className="text-sm text-primary flex-1">{c.label}</span>
                  <span className="text-sm font-medium text-muted">{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={`card ${pad}`}>
        <div className="text-sm font-semibold text-primary mb-3">Key Insights</div>
        <ul className="text-sm text-muted space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-success mt-1">•</span>
            <span>Saturday was the top day with <span className="font-medium text-primary">$920</span> in sales.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-warning mt-1">•</span>
            <span><span className="font-medium text-primary">${samplePending.toFixed(0)}</span> pending from pay-later customers—follow up for better cash flow.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-danger mt-1">•</span>
            <span><span className="font-medium text-primary">{sampleLowStock} items</span> flagged low—restock to avoid stockouts.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ReportsPage;
