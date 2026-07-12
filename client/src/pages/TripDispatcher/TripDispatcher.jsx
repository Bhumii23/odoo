import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TripHeader from './components/TripHeader';
import TripStats from './components/TripStats';
import TripStepper from './components/TripStepper';
import TripForm from './components/TripForm';
import TripFilters from './components/TripFilters';
import TripCard from './components/TripCard';
import { useTripDispatcher } from './hooks/useTripDispatcher';
import { X, CheckCircle2 } from 'lucide-react';

export default function TripDispatcher() {
  const { stats, filteredTrips, filters, setFilters, createTrip, dispatchTrip, cancelTrip, completeTrip, drivers, vehicles } = useTripDispatcher();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedTripId, setSelectedTripId] = useState(null);

  // Completion modal state
  const [completionModal, setCompletionModal] = useState({ open: false, tripId: null });
  const [completionForm, setCompletionForm] = useState({
    finalOdometer: '',
    fuelLiters: '',
    fuelCost: '',
    revenue: '',
  });

  const handleCreateTrip = (trip) => {
    createTrip(trip);
    setIsFormVisible(false);
  };

  const handleOpenCompleteModal = (tripId) => {
    setCompletionModal({ open: true, tripId });
    setCompletionForm({ finalOdometer: '', fuelLiters: '', fuelCost: '', revenue: '' });
  };

  const handleSubmitCompletion = (e) => {
    e.preventDefault();
    if (!completionForm.finalOdometer || !completionForm.fuelLiters || !completionForm.fuelCost || !completionForm.revenue) {
      alert('Please fill in all required fields.');
      return;
    }
    completeTrip(completionModal.tripId, completionForm);
    setCompletionModal({ open: false, tripId: null });
  };

  return (
    <div className="space-y-6">
      <TripHeader onCreateTrip={() => setIsFormVisible((value) => !value)} />

      <TripStats stats={stats} />

      <TripStepper currentStatus="Dispatched" />

      {isFormVisible ? (
        <TripForm onSubmit={handleCreateTrip} drivers={drivers} vehicles={vehicles} />
      ) : (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <TripFilters
            filters={filters}
            setFilters={setFilters}
            drivers={drivers}
            vehicles={vehicles}
          />
        </motion.div>
      )}

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-[#2E2331]">Live trips</h2>
              <p className="mt-1 text-sm text-[#6F6873]">Monitor active routes and make fast decisions.</p>
            </div>
          </div>
          <div className="grid gap-4">
            {filteredTrips.length > 0 ? (
              filteredTrips.map((trip) => (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  onEdit={() => setSelectedTripId(trip.id)}
                  onDispatch={() => dispatchTrip(trip.id)}
                  onCancel={() => cancelTrip(trip.id)}
                  onComplete={() => handleOpenCompleteModal(trip.id)}
                />
              ))
            ) : (
              <div className="rounded-[24px] border border-[#E9E2EC] bg-white/90 p-8 text-center text-sm text-[#6F6873] shadow-[0_18px_48px_-30px_rgba(93,63,88,0.24)]">
                No trips match the current filters.
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[28px] border border-[#E9E2EC] bg-white/90 p-6 shadow-[0_18px_48px_-30px_rgba(93,63,88,0.24)]">
            <h3 className="text-lg font-semibold text-[#2E2331]">Dispatcher focus</h3>
            <p className="mt-2 text-sm text-[#6F6873]">
              Vehicles and drivers are filtered by availability so dispatch decisions stay safe and consistent.
            </p>
            <div className="mt-5 rounded-2xl bg-[#FCFAFD] p-4 text-sm text-[#4B3348]">
              <p className="font-semibold">Current selection</p>
              <p className="mt-1">{selectedTripId ? `Editing Trip #${selectedTripId}` : 'Create or update a trip to start a dispatch run.'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trip Completion Modal */}
      <AnimatePresence>
        {completionModal.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/20 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              className="flex w-full max-w-md flex-col overflow-hidden rounded-[28px] border border-[#ece7ef] bg-white shadow-[0_30px_90px_-30px_rgba(15,23,42,0.35)]"
            >
              <div className="flex items-center justify-between border-b border-[#ece7ef] bg-[#fcfbfe] px-5 py-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400">Complete Trip</p>
                  <h3 className="text-base font-semibold text-slate-900">Trip #{completionModal.tripId}</h3>
                </div>
                <button
                  onClick={() => setCompletionModal({ open: false, tripId: null })}
                  className="rounded-full border border-[#ece7ef] bg-white p-2 text-slate-500 transition-all duration-200 hover:border-[#d9cceb] hover:text-[#6d28d9] cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleSubmitCompletion} className="flex-1 space-y-4 p-5 text-left bg-white">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex flex-col">
                    <label className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 pl-0.5">Final Odometer (km) *</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 75200"
                      value={completionForm.finalOdometer}
                      onChange={(e) => setCompletionForm({...completionForm, finalOdometer: e.target.value})}
                      className="bg-slate-50 border border-slate-100 text-slate-700 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-purple-300 focus:bg-white transition-all font-semibold"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 pl-0.5">Fuel Used (Liters) *</label>
                    <input
                      type="number"
                      required
                      step="0.1"
                      placeholder="e.g. 45"
                      value={completionForm.fuelLiters}
                      onChange={(e) => setCompletionForm({...completionForm, fuelLiters: e.target.value})}
                      className="bg-slate-50 border border-slate-100 text-slate-700 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-purple-300 focus:bg-white transition-all font-semibold"
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex flex-col">
                    <label className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 pl-0.5">Fuel Cost (₹) *</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 4500"
                      value={completionForm.fuelCost}
                      onChange={(e) => setCompletionForm({...completionForm, fuelCost: e.target.value})}
                      className="bg-slate-50 border border-slate-100 text-slate-700 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-purple-300 focus:bg-white transition-all font-semibold"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 pl-0.5">Revenue (₹) *</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 12000"
                      value={completionForm.revenue}
                      onChange={(e) => setCompletionForm({...completionForm, revenue: e.target.value})}
                      className="bg-slate-50 border border-slate-100 text-slate-700 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-purple-300 focus:bg-white transition-all font-semibold"
                    />
                  </div>
                </div>

                <div className="pt-3.5 border-t border-slate-100 flex justify-end space-x-2 bg-slate-50/50 p-4 -mx-5 -mb-5 rounded-b-[24px]">
                  <button
                    type="button"
                    onClick={() => setCompletionModal({ open: false, tripId: null })}
                    className="bg-white hover:bg-slate-50 border border-slate-100 text-slate-500 text-xs font-bold px-4 py-2 rounded-xl cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:opacity-95 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md shadow-emerald-100 transition-all hover:-translate-y-0.5 cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <CheckCircle2 size={13} />
                    Complete Trip
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
