import axios from 'axios';
import type { Vehicle } from '../types/vehicle';
import { API_BASE_URL } from '../config/api';

export interface CreateVehicleRequest {
  licensePlate: string;
  brand: string;
  model: string;
  color: string;
  year: number;
  vehicleTypeId: number;
  status: 'available' | 'in_maintenance' | 'in_use' | 'inactive';
  loadCapacity: number;
  maintenanceDate: string;
  insuranceExpiry: string;
  active: boolean;
}

export interface UpdateVehicleRequest {
  licensePlate?: string;
  brand?: string;
  model?: string;
  color?: string;
  year?: number;
  vehicleTypeId?: number;
  status?: 'available' | 'in_maintenance' | 'in_use' | 'inactive';
  loadCapacity?: number;
  maintenanceDate?: string;
  insuranceExpiry?: string;
  active?: boolean;
}

class VehicleService {
  private readonly baseUrl = `${API_BASE_URL}/vehicles`;

  constructor() {
    console.log('[VehicleService] Initialized with baseUrl:', this.baseUrl);
  }

  // Obtener todos los vehículos
  async getAll(): Promise<Vehicle[]> {
    console.log('[VehicleService.getAll] Fetching from:', this.baseUrl);
    const response = await axios.get<Vehicle[]>(this.baseUrl);
    console.log('[VehicleService.getAll] Response:', response.status, response.data?.length, 'items');
    return response.data;
  }

  // Obtener un vehículo por ID
  async getById(id: number): Promise<Vehicle> {
    const response = await axios.get<Vehicle>(`${this.baseUrl}/${id}`);
    return response.data;
  }

  // Crear un nuevo vehículo
  async create(data: CreateVehicleRequest): Promise<Vehicle> {
    const response = await axios.post<Vehicle>(this.baseUrl, data);
    return response.data;
  }

  // Actualizar un vehículo
  async update(id: number, data: UpdateVehicleRequest): Promise<Vehicle> {
    const response = await axios.put<Vehicle>(`${this.baseUrl}/${id}`, data);
    return response.data;
  }

  // Eliminar un vehículo
  async delete(id: number): Promise<void> {
    await axios.delete(`${this.baseUrl}/${id}`);
  }

  // Toggle status del vehículo (Active/Inactive)
  async toggleStatus(id: number): Promise<Vehicle> {
    const response = await axios.patch<Vehicle>(`${this.baseUrl}/${id}/toggle-status`);
    return response.data;
  }
}

export const vehicleService = new VehicleService();
