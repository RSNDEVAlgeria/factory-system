import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiAlertTriangle } from 'react-icons/fi';

const ConfirmModal = ({ open, title, message, onConfirm, onCancel, t, locale }) => (
  <AnimatePresence>
    {open ? (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm"
        onClick={onCancel}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-sm bg-surface rounded-lg shadow-modal border border-border mx-4"
        >
          <div className="p-5">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-danger/10 flex items-center justify-center">
                <FiAlertTriangle size={20} className="text-danger" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-primary">{title}</h3>
                <p className="mt-2 text-sm text-muted">{message}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={onCancel}
                className="btn-secondary"
              >
                {t(locale, 'inventory.cancel')}
              </button>
              <button
                onClick={onConfirm}
                className="btn-danger"
              >
                {t(locale, 'inventory.deleteTitle')}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    ) : null}
  </AnimatePresence>
);

export default ConfirmModal;
