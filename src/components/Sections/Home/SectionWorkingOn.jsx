import React from 'react';
import { useProfile } from '../../../hooks/useContent';

const SectionWorkingOn = () => {
    const { data: profile } = useProfile();
    const currentWorks = profile?.workingOn || [];

    if (!profile) return null;

    return (
        <section className="section section-gray">
            <div className="container">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1rem', textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '1px', marginBottom: '1.5rem' }}>
                        Current Focus
                    </h3>
                    <ul style={{ listStyle: 'none', textAlign: 'center' }}>
                        {currentWorks.map((work, index) => (
                            <li key={index} style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                                • {work}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default SectionWorkingOn;
