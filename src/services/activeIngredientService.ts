import axiosInstance from '../config/axios';

export interface ActiveIngredient {
  id: number;
  name: string;
  description: string;
  active: boolean;
}

export interface CreateActiveIngredientRequest {
  name: string;
  description: string;
}

export interface UpdateActiveIngredientRequest {
  name?: string;
  description?: string;
  active?: boolean;
}

class ActiveIngredientService {
  private readonly baseUrl = '/active-ingredients';

  async getAll(): Promise<ActiveIngredient[]> {
    const response = await axiosInstance.get<ActiveIngredient[]>(this.baseUrl);
    return response.data;
  }

  async getById(id: number): Promise<ActiveIngredient> {
    const response = await axiosInstance.get<ActiveIngredient>(`${this.baseUrl}/${id}`);
    return response.data;
  }

  async create(data: CreateActiveIngredientRequest): Promise<ActiveIngredient> {
    const response = await axiosInstance.post<ActiveIngredient>(this.baseUrl, data);
    return response.data;
  }

  async update(id: number, data: UpdateActiveIngredientRequest): Promise<ActiveIngredient> {
    const response = await axiosInstance.put<ActiveIngredient>(`${this.baseUrl}/${id}`, data);
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await axiosInstance.delete(`${this.baseUrl}/${id}`);
  }

  async toggleActive(id: number, active: boolean): Promise<ActiveIngredient> {
    const response = await axiosInstance.patch<ActiveIngredient>(`${this.baseUrl}/${id}/toggle-active`, { active });
    return response.data;
  }
}

export const activeIngredientService = new ActiveIngredientService();
