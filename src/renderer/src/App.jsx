import React, { useEffect, useMemo, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { FiPlus, FiSearch, FiUpload, FiDownload } from 'react-icons/fi';
import Sidebar from './components/Sidebar';
import TopTabs from './components/TopTabs';
import StatCard from './components/StatCard';
import InventoryTable from './components/InventoryTable';
import AddPartModal from './components/AddPartModal';
import ConfirmModal from './components/ConfirmModal';
import Spinner from './components/Spinner';
import SettingsPage from './components/SettingsPage';
import SuppliersPage from './components/SuppliersPage';
import SalesPage from './components/SalesPage';
import ReportsPage from './components/ReportsPage';
import { categories as initialCategories, initialParts, suppliers as initialSuppliers } from './data/seed';
import { loadParts, loadSettings, loadSuppliers, saveParts, saveSettings, saveSuppliers } from './data/storage';
import * as XLSX from 'xlsx';
import './index.css';
import { t } from './i18n';

const fadeIn = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };

const filterParts = (parts, filters) =>
  parts.filter((p) => {
    const bySearch =
      p.name.toLowerCase().includes(filters.search) ||
      p.partNumber.toLowerCase().includes(filters.search) ||
      p.category.toLowerCase().includes(filters.search);
    const byCategory = filters.category === 'all' || p.category === filters.category;
    const bySupplier = filters.supplier === 'all' || p.supplier === filters.supplier;
    const byStock =
      filters.stock === 'all' ||
      (filters.stock === 'low' ? p.quantity <= (p.threshold ?? 10) : p.quantity > (p.threshold ?? 10));
    return bySearch && byCategory && bySupplier && byStock;
  });

const Dashboard = ({ parts, locale }) => {
  const lowStock = parts.filter((p) => p.quantity <= (p.threshold ?? 10));
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <StatCard label={t(locale, 'dashboard.total')} value={parts.length} icon="📦" />
      <StatCard label={t(locale, 'dashboard.low')} value={lowStock.length} icon="⚠️" alert={lowStock.length > 0} />
      <StatCard label={t(locale, 'dashboard.recentSales')} value="—" icon="🧾" />
      <StatCard label={t(locale, 'dashboard.topSuppliers')} value="Brembo, Bosch" icon="🏭" />
    </div>
  );
};

