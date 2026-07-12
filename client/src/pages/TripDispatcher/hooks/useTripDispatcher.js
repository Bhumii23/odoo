import { useMemo, useState, useEffect } from 'react';
import api from '../../../lib/api';

const initialFilters = {
  search: '',
  status: 'All',
  driver: 'All',
  vehicle: 'All',
  date: '',
};

export function useTripDispatcher() {
  const [trips, setTrips] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [filters, setFilters] = useState(initialFilters);

  const fetchAll = async () => {
    try {
      const [tripsRes, driversRes, vehiclesRes] = await Promise.all([
        api.get('/trips'),
        api.get('/drivers'),
        api.get('/vehicles')
      ]);
      setTrips(tripsRes.data);
      setDrivers(driversRes.data);
      setVehicles(vehiclesRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const stats = useMemo(() => {
    const activeCount = trips.filter((trip) => trip.status === 'Dispatched').length;
    const draftCount = trips.filter((trip) => trip.status === 'Draft').length;
    const completedCount = trips.filter((trip) => trip.status === 'Completed').length;
    const cancelledCount = trips.filter((trip) => trip.status === 'Cancelled').length;
    const availableDrivers = drivers.filter((driver) => driver.status === 'Available').length;
    const availableVehicles = vehicles.filter((vehicle) => vehicle.status === 'Available').length;

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

  const createTrip = async (trip) => {
    try {
      const res = await api.post('/trips', trip);
      setTrips([res.data, ...trips]);
    } catch(err) {
      console.error(err);
    }
  };

  const updateTrip = async (tripId, updates) => {
    try {
      const res = await api.put(`/trips/${tripId}/status`, updates);
      setTrips((current) => current.map((trip) => (trip.id === tripId ? { ...trip, ...res.data } : trip)));
    } catch(err) {
      console.error(err);
    }
  };

  const cancelTrip = async (tripId) => {
    await updateTrip(tripId, { status: 'CANCELLED' });
  };

  const completeTrip = async (tripId) => {
    await updateTrip(tripId, { status: 'COMPLETED' });
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
    drivers,
    vehicles
  };
}
