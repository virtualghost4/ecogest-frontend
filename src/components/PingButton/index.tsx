import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from 'axios';

interface PingButtonProps {
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  size?: 'small' | 'medium' | 'large';
  children?: React.ReactNode;
  className?: string;
}

const PingButton: React.FC<PingButtonProps> = ({
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  children = 'Hacer Ping',
  className
}) => {
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
  }>({
    open: false,
    message: '',
    severity: 'info'
  });

  const [loading, setLoading] = useState(false);

  const handlePing = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/ping', {
        headers: {
          'Accept': 'text/plain',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        withCredentials: false
      });
      
      setSnackbar({
        open: true,
        message: `Respuesta del servidor: ${response.data || 'OK'}`,
        severity: 'success'
      });
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: `Error: ${error.response?.status} - ${error.response?.data?.message || error.message || 'No se pudo conectar al servidor'}`,
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <>
      <Button
        variant={variant}
        color={color}
        size={size}
        onClick={handlePing}
        disabled={loading}
        className={className}
      >
        {loading ? 'Conectando...' : children}
      </Button>
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default PingButton;
