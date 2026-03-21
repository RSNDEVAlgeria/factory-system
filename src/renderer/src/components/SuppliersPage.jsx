import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import ConfirmModal from './ConfirmModal';

const empty = { name: '', phone: '', email: '', catalog: '' };

const SuppliersPage = ({ suppliers, setSuppliers, t, locale }) => {
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState(empty);
  const [toDelete, setToDelete] = useState(null);

  const add = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    const item = { ...form, id: crypto.randomUUID() };
    setSuppliers((prev) => [...prev, item]);
    setForm(empty);
  };

  const startEdit = (supplier) => {
    setEditingId(supplier.id);
    setDraft(supplier);
  };

  const saveEdit = () => {
    setSuppliers((prev) => prev.map((s) => (s.id === editingId ? draft : s)));
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDraft(empty);
  };

  const askDelete = (supplier) => setToDelete(supplier);

  const doDelete = () => {
    setSuppliers((prev) => prev.filter((s) => s.id !== toDelete.id));
    setToDelete(null);
  };

  return (
    <div className="space-y-5">
      <div className="card p-5">
        <div className="text-sm font-semibold text-primary mb-4">Add Supplier</div>
        <form onSubmit={add} className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
          <div>
            <input
              className="input-field"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
          </div>
          <div>
            <input
              className="input-field"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            />
          </div>
          <div>
            <input
              type="email"
              className="input-field"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            />
          </div>
          <div>
            <input
              className="input-field"
              placeholder="What they sell"
              value={form.catalog}
              onChange={(e) => setForm((f) => ({ ...f, catalog: e.target.value }))}
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="btn-primary flex items-center gap-2 w-full justify-center"
            >
              <FiPlus size={16} /> Add
            </button>
          </div>
        </form>
      </div>

      <div className="card overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase text-muted tracking-wider">
            <tr className="border-b border-border">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Catalog</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {suppliers.map((s, idx) => (
              <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-4 py-3 text-primary font-medium">{s.name}</td>
                <td className="px-4 py-3 text-muted">{s.phone || '—'}</td>
                <td className="px-4 py-3 text-muted">{s.email || '—'}</td>
                <td className="px-4 py-3 text-muted">{s.catalog || '—'}</td>
                <td className="px-4 py-3 text-right">
                  {editingId === s.id ? (
                    <div className="flex justify-end gap-2">
                      <button
                        className="px-3 py-1.5 text-xs font-medium text-muted hover:text-primary border border-border rounded hover:bg-slate-50 transition-colors"
                        onClick={cancelEdit}
                        type="button"
                      >
                        Cancel
                      </button>
                      <button
                        className="px-3 py-1.5 text-xs font-medium text-white bg-accent rounded hover:bg-accentDark transition-colors"
                        onClick={saveEdit}
                        type="button"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-end gap-1">
                      <button
                        className="p-1.5 rounded text-muted hover:text-accent hover:bg-accent/10 transition-colors"
                        onClick={() => startEdit(s)}
                        type="button"
                        title="Edit"
                      >
                        <FiEdit2 size={15} />
                      </button>
                      <button
                        className="p-1.5 rounded text-muted hover:text-danger hover:bg-danger/10 transition-colors"
                        onClick={() => askDelete(s)}
                        type="button"
                        title="Delete"
                      >
                        <FiTrash2 size={15} />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {suppliers.length === 0 ? (
              <tr>
                <td className="px-4 py-8 text-center text-muted" colSpan={5}>
                  No suppliers yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        open={!!toDelete}
        title="Delete supplier"
        message={`Remove ${toDelete?.name || ''}?`}
        onConfirm={doDelete}
        onCancel={() => setToDelete(null)}
        t={t}
        locale={locale}
      />
    </div>
  );
};

export default SuppliersPage;
