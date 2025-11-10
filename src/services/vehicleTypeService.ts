import axios from 'axios';
import type { VehicleType } from '../hooks/useVehicleTypes';

export interface CreateVehicleTypeRequest {
  name: string;
  description: string;
  requiresLicense: boolean;
}

export interface UpdateVehicleTypeRequest {
  name?: string;
  description?: string;
  requiresLicense?: boolean;
  active?: boolean;
}

class VehicleTypeService {
  private readonly baseUrl = '/api/vehicle-types';

  // Obtener todos los tipos de vehículos
  async getAll(): Promise<VehicleType[]> {
    const response = await axios.get<VehicleType[]>(this.baseUrl);
    return response.data;
  }

  // Obtener un tipo de vehículo por ID
  async getById(id: number): Promise<VehicleType> {
    const response = await axios.get<VehicleType>(`${this.baseUrl}/${id}`);
    return response.data;
  }

  // Crear un nuevo tipo de vehículo
  async create(data: CreateVehicleTypeRequest): Promise<VehicleType> {
    const response = await axios.post<VehicleType>(this.baseUrl, data);
    return response.data;
  }

  // Actualizar un tipo de vehículo
  async update(id: number, data: UpdateVehicleTypeRequest): Promise<VehicleType> {
    const response = await axios.put<VehicleType>(`${this.baseUrl}/${id}`, data);
    return response.data;
  }

  // Eliminar un tipo de vehículo
  async delete(id: number): Promise<void> {
    await axios.delete(`${this.baseUrl}/${id}`);
  }

  // Activar/Desactivar un tipo de vehículo
  async toggleActive(id: number, active: boolean): Promise<VehicleType> {
    const response = await axios.patch<VehicleType>(`${this.baseUrl}/${id}/toggle-active`, { active });
    return response.data;
  }
}

export const vehicleTypeService = new VehicleTypeService();
