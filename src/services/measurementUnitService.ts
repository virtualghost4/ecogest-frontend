import axios from 'axios';

export interface MeasurementUnit {
  id: number;
  name: string;
  abbreviation: string;
  description: string;
  active: boolean;
}

export interface CreateMeasurementUnitRequest {
  name: string;
  abbreviation: string;
  description: string;
}

export interface UpdateMeasurementUnitRequest {
  name?: string;
  abbreviation?: string;
  description?: string;
  active?: boolean;
}

class MeasurementUnitService {
  private readonly baseUrl = '/api/measurement-units';

  async getAll(): Promise<MeasurementUnit[]> {
    const response = await axios.get<MeasurementUnit[]>(this.baseUrl);
    return response.data;
  }

  async getById(id: number): Promise<MeasurementUnit> {
    const response = await axios.get<MeasurementUnit>(`${this.baseUrl}/${id}`);
    return response.data;
  }

  async create(data: CreateMeasurementUnitRequest): Promise<MeasurementUnit> {
    const response = await axios.post<MeasurementUnit>(this.baseUrl, data);
    return response.data;
  }

  async update(id: number, data: UpdateMeasurementUnitRequest): Promise<MeasurementUnit> {
    const response = await axios.put<MeasurementUnit>(`${this.baseUrl}/${id}`, data);
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await axios.delete(`${this.baseUrl}/${id}`);
  }

  async toggleActive(id: number, active: boolean): Promise<MeasurementUnit> {
    const response = await axios.patch<MeasurementUnit>(`${this.baseUrl}/${id}/toggle-active`, { active });
    return response.data;
  }
}

export const measurementUnitService = new MeasurementUnitService();
