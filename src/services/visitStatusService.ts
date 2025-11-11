import axios from 'axios';
import { API_BASE_URL } from '../config/api';

export interface VisitStatus {
  id: number;
  name: string;
  description: string;
  active: boolean;
}

export interface CreateVisitStatusRequest {
  name: string;
  description: string;
}

export interface UpdateVisitStatusRequest {
  name?: string;
  description?: string;
  active?: boolean;
}

class VisitStatusService {
  private readonly baseUrl = `${API_BASE_URL}/visit-statuses`;

  async getAll(): Promise<VisitStatus[]> {
    const response = await axios.get<VisitStatus[]>(this.baseUrl);
    return response.data;
  }

  async getById(id: number): Promise<VisitStatus> {
    const response = await axios.get<VisitStatus>(`${this.baseUrl}/${id}`);
    return response.data;
  }

  async create(data: CreateVisitStatusRequest): Promise<VisitStatus> {
    const response = await axios.post<VisitStatus>(this.baseUrl, data);
    return response.data;
  }

  async update(id: number, data: UpdateVisitStatusRequest): Promise<VisitStatus> {
    const response = await axios.put<VisitStatus>(`${this.baseUrl}/${id}`, data);
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await axios.delete(`${this.baseUrl}/${id}`);
  }

  async toggleActive(id: number, active: boolean): Promise<VisitStatus> {
    const response = await axios.patch<VisitStatus>(`${this.baseUrl}/${id}/toggle-active`, { active });
    return response.data;
  }
}

export const visitStatusService = new VisitStatusService();
