import axios from 'axios';

export interface ServiceType {
  id: number;
  name: string;
  description: string;
  active: boolean;
}

export interface CreateServiceTypeRequest {
  name: string;
  description: string;
}

export interface UpdateServiceTypeRequest {
  name?: string;
  description?: string;
  active?: boolean;
}

class ServiceTypeService {
  private readonly baseUrl = '/api/service-types';

  async getAll(): Promise<ServiceType[]> {
    const response = await axios.get<ServiceType[]>(this.baseUrl);
    return response.data;
  }

  async getById(id: number): Promise<ServiceType> {
    const response = await axios.get<ServiceType>(`${this.baseUrl}/${id}`);
    return response.data;
  }

  async create(data: CreateServiceTypeRequest): Promise<ServiceType> {
    const response = await axios.post<ServiceType>(this.baseUrl, data);
    return response.data;
  }

  async update(id: number, data: UpdateServiceTypeRequest): Promise<ServiceType> {
    const response = await axios.put<ServiceType>(`${this.baseUrl}/${id}`, data);
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await axios.delete(`${this.baseUrl}/${id}`);
  }

  async toggleActive(id: number, active: boolean): Promise<ServiceType> {
    const response = await axios.patch<ServiceType>(`${this.baseUrl}/${id}/toggle-active`, { active });
    return response.data;
  }
}

export const serviceTypeService = new ServiceTypeService();
