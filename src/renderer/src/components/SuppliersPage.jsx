import React, { useState } from 'react';
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
    <div className="space-y-4">
      <div className="rounded-md border border-muted bg-surface p-4 shadow-card">
        <div className="text-lg font-semibold text-primary mb-3">Add Supplier</div>
        <form onSubmit={add} className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          <input
            className="rounded-md border border-muted bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
          <input
            className="rounded-md border border-muted bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          />
          <input
            type="email"
            className="rounded-md border border-muted bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />
          <input
            className="rounded-md border border-muted bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none"
            placeholder="What they sell"
            value={form.catalog}
            onChange={(e) => setForm((f) => ({ ...f, catalog: e.target.value }))}
          />
          <div className="md:col-span-2 lg:col-span-4 flex justify-end">
            <button
              type="submit"
              className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white shadow-card transition hover:scale-[1.02]"
            >
              Add Supplier
            </button>
          </div>
        </form>
      </div>

      <div className="overflow-hidden rounded-md border border-muted bg-surface shadow-card">
        <table className="min-w-full divide-y divide-muted/60 text-sm">
          <thead className="bg-background text-left text-xs font-semibold uppercase text-primary/70">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Catalog</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-muted/50">
            {suppliers.map((s, idx) => (
              <tr key={s.id} className={idx % 2 === 0 ? 'bg-background' : 'bg-surface'}>
                <td className="px-4 py-3">
                  {editingId === s.id ? (
                    <input
                      className="w-full rounded border border-muted bg-background px-2 py-1 text-sm focus:border-accent focus:outline-none"
                      value={draft.name}
                      onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                    />
                  ) : (
                    s.name
                  )}
                </td>
                <td className="px-4 py-3">
                  {editingId === s.id ? (
                    <input
                      className="w-full rounded border border-muted bg-background px-2 py-1 text-sm focus:border-accent focus:outline-none"
                      value={draft.phone}
                      onChange={(e) => setDraft((d) => ({ ...d, phone: e.target.value }))}
                    />
                  ) : (
                    s.phone
                  )}
                </td>
                <td className="px-4 py-3">
                  {editingId === s.id ? (
                    <input
                      className="w-full rounded border border-muted bg-background px-2 py-1 text-sm focus:border-accent focus:outline-none"
                      value={draft.email}
                      onChange={(e) => setDraft((d) => ({ ...d, email: e.target.value }))}
                    />
                  ) : (
                    s.email
                  )}
                </td>
                <td className="px-4 py-3">
                  {editingId === s.id ? (
                    <input
                      className="w-full rounded border border-muted bg-background px-2 py-1 text-sm focus:border-accent focus:outline-none"
                      value={draft.catalog}
                      onChange={(e) => setDraft((d) => ({ ...d, catalog: e.target.value }))}
                    />
                  ) : (
                    s.catalog
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  {editingId === s.id ? (
                    <div className="flex justify-end gap-2">
                      <button
                        className="rounded-md border border-muted px-3 py-1 text-xs text-primary hover:bg-muted/20"
                        onClick={cancelEdit}
                        type="button"
                      >
                        Cancel
                      </button>
                      <button
                        className="rounded-md bg-accent px-3 py-1 text-xs font-semibold text-white hover:scale-[1.02]"
                        onClick={saveEdit}
                        type="button"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-end gap-2">
                      <button
                        className="rounded-md border border-muted px-3 py-1 text-xs text-primary hover:bg-muted/20"
                        onClick={() => startEdit(s)}
                        type="button"
                      >
                        Edit
                      </button>
                      <button
                        className="rounded-md border border-danger/40 px-3 py-1 text-xs text-danger hover:bg-danger/10"
                        onClick={() => askDelete(s)}
                        type="button"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {suppliers.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-center text-primary/60" colSpan={5}>
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
