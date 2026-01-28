import React, { useState, useEffect } from 'react';
import api, { setAuthToken } from '../../api/client';
import toast from 'react-hot-toast';
import { useProfile, useUpdateProfile, usePublications, useCreatePublication, useUpdatePublication, useDeletePublication, useStudents, useCreateStudent, useUpdateStudent, useDeleteStudent, useProjects, useCreateProject, useUpdateProject, useDeleteProject } from '../../hooks/useContent';
import { Loader2, Save, Plus, Trash2, ChevronDown, ChevronUp, Upload, X } from 'lucide-react';

const Dashboard = () => {
    // const { user } = useUser(); // Removed Clerk
    // const { signOut, session } = useClerk(); // Removed Clerk
    const [activeTab, setActiveTab] = useState('profile');

    useEffect(() => {
        //     // Removed token setting logic as backend is removed
        //     const setToken = async () => {
        //         const token = await session?.getToken();
        //         if (token) setAuthToken(token);
        //     };
        //     setToken();
    }, []);

    return (
        <div className="section section-white" style={{ minHeight: '100vh', paddingTop: '6rem', paddingBottom: '4rem' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1>Admin Dashboard</h1>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Welcome, Admin</span>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-light)', flexWrap: 'wrap' }}>
                    <TabButton active={activeTab === 'profile'} onClick={() => setActiveTab('profile')}>Profile & Home</TabButton>
                    <TabButton active={activeTab === 'research'} onClick={() => setActiveTab('research')}>Research</TabButton>
                    <TabButton active={activeTab === 'publications'} onClick={() => setActiveTab('publications')}>Publications</TabButton>
                    <TabButton active={activeTab === 'projects'} onClick={() => setActiveTab('projects')}>Projects</TabButton>
                    <TabButton active={activeTab === 'students'} onClick={() => setActiveTab('students')}>Students</TabButton>
                </div>

                {activeTab === 'profile' && <ProfileEditor />}
                {activeTab === 'research' && <ResearchEditor />}
                {activeTab === 'publications' && <PublicationsEditor />}
                {activeTab === 'projects' && <ProjectsEditor />}
                {activeTab === 'students' && <StudentsEditor />}
            </div>
        </div>
    );
};

const TabButton = ({ active, onClick, children }) => (
    <button
        onClick={onClick}
        style={{
            padding: '1rem',
            background: 'none',
            border: 'none',
            borderBottom: active ? '2px solid var(--text-primary)' : 'none',
            color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
            cursor: 'pointer',
            fontWeight: 500
        }}
    >
        {children}
    </button>
);

// ... (ProfileEditor remains the same, assuming it's above or I can leave it be if I target correctly)
// Wait, I need to insert the new components. 

const ResearchEditor = () => {
    const { data: profile, isLoading } = useProfile();
    const updateProfile = useUpdateProfile();
    const [themes, setThemes] = useState([]);

    useEffect(() => {
        if (profile?.themes) setThemes(profile.themes);
    }, [profile]);

    const handleSave = () => {
        updateProfile.mutate({ ...profile, themes });
    };

    if (isLoading) return <Loader2 className="animate-spin" />;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h2>Manage Research Themes</h2>
                <button
                    onClick={handleSave}
                    disabled={updateProfile.isPending}
                    style={{
                        padding: '0.6rem 1.2rem',
                        background: 'var(--text-primary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        opacity: updateProfile.isPending ? 0.7 : 1
                    }}
                >
                    {updateProfile.isPending ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                    Save Themes
                </button>
            </div>
            <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                These themes appear on your <strong>Research Page</strong>.
            </p>
            <ObjectArrayEditor
                data={themes}
                onChange={setThemes}
                fields={[
                    { name: 'title', label: 'Title' },
                    { name: 'description', label: 'Description', type: 'textarea' },
                    { name: 'applications', label: 'Applications (Comma separated)', type: 'tags' }
                ]}
                titleKey="title"
            />
        </div>
    );
};

const ProjectsEditor = () => {
    const { data: projects, isLoading } = useProjects();
    const createMutation = useCreateProject();
    const updateMutation = useUpdateProject();
    const deleteMutation = useDeleteProject();
    const [editingId, setEditingId] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const initialForm = {
        title: '',
        problem: '',
        approach: '',
        outcomes: [],
        collaborators: [],
        funding: { agency: '', amount: '', duration: '' },
        status: 'Ongoing'
    };
    const [form, setForm] = useState(initialForm);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await updateMutation.mutateAsync({ id: editingId, ...form });
            } else {
                await createMutation.mutateAsync(form);
            }
            setIsFormOpen(false);
            setForm(initialForm);
            setEditingId(null);
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (project) => {
        setForm(project);
        setEditingId(project._id);
        setIsFormOpen(true);
    };

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this project?')) {
            await deleteMutation.mutateAsync(id);
        }
    };

    if (isLoading) return <Loader2 className="animate-spin" />;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h2>Manage Projects</h2>
                <button
                    onClick={() => { setForm(initialForm); setEditingId(null); setIsFormOpen(true); }}
                    style={{ padding: '0.5rem 1rem', background: 'var(--text-primary)', color: 'white', borderRadius: '4px', border: 'none', cursor: 'pointer', display: 'flex', gap: '0.5rem', alignItems: 'center' }}
                >
                    <Plus size={16} /> Add Project
                </button>
            </div>

            {isFormOpen && (
                <div style={{ padding: '1.5rem', border: '1px solid var(--border-light)', borderRadius: '8px', marginBottom: '2rem', background: 'var(--bg-gray)' }}>
                    <h3 style={{ marginBottom: '1rem' }}>{editingId ? 'Edit Project' : 'New Project'}</h3>
                    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
                        <Input label="Project Title" name="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>Status</label>
                                <select
                                    value={form.status}
                                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                                    style={{ width: '100%', padding: '0.6rem', border: '1px solid var(--border-light)', borderRadius: '4px' }}
                                >
                                    <option value="Ongoing">Ongoing</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                        </div>

                        <TextArea label="The Problem" name="problem" value={form.problem} onChange={(e) => setForm({ ...form, problem: e.target.value })} rows={2} />
                        <TextArea label="Our Approach" name="approach" value={form.approach} onChange={(e) => setForm({ ...form, approach: e.target.value })} rows={2} />

                        <div style={{ border: '1px solid var(--border-light)', padding: '1rem', borderRadius: '4px', background: 'white' }}>
                            <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Funding Details</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <Input label="Agency" name="agency" value={form.funding?.agency} onChange={(e) => setForm({ ...form, funding: { ...form.funding, agency: e.target.value } })} />
                                <Input label="Amount" name="amount" value={form.funding?.amount} onChange={(e) => setForm({ ...form, funding: { ...form.funding, amount: e.target.value } })} />
                                <Input label="Duration" name="duration" value={form.funding?.duration} onChange={(e) => setForm({ ...form, funding: { ...form.funding, duration: e.target.value } })} />
                            </div>
                        </div>

                        <StringArrayEditor
                            label="Outcomes (One per line)"
                            value={form.outcomes || []}
                            onChange={(val) => setForm({ ...form, outcomes: val })}
                        />
                        <StringArrayEditor
                            label="Collaborators (One per line)"
                            value={form.collaborators || []}
                            onChange={(val) => setForm({ ...form, collaborators: val })}
                        />

                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                            <button type="submit" style={{ padding: '0.6rem 1.2rem', background: 'var(--text-primary)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                {createMutation.isPending || updateMutation.isPending ? 'Saving...' : 'Save'}
                            </button>
                            <button type="button" onClick={() => setIsFormOpen(false)} style={{ padding: '0.6rem 1.2rem', background: 'white', border: '1px solid var(--border-light)', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {projects?.map(project => (
                    <div key={project._id} style={{ padding: '1rem', border: '1px solid var(--border-light)', borderRadius: '4px', background: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontWeight: 600, marginBottom: '0.3rem' }}>{project.title}</div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{project.status}</div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button onClick={() => handleEdit(project)} style={{ padding: '0.4rem', background: 'none', border: '1px solid var(--border-light)', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                            <button onClick={() => handleDelete(project._id)} style={{ padding: '0.4rem', background: 'none', border: '1px solid #dc3545', color: '#dc3545', borderRadius: '4px', cursor: 'pointer' }}><Trash2 size={16} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const PublicationsEditor = () => {
    const { data: publications, isLoading } = usePublications();
    const createMutation = useCreatePublication();
    const updateMutation = useUpdatePublication();
    const deleteMutation = useDeletePublication();
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({ title: '', authors: '', year: '', venue: '', type: 'Conference' });
    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await updateMutation.mutateAsync({ id: editingId, ...form });
            } else {
                await createMutation.mutateAsync(form);
            }
            setIsFormOpen(false);
            setForm({ title: '', authors: '', year: '', venue: '', type: 'Conference' });
            setEditingId(null);
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (pub) => {
        setForm(pub);
        setEditingId(pub._id);
        setIsFormOpen(true);
    };

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this publication?')) {
            await deleteMutation.mutateAsync(id);
        }
    };

    if (isLoading) return <Loader2 className="animate-spin" />;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h2>Manage Publications</h2>
                <button
                    onClick={() => { setForm({ title: '', authors: '', year: '', venue: '', type: 'Conference' }); setEditingId(null); setIsFormOpen(true); }}
                    style={{ padding: '0.5rem 1rem', background: 'var(--text-primary)', color: 'white', borderRadius: '4px', border: 'none', cursor: 'pointer', display: 'flex', gap: '0.5rem', alignItems: 'center' }}
                >
                    <Plus size={16} /> Add Publication
                </button>
            </div>

            {isFormOpen && (
                <div style={{ padding: '1.5rem', border: '1px solid var(--border-light)', borderRadius: '8px', marginBottom: '2rem', background: 'var(--bg-gray)' }}>
                    <h3 style={{ marginBottom: '1rem' }}>{editingId ? 'Edit Publication' : 'New Publication'}</h3>
                    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
                        <Input label="Title" name="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                        <Input label="Authors" name="authors" value={form.authors} onChange={(e) => setForm({ ...form, authors: e.target.value })} />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <Input label="Year" name="year" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} />
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>Type</label>
                                <select
                                    value={form.type}
                                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                                    style={{ width: '100%', padding: '0.6rem', border: '1px solid var(--border-light)', borderRadius: '4px' }}
                                >
                                    <option value="Conference">Conference</option>
                                    <option value="Journal">Journal</option>
                                    <option value="Book">Book</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                        <Input label="Venue" name="venue" value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} />
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                            <button type="submit" style={{ padding: '0.6rem 1.2rem', background: 'var(--text-primary)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                {createMutation.isPending || updateMutation.isPending ? 'Saving...' : 'Save'}
                            </button>
                            <button type="button" onClick={() => setIsFormOpen(false)} style={{ padding: '0.6rem 1.2rem', background: 'white', border: '1px solid var(--border-light)', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {publications?.map(pub => (
                    <div key={pub._id} style={{ padding: '1rem', border: '1px solid var(--border-light)', borderRadius: '4px', background: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontWeight: 600, marginBottom: '0.3rem' }}>{pub.title}</div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{pub.venue} ({pub.year})</div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button onClick={() => handleEdit(pub)} style={{ padding: '0.4rem', background: 'none', border: '1px solid var(--border-light)', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                            <button onClick={() => handleDelete(pub._id)} style={{ padding: '0.4rem', background: 'none', border: '1px solid #dc3545', color: '#dc3545', borderRadius: '4px', cursor: 'pointer' }}><Trash2 size={16} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const StudentsEditor = () => {
    const { data: students, isLoading } = useStudents();
    const createMutation = useCreateStudent();
    const updateMutation = useUpdateStudent();
    const deleteMutation = useDeleteStudent();
    const [editingId, setEditingId] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    // Initial Form State
    const initialForm = {
        name: '',
        category: 'phd',
        status: '',
        topic: '',
        workedOn: '',
        outcome: '',
        startYear: '',
        endYear: '',
        link: ''
    };
    const [form, setForm] = useState(initialForm);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await updateMutation.mutateAsync({ id: editingId, ...form });
            } else {
                await createMutation.mutateAsync(form);
            }
            setIsFormOpen(false);
            setForm(initialForm);
            setEditingId(null);
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (student) => {
        setForm(student);
        setEditingId(student._id);
        setIsFormOpen(true);
    };

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this student?')) {
            await deleteMutation.mutateAsync(id);
        }
    };

    if (isLoading) return <Loader2 className="animate-spin" />;

    // Group students by category for clearer display
    const groupedStudents = {
        phd: students?.phd || [],
        mtech: students?.mtech || [],
        btech: students?.btech || [],
        interns: students?.interns || []
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h2>Manage Students</h2>
                <button
                    onClick={() => { setForm(initialForm); setEditingId(null); setIsFormOpen(true); }}
                    style={{ padding: '0.5rem 1rem', background: 'var(--text-primary)', color: 'white', borderRadius: '4px', border: 'none', cursor: 'pointer', display: 'flex', gap: '0.5rem', alignItems: 'center' }}
                >
                    <Plus size={16} /> Add Student
                </button>
            </div>

            {isFormOpen && (
                <div style={{ padding: '1.5rem', border: '1px solid var(--border-light)', borderRadius: '8px', marginBottom: '2rem', background: 'var(--bg-gray)' }}>
                    <h3 style={{ marginBottom: '1rem' }}>{editingId ? 'Edit Student' : 'New Student'}</h3>
                    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <Input label="Name" name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>Category</label>
                                <select
                                    value={form.category}
                                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                                    style={{ width: '100%', padding: '0.6rem', border: '1px solid var(--border-light)', borderRadius: '4px' }}
                                >
                                    <option value="phd">PhD Scholar</option>
                                    <option value="mtech">M.Tech</option>
                                    <option value="btech">B.Tech</option>
                                    <option value="interns">Intern</option>
                                </select>
                            </div>
                        </div>

                        <Input label="Research Topic / Project Title" name="topic" value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} />

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <Input label="Start Year" name="startYear" value={form.startYear} onChange={(e) => setForm({ ...form, startYear: e.target.value })} />
                            <Input label="End Year (or 'Present')" name="endYear" value={form.endYear} onChange={(e) => setForm({ ...form, endYear: e.target.value })} />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <Input label="Current Status" name="status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} />
                            <Input label="Profile Link (Optional)" name="link" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} />
                        </div>

                        <TextArea label="Key Contribution (Worked On)" name="workedOn" value={form.workedOn} onChange={(e) => setForm({ ...form, workedOn: e.target.value })} rows={2} />
                        <TextArea label="Outcome / Current Position" name="outcome" value={form.outcome} onChange={(e) => setForm({ ...form, outcome: e.target.value })} rows={2} />

                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                            <button type="submit" style={{ padding: '0.6rem 1.2rem', background: 'var(--text-primary)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                {createMutation.isPending || updateMutation.isPending ? 'Saving...' : 'Save'}
                            </button>
                            <button type="button" onClick={() => setIsFormOpen(false)} style={{ padding: '0.6rem 1.2rem', background: 'white', border: '1px solid var(--border-light)', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {Object.entries(groupedStudents).map(([category, list]) => (
                    list.length > 0 && (
                        <div key={category}>
                            <h3 style={{ textTransform: 'uppercase', fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '1rem', borderBottom: '1px solid var(--border-light)' }}>{category}</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {list.map(student => (
                                    <div key={student._id} style={{ padding: '0.8rem', border: '1px solid var(--border-light)', borderRadius: '4px', background: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <div style={{ fontWeight: 600 }}>{student.name}</div>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{student.topic}</div>
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button onClick={() => handleEdit(student)} style={{ padding: '0.4rem', background: 'none', border: '1px solid var(--border-light)', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                                            <button onClick={() => handleDelete(student._id)} style={{ padding: '0.4rem', background: 'none', border: '1px solid #dc3545', color: '#dc3545', borderRadius: '4px', cursor: 'pointer' }}><Trash2 size={16} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

const ProfileEditor = () => {
    const { data: profile, isLoading } = useProfile();
    const updateProfile = useUpdateProfile();
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (profile) setFormData(profile);
    }, [profile]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleArrayChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {
        updateProfile.mutate(formData);
    };

    if (isLoading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;

    return (
        <div style={{ maxWidth: '900px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2>Edit Profile</h2>
                <button
                    onClick={handleSave}
                    disabled={updateProfile.isPending}
                    style={{
                        padding: '0.8rem 1.5rem',
                        background: 'var(--text-primary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        opacity: updateProfile.isPending ? 0.7 : 1
                    }}
                >
                    {updateProfile.isPending ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    Save Changes
                </button>
            </div>

            <div style={{ display: 'grid', gap: '2rem' }}>
                {/* Basic Info */}
                <Section title="Basic Information">
                    <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} />
                    <Input label="Title/Position" name="title" value={formData.title} onChange={handleChange} />
                    <Input label="Department" name="department" value={formData.department} onChange={handleChange} />
                    <Input label="University" name="university" value={formData.university} onChange={handleChange} />
                    <Input label="Email" name="email" value={formData.email} onChange={handleChange} />
                    <Input label="Email" name="email" value={formData.email} onChange={handleChange} />
                    <ImageUpload label="Profile Image" value={formData.imageUrl} onChange={(url) => setFormData({ ...formData, imageUrl: url })} />
                    <TextArea label="Intro Text (Short)" name="introText" value={formData.introText} onChange={handleChange} rows={3} />
                    <TextArea label="About (Long)" name="about" value={formData.about} onChange={handleChange} rows={6} />
                </Section>

                {/* Home Page Lists */}
                <Section title="Home Page Lists">
                    <StringArrayEditor
                        label="Highlights (One per line)"
                        value={formData.highlights || []}
                        onChange={(val) => handleArrayChange('highlights', val)}
                    />
                    <StringArrayEditor
                        label="Working On (One per line)"
                        value={formData.workingOn || []}
                        onChange={(val) => handleArrayChange('workingOn', val)}
                    />
                    <StringArrayEditor
                        label="International Exposure (One per line)"
                        value={formData.internationalExposure || []}
                        onChange={(val) => handleArrayChange('internationalExposure', val)}
                    />
                </Section>



                {/* Experience */}
                <Section title="Experience">
                    <ObjectArrayEditor
                        data={formData.experience || []}
                        onChange={(val) => handleArrayChange('experience', val)}
                        fields={[
                            { name: 'role', label: 'Role' },
                            { name: 'organization', label: 'Organization' },
                            { name: 'department', label: 'Department' },
                            { name: 'year', label: 'Year' },
                            { name: 'details', label: 'Details', type: 'textarea' },
                        ]}
                        titleKey="role"
                    />
                </Section>

                {/* Education */}
                <Section title="Education">
                    <ObjectArrayEditor
                        data={formData.education || []}
                        onChange={(val) => handleArrayChange('education', val)}
                        fields={[
                            { name: 'degree', label: 'Degree' },
                            { name: 'field', label: 'Field' },
                            { name: 'institute', label: 'Institute' },
                            { name: 'year', label: 'Year' },
                            { name: 'details', label: 'Details', type: 'textarea' },
                        ]}
                        titleKey="degree"
                    />
                </Section>
            </div>
        </div>
    );
};

// Helper Components
const Section = ({ title, children }) => (
    <div style={{ border: '1px solid var(--border-light)', padding: '1.5rem', borderRadius: '8px', background: 'white' }}>
        <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>{title}</h3>
        <div style={{ display: 'grid', gap: '1rem' }}>{children}</div>
    </div>
);

const Input = ({ label, name, value, onChange, ...props }) => (
    <div className="form-group">
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>
            {label} {props.required && <span style={{ color: 'red' }}>*</span>}
        </label>
        <input
            type="text"
            name={name}
            value={value || ''}
            onChange={onChange}
            style={{ width: '100%', padding: '0.6rem', border: '1px solid var(--border-light)', borderRadius: '4px' }}
            {...props}
        />
    </div>
);

const TextArea = ({ label, name, value, onChange, rows }) => (
    <div className="form-group">
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>{label}</label>
        <textarea
            name={name}
            value={value || ''}
            onChange={onChange}
            rows={rows}
            style={{ width: '100%', padding: '0.6rem', border: '1px solid var(--border-light)', borderRadius: '4px', resize: 'vertical' }}
        />
    </div>
);

const StringArrayEditor = ({ label, value, onChange }) => {
    // Safety check just in case value is not array
    const safeValue = Array.isArray(value) ? value : [];
    const textValue = safeValue.join('\n');

    const handleChange = (e) => {
        const newVal = e.target.value.split('\n');
        onChange(newVal);
    };
    return (
        <TextArea label={label} value={textValue} onChange={handleChange} rows={5} />
    );
};

const ObjectArrayEditor = ({ data, onChange, fields, titleKey }) => {
    const [expandedIndex, setExpandedIndex] = useState(null);
    const safeData = Array.isArray(data) ? data : [];

    const handleAdd = () => {
        onChange([...safeData, {}]);
        setExpandedIndex(safeData.length);
    };

    const handleRemove = (index) => {
        const newData = [...safeData];
        newData.splice(index, 1);
        onChange(newData);
    };

    const handleChange = (index, field, value) => {
        const newData = [...safeData];
        newData[index] = { ...newData[index], [field]: value };
        onChange(newData);
    };

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {safeData.map((item, index) => (
                    <div key={index} style={{ border: '1px solid var(--border-light)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div
                            style={{
                                padding: '0.8rem',
                                background: 'var(--bg-gray)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                cursor: 'pointer'
                            }}
                            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                        >
                            <span style={{ fontWeight: 500 }}>{item[titleKey] || `Item ${index + 1}`}</span>
                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleRemove(index); }}
                                    style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer' }}
                                >
                                    <Trash2 size={16} />
                                </button>
                                {expandedIndex === index ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </div>
                        </div>

                        {expandedIndex === index && (
                            <div style={{ padding: '1rem', background: 'white', display: 'grid', gap: '0.8rem' }}>
                                {fields.map(field => (
                                    <div key={field.name}>
                                        <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.85rem', fontWeight: 500 }}>{field.label}</label>
                                        {field.type === 'textarea' ? (
                                            <textarea
                                                value={item[field.name] || ''}
                                                onChange={(e) => handleChange(index, field.name, e.target.value)}
                                                rows={3}
                                                style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border-light)', borderRadius: '4px' }}
                                            />
                                        ) : field.type === 'tags' ? (
                                            <input
                                                type="text"
                                                value={Array.isArray(item[field.name]) ? item[field.name].join(', ') : item[field.name] || ''}
                                                onChange={(e) => handleChange(index, field.name, e.target.value.split(',').map(s => s.trim()))}
                                                placeholder="e.g. AI, ML, Data Science"
                                                style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border-light)', borderRadius: '4px' }}
                                            />
                                        ) : (
                                            <input
                                                type="text"
                                                value={item[field.name] || ''}
                                                onChange={(e) => handleChange(index, field.name, e.target.value)}
                                                style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border-light)', borderRadius: '4px' }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <button
                onClick={handleAdd}
                style={{
                    marginTop: '1rem',
                    width: '100%',
                    padding: '0.8rem',
                    background: 'none',
                    border: '1px dashed var(--border-light)',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '0.5rem',
                    borderRadius: '4px'
                }}
            >
                <Plus size={16} /> Add New Item
            </button>
        </div>
    );
};

const ImageUpload = ({ label, value, onChange }) => {
    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        setUploading(true);
        try {
            const { data } = await api.post('/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            onChange(data.url);
            toast.success('Image uploaded successfully');
        } catch (error) {
            console.error('Upload failed:', error);
            toast.error('Image upload failed');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="form-group">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>{label}</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {value && (
                    <div style={{ position: 'relative', width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--border-light)' }}>
                        <img src={value} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <button
                            onClick={() => onChange('')}
                            style={{ position: 'absolute', top: 0, right: 0, background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', cursor: 'pointer', padding: '2px' }}
                        >
                            <X size={14} />
                        </button>
                    </div>
                )}
                <div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        id="profile-image-upload"
                    />
                    <label
                        htmlFor="profile-image-upload"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.6rem 1rem',
                            background: uploading ? 'var(--bg-gray)' : 'white',
                            border: '1px solid var(--border-light)',
                            borderRadius: '4px',
                            cursor: uploading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {uploading ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />}
                        {uploading ? 'Uploading...' : 'Upload New Image'}
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
