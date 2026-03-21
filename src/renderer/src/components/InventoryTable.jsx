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
              className="w-full border border-accent rounded px-2 py-1 text-sm bg-white focus:ring-2 focus:ring-accent/20"
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
          className="w-full border border-accent rounded px-2 py-1 text-sm bg-white focus:ring-2 focus:ring-accent/20"
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
    <div className="card overflow-hidden">
      <div className="max-h-[520px] overflow-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase text-muted tracking-wider">
            <tr className="border-b border-border">
              {columns.map((col) => (
                <th key={col.key} className={`${isCompact ? 'px-3 py-2.5' : 'px-4 py-3'} whitespace-nowrap`}>
                  {col.label}
                </th>
              ))}
              <th className={`${isCompact ? 'px-3 py-2.5' : 'px-4 py-3'} text-right`}></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {parts.map((row, idx) => (
              <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`${isCompact ? 'px-3 py-2.5' : 'px-4 py-3'} ${
                      col.key === 'quantity' && row.quantity <= (row.threshold ?? 10)
                        ? 'bg-red-50 text-red-700 font-medium'
                        : 'text-primary'
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
                <td className={`${isCompact ? 'px-3 py-2.5' : 'px-4 py-3'}`}>
                  <div className="flex justify-end gap-1">
                    <button
                      className="p-1.5 rounded text-muted hover:text-accent hover:bg-accent/10 transition-colors"
                      onClick={() => setEditingId(row.id)}
                      title="Edit row"
                    >
                      <FiEdit2 size={15} />
                    </button>
                    <button
                      className="p-1.5 rounded text-muted hover:text-danger hover:bg-danger/10 transition-colors"
                      onClick={() => onDelete(row)}
                      title="Delete"
                    >
                      <FiTrash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {parts.length === 0 ? (
              <tr>
                <td className="px-4 py-8 text-center text-muted" colSpan={columns.length + 1}>
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
