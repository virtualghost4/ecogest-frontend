import axiosInstance from '../config/axios';

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
  private readonly baseUrl = '/user-types';

  async getAll(): Promise<UserType[]> {
    const response = await axiosInstance.get<UserType[]>(this.baseUrl);
    return response.data;
  }

  async getById(id: number): Promise<UserType> {
    const response = await axiosInstance.get<UserType>(`${this.baseUrl}/${id}`);
    return response.data;
  }

  async create(data: CreateUserTypeRequest): Promise<UserType> {
    const response = await axiosInstance.post<UserType>(this.baseUrl, data);
    return response.data;
  }

  async update(id: number, data: UpdateUserTypeRequest): Promise<UserType> {
    const response = await axiosInstance.put<UserType>(`${this.baseUrl}/${id}`, data);
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await axiosInstance.delete(`${this.baseUrl}/${id}`);
  }

  async toggleActive(id: number, active: boolean): Promise<UserType> {
    const response = await axiosInstance.patch<UserType>(`${this.baseUrl}/${id}/toggle-active`, { active });
    return response.data;
  }
}

export const userTypeService = new UserTypeService();
