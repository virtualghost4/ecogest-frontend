import React from 'react';
import {
  Typography,
  Box,
  Paper,
  Breadcrumbs,
  Link,
} from '@mui/material';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';
import './styles.css';

const EmployeesPage: React.FC = () => {
  return (
    <div className="employees-page-container">
      {/* Breadcrumbs */}
      <Breadcrumbs 
        separator={<NavigateNextIcon fontSize="small" />} 
        aria-label="breadcrumb"
        sx={{ mb: 2 }}
      >
        <Link underline="hover" color="inherit" href="/">
          Inicio
        </Link>
        <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500 }}>
          Empleados
        </Typography>
      </Breadcrumbs>

      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600, color: '#1976d2', mb: 1 }}>
            Empleados
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Gestión de empleados y personal del sistema
          </Typography>
        </Box>
      </Box>

      {/* Content */}
      <Paper sx={{ p: 4, borderRadius: 2, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" sx={{ mb: 2, color: '#666' }}>
            Módulo de Empleados
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Esta sección está en desarrollo. Pronto podrás gestionar todos los empleados y personal del sistema.
          </Typography>
        </Box>
      </Paper>
    </div>
  );
};

export default EmployeesPage;
