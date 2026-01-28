import React from 'react';
import { useProfile } from '../../../hooks/useContent';

const SectionExperience = () => {
    const { data: profile } = useProfile();
    const experience = profile?.experience || [];

    if (!profile) return null;

    return (
        <section className="section section-white">
            <div className="container">
                <h2 className="section-title">Experience</h2>
                <div className="timeline">
                    {experience.map((exp, index) => (
                        <div key={index} className="timeline-item" style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>{exp.role}</h3>
                            <h4 style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>{exp.department}</h4>
                            <h5 style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>{exp.organization}</h5>
                            <span style={{ fontSize: '0.9rem', color: 'var(--primary-color)', fontWeight: 'bold' }}>{exp.year}</span>
                            {exp.details && (
                                <p style={{ marginTop: '0.5rem', fontStyle: 'italic' }}>{exp.details}</p>
                            )}
                        </div>
                    ))}
                </div>


            </div>
        </section>
    );
};

export default SectionExperience;
