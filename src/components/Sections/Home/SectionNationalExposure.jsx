import React from 'react';
import profile from '../../../data/profile.json';

const SectionNationalExposure = () => {
    return (
        <section className="section section-white">
            <div className="container">
                <h2 className="section-title">National Exposure</h2>
                <div style={{ paddingLeft: '1.5rem', lineHeight: '1.6' }}>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
                        {profile.nationalExposure.map((item, index) => (
                            <li key={index} style={{ marginBottom: '0.8rem', color: 'var(--text-primary)' }}>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default SectionNationalExposure;
