import React from 'react';
import { useProfile } from '../../../hooks/useContent';

const SectionThemes = () => {
    const { data: profile } = useProfile();
    const researchThemes = profile?.themes || [];

    if (!profile) return null;

    return (
        <section className="section section-gray">
            <div className="container">
                <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Research Themes</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {researchThemes.map((theme, idx) => (
                        <div key={theme.id || idx}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{theme.title}</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                                {theme.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SectionThemes;
