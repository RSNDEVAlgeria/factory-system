import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

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

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-lg rounded-md border border-muted bg-background p-6 shadow-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 text-lg font-semibold text-primary">{t(locale, 'inventory.addTitle')}</div>
            <form onSubmit={submit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <label className="text-sm text-primary/70">
                  {t(locale, 'inventory.fields.partNumber')}
                  <input
                    required
                    className="mt-1 w-full rounded-md border border-muted bg-surface px-3 py-2 focus:border-accent focus:outline-none"
                    value={form.partNumber}
                    onChange={(e) => setForm({ ...form, partNumber: e.target.value })}
                  />
                </label>
                <label className="text-sm text-primary/70">
                  {t(locale, 'inventory.fields.name')}
                  <input
                    required
                    className="mt-1 w-full rounded-md border border-muted bg-surface px-3 py-2 focus:border-accent focus:outline-none"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </label>
                <label className="text-sm text-primary/70">
                  {t(locale, 'inventory.fields.category')}
                  <select
                    className="mt-1 w-full rounded-md border border-muted bg-surface px-3 py-2 focus:border-accent focus:outline-none"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                  >
                    <option value="">Select</option>
                    {categories.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </label>
                <label className="text-sm text-primary/70">
                  {t(locale, 'inventory.fields.supplier')}
                  <select
                    className="mt-1 w-full rounded-md border border-muted bg-surface px-3 py-2 focus:border-accent focus:outline-none"
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
                </label>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <label className="text-sm text-primary/70">
                  {t(locale, 'inventory.fields.quantity')}
                  <input
                    type="number"
                    min="0"
                    className="mt-1 w-full rounded-md border border-muted bg-surface px-3 py-2 focus:border-accent focus:outline-none"
                    value={form.quantity}
                    onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
                  />
                </label>
                <label className="text-sm text-primary/70">
                  {t(locale, 'inventory.fields.purchasePrice')}
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className="mt-1 w-full rounded-md border border-muted bg-surface px-3 py-2 focus:border-accent focus:outline-none"
                    value={form.purchasePrice}
                    onChange={(e) => setForm({ ...form, purchasePrice: Number(e.target.value) })}
                  />
                </label>
                <label className="text-sm text-primary/70">
                  {t(locale, 'inventory.fields.salePrice')}
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className="mt-1 w-full rounded-md border border-muted bg-surface px-3 py-2 focus:border-accent focus:outline-none"
                    value={form.salePrice}
                    onChange={(e) => setForm({ ...form, salePrice: Number(e.target.value) })}
                  />
                </label>
                <label className="text-sm text-primary/70">
                  {t(locale, 'inventory.fields.threshold')}
                  <input
                    type="number"
                    min="0"
                    className="mt-1 w-full rounded-md border border-muted bg-surface px-3 py-2 focus:border-accent focus:outline-none"
                    value={form.threshold}
                    onChange={(e) => setForm({ ...form, threshold: Number(e.target.value) })}
                  />
                </label>
                <label className="text-sm text-primary/70">
                  {t(locale, 'inventory.fields.location') || 'Location'}
                  <input
                    className="mt-1 w-full rounded-md border border-muted bg-surface px-3 py-2 focus:border-accent focus:outline-none"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                  />
                </label>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md border border-muted bg-white px-3 py-2 text-sm text-primary hover:bg-muted/20"
                >
                  {t(locale, 'inventory.cancel')}
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white shadow-card transition hover:scale-[1.02]"
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
