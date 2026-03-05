import React, { useState, useEffect } from 'react';
import { timeline as initialTimeline } from '../data';
import { Calendar, Star, Edit2, Check, Trash2, PlusCircle, X, CheckCircle2, Circle } from 'lucide-react';

const DeadlineTimeline = ({ courses = [] }) => {
    const [timelineData, setTimelineData] = useState([]);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editValue, setEditValue] = useState({ name: '', deadline: '', details: '', weight: '', tags: [], weekIndex: 0 });
    const [isAddingToWeek, setIsAddingToWeek] = useState(null);
    const [confirmingDeleteId, setConfirmingDeleteId] = useState(null);
    const [newTaskValue, setNewTaskValue] = useState({ name: '', deadline: '', details: '', course: 'General', type: 'Task' });
    const [tempTag, setTempTag] = useState('');
    const [addingTagToTaskId, setAddingTagToTaskId] = useState(null);
    const [newTagInline, setNewTagInline] = useState('');

    useEffect(() => {
        const saved = localStorage.getItem('timeline_data');
        if (saved) {
            setTimelineData(JSON.parse(saved));
        } else {
            setTimelineData(initialTimeline);
        }
    }, []);

    const saveTimeline = (newData) => {
        setTimelineData(newData);
        localStorage.setItem('timeline_data', JSON.stringify(newData));
    };

    const handleEditTaskDetail = (weekIndex, taskId) => {
        let newData = [...timelineData];
        let taskToMove = newData[weekIndex].tasks.find(t => t.id === taskId);

        if (taskToMove) {
            const updatedTask = { ...taskToMove, name: editValue.name, deadline: editValue.deadline, details: editValue.details, tags: editValue.tags, weight: editValue.weight };

            if (weekIndex !== editValue.weekIndex) {
                // Moving to a new week
                newData[weekIndex] = { ...newData[weekIndex], tasks: newData[weekIndex].tasks.filter(t => t.id !== taskId) };
                newData[editValue.weekIndex] = { ...newData[editValue.weekIndex], tasks: [...newData[editValue.weekIndex].tasks, updatedTask] };
            } else {
                // Updating in the same week
                newData[weekIndex] = { ...newData[weekIndex], tasks: newData[weekIndex].tasks.map(t => t.id === taskId ? updatedTask : t) };
            }
        }

        saveTimeline(newData);
        setEditingTaskId(null);
    };

    const handleDeleteTask = (weekIndex, taskId) => {
        const newData = timelineData.map((week, idx) => {
            if (idx === weekIndex) {
                return { ...week, tasks: week.tasks.filter(t => t.id !== taskId) };
            }
            return week;
        });
        saveTimeline(newData);
        setConfirmingDeleteId(null);
    };

    const toggleTaskDone = (weekIndex, taskId) => {
        const newData = timelineData.map((week, idx) => {
            if (idx === weekIndex) {
                return {
                    ...week,
                    tasks: week.tasks.map(t => t.id === taskId ? { ...t, isDone: !t.isDone } : t)
                };
            }
            return week;
        });
        saveTimeline(newData);
    };

    const handleAddTagInline = (weekIndex, taskId) => {
        if (!newTagInline.trim()) {
            setAddingTagToTaskId(null);
            return;
        }
        const newData = timelineData.map((week, idx) => {
            if (idx === weekIndex) {
                return {
                    ...week,
                    tasks: week.tasks.map(t => t.id === taskId ? { ...t, tags: [...(t.tags || []), newTagInline.trim()] } : t)
                };
            }
            return week;
        });
        saveTimeline(newData);
        setAddingTagToTaskId(null);
        setNewTagInline('');
    };

    const handleRemoveTagInline = (weekIndex, taskId, tagIndex) => {
        const newData = timelineData.map((week, idx) => {
            if (idx === weekIndex) {
                return {
                    ...week,
                    tasks: week.tasks.map(t => t.id === taskId ? { ...t, tags: (t.tags || []).filter((_, i) => i !== tagIndex) } : t)
                };
            }
            return week;
        });
        saveTimeline(newData);
    };

    const handleAddTask = (weekIndex) => {
        if (!newTaskValue.name.trim()) return;
        const newData = [...timelineData];
        const newTask = {
            id: 'task_' + Date.now(),
            course: newTaskValue.course,
            type: newTaskValue.type,
            name: newTaskValue.name,
            deadline: newTaskValue.deadline,
            details: newTaskValue.details,
            isCritical: false,
            weight: '',
            tags: []
        };
        newData[weekIndex].tasks.push(newTask);
        saveTimeline(newData);
        setIsAddingToWeek(null);
        setNewTaskValue({ name: '', details: '', course: 'General', type: 'Task' });
    };

    const startEditing = (task, weekIndex) => {
        setEditingTaskId(task.id);
        setEditValue({ name: task.name || '', deadline: task.deadline || '', details: task.details || '', tags: task.tags || [], weight: task.weight || '', weekIndex });
        setTempTag('');
    };

    const toggleStar = (weekIndex, taskId) => {
        const newData = timelineData.map((week, idx) => {
            if (idx === weekIndex) {
                return { ...week, tasks: week.tasks.map(t => t.id === taskId ? { ...t, isCritical: !t.isCritical } : t) };
            }
            return week;
        });
        saveTimeline(newData);
    };



    const getCourseColor = (courseId) => {
        const course = courses.find(c => c.id === courseId);
        return course ? course.color : '#6b7280';
    };

    const getCourseName = (courseId) => {
        const course = courses.find(c => c.id === courseId);
        return course ? course.name : courseId;
    };

    const getCourseType = (courseId) => {
        const course = courses.find(c => c.id === courseId);
        return course ? course.type : '';
    };

    return (
        <div style={{ backgroundColor: 'var(--card-bg)', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', flex: 1, minWidth: '300px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
                <Calendar />
                12-Week Timeline
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {timelineData.map((weekData, index) => (
                    <div key={weekData.week} style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '1rem', position: 'relative' }}>
                        {/* Timeline dot */}
                        <div style={{
                            position: 'absolute',
                            left: '-7px',
                            top: '0',
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--accent)',
                            border: '2px solid var(--card-bg)'
                        }} />

                        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                            {weekData.week}
                        </h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {weekData.tasks.map((task) => {
                                const isEditing = editingTaskId === task.id;
                                return (
                                    <div
                                        key={task.id}
                                        style={{
                                            backgroundColor: 'var(--task-bg)',
                                            borderRadius: '8px',
                                            padding: '1rem',
                                            border: '1px solid var(--card-border)',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start',
                                            opacity: task.isDone ? 0.35 : 1,
                                            filter: task.isDone ? 'grayscale(100%)' : 'none',
                                            transform: task.isDone ? 'scale(0.98)' : 'scale(1)',
                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flex: 1 }}>
                                            <div style={{ width: '130px', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingTop: '0.2rem' }}>
                                                <div style={{
                                                    padding: '0.3rem 0.5rem',
                                                    borderRadius: '6px',
                                                    fontSize: '0.8rem',
                                                    fontWeight: 'bold',
                                                    backgroundColor: getCourseColor(task.course),
                                                    color: 'white',
                                                    width: '100%',
                                                    textAlign: 'center',
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis'
                                                }}>
                                                    {getCourseName(task.course)}
                                                </div>
                                            </div>

                                            {/* Task Content */}
                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                                    <button onClick={() => toggleTaskDone(index, task.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
                                                        {task.isDone ? <CheckCircle2 size={18} color="var(--accent)" /> : <Circle size={18} color="var(--text-secondary)" />}
                                                    </button>
                                                    <button onClick={(e) => { e.stopPropagation(); toggleStar(index, task.id); }} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }} title="Toggle star">
                                                        <Star size={14} fill={task.isCritical ? '#f59e0b' : 'none'} color={task.isCritical ? '#f59e0b' : 'var(--text-secondary)'} style={{ flexShrink: 0, opacity: task.isCritical ? 1 : 0.4 }} />
                                                    </button>
                                                    {isEditing ? (
                                                        <div style={{ display: 'flex', gap: '0.4rem', flex: 1, alignItems: 'center' }}>
                                                            <input
                                                                value={editValue.name}
                                                                onChange={(e) => setEditValue({ ...editValue, name: e.target.value })}
                                                                placeholder="Task Name"
                                                                style={{
                                                                    flex: 1,
                                                                    background: 'rgba(0,0,0,0.1)',
                                                                    border: '1px solid var(--accent)',
                                                                    color: 'var(--text-primary)',
                                                                    padding: '0.25rem 0.5rem',
                                                                    borderRadius: '4px',
                                                                    fontWeight: '500',
                                                                    outline: 'none'
                                                                }}
                                                            />
                                                            <input
                                                                value={editValue.weight}
                                                                onChange={(e) => setEditValue({ ...editValue, weight: e.target.value })}
                                                                placeholder="Weight (e.g. 20%)"
                                                                style={{
                                                                    width: '120px',
                                                                    background: 'rgba(0,0,0,0.1)',
                                                                    border: '1px solid var(--accent)',
                                                                    color: 'var(--text-primary)',
                                                                    padding: '0.25rem 0.5rem',
                                                                    borderRadius: '4px',
                                                                    fontWeight: '500',
                                                                    outline: 'none',
                                                                    fontSize: '0.9rem'
                                                                }}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div
                                                            style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', flexWrap: 'wrap' }}
                                                            onClick={(e) => { e.stopPropagation(); startEditing(task, index); }}
                                                            title="Click to edit task name and weight"
                                                        >
                                                            <span style={{
                                                                fontWeight: '600',
                                                                color: 'var(--text-primary)',
                                                                textDecoration: task.isDone ? 'line-through 2px' : 'none',
                                                                opacity: task.isDone ? 0.6 : 1
                                                            }}>
                                                                {task.name}
                                                            </span>
                                                            {task.weight && (
                                                                <span style={{
                                                                    fontSize: '0.75rem',
                                                                    fontWeight: 'bold',
                                                                    color: 'var(--accent)',
                                                                    backgroundColor: 'rgba(59, 130, 246, 0.15)',
                                                                    padding: '0.15rem 0.5rem',
                                                                    borderRadius: '12px',
                                                                    border: '1px solid currentColor',
                                                                    opacity: task.isDone ? 0.5 : 1
                                                                }}>
                                                                    {task.weight}
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>

                                                {isEditing ? (
                                                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                                                        <select
                                                            value={editValue.weekIndex}
                                                            onChange={(e) => setEditValue({ ...editValue, weekIndex: parseInt(e.target.value, 10) })}
                                                            style={{
                                                                background: 'rgba(0,0,0,0.1)',
                                                                border: '1px solid var(--card-border)',
                                                                color: 'var(--text-primary)',
                                                                padding: '0.25rem 0.5rem',
                                                                borderRadius: '4px',
                                                                fontSize: '0.8rem',
                                                                outline: 'none',
                                                                cursor: 'pointer',
                                                                maxWidth: '120px'
                                                            }}
                                                        >
                                                            {timelineData.map((w, i) => (
                                                                <option key={i} value={i} style={{ color: 'black' }}>{w.week}</option>
                                                            ))}
                                                        </select>
                                                        <input
                                                            value={editValue.deadline}
                                                            onChange={(e) => setEditValue({ ...editValue, deadline: e.target.value })}
                                                            placeholder="截止时间 e.g. 3月27日 11:55 PM"
                                                            style={{
                                                                width: '180px',
                                                                background: 'rgba(0,0,0,0.1)',
                                                                border: '1px solid rgba(239,68,68,0.4)',
                                                                color: 'var(--text-primary)',
                                                                padding: '0.25rem 0.5rem',
                                                                borderRadius: '4px',
                                                                fontSize: '0.8rem',
                                                                outline: 'none'
                                                            }}
                                                        />
                                                        <input
                                                            autoFocus
                                                            value={editValue.details}
                                                            onChange={(e) => setEditValue({ ...editValue, details: e.target.value })}
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') handleEditTaskDetail(index, task.id);
                                                                if (e.key === 'Escape') setEditingTaskId(null);
                                                            }}
                                                            placeholder="描述/备注"
                                                            style={{
                                                                flex: 1,
                                                                minWidth: '150px',
                                                                background: 'rgba(0,0,0,0.1)',
                                                                border: '1px solid var(--card-border)',
                                                                color: 'var(--text-primary)',
                                                                padding: '0.25rem 0.5rem',
                                                                borderRadius: '4px',
                                                                fontSize: '0.8rem',
                                                                outline: 'none'
                                                            }}
                                                        />
                                                        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center', width: '100%' }}>
                                                            {editValue.tags && editValue.tags.map((tag, i) => (
                                                                <span key={i} style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', backgroundColor: 'var(--bg-color)', border: '1px solid var(--card-border)', borderRadius: '12px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                                                                    {tag}
                                                                    <X size={10} cursor="pointer" onClick={() => setEditValue({ ...editValue, tags: editValue.tags.filter((_, idx) => idx !== i) })} />
                                                                </span>
                                                            ))}
                                                            <input
                                                                value={tempTag}
                                                                onChange={e => setTempTag(e.target.value)}
                                                                onKeyDown={e => {
                                                                    if (e.key === 'Enter' && tempTag.trim()) {
                                                                        e.preventDefault();
                                                                        setEditValue({ ...editValue, tags: [...(editValue.tags || []), tempTag.trim()] });
                                                                        setTempTag('');
                                                                    }
                                                                }}
                                                                placeholder="+ Add tag"
                                                                style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', background: 'transparent', border: '1px dashed var(--card-border)', borderRadius: '12px', color: 'var(--text-primary)', width: '70px', outline: 'none' }}
                                                            />
                                                        </div>
                                                        <div style={{ display: 'flex', gap: '0.5rem', width: '100%', justifyContent: 'flex-end', marginTop: '0.25rem' }}>
                                                            <button
                                                                onClick={() => handleEditTaskDetail(index, task.id)}
                                                                style={{ background: 'var(--accent)', color: 'white', border: 'none', cursor: 'pointer', padding: '0.3rem 0.8rem', borderRadius: '4px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                                                            >
                                                                <Check size={14} /> Save
                                                            </button>
                                                            <button
                                                                onClick={() => setEditingTaskId(null)}
                                                                style={{ background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--card-border)', cursor: 'pointer', padding: '0.3rem 0.8rem', borderRadius: '4px', fontSize: '0.8rem' }}
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                        <div
                                                            style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', textDecoration: task.isDone ? 'line-through' : 'none' }}
                                                            onClick={() => startEditing(task, index)}
                                                            title="Click to edit"
                                                        >
                                                            {task.deadline && (
                                                                <span style={{
                                                                    fontSize: '0.72rem',
                                                                    color: '#ef4444',
                                                                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                                                    border: '1px solid rgba(239, 68, 68, 0.3)',
                                                                    padding: '0.1rem 0.45rem',
                                                                    borderRadius: '4px',
                                                                    fontWeight: '600',
                                                                    flexShrink: 0,
                                                                    opacity: task.isDone ? 0.5 : 1
                                                                }}>
                                                                    {task.deadline}
                                                                </span>
                                                            )}
                                                            {task.details || (!task.deadline && <span style={{ opacity: 0.5, fontStyle: 'italic' }}>No details (click to add)</span>)}
                                                            <Edit2 size={12} style={{ opacity: 0.4, flexShrink: 0 }} />
                                                        </div>
                                                        {/* Tags Row */}
                                                        <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.6rem', flexWrap: 'wrap', alignItems: 'center' }}>
                                                            {task.tags && task.tags.map((tag, i) => (
                                                                <span key={i} style={{
                                                                    fontSize: '0.7rem', padding: '0.2rem 0.6rem',
                                                                    backgroundColor: 'var(--bg-color)', border: '1px solid var(--card-border)',
                                                                    borderRadius: '12px', color: 'var(--text-secondary)',
                                                                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem'
                                                                }}>
                                                                    {tag}
                                                                    <X size={10} style={{ cursor: 'pointer', opacity: 0.5 }} onClick={(e) => { e.stopPropagation(); handleRemoveTagInline(index, task.id, i); }} onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0.5} />
                                                                </span>
                                                            ))}
                                                            {addingTagToTaskId === task.id ? (
                                                                <input
                                                                    autoFocus
                                                                    value={newTagInline}
                                                                    onChange={e => setNewTagInline(e.target.value)}
                                                                    onKeyDown={e => {
                                                                        if (e.key === 'Enter') handleAddTagInline(index, task.id);
                                                                        if (e.key === 'Escape') setAddingTagToTaskId(null);
                                                                    }}
                                                                    onBlur={() => handleAddTagInline(index, task.id)}
                                                                    style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', background: 'transparent', border: '1px solid var(--accent)', borderRadius: '12px', color: 'var(--text-primary)', width: '70px', outline: 'none' }}
                                                                    placeholder="+ tag"
                                                                />
                                                            ) : (
                                                                <button
                                                                    onClick={(e) => { e.stopPropagation(); setAddingTagToTaskId(task.id); setNewTagInline(''); }}
                                                                    style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', background: 'transparent', border: '1px dashed var(--card-border)', borderRadius: '12px', color: 'var(--text-secondary)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
                                                                    title="Add tag"
                                                                >
                                                                    + Add
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', alignSelf: 'stretch', minHeight: '100%', marginLeft: 'auto' }}>
                                                {task.type !== 'Info' && task.type !== 'Rest' && (
                                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', opacity: 0.7 }}>
                                                        {task.type}
                                                    </div>
                                                )}
                                                {!isEditing && (
                                                    confirmingDeleteId === task.id ? (
                                                        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                                                            <span style={{ fontSize: '0.7rem', color: '#ef4444', fontWeight: '500' }}>Delete?</span>
                                                            <button onClick={() => handleDeleteTask(index, task.id)} style={{ background: '#ef4444', border: 'none', color: 'white', padding: '0.2rem 0.4rem', borderRadius: '4px', fontSize: '0.65rem', cursor: 'pointer', fontWeight: 'bold' }}>Yes</button>
                                                            <button onClick={() => setConfirmingDeleteId(null)} style={{ background: 'transparent', border: '1px solid var(--card-border)', color: 'var(--text-secondary)', padding: '0.2rem 0.4rem', borderRadius: '4px', fontSize: '0.65rem', cursor: 'pointer' }}>No</button>
                                                        </div>
                                                    ) : (
                                                        <button
                                                            onClick={() => setConfirmingDeleteId(task.id)}
                                                            style={{ marginTop: 'auto', background: 'transparent', border: '1px solid transparent', borderRadius: '4px', color: '#ef4444', opacity: 0.5, cursor: 'pointer', padding: '0.2rem 0.4rem', display: 'flex', alignItems: 'center', alignSelf: 'flex-end' }}
                                                            onMouseEnter={e => { e.currentTarget.style.opacity = 1; e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'; e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.2)'; }}
                                                            onMouseLeave={e => { e.currentTarget.style.opacity = 0.5; e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; }}
                                                            title="Delete task"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Add Task Block */}
                        <div style={{ paddingLeft: '0.5rem', marginTop: '0.75rem' }}>
                            {isAddingToWeek === index ? (
                                <div style={{
                                    backgroundColor: 'rgba(0,0,0,0.05)',
                                    border: '1px dashed var(--accent)',
                                    borderRadius: '8px',
                                    padding: '1rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.75rem'
                                }}>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <input
                                            value={newTaskValue.name}
                                            onChange={(e) => setNewTaskValue({ ...newTaskValue, name: e.target.value })}
                                            placeholder="New Task Title"
                                            style={{ flex: 1, padding: '0.4rem 0.5rem', borderRadius: '4px', border: '1px solid var(--card-border)', background: 'transparent', color: 'var(--text-primary)' }}
                                        />
                                        <select
                                            value={newTaskValue.course}
                                            onChange={(e) => setNewTaskValue({ ...newTaskValue, course: e.target.value })}
                                            style={{ padding: '0.4rem 0.5rem', borderRadius: '4px', border: '1px solid var(--card-border)', background: 'var(--bg-color)', color: 'var(--text-primary)' }}
                                        >
                                            {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                            <option value="General">General</option>
                                        </select>
                                    </div>
                                    <input
                                        value={newTaskValue.details}
                                        onChange={(e) => setNewTaskValue({ ...newTaskValue, details: e.target.value })}
                                        placeholder="Deadline details e.g. Friday 11:55 PM"
                                        style={{ padding: '0.4rem 0.5rem', borderRadius: '4px', border: '1px solid var(--card-border)', background: 'transparent', color: 'var(--text-primary)', fontSize: '0.8rem' }}
                                    />
                                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                        <button onClick={() => setIsAddingToWeek(null)} style={{ background: 'transparent', border: '1px solid var(--card-border)', color: 'var(--text-secondary)', padding: '0.3rem 0.8rem', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                                        <button onClick={() => handleAddTask(index)} style={{ background: 'var(--accent)', border: 'none', color: 'white', padding: '0.3rem 1rem', borderRadius: '4px', cursor: 'pointer', fontWeight: '500' }}>Add Task</button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setIsAddingToWeek(index)}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                                        background: 'transparent', border: '1px dashed var(--card-border)',
                                        color: 'var(--text-secondary)', width: '100%', padding: '0.75rem',
                                        borderRadius: '8px', cursor: 'pointer',
                                        justifyContent: 'center',
                                        transition: 'background 0.2s, color 0.2s'
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--card-border)'; }}
                                >
                                    <PlusCircle size={16} />
                                    <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>Add Task to {weekData.week}</span>
                                </button>
                            )}
                        </div>
                    </div>
                ))
                }
            </div >
        </div >
    );
};

export default DeadlineTimeline;
