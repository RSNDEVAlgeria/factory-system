import React, { useMemo, useState, useRef } from 'react';

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
    <div className="space-y-4">
      <div className={`rounded-md border border-muted bg-surface ${isCompact ? 'p-4' : 'p-6'} shadow-card`}>
        <div className="text-lg font-semibold text-primary mb-3">Record a Sale</div>
        <form onSubmit={addSale} className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <input
              className="w-full rounded-md border border-muted bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none"
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
              <div className="absolute z-20 mt-1 w-full max-h-48 overflow-auto rounded-md border border-muted bg-background shadow-card">
                {suggestions
                  .filter((s) => s.label.toLowerCase().includes(form.item.toLowerCase()))
                  .map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      className="block w-full px-3 py-2 text-left text-sm hover:bg-accent/10"
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
          <input
            type="number"
            min="0"
            step="0.01"
            className="rounded-md border border-muted bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
          />
          <input
            type="number"
            min="1"
            className="rounded-md border border-muted bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none"
            placeholder="Quantity"
            value={form.qty}
            onChange={(e) => setForm((f) => ({ ...f, qty: e.target.value }))}
          />
          <label className="flex items-center gap-2 text-sm text-primary">
            <input
              type="checkbox"
              checked={form.payLater}
              onChange={(e) => setForm((f) => ({ ...f, payLater: e.target.checked }))}
            />
            Pay later
          </label>
          <div className="md:col-span-2 lg:col-span-4 flex justify-end">
            <button
              type="submit"
              className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white shadow-card transition hover:scale-[1.02]"
            >
              Save Sale
            </button>
          </div>
        </form>
      </div>

      <div className={`rounded-md border border-muted bg-surface ${isCompact ? 'p-3' : 'p-4'} shadow-card flex flex-wrap gap-4 text-sm`}>
        <div>Total: {total.toFixed(2)}</div>
        <div>Pending (pay later): {receivable.toFixed(2)}</div>
        <div>Count: {sales.length}</div>
      </div>

      <div className="overflow-hidden rounded-md border border-muted bg-surface shadow-card">
        <table className="min-w-full divide-y divide-muted/60 text-sm">
          <thead className="bg-background text-left text-xs font-semibold uppercase text-primary/70">
            <tr>
              <th className="px-4 py-3">Item</th>
              <th className="px-4 py-3">Qty</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Pay Later</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-muted/50">
            {sales.map((s, idx) => (
              <tr key={s.id} className={idx % 2 === 0 ? 'bg-background' : 'bg-surface'}>
                <td className="px-4 py-3">{s.item}</td>
                <td className="px-4 py-3">{s.qty}</td>
                <td className="px-4 py-3">{s.price.toFixed(2)}</td>
                <td className="px-4 py-3">{(s.price * s.qty).toFixed(2)}</td>
                <td className="px-4 py-3">{s.payLater ? 'Yes' : 'No'}</td>
                <td className="px-4 py-3">{new Date(s.date).toLocaleString()}</td>
              </tr>
            ))}
            {sales.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-center text-primary/60" colSpan={6}>
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
