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
import { userTypeService } from '../../services/userTypeService';
import type { CreateUserTypeRequest, UpdateUserTypeRequest, UserType } from '../../services/userTypeService';
import './styles.css';

const UserTypesPage: React.FC = () => {
  const [userTypes, setUserTypes] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [editingUserType, setEditingUserType] = useState<UserType | null>(null);
  const [formData, setFormData] = useState<CreateUserTypeRequest>({
    name: '',
    description: '',
  });

  const { snackbar, showSnackbar, hideSnackbar } = useSnackbar();

  const loadUserTypes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userTypeService.getAll();
      setUserTypes(data);
    } catch (err) {
      console.error('Error loading user types:', err);
      setError('No se pudieron cargar los tipos de usuario. Por favor, intenta nuevamente.');
      showSnackbar('Error al cargar los tipos de usuario', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserTypes();
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
      if (editingUserType) {
        await userTypeService.update(editingUserType.id, formData as UpdateUserTypeRequest);
        showSnackbar('Tipo de usuario actualizado correctamente', 'success');
      } else {
        await userTypeService.create(formData);
        showSnackbar('Tipo de usuario creado correctamente', 'success');
      }
      
      await loadUserTypes();
      handleCloseDialog();
    } catch (err) {
      console.error('Error saving user type:', err);
      showSnackbar('Error al guardar el tipo de usuario', 'error');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este tipo de usuario?')) {
      try {
        await userTypeService.delete(id);
        showSnackbar('Tipo de usuario eliminado correctamente', 'success');
        await loadUserTypes();
      } catch (err) {
        console.error('Error deleting user type:', err);
        showSnackbar('Error al eliminar el tipo de usuario', 'error');
      }
    }
  };

  const handleToggleActive = async (id: number, currentStatus: boolean) => {
    try {
      await userTypeService.toggleActive(id, !currentStatus);
      showSnackbar('Estado actualizado', 'success');
      await loadUserTypes();
    } catch (err) {
      console.error('Error toggling user type status:', err);
      showSnackbar('Error al cambiar el estado', 'error');
    }
  };

  const handleOpenDialog = (userType?: UserType) => {
    if (userType) {
      setEditingUserType(userType);
      setFormData({
        name: userType.name,
        description: userType.description,
      });
    } else {
      setEditingUserType(null);
      setFormData({
        name: '',
        description: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingUserType(null);
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
      <div className="user-types-page-container">
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
    <div className="user-types-page-container">
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
          Tipos de Usuario
        </Typography>
      </Breadcrumbs>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <div>
          <h1 className="user-types-page-title">Tipos de Usuario</h1>
          <p className="user-types-page-subtitle">Gestiona los tipos de usuario disponibles</p>
        </div>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          className="create-button"
        >
          Nuevo Tipo
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
            {userTypes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} sx={{ textAlign: 'center', py: 8 }}>
                  <Typography variant="body1" color="text.secondary">
                    No hay tipos de usuario registrados
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              userTypes.map((userType) => (
                <TableRow key={userType.id} hover>
                  <TableCell>{userType.id}</TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{userType.name}</TableCell>
                  <TableCell>{userType.description}</TableCell>
                  <TableCell>
                    <Chip
                      label={userType.active ? 'Activo' : 'Inactivo'}
                      color={userType.active ? 'success' : 'error'}
                      size="small"
                      variant="filled"
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title="Editar">
                        <IconButton
                          size="small"
                          onClick={() => handleOpenDialog(userType)}
                          className="edit-button"
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Toggle Status">
                        <IconButton
                          size="small"
                          onClick={() => handleToggleActive(userType.id, userType.active)}
                          className="toggle-button"
                        >
                          {userType.active ? <ToggleOffIcon fontSize="small" /> : <ToggleOnIcon fontSize="small" />}
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar">
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(userType.id)}
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
          {editingUserType ? 'Editar Tipo de Usuario' : 'Nuevo Tipo de Usuario'}
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
              {editingUserType ? 'Actualizar' : 'Crear'}
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

export default UserTypesPage;
