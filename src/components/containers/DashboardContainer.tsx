import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../layouts/Dashboard/DashboardLayout";
import PanelPage from "../../pages/PanelPage";
import NotasPage from "../../pages/NotasPage";
import LibrosPage from "../../pages/LibrosPage";
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import NoteIcon from "@mui/icons-material/Note";
import BookIcon from "@mui/icons-material/Book";
import PersonIcon from '@mui/icons-material/Person';
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

export default function DashboardContainer() {
    const userData = {
        name: "Noé Alejandro",
        fullName: "Noé Alejandro Rodríguez Moto",
        email: "noeonlive@gmail.com",
        avatar: "https://avatars.githubusercontent.com/u/105474616?v=4",
    };

    const menuOptions = [
        {
            text: "Perfil",
            icon: <PersonIcon fontSize="small" sx={{ mr: 1 }} />,
            onClick: () => console.log("Ir al perfil"),
        },
        {
            text: "Configuración",
            icon: <Settings fontSize="small" sx={{ mr: 1 }} />,
            onClick: () => console.log("Ir a configuración"),
        },
        {
            text: "Cerrar sesión",
            icon: <Logout fontSize="small" sx={{ mr: 1 }} />,
            onClick: () => console.log("Cerrando sesión..."),
        },
    ];

    const menuItems = [
        {
            text: "Panel",
            icon: <SpaceDashboardIcon />,
            to: "",
            selected: (pathname: string) => pathname === "/dashboard" || pathname === "/dashboard/",
        },
        {
            text: "Notas",
            icon: <NoteIcon />,
            to: "notas",
            selected: (pathname: string) => pathname.endsWith("/notas"),
        },
        {
            text: "Libros",
            icon: <BookIcon />,
            to: "libros",
            selected: (pathname: string) => pathname.endsWith("/libros"),
        },
    ];

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <DashboardLayout
                        userInfo={userData}
                        menuOptions={menuOptions}
                        menuItems={menuItems}
                        appTitle="Agenda Pro"
                    />
                }
            >
                <Route index element={<PanelPage />} />
                <Route path="notas" element={<NotasPage />} />
                <Route path="libros" element={<LibrosPage />} />
            </Route>
        </Routes>
    );
}
