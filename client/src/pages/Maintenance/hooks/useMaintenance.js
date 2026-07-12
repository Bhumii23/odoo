import { useMemo, useState } from 'react';
import { initialServiceHistory, initialVehicles } from '../data';

const initialFilters = {
  search: '',
  status: 'All',
  vehicle: 'All',
  priority: 'All',
};

export function useMaintenance() {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [serviceHistory, setServiceHistory] = useState(initialServiceHistory);
  const [filters, setFilters] = useState(initialFilters);

  const stats = useMemo(() => {
    const inShop = vehicles.filter((vehicle) => vehicle.status === 'In Shop').length;
    const upcoming = serviceHistory.filter((record) => record.status === 'Scheduled').length;
    const completed = serviceHistory.filter((record) => record.status === 'Completed').length;
    const averageCost = serviceHistory.length
      ? Math.round(serviceHistory.reduce((sum, record) => sum + record.estimatedCost, 0) / serviceHistory.length)
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

  const scheduleMaintenance = (payload) => {
    setVehicles((current) => current.map((vehicle) => (vehicle.id === payload.vehicleId ? { ...vehicle, status: 'In Shop' } : vehicle)));
    setServiceHistory((current) => [
      {
        id: `SRV-${String(current.length + 1000).padStart(4, '0')}`,
        ...payload,
        status: 'Scheduled',
      },
      ...current,
    ]);
  };

  const completeMaintenance = (serviceId) => {
    setServiceHistory((current) =>
      current.map((record) =>
        record.id === serviceId
          ? { ...record, status: 'Completed', completedAt: new Date().toISOString().slice(0, 10) }
          : record
      )
    );
    const completedRecord = serviceHistory.find((record) => record.id === serviceId);
    if (completedRecord) {
      setVehicles((current) =>
        current.map((vehicle) => (vehicle.id === completedRecord.vehicleId ? { ...vehicle, status: 'Available' } : vehicle))
      );
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
