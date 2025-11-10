import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { 
  HomePage, 
  VehicleTypes, 
  VehiclesPage, 
  UsersPage, 
  SettingsPage, 
  CertificatesPage, 
  ReportsPage, 
  InvoicesPage, 
  EmployeesPage,
  ActiveIngredientsPage,
  DosageTypesPage,
  FormulationsPage,
  MeasurementUnitsPage,
  PestsPage,
  ServiceTypesPage,
  UserTypesPage,
  VisitStatusesPage,
} from '../pages';
import { Layout } from '../components';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout title="Inicio">
        <HomePage />
      </Layout>
    ),
  },
  {
    path: '/vehicle-types',
    element: (
      <Layout title="Tipos de Vehículos">
        <VehicleTypes />
      </Layout>
    ),
  },
  {
    path: '/vehicles',
    element: (
      <Layout title="Vehículos">
        <VehiclesPage />
      </Layout>
    ),
  },
  {
    path: '/users',
    element: (
      <Layout title="Usuarios">
        <UsersPage />
      </Layout>
    ),
  },
  {
    path: '/settings',
    element: (
      <Layout title="Configuración">
        <SettingsPage />
      </Layout>
    ),
  },
  {
    path: '/certificates',
    element: (
      <Layout title="Certificados">
        <CertificatesPage />
      </Layout>
    ),
  },
  {
    path: '/reports',
    element: (
      <Layout title="Reportes">
        <ReportsPage />
      </Layout>
    ),
  },
  {
    path: '/invoices',
    element: (
      <Layout title="Boletas">
        <InvoicesPage />
      </Layout>
    ),
  },
  {
    path: '/employees',
    element: (
      <Layout title="Empleados">
        <EmployeesPage />
      </Layout>
    ),
  },
  {
    path: '/active-ingredients',
    element: (
      <Layout title="Ingredientes Activos">
        <ActiveIngredientsPage />
      </Layout>
    ),
  },
  {
    path: '/dosage-types',
    element: (
      <Layout title="Tipos de Dosificación">
        <DosageTypesPage />
      </Layout>
    ),
  },
  {
    path: '/formulations',
    element: (
      <Layout title="Formulaciones">
        <FormulationsPage />
      </Layout>
    ),
  },
  {
    path: '/measurement-units',
    element: (
      <Layout title="Unidades de Medida">
        <MeasurementUnitsPage />
      </Layout>
    ),
  },
  {
    path: '/pests',
    element: (
      <Layout title="Plagas">
        <PestsPage />
      </Layout>
    ),
  },
  {
    path: '/service-types',
    element: (
      <Layout title="Tipos de Servicio">
        <ServiceTypesPage />
      </Layout>
    ),
  },
  {
    path: '/user-types',
    element: (
      <Layout title="Tipos de Usuario">
        <UserTypesPage />
      </Layout>
    ),
  },
  {
    path: '/visit-statuses',
    element: (
      <Layout title="Estados de Visita">
        <VisitStatusesPage />
      </Layout>
    ),
  },
]);

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
