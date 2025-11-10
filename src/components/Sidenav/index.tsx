import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  IconButton,
  Divider,
  Avatar,
  useTheme,
  alpha,
  Collapse,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  DirectionsCar as VehicleTypesIcon,
  LocalShipping as VehiclesIcon,
  People as UsersIcon,
  Description as CertificatesIcon,
  Assessment as ReportsIcon,
  Receipt as InvoicesIcon,
  Work as EmployeesIcon,
  Settings as SettingsIcon,
  ChevronLeft as ChevronLeftIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';

interface SidenavRoute {
  name: string;
  path?: string;
  icon: React.ReactNode;
  badge?: number;
  isSection?: boolean;
  children?: SidenavRoute[];
}

interface SidenavProps {
  open: boolean;
  onClose: () => void;
  isDesktop?: boolean;
}

const routes: SidenavRoute[] = [
  {
    name: 'Inicio',
    path: '/',
    icon: <DashboardIcon />,
  },
  {
    name: 'Tipos de Vehículos',
    path: '/vehicle-types',
    icon: <VehicleTypesIcon />,
  },
  {
    name: 'Vehículos',
    path: '/vehicles',
    icon: <VehiclesIcon />,
  },
  {
    name: 'Usuarios',
    path: '/users',
    icon: <UsersIcon />,
  },
  {
    name: 'Empleados',
    path: '/employees',
    icon: <EmployeesIcon />,
  },
  {
    name: 'Certificados',
    path: '/certificates',
    icon: <CertificatesIcon />,
  },
  {
    name: 'Reportes',
    path: '/reports',
    icon: <ReportsIcon />,
  },
  {
    name: 'Boletas',
    path: '/invoices',
    icon: <InvoicesIcon />,
  },
  {
    name: 'Mantenedores',
    isSection: true,
    icon: <SettingsIcon />,
    children: [
      {
        name: 'Ingredientes Activos',
        path: '/active-ingredients',
        icon: <SettingsIcon />,
      },
      {
        name: 'Tipos de Dosificación',
        path: '/dosage-types',
        icon: <SettingsIcon />,
      },
      {
        name: 'Formulaciones',
        path: '/formulations',
        icon: <SettingsIcon />,
      },
      {
        name: 'Unidades de Medida',
        path: '/measurement-units',
        icon: <SettingsIcon />,
      },
      {
        name: 'Plagas',
        path: '/pests',
        icon: <SettingsIcon />,
      },
      {
        name: 'Tipos de Servicio',
        path: '/service-types',
        icon: <SettingsIcon />,
      },
      {
        name: 'Tipos de Usuario',
        path: '/user-types',
        icon: <SettingsIcon />,
      },
      {
        name: 'Estados de Visita',
        path: '/visit-statuses',
        icon: <SettingsIcon />,
      },
    ],
  },
  {
    name: 'Configuración',
    path: '/settings',
    icon: <SettingsIcon />,
  },
];

const drawerWidth = 280;

