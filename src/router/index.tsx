import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage, VehicleTypes, VehiclesPage, UsersPage, SettingsPage, CertificatesPage, ReportsPage, InvoicesPage, EmployeesPage } from '../pages';
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
]);

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
