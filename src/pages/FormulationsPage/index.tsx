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
import { formulationService } from '../../services/formulationService';
import type { CreateFormulationRequest, UpdateFormulationRequest, Formulation } from '../../services/formulationService';
import './styles.css';

const FormulationsPage: React.FC = () => {
  const [formulations, setFormulations] = useState<Formulation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [editingFormulation, setEditingFormulation] = useState<Formulation | null>(null);
  const [formData, setFormData] = useState<CreateFormulationRequest>({
    name: '',
    description: '',
  });

  const { snackbar, showSnackbar, hideSnackbar } = useSnackbar();

  const loadFormulations = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await formulationService.getAll();
      setFormulations(data);
    } catch (err) {
      console.error('Error loading formulations:', err);
      setError('No se pudieron cargar las formulaciones. Por favor, intenta nuevamente.');
      showSnackbar('Error al cargar las formulaciones', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFormulations();
  }, []);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name as string]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingFormulation) {
        await formulationService.update(editingFormulation.id, formData as UpdateFormulationRequest);
        showSnackbar('Formulación actualizada correctamente', 'success');
      } else {
        await formulationService.create(formData);
        showSnackbar('Formulación creada correctamente', 'success');
      }
      
      await loadFormulations();
      handleCloseDialog();
    } catch (err) {
      console.error('Error saving formulation:', err);
      showSnackbar('Error al guardar la formulación', 'error');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta formulación?')) {
      try {
        await formulationService.delete(id);
        showSnackbar('Formulación eliminada correctamente', 'success');
        await loadFormulations();
      } catch (err) {
        console.error('Error deleting formulation:', err);
        showSnackbar('Error al eliminar la formulación', 'error');
      }
    }
  };

  const handleToggleActive = async (id: number, currentStatus: boolean) => {
    try {
      await formulationService.toggleActive(id, !currentStatus);
      showSnackbar('Estado actualizado', 'success');
      await loadFormulations();
    } catch (err) {
      console.error('Error toggling formulation status:', err);
      showSnackbar('Error al cambiar el estado', 'error');
    }
  };

  const handleOpenDialog = (formulation?: Formulation) => {
    if (formulation) {
      setEditingFormulation(formulation);
      setFormData({
        name: formulation.name,
        description: formulation.description,
      });
    } else {
      setEditingFormulation(null);
      setFormData({
        name: '',
        description: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingFormulation(null);
  };

  const TableSkeleton = () => (
    <>
      {[...Array(5)].map((_, index) => (
        <TableRow key={index}>
          <TableCell><Skeleton variant="text" width={40} /></TableCell>
          <TableCell><Skeleton variant="text" width={150} /></TableCell>
          <TableCell><Skeleton variant="text" width={200} /></TableCell>
          <TableCell><Skeleton variant="rectangular" width={80} height={24} /></TableCell>
          <TableCell>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Skeleton variant="circular" width={32} height={32} />
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
      <div className="formulations-page-container">
        <Box sx={{ mb: 2 }}>
          <Skeleton variant="text" width={300} height={24} />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Skeleton variant="text" width={200} height={32} sx={{ mb: 1 }} />
            <Skeleton variant="text" width={350} height={20} />
          </Box>
          <Skeleton variant="rectangular" width={150} height={36} />
        </Box>

        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ backgroundColor: '#f8f9fa' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>Nombre</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>Descripción</TableCell>
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
    <div className="formulations-page-container">
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
          Formulaciones
        </Typography>
      </Breadcrumbs>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <div>
          <h1 className="formulations-page-title">Formulaciones</h1>
          <p className="formulations-page-subtitle">Gestiona las formulaciones disponibles</p>
        </div>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          className="create-button"
        >
          Nueva Formulación
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
              <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>Estado</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formulations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} sx={{ textAlign: 'center', py: 8 }}>
                  <Typography variant="body1" color="text.secondary">
                    No hay formulaciones registradas
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              formulations.map((formulation) => (
                <TableRow key={formulation.id} hover>
                  <TableCell>{formulation.id}</TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{formulation.name}</TableCell>
                  <TableCell>{formulation.description}</TableCell>
                  <TableCell>
                    <Chip
                      label={formulation.active ? 'Activo' : 'Inactivo'}
                      color={formulation.active ? 'success' : 'error'}
                      size="small"
                      variant="filled"
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title="Editar">
                        <IconButton
                          size="small"
                          onClick={() => handleOpenDialog(formulation)}
                          className="edit-button"
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Toggle Status">
                        <IconButton
                          size="small"
                          onClick={() => handleToggleActive(formulation.id, formulation.active)}
                          className="toggle-button"
                        >
                          {formulation.active ? <ToggleOffIcon fontSize="small" /> : <ToggleOnIcon fontSize="small" />}
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar">
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(formulation.id)}
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

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingFormulation ? 'Editar Formulación' : 'Nueva Formulación'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
              <TextField
                name="name"
                label="Nombre"
                value={formData.name}
                onChange={handleInputChange}
                required
                fullWidth
              />
              <TextField
                name="description"
                label="Descripción"
                value={formData.description}
                onChange={handleInputChange}
                required
                fullWidth
                multiline
                rows={3}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button type="submit" variant="contained">
              {editingFormulation ? 'Actualizar' : 'Crear'}
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

export default FormulationsPage;
