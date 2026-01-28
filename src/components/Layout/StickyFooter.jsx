import React from 'react';
import profile from '../../data/profile.json';

const StickyFooter = () => {
    return (
        <footer style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'var(--bg-white)',
            borderTop: '1px solid var(--border-light)',
            padding: '0.75rem 0',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '2rem'
        }}>
            <ActionLink href={profile.email ? `mailto:${profile.email}` : '#'} label="Email" />
            <ActionLink href={profile.scholar} label="Google Scholar" />
            <ActionLink href={profile.orcid} label="ORCID" />
            <ActionLink href="#" label="Download CV" />
        </footer>
    );
};

const ActionLink = ({ href, label }) => (
    <a href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-secondary"
        style={{
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            textDecoration: 'none',
            fontWeight: 500
        }}>
        {/* Simple placeholders for icons to keep it minimal/dependency-free for now */}
        <span>{label}</span>
    </a>
);

export default StickyFooter;
