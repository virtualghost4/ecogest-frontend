import axios from 'axios';

export interface Formulation {
  id: number;
  name: string;
  description: string;
  active: boolean;
}

export interface CreateFormulationRequest {
  name: string;
  description: string;
}

export interface UpdateFormulationRequest {
  name?: string;
  description?: string;
  active?: boolean;
}

class FormulationService {
  private readonly baseUrl = '/api/formulations';

  async getAll(): Promise<Formulation[]> {
    const response = await axios.get<Formulation[]>(this.baseUrl);
    return response.data;
  }

  async getById(id: number): Promise<Formulation> {
    const response = await axios.get<Formulation>(`${this.baseUrl}/${id}`);
    return response.data;
  }

  async create(data: CreateFormulationRequest): Promise<Formulation> {
    const response = await axios.post<Formulation>(this.baseUrl, data);
    return response.data;
  }

  async update(id: number, data: UpdateFormulationRequest): Promise<Formulation> {
    const response = await axios.put<Formulation>(`${this.baseUrl}/${id}`, data);
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await axios.delete(`${this.baseUrl}/${id}`);
  }

  async toggleActive(id: number, active: boolean): Promise<Formulation> {
    const response = await axios.patch<Formulation>(`${this.baseUrl}/${id}/toggle-active`, { active });
    return response.data;
  }
}

export const formulationService = new FormulationService();
