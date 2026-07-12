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
      className="rounded-[20px] border border-slate-100 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.012)]"
    >
      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="text-left">
          <h2 className="text-base font-bold tracking-tight text-slate-800">Trip Creation Form</h2>
          <p className="mt-1 text-xs text-slate-500 font-semibold leading-relaxed">
            Dispatch only when the route, vehicle and crew are aligned.
          </p>
        </div>
        <div className="rounded-lg border border-slate-100 bg-slate-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">
          Premium workflow
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5">
          <div className="text-left">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Trip Information</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-1.5 text-xs font-bold text-slate-600">
                <span>Source</span>
                <input
                  required
                  value={form.source}
                  onChange={(event) => setForm((current) => ({ ...current, source: event.target.value }))}
                  className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-xs text-slate-700 outline-none transition focus:border-purple-300 focus:bg-white font-semibold"
                  placeholder="Central Depot"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-xs font-bold text-slate-600">
                <span>Destination</span>
                <input
                  required
                  value={form.destination}
                  onChange={(event) => setForm((current) => ({ ...current, destination: event.target.value }))}
                  className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-xs text-slate-700 outline-none transition focus:border-purple-300 focus:bg-white font-semibold"
                  placeholder="North Hub"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-xs font-bold text-slate-600">
                <span>Cargo Weight (kg)</span>
                <input
                  type="number"
                  value={form.cargoWeight}
                  onChange={(event) => setForm((current) => ({ ...current, cargoWeight: event.target.value }))}
                  className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-xs text-slate-700 outline-none transition focus:border-purple-300 focus:bg-white font-semibold"
                  placeholder="500"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-xs font-bold text-slate-600">
                <span>Distance (km)</span>
                <input
                  type="number"
                  value={form.distance}
                  onChange={(event) => setForm((current) => ({ ...current, distance: event.target.value }))}
                  className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-xs text-slate-700 outline-none transition focus:border-purple-300 focus:bg-white font-semibold"
                  placeholder="82"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-xs font-bold text-slate-600">
                <span>Estimated Duration</span>
                <input
                  value={form.duration}
                  onChange={(event) => setForm((current) => ({ ...current, duration: event.target.value }))}
                  className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-xs text-slate-700 outline-none transition focus:border-purple-300 focus:bg-white font-semibold"
                  placeholder="2h 15m"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-xs font-bold text-slate-600">
                <span>Dispatch Date</span>
                <input
                  type="date"
                  required
                  value={form.dispatchDate}
                  onChange={(event) => setForm((current) => ({ ...current, dispatchDate: event.target.value }))}
                  className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-xs text-slate-700 outline-none transition focus:border-purple-300 focus:bg-white cursor-pointer font-semibold"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-xs font-bold text-slate-600 col-span-2">
                <span>Expected Arrival</span>
                <input
                  type="datetime-local"
                  required
                  value={form.expectedArrival}
                  onChange={(event) => setForm((current) => ({ ...current, expectedArrival: event.target.value }))}
                  className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-xs text-slate-700 outline-none transition focus:border-purple-300 focus:bg-white cursor-pointer font-semibold"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-5 text-left">
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Assignment</h3>
            <div className="mt-4 space-y-4">
              <label className="flex flex-col gap-1.5 text-xs font-bold text-slate-600">
                <span>Vehicle</span>
                <select
                  value={form.vehicleId}
                  onChange={(event) => setForm((current) => ({ ...current, vehicleId: event.target.value }))}
                  className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-xs text-slate-650 outline-none transition focus:border-purple-300 focus:bg-white cursor-pointer font-semibold"
                >
                  <option value="">Select vehicle</option>
                  {availableVehicles.map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.name} · {vehicle.capacityKg} kg
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-1.5 text-xs font-bold text-slate-600">
                <span>Driver</span>
                <select
                  value={form.driverId}
                  onChange={(event) => setForm((current) => ({ ...current, driverId: event.target.value }))}
                  className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-xs text-slate-650 outline-none transition focus:border-purple-300 focus:bg-white cursor-pointer font-semibold"
                >
                  <option value="">Select driver</option>
                  {availableDrivers.map((driver) => (
                    <option key={driver.id} value={driver.id}>
                      {driver.name} · {driver.specialization}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-1.5 text-xs font-bold text-slate-600">
                <span>Notes</span>
                <textarea
                  rows={3}
                  value={form.notes}
                  onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))}
                  className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-xs text-slate-700 outline-none transition focus:border-purple-300 focus:bg-white font-semibold"
                  placeholder="Add delivery context or special handling."
                />
              </label>
            </div>
          </div>

          {warning ? (
            <div className="rounded-xl border border-rose-100 bg-rose-50/50 p-3 text-xs text-rose-700">
              <div className="flex items-start gap-2">
                <AlertTriangle size={14} className="mt-0.5 shrink-0" />
                <span>{warning}</span>
              </div>
            </div>
          ) : null}

          {cargoTooHeavy && selectedVehicle ? (
            <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-3 text-xs text-amber-700">
              The selected vehicle handles {selectedVehicle.capacityKg} kg, so this trip is over capacity.
            </div>
          ) : null}

          <button
            type="submit"
            className={`w-full rounded-xl px-4 py-2.5 text-xs font-bold text-white transition-all duration-200 cursor-pointer ${
              cargoTooHeavy 
                ? 'cursor-not-allowed bg-slate-100 border border-slate-200 text-slate-400' 
                : 'bg-gradient-to-r from-[#7c5a9f] to-[#5e3d75] hover:opacity-95 hover:-translate-y-0.5 shadow-md shadow-purple-100'
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
