import React from 'react';
import profile from '../data/profile.json';
import profImage from '../assets/upla_sir_image.jpg';

const Contact = () => {
    return (
        <div className="section section-white">
            <div className="container" style={{ paddingTop: '6rem', maxWidth: '700px' }}>
                <h1 style={{ marginBottom: '2rem' }}>Contact</h1>

                <div style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-primary)', marginBottom: '3rem' }}>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Prospective PhD, M.Tech, and B.Tech students with strong interest in computer vision,
                        image processing, or deep learning may write with a brief CV and research interests.
                    </p>
                    <p>
                        Collaborations with academic and industrial partners are welcome.
                    </p>
                </div>

                <div style={{ background: 'var(--bg-gray)', padding: '2rem', borderRadius: '4px' }}>
                    <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                        <img
                            src={profImage}
                            alt={profile.name}
                            style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                    </div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Address</h3>
                    <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                        {profile.department}<br />
                        {profile.university}<br />
                        {profile.location}
                    </p>

                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Email</h3>
                    <p>
                        <a href={`mailto:${profile.secondaryEmail}`} style={{ textDecoration: 'underline' }}>{profile.secondaryEmail}</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Contact;
