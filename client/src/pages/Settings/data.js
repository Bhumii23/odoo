export const settingsSections = [
  {
    id: 'general',
    title: 'General Settings',
    description: 'Company identity, operational defaults, and localization.',
  },
  {
    id: 'rbac',
    title: 'RBAC',
    description: 'Control role-based access and permission scopes.',
  },
  {
    id: 'appearance',
    title: 'Appearance',
    description: 'Visual preferences and workspace presentation.',
  },
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'Channel setup and operational alert preferences.',
  },
  {
    id: 'security',
    title: 'Security',
    description: 'Account protection, session controls, and password updates.',
  },
  {
    id: 'danger',
    title: 'Danger Zone',
    description: 'Reset actions and data removal controls.',
  },
];

export const rolePermissions = [
  {
    role: 'Fleet Manager',
    permissions: {
      viewFleet: true,
      manageVehicles: true,
      scheduleTrips: true,
      approveMaintenance: true,
      viewFinances: false,
    },
  },
  {
    role: 'Dispatcher',
    permissions: {
      viewFleet: true,
      manageVehicles: false,
      scheduleTrips: true,
      approveMaintenance: false,
      viewFinances: false,
    },
  },
  {
    role: 'Safety Officer',
    permissions: {
      viewFleet: true,
      manageVehicles: false,
      scheduleTrips: false,
      approveMaintenance: true,
      viewFinances: false,
    },
  },
  {
    role: 'Financial Analyst',
    permissions: {
      viewFleet: false,
      manageVehicles: false,
      scheduleTrips: false,
      approveMaintenance: false,
      viewFinances: true,
    },
  },
];

export const permissionLabels = [
  { key: 'viewFleet', label: 'View fleet' },
  { key: 'manageVehicles', label: 'Manage vehicles' },
  { key: 'scheduleTrips', label: 'Schedule trips' },
  { key: 'approveMaintenance', label: 'Approve maintenance' },
  { key: 'viewFinances', label: 'View finances' },
];
