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
import { Outlet, Link, useLocation } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import useMediaQuery from "@mui/material/useMediaQuery";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import ContrastIcon from '@mui/icons-material/Contrast';
import { useColorScheme } from "@mui/material/styles";
import PageContainer from "../../ui/PageContainer";
import MuiLink from "@mui/material/Link";

interface MenuItem {
    text: string;
    icon: React.ReactNode;
    to: string;
    selected?: (pathname: string) => boolean;
}

interface UserInfo {
    name: string;
    email: string;
    avatar: string;
    fullName?: string;
}

interface MenuOption {
    icon: React.ReactNode;
    text: string;
    onClick?: () => void;
}

interface DashboardLayoutProps {
    menuItems: MenuItem[];
    userInfo: UserInfo;
    appTitle?: string;
    menuOptions: MenuOption[];
    basePath?: string;
}

const drawerWidth = 319;

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
        width: `calc(${theme.spacing(9)} + 1px)`,
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

export default function DashboardLayout({
    menuItems,
    userInfo,
    appTitle = "Agenda Pro",
    menuOptions,
    basePath = "/dashboard"
}: DashboardLayoutProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [open, setOpen] = React.useState(false);
    const location = useLocation();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);
    const { mode, setMode } = useColorScheme();

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);

    const drawerContent = (
        <>
            <DrawerHeader />
            <Divider />
            <List sx={{ padding: 1, pt: 1, pb: 1 }}>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
                        <Tooltip
                            title={!open && !isMobile ? item.text : ""}
                            placement="right"
                            arrow
                        >
                            <ListItemButton
                                component={Link}
                                to={`${basePath}/${item.to}`}
                                selected={item.selected ? item.selected(location.pathname) : false}
                                onClick={isMobile ? handleDrawerClose : undefined}
                                sx={{
                                    minHeight: 52,
                                    justifyContent: open && !isMobile ? "initial" : "center",
                                    borderRadius: 2,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: "auto",
                                        justifyContent: "center",
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    sx={{
                                        position: "absolute",
                                        left: 70,
                                        display: open && !isMobile ? "block" : "",
                                    }}
                                />
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                ))}
            </List>
        </>
    );

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar position="fixed" open={open && !isMobile}>
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
                    <MuiLink
                        component={Link}
                        to={basePath}
                        color="inherit"
                        underline="none"
                        sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}
                    >
                        <SpaceDashboardIcon sx={{ display: 'flex', mr: 1 }} />
                        <Typography variant="h6" noWrap component="div">
                            {appTitle}
                        </Typography>
                    </MuiLink>
                    <Tooltip title={`Cambiar tema (${mode === "light" ? "Oscuro" : mode === "dark" ? "Sistema" : "Claro"})`}>
                        <IconButton
                            sx={{ ml: 1 }}
                            color="inherit"
                            onClick={() => {
                                if (mode === "light") setMode("dark");
                                else if (mode === "dark") setMode("system");
                                else setMode("light");
                            }}
                        >
                            {mode === "light" && <DarkModeIcon />}
                            {mode === "dark" && <ContrastIcon />}
                            {mode === "system" && <LightModeIcon />}
                        </IconButton>
                    </Tooltip>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Cuenta">
                            <IconButton onClick={handleMenuClick} sx={{ p: 0, ml: 2 }}>
                                <Avatar alt={userInfo.fullName || userInfo.name} src={userInfo.avatar} />
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
                                    <Avatar alt={userInfo.fullName || userInfo.name} src={userInfo.avatar} />
                                    <Box>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1 }}>
                                            {userInfo.name}
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontSize: 13 }}>
                                            {userInfo.email}
                                        </Typography>
                                    </Box>
                                </Box>
                            </MenuItem>
                            <Divider />
                            {menuOptions.map((option) => (
                                <MenuItem key={option.text} onClick={option.onClick}>
                                    {option.icon} {option.text}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            {isMobile ? (
                <MuiDrawer
                    variant="temporary"
                    open={open}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawerContent}
                </MuiDrawer>
            ) : (
                <Drawer variant="permanent" open={open}>
                    {drawerContent}
                </Drawer>
            )}
            <Box component="main" sx={{ flexGrow: 1, mt: 2, mb: 2 }}>
                <DrawerHeader />
                <PageContainer>
                    <Outlet />
                </PageContainer>
            </Box>
        </Box>
    );
}
