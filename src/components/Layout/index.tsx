import React, { useState, useEffect } from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography, useTheme, useMediaQuery } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import Sidenav from '../Sidenav';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, title = 'EcoGest' }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const [sidenavOpen, setSidenavOpen] = useState(false); // Siempre empieza cerrado en móvil

  useEffect(() => {
    // Solo actualizar el estado inicial cuando cambia de móvil a desktop
    if (isDesktop) {
      setSidenavOpen(true); // En desktop siempre abierto
    } else {
      setSidenavOpen(false); // En móvil siempre cerrado inicialmente
    }
  }, [isDesktop]);

  const handleSidenavToggle = () => {
    if (!isDesktop) {
      setSidenavOpen(!sidenavOpen);
    }
  };

  const handleSidenavClose = () => {
    if (!isDesktop) {
      setSidenavOpen(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', maxWidth: '100vw', overflow: 'hidden' }}>
      {/* Sidenav - Altura fija 100vh */}
      <Sidenav open={sidenavOpen} onClose={handleSidenavClose} isDesktop={isDesktop} />

      {/* Main Content - Scroll cuando excede altura */}
      <Box sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column',
        maxWidth: isDesktop ? 'calc(100vw - 280px)' : '100vw',
        height: '100vh',
        overflow: 'hidden'
      }}>
        {/* Top Bar - Solo mostrar en móvil */}
        {!isDesktop && (
          <AppBar
            position="static"
            elevation={1}
            sx={{
              bgcolor: 'background.paper',
              color: 'text.primary',
              borderBottom: `1px solid ${theme.palette.divider}`,
              flexShrink: 0, // No encoger
            }}
          >
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleSidenavToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 500 }}>
                {title}
              </Typography>
            </Toolbar>
          </AppBar>
        )}

        {/* Page Content - Scroll interno */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: '#ffffff',
            height: isDesktop ? '100vh' : 'calc(100vh - 64px)',
            overflow: 'auto', // Scroll cuando el contenido excede
            maxWidth: '100%',
            width: '100%',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
