import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const ContextualHeader = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Logic: Show if scrolling UP or if down past a certain point (e.g. 300px)
            // Hide if at very top to avoid clutter on Section 1
            if (currentScrollY < 50) {
                setIsVisible(false);
            } else if (currentScrollY < lastScrollY) {
                // Scrolling UP
                setIsVisible(true);
            } else if (currentScrollY > 100) {
                // Scrolling DOWN
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const { pathname } = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Always show on non-home pages or if scrolled down enough on home
            if (pathname !== '/') {
                setIsVisible(true);
                return;
            }

            // Home page logic
            if (currentScrollY < 50) {
                setIsVisible(false);
            } else if (currentScrollY < lastScrollY) {
                // Scrolling UP
                setIsVisible(true);
            } else if (currentScrollY > 100) {
                // Scrolling DOWN
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        // Initial check
        handleScroll();

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY, pathname]);

    const navItems = [
        { label: 'Home', href: '/' },
        { label: 'Research', href: '/research' },
        { label: 'Projects', href: '/projects' },
        { label: 'Students', href: '/students' },
        { label: 'Publications', href: '/publications' },
        { label: 'Teaching', href: '/teaching' },
        { label: 'Contact', href: '/contact' },
    ];

    if (!isVisible) return null;

    return (
        <header className="fade-in" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            background: 'rgba(255, 255, 255, 0.95)',
            borderBottom: '1px solid var(--border-light)',
            padding: '0.75rem 0',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center'
        }}>
            <nav>
                <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }}>
                    {navItems.map((item) => (
                        <li key={item.label}>
                            <Link to={item.href} style={{
                                fontSize: '0.9rem',
                                color: 'var(--text-secondary)',
                                fontWeight: 500,
                                textDecoration: 'none'
                            }}>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default ContextualHeader;
