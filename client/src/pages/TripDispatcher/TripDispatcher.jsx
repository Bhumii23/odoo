import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TripHeader from './components/TripHeader';
import TripStats from './components/TripStats';
import TripStepper from './components/TripStepper';
import TripForm from './components/TripForm';
import TripFilters from './components/TripFilters';
import TripCard from './components/TripCard';
import { useTripDispatcher } from './hooks/useTripDispatcher';
import { initialDrivers, initialVehicles } from './data';

export default function TripDispatcher({ permission }) {
  const { stats, filteredTrips, filters, setFilters, createTrip, cancelTrip, completeTrip } = useTripDispatcher();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedTripId, setSelectedTripId] = useState(null);

  const handleCreateTrip = (trip) => {
    createTrip(trip);
    setIsFormVisible(false);
  };

  return (
    <div className="space-y-6">
      <TripHeader onCreateTrip={() => setIsFormVisible((value) => !value)} permission={permission} />

      <TripStats stats={stats} />

      <TripStepper currentStatus="Dispatched" />

      {isFormVisible && permission === 'edit' ? (
        <TripForm onSubmit={handleCreateTrip} />
      ) : (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <TripFilters
            filters={filters}
            setFilters={setFilters}
            drivers={initialDrivers}
            vehicles={initialVehicles}
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
                  onCancel={() => cancelTrip(trip.id)}
                  onComplete={() => completeTrip(trip.id)}
                  permission={permission}
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
              <p className="mt-1">{selectedTripId ? `Editing ${selectedTripId}` : 'Create or update a trip to start a dispatch run.'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
