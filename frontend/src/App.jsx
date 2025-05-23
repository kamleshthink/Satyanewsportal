import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useState, useMemo, useEffect } from "react";
import './App.css'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute';

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";

// Pages
import Home from "./pages/Home";
import Article from "./pages/Article";
import Category from "./pages/Category";
import Search from "./pages/Search";
import Video from "./pages/Video";
import EditorialDashboard from './components/EditorialDashboard'
import ContentReview from './components/ContentReview'
import UserRoles from './components/UserRoles'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

function App() {
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode || 'light';
  });

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#1976d2",
          },
          secondary: {
            main: "#dc004e",
          },
        },
        typography: {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                scrollbarColor: "#6b6b6b #2b2b2b",
                "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
                  backgroundColor: "#2b2b2b",
                },
                "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
                  borderRadius: 8,
                  backgroundColor: "#6b6b6b",
                  minHeight: 24,
                  border: "3px solid #2b2b2b",
                },
                "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
                  backgroundColor: "#959595",
                },
              },
            },
          },
        },
      }),
    [mode]
  );

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Router>
            <div className="app">
              <Navbar toggleColorMode={toggleColorMode} mode={mode} />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/article/:id" element={<Article />} />
                  <Route path="/category/:category" element={<Category />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/video" element={<Video />} />
                  <Route 
                    path="/editor" 
                    element={
                      <ProtectedRoute requiredRole="editor">
                        <EditorialDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/review" 
                    element={
                      <ProtectedRoute requiredRole="reviewer">
                        <ContentReview />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/roles" 
                    element={
                      <ProtectedRoute requiredRole="admin">
                        <UserRoles />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/signup" element={<SignUp />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App; 