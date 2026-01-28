import React from 'react';
import { useProfile } from '../../../hooks/useContent';

const SectionEducation = () => {
    const { data: profile } = useProfile();
    const education = profile?.education || [];

    if (!profile) return null;

    return (
        <section className="section section-light">
            <div className="container">
                <h2 className="section-title">Education</h2>
                <div className="timeline">
                    {education.map((edu, index) => (
                        <div key={index} className="timeline-item" style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>{edu.degree} in {edu.field}</h3>
                            <h4 style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>{edu.institute}</h4>
                            <span style={{ fontSize: '0.9rem', color: 'var(--primary-color)', fontWeight: 'bold' }}>{edu.year}</span>
                            {edu.details && (
                                <p style={{ marginTop: '0.5rem', fontStyle: 'italic' }}>{edu.details}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SectionEducation;
