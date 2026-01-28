import React from 'react';
import { useProjects } from '../hooks/useContent';
import { Loader2 } from 'lucide-react';

const Projects = () => {
    const { data: projectsData, isLoading } = useProjects();

    if (isLoading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="section section-white">
            <div className="container" style={{ paddingTop: '6rem' }}>
                <h1 style={{ marginBottom: '2rem' }}>Projects</h1>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '4rem', maxWidth: '700px' }}>
                    Our lab addresses fundamental problems in computer vision through rigorous experimentation and collaboration.
                </p>

                {!projectsData || projectsData.length === 0 ? (
                    <p style={{ color: 'var(--text-secondary)' }}>No projects added yet.</p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                        {projectsData.map((project) => (
                            <div key={project._id} style={{ borderLeft: '3px solid var(--border-light)', paddingLeft: '2rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem' }}>
                                    <h2 style={{ fontSize: '1.6rem', marginBottom: '0' }}>{project.title}</h2>
                                    <span style={{
                                        fontSize: '0.85rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px',
                                        backgroundColor: project.status === 'Ongoing' ? '#e6f4ea' : '#f1f3f4',
                                        color: project.status === 'Ongoing' ? '#137333' : '#5f6368',
                                        padding: '0.2rem 0.6rem',
                                        borderRadius: '4px'
                                    }}>
                                        {project.status}
                                    </span>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                                    <div>
                                        <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>The Problem</h4>
                                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{project.problem}</p>

                                        <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Our Approach</h4>
                                        <p style={{ color: 'var(--text-secondary)' }}>{project.approach}</p>
                                    </div>

                                    <div>
                                        {project.outcomes && project.outcomes.length > 0 && (
                                            <>
                                                <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Outcomes</h4>
                                                <ul style={{ listStyle: 'disc', paddingLeft: '1.2rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                                                    {project.outcomes.map((outcome, idx) => (
                                                        <li key={idx} style={{ marginBottom: '0.3rem' }}>{outcome}</li>
                                                    ))}
                                                </ul>
                                            </>
                                        )}

                                        {project.collaborators && project.collaborators.length > 0 && (
                                            <>
                                                <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Collaborators</h4>
                                                <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)' }}>
                                                    {project.collaborators.map((collab, idx) => (
                                                        <li key={idx} style={{ marginBottom: '0.2rem', fontSize: '0.95rem' }}>• {collab}</li>
                                                    ))}
                                                </ul>
                                            </>
                                        )}

                                        {project.funding && project.funding.agency && (
                                            <>
                                                <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '0.5rem', marginTop: '1.5rem' }}>Funding</h4>
                                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                                    {project.funding.agency} <br />
                                                    {project.funding.amount && <span>{project.funding.amount} | </span>}
                                                    {project.funding.duration}
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Projects;
