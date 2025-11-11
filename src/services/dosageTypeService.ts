import axios from 'axios';
import { API_BASE_URL } from '../config/api';

export interface DosageType {
  id: number;
  name: string;
  description: string;
  active: boolean;
}

export interface CreateDosageTypeRequest {
  name: string;
  description: string;
}

export interface UpdateDosageTypeRequest {
  name?: string;
  description?: string;
  active?: boolean;
}

class DosageTypeService {
  private readonly baseUrl = `${API_BASE_URL}/dosage-types`;

  async getAll(): Promise<DosageType[]> {
    const response = await axios.get<DosageType[]>(this.baseUrl);
    return response.data;
  }

  async getById(id: number): Promise<DosageType> {
    const response = await axios.get<DosageType>(`${this.baseUrl}/${id}`);
    return response.data;
  }

  async create(data: CreateDosageTypeRequest): Promise<DosageType> {
    const response = await axios.post<DosageType>(this.baseUrl, data);
    return response.data;
  }

  async update(id: number, data: UpdateDosageTypeRequest): Promise<DosageType> {
    const response = await axios.put<DosageType>(`${this.baseUrl}/${id}`, data);
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await axios.delete(`${this.baseUrl}/${id}`);
  }

  async toggleActive(id: number, active: boolean): Promise<DosageType> {
    const response = await axios.patch<DosageType>(`${this.baseUrl}/${id}/toggle-active`, { active });
    return response.data;
  }
}

export const dosageTypeService = new DosageTypeService();
