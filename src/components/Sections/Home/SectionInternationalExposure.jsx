import React from 'react';
import { useProfile } from '../../../hooks/useContent';

const SectionInternationalExposure = () => {
    const { data: profile } = useProfile();

    if (!profile?.internationalExposure) return null;

    return (
        <section className="section section-light">
            <div className="container">
                <h2 className="section-title">International Exposure</h2>
                <ul className="timeline-item" style={{ paddingLeft: '1.5rem', lineHeight: '1.6', fontSize: '1.1rem' }}>
                    {profile.internationalExposure.map((item, index) => (
                        <li key={index} style={{ marginBottom: '0.8rem', color: 'var(--text-primary)' }}>{item}</li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default SectionInternationalExposure;
