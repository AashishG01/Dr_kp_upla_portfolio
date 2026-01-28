import React, { useState, useMemo } from 'react';
import { usePublications } from '../hooks/useContent';

const Publications = () => {
    const { data: publicationsData, isLoading, error } = usePublications();
    const [activeTab, setActiveTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const tabs = ['All', 'Book', 'Journal', 'Conference'];

    // Filter logic
    const filteredPublications = useMemo(() => {
        if (!publicationsData) return [];
        return publicationsData.filter(pub => {
            const matchesTab = activeTab === 'All' || pub.type === activeTab;
            const matchesSearch = pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                pub.authors.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesTab && matchesSearch;
        });
    }, [activeTab, searchQuery, publicationsData]);

    if (isLoading) return <div className="section section-white"><div className="container" style={{ paddingTop: '6rem' }}>Loading publications...</div></div>;
    if (error) return <div className="section section-white"><div className="container" style={{ paddingTop: '6rem' }}>Error loading publications: {error.message}</div></div>;

    return (
        <div className="section section-white" style={{ minHeight: '100vh' }}>
            <div className="container" style={{ paddingTop: '6rem' }}>

                {/* Header Section */}
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 style={{ marginBottom: '1rem' }}>Research Publications</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                        A collection of my work spanning books, journals, and international conferences.
                    </p>
                </div>

                {/* Controls Section */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', marginBottom: '3rem' }}>

                    {/* Search Bar */}
                    <div style={{ width: '100%', maxWidth: '500px' }}>
                        <input
                            type="text"
                            placeholder="Search by title or author..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.8rem 1.2rem',
                                borderRadius: '4px',
                                border: '1px solid var(--border-light)',
                                fontSize: '1rem',
                                outline: 'none',
                                transition: 'border-color 0.2s'
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--text-primary)'}
                            onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'}
                        />
                    </div>

                    {/* Tabs */}
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                style={{
                                    padding: '0.5rem 1.2rem',
                                    borderRadius: '4px',
                                    border: '1px solid var(--border-light)',
                                    background: activeTab === tab ? 'var(--text-primary)' : 'transparent',
                                    color: activeTab === tab ? 'white' : 'var(--text-secondary)',
                                    cursor: 'pointer',
                                    fontWeight: 500,
                                    fontSize: '0.95rem',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                {tab === 'All' ? 'All Publications' : tab + 's'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Publications Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {filteredPublications.map((pub) => (
                        <div key={pub.id} className="pub-card" style={{
                            background: 'white',
                            borderRadius: '4px',
                            overflow: 'hidden',
                            border: '1px solid var(--border-light)',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>

                            {/* Image Placeholder (Optional) */}
                            {pub.image ? (
                                <div style={{ height: '180px', overflow: 'hidden', borderBottom: '1px solid var(--border-light)' }}>
                                    <img src={pub.image} alt={pub.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                            ) : (
                                <div style={{ height: '5px', background: 'var(--bg-gray)' }}></div>
                            )}

                            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
                                    <span style={{
                                        fontSize: '0.75rem',
                                        fontWeight: 700,
                                        textTransform: 'uppercase',
                                        padding: '0.2rem 0.6rem',
                                        borderRadius: '4px',
                                        background: 'var(--bg-gray)',
                                        color: 'var(--text-primary)',
                                        border: '1px solid var(--border-light)',
                                        letterSpacing: '0.5px'
                                    }}>
                                        {pub.type}
                                    </span>
                                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                                        {pub.year}
                                    </span>
                                </div>

                                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.8rem', lineHeight: 1.4, color: 'var(--text-primary)' }}>
                                    {pub.title}
                                </h3>

                                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', flex: 1 }}>
                                    {pub.authors}
                                </p>

                                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '1rem', borderTop: '1px solid var(--border-light)', paddingTop: '1rem' }}>
                                    {pub.venue}
                                </div>

                                <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                                    {Object.entries(pub.links).map(([key, url]) => (
                                        typeof url === 'string' && url.startsWith('http') ? (
                                            <a key={key} href={url} target="_blank" rel="noopener noreferrer" style={{
                                                fontSize: '0.85rem',
                                                textDecoration: 'underline',
                                                color: 'var(--link-color)',
                                                fontWeight: 500,
                                                textUnderlineOffset: '4px'
                                            }}>
                                                {key.toUpperCase()}
                                            </a>
                                        ) : (
                                            <span key={key} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                                {url}
                                            </span>
                                        )
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredPublications.length === 0 && (
                    <div style={{ textAlign: 'center', marginTop: '4rem', color: 'var(--text-secondary)' }}>
                        <p>No publications found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Publications;
