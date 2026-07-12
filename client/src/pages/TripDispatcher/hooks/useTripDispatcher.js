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
      // Driver API wraps response in { data: [...] }
      setDrivers(driversRes.data.data || driversRes.data);
      setVehicles(vehiclesRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const stats = useMemo(() => {
    const activeCount = trips.filter((trip) => trip.status === 'DISPATCHED').length;
    const draftCount = trips.filter((trip) => trip.status === 'DRAFT').length;
    const completedCount = trips.filter((trip) => trip.status === 'COMPLETED').length;
    const cancelledCount = trips.filter((trip) => trip.status === 'CANCELLED').length;
    const availableDrivers = drivers.filter((driver) => driver.status === 'AVAILABLE').length;
    const availableVehicles = vehicles.filter((vehicle) => vehicle.status === 'AVAILABLE').length;

    return [
      { title: 'Active Trips', value: activeCount, detail: 'In motion now' },
      { title: 'Draft Trips', value: draftCount, detail: 'Preparing dispatch' },
      { title: 'Completed', value: completedCount, detail: 'Closed successfully' },
      { title: 'Cancelled', value: cancelledCount, detail: 'Needs attention' },
      { title: 'Available Drivers', value: availableDrivers, detail: 'Ready for assignment' },
      { title: 'Available Vehicles', value: availableVehicles, detail: 'Ready for dispatch' },
    ];
  }, [trips, drivers, vehicles]);

  const filteredTrips = useMemo(() => {
    return trips.filter((trip) => {
      const driverName = trip.driver?.name || '';
      const vehicleName = trip.vehicle?.name || '';
      const matchesSearch = [trip.id, trip.source, trip.destination, driverName, vehicleName]
        .join(' ')
        .toLowerCase()
        .includes(filters.search.toLowerCase());
      const matchesStatus = filters.status === 'All' || trip.status === filters.status;
      const matchesDriver = filters.driver === 'All' || driverName === filters.driver;
      const matchesVehicle = filters.vehicle === 'All' || vehicleName === filters.vehicle;
      const matchesDate = !filters.date || (trip.createdAt && trip.createdAt.startsWith(filters.date));
      return matchesSearch && matchesStatus && matchesDriver && matchesVehicle && matchesDate;
    });
  }, [filters, trips]);

  const createTrip = async (trip) => {
    try {
      const res = await api.post('/trips', {
        source: trip.source,
        destination: trip.destination,
        vehicleId: Number(trip.vehicleId),
        driverId: Number(trip.driverId),
        cargoWeight: Number(trip.cargoWeight),
        plannedDistance: Number(trip.distance) || 1,
      });
      setTrips([res.data, ...trips]);
    } catch(err) {
      console.error(err);
      alert(err.response?.data?.error || 'Failed to create trip');
    }
  };

  const updateTrip = async (tripId, updates) => {
    try {
      const res = await api.put(`/trips/${tripId}/status`, updates);
      setTrips((current) => current.map((trip) => (trip.id === tripId ? { ...trip, ...res.data } : trip)));
    } catch(err) {
      console.error(err);
      alert(err.response?.data?.error || 'Failed to update trip');
    }
  };

  const dispatchTrip = async (tripId) => {
    await updateTrip(tripId, { status: 'DISPATCHED' });
  };

  const cancelTrip = async (tripId) => {
    await updateTrip(tripId, { status: 'CANCELLED' });
  };

  const completeTrip = async (tripId, completionData) => {
    await updateTrip(tripId, {
      status: 'COMPLETED',
      finalOdometer: Number(completionData.finalOdometer),
      fuelLiters: Number(completionData.fuelLiters),
      fuelCost: Number(completionData.fuelCost),
      revenue: Number(completionData.revenue),
    });
  };

  return {
    trips,
    filters,
    setFilters,
    stats,
    filteredTrips,
    createTrip,
    updateTrip,
    dispatchTrip,
    cancelTrip,
    completeTrip,
    drivers,
    vehicles
  };
}
