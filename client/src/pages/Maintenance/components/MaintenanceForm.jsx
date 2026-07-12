import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { mechanics, priorities, serviceTypeOptions, workshops } from '../data';

const emptyForm = {
  vehicleId: '',
  serviceType: '',
  workshop: '',
  mechanic: '',
  scheduledDate: '',
  estimatedCost: '',
  priority: 'Medium',
  description: '',
};

export default function MaintenanceForm({ vehicles, onSubmit }) {
  const [form, setForm] = useState(emptyForm);
  const [warning, setWarning] = useState('');

  const availableVehicles = useMemo(
    () => vehicles.filter((vehicle) => vehicle.status === 'AVAILABLE' || vehicle.status === 'Available'),
    [vehicles]
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.vehicleId || !form.serviceType || !form.workshop || !form.mechanic || !form.scheduledDate || !form.estimatedCost) {
      setWarning('Complete the maintenance form before scheduling.');
      return;
    }

    const selectedVehicle = availableVehicles.find((vehicle) => vehicle.id === form.vehicleId);
    if (!selectedVehicle) {
      setWarning('Select a vehicle that is currently available for service.');
      return;
    }

    onSubmit({
      vehicleId: selectedVehicle.id,
      vehicleName: selectedVehicle.name,
      serviceType: form.serviceType,
      workshop: form.workshop,
      mechanic: form.mechanic,
      scheduledDate: form.scheduledDate,
      estimatedCost: Number(form.estimatedCost),
      priority: form.priority,
      description: form.description,
    });

    setForm(emptyForm);
    setWarning('');
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="rounded-[28px] border border-[#E9E2EC] bg-white/90 p-6 shadow-[0_18px_48px_-30px_rgba(93,63,88,0.24)]"
    >
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-[#2E2331]">Service scheduling</h2>
          <p className="mt-1 text-sm text-[#6F6873]">Place a vehicle into service and preserve a full repair history.</p>
        </div>
        <div className="rounded-full border border-[#E9E2EC] bg-[#FCFAFD] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#7A7180]">
          Operational control
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <label className="flex flex-col gap-2 text-sm font-medium text-[#4B3348]">
          <span>Vehicle</span>
          <select
            value={form.vehicleId}
            onChange={(event) => setForm((current) => ({ ...current, vehicleId: event.target.value }))}
            className="rounded-2xl border border-[#E9E2EC] bg-[#FCFAFD] px-3 py-2.5 text-sm text-[#2E2331] outline-none"
          >
            <option value="">Select vehicle</option>
            {availableVehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.name} · {vehicle.type}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-[#4B3348]">
          <span>Service Type</span>
          <select
            value={form.serviceType}
            onChange={(event) => setForm((current) => ({ ...current, serviceType: event.target.value }))}
            className="rounded-2xl border border-[#E9E2EC] bg-[#FCFAFD] px-3 py-2.5 text-sm text-[#2E2331] outline-none"
          >
            <option value="">Select service</option>
            {serviceTypeOptions.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-[#4B3348]">
          <span>Workshop</span>
          <select
            value={form.workshop}
            onChange={(event) => setForm((current) => ({ ...current, workshop: event.target.value }))}
            className="rounded-2xl border border-[#E9E2EC] bg-[#FCFAFD] px-3 py-2.5 text-sm text-[#2E2331] outline-none"
          >
            <option value="">Select workshop</option>
            {workshops.map((workshop) => (
              <option key={workshop} value={workshop}>
                {workshop}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-[#4B3348]">
          <span>Mechanic</span>
          <select
            value={form.mechanic}
            onChange={(event) => setForm((current) => ({ ...current, mechanic: event.target.value }))}
            className="rounded-2xl border border-[#E9E2EC] bg-[#FCFAFD] px-3 py-2.5 text-sm text-[#2E2331] outline-none"
          >
            <option value="">Select mechanic</option>
            {mechanics.map((mechanic) => (
              <option key={mechanic} value={mechanic}>
                {mechanic}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-[#4B3348]">
          <span>Date</span>
          <input
            type="date"
            value={form.scheduledDate}
            onChange={(event) => setForm((current) => ({ ...current, scheduledDate: event.target.value }))}
            className="rounded-2xl border border-[#E9E2EC] bg-[#FCFAFD] px-3 py-2.5 text-sm text-[#2E2331] outline-none"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-[#4B3348]">
          <span>Estimated Cost</span>
          <input
            type="number"
            value={form.estimatedCost}
            onChange={(event) => setForm((current) => ({ ...current, estimatedCost: event.target.value }))}
            className="rounded-2xl border border-[#E9E2EC] bg-[#FCFAFD] px-3 py-2.5 text-sm text-[#2E2331] outline-none"
            placeholder="4200"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-[#4B3348]">
          <span>Priority</span>
          <select
            value={form.priority}
            onChange={(event) => setForm((current) => ({ ...current, priority: event.target.value }))}
            className="rounded-2xl border border-[#E9E2EC] bg-[#FCFAFD] px-3 py-2.5 text-sm text-[#2E2331] outline-none"
          >
            {priorities.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-[#4B3348] md:col-span-2 xl:col-span-3">
          <span>Description</span>
          <textarea
            rows={4}
            value={form.description}
            onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
            className="rounded-2xl border border-[#E9E2EC] bg-[#FCFAFD] px-3 py-2.5 text-sm text-[#2E2331] outline-none"
            placeholder="Add inspection context or repair notes."
          />
        </label>
      </div>

      {warning ? (
        <div className="mt-6 rounded-2xl border border-[#EED8D9] bg-[#FEF5F5] p-3 text-sm text-[#9C474A]">
          <div className="flex items-start gap-2">
            <AlertTriangle size={16} className="mt-0.5 shrink-0" />
            <span>{warning}</span>
          </div>
        </div>
      ) : null}

      <button
        type="submit"
        className="mt-6 w-full rounded-2xl bg-gradient-to-r from-[#5D3F58] to-[#4B3348] px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
      >
        Schedule Service
      </button>
    </motion.form>
  );
}
