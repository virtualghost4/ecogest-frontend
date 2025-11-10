import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Breadcrumbs,
  Skeleton,
} from '@mui/material';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';
import {
  People as PeopleIcon,
  DirectionsCar as CarIcon,
  Build as MaintenanceIcon,
  Assignment as ServicesIcon,
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import axios from 'axios';
import './styles.css';

interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalVehicles: number;
  availableVehicles: number;
  vehiclesInMaintenance: number;
  maintenanceScheduled: number;
  pendingServices: number;
  completedServicesToday: number;
  monthlyIncome: number;
  weeklyIncome: number;
  weeklyActivity: number;
  activeServices: number;
  alerts: number;
  criticalAlerts: number;
  monthlyRevenue: number;
}

const HomePage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeUsers: 0,
    totalVehicles: 0,
    availableVehicles: 0,
    vehiclesInMaintenance: 0,
    maintenanceScheduled: 0,
    pendingServices: 0,
    completedServicesToday: 0,
    monthlyIncome: 0,
    weeklyIncome: 0,
    weeklyActivity: 0,
    activeServices: 0,
    alerts: 0,
    criticalAlerts: 0,
    monthlyRevenue: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        
        // Cargar datos reales desde las APIs
        const [usersResponse, vehiclesResponse] = await Promise.all([
          axios.get('http://localhost:8080/api/users'),
          axios.get('http://localhost:8080/api/vehicles'),
        ]);

        const users = usersResponse.data;
        const vehicles = vehiclesResponse.data;

        // Calcular estadísticas basadas en datos reales
        const dashboardStats: DashboardStats = {
          totalUsers: users.length,
          activeUsers: users.filter((user: any) => user.enabled).length,
          totalVehicles: vehicles.length,
          availableVehicles: vehicles.filter((vehicle: any) => vehicle.status === 'available').length,
          vehiclesInMaintenance: vehicles.filter((vehicle: any) => vehicle.status === 'in_maintenance').length,
          maintenanceScheduled: 3, // Mock data - vendría de API de servicios
          pendingServices: 12, // Mock data - vendría de API de servicios
          completedServicesToday: 8, // Mock data - vendría de API de servicios
          monthlyIncome: 45800, // Mock data - vendría de API financiera
          weeklyIncome: 12500, // Mock data - vendría de API financiera
          weeklyActivity: 24, // Mock data - vendría de API de actividad
          activeServices: 6, // Mock data - vendría de API de servicios
          alerts: 3, // Mock data - vendría de API de alertas
          criticalAlerts: 1, // Mock data - vendría de API de alertas
          monthlyRevenue: 45800, // Mock data - vendría de API financiera
        };

        setStats(dashboardStats);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        
        // Datos mock como fallback
        setStats({
          totalUsers: 156,
          activeUsers: 142,
          totalVehicles: 48,
          availableVehicles: 35,
          vehiclesInMaintenance: 8,
          maintenanceScheduled: 3,
          pendingServices: 12,
          completedServicesToday: 8,
          monthlyIncome: 45800,
          weeklyIncome: 12500,
          weeklyActivity: 24,
          activeServices: 6,
          alerts: 3,
          criticalAlerts: 1,
          monthlyRevenue: 45800,
        });
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(amount);
  };

  const getPercentage = (value: number, total: number) => {
    return total > 0 ? Math.round((value / total) * 100) : 0;
  };

  if (loading) {
    return (
      <div className="homepage-container">
        {/* Breadcrumbs skeleton */}
        <Box sx={{ mb: 2 }}>
          <Skeleton variant="text" width={100} height={24} />
        </Box>

        {/* Header skeleton */}
        <div className="homepage-header">
          <Skeleton variant="text" width={250} height={40} sx={{ mb: 1 }} />
          <Skeleton variant="text" width={400} height={24} />
        </div>

        {/* Dashboard cards skeleton */}
        <Box className="dashboard-grid">
          {/* First row - 4 cards */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 3 }}>
            {[...Array(4)].map((_, index) => (
              <Box key={index} sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 12px)' } }}>
                <Card className="dashboard-card">
                  <CardContent className="dashboard-card-content">
                    <Box className="card-body">
                      <Box className="card-icon">
                        <Skeleton variant="circular" width={40} height={40} />
                      </Box>
                      <Box className="card-content-text">
                        <Skeleton variant="text" width={60} height={32} />
                        <Skeleton variant="text" width={100} height={20} />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>

          {/* Second row - 3 cards */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            {[...Array(3)].map((_, index) => (
              <Box key={index} sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(33.333% - 16px)' } }}>
                <Card className="dashboard-card">
                  <CardContent className="dashboard-card-content">
                    <Box className="card-body">
                      <Box className="card-icon">
                        <Skeleton variant="circular" width={40} height={40} />
                      </Box>
                      <Box className="card-content-text">
                        <Skeleton variant="text" width={80} height={32} />
                        <Skeleton variant="text" width={120} height={20} />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>
      </div>
    );
  }

  return (
    <div className="homepage-container">
      {/* Breadcrumbs */}
      <Breadcrumbs 
        separator={<NavigateNextIcon fontSize="small" />} 
        aria-label="breadcrumb"
        sx={{ mb: 2 }}
      >
        <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500 }}>
          Inicio
        </Typography>
      </Breadcrumbs>

      <div className="homepage-header">
        <h1 className="homepage-title">
          Dashboard EcoGest
        </h1>
        <p className="homepage-subtitle">
          Resumen general del sistema de gestión y logística
        </p>
      </div>
      
      <Box className="dashboard-grid">
        {/* Primera fila - Cards pequeñas */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 3 }}>
          {/* Card Usuarios */}
          <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 12px)' } }}>
            <Card className="dashboard-card users-card">
              <CardContent className="dashboard-card-content">
                <Box className="card-header">
                  <PeopleIcon className="card-icon users-icon" />
                  <Chip 
                    label={`${getPercentage(stats.activeUsers, stats.totalUsers)}% activos`}
                    size="small"
                    color="success"
                    className="card-chip"
                  />
                </Box>
                <Box className="card-body">
                  <Typography variant="h4" className="card-number">
                    {stats.totalUsers}
                  </Typography>
                  <Typography variant="body2" className="card-label">
                    Usuarios Totales
                  </Typography>
                  <Typography variant="caption" className="card-sublabel">
                    {stats.activeUsers} usuarios activos
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Card Vehículos */}
          <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 12px)' } }}>
            <Card className="dashboard-card vehicles-card">
              <CardContent className="dashboard-card-content">
                <Box className="card-header">
                  <CarIcon className="card-icon vehicles-icon" />
                  <Chip 
                    label={`${getPercentage(stats.availableVehicles, stats.totalVehicles)}% disponibles`}
                    size="small"
                    color="info"
                    className="card-chip"
                  />
                </Box>
                <Box className="card-body">
                  <Typography variant="h4" className="card-number">
                    {stats.totalVehicles}
                  </Typography>
                  <Typography variant="body2" className="card-label">
                    Vehículos Totales
                  </Typography>
                  <Typography variant="caption" className="card-sublabel">
                    {stats.availableVehicles} disponibles • {stats.vehiclesInMaintenance} en mantenimiento
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Card Servicios Pendientes */}
          <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 12px)' } }}>
            <Card className="dashboard-card services-card">
              <CardContent className="dashboard-card-content">
                <Box className="card-header">
                  <ServicesIcon className="card-icon services-icon" />
                  <Chip 
                    label="Hoy"
                    size="small"
                    color="warning"
                    className="card-chip"
                  />
                </Box>
                <Box className="card-body">
                  <Typography variant="h4" className="card-number">
                    {stats.pendingServices}
                  </Typography>
                  <Typography variant="body2" className="card-label">
                    Servicios Pendientes
                  </Typography>
                  <Typography variant="caption" className="card-sublabel">
                    {stats.completedServicesToday} completados hoy
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Card Mantenimiento */}
          <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 12px)' } }}>
            <Card className="dashboard-card maintenance-card">
              <CardContent className="dashboard-card-content">
                <Box className="card-header">
                  <MaintenanceIcon className="card-icon maintenance-icon" />
                  <Chip 
                    label="Atención"
                    size="small"
                    color="error"
                    className="card-chip"
                  />
                </Box>
                <Box className="card-body">
                  <Typography variant="h4" className="card-number">
                    {stats.vehiclesInMaintenance}
                  </Typography>
                  <Typography variant="body2" className="card-label">
                    Vehículos en Mantenimiento
                  </Typography>
                  <Typography variant="caption" className="card-sublabel">
                    {stats.maintenanceScheduled} programados
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Segunda fila - Cards grandes */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {/* Card Ingresos Mensuales */}
          <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(33.333% - 16px)' } }}>
            <Card className="dashboard-card income-card">
              <CardContent className="dashboard-card-content">
                <Box className="card-header">
                  <TrendingUpIcon className="card-icon income-icon" />
                  <Chip 
                    label="Este mes"
                    size="small"
                    color="primary"
                    className="card-chip"
                  />
                </Box>
                <Box className="card-body">
                  <Typography variant="h4" className="card-number">
                    {formatCurrency(stats.monthlyIncome)}
                  </Typography>
                  <Typography variant="body2" className="card-label">
                    Ingresos Mensuales
                  </Typography>
                  <Typography variant="caption" className="card-sublabel">
                    {stats.activeServices} servicios activos
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Card Alertas */}
          <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(33.333% - 16px)' } }}>
            <Card className="dashboard-card alerts-card">
              <CardContent className="dashboard-card-content">
                <Box className="card-header">
                  <WarningIcon className="card-icon alerts-icon" />
                  <Chip 
                    label="Requiere atención"
                    size="small"
                    color="warning"
                    className="card-chip"
                  />
                </Box>
                <Box className="card-body">
                  <Typography variant="h4" className="card-number">
                    {stats.alerts}
                  </Typography>
                  <Typography variant="body2" className="card-label">
                    Alertas Activas
                  </Typography>
                  <Typography variant="caption" className="card-sublabel">
                    {stats.criticalAlerts} críticas
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Card Actividad Reciente */}
          <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(33.333% - 16px)' } }}>
            <Card className="dashboard-card activity-card">
              <CardContent className="dashboard-card-content">
                <Box className="card-header">
                  <TrendingUpIcon className="card-icon activity-icon" />
                  <Chip 
                    label="Últimos 7 días"
                    size="small"
                    color="info"
                    className="card-chip"
                  />
                </Box>
                <Box className="card-body">
                  <Typography variant="h4" className="card-number">
                    {stats.weeklyActivity}
                  </Typography>
                  <Typography variant="body2" className="card-label">
                    Actividad Semanal
                  </Typography>
                  <Typography variant="caption" className="card-sublabel">
                    {formatCurrency(stats.weeklyIncome)} en ingresos
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default HomePage;
