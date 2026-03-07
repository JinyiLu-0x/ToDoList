import React, { useState, useEffect } from 'react';
import { routines as initialRoutines } from '../data';
import { CheckCircle2, Circle, RotateCcw, PlusCircle, Edit2, Check, X, Trash2 } from 'lucide-react';

const WeeklyRoutine = ({ courses = [] }) => {
    const [routineItems, setRoutineItems] = useState([]);
    const [checkedItems, setCheckedItems] = useState({});
    const [isAdding, setIsAdding] = useState(false);
    const [newItem, setNewItem] = useState({ name: '', course: '', deadline: '' });
    const [editingId, setEditingId] = useState(null);
    const [editValue, setEditValue] = useState({ name: '', course: '', deadline: '' });
    const [confirmingDeleteId, setConfirmingDeleteId] = useState(null);

    useEffect(() => {
        const savedRoutines = localStorage.getItem('routine_items');
        if (savedRoutines) {
            const parsed = JSON.parse(savedRoutines);
            if (parsed.length > 0) {
                setRoutineItems(parsed);
            } else {
                setRoutineItems(initialRoutines);
            }
        } else {
            setRoutineItems(initialRoutines);
        }
        const savedChecks = localStorage.getItem('routine_checks');
        if (savedChecks) {
            setCheckedItems(JSON.parse(savedChecks));
        }
    }, []);

    const saveRoutines = (items) => {
        setRoutineItems(items);
        localStorage.setItem('routine_items', JSON.stringify(items));
    };

    const toggleCheck = (id) => {
        const newChecked = { ...checkedItems, [id]: !checkedItems[id] };
        setCheckedItems(newChecked);
        localStorage.setItem('routine_checks', JSON.stringify(newChecked));
    };

    const getCourseColor = (courseId) => {
        const c = courses.find(c => c.id === courseId);
        return c ? c.color : 'var(--accent)';
    };

    const handleClear = () => {
        if (window.confirm("新的一周！确定清空本周所有的常规打卡记录吗？ (Clear all routine checks?)")) {
            setCheckedItems({});
            localStorage.setItem('routine_checks', JSON.stringify({}));
        }
    };

    const handleAdd = () => {
        if (!newItem.name.trim()) return;
        const id = 'r_' + Date.now();
        saveRoutines([...routineItems, { id, name: newItem.name.trim(), course: newItem.course || 'General', deadline: newItem.deadline }]);
        setNewItem({ name: '', course: '', deadline: '' });
        setIsAdding(false);
    };

    const startEdit = (routine) => {
        setEditingId(routine.id);
        setEditValue({ name: routine.name, course: routine.course, deadline: routine.deadline || '' });
        setConfirmingDeleteId(null);
    };

    const saveEdit = (id) => {
        if (!editValue.name.trim()) return;
        saveRoutines(routineItems.map(r => r.id === id ? { ...r, name: editValue.name.trim(), course: editValue.course, deadline: editValue.deadline } : r));
        setEditingId(null);
    };

    const deleteRoutine = (id) => {
        saveRoutines(routineItems.filter(r => r.id !== id));
        setConfirmingDeleteId(null);
    };

    return (
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.75rem', marginBottom: '0.5rem', color: 'var(--text-primary)', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={20} color="var(--accent)" />
                    每周常规打卡 (Weekly Routine)
                </div>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button
                        onClick={() => setIsAdding(true)}
                        style={{ background: 'transparent', border: '1px solid var(--card-border)', borderRadius: '8px', cursor: 'pointer', padding: '0.3rem 0.6rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', transition: 'all 0.2s' }}
                        onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--text-primary)'; }}
                        onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--card-border)'; }}
                        title="Add routine"
                    >
                        <PlusCircle size={14} /> Add
                    </button>
                    <button
                        onClick={handleClear}
                        style={{ background: 'transparent', border: '1px solid var(--card-border)', borderRadius: '8px', cursor: 'pointer', padding: '0.3rem 0.6rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', transition: 'all 0.2s' }}
                        onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--text-primary)'; }}
                        onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--card-border)'; }}
                        title="Clear for new week"
                    >
                        <RotateCcw size={14} /> Clear
                    </button>
                </div>
            </h2>

            {isAdding && (
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', padding: '0.5rem', border: '1px dashed var(--accent)', borderRadius: '8px', backgroundColor: 'rgba(0,0,0,0.05)' }}>
                    <select
                        value={newItem.course}
                        onChange={e => setNewItem({ ...newItem, course: e.target.value })}
                        style={{ padding: '0.3rem', borderRadius: '4px', border: '1px solid var(--card-border)', background: 'var(--bg-color)', color: 'var(--text-primary)', fontSize: '0.8rem' }}
                    >
                        <option value="">Course</option>
                        {courses.map(c => <option key={c.id} value={c.id}>{c.id}</option>)}
                    </select>
                    <input
                        autoFocus
                        value={newItem.name}
                        onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                        onKeyDown={e => { if (e.key === 'Enter') handleAdd(); if (e.key === 'Escape') setIsAdding(false); }}
                        placeholder="Routine name"
                        style={{ flex: 1, minWidth: '150px', padding: '0.3rem 0.5rem', borderRadius: '4px', border: '1px solid var(--card-border)', background: 'transparent', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                    />
                    <button onClick={handleAdd} style={{ background: 'var(--accent)', color: 'white', border: 'none', borderRadius: '4px', padding: '0.3rem 0.6rem', cursor: 'pointer', fontSize: '0.8rem' }}><Check size={14} /></button>
                    <button onClick={() => setIsAdding(false)} style={{ background: 'transparent', border: '1px solid var(--card-border)', color: 'var(--text-secondary)', borderRadius: '4px', padding: '0.3rem 0.6rem', cursor: 'pointer', fontSize: '0.8rem' }}><X size={14} /></button>
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {routineItems.map(routine => {
                    const isChecked = checkedItems[routine.id] || false;
                    const courseColor = getCourseColor(routine.course);
                    const isEditing = editingId === routine.id;

                    if (isEditing) {
                        return (
                            <div key={routine.id} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', padding: '0.5rem 0 0.5rem 0.5rem', borderBottom: '1px solid var(--card-border)', borderLeft: `3px solid ${courseColor}` }}>
                                <select
                                    value={editValue.course}
                                    onChange={e => setEditValue({ ...editValue, course: e.target.value })}
                                    style={{ padding: '0.2rem', borderRadius: '4px', border: '1px solid var(--card-border)', background: 'var(--bg-color)', color: 'var(--text-primary)', fontSize: '0.8rem' }}
                                >
                                    {courses.map(c => <option key={c.id} value={c.id}>{c.id}</option>)}
                                </select>
                                <input
                                    autoFocus
                                    value={editValue.name}
                                    onChange={e => setEditValue({ ...editValue, name: e.target.value })}
                                    onKeyDown={e => { if (e.key === 'Enter') saveEdit(routine.id); if (e.key === 'Escape') setEditingId(null); }}
                                    style={{ flex: 1, padding: '0.2rem 0.4rem', borderRadius: '4px', border: '1px solid var(--accent)', background: 'transparent', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                                />
                                <button onClick={() => saveEdit(routine.id)} style={{ background: 'var(--accent)', color: 'white', border: 'none', borderRadius: '4px', padding: '0.2rem 0.5rem', cursor: 'pointer' }}><Check size={14} /></button>
                                <button onClick={() => setEditingId(null)} style={{ background: 'transparent', border: '1px solid var(--card-border)', color: 'var(--text-secondary)', borderRadius: '4px', padding: '0.2rem 0.5rem', cursor: 'pointer' }}><X size={14} /></button>
                            </div>
                        );
                    }

                    return (
                        <div
                            key={routine.id}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.75rem 0 0.75rem 0.5rem',
                                borderBottom: '1px solid var(--card-border)',
                                borderLeft: `3px solid ${courseColor}`,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                opacity: isChecked ? 0.4 : 1,
                                position: 'relative'
                            }}
                        >
                            <div style={{ marginTop: '0.1rem' }} onClick={() => toggleCheck(routine.id)}>
                                {isChecked ?
                                    <CheckCircle2 color={courseColor} size={18} /> :
                                    <Circle color="var(--text-secondary)" size={18} />
                                }
                            </div>
                            <div style={{ flex: 1 }} onClick={() => toggleCheck(routine.id)}>
                                <div style={{ fontWeight: '500', fontSize: '0.9rem', color: isChecked ? 'var(--text-secondary)' : 'var(--text-primary)', textDecoration: isChecked ? 'line-through' : 'none', marginBottom: '0.2rem' }}>
                                    [{routine.course}] {routine.name}
                                </div>
                                {routine.deadline && (
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                        Due: {routine.deadline}
                                    </div>
                                )}
                            </div>
                            {/* Edit/Delete buttons */}
                            <div style={{ display: 'flex', gap: '0.2rem', marginRight: '0.25rem' }}>
                                {confirmingDeleteId === routine.id ? (
                                    <div style={{ display: 'flex', gap: '0.3rem', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.7rem', color: '#ef4444' }}>Delete?</span>
                                        <button onClick={(e) => { e.stopPropagation(); deleteRoutine(routine.id); }} style={{ background: '#ef4444', border: 'none', color: 'white', padding: '0.15rem 0.4rem', borderRadius: '4px', fontSize: '0.65rem', cursor: 'pointer' }}>Yes</button>
                                        <button onClick={(e) => { e.stopPropagation(); setConfirmingDeleteId(null); }} style={{ background: 'transparent', border: '1px solid var(--card-border)', color: 'var(--text-secondary)', padding: '0.15rem 0.4rem', borderRadius: '4px', fontSize: '0.65rem', cursor: 'pointer' }}>No</button>
                                    </div>
                                ) : (
                                    <>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); startEdit(routine); }}
                                            style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.15rem', opacity: 0.5 }}
                                            onMouseEnter={e => { e.currentTarget.style.opacity = 1; }}
                                            onMouseLeave={e => { e.currentTarget.style.opacity = 0.5; }}
                                            title="Edit"
                                        >
                                            <Edit2 size={13} />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setConfirmingDeleteId(routine.id); }}
                                            style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.15rem', opacity: 0.5 }}
                                            onMouseEnter={e => { e.currentTarget.style.opacity = 1; e.currentTarget.style.color = '#ef4444'; }}
                                            onMouseLeave={e => { e.currentTarget.style.opacity = 0.5; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                                            title="Delete"
                                        >
                                            <Trash2 size={13} />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default WeeklyRoutine;
