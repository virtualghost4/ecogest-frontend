import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export interface VehicleType {
  id: number;
  name: string;
  description: string;
  requiresLicense: boolean;
  active: boolean;
}

interface UseVehicleTypesReturn {
  vehicleTypes: VehicleType[];
  loading: boolean;
  error: string | null;
  fetchVehicleTypes: () => Promise<void>;
  refreshVehicleTypes: () => void;
}

export const useVehicleTypes = (): UseVehicleTypesReturn => {
  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVehicleTypes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get<VehicleType[]>('/api/vehicle-types');
      setVehicleTypes(response.data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al cargar los tipos de vehículos';
      setError(errorMessage);
      console.error('Error fetching vehicle types:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshVehicleTypes = useCallback(() => {
    fetchVehicleTypes();
  }, [fetchVehicleTypes]);

  useEffect(() => {
    fetchVehicleTypes();
  }, [fetchVehicleTypes]);

  return {
    vehicleTypes,
    loading,
    error,
    fetchVehicleTypes,
    refreshVehicleTypes
  };
};
