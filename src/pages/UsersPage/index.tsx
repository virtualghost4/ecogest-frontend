import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  CircularProgress,
  Alert,
  Breadcrumbs,
  Link,
  Skeleton,
} from '@mui/material';
import {
  NavigateNext as NavigateNextIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { API_BASE_URL } from '../../config/api';
import './styles.css';

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  userType: string;
  roleName: string;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Obtener usuarios desde la API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get(`${API_BASE_URL}/users`);
        setUsers(response.data);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('No se pudieron cargar los usuarios. Por favor, intenta nuevamente.');
        
        // Si hay error, cargar datos de ejemplo como fallback
        const fallbackUsers: User[] = [
          {
            id: 2,
            email: "ignacioguardafuentes@gmail.com",
            firstName: "Nacho",
            lastName: "Fuentes",
            userType: "EMPLOYEE",
            roleName: "admin",
            enabled: true,
            createdAt: "2025-10-12T01:10:26Z",
            updatedAt: "2025-10-12T01:10:36Z"
          }
        ];
        setUsers(fallbackUsers);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleCreateUser = () => {
    // TODO: Implementar creación de usuario
    console.log('Crear usuario');
  };

  const handleEditUser = (userId: number) => {
    // TODO: Implementar edición de usuario
    console.log('Editar usuario:', userId);
  };

  const handleDeleteUser = (userId: number) => {
    // TODO: Implementar eliminación de usuario
    console.log('Eliminar usuario:', userId);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Skeleton component for table rows
  const TableSkeleton = () => (
    <>
      {[...Array(5)].map((_, index) => (
        <TableRow key={index}>
          <TableCell><Skeleton variant="text" width={40} /></TableCell>
          <TableCell><Skeleton variant="text" width={150} /></TableCell>
          <TableCell><Skeleton variant="text" width={120} /></TableCell>
          <TableCell><Skeleton variant="text" width={100} /></TableCell>
          <TableCell><Skeleton variant="text" width={80} /></TableCell>
          <TableCell><Skeleton variant="text" width={120} /></TableCell>
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
      <div className="users-page-container">
        {/* Breadcrumbs skeleton */}
        <Box sx={{ mb: 2 }}>
          <Skeleton variant="text" width={150} height={24} />
        </Box>

        {/* Header skeleton */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Skeleton variant="text" width={120} height={32} sx={{ mb: 1 }} />
            <Skeleton variant="text" width={250} height={20} />
          </Box>
          <Skeleton variant="rectangular" width={150} height={36} />
        </Box>

        {/* Table skeleton */}
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ backgroundColor: '#f8f9fa' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>Nombre</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>Apellido</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>Teléfono</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>Rol</TableCell>
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
    <div className="users-page-container">
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
          Usuarios
        </Typography>
      </Breadcrumbs>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <div>
          <h1 className="users-page-title">
            Usuarios
          </h1>
          <p className="users-page-subtitle">
            Gestiona los usuarios del sistema
          </p>
        </div>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateUser}
          className="create-user-button"
        >
          Nuevo Usuario
        </Button>
      </Box>
      
      {/* Estado de carga */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }}>
          <CircularProgress size={40} />
          <Typography variant="body1" sx={{ ml: 2, color: 'text.secondary' }}>
            Cargando usuarios...
          </Typography>
        </Box>
      )}
      
      {/* Mensaje de error */}
      {error && (
        <Alert 
          severity="error" 
          sx={{ mb: 3 }}
          action={
            <Button color="inherit" size="small" onClick={() => window.location.reload()}>
              Reintentar
            </Button>
          }
        >
          {error}
        </Alert>
      )}
      
      {/* Tabla de usuarios */}
      {!loading && !error && (
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ backgroundColor: '#f8f9fa' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>Nombre</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>Rol</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>Estado</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>Creado</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="body1" color="text.secondary">
                      No hay usuarios registrados
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {user.firstName} {user.lastName}
                      </Typography>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Chip 
                        label={user.roleName} 
                        size="small" 
                        color="primary" 
                        variant="outlined"
                        className="role-chip"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={user.enabled ? 'Activo' : 'Inactivo'} 
                        size="small" 
                        color={user.enabled ? 'success' : 'error'}
                        variant="filled"
                        className={user.enabled ? 'status-active' : 'status-inactive'}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {formatDate(user.createdAt)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Editar">
                          <IconButton 
                            size="small" 
                            onClick={() => handleEditUser(user.id)}
                            className="edit-button"
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar">
                          <IconButton 
                            size="small" 
                            onClick={() => handleDeleteUser(user.id)}
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
      )}
    </div>
  );
};

export default UsersPage;
