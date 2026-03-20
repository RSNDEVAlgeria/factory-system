const STORAGE_KEY = 'invo.parts';
const SETTINGS_KEY = 'invo.settings';
const SUPPLIERS_KEY = 'invo.suppliers';

export const loadParts = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error('Failed to parse saved parts', e);
    return null;
  }
};

export const saveParts = (parts) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parts));
  } catch (e) {
    console.error('Failed to persist parts', e);
  }
};

const defaultSettings = {
  sidebarPosition: 'side',
  locale: 'en',
};

export const loadSettings = () => {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? { ...defaultSettings, ...JSON.parse(raw) } : defaultSettings;
  } catch (e) {
    console.error('Failed to load settings', e);
    return defaultSettings;
  }
};

export const saveSettings = (settings) => {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to persist settings', e);
  }
};

export const loadSuppliers = () => {
  try {
    const raw = localStorage.getItem(SUPPLIERS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error('Failed to load suppliers', e);
    return null;
  }
};

export const saveSuppliers = (data) => {
  try {
    localStorage.setItem(SUPPLIERS_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to persist suppliers', e);
  }
};
