import React, { useState, useMemo } from 'react';
import { useStudents } from '../hooks/useContent';

const Students = () => {
    const { data: studentsList, isLoading, error } = useStudents();

    const studentsData = useMemo(() => {
        if (!studentsList) return { phd: [], mtech: [], btech: [], interns: [] };
        return {
            phd: studentsList.phd || [],
            mtech: studentsList.mtech || [],
            btech: studentsList.btech || [],
            interns: studentsList.interns || [],
        };
    }, [studentsList]);

    if (isLoading) return <div className="section section-white"><div className="container" style={{ paddingTop: '6rem' }}>Loading students...</div></div>;
    if (error) return <div className="section section-white"><div className="container" style={{ paddingTop: '6rem' }}>Error loading students: {error.message}</div></div>;

    return (
        <div className="section section-white">
            <div className="container" style={{ paddingTop: '6rem' }}>
                <h1 style={{ marginBottom: '3rem' }}>Lab Members</h1>

                {/* PhD Students */}
                <section style={{ marginBottom: '5rem' }}>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem', color: 'var(--text-primary)' }}>PhD Scholars</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {studentsData.phd.length > 0 ? (
                            studentsData.phd.map((student, idx) => (
                                <StudentCard key={student._id || idx} student={student} />
                            ))
                        ) : (
                            <p>No PhD scholars found.</p>
                        )}
                    </div>
                </section>

                {/* M.Tech / B.Tech */}
                <section>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem', color: 'var(--text-primary)' }}>M.Tech & B.Tech Researchers</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                        {studentsData.mtech.map((student, idx) => (
                            <div key={idx} style={{ padding: '1.5rem', background: 'var(--bg-gray)', border: '1px solid var(--border-light)' }}>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{student.name}</h3>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                                    <strong>Project:</strong> {student.topic || 'Research Project'}
                                </p>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                    <span>{student.startYear} - {student.endYear || 'Present'}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

const StudentCard = ({ student }) => {
    const [expanded, setExpanded] = useState(false);
    // In a real app, you might have specific images per student.
    // Here we use a generic placeholder for all.
    const studentImage = "/src/assets/student.png";

    return (
        <div style={{
            borderBottom: '1px solid var(--border-light)',
            paddingBottom: '2rem'
        }}>
            <div
                style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '1.5rem' }}
                onClick={() => setExpanded(!expanded)}
            >
                <img
                    src={studentImage}
                    alt="Student"
                    style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', opacity: 0.8 }}
                />
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>
                            {student.name}
                            <span style={{ fontSize: '0.9rem', fontWeight: 'normal', color: 'var(--text-secondary)', marginLeft: '1rem' }}>
                                ({student.status})
                            </span>
                        </h3>
                        <button style={{
                            background: 'none',
                            border: 'none',
                            fontSize: '1.5rem',
                            color: 'var(--text-secondary)',
                            cursor: 'pointer'
                        }}>
                            {expanded ? '−' : '+'}
                        </button>
                    </div>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>{student.topic}</p>
                </div>
            </div>

            {expanded && (
                <div className="fade-in" style={{ marginTop: '1.5rem', paddingLeft: 'calc(60px + 1.5rem)' }}>
                    <div style={{ borderLeft: '2px solid var(--border-light)', paddingLeft: '1rem' }}>
                        <p style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                            <strong>Key Contribution:</strong> {student.workedOn}
                        </p>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            <strong>Outcome:</strong> {student.outcome}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Students;
