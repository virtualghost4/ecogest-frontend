// Exportaciones de tipos principales
export type { VehicleType } from '../hooks/useVehicleTypes';
export type { CreateVehicleTypeRequest, UpdateVehicleTypeRequest } from '../services/vehicleTypeService';

// Tipos de respuesta de API
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Tipos comunes
export interface SelectOption {
  value: string | number;
  label: string;
}

export interface TableColumn {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'left' | 'center' | 'right';
}

// Estados de carga
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Tipos de notificación
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}
