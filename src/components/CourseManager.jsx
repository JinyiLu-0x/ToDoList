import React, { useState } from 'react';
import { PlusCircle, Edit2, Check, X } from 'lucide-react';

const presetColors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#10b981', '#06b6d4', '#3b82f6', '#8b5cf6', '#a855f7', '#ec4899'];

const CourseManager = ({ courses = [], setCourses }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [confirmingDeleteId, setConfirmingDeleteId] = useState(null);
    const [editingCourseId, setEditingCourseId] = useState(null);
    const [editCourseValue, setEditCourseValue] = useState(null);
    const [newCourse, setNewCourse] = useState({ id: '', name: '', type: '个人', color: '#6366f1' });

    const handleAddCourse = () => {
        if (!newCourse.id.trim() || !newCourse.name.trim()) return;
        setCourses([...courses, { ...newCourse, id: newCourse.id.trim() }]);
        setNewCourse({ id: '', name: '', type: '个人', color: '#6366f1' });
        setIsAdding(false);
    };

    const handleDeleteCourse = (idToRemove) => {
        setCourses(courses.filter(c => c.id !== idToRemove));
        setConfirmingDeleteId(null);
    };

    const startEditing = (course) => {
        setEditingCourseId(course.id);
        setEditCourseValue({ ...course });
        setConfirmingDeleteId(null);
    };

    const saveEditCourse = () => {
        if (!editCourseValue.id.trim() || !editCourseValue.name.trim()) return;
        setCourses(courses.map(c => c.id === editingCourseId ? { ...editCourseValue, id: editCourseValue.id.trim() } : c));
        setEditingCourseId(null);
    };

    return (
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>Units / Courses</h2>
                {!isAdding && (
                    <button
                        onClick={() => setIsAdding(true)}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'var(--accent)', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '500' }}
                    >
                        <PlusCircle size={14} /> Add Unit
                    </button>
                )}
            </div>

            {isAdding && (
                <div style={{ backgroundColor: 'rgba(0,0,0,0.1)', border: '1px dashed var(--accent)', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <input
                            placeholder="Unit ID (e.g. FIT1000)"
                            value={newCourse.id}
                            onChange={e => setNewCourse({ ...newCourse, id: e.target.value })}
                            style={{ flex: 1, minWidth: '120px', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--card-border)', background: 'transparent', color: 'var(--text-primary)' }}
                        />
                        <input
                            placeholder="Full Name (e.g. FIT1000 导论)"
                            value={newCourse.name}
                            onChange={e => setNewCourse({ ...newCourse, name: e.target.value })}
                            style={{ flex: 2, minWidth: '200px', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--card-border)', background: 'transparent', color: 'var(--text-primary)' }}
                        />
                        <input
                            placeholder="Type (e.g. 全个人)"
                            value={newCourse.type}
                            onChange={e => setNewCourse({ ...newCourse, type: e.target.value })}
                            style={{ flex: 1, minWidth: '120px', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--card-border)', background: 'transparent', color: 'var(--text-primary)' }}
                        />
                    </div>

                    <div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Select Color:</div>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {presetColors.map(color => (
                                <button
                                    key={color}
                                    onClick={() => setNewCourse({ ...newCourse, color })}
                                    style={{
                                        width: '24px', height: '24px', borderRadius: '50%', backgroundColor: color,
                                        border: newCourse.color === color ? '2px solid white' : '2px solid transparent',
                                        cursor: 'pointer', outline: newCourse.color === color ? '2px solid var(--accent)' : 'none'
                                    }}
                                />
                            ))}
                            <input
                                type="color"
                                value={newCourse.color}
                                onChange={e => setNewCourse({ ...newCourse, color: e.target.value })}
                                style={{ width: '28px', height: '28px', border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                        <button onClick={() => setIsAdding(false)} style={{ padding: '0.4rem 1rem', borderRadius: '6px', border: '1px solid var(--card-border)', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }}>Cancel</button>
                        <button onClick={handleAddCourse} style={{ padding: '0.4rem 1rem', borderRadius: '6px', border: 'none', background: 'var(--accent)', color: 'white', cursor: 'pointer', fontWeight: '500' }}>Save Course</button>
                    </div>
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                {courses.map(c => (
                    <div key={c.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem', backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: '8px', border: '1px solid var(--card-border)', position: 'relative' }}>
                        <div style={{ width: '6px', alignSelf: 'stretch', backgroundColor: c.color, borderRadius: '4px' }}></div>

                        {editingCourseId === c.id ? (
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <input
                                        value={editCourseValue.id}
                                        onChange={e => setEditCourseValue({ ...editCourseValue, id: e.target.value })}
                                        placeholder="Unit ID"
                                        style={{ width: '80px', padding: '0.2rem', background: 'transparent', border: '1px solid var(--accent)', color: 'var(--text-primary)', borderRadius: '4px', fontSize: '0.9rem' }}
                                    />
                                    <input
                                        value={editCourseValue.name}
                                        onChange={e => setEditCourseValue({ ...editCourseValue, name: e.target.value })}
                                        placeholder="Name"
                                        style={{ flex: 1, padding: '0.2rem', background: 'transparent', border: '1px solid var(--accent)', color: 'var(--text-primary)', borderRadius: '4px', fontSize: '0.9rem' }}
                                    />
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    <input
                                        value={editCourseValue.type}
                                        onChange={e => setEditCourseValue({ ...editCourseValue, type: e.target.value })}
                                        placeholder="Type"
                                        style={{ width: '80px', padding: '0.2rem', background: 'transparent', border: '1px solid var(--accent)', color: 'var(--text-primary)', borderRadius: '4px', fontSize: '0.8rem' }}
                                    />
                                    <input
                                        type="color"
                                        value={editCourseValue.color}
                                        onChange={e => setEditCourseValue({ ...editCourseValue, color: e.target.value })}
                                        style={{ width: '24px', height: '24px', border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}
                                    />
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.2rem' }}>
                                    <button onClick={saveEditCourse} style={{ flex: 1, background: 'var(--accent)', color: 'white', border: 'none', borderRadius: '4px', padding: '0.2rem', cursor: 'pointer', fontSize: '0.8rem' }}><Check size={14} style={{ verticalAlign: 'middle' }} /> Save</button>
                                    <button onClick={() => setEditingCourseId(null)} style={{ flex: 1, background: 'transparent', border: '1px solid var(--card-border)', color: 'var(--text-secondary)', borderRadius: '4px', padding: '0.2rem', cursor: 'pointer', fontSize: '0.8rem' }}>Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: '600', color: c.color, fontSize: '1.1rem', marginBottom: '0.2rem' }}>{c.id}</div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>{c.name}</div>
                                <div style={{ display: 'inline-block', fontSize: '0.75rem', backgroundColor: 'rgba(255,255,255,0.05)', padding: '0.15rem 0.5rem', borderRadius: '4px', color: 'var(--text-secondary)' }}>
                                    {c.type}
                                </div>
                            </div>
                        )}

                        {!editingCourseId && (
                            confirmingDeleteId === c.id ? (
                                <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', display: 'flex', gap: '0.4rem', alignItems: 'center', background: 'var(--card-bg)', padding: '0.2rem', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                                    <span style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: '500' }}>Delete?</span>
                                    <button onClick={() => handleDeleteCourse(c.id)} style={{ background: '#ef4444', border: 'none', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', cursor: 'pointer', fontWeight: 'bold' }}>Yes</button>
                                    <button onClick={() => setConfirmingDeleteId(null)} style={{ background: 'transparent', border: '1px solid var(--card-border)', color: 'var(--text-secondary)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', cursor: 'pointer' }}>No</button>
                                </div>
                            ) : (
                                <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', display: 'flex', gap: '0.2rem' }}>
                                    <button
                                        onClick={() => startEditing(c)}
                                        style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.2rem', opacity: 0.6 }}
                                        onMouseEnter={e => { e.currentTarget.style.opacity = 1; e.currentTarget.style.color = 'var(--text-primary)'; }}
                                        onMouseLeave={e => { e.currentTarget.style.opacity = 0.6; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                                        title="Edit Course"
                                    >
                                        <Edit2 size={14} />
                                    </button>
                                    <button
                                        onClick={() => setConfirmingDeleteId(c.id)}
                                        style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.2rem', opacity: 0.6 }}
                                        onMouseEnter={e => { e.currentTarget.style.opacity = 1; e.currentTarget.style.color = '#ef4444'; }}
                                        onMouseLeave={e => { e.currentTarget.style.opacity = 0.6; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                                        title="Remove Course"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            )
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseManager;
