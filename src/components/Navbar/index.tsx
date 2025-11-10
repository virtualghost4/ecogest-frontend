import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box
} from '@mui/material';
import {
  LocalShipping,
  DirectionsCar,
  Router as RouterIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import PingButton from '../PingButton';
import './Navbar.css';

interface NavbarProps {
  title?: string;
  subtitle?: string;
}

const Navbar: React.FC<NavbarProps> = ({ 
  title = 'EcoGest', 
  subtitle = 'Sistema de gestión de vehículos y logística' 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Detectar scroll para cambiar estilo
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    {
      path: '/vehicle-types',
      label: 'Tipos de Vehículos',
      icon: <LocalShipping className="navbar-button-icon" />,
      variant: 'outlined' as const
    },
    {
      path: '/vehicles',
      label: 'Vehículos',
      icon: <DirectionsCar className="navbar-button-icon" />,
      variant: 'contained' as const
    }
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <AppBar 
      position="sticky" 
      className={`navbar-appbar ${scrolled ? 'scrolled' : ''}`}
    >
      <Toolbar className="navbar-toolbar">
        {/* Brand/Logo */}
        <Box 
          className="navbar-brand" 
          onClick={() => navigate('/')}
        >
          <Box className="navbar-logo">
            <RouterIcon />
          </Box>
          <Box>
            <Typography variant="h6" className="navbar-title">
              {title}
            </Typography>
            <Typography variant="caption" className="navbar-subtitle">
              {subtitle}
            </Typography>
          </Box>
        </Box>

        {/* Navegación central */}
        <Box className="navbar-nav">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant={item.variant}
              className={`navbar-nav-button ${isActivePath(item.path) ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
              startIcon={item.icon}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {/* Acciones derecha */}
        <Box className="navbar-actions">
          <PingButton className="navbar-ping-button" />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
