import { useMemo, useState, useEffect } from 'react';
import api from '../../../lib/api';

const initialFilters = {
  search: '',
  status: 'All',
  vehicle: 'All',
  priority: 'All',
};

export function useMaintenance() {
  const [vehicles, setVehicles] = useState([]);
  const [serviceHistory, setServiceHistory] = useState([]);
  const [filters, setFilters] = useState(initialFilters);

  const fetchAll = async () => {
    try {
      const [maintRes, vehiclesRes] = await Promise.all([
        api.get('/maintenance'),
        api.get('/vehicles')
      ]);
      setServiceHistory(maintRes.data);
      setVehicles(vehiclesRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const stats = useMemo(() => {
    const inShop = vehicles.filter((vehicle) => vehicle.status === 'IN_SHOP' || vehicle.status === 'In Shop').length;
    const upcoming = serviceHistory.filter((record) => record.status === 'PENDING_APPROVAL' || record.status === 'IN_PROGRESS').length;
    const completed = serviceHistory.filter((record) => record.status === 'COMPLETED').length;
    const averageCost = serviceHistory.length
      ? Math.round(serviceHistory.reduce((sum, record) => sum + (record.cost || 0), 0) / serviceHistory.length)
      : 0;

    return [
      { title: 'Vehicles in Shop', value: inShop, detail: 'Unavailable for dispatch' },
      { title: 'Upcoming Service', value: upcoming, detail: 'Planned maintenance' },
      { title: 'Completed', value: completed, detail: 'Finished successfully' },
      { title: 'Average Cost', value: `₹${averageCost.toLocaleString()}`, detail: 'Per service record' },
    ];
  }, [serviceHistory, vehicles]);

  const filteredHistory = useMemo(() => {
    return serviceHistory.filter((record) => {
      const matchesSearch = [record.vehicleName, record.serviceType, record.workshop, record.mechanic, record.description]
        .join(' ')
        .toLowerCase()
        .includes(filters.search.toLowerCase());
      const matchesStatus = filters.status === 'All' || record.status === filters.status;
      const matchesVehicle = filters.vehicle === 'All' || record.vehicleName === filters.vehicle;
      const matchesPriority = filters.priority === 'All' || record.priority === filters.priority;
      return matchesSearch && matchesStatus && matchesVehicle && matchesPriority;
    });
  }, [filters, serviceHistory]);

  const scheduleMaintenance = async (payload) => {
    try {
      // payload from form uses camelCase properties. Backend might expect specific ones.
      const res = await api.post('/maintenance', {
        vehicleId: payload.vehicleId,
        serviceType: 'ROUTINE_MAINTENANCE',
        description: payload.description,
        cost: payload.estimatedCost || 0,
        date: new Date().toISOString(),
      });
      setServiceHistory([res.data, ...serviceHistory]);
      setVehicles((current) => current.map((v) => (v.id === payload.vehicleId ? { ...v, status: 'IN_SHOP' } : v)));
    } catch (err) {
      console.error(err);
    }
  };

  const completeMaintenance = async (serviceId) => {
    try {
      const res = await api.patch(`/maintenance/${serviceId}/status`, { status: 'COMPLETED' });
      setServiceHistory((current) =>
        current.map((record) =>
          record.id === serviceId
            ? { ...record, status: 'COMPLETED' }
            : record
        )
      );
      if (res.data.vehicleId) {
        setVehicles((current) =>
          current.map((vehicle) => (vehicle.id === res.data.vehicleId ? { ...vehicle, status: 'AVAILABLE' } : vehicle))
        );
        // Refresh full list from server to get latest status
        fetchAll();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return {
    vehicles,
    serviceHistory,
    filters,
    setFilters,
    stats,
    filteredHistory,
    scheduleMaintenance,
    completeMaintenance,
  };
}
