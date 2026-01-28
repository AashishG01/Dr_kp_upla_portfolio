import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import { Research, Projects, Students, Publications, Teaching, Contact } from './pages/Pages';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import AdminDashboard from './pages/Admin/Dashboard';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const queryClient = new QueryClient();


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ScrollToTop />
        <Toaster position="bottom-right" />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/research" element={<Research />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/students" element={<Students />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/teaching" element={<Teaching />} />
            <Route path="/contact" element={<Contact />} />

            {/* Admin Route - Unprotected for now as requested */}
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
