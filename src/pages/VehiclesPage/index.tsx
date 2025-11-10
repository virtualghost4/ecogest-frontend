import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  Alert,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Breadcrumbs,
  Link,
  Skeleton,
} from '@mui/material';
import {
  NavigateNext as NavigateNextIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ToggleOn as ToggleOnIcon,
  ToggleOff as ToggleOffIcon,
} from '@mui/icons-material';
import { useSnackbar } from '../../hooks/useSnackbar';
import { CustomSnackbar } from '../../components/Snackbar';
import { vehicleService } from '../../services/vehicleService';
import { vehicleTypeService } from '../../services/vehicleTypeService';
import type { CreateVehicleRequest, UpdateVehicleRequest } from '../../services/vehicleService';
import type { Vehicle } from '../../types/vehicle';
import type { VehicleType } from '../../hooks/useVehicleTypes';
import './styles.css';

const VehiclesPage: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [formData, setFormData] = useState<CreateVehicleRequest>({
    licensePlate: '',
    brand: '',
    model: '',
    color: '',
    year: new Date().getFullYear(),
    vehicleTypeId: 1,
    status: 'available',
    loadCapacity: 0,
    maintenanceDate: '',
    insuranceExpiry: '',
    active: true,
  });

  const { snackbar, showSnackbar, hideSnackbar } = useSnackbar();

  // Cargar vehículos
  const loadVehicles = async () => {
    try {
      setLoading(true);
      setError(null);
      const [vehiclesData, vehicleTypesData] = await Promise.all([
        vehicleService.getAll(),
        vehicleTypeService.getAll(),
      ]);
      setVehicles(vehiclesData);
      setVehicleTypes(vehicleTypesData);
    } catch (err) {
      console.error('Error loading vehicles:', err);
      setError('No se pudieron cargar los vehículos. Por favor, intenta nuevamente.');
      showSnackbar('Error al cargar los vehículos', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  // Manejo del formulario
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name as string]: value,
    }));
  };

  // Crear/Actualizar vehículo
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingVehicle) {
        await vehicleService.update(editingVehicle.id, formData as UpdateVehicleRequest);
        showSnackbar('Vehículo actualizado correctamente', 'success');
      } else {
        await vehicleService.create(formData);
        showSnackbar('Vehículo creado correctamente', 'success');
      }
      
      await loadVehicles();
      handleCloseDialog();
    } catch (err) {
      console.error('Error saving vehicle:', err);
      showSnackbar('Error al guardar el vehículo', 'error');
    }
  };

  // Eliminar vehículo
  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este vehículo?')) {
      try {
        await vehicleService.delete(id);
        showSnackbar('Vehículo eliminado correctamente', 'success');
        await loadVehicles();
      } catch (err) {
        console.error('Error deleting vehicle:', err);
        showSnackbar('Error al eliminar el vehículo', 'error');
      }
    }
  };

  // Toggle status
  const handleToggleStatus = async (id: number) => {
    try {
      await vehicleService.toggleStatus(id);
      showSnackbar('Estado del vehículo actualizado', 'success');
      await loadVehicles();
    } catch (err) {
      console.error('Error toggling vehicle status:', err);
      showSnackbar('Error al cambiar el estado del vehículo', 'error');
    }
  };

  // Dialog handlers
  const handleOpenDialog = (vehicle?: Vehicle) => {
    if (vehicle) {
      setEditingVehicle(vehicle);
      setFormData({
        licensePlate: vehicle.licensePlate,
        brand: vehicle.brand,
        model: vehicle.model,
        color: vehicle.color,
        year: vehicle.year,
        vehicleTypeId: vehicle.vehicleTypeId,
        status: vehicle.status,
        loadCapacity: vehicle.loadCapacity,
        maintenanceDate: vehicle.maintenanceDate,
        insuranceExpiry: vehicle.insuranceExpiry,
        active: vehicle.active,
      });
    } else {
      setEditingVehicle(null);
      setFormData({
        licensePlate: '',
        brand: '',
        model: '',
        color: '',
        year: new Date().getFullYear(),
        vehicleTypeId: 1,
        status: 'available',
        loadCapacity: 0,
        maintenanceDate: '',
        insuranceExpiry: '',
        active: true,
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingVehicle(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'success';
      case 'in_maintenance': return 'warning';
      case 'in_use': return 'info';
      case 'inactive': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Disponible';
      case 'in_maintenance': return 'En Mantenimiento';
      case 'in_use': return 'En Uso';
      case 'inactive': return 'Inactivo';
      default: return status;
    }
  };

  // Skeleton component for table rows
  const TableSkeleton = () => (
    <>
      {[...Array(5)].map((_, index) => (
        <TableRow key={index}>
          <TableCell><Skeleton variant="text" width={40} /></TableCell>
          <TableCell><Skeleton variant="text" width={120} /></TableCell>
          <TableCell><Skeleton variant="text" width={80} /></TableCell>
          <TableCell><Skeleton variant="text" width={100} /></TableCell>
          <TableCell><Skeleton variant="text" width={60} /></TableCell>
          <TableCell><Skeleton variant="text" width={80} /></TableCell>
          <TableCell><Skeleton variant="text" width={60} /></TableCell>
          <TableCell><Skeleton variant="text" width={60} /></TableCell>
          <TableCell><Skeleton variant="text" width={80} /></TableCell>
          <TableCell><Skeleton variant="text" width={80} /></TableCell>
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
      <div className="vehicles-page-container">
        {/* Breadcrumbs skeleton */}
        <Box sx={{ mb: 2 }}>
          <Skeleton variant="text" width={200} height={24} />
        </Box>

        {/* Header skeleton */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Skeleton variant="text" width={150} height={32} sx={{ mb: 1 }} />
            <Skeleton variant="text" width={300} height={20} />
          </Box>
          <Skeleton variant="rectangular" width={150} height={36} />
        </Box>

        {/* Table skeleton */}
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ backgroundColor: '#f8f9fa' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>Placa</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>Marca</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>Modelo</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>Color</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>Año</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>Tipo</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>Estado</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>Capacidad</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>Activo</TableCell>
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
    <div className="vehicles-page-container">
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
        <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500 }}>
          Vehículos
        </Typography>
      </Breadcrumbs>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <div>
          <h1 className="vehicles-page-title">Vehículos</h1>
          <p className="vehicles-page-subtitle">Gestiona la flota de vehículos disponible</p>
        </div>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          className="create-vehicle-button"
        >
          Nuevo Vehículo
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
              <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>Patente</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>Marca</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>Modelo</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>Tipo</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>Año</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>Estado</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>Activo</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} sx={{ textAlign: 'center', py: 8 }}>
                  <Typography variant="body1" color="text.secondary">
                    No hay vehículos registrados
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              vehicles.map((vehicle) => (
                <TableRow key={vehicle.id} hover>
                  <TableCell>{vehicle.id}</TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{vehicle.licensePlate}</TableCell>
                  <TableCell>{vehicle.brand}</TableCell>
                  <TableCell>{vehicle.model}</TableCell>
                  <TableCell>
                    <Chip
                      label={vehicle.vehicleTypeName}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{vehicle.year}</TableCell>
                  <TableCell>
                    <Chip
                      label={getStatusText(vehicle.status)}
                      size="small"
                      color={getStatusColor(vehicle.status) as any}
                      variant="filled"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={vehicle.active ? 'Activo' : 'Inactivo'}
                      size="small"
                      color={vehicle.active ? 'success' : 'error'}
                      variant="filled"
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title="Editar">
                        <IconButton
                          size="small"
                          onClick={() => handleOpenDialog(vehicle)}
                          className="edit-button"
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Toggle Status">
                        <IconButton
                          size="small"
                          onClick={() => handleToggleStatus(vehicle.id)}
                          className="toggle-button"
                        >
                          {vehicle.active ? <ToggleOffIcon fontSize="small" /> : <ToggleOnIcon fontSize="small" />}
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar">
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(vehicle.id)}
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

      {/* Dialog para crear/editar */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingVehicle ? 'Editar Vehículo' : 'Nuevo Vehículo'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 1 }}>
              <TextField
                name="licensePlate"
                label="Patente"
                value={formData.licensePlate}
                onChange={handleInputChange}
                required
                sx={{ flex: '1 1 45%' }}
              />
              <TextField
                name="brand"
                label="Marca"
                value={formData.brand}
                onChange={handleInputChange}
                required
                sx={{ flex: '1 1 45%' }}
              />
              <TextField
                name="model"
                label="Modelo"
                value={formData.model}
                onChange={handleInputChange}
                required
                sx={{ flex: '1 1 45%' }}
              />
              <TextField
                name="color"
                label="Color"
                value={formData.color}
                onChange={handleInputChange}
                required
                sx={{ flex: '1 1 45%' }}
              />
              <TextField
                name="year"
                label="Año"
                type="number"
                value={formData.year}
                onChange={handleInputChange}
                required
                sx={{ flex: '1 1 45%' }}
              />
              <TextField
                name="loadCapacity"
                label="Capacidad de Carga"
                type="number"
                value={formData.loadCapacity}
                onChange={handleInputChange}
                required
                sx={{ flex: '1 1 45%' }}
              />
              <FormControl sx={{ flex: '1 1 45%' }}>
                <InputLabel>Tipo de Vehículo</InputLabel>
                <Select
                  name="vehicleTypeId"
                  value={formData.vehicleTypeId}
                  onChange={handleInputChange}
                  label="Tipo de Vehículo"
                >
                  {vehicleTypes.map((type) => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ flex: '1 1 45%' }}>
                <InputLabel>Estado</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  label="Estado"
                >
                  <MenuItem value="available">Disponible</MenuItem>
                  <MenuItem value="in_maintenance">En Mantenimiento</MenuItem>
                  <MenuItem value="in_use">En Uso</MenuItem>
                  <MenuItem value="inactive">Inactivo</MenuItem>
                </Select>
              </FormControl>
              <TextField
                name="maintenanceDate"
                label="Fecha Mantenimiento"
                type="date"
                value={formData.maintenanceDate}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                sx={{ flex: '1 1 45%' }}
              />
              <TextField
                name="insuranceExpiry"
                label="Vencimiento Seguro"
                type="date"
                value={formData.insuranceExpiry}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                sx={{ flex: '1 1 45%' }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button type="submit" variant="contained">
              {editingVehicle ? 'Actualizar' : 'Crear'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={hideSnackbar}
      />
    </div>
  );
};

export default VehiclesPage;
