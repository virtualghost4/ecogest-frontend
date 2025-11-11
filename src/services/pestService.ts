import axios from 'axios';
import { API_BASE_URL } from '../config/api';

export interface Pest {
  id: number;
  name: string;
  description: string;
  active: boolean;
}

export interface CreatePestRequest {
  name: string;
  description: string;
}

export interface UpdatePestRequest {
  name?: string;
  description?: string;
  active?: boolean;
}

class PestService {
  private readonly baseUrl = `${API_BASE_URL}/pests`;

  async getAll(): Promise<Pest[]> {
    const response = await axios.get<Pest[]>(this.baseUrl);
    return response.data;
  }

  async getById(id: number): Promise<Pest> {
    const response = await axios.get<Pest>(`${this.baseUrl}/${id}`);
    return response.data;
  }

  async create(data: CreatePestRequest): Promise<Pest> {
    const response = await axios.post<Pest>(this.baseUrl, data);
    return response.data;
  }

  async update(id: number, data: UpdatePestRequest): Promise<Pest> {
    const response = await axios.put<Pest>(`${this.baseUrl}/${id}`, data);
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await axios.delete(`${this.baseUrl}/${id}`);
  }

  async toggleActive(id: number, active: boolean): Promise<Pest> {
    const response = await axios.patch<Pest>(`${this.baseUrl}/${id}/toggle-active`, { active });
    return response.data;
  }
}

export const pestService = new PestService();
