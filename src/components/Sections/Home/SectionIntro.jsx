import React from 'react';
import { useProfile } from '../../../hooks/useContent';
import profImage from '../../../assets/upla_sir_image.jpg';

const SectionIntro = () => {
    const { data: profile, isLoading } = useProfile();

    if (isLoading) return <div className="section section-white py-20 text-center">Loading...</div>;
    if (!profile) return null;

    return (
        <section className="section section-white" style={{ paddingTop: '8rem', paddingBottom: '3rem' }}>
            <div className="container" style={{ textAlign: 'center' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <img
                        src={profile.imageUrl || profImage}
                        alt={profile.name}
                        style={{
                            width: '150px',
                            height: '150px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: '1px solid var(--border-light)'
                        }}
                    />
                </div>
                <h4 style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '1px', marginBottom: '1rem' }}>
                    {profile.title}
                </h4>
                <h1 style={{ fontSize: 'var(--h1-size)', marginBottom: '0.5rem' }}>
                    {profile.name}
                </h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                    {profile.department} <br /> {profile.university}
                </p>

                <div style={{ maxWidth: '600px', margin: '0 auto 3rem auto' }}>
                    <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)' }}>
                        Research Focus: <br />
                        {profile.researchFocus ? profile.researchFocus.join(" · ") : ''}
                    </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                    <a href="/publications" className="btn-text">Publications</a>
                    <a href="/projects" className="btn-text">Projects</a>
                    <a href="/contact" className="btn-text">Contact</a>
                </div>
            </div>
        </section>
    );
};

export default SectionIntro;
