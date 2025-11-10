import type { VehicleType } from '../hooks/useVehicleTypes';

// Utilidades para vehículos
export const vehicleUtils = {
  // Obtener ícono según tipo de vehículo
  getIcon: (type: string): string => {
    switch (type.toLowerCase()) {
      case 'pickup_truck':
        return '🚛';
      case 'van':
        return '🚐';
      case 'truck':
        return '🚚';
      case 'motorcycle':
        return '🏍️';
      case 'car':
        return '🚗';
      case 'bus':
        return '🚌';
      default:
        return '🚗';
    }
  },

  // Formatear nombre (pickup_truck -> Pickup Truck)
  formatName: (name: string): string => {
    return name.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  },

  // Obtener color según estado
  getStatusColor: (active: boolean): 'success' | 'default' | 'error' => {
    if (active) return 'success';
    return 'default';
  },

  // Obtener texto de estado
  getStatusText: (active: boolean): string => {
    return active ? 'Activo' : 'Inactivo';
  },

  // Obtener texto de licencia
  getLicenseText: (requiresLicense: boolean): string => {
    return requiresLicense ? 'Requerida' : 'No requerida';
  },

  // Validar nombre de tipo de vehículo
  validateName: (name: string): { isValid: boolean; error?: string } => {
    if (!name || name.trim().length === 0) {
      return { isValid: false, error: 'El nombre es requerido' };
    }
    
    if (name.length > 50) {
      return { isValid: false, error: 'El nombre no puede exceder 50 caracteres' };
    }

    // Validar formato (snake_case)
    const snakeCaseRegex = /^[a-z_]+$/;
    if (!snakeCaseRegex.test(name)) {
      return { isValid: false, error: 'El nombre debe estar en formato snake_case (ej: pickup_truck)' };
    }

    return { isValid: true };
  },

  // Validar descripción
  validateDescription: (description: string): { isValid: boolean; error?: string } => {
    if (!description || description.trim().length === 0) {
      return { isValid: false, error: 'La descripción es requerida' };
    }
    
    if (description.length > 200) {
      return { isValid: false, error: 'La descripción no puede exceder 200 caracteres' };
    }

    return { isValid: true };
  },

  // Filtrar tipos de vehículos
  filterByStatus: (vehicles: VehicleType[], active?: boolean): VehicleType[] => {
    if (active === undefined) return vehicles;
    return vehicles.filter(vehicle => vehicle.active === active);
  },

  // Filtrar por requerimiento de licencia
  filterByLicense: (vehicles: VehicleType[], requiresLicense?: boolean): VehicleType[] => {
    if (requiresLicense === undefined) return vehicles;
    return vehicles.filter(vehicle => vehicle.requiresLicense === requiresLicense);
  },

  // Buscar por nombre o descripción
  search: (vehicles: VehicleType[], query: string): VehicleType[] => {
    if (!query || query.trim().length === 0) return vehicles;
    
    const lowercaseQuery = query.toLowerCase();
    return vehicles.filter(vehicle => 
      vehicle.name.toLowerCase().includes(lowercaseQuery) ||
      vehicle.description.toLowerCase().includes(lowercaseQuery)
    );
  }
};
