import React from 'react';
import { motion } from 'framer-motion';
import SettingsSection from './components/SettingsSection';
import SettingsPanel from './components/SettingsPanel';
import { settingsSections, permissionLabels } from './data';
import { useSettings } from './hooks/useSettings';

export default function Settings() {
  const { settings, updateSetting, roles, updatePermission, openSection, setOpenSection, summary } = useSettings();

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[28px] border border-[#E9E2EC] bg-white/90 p-6 shadow-[0_24px_70px_-34px_rgba(93,63,88,0.4)]"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#7A7180]">TransitOps</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#2E2331]">Settings</h1>
            <p className="mt-2 max-w-2xl text-sm text-[#6F6873]">Tune the operating environment for your fleet, dispatchers, maintenance teams and finance partners.</p>
          </div>
          <div className="rounded-2xl border border-[#E9E2EC] bg-[#FCFAFD] px-4 py-3 text-sm text-[#4B3348]">
            <p className="font-semibold">Workspace ready</p>
            <p className="mt-1 text-xs text-[#7A7180]">All changes remain local to the current session.</p>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <SettingsSection
            id="general"
            title="General Settings"
            description="Set the core identity and operational defaults for the workspace."
            isOpen={openSection === 'general'}
            onToggle={setOpenSection}
          >
            <SettingsPanel title="Company" description="Define your operating entity and brand context.">
              <label className="flex flex-col gap-2 text-sm font-medium text-[#4B3348]">
                <span>Company</span>
                <input value={settings.company} onChange={(event) => updateSetting('company', event.target.value)} className="rounded-2xl border border-[#E9E2EC] bg-white px-3 py-2.5 text-sm text-[#2E2331] outline-none" />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-[#4B3348]">
                <span>Depot Name</span>
                <input value={settings.depotName} onChange={(event) => updateSetting('depotName', event.target.value)} className="rounded-2xl border border-[#E9E2EC] bg-white px-3 py-2.5 text-sm text-[#2E2331] outline-none" />
              </label>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-medium text-[#4B3348]">
                  <span>Timezone</span>
                  <select value={settings.timezone} onChange={(event) => updateSetting('timezone', event.target.value)} className="rounded-2xl border border-[#E9E2EC] bg-white px-3 py-2.5 text-sm text-[#2E2331] outline-none">
                    <option>UTC+05:30</option>
                    <option>UTC+00:00</option>
                    <option>UTC-05:00</option>
                  </select>
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium text-[#4B3348]">
                  <span>Distance Unit</span>
                  <select value={settings.distanceUnit} onChange={(event) => updateSetting('distanceUnit', event.target.value)} className="rounded-2xl border border-[#E9E2EC] bg-white px-3 py-2.5 text-sm text-[#2E2331] outline-none">
                    <option>km</option>
                    <option>mi</option>
                  </select>
                </label>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-medium text-[#4B3348]">
                  <span>Currency</span>
                  <select value={settings.currency} onChange={(event) => updateSetting('currency', event.target.value)} className="rounded-2xl border border-[#E9E2EC] bg-white px-3 py-2.5 text-sm text-[#2E2331] outline-none">
                    <option>INR</option>
                    <option>USD</option>
                    <option>EUR</option>
                  </select>
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium text-[#4B3348]">
                  <span>Language</span>
                  <select value={settings.language} onChange={(event) => updateSetting('language', event.target.value)} className="rounded-2xl border border-[#E9E2EC] bg-white px-3 py-2.5 text-sm text-[#2E2331] outline-none">
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Spanish</option>
                  </select>
                </label>
              </div>
            </SettingsPanel>
          </SettingsSection>

          <SettingsSection
            id="rbac"
            title="RBAC"
            description="Enable or disable role-specific access across operations."
            isOpen={openSection === 'rbac'}
            onToggle={setOpenSection}
          >
            <SettingsPanel title="Permission matrix" description="Configure permissions for each operational role.">
              <div className="overflow-hidden rounded-2xl border border-[#E9E2EC] bg-white">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-[#F7EFF8] text-[#5D3F58]">
                    <tr>
                      <th className="px-3 py-3 font-semibold">Role</th>
                      {permissionLabels.map((permission) => (
                        <th key={permission.key} className="px-2 py-3 text-center font-semibold">{permission.label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {roles.map((role, roleIndex) => (
                      <tr key={role.role} className="border-t border-[#E9E2EC]">
                        <td className="px-3 py-3 font-medium text-[#2E2331]">{role.role}</td>
                        {permissionLabels.map((permission) => (
                          <td key={permission.key} className="px-2 py-3 text-center">
                            <input
                              type="checkbox"
                              checked={role.permissions[permission.key]}
                              onChange={(event) => updatePermission(roleIndex, permission.key, event.target.checked)}
                              className="h-4 w-4 rounded border-[#DCCFD9] text-[#5D3F58] focus:ring-[#DCCFD9]"
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SettingsPanel>
          </SettingsSection>

          <SettingsSection
            id="appearance"
            title="Appearance"
            description="Adjust the visual language and compactness of the workspace."
            isOpen={openSection === 'appearance'}
            onToggle={setOpenSection}
          >
            <SettingsPanel title="Theme preferences">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-medium text-[#4B3348]">
                  <span>Theme</span>
                  <select value={settings.theme} onChange={(event) => updateSetting('theme', event.target.value)} className="rounded-2xl border border-[#E9E2EC] bg-white px-3 py-2.5 text-sm text-[#2E2331] outline-none">
                    <option>Light</option>
                    <option>Dark</option>
                    <option>System</option>
                  </select>
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium text-[#4B3348]">
                  <span>Primary Color</span>
                  <input type="color" value={settings.primaryColor} onChange={(event) => updateSetting('primaryColor', event.target.value)} className="h-11 w-full rounded-2xl border border-[#E9E2EC] bg-white p-1" />
                </label>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-medium text-[#4B3348]">
                  <span>Accent Color</span>
                  <input type="color" value={settings.accentColor} onChange={(event) => updateSetting('accentColor', event.target.value)} className="h-11 w-full rounded-2xl border border-[#E9E2EC] bg-white p-1" />
                </label>
                <label className="flex items-center justify-between rounded-2xl border border-[#E9E2EC] bg-white px-3 py-3 text-sm font-medium text-[#4B3348]">
                  <span>Compact Mode</span>
                  <input type="checkbox" checked={settings.compactMode} onChange={(event) => updateSetting('compactMode', event.target.checked)} className="h-4 w-4 rounded border-[#DCCFD9] text-[#5D3F58] focus:ring-[#DCCFD9]" />
                </label>
              </div>
            </SettingsPanel>
          </SettingsSection>

          <SettingsSection
            id="notifications"
            title="Notifications"
            description="Choose how the team receives updates and operational alerts."
            isOpen={openSection === 'notifications'}
            onToggle={setOpenSection}
          >
            <SettingsPanel title="Channels">
              <label className="flex items-center justify-between rounded-2xl border border-[#E9E2EC] bg-white px-3 py-3 text-sm font-medium text-[#4B3348]">
                <span>Email</span>
                <input type="checkbox" checked={settings.email} onChange={(event) => updateSetting('email', event.target.checked)} className="h-4 w-4 rounded border-[#DCCFD9] text-[#5D3F58] focus:ring-[#DCCFD9]" />
              </label>
              <label className="flex items-center justify-between rounded-2xl border border-[#E9E2EC] bg-white px-3 py-3 text-sm font-medium text-[#4B3348]">
                <span>SMS</span>
                <input type="checkbox" checked={settings.sms} onChange={(event) => updateSetting('sms', event.target.checked)} className="h-4 w-4 rounded border-[#DCCFD9] text-[#5D3F58] focus:ring-[#DCCFD9]" />
              </label>
              <label className="flex items-center justify-between rounded-2xl border border-[#E9E2EC] bg-white px-3 py-3 text-sm font-medium text-[#4B3348]">
                <span>Push Notifications</span>
                <input type="checkbox" checked={settings.push} onChange={(event) => updateSetting('push', event.target.checked)} className="h-4 w-4 rounded border-[#DCCFD9] text-[#5D3F58] focus:ring-[#DCCFD9]" />
              </label>
            </SettingsPanel>
            <SettingsPanel title="Alerts">
              <label className="flex items-center justify-between rounded-2xl border border-[#E9E2EC] bg-white px-3 py-3 text-sm font-medium text-[#4B3348]">
                <span>Maintenance Alerts</span>
                <input type="checkbox" checked={settings.maintenanceAlerts} onChange={(event) => updateSetting('maintenanceAlerts', event.target.checked)} className="h-4 w-4 rounded border-[#DCCFD9] text-[#5D3F58] focus:ring-[#DCCFD9]" />
              </label>
              <label className="flex items-center justify-between rounded-2xl border border-[#E9E2EC] bg-white px-3 py-3 text-sm font-medium text-[#4B3348]">
                <span>Trip Alerts</span>
                <input type="checkbox" checked={settings.tripAlerts} onChange={(event) => updateSetting('tripAlerts', event.target.checked)} className="h-4 w-4 rounded border-[#DCCFD9] text-[#5D3F58] focus:ring-[#DCCFD9]" />
              </label>
            </SettingsPanel>
          </SettingsSection>

          <SettingsSection
            id="security"
            title="Security"
            description="Protect access and control session behavior."
            isOpen={openSection === 'security'}
            onToggle={setOpenSection}
          >
            <SettingsPanel title="Authentication">
              <label className="flex flex-col gap-2 text-sm font-medium text-[#4B3348]">
                <span>Change Password</span>
                <input type="password" value={settings.password} onChange={(event) => updateSetting('password', event.target.value)} className="rounded-2xl border border-[#E9E2EC] bg-white px-3 py-2.5 text-sm text-[#2E2331] outline-none" placeholder="Enter new password" />
              </label>
              <label className="flex items-center justify-between rounded-2xl border border-[#E9E2EC] bg-white px-3 py-3 text-sm font-medium text-[#4B3348]">
                <span>Two Factor Authentication</span>
                <input type="checkbox" checked={settings.twoFactor} onChange={(event) => updateSetting('twoFactor', event.target.checked)} className="h-4 w-4 rounded border-[#DCCFD9] text-[#5D3F58] focus:ring-[#DCCFD9]" />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-[#4B3348]">
                <span>Session Timeout</span>
                <select value={settings.sessionTimeout} onChange={(event) => updateSetting('sessionTimeout', event.target.value)} className="rounded-2xl border border-[#E9E2EC] bg-white px-3 py-2.5 text-sm text-[#2E2331] outline-none">
                  <option>15 min</option>
                  <option>30 min</option>
                  <option>45 min</option>
                  <option>60 min</option>
                </select>
              </label>
            </SettingsPanel>
          </SettingsSection>

          <SettingsSection
            id="danger"
            title="Danger Zone"
            description="Irreversible workspace actions and resets."
            isOpen={openSection === 'danger'}
            onToggle={setOpenSection}
          >
            <SettingsPanel title="Reset actions">
              <button type="button" className="w-full rounded-2xl border border-[#E9E2EC] bg-white px-3 py-3 text-left text-sm font-semibold text-[#4B3348] transition hover:border-[#DCCFD9]">Reset Application</button>
              <button type="button" className="w-full rounded-2xl border border-[#E9E2EC] bg-white px-3 py-3 text-left text-sm font-semibold text-[#B65055] transition hover:border-[#E7C0C2]">Delete Sample Data</button>
            </SettingsPanel>
          </SettingsSection>
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="rounded-[28px] border border-[#E9E2EC] bg-white/90 p-6 shadow-[0_18px_48px_-30px_rgba(93,63,88,0.24)]">
            <h2 className="text-xl font-semibold text-[#2E2331]">Current configuration</h2>
            <div className="mt-4 space-y-3">
              {summary.map((item) => (
                <div key={item.label} className="rounded-2xl border border-[#E9E2EC] bg-[#FCFAFD] p-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#7A7180]">{item.label}</p>
                  <p className="mt-1 text-sm font-semibold text-[#2E2331]">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
