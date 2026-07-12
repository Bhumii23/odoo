import { useMemo, useState } from 'react';
import { rolePermissions } from '../data';

export function useSettings() {
  const [settings, setSettings] = useState({
    company: 'TransitOps Logistics',
    depotName: 'North Hub',
    timezone: 'UTC+05:30',
    distanceUnit: 'km',
    currency: 'INR',
    language: 'English',
    theme: 'Light',
    primaryColor: '#5D3F58',
    accentColor: '#DCCFD9',
    compactMode: false,
    email: true,
    sms: false,
    push: true,
    maintenanceAlerts: true,
    tripAlerts: true,
    password: '',
    twoFactor: true,
    sessionTimeout: '45 min',
  });

  const [roles, setRoles] = useState(rolePermissions);
  const [openSection, setOpenSection] = useState('general');

  const summary = useMemo(() => [
    { label: 'Workspace', value: settings.company },
    { label: 'Depot', value: settings.depotName },
    { label: 'Theme', value: settings.theme },
    { label: 'Alerts', value: [settings.email ? 'Email' : null, settings.sms ? 'SMS' : null, settings.push ? 'Push' : null].filter(Boolean).join(', ') || 'Off' },
  ], [settings]);

  const updateSetting = (key, value) => {
    setSettings((current) => ({ ...current, [key]: value }));
  };

  const updatePermission = (roleIndex, permissionKey, value) => {
    setRoles((current) => current.map((role, index) => (index === roleIndex ? { ...role, permissions: { ...role.permissions, [permissionKey]: value } } : role)));
  };

  return {
    settings,
    updateSetting,
    roles,
    updatePermission,
    openSection,
    setOpenSection,
    summary,
  };
}
