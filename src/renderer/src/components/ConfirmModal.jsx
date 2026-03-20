import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const ConfirmModal = ({ open, title, message, onConfirm, onCancel, t, locale }) => (
  <AnimatePresence>
    {open ? (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur"
        onClick={onCancel}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-sm rounded-md border border-muted bg-background p-5 shadow-card"
        >
          <div className="text-lg font-semibold text-primary">{title}</div>
          <p className="mt-2 text-sm text-primary/70">{message}</p>
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={onCancel}
              className="rounded-md border border-muted px-3 py-2 text-sm text-primary hover:bg-muted/20"
            >
              {t(locale, 'inventory.cancel')}
            </button>
            <button
              onClick={onConfirm}
              className="rounded-md bg-danger px-3 py-2 text-sm font-semibold text-white hover:scale-[1.02]"
            >
              {t(locale, 'inventory.deleteTitle')}
            </button>
          </div>
        </motion.div>
      </motion.div>
    ) : null}
  </AnimatePresence>
);

export default ConfirmModal;
