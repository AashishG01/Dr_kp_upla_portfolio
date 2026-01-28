import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useStudents } from '../../../hooks/useContent';

const SectionStudents = () => {
    const { data: studentsList } = useStudents();

    const studentsData = useMemo(() => {
        if (!studentsList) return { phd: [], mtech: [] };
        // The data is already structured in the JSON file, no need to filter
        return {
            phd: studentsList.phd || [],
            mtech: studentsList.mtech || []
        };
    }, [studentsList]);

    if (!studentsList) return null;

    return (
        <section className="section section-white">
            <div className="container">
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Students Snapshot</h2>

                <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>PhD Scholars</h3>
                    <ul style={{ listStyle: 'none', paddingLeft: '1rem' }}>
                        {studentsData.phd.slice(0, 2).map((student, index) => (
                            <li key={student._id || index} style={{ marginBottom: '0.5rem' }}>
                                <strong style={{ color: 'var(--text-primary)' }}>{student.name}</strong> ({student.status}) - {student.topic}
                            </li>
                        ))}
                    </ul>
                </div>

                <div style={{ marginBottom: '3rem' }}>
                    <h3 style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>M.Tech / B.Tech</h3>
                    <ul style={{ listStyle: 'none', paddingLeft: '1rem' }}>
                        {studentsData.mtech.slice(0, 2).map((student, index) => (
                            <li key={student._id || index} style={{ marginBottom: '0.5rem' }}>
                                <strong>{student.name}</strong> - {student.project || student.topic}
                            </li>
                        ))}
                    </ul>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <Link to="/students" className="btn-text">View All Lab Members</Link>
                </div>
            </div>
        </section>
    );
};

export default SectionStudents;
