import React from 'react';

const SettingsPage = ({ prefs, setPrefs, t, locale }) => {
  const update = (key, value) => setPrefs((p) => ({ ...p, [key]: value }));

  return (
    <div className="space-y-6 rounded-md border border-muted bg-surface p-6 shadow-card">
      <div>
        <h2 className="text-lg font-semibold text-primary">{t(locale, 'settings.language')}</h2>
        <p className="text-sm text-primary/70">{t(locale, 'settings.languageHint')}</p>
        <div className="mt-3 flex gap-3">
          {[
            { id: 'en', label: t(locale, 'settings.english') },
            { id: 'fr', label: t(locale, 'settings.french') },
          ].map((opt) => (
            <label
              key={opt.id}
              className={`flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 ${
                prefs.locale === opt.id ? 'border-accent text-accent' : 'border-muted text-primary'
              }`}
            >
              <input
                type="radio"
                name="locale"
                value={opt.id}
                checked={prefs.locale === opt.id}
                onChange={() => update('locale', opt.id)}
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-primary">{t(locale, 'settings.sidebar')}</h2>
        <p className="text-sm text-primary/70">{t(locale, 'settings.sidebarHint')}</p>
        <div className="mt-3 flex gap-3">
          {[
            { id: 'side', label: t(locale, 'settings.side') },
            { id: 'top', label: t(locale, 'settings.top') },
          ].map((opt) => (
            <label
              key={opt.id}
              className={`flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 ${
                prefs.sidebarPosition === opt.id ? 'border-accent text-accent' : 'border-muted text-primary'
              }`}
            >
              <input
                type="radio"
                name="sidebarPosition"
                value={opt.id}
                checked={prefs.sidebarPosition === opt.id}
                onChange={() => update('sidebarPosition', opt.id)}
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-md border border-muted bg-background p-4 shadow-card">
          <div className="text-sm font-semibold text-primary mb-2">Animations</div>
          <label className="flex items-center gap-2 text-sm text-primary/80">
            <input
              type="checkbox"
              checked={prefs.animations !== false}
              onChange={(e) => update('animations', e.target.checked)}
            />
            Enable subtle animations
          </label>
        </div>

        <div className="rounded-md border border-muted bg-background p-4 shadow-card">
          <div className="text-sm font-semibold text-primary mb-2">Density</div>
          <div className="flex gap-3">
            {[
              { id: 'cozy', label: 'Cozy' },
              { id: 'compact', label: 'Compact' },
            ].map((opt) => (
              <label
                key={opt.id}
                className={`flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 ${
                  prefs.density === opt.id ? 'border-accent text-accent' : 'border-muted text-primary'
                }`}
              >
                <input
                  type="radio"
                  name="density"
                  value={opt.id}
                  checked={prefs.density === opt.id}
                  onChange={() => update('density', opt.id)}
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-md border border-muted bg-background p-4 shadow-card">
        <div className="text-sm font-semibold text-primary mb-2">Data</div>
        <div className="flex gap-3">
          <button
            className="rounded-md border border-muted px-3 py-2 text-sm text-primary hover:border-accent"
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            Reset local data
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
