import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import NoteIcon from "@mui/icons-material/Note";
import BookIcon from "@mui/icons-material/Book";
import { Outlet, Link, useLocation } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";
import PersonIcon from '@mui/icons-material/Person';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

export default function MiniDrawer() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const location = useLocation();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);
    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => setAnchorEl(null);

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);

    const items = [
        {
            text: "Notas",
            icon: <NoteIcon />,
            to: "notas",
            selected: location.pathname.endsWith("/notas"),
        },
        {
            text: "Libros",
            icon: <BookIcon />,
            to: "libros",
            selected: location.pathname.endsWith("/libros"),
        },
    ];

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    {!open ? (
                        <Tooltip title="Abrir menú">
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                sx={{ marginRight: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <Tooltip title="Cerrar menú">
                            <IconButton
                                color="inherit"
                                aria-label="close drawer"
                                onClick={handleDrawerClose}
                                edge="start"
                                sx={{ marginRight: 2 }}
                            >
                                <MenuOpenIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                    <SpaceDashboardIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        Agenda Pro
                    </Typography>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Cuenta">
                            <IconButton onClick={handleMenuClick} sx={{ p: 0, ml: 2 }}>
                                <Avatar alt="Noé Alejandro" src="https://avatars.githubusercontent.com/u/105474616?v=4" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={openMenu}
                            onClose={handleMenuClose}
                            onClick={handleMenuClose}
                            slotProps={{
                                paper: {
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 52,
                                            height: 52,
                                            ml: 0,
                                            mr: 1.8,
                                        },
                                        '&::before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 0.5, py: 0.5 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                    <Avatar alt="Noé Alejandro Rodríguez Moto" src="https://avatars.githubusercontent.com/u/105474616?v=4"
                                    />
                                    <Box>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1 }}>
                                            Noé Alejandro
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontSize: 13 }}>
                                            noeonlive@gmail.com
                                        </Typography>
                                    </Box>
                                </Box>
                            </MenuItem>
                            <Divider />
                            <MenuItem>
                                <PersonIcon sx={{ mr: 1 }} fontSize="small" /> Perfil
                            </MenuItem>
                            <MenuItem>
                                <Settings sx={{ mr: 1 }} fontSize="small" /> Configuración
                            </MenuItem>
                            <MenuItem>
                                <Logout sx={{ mr: 1 }} fontSize="small" /> Cerrar sesión
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader />
                <Divider />
                <List sx={{ padding: 0.5, pt: 1, pb: 1 }}>
                    {items.map((item) => (
                        <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
                            <Tooltip
                                title={!open ? item.text : ""}
                                placement="right"
                                arrow
                            >
                                <ListItemButton
                                    component={Link}
                                    to={item.to}
                                    selected={item.selected}
                                    sx={{
                                        minHeight: 56,
                                        justifyContent: open ? "initial" : "center",
                                        borderRadius: 2,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: "auto",
                                            justifyContent: "center",
                                            color: item.selected ? theme.palette.primary.main : "",
                                        }}
                                    >
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.text}
                                        sx={{
                                            position: "absolute",
                                            left: 65,
                                            color: item.selected ? theme.palette.primary.main : "",
                                        }}
                                    />
                                </ListItemButton>
                            </Tooltip>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <Outlet />
            </Box>
        </Box>
    );
}