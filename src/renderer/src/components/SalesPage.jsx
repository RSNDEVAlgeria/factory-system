import React, { useMemo, useState, useRef } from 'react';
import { FiPlus } from 'react-icons/fi';

const empty = { partId: '', item: '', price: '', qty: 1, payLater: false };

const SalesPage = ({ parts, isCompact = false }) => {
  const [form, setForm] = useState(empty);
  const [sales, setSales] = useState([]);
  const [openList, setOpenList] = useState(false);
  const blurTimeout = useRef(null);
  const suggestions = useMemo(
    () => parts.map((p) => ({ id: p.id, label: `${p.partNumber} — ${p.name}`, price: p.salePrice })),
    [parts]
  );

  const addSale = (e) => {
    e.preventDefault();
    if (!form.item.trim()) return;
    const record = {
      id: crypto.randomUUID(),
      ...form,
      qty: Number(form.qty) || 1,
      price: Number(form.price) || 0,
      date: new Date().toISOString(),
    };
    setSales((prev) => [record, ...prev]);
    setForm(empty);
  };

  const total = sales.reduce((sum, s) => sum + s.price * s.qty, 0);
  const receivable = sales.filter((s) => s.payLater).reduce((sum, s) => sum + s.price * s.qty, 0);

  return (
    <div className="space-y-5">
      <div className="card p-5">
        <div className="text-sm font-semibold text-primary mb-4">Record a Sale</div>
        <form onSubmit={addSale} className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2 relative">
            <input
              className="input-field"
              placeholder="What was sold? (type to search inventory)"
              value={form.item}
              onFocus={() => setOpenList(true)}
              onBlur={() => {
                blurTimeout.current = setTimeout(() => setOpenList(false), 120);
              }}
              onChange={(e) => {
                const val = e.target.value;
                setForm((f) => ({ ...f, item: val }));
                setOpenList(true);
              }}
            />
            {openList && form.item.trim() ? (
              <div className="absolute z-20 mt-1 w-full max-h-48 overflow-auto bg-surface rounded border border-border shadow-elevated">
                {suggestions
                  .filter((s) => s.label.toLowerCase().includes(form.item.toLowerCase()))
                  .map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      className="block w-full px-3 py-2 text-left text-sm text-primary hover:bg-accent/10 transition-colors"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        const part = parts.find((p) => p.id === s.id);
                        setForm((f) => ({
                          ...f,
                          partId: s.id,
                          item: s.label,
                          price: part?.salePrice ?? f.price,
                        }));
                        setOpenList(false);
                      }}
                    >
                      {s.label}
                    </button>
                  ))}
              </div>
            ) : null}
          </div>
          <div>
            <input
              type="number"
              min="0"
              step="0.01"
              className="input-field"
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
            />
          </div>
          <div>
            <input
              type="number"
              min="1"
              className="input-field"
              placeholder="Quantity"
              value={form.qty}
              onChange={(e) => setForm((f) => ({ ...f, qty: e.target.value }))}
            />
          </div>
          <div className="flex items-center">
            <label className="flex items-center gap-2 text-sm text-primary cursor-pointer">
              <input
                type="checkbox"
                checked={form.payLater}
                onChange={(e) => setForm((f) => ({ ...f, payLater: e.target.checked }))}
                className="w-4 h-4 rounded border-border text-accent focus:ring-accent/20"
              />
              Pay later
            </label>
          </div>
          <div className="md:col-span-2 lg:col-span-5 flex justify-end">
            <button
              type="submit"
              className="btn-primary flex items-center gap-2"
            >
              <FiPlus size={16} /> Save Sale
            </button>
          </div>
        </form>
      </div>

      <div className="card p-4 flex flex-wrap gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-muted">Total:</span>
          <span className="font-semibold text-primary">${total.toFixed(2)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted">Pending (pay later):</span>
          <span className="font-semibold text-warning">${receivable.toFixed(2)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted">Count:</span>
          <span className="font-semibold text-primary">{sales.length}</span>
        </div>
      </div>

      <div className="card overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase text-muted tracking-wider">
            <tr className="border-b border-border">
              <th className="px-4 py-3">Item</th>
              <th className="px-4 py-3">Qty</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sales.map((s, idx) => (
              <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-4 py-3 text-primary font-medium">{s.item}</td>
                <td className="px-4 py-3 text-muted">{s.qty}</td>
                <td className="px-4 py-3 text-muted">${s.price.toFixed(2)}</td>
                <td className="px-4 py-3 text-primary font-medium">${(s.price * s.qty).toFixed(2)}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    s.payLater ? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'
                  }`}>
                    {s.payLater ? 'Pending' : 'Paid'}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted text-xs">{new Date(s.date).toLocaleString()}</td>
              </tr>
            ))}
            {sales.length === 0 ? (
              <tr>
                <td className="px-4 py-8 text-center text-muted" colSpan={6}>
                  No sales recorded.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesPage;
