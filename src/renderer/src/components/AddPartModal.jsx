import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';

const empty = {
  partNumber: '',
  name: '',
  category: '',
  quantity: 0,
  purchasePrice: 0,
  salePrice: 0,
  supplier: '',
  threshold: 10,
  location: '',
};

const AddPartModal = ({ open, onClose, onSave, categories, suppliers, t, locale }) => {
  const [form, setForm] = useState(empty);

  const submit = (e) => {
    e.preventDefault();
    onSave(form);
    setForm(empty);
  };

  const handleClose = () => {
    setForm(empty);
    onClose();
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="w-full max-w-lg bg-surface rounded-lg shadow-modal border border-border mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h2 className="text-base font-semibold text-primary">{t(locale, 'inventory.addTitle')}</h2>
              <button
                onClick={handleClose}
                className="p-1.5 rounded text-muted hover:text-primary hover:bg-slate-100 transition-colors"
              >
                <FiX size={18} />
              </button>
            </div>
            <form onSubmit={submit} className="p-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted mb-1.5">
                    {t(locale, 'inventory.fields.partNumber')}
                  </label>
                  <input
                    required
                    className="input-field"
                    value={form.partNumber}
                    onChange={(e) => setForm({ ...form, partNumber: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted mb-1.5">
                    {t(locale, 'inventory.fields.name')}
                  </label>
                  <input
                    required
                    className="input-field"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted mb-1.5">
                    {t(locale, 'inventory.fields.category')}
                  </label>
                  <select
                    className="input-field"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                  >
                    <option value="">Select</option>
                    {categories.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted mb-1.5">
                    {t(locale, 'inventory.fields.supplier')}
                  </label>
                  <select
                    className="input-field"
                    value={form.supplier}
                    onChange={(e) => setForm({ ...form, supplier: e.target.value })}
                  >
                    <option value="">Select</option>
                    {suppliers.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-xs font-medium text-muted mb-1.5">
                    {t(locale, 'inventory.fields.quantity')}
                  </label>
                  <input
                    type="number"
                    min="0"
                    className="input-field"
                    value={form.quantity}
                    onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted mb-1.5">
                    {t(locale, 'inventory.fields.purchasePrice')}
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className="input-field"
                    value={form.purchasePrice}
                    onChange={(e) => setForm({ ...form, purchasePrice: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted mb-1.5">
                    {t(locale, 'inventory.fields.salePrice')}
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className="input-field"
                    value={form.salePrice}
                    onChange={(e) => setForm({ ...form, salePrice: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted mb-1.5">
                    {t(locale, 'inventory.fields.threshold')}
                  </label>
                  <input
                    type="number"
                    min="0"
                    className="input-field"
                    value={form.threshold}
                    onChange={(e) => setForm({ ...form, threshold: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted mb-1.5">
                    {t(locale, 'inventory.fields.location') || 'Location'}
                  </label>
                  <input
                    className="input-field"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={handleClose}
                  className="btn-secondary"
                >
                  {t(locale, 'inventory.cancel')}
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  {t(locale, 'inventory.save')}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default AddPartModal;
