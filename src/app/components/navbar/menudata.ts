export let myMenu: Object[] = [
  {
    key: 0,
    name: 'Dashboard',
    link: 'localhost',
    rounte: 'dashboard',
    icon: 'dashboard',
    expand: false,
    permission: 'CANDISABLEUSER',
    children: []
  },
  {
    key: 1,
    name: 'Teller',
    link: 'localhost',
    rounte: '',
    icon: 'teller',
    expand: true,
    permission: 'CANFETCHTELLERS',
    children: [
      {
        key: 1,
        name: 'Add Teller',
        link: 'localhost',
        rounte: 'infinity-add-teller',
        icon: 'dropdown',
        expand: false,
        permission: 'CANASSIGNTELLER',
        children: []
      },
      {
        key: 2,
        name: 'Manage Teller ',
        link: 'localhost',
        rounte: 'infinity-manage-teller',
        icon: 'dropdown',
        expand: false,
        permission: 'CANEDITTELLER',
        children: []
      }
    ]
  },
  {
    key: 3,
    name: 'Transactions',
    link: 'localhost',
    rounte: '',
    icon: 'transaction  ',
    expand: true,
    permission: true,
    children: [
      {
        key: 1,
        name: 'Validate Transaction',
        link: 'validate-transaction',
        rounte: 'add-teller',
        icon: 'dropdown',
        expand: false,
        permission: true,
        children: []
      },
      {
        key: 2,
        name: 'Confirm Transaction',
        link: 'localhost',
        rounte: 'confirm-transaction',
        icon: 'dropdown',
        expand: false,
        permission: false,
        children: []
      },
      {
        key: 3,
        name: 'Transaction History',
        link: 'localhost',
        rounte: 'transaction-history',
        icon: 'dropdown',
        expand: false,
        permission: true,
        children: []
      }
    ]
  },
  {
    key: 4,
    name: 'Report',
    link: 'localhost',
    rounte: '',
    icon: 'report',
    expand: true,
    permission: true,
    children: [
      {
        key: 1,
        name: 'Audit Report',
        link: 'localhost',
        rounte: 'audit-report',
        icon: 'dropdown',
        expand: false,
        permission: true,
        children: []
      },
      {
        key: 2,
        name: 'Export Excel ',
        link: 'localhost',
        rounte: 'export-excel',
        icon: 'dropdown',
        expand: false,
        permission: true,
        children: []
      }
    ]
  },
  {
    key: 0,
    name: 'Settings',
    link: 'localhost',
    rounte: 'dashboard',
    icon: 'settings',
    expand: false,
    permission: true,
    children: []
  },
];