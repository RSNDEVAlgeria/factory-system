import React from 'react';
import { FiGlobe, FiLayout, FiActivity, FiGrid, FiDatabase } from 'react-icons/fi';

const SettingsPage = ({ prefs, setPrefs, t, locale }) => {
  const update = (key, value) => setPrefs((p) => ({ ...p, [key]: value }));

  return (
    <div className="space-y-5 max-w-3xl">
      <div className="card p-5">
        <h2 className="text-base font-semibold text-primary">Application Settings</h2>
        <p className="text-sm text-muted mt-1">Customize your experience</p>
      </div>

      <div className="card p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-accent/10">
            <FiGlobe size={18} className="text-accent" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-primary">{t(locale, 'settings.language')}</h3>
            <p className="text-xs text-muted">{t(locale, 'settings.languageHint')}</p>
          </div>
        </div>
        <div className="flex gap-3 ml-10">
          {[
            { id: 'en', label: t(locale, 'settings.english') },
            { id: 'fr', label: t(locale, 'settings.french') },
          ].map((opt) => (
            <label
              key={opt.id}
              className={`flex items-center gap-2 px-4 py-2 rounded cursor-pointer border transition-all ${
                prefs.locale === opt.id 
                  ? 'border-accent bg-accent/5 text-accent' 
                  : 'border-border text-muted hover:border-slate-300 hover:text-primary'
              }`}
            >
              <input
                type="radio"
                name="locale"
                value={opt.id}
                checked={prefs.locale === opt.id}
                onChange={() => update('locale', opt.id)}
                className="sr-only"
              />
              <span className="text-sm font-medium">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="card p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-accent/10">
            <FiLayout size={18} className="text-accent" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-primary">{t(locale, 'settings.sidebar')}</h3>
            <p className="text-xs text-muted">{t(locale, 'settings.sidebarHint')}</p>
          </div>
        </div>
        <div className="flex gap-3 ml-10">
          {[
            { id: 'side', label: t(locale, 'settings.side') },
            { id: 'top', label: t(locale, 'settings.top') },
          ].map((opt) => (
            <label
              key={opt.id}
              className={`flex items-center gap-2 px-4 py-2 rounded cursor-pointer border transition-all ${
                prefs.sidebarPosition === opt.id 
                  ? 'border-accent bg-accent/5 text-accent' 
                  : 'border-border text-muted hover:border-slate-300 hover:text-primary'
              }`}
            >
              <input
                type="radio"
                name="sidebarPosition"
                value={opt.id}
                checked={prefs.sidebarPosition === opt.id}
                onChange={() => update('sidebarPosition', opt.id)}
                className="sr-only"
              />
              <span className="text-sm font-medium">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="card p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-accent/10">
              <FiActivity size={18} className="text-accent" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-primary">Animations</h3>
            </div>
          </div>
          <div className="ml-10">
            <label className="flex items-center gap-3 cursor-pointer">
              <div className={`relative w-10 h-5 rounded-full transition-colors ${prefs.animations !== false ? 'bg-accent' : 'bg-slate-200'}`}>
                <input
                  type="checkbox"
                  checked={prefs.animations !== false}
                  onChange={(e) => update('animations', e.target.checked)}
                  className="sr-only"
                />
                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${prefs.animations !== false ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </div>
              <span className="text-sm text-muted">Enable subtle animations</span>
            </label>
          </div>
        </div>

        <div className="card p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-accent/10">
              <FiGrid size={18} className="text-accent" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-primary">Density</h3>
            </div>
          </div>
          <div className="ml-10 flex gap-3">
            {[
              { id: 'cozy', label: 'Cozy' },
              { id: 'compact', label: 'Compact' },
            ].map((opt) => (
              <label
                key={opt.id}
                className={`flex items-center gap-2 px-4 py-2 rounded cursor-pointer border transition-all ${
                  prefs.density === opt.id 
                    ? 'border-accent bg-accent/5 text-accent' 
                    : 'border-border text-muted hover:border-slate-300 hover:text-primary'
                }`}
              >
                <input
                  type="radio"
                  name="density"
                  value={opt.id}
                  checked={prefs.density === opt.id}
                  onChange={() => update('density', opt.id)}
                  className="sr-only"
                />
                <span className="text-sm font-medium">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="card p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-danger/10">
            <FiDatabase size={18} className="text-danger" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-primary">Data Management</h3>
            <p className="text-xs text-muted">Manage your local storage</p>
          </div>
        </div>
        <div className="ml-10">
          <button
            className="px-4 py-2 text-sm font-medium text-danger border border-danger/30 rounded hover:bg-danger/10 transition-colors"
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            Reset all local data
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
