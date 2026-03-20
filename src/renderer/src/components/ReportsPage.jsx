import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

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
  { label: 'Brakes', value: 30, color: '#70798c' },
  { label: 'Engine', value: 22, color: '#a99985' },
  { label: 'Ignition', value: 18, color: '#dad2bc' },
  { label: 'Electrical', value: 15, color: '#252323' },
  { label: 'Suspension', value: 15, color: '#f5f1ed' },
];

const ReportsPage = ({ animationsEnabled = true, isCompact = false }) => {
  const maxValue = useMemo(() => Math.max(...sampleSales.map((s) => s.total), 1), []);
  const wrapMotion = (props) => (animationsEnabled ? props : { initial: false, animate: false, transition: { duration: 0 } });
  const pad = isCompact ? 'p-4' : 'p-6';

  return (
    <div className="space-y-6">
      <div className={`rounded-md border border-muted bg-surface ${pad} shadow-card`}>
        <div className="text-lg font-semibold text-primary">Reports</div>
        <p className="text-sm text-primary/70">
          Snapshot of weekly sales, pending receivables, and low stock alerts. (Static demo data—wire to real sales next.)
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <motion.div
          {...wrapMotion({ initial: { y: 10, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { delay: 0.05 } })}
          className="rounded-md border border-muted bg-background p-4 shadow-card"
        >
          <div className="text-sm text-primary/70">Total Sales (week)</div>
          <div className="text-2xl font-bold text-primary">$3,940</div>
          <div className="text-xs text-primary/60 mt-1">+12% vs last week</div>
        </motion.div>

        <motion.div
          {...wrapMotion({ initial: { y: 10, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { delay: 0.1 } })}
          className="rounded-md border border-muted bg-background p-4 shadow-card"
        >
          <div className="text-sm text-primary/70">Pending (pay later)</div>
          <div className="text-2xl font-bold text-primary">${samplePending.toFixed(0)}</div>
          <div className="text-xs text-primary/60 mt-1">Collect soon to improve cash flow</div>
        </motion.div>

        <motion.div
          {...wrapMotion({ initial: { y: 10, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { delay: 0.15 } })}
          className="rounded-md border border-muted bg-background p-4 shadow-card"
        >
          <div className="text-sm text-primary/70">Low Stock Items</div>
          <div className="text-2xl font-bold text-primary">{sampleLowStock}</div>
          <div className="text-xs text-primary/60 mt-1">Restock before weekend peak</div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className={`rounded-md border border-muted bg-surface ${pad} shadow-card`}>
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm font-semibold text-primary">Weekly Sales</div>
            <div className="text-xs text-primary/60">Animated bars</div>
          </div>
          <div className="flex items-end gap-3 h-48">
            {sampleSales.map((s, idx) => (
              <motion.div
                key={s.label}
                {...wrapMotion({
                  initial: { scaleY: 0 },
                  animate: { scaleY: s.total / maxValue },
                  transition: { delay: 0.05 * idx, type: 'spring', stiffness: 120, damping: 15 },
                })}
                className="relative w-10 origin-bottom rounded-md bg-accent/70"
              >
                <div className="absolute -top-6 w-max text-xs font-semibold text-primary">
                  ${s.total.toFixed(0)}
                </div>
                <div className="absolute inset-0 rounded-md bg-accent/40 blur-sm"></div>
                <div className="absolute bottom-[-22px] left-1/2 -translate-x-1/2 text-xs text-primary/70">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className={`rounded-md border border-muted bg-surface ${pad} shadow-card`}>
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm font-semibold text-primary">Category Share</div>
            <div className="text-xs text-primary/60">Static demo</div>
          </div>
          <div className="flex flex-wrap gap-6 items-center">
            <svg viewBox="0 0 36 36" className="h-40 w-40">
              <circle cx="18" cy="18" r="16" fill="none" stroke="#dad2bc" strokeWidth="4" />
              {(() => {
                let offset = 0;
                return categoryShare.map((c) => {
                  const dash = (c.value / 100) * 100.53; // circumference approx
                  const circ = 100.53;
                  const el = (
                    <circle
                      key={c.label}
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      stroke={c.color}
                      strokeWidth="4"
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
            <div className="space-y-2 text-sm text-primary/80">
              {categoryShare.map((c) => (
                <div key={c.label} className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full" style={{ background: c.color }}></span>
                  <span className="font-semibold">{c.label}</span>
                  <span className="text-primary/60">{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={`rounded-md border border-muted bg-surface ${pad} shadow-card`}>
        <div className="text-sm font-semibold text-primary mb-3">Highlights</div>
        <ul className="text-sm text-primary/80 space-y-1 list-disc list-inside">
          <li>Saturday was the top day ($920).</li>
          <li>${samplePending.toFixed(0)} pending from pay-later customers.</li>
          <li>{sampleLowStock} items flagged low—restock to avoid stockouts.</li>
        </ul>
      </div>
    </div>
  );
};

export default ReportsPage;
