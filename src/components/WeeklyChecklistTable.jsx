import React, { useState, useEffect } from 'react';
import { CornerUpLeft, Trash2 } from 'lucide-react';

const WeeklyChecklistTable = ({ courses = [] }) => {
    // Structure: { [courseId]: { class: '', review: '', preview: '' } }
    const [tableData, setTableData] = useState(() => {
        const saved = localStorage.getItem('weekly_checklist');
        if (saved) return JSON.parse(saved);

        const initial = {};
        courses.forEach(c => {
            initial[c.id] = { class: '', review: '', preview: '' };
        });
        return initial;
    });

    const [history, setHistory] = useState(() => {
        const saved = localStorage.getItem('checklist_history');
        if (saved) return JSON.parse(saved);
        return {};
    });

    const [focusedCell, setFocusedCell] = useState(null);

    useEffect(() => {
        // When courses change, ensure we track all of them
        setTableData(prev => {
            let updated = false;
            const newData = { ...prev };
            courses.forEach(c => {
                if (!newData[c.id]) {
                    newData[c.id] = { class: '', review: '', preview: '' };
                    updated = true;
                }
            });
            return updated ? newData : prev;
        });
    }, [courses]);

    useEffect(() => {
        localStorage.setItem('weekly_checklist', JSON.stringify(tableData));
    }, [tableData]);

    useEffect(() => {
        localStorage.setItem('checklist_history', JSON.stringify(history));
    }, [history]);

    const pushToHistory = (courseId, column, text) => {
        setHistory(prev => {
            const cellKey = `${courseId}_${column}`;
            const cellHistory = prev[cellKey] || [];
            return {
                ...prev,
                [cellKey]: [...cellHistory, text].slice(-10)
            };
        });
    };

    const handleTextChange = (courseId, column, value) => {
        setTableData(prev => ({
            ...prev,
            [courseId]: { ...prev[courseId], [column]: value }
        }));
    };

    const insertIcon = (iconText) => {
        if (!focusedCell) return;
        const { courseId, column } = focusedCell;
        setTableData(prev => {
            const currentText = prev[courseId]?.[column] || '';
            pushToHistory(courseId, column, currentText);
            return {
                ...prev,
                [courseId]: {
                    ...prev[courseId],
                    [column]: currentText ? `${currentText}${iconText}` : `${iconText}`
                }
            };
        });
    };

    const handleUndo = () => {
        if (!focusedCell) return;
        const { courseId, column } = focusedCell;
        const cellKey = `${courseId}_${column}`;
        const cellHistory = history[cellKey] || [];
        if (cellHistory.length > 0) {
            const previousText = cellHistory[cellHistory.length - 1];
            setTableData(prev => ({
                ...prev,
                [courseId]: { ...prev[courseId], [column]: previousText }
            }));
            setHistory(prev => ({
                ...prev,
                [cellKey]: cellHistory.slice(0, -1)
            }));
        }
    };

    const handleClear = () => {
        if (!focusedCell) return;
        const { courseId, column } = focusedCell;

        const choice = window.prompt(
            "请选择清除范围 (Clear Options):\n\n" +
            "[1] 清除当前选中的文本框 (Clear current cell only)\n" +
            "[2] 清除整张表的全部内容 (Clear ENTIRE table)\n\n" +
            "请输入 1 或 2:",
            "1"
        );

        if (choice === '1') {
            setTableData(prev => {
                const currentText = prev[courseId]?.[column] || '';
                pushToHistory(courseId, column, currentText);
                return {
                    ...prev,
                    [courseId]: { ...prev[courseId], [column]: '' }
                }
            });
        } else if (choice === '2') {
            if (window.confirm("❗ 警告：你确定要清空本周所有的 Checklist 内容吗？(Are you sure you want to clear everything?)")) {
                setTableData({});
                setHistory({});
            }
        }
    };

    const handleToolbarAction = (e, action) => {
        e.preventDefault();
        e.stopPropagation();
        if (!focusedCell) {
            alert("请先点击下方表格中的输入框以选择操作位置");
            return;
        }
        action();
    };

    const GlobalToolbar = () => (
        <div style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            display: 'flex', gap: '0.4rem', padding: '0.4rem 0.6rem',
            backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)',
            borderRadius: '12px', alignItems: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            opacity: 1,
            pointerEvents: 'auto',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            backdropFilter: 'blur(10px)',
            zIndex: 10
        }}>
            <button onMouseDown={(e) => handleToolbarAction(e, () => insertIcon('✅'))} onClick={(e) => handleToolbarAction(e, () => insertIcon('✅'))} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '0.2rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Done">✅</button>
            <button onMouseDown={(e) => handleToolbarAction(e, () => insertIcon('❌'))} onClick={(e) => handleToolbarAction(e, () => insertIcon('❌'))} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '0.2rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Not Done">❌</button>
            <button onMouseDown={(e) => handleToolbarAction(e, () => insertIcon('⚠️'))} onClick={(e) => handleToolbarAction(e, () => insertIcon('⚠️'))} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '0.2rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Warning">⚠️</button>
            <div style={{ width: '1px', height: '20px', backgroundColor: 'var(--card-border)', margin: '0 0.2rem' }}></div>
            <button onMouseDown={(e) => handleToolbarAction(e, handleUndo)} onClick={(e) => handleToolbarAction(e, handleUndo)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '0.3rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }} title="Undo"><CornerUpLeft size={18} /></button>
            <button onMouseDown={(e) => handleToolbarAction(e, handleClear)} onClick={(e) => handleToolbarAction(e, handleClear)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '0.3rem', color: '#ef4444', display: 'flex', alignItems: 'center' }} title="Clear"><Trash2 size={18} /></button>
        </div>
    );

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', width: '100%', overflowX: 'auto', position: 'relative' }}>
            <div style={{ marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>每周checklist (Weekly Checklist)</h2>
                <GlobalToolbar />
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                <thead>
                    <tr>
                        <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '2px solid var(--card-border)', borderRight: '1px solid var(--card-border)', width: '20%', color: 'var(--text-primary)', fontWeight: 'bold' }}>课程 (Course)</th>
                        <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '2px solid var(--card-border)', borderRight: '1px solid var(--card-border)', width: '26%', color: 'var(--text-primary)', fontWeight: 'bold' }}>上课 (Class)</th>
                        <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '2px solid var(--card-border)', borderRight: '1px solid var(--card-border)', width: '26%', color: 'var(--text-primary)', fontWeight: 'bold' }}>复盘 (Review)</th>
                        <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '2px solid var(--card-border)', width: '26%', color: 'var(--text-primary)', fontWeight: 'bold' }}>预习 (Preview)</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map(course => (
                        <tr key={course.id} style={{ borderBottom: '1px solid var(--card-border)' }}>
                            <td style={{ padding: '1rem', borderRight: '1px solid var(--card-border)', verticalAlign: 'top' }}>
                                <div style={{ fontSize: '1.05rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>{course.name || course.id}</div>
                                <div style={{ display: 'inline-block', backgroundColor: 'var(--accent)', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                    {course.type}
                                </div>
                            </td>
                            {['class', 'review', 'preview'].map(col => (
                                <td key={col} style={{ padding: '1rem', borderRight: col !== 'preview' ? '1px solid var(--card-border)' : 'none', verticalAlign: 'top' }}>
                                    <textarea
                                        value={tableData[course.id]?.[col] || ''}
                                        onChange={e => handleTextChange(course.id, col, e.target.value)}
                                        placeholder="Add notes..."
                                        style={{
                                            width: '100%',
                                            minHeight: '100px',
                                            backgroundColor: 'rgba(0,0,0,0.05)',
                                            border: '1px solid transparent',
                                            borderRadius: '6px',
                                            padding: '0.5rem',
                                            color: 'var(--text-primary)',
                                            resize: 'vertical',
                                            fontFamily: 'inherit',
                                            fontSize: '0.9rem',
                                            lineHeight: '1.5',
                                            outline: 'none',
                                            transition: 'border-color 0.2s',
                                        }}
                                        onFocus={e => {
                                            e.currentTarget.style.borderColor = 'var(--accent)';
                                            setFocusedCell({ courseId: course.id, column: col });
                                        }}
                                        onBlur={e => e.currentTarget.style.borderColor = 'transparent'}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default WeeklyChecklistTable;
