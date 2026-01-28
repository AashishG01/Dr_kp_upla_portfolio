import React from 'react';
import { useProfile } from '../hooks/useContent';
import { Loader2 } from 'lucide-react';

const Research = () => {
    const { data: profile, isLoading } = useProfile();

    if (isLoading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div>;

    const researchData = profile?.themes || [];

    return (
        <div className="section section-white">
            <div className="container" style={{ paddingTop: '6rem' }}>
                <h1 style={{ marginBottom: '3rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
                    Research Themes
                </h1>

                {researchData.length === 0 ? (
                    <p style={{ color: 'var(--text-secondary)' }}>No research themes added yet.</p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
                        {researchData.map((theme, index) => (
                            <div key={index} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem', alignItems: 'start' }}>
                                <div>
                                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{theme.title}</h2>
                                </div>
                                <div>
                                    <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                                        {theme.description}
                                    </p>
                                    {theme.applications && (
                                        <div>
                                            <h4 style={{ fontSize: '0.95rem', textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                                                Applications
                                            </h4>
                                            <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)' }}>
                                                {(Array.isArray(theme.applications) ? theme.applications : theme.applications.split(',')).map((app, idx) => (
                                                    <li key={idx} style={{ display: 'inline-block', marginRight: '1rem', background: 'var(--bg-gray)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.9rem' }}>
                                                        {typeof app === 'string' ? app.trim() : app}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Research;
