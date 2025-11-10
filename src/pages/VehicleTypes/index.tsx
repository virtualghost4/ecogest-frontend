import React from 'react';
import {
  Typography,
  Box,
  Paper,
  Alert,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Breadcrumbs,
  Link,
  Skeleton,
} from '@mui/material';
import { NavigateNext as NavigateNextIcon, Refresh, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useVehicleTypes } from '../../hooks';
import './styles.css';

const VehicleTypes: React.FC = () => {
  const {
    vehicleTypes,
    loading,
    error,
    refreshVehicleTypes
  } = useVehicleTypes();

  // Skeleton component for table rows
  const TableSkeleton = () => (
    <>
      {[...Array(5)].map((_, index) => (
        <TableRow key={index}>
          <TableCell><Skeleton variant="text" width={40} /></TableCell>
          <TableCell><Skeleton variant="text" width={120} /></TableCell>
          <TableCell><Skeleton variant="text" width={200} /></TableCell>
          <TableCell><Skeleton variant="rectangular" width={120} height={24} /></TableCell>
          <TableCell><Skeleton variant="rectangular" width={80} height={24} /></TableCell>
          <TableCell>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Skeleton variant="circular" width={32} height={32} />
              <Skeleton variant="circular" width={32} height={32} />
            </Box>
          </TableCell>
        </TableRow>
      ))}
    </>
  );

  if (loading) {
    return (
      <div className="vehicle-types-page-container">
        {/* Breadcrumbs skeleton */}
        <Box sx={{ mb: 2 }}>
          <Skeleton variant="text" width={300} height={24} />
        </Box>

        {/* Header skeleton */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Skeleton variant="text" width={200} height={32} sx={{ mb: 1 }} />
            <Skeleton variant="text" width={350} height={20} />
          </Box>
          <Skeleton variant="rectangular" width={120} height={36} />
        </Box>

        {/* Table skeleton */}
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ backgroundColor: '#f8f9fa' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>Nombre</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>Descripción</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>Licencia</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>Estado</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableSkeleton />
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }

  return (
    <div className="vehicle-types-page-container">
      {/* Breadcrumbs */}
      <Breadcrumbs 
        separator={<NavigateNextIcon fontSize="small" />} 
        aria-label="breadcrumb"
        sx={{ mb: 2 }}
      >
        <Link 
          component="button"
          variant="body2" 
          onClick={() => console.log('Navigate to home')}
          underline="hover"
          sx={{ color: '#1976d2' }}
        >
          Inicio
        </Link>
        <Link 
          component="button"
          variant="body2" 
          onClick={() => console.log('Navigate to vehicles')}
          underline="hover"
          sx={{ color: '#1976d2' }}
        >
          Vehículos
        </Link>
        <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500 }}>
          Tipos de Vehículos
        </Typography>
      </Breadcrumbs>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <div>
          <h1 className="vehicle-types-page-title">Tipos de Vehículos</h1>
          <p className="vehicle-types-page-subtitle">Gestiona los diferentes tipos de vehículos del sistema</p>
        </div>
        <Button
          variant="outlined"
          startIcon={<Refresh />}
          onClick={refreshVehicleTypes}
          disabled={loading}
        >
          Actualizar
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: '#f8f9fa' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>Descripción</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>Licencia</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>Estado</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicleTypes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} sx={{ textAlign: 'center', py: 8 }}>
                  <Typography variant="body1" color="text.secondary">
                    No hay tipos de vehículos registrados
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              vehicleTypes.map((vehicleType) => (
                <TableRow key={vehicleType.id} hover>
                  <TableCell>{vehicleType.id}</TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{vehicleType.name}</TableCell>
                  <TableCell>{vehicleType.description}</TableCell>
                  <TableCell>
                    <Chip
                      label={vehicleType.requiresLicense ? 'Requiere licencia' : 'No requiere licencia'}
                      color={vehicleType.requiresLicense ? 'primary' : 'default'}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={vehicleType.active ? 'Activo' : 'Inactivo'}
                      color={vehicleType.active ? 'success' : 'error'}
                      size="small"
                      variant="filled"
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title="Editar">
                        <IconButton
                          size="small"
                          onClick={() => console.log('Editar:', vehicleType.id)}
                          className="edit-button"
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar">
                        <IconButton
                          size="small"
                          onClick={() => console.log('Eliminar:', vehicleType.id)}
                          className="delete-button"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default VehicleTypes;
