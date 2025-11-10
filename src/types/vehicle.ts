export interface Vehicle {
  id: number;
  licensePlate: string;
  brand: string;
  model: string;
  color: string;
  year: number;
  vehicleTypeId: number;
  vehicleTypeName: string;
  status: 'available' | 'in_maintenance' | 'in_use' | 'inactive';
  loadCapacity: number;
  maintenanceDate: string;
  insuranceExpiry: string;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface VehicleType {
  id: number;
  name: string;
  description?: string;
}
