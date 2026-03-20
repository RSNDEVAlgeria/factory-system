export const translations = {
  en: {
    appName: 'Invo Parts',
    nav: {
      dashboard: 'Dashboard',
      inventory: 'Inventory',
      purchases: 'Purchases',
      suppliers: 'Suppliers',
      sales: 'Sales',
      reports: 'Reports',
      settings: 'Settings',
    },
    settings: {
      title: 'Settings',
      language: 'Language',
      languageHint: 'Switch between English and French.',
      sidebar: 'Sidebar Position',
      sidebarHint: 'Choose side dock or top bar.',
      side: 'Side (default)',
      top: 'Top',
      english: 'English',
      french: 'Français',
    },
    dashboard: {
      total: 'Total Parts',
      low: 'Low Stock Alerts',
      recentSales: 'Recent Sales (stub)',
      topSuppliers: 'Top Suppliers',
    },
    inventory: {
      search: 'Search parts (Ctrl+F)',
      allCategories: 'All Categories',
      allSuppliers: 'All Suppliers',
      allStock: 'All Stock',
      lowStock: 'Low Stock',
      inStock: 'In Stock',
      import: 'Import',
      export: 'Export',
      newPart: 'New Part (Ctrl+N)',
      columns: {
        partNumber: 'Part Number',
        name: 'Name',
        category: 'Category',
        quantity: 'Quantity',
        purchasePrice: 'Buy Price',
        salePrice: 'Sell Price',
        supplier: 'Supplier',
        location: 'Location',
      },
      tabs: {
        all: 'All Parts',
        categories: 'Categories',
      },
      noParts: 'No parts match the current filters.',
      deleteTitle: 'Delete part',
      deleteMsg: 'Remove {name}? This cannot be undone.',
      addTitle: 'Add New Part',
      fields: {
        partNumber: 'Part Number',
        name: 'Name',
        category: 'Category',
        supplier: 'Supplier',
        quantity: 'Quantity',
        purchasePrice: 'Buy Price',
        salePrice: 'Sell Price',
        threshold: 'Low Stock Threshold',
      },
      cancel: 'Cancel',
      save: 'Save Part',
    },
    misc: {
      offline: 'Offline first · Auto-save',
    },
  },
  fr: {
    appName: 'Invo Pièces',
    nav: {
      dashboard: 'Tableau de bord',
      inventory: 'Stock',
      purchases: 'Achats',
      suppliers: 'Fournisseurs',
      sales: 'Ventes',
      reports: 'Rapports',
      settings: 'Paramètres',
    },
    settings: {
      title: 'Paramètres',
      language: 'Langue',
      languageHint: 'Basculer entre anglais et français.',
      sidebar: 'Position du menu',
      sidebarHint: 'Choisissez menu latéral ou barre en haut.',
      side: 'Latéral (défaut)',
      top: 'Haut',
      english: 'Anglais',
      french: 'Français',
    },
    dashboard: {
      total: 'Pièces totales',
      low: 'Alertes de stock bas',
      recentSales: 'Ventes récentes (brouillon)',
      topSuppliers: 'Meilleurs fournisseurs',
    },
    inventory: {
      search: 'Rechercher des pièces (Ctrl+F)',
      allCategories: 'Toutes les catégories',
      allSuppliers: 'Tous les fournisseurs',
      allStock: 'Tous les stocks',
      lowStock: 'Stock bas',
      inStock: 'En stock',
      import: 'Importer',
      export: 'Exporter',
      newPart: 'Nouvelle pièce (Ctrl+N)',
      columns: {
        partNumber: 'Référence',
        name: 'Nom',
        category: 'Catégorie',
        quantity: 'Quantité',
        purchasePrice: 'Prix d\'achat',
        salePrice: 'Prix de vente',
        supplier: 'Fournisseur',
        location: 'Emplacement',
      },
      tabs: {
        all: 'Toutes les pièces',
        categories: 'Catégories',
      },
      noParts: 'Aucune pièce ne correspond aux filtres.',
      deleteTitle: 'Supprimer la pièce',
      deleteMsg: 'Supprimer {name} ? Cette action est irréversible.',
      addTitle: 'Ajouter une pièce',
      fields: {
        partNumber: 'Référence',
        name: 'Nom',
        category: 'Catégorie',
        supplier: 'Fournisseur',
        quantity: 'Quantité',
        purchasePrice: 'Prix d\'achat',
        salePrice: 'Prix de vente',
        threshold: 'Seuil de stock bas',
      },
      cancel: 'Annuler',
      save: 'Enregistrer',
    },
    misc: {
      offline: 'Mode hors ligne · Sauvegarde auto',
    },
  },
};

export const t = (locale, key, vars = {}) => {
  const segments = key.split('.');
  let node = translations[locale] || translations.en;
  for (const s of segments) {
    node = node?.[s];
    if (!node) break;
  }
  if (typeof node === 'string') {
    return Object.entries(vars).reduce((str, [k, v]) => str.replace(`{${k}}`, v), node);
  }
  return key;
};
