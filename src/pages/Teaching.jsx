import React from 'react';
import teachingData from '../data/teaching.json';

const Teaching = () => {
    return (
        <div className="section section-white">
            <div className="container" style={{ paddingTop: '6rem' }}>
                <h1 style={{ marginBottom: '3rem' }}>Teaching & Supervision</h1>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>

                    <section>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Courses Taught</h2>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {teachingData.courses.map((course, idx) => (
                                <li key={idx} style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-light)' }}>
                                    <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{course.title}</div>
                                    <div style={{ color: 'var(--text-secondary)' }}>{course.code} ({course.level})</div>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Supervision</h2>
                        <ul style={{ listStyle: 'disc', paddingLeft: '1.2rem', color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
                            {teachingData.supervision.map((item, idx) => (
                                <li key={idx} style={{ marginBottom: '0.5rem' }}>{item}</li>
                            ))}
                        </ul>

                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', marginTop: '3rem' }}>Workshops</h2>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {teachingData.workshops.map((item, idx) => (
                                <li key={idx} style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                                    • {item}
                                </li>
                            ))}
                        </ul>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default Teaching;
