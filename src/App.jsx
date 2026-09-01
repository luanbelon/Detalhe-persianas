import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import AdminPage from '@/pages/AdminPage';
import Layout from '@/components/landing/Layout';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { ThemeProvider } from '@/components/ThemeProvider';
import { SiteContentProvider } from '@/context/SiteContentContext';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';

function AppRoutes() {
  const location = useLocation();
  useDocumentMeta();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route index element={<LandingPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="decorastillo-theme">
      <AuthProvider>
        <SiteContentProvider>
          <AppRoutes />
          <Toaster />
        </SiteContentProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
