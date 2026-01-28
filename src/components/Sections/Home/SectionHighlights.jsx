import React from 'react';
import { useProfile } from '../../../hooks/useContent';

const SectionHighlights = () => {
    const { data: profile } = useProfile();
    const highlights = profile?.highlights || [];

    if (!profile) return null;

    return (
        <section className="section section-white">
            <div className="container">
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Recent Highlights</h2>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    {highlights.map((item, index) => (
                        <div key={index} style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SectionHighlights;
