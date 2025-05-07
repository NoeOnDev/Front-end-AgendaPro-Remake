import { Breadcrumbs, Typography, Link as MuiLink, Box, Container } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import React from "react";

interface PageContainerProps {
    title?: string;
    children: React.ReactNode;
}

function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function PageContainer({ title, children }: PageContainerProps) {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x && x !== "dashboard");

    const breadcrumbs = [
        <MuiLink underline="hover" color="inherit" component={Link} to="/dashboard" key="panel">
            Panel
        </MuiLink>,
        ...pathnames.map((value, index) => {
            const to = "/dashboard/" + pathnames.slice(0, index + 1).join("/");
            const isLast = index === pathnames.length - 1;
            return isLast ? (
                <Typography color="text.primary" key={to}>
                    {capitalize(value)}
                </Typography>
            ) : (
                <MuiLink underline="hover" color="inherit" component={Link} to={to} key={to}>
                    {capitalize(value)}
                </MuiLink>
            );
        }),
    ];

    const pageTitle = title || capitalize(pathnames[pathnames.length - 1] || "Panel");

    return (
        <Container maxWidth={false}>
            <Box sx={{ mb: 2 }}>
                <Breadcrumbs aria-label="breadcrumb">{breadcrumbs}</Breadcrumbs>
                <Typography variant="h4">
                    {pageTitle}
                </Typography>
            </Box>
            <Box>
                {children}
            </Box>
        </Container>
    );
}
