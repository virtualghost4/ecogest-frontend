import axios from 'axios';
import { API_BASE_URL } from '../config/api';

export interface UserType {
  id: number;
  name: string;
  description: string;
  active: boolean;
}

export interface CreateUserTypeRequest {
  name: string;
  description: string;
}

export interface UpdateUserTypeRequest {
  name?: string;
  description?: string;
  active?: boolean;
}

class UserTypeService {
  private readonly baseUrl = `${API_BASE_URL}/user-types`;

  async getAll(): Promise<UserType[]> {
    const response = await axios.get<UserType[]>(this.baseUrl);
    return response.data;
  }

  async getById(id: number): Promise<UserType> {
    const response = await axios.get<UserType>(`${this.baseUrl}/${id}`);
    return response.data;
  }

  async create(data: CreateUserTypeRequest): Promise<UserType> {
    const response = await axios.post<UserType>(this.baseUrl, data);
    return response.data;
  }

  async update(id: number, data: UpdateUserTypeRequest): Promise<UserType> {
    const response = await axios.put<UserType>(`${this.baseUrl}/${id}`, data);
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await axios.delete(`${this.baseUrl}/${id}`);
  }

  async toggleActive(id: number, active: boolean): Promise<UserType> {
    const response = await axios.patch<UserType>(`${this.baseUrl}/${id}/toggle-active`, { active });
    return response.data;
  }
}

export const userTypeService = new UserTypeService();
