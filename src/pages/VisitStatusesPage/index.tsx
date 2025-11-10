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
import { visitStatusService } from '../../services/visitStatusService';
import type { CreateVisitStatusRequest, UpdateVisitStatusRequest, VisitStatus } from '../../services/visitStatusService';
import './styles.css';

const VisitStatusesPage: React.FC = () => {
  const [visitStatuses, setVisitStatuses] = useState<VisitStatus[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [editingVisitStatus, setEditingVisitStatus] = useState<VisitStatus | null>(null);
  const [formData, setFormData] = useState<CreateVisitStatusRequest>({
    name: '',
    description: '',
  });

  const { snackbar, showSnackbar, hideSnackbar } = useSnackbar();

  const loadVisitStatuses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await visitStatusService.getAll();
      setVisitStatuses(data);
    } catch (err) {
      console.error('Error loading visit statuses:', err);
      setError('No se pudieron cargar los estados de visita. Por favor, intenta nuevamente.');
      showSnackbar('Error al cargar los estados de visita', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVisitStatuses();
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
      if (editingVisitStatus) {
        await visitStatusService.update(editingVisitStatus.id, formData as UpdateVisitStatusRequest);
        showSnackbar('Estado de visita actualizado correctamente', 'success');
      } else {
        await visitStatusService.create(formData);
        showSnackbar('Estado de visita creado correctamente', 'success');
      }
      
      await loadVisitStatuses();
      handleCloseDialog();
    } catch (err) {
      console.error('Error saving visit status:', err);
      showSnackbar('Error al guardar el estado de visita', 'error');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este estado de visita?')) {
      try {
        await visitStatusService.delete(id);
        showSnackbar('Estado de visita eliminado correctamente', 'success');
        await loadVisitStatuses();
      } catch (err) {
        console.error('Error deleting visit status:', err);
        showSnackbar('Error al eliminar el estado de visita', 'error');
      }
    }
  };

  const handleToggleActive = async (id: number, currentStatus: boolean) => {
    try {
      await visitStatusService.toggleActive(id, !currentStatus);
      showSnackbar('Estado actualizado', 'success');
      await loadVisitStatuses();
    } catch (err) {
      console.error('Error toggling visit status status:', err);
      showSnackbar('Error al cambiar el estado', 'error');
    }
  };

  const handleOpenDialog = (visitStatus?: VisitStatus) => {
    if (visitStatus) {
      setEditingVisitStatus(visitStatus);
      setFormData({
        name: visitStatus.name,
        description: visitStatus.description,
      });
    } else {
      setEditingVisitStatus(null);
      setFormData({
        name: '',
        description: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingVisitStatus(null);
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
      <div className="visit-statuses-page-container">
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
    <div className="visit-statuses-page-container">
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
          Estados de Visita
        </Typography>
      </Breadcrumbs>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <div>
          <h1 className="visit-statuses-page-title">Estados de Visita</h1>
          <p className="visit-statuses-page-subtitle">Gestiona los estados de visita disponibles</p>
        </div>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          className="create-button"
        >
          Nuevo Estado
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
            {visitStatuses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} sx={{ textAlign: 'center', py: 8 }}>
                  <Typography variant="body1" color="text.secondary">
                    No hay estados de visita registrados
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              visitStatuses.map((visitStatus) => (
                <TableRow key={visitStatus.id} hover>
                  <TableCell>{visitStatus.id}</TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{visitStatus.name}</TableCell>
                  <TableCell>{visitStatus.description}</TableCell>
                  <TableCell>
                    <Chip
                      label={visitStatus.active ? 'Activo' : 'Inactivo'}
                      color={visitStatus.active ? 'success' : 'error'}
                      size="small"
                      variant="filled"
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title="Editar">
                        <IconButton
                          size="small"
                          onClick={() => handleOpenDialog(visitStatus)}
                          className="edit-button"
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Toggle Status">
                        <IconButton
                          size="small"
                          onClick={() => handleToggleActive(visitStatus.id, visitStatus.active)}
                          className="toggle-button"
                        >
                          {visitStatus.active ? <ToggleOffIcon fontSize="small" /> : <ToggleOnIcon fontSize="small" />}
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar">
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(visitStatus.id)}
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
          {editingVisitStatus ? 'Editar Estado de Visita' : 'Nuevo Estado de Visita'}
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
              {editingVisitStatus ? 'Actualizar' : 'Crear'}
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

export default VisitStatusesPage;
