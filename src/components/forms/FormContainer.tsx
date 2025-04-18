import { Box, Paper, Container, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface FormContainerProps {
  title: string;
  children: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md';
}

export function FormContainer({ title, children, maxWidth = 'xs' }: FormContainerProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: (theme) => theme.palette.background.default
      }}
    >
      <Container maxWidth={maxWidth}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            width: "100%"
          }}
        >
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            {title}
          </Typography>
          {children}
        </Paper>
      </Container>
    </Box>
  );
}