const InventoryPage = ({
  parts,
  setParts,
  filtered,
  filters,
  setFilters,
  showAdd,
  setShowAdd,
  toDelete,
  setToDelete,
  view,
  locale,
  categories,
  setCategories,
  suppliers = [],
  editingId,
  setEditingId,
}) => {
  const safeSuppliers = suppliers.map((s) =>
    typeof s === 'string' ? { id: s, name: s, phone: '', email: '', catalog: '' } : s
  );
  if (view === 'categories') {
    return (
      <div className="space-y-5">
        <div className="card p-5">
          <div className="flex flex-wrap items-center gap-3">
            <input
              id="category-input"
              className="input-field w-64"
              placeholder={t(locale, 'inventory.tabs.categories')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  const val = e.target.value.trim();
                  if (!categories.includes(val)) setCategories((prev) => [...prev, val]);
                  e.target.value = '';
                }
              }}
            />
            <button
              className="btn-primary flex items-center gap-2"
              onClick={() => {
                const input = document.getElementById('category-input');
                const val = input?.value.trim();
                if (val) {
                  if (!categories.includes(val)) setCategories((prev) => [...prev, val]);
                  input.value = '';
                }
              }}
            >
              <FiPlus size={16} /> Add {t(locale, 'inventory.tabs.categories')}
            </button>
            <div className="text-sm text-muted ml-auto">
              {categories.length} {t(locale, 'inventory.tabs.categories').toLowerCase()}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((c) => (
              <div
                key={c}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-accent/10 text-accent border border-accent/20"
              >
                <span>{c}</span>
                <button
                  className="text-xs text-muted hover:text-danger transition-colors"
                  onClick={() => setCategories((prev) => prev.filter((x) => x !== c))}
                  aria-label={`Delete ${c}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const onEdit = (id, key, value) => {
    setParts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        if (['quantity', 'purchasePrice', 'salePrice', 'threshold'].includes(key)) {
          return { ...p, [key]: Number(value) };
        }
        return { ...p, [key]: value };
      })
    );
    toast.success('Saved');
  };

  const onDelete = (part) => setToDelete(part);

  const doDelete = () => {
    setParts((prev) => prev.filter((p) => p.id !== toDelete.id));
    setToDelete(null);
    toast.success('Deleted');
  };

  const exportExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(parts);
    XLSX.utils.book_append_sheet(wb, ws, 'Parts');
    XLSX.writeFile(wb, 'inventory.xlsx');
    toast.success('Exported to Excel');
  };

  const importExcel = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const wb = XLSX.read(data, { type: 'array' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(ws);
      setParts(rows.map((r) => ({ ...r, id: r.id || r.partNumber || crypto.randomUUID() })));
      toast.success('Imported');
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 card px-3 py-2 flex-1 max-w-md">
          <FiSearch className="text-muted" size={16} />
          <input
            className="flex-1 bg-transparent text-sm focus:outline-none"
            placeholder={t(locale, 'inventory.search')}
            value={filters.searchInput}
            onChange={(e) =>
              setFilters((f) => ({ ...f, searchInput: e.target.value, search: e.target.value.toLowerCase() }))
            }
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <select
            className="input-field w-40"
            value={filters.category}
            onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}
          >
            <option value="all">{t(locale, 'inventory.allCategories')}</option>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <select
            className="input-field w-40"
            value={filters.supplier}
            onChange={(e) => setFilters((f) => ({ ...f, supplier: e.target.value }))}
          >
            <option value="all">{t(locale, 'inventory.allSuppliers')}</option>
            {safeSuppliers.map((s) => (
              <option key={s.id} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
          <label className="btn-secondary flex items-center gap-2 cursor-pointer">
            <FiUpload size={16} />
            <span>Import</span>
            <input type="file" accept=".xlsx,.xls" className="hidden" onChange={importExcel} />
          </label>
          <button
            onClick={exportExcel}
            className="btn-secondary flex items-center gap-2"
          >
            <FiDownload size={16} /> Export
          </button>
          <button
            onClick={() => setShowAdd(true)}
            className="btn-primary flex items-center gap-2"
          >
            <FiPlus size={16} /> {t(locale, 'inventory.newPart')}
          </button>
        </div>
      </div>

      <InventoryTable
        parts={filtered}
        onEdit={onEdit}
        onDelete={onDelete}
        t={t}
        locale={locale}
        editingId={editingId}
        setEditingId={setEditingId}
      />

      <AddPartModal
        open={showAdd}
        onClose={() => setShowAdd(false)}
        categories={categories}
        suppliers={safeSuppliers}
        t={t}
        locale={locale}
        onSave={(data) => {
          setParts((prev) => [...prev, { ...data, id: data.partNumber || crypto.randomUUID() }]);
          setShowAdd(false);
          toast.success('Part added');
        }}
      />

      <ConfirmModal
        open={!!toDelete}
        title={t(locale, 'inventory.deleteTitle')}
        message={t(locale, 'inventory.deleteMsg', { name: toDelete?.name || '' })}
        onConfirm={doDelete}
        onCancel={() => setToDelete(null)}
        t={t}
        locale={locale}
      />
    </div>
  );
};

const useKeyboardShortcuts = (handlers) => {
  useEffect(() => {
    const listener = (e) => {
      if (!e.ctrlKey) return;
      if (e.key === 'n') {
        e.preventDefault();
        handlers.new();
      }
      if (e.key === 'f') {
        e.preventDefault();
        handlers.search();
      }
      if (e.key === 's') {
        e.preventDefault();
        handlers.save();
      }
    };
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [handlers]);
};

const AppShell = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [parts, setParts] = useState(initialParts);
  const [filters, setFilters] = useState({
    search: '',
    searchInput: '',
    category: 'all',
    supplier: 'all',
    stock: 'all',
  });
  const [showAdd, setShowAdd] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [prefs, setPrefs] = useState(loadSettings());
  const [categories, setCategories] = useState(initialCategories);
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const saved = loadParts();
    if (saved) setParts(saved);
    const savedSup = loadSuppliers();
    if (savedSup) setSuppliers(savedSup);
    setLoading(false);
  }, []);

  useEffect(() => {
    saveParts(parts);
  }, [parts]);

  useEffect(() => {
    saveSettings(prefs);
  }, [prefs]);

  useEffect(() => {
    saveSuppliers(suppliers);
  }, [suppliers]);

  const view = location.pathname.includes('categories') ? 'categories' : 'all';

  const filtered = useMemo(() => {
    const base = filterParts(parts, filters);
    if (view === 'categories') return base.sort((a, b) => a.category.localeCompare(b.category));
    return base;
  }, [parts, filters, view]);

  useKeyboardShortcuts({
    new: () => setShowAdd(true),
    search: () =>
      document.querySelector(
        'input[placeholder="Search parts (Ctrl+F)"], input[placeholder="Rechercher des pièces (Ctrl+F)"]'
      )?.focus(),
    save: () => {
      saveParts(parts);
      toast.success('Manual save complete');
    },
  });

  if (loading) return <Spinner />;

  const locale = prefs.locale || 'en';
  const animationsEnabled = prefs.animations !== false;
  const padding = prefs.density === 'compact' ? 'p-4' : 'p-6';

  const shell = (
    <>
      <TopTabs base={location.pathname.startsWith('/inventory') ? '/inventory' : null} t={t} locale={locale} />
      <main className={`flex-1 overflow-auto ${padding}`}>
        <AnimatePresence>
          <Routes location={location} key={`${location.pathname}${location.hash}`}>
            <Route
              path="/"
              element={
                <motion.div {...fadeIn}>
                  <Dashboard parts={parts} locale={locale} />
                </motion.div>
              }
            />
            <Route
              path="/inventory"
              element={
                <motion.div {...fadeIn}>
                  <InventoryPage
                    view="all"
                    parts={parts}
                    setParts={setParts}
                    filtered={filtered}
                    filters={filters}
                    setFilters={setFilters}
                    showAdd={showAdd}
                    setShowAdd={setShowAdd}
                    toDelete={toDelete}
                    setToDelete={setToDelete}
                    locale={locale}
                    categories={categories}
                    setCategories={setCategories}
                    editingId={editingId}
                    setEditingId={setEditingId}
                    suppliers={suppliers}
                  />
                </motion.div>
              }
            />
            <Route
              path="/inventory/categories"
              element={
                <motion.div {...fadeIn}>
                  <InventoryPage
                    view="categories"
                    parts={parts}
                    setParts={setParts}
                    filtered={filtered}
                    filters={filters}
                    setFilters={setFilters}
                    showAdd={showAdd}
                    setShowAdd={setShowAdd}
                    toDelete={toDelete}
                    setToDelete={setToDelete}
                    locale={locale}
                    categories={categories}
                    setCategories={setCategories}
                    suppliers={suppliers}
                    editingId={editingId}
                    setEditingId={setEditingId}
                  />
                </motion.div>
              }
            />
            <Route
              path="/settings"
              element={
                <motion.div {...fadeIn}>
                  <SettingsPage prefs={prefs} setPrefs={setPrefs} t={t} locale={locale} />
                </motion.div>
              }
            />
            <Route
              path="/suppliers"
              element={
                <motion.div {...fadeIn}>
                  <SuppliersPage suppliers={suppliers} setSuppliers={setSuppliers} t={t} locale={locale} />
                </motion.div>
              }
            />
            <Route
              path="/reports"
              element={
                <motion.div {...fadeIn}>
                  <ReportsPage animationsEnabled={animationsEnabled} isCompact={prefs.density === 'compact'} />
                </motion.div>
              }
            />
            <Route
              path="/sales"
              element={
                <motion.div {...fadeIn}>
                  <SalesPage parts={parts} isCompact={prefs.density === 'compact'} />
                </motion.div>
              }
            />
            <Route
              path="*"
              element={
                <motion.div {...fadeIn} className="card p-6">
                  <div className="text-base font-semibold text-primary">Coming soon</div>
                  <p className="text-sm text-muted mt-1">
                    Section not implemented yet. Use Inventory and Dashboard for now.
                  </p>
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>
    </>
  );

  if (prefs.sidebarPosition === 'top') {
    return (
      <div className="flex h-screen flex-col bg-background text-primary">
        <Sidebar position="top" locale={locale} t={t} />
        {shell}
        <Toaster position="top-right" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background text-primary">
      <Sidebar position="side" locale={locale} t={t} />
      <div className="flex flex-1 flex-col">{shell}</div>
      <Toaster position="top-right" />
    </div>
  );
};

const App = () => <AppShell />;

export default App;
