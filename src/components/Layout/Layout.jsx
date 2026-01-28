import React from 'react';
import ContextualHeader from './ContextualHeader';
import StickyFooter from './StickyFooter';

const Layout = ({ children }) => {
    return (
        <>
            <ContextualHeader />
            <main style={{ minHeight: '80vh', paddingBottom: '60px' }}> {/* Add padding for sticky footer */}
                {children}
            </main>
            <StickyFooter />
            <AdminFloatingButton />
        </>
    );
};

import { useLocation, Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const AdminFloatingButton = () => {
    const location = useLocation();

    // Only show on home page
    if (location.pathname !== '/') return null;

    return (
        <Link
            to="/admin"
            style={{
                position: 'fixed',
                bottom: '20px',
                left: '20px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'var(--text-primary)', // Using primary color
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                zIndex: 1000,
                transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            title="Admin Login"
        >
            <Shield size={20} />
        </Link>
    );
};

export default Layout;
