import { useMemo, useState } from 'react';
import { initialDrivers, initialVehicles, initialTrips } from '../data';

const initialFilters = {
  search: '',
  status: 'All',
  driver: 'All',
  vehicle: 'All',
  date: '',
};

export function useTripDispatcher() {
  const [trips, setTrips] = useState(initialTrips);
  const [filters, setFilters] = useState(initialFilters);

  const stats = useMemo(() => {
    const activeCount = trips.filter((trip) => trip.status === 'Dispatched').length;
    const draftCount = trips.filter((trip) => trip.status === 'Draft').length;
    const completedCount = trips.filter((trip) => trip.status === 'Completed').length;
    const cancelledCount = trips.filter((trip) => trip.status === 'Cancelled').length;
    const availableDrivers = initialDrivers.filter((driver) => driver.status === 'Available').length;
    const availableVehicles = initialVehicles.filter((vehicle) => vehicle.status === 'Available').length;

    return [
      { title: 'Active Trips', value: activeCount, detail: 'In motion now' },
      { title: 'Draft Trips', value: draftCount, detail: 'Preparing dispatch' },
      { title: 'Completed Today', value: completedCount, detail: 'Closed successfully' },
      { title: 'Cancelled', value: cancelledCount, detail: 'Needs attention' },
      { title: 'Available Drivers', value: availableDrivers, detail: 'Ready for assignment' },
      { title: 'Available Vehicles', value: availableVehicles, detail: 'Ready for dispatch' },
    ];
  }, [trips]);

  const filteredTrips = useMemo(() => {
    return trips.filter((trip) => {
      const matchesSearch = [trip.id, trip.source, trip.destination, trip.driverName, trip.vehicleName]
        .join(' ')
        .toLowerCase()
        .includes(filters.search.toLowerCase());
      const matchesStatus = filters.status === 'All' || trip.status === filters.status;
      const matchesDriver = filters.driver === 'All' || trip.driverName === filters.driver;
      const matchesVehicle = filters.vehicle === 'All' || trip.vehicleName === filters.vehicle;
      const matchesDate = !filters.date || trip.dispatchDate === filters.date;
      return matchesSearch && matchesStatus && matchesDriver && matchesVehicle && matchesDate;
    });
  }, [filters, trips]);

  const createTrip = (trip) => {
    setTrips((current) => [
      {
        ...trip,
        id: trip.id || `TRIP-${String(current.length + 100).padStart(3, '0')}`,
      },
      ...current,
    ]);
  };

  const updateTrip = (tripId, updates) => {
    setTrips((current) => current.map((trip) => (trip.id === tripId ? { ...trip, ...updates } : trip)));
  };

  const cancelTrip = (tripId) => {
    updateTrip(tripId, { status: 'Cancelled' });
  };

  const completeTrip = (tripId) => {
    updateTrip(tripId, { status: 'Completed' });
  };

  return {
    trips,
    filters,
    setFilters,
    stats,
    filteredTrips,
    createTrip,
    updateTrip,
    cancelTrip,
    completeTrip,
  };
}
