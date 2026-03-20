import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const EditableCell = ({ value, onSave, allowEdit, animationsEnabled = true }) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  useEffect(() => setDraft(value), [value]);
  useEffect(() => {
    if (allowEdit) setEditing(true);
    else setEditing(false);
  }, [allowEdit]);

  const commit = () => {
    setEditing(false);
    if (draft !== value) onSave(draft);
  };

  if (!allowEdit) {
    return <div className="relative">{value}</div>;
  }

  return (
    <div
      className="relative"
      onKeyDown={(e) => {
        if (e.key === 'Enter') commit();
        if (e.key === 'Escape') {
          setDraft(value);
          setEditing(false);
        }
      }}
    >
      {animationsEnabled ? (
        <AnimatePresence initial={false}>
          {editing ? (
            <motion.input
              key="input"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={commit}
              className="w-full rounded border border-accent bg-background px-2 py-1 text-sm focus:outline-none"
            />
          ) : (
            <motion.div
              key="text"
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="cursor-text"
            >
              {value}
            </motion.div>
          )}
        </AnimatePresence>
      ) : editing ? (
        <input
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          className="w-full rounded border border-accent bg-background px-2 py-1 text-sm focus:outline-none"
        />
      ) : (
        <div className="cursor-text">{value}</div>
      )}
    </div>
  );
};

const InventoryTable = ({ parts, onEdit, onDelete, t, locale, editingId, setEditingId, isCompact = false, animationsEnabled = true }) => {
  const columns = useMemo(
    () => [
      { key: 'partNumber', label: t(locale, 'inventory.columns.partNumber') },
      { key: 'name', label: t(locale, 'inventory.columns.name') },
      { key: 'category', label: t(locale, 'inventory.columns.category') },
      { key: 'quantity', label: t(locale, 'inventory.columns.quantity') },
      { key: 'purchasePrice', label: t(locale, 'inventory.columns.purchasePrice') },
      { key: 'salePrice', label: t(locale, 'inventory.columns.salePrice') },
      { key: 'supplier', label: t(locale, 'inventory.columns.supplier') },
      { key: 'location', label: t(locale, 'inventory.columns.location') },
    ],
    [locale, t]
  );

  return (
    <div className="overflow-hidden rounded-md border border-muted bg-surface shadow-card">
      <div className="max-h-[520px] overflow-auto">
        <table className="min-w-full divide-y divide-muted/60 text-sm">
          <thead className="bg-background text-left text-xs font-semibold uppercase text-primary/70">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3">
                  {col.label}
                </th>
              ))}
              <th className="px-4 py-3 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-muted/50">
            {parts.map((row, idx) => (
              <tr key={row.id} className={idx % 2 === 0 ? 'bg-background' : 'bg-surface'}>
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`${isCompact ? 'px-3 py-2' : 'px-4 py-3'} ${
                      col.key === 'quantity' && row.quantity <= (row.threshold ?? 10)
                        ? 'bg-red-100 text-red-700 rounded'
                        : ''
                    }`}
                  >
                    <EditableCell
                      value={row[col.key]}
                      onSave={(val) => onEdit(row.id, col.key, val)}
                      allowEdit={editingId === row.id && col.key === 'location'}
                      animationsEnabled={animationsEnabled}
                    />
                  </td>
                ))}
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2 text-primary/70">
                    <button
                      className="rounded border border-accent/30 p-1 text-accent hover:bg-accent/10"
                      onClick={() => setEditingId(row.id)}
                      title="Edit row"
                    >
                      <FiEdit2 size={16} />
                    </button>
                    <button
                      className="rounded border border-danger/40 p-1 text-danger hover:bg-danger/10"
                      onClick={() => onDelete(row)}
                      title="Delete"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {parts.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-center text-primary/60" colSpan={columns.length + 1}>
                  {t(locale, 'inventory.noParts')}
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryTable;