export const Sidenav: React.FC<SidenavProps> = ({ open, onClose, isDesktop = false }) => {
  const theme = useTheme();
  const location = useLocation();
  const [expandedSections, setExpandedSections] = React.useState<string[]>(['Mantenedores']);

  const toggleSection = (sectionName: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionName)
        ? prev.filter(name => name !== sectionName)
        : [...prev, sectionName]
    );
  };

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            sx={{
              bgcolor: alpha('#fff', 0.2),
              width: 40,
              height: 40,
            }}
          >
            🚛
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
              EcoGest
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              Sistema de Gestión
            </Typography>
          </Box>
        </Box>
        {!isDesktop && (
          <IconButton onClick={onClose} sx={{ color: 'white' }}>
            <ChevronLeftIcon />
          </IconButton>
        )}
      </Box>

      <Divider />

      {/* Navigation Items */}
      <List sx={{ flexGrow: 1, py: 1 }}>
        {routes.map((route) => {
          const isActive = location.pathname === route.path;
          
          if (route.isSection && route.children) {
            const isExpanded = expandedSections.includes(route.name);
            return (
              <Box key={route.name}>
                <ListItem disablePadding sx={{ mb: 0.5 }}>
                  <ListItemButton
                    onClick={() => toggleSection(route.name)}
                    sx={{
                      mx: 1,
                      borderRadius: 2,
                      minHeight: 48,
                      background: isExpanded
                        ? alpha(theme.palette.primary.main, 0.1)
                        : 'transparent',
                      color: isExpanded ? theme.palette.primary.main : 'text.primary',
                      '&:hover': {
                        background: alpha(theme.palette.primary.main, 0.08),
                      },
                      transition: 'all 0.2s ease',
                      borderLeft: isExpanded ? `3px solid ${theme.palette.primary.main}` : '3px solid transparent',
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: isExpanded ? theme.palette.primary.main : 'inherit',
                        minWidth: 40,
                      }}
                    >
                      {route.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={route.name}
                      primaryTypographyProps={{
                        fontSize: '0.9rem',
                        fontWeight: isExpanded ? 600 : 400,
                      }}
                    />
                    {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </ListItemButton>
                </ListItem>
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {route.children.map((child) => (
                      <ListItem key={child.path} disablePadding sx={{ mb: 0.3 }}>
                        <ListItemButton
                          component={NavLink}
                          to={child.path || '#'}
                          onClick={!isDesktop ? onClose : undefined}
                          sx={{
                            mx: 2,
                            pl: 2,
                            borderRadius: 2,
                            minHeight: 40,
                            background: isActive
                              ? alpha(theme.palette.primary.main, 0.1)
                              : 'transparent',
                            color: isActive ? theme.palette.primary.main : 'text.primary',
                            '&:hover': {
                              background: alpha(theme.palette.primary.main, 0.08),
                            },
                            transition: 'all 0.2s ease',
                            borderLeft: isActive ? `3px solid ${theme.palette.primary.main}` : '3px solid transparent',
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              color: isActive ? theme.palette.primary.main : 'inherit',
                              minWidth: 32,
                            }}
                          >
                            {child.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={child.name}
                            primaryTypographyProps={{
                              fontSize: '0.85rem',
                              fontWeight: isActive ? 600 : 400,
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </Box>
            );
          }
          
          return (
            <ListItem key={route.path} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={NavLink}
                to={route.path || '#'}
                onClick={!isDesktop ? onClose : undefined}
                sx={{
                  mx: 1,
                  borderRadius: 2,
                  minHeight: 48,
                  background: isActive
                    ? alpha(theme.palette.primary.main, 0.1)
                    : 'transparent',
                  color: isActive ? theme.palette.primary.main : 'text.primary',
                  '&:hover': {
                    background: alpha(theme.palette.primary.main, 0.08),
                  },
                  transition: 'all 0.2s ease',
                  borderLeft: isActive ? `3px solid ${theme.palette.primary.main}` : '3px solid transparent',
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive ? theme.palette.primary.main : 'inherit',
                    minWidth: 40,
                  }}
                >
                  {route.icon}
                </ListItemIcon>
                <ListItemText
                  primary={route.name}
                  primaryTypographyProps={{
                    fontSize: '0.9rem',
                    fontWeight: isActive ? 600 : 400,
                  }}
                />
                {route.badge && (
                  <Box
                    sx={{
                      bgcolor: theme.palette.error.main,
                      color: 'white',
                      borderRadius: '50%',
                      width: 20,
                      height: 20,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                    }}
                  >
                    {route.badge}
                  </Box>
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Footer */}
      <Box sx={{ p: 2, mt: 'auto' }}>
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            background: alpha(theme.palette.primary.main, 0.05),
            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            textAlign: 'center',
          }}
        >
          <Typography variant="caption" color="text.secondary">
            Versión 1.0.0
          </Typography>
          <Typography variant="caption" display="block" color="text.secondary">
            © 2024 EcoGest
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Drawer
      variant={isDesktop ? "persistent" : "temporary"}
      open={open}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        height: '100vh',
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          height: '100vh',
          boxSizing: 'border-box',
          border: 'none',
          boxShadow: theme.shadows[4],
          position: isDesktop ? 'relative' : 'fixed',
          overflow: 'hidden', // Evita scroll en el sidenav
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidenav;
