import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { initialDrivers, initialVehicles } from '../data';

const emptyForm = {
  source: '',
  destination: '',
  cargoWeight: '',
  distance: '',
  duration: '',
  vehicleId: '',
  driverId: '',
  dispatchDate: '',
  expectedArrival: '',
  notes: '',
};

export default function TripForm({ onSubmit }) {
  const [form, setForm] = useState(emptyForm);
  const [warning, setWarning] = useState('');

  const availableVehicles = useMemo(
    () => initialVehicles.filter((vehicle) => vehicle.status === 'Available'),
    []
  );
  const availableDrivers = useMemo(
    () => initialDrivers.filter((driver) => driver.status === 'Available'),
    []
  );

  const selectedVehicle = useMemo(
    () => availableVehicles.find((vehicle) => vehicle.id === form.vehicleId) || null,
    [availableVehicles, form.vehicleId]
  );
  const selectedDriver = useMemo(
    () => availableDrivers.find((driver) => driver.id === form.driverId) || null,
    [availableDrivers, form.driverId]
  );

  const cargoTooHeavy = Number(form.cargoWeight) > Number(selectedVehicle?.capacityKg || 0);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.source || !form.destination || !form.dispatchDate || !form.expectedArrival) {
      setWarning('Trip details are incomplete.');
      return;
    }

    if (!selectedDriver) {
      setWarning('Select an available driver before dispatching.');
      return;
    }

    if (!selectedVehicle) {
      setWarning('Select an available vehicle before dispatching.');
      return;
    }

    if (cargoTooHeavy) {
      setWarning('Cargo exceeds the selected vehicle capacity.');
      return;
    }

    onSubmit({
      ...form,
      cargoWeight: Number(form.cargoWeight),
      distance: Number(form.distance),
      vehicleId: selectedVehicle.id,
      vehicleName: selectedVehicle.name,
      driverId: selectedDriver.id,
      driverName: selectedDriver.name,
      status: 'Draft',
    });

    setForm(emptyForm);
    setWarning('');
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="rounded-[28px] border border-[#E9E2EC] bg-white/90 p-6 shadow-[0_18px_48px_-28px_rgba(93,63,88,0.24)]"
    >
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-[#2E2331]">Trip creation form</h2>
          <p className="mt-1 text-sm text-[#6F6873]">
            Dispatch only when the route, vehicle and crew are aligned.
          </p>
        </div>
        <div className="rounded-full border border-[#E9E2EC] bg-[#FCFAFD] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#7A7180]">
          Premium workflow
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-[#7A7180]">Trip Information</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-medium text-[#4B3348]">
                <span>Source</span>
                <input
                  required
                  value={form.source}
                  onChange={(event) => setForm((current) => ({ ...current, source: event.target.value }))}
                  className="rounded-2xl border border-[#E9E2EC] bg-[#FCFAFD] px-3 py-2.5 text-sm text-[#2E2331] outline-none"
                  placeholder="Central Depot"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-[#4B3348]">
                <span>Destination</span>
                <input
                  required
                  value={form.destination}
                  onChange={(event) => setForm((current) => ({ ...current, destination: event.target.value }))}
                  className="rounded-2xl border border-[#E9E2EC] bg-[#FCFAFD] px-3 py-2.5 text-sm text-[#2E2331] outline-none"
                  placeholder="North Hub"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-[#4B3348]">
                <span>Cargo Weight</span>
                <input
                  type="number"
                  value={form.cargoWeight}
                  onChange={(event) => setForm((current) => ({ ...current, cargoWeight: event.target.value }))}
                  className="rounded-2xl border border-[#E9E2EC] bg-[#FCFAFD] px-3 py-2.5 text-sm text-[#2E2331] outline-none"
                  placeholder="500"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-[#4B3348]">
                <span>Distance</span>
                <input
                  type="number"
                  value={form.distance}
                  onChange={(event) => setForm((current) => ({ ...current, distance: event.target.value }))}
                  className="rounded-2xl border border-[#E9E2EC] bg-[#FCFAFD] px-3 py-2.5 text-sm text-[#2E2331] outline-none"
                  placeholder="82"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-[#4B3348]">
                <span>Estimated Duration</span>
                <input
                  value={form.duration}
                  onChange={(event) => setForm((current) => ({ ...current, duration: event.target.value }))}
                  className="rounded-2xl border border-[#E9E2EC] bg-[#FCFAFD] px-3 py-2.5 text-sm text-[#2E2331] outline-none"
                  placeholder="2h 15m"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-[#4B3348]">
                <span>Dispatch Date</span>
                <input
                  type="date"
                  required
                  value={form.dispatchDate}
                  onChange={(event) => setForm((current) => ({ ...current, dispatchDate: event.target.value }))}
                  className="rounded-2xl border border-[#E9E2EC] bg-[#FCFAFD] px-3 py-2.5 text-sm text-[#2E2331] outline-none"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-[#4B3348]">
                <span>Expected Arrival</span>
                <input
                  type="datetime-local"
                  required
                  value={form.expectedArrival}
                  onChange={(event) => setForm((current) => ({ ...current, expectedArrival: event.target.value }))}
                  className="rounded-2xl border border-[#E9E2EC] bg-[#FCFAFD] px-3 py-2.5 text-sm text-[#2E2331] outline-none"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-[#7A7180]">Assignment</h3>
            <div className="mt-4 space-y-4">
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
                      {vehicle.name} · {vehicle.capacityKg} kg
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-[#4B3348]">
                <span>Driver</span>
                <select
                  value={form.driverId}
                  onChange={(event) => setForm((current) => ({ ...current, driverId: event.target.value }))}
                  className="rounded-2xl border border-[#E9E2EC] bg-[#FCFAFD] px-3 py-2.5 text-sm text-[#2E2331] outline-none"
                >
                  <option value="">Select driver</option>
                  {availableDrivers.map((driver) => (
                    <option key={driver.id} value={driver.id}>
                      {driver.name} · {driver.specialization}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-[#4B3348]">
                <span>Notes</span>
                <textarea
                  rows={4}
                  value={form.notes}
                  onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))}
                  className="rounded-2xl border border-[#E9E2EC] bg-[#FCFAFD] px-3 py-2.5 text-sm text-[#2E2331] outline-none"
                  placeholder="Add delivery context or special handling."
                />
              </label>
            </div>
          </div>

          {warning ? (
            <div className="rounded-2xl border border-[#EED8D9] bg-[#FEF5F5] p-3 text-sm text-[#9C474A]">
              <div className="flex items-start gap-2">
                <AlertTriangle size={16} className="mt-0.5 shrink-0" />
                <span>{warning}</span>
              </div>
            </div>
          ) : null}

          {cargoTooHeavy && selectedVehicle ? (
            <div className="rounded-2xl border border-[#F1E6CE] bg-[#FFF9EC] p-3 text-sm text-[#9A6B1C]">
              The selected vehicle handles {selectedVehicle.capacityKg} kg, so this trip is over capacity.
            </div>
          ) : null}

          <button
            type="submit"
            className={`w-full rounded-2xl px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 ${
              cargoTooHeavy ? 'cursor-not-allowed bg-[#C6B2C0]' : 'bg-gradient-to-r from-[#5D3F58] to-[#4B3348] hover:-translate-y-0.5'
            }`}
            disabled={cargoTooHeavy}
          >
            {cargoTooHeavy ? 'Dispatch Disabled' : 'Dispatch Trip'}
          </button>
        </div>
      </div>
    </motion.form>
  );
}
