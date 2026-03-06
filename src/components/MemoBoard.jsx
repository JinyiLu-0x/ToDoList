import React, { useState, useEffect } from 'react';
import { StickyNote, PlusCircle, Edit2, Trash2, Check, Copy, ChevronDown, ChevronRight, CheckCircle2, Minimize2 } from 'lucide-react';

const MemoBoard = () => {
    const [memos, setMemos] = useState([]);
    const [expandedIds, setExpandedIds] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [newItem, setNewItem] = useState({ title: '', content: '' });
    const [editingId, setEditingId] = useState(null);
    const [editValue, setEditValue] = useState({ title: '', content: '' });
    const [copiedId, setCopiedId] = useState(null);
    const [isMinimized, setIsMinimized] = useState(() => {
        return localStorage.getItem('memo_board_minimized') === 'true';
    });

    useEffect(() => {
        localStorage.setItem('memo_board_minimized', isMinimized);
    }, [isMinimized]);

    useEffect(() => {
        const savedMemos = localStorage.getItem('memo_board_data');

        const defaultMemos = [
            {
                id: 'm1_' + Date.now(),
                title: '🌟FIT2081 实践型unit自学prompt',
                content: '“我会给你一段技术原文或代码，请帮我整理成 英语为主、中文为辅 的自学版内容：\n1. 结构化输出：使用清晰的层级结构，包含带编号的主标题和项目符号（bullet points）。\n* 如果是代码：在代码里直接加注释，英文为主，中文为辅，注释保持一行紧凑清晰\n* 尊重、保留原文逻辑和结构，不要拆散段落\n* 普通文本：保留原英文句子，直接在行末追加简洁中文注释，格式为 English text 简洁中文注释（一般为1-2个词）\n* 如果是 Compose 或 Kotlin/Android 相关代码，先标注 代码类型/框架/语言\n* 对每个概念或函数都加注释，帮助我理解作用和逻辑\n* 关键概念或流程可以额外写小结，但也保持英语为主、中文辅\n1. 绝对禁止使用括号：中文内容必须直接添加在英文的末尾，绝对不允许使用任何形式的括号（包括 ()、[]、【】 等）将中文括起来。\n* 避免赘述，把重点清楚呈现出来”\n* 保留结构：保持原文逻辑和段落，重点清楚呈现，绝不废话或过度发散。\n1. 拒绝废话：不需要任何开场白、寒暄或多余的对话符号，请直接输出排版好的正文内容。'
            },
            {
                id: 'm2_' + Date.now(),
                title: '🌟总结Slides的prompt',
                content: '请详细提取并解释所提供文件或图片的内容。\n格式与排版规则：\n1. 结构化输出：使用清晰的层级结构，包含带编号的主标题和项目符号（bullet points）。\n2. 中英双语直接对照：以专业的英文原文为主，不要过度精简。在每一个主标题、引导句和项目符号的末尾，必须提供核心精简的中文要点 只需要用一两词去概括。\n3. 绝对禁止使用括号：中文内容必须直接添加在英文的末尾，绝对不允许使用任何形式的括号（包括 ()、[]、【】 等）将中文括起来。\n4. 拒绝废话：不需要任何开场白、寒暄或多余的对话符号，请直接输出排版好的正文内容。\n记得还要分离好title和里面可以直接复制的内容'
            }
        ];

        let parsedMemos = [];
        if (savedMemos) {
            parsedMemos = JSON.parse(savedMemos);
        }

        const hasNewMemosInitialized = localStorage.getItem('memo_board_v2_initialized') === 'true';

        if (!hasNewMemosInitialized) {
            // Remove old default if it exists
            parsedMemos = parsedMemos.filter(m => m.title !== 'Example GPT Prompt');
            // Insert the new memos at the beginning
            parsedMemos = [...defaultMemos, ...parsedMemos];

            localStorage.setItem('memo_board_v2_initialized', 'true');
            localStorage.setItem('memo_board_data', JSON.stringify(parsedMemos));
        }

        setMemos(parsedMemos);
    }, []);

    const saveMemos = (items) => {
        setMemos(items);
        localStorage.setItem('memo_board_data', JSON.stringify(items));
    };

    const handleAdd = () => {
        if (!newItem.title.trim()) return;
        const newMemo = {
            id: 'memo_' + Date.now(),
            title: newItem.title.trim(),
            content: newItem.content.trim()
        };
        saveMemos([...memos, newMemo]);
        setNewItem({ title: '', content: '' });
        setIsAdding(false);
    };

    const startEdit = (memo) => {
        setEditingId(memo.id);
        setEditValue({ title: memo.title, content: memo.content });
    };

    const saveEdit = (id) => {
        if (!editValue.title.trim()) return;
        saveMemos(memos.map(m => m.id === id ? { ...m, title: editValue.title.trim(), content: editValue.content.trim() } : m));
        setEditingId(null);
    };

    const deleteMemo = (id) => {
        if (window.confirm('确定删除这条备忘录吗？ (Delete this memo?)')) {
            saveMemos(memos.filter(m => m.id !== id));
            setExpandedIds(expandedIds.filter(eId => eId !== id));
        }
    };

    const toggleExpand = (id) => {
        if (expandedIds.includes(id)) {
            setExpandedIds(expandedIds.filter(eId => eId !== id));
        } else {
            setExpandedIds([...expandedIds, id]);
        }
    };

    const copyToClipboard = async (content, id) => {
        try {
            await navigator.clipboard.writeText(content);
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    if (isMinimized) {
        return (
            <button
                className="glass-panel"
                onClick={() => setIsMinimized(false)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '3.5rem',
                    height: '3.5rem',
                    borderRadius: '12px',
                    border: '1px solid var(--card-border)',
                    cursor: 'pointer',
                    color: 'var(--accent)',
                    backgroundColor: 'var(--card-bg)',
                    position: 'relative',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 4px 12px var(--glass-shadow)',
                    padding: 0
                }}
                title="展开备忘录 (Expand Memos)"
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.borderColor = 'var(--card-border)'; }}
            >
                <StickyNote size={24} />
                {memos.length > 0 && (
                    <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '12px', height: '12px', background: 'var(--accent)', borderRadius: '50%', border: '2px solid var(--card-bg)' }}></span>
                )}
            </button>
        );
    }

    return (
        <div className="glass-panel" style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '1.25rem', transition: 'all 0.3s ease', alignSelf: 'start', border: '1px solid var(--card-border)' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.4rem', paddingBottom: '0.2rem', color: 'var(--text-primary)', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <StickyNote size={18} color="var(--accent)" />
                    备忘录 Memos
                </div>
                <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                    {!isAdding && (
                        <button
                            onClick={() => setIsAdding(true)}
                            style={{ background: 'transparent', border: '1px solid var(--card-border)', borderRadius: '6px', cursor: 'pointer', padding: '0.2rem 0.5rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', transition: 'all 0.2s' }}
                            onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--text-primary)'; }}
                            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--card-border)'; }}
                        >
                            <PlusCircle size={14} /> Add
                        </button>
                    )}
                    <button
                        onClick={() => setIsMinimized(true)}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', padding: '0.2rem', borderRadius: '4px', transition: 'all 0.2s' }}
                        title="缩小 (Minimize)"
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.05)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                    >
                        <Minimize2 size={16} />
                    </button>
                </div>
            </h2>

            {isAdding && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '0.75rem', border: '1px dashed var(--accent)', borderRadius: '8px', backgroundColor: 'rgba(0,0,0,0.05)', flexShrink: 0 }}>
                    <input
                        autoFocus
                        value={newItem.title}
                        onChange={e => setNewItem({ ...newItem, title: e.target.value })}
                        placeholder="Title (e.g. Code Review Prompt)"
                        style={{ padding: '0.4rem 0.6rem', borderRadius: '4px', border: '1px solid var(--card-border)', background: 'var(--bg-color)', color: 'var(--text-primary)', fontSize: '0.9rem', outline: 'none' }}
                    />
                    <textarea
                        value={newItem.content}
                        onChange={e => setNewItem({ ...newItem, content: e.target.value })}
                        placeholder="Content to save & copy..."
                        rows={4}
                        style={{ padding: '0.4rem 0.6rem', borderRadius: '4px', border: '1px solid var(--card-border)', background: 'var(--bg-color)', color: 'var(--text-primary)', fontSize: '0.85rem', outline: 'none', resize: 'vertical', fontFamily: 'monospace' }}
                    />
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '0.25rem' }}>
                        <button onClick={() => setIsAdding(false)} style={{ background: 'transparent', border: '1px solid var(--card-border)', color: 'var(--text-secondary)', borderRadius: '4px', padding: '0.3rem 0.8rem', cursor: 'pointer', fontSize: '0.8rem' }}>Cancel</button>
                        <button onClick={handleAdd} style={{ background: 'var(--accent)', color: 'white', border: 'none', borderRadius: '4px', padding: '0.3rem 0.8rem', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '500' }}>Save</button>
                    </div>
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', overflowY: 'auto', paddingRight: '0.2rem', paddingBottom: '0.5rem', maxHeight: '400px' }}>
                {memos.map(memo => {
                    const isExpanded = expandedIds.includes(memo.id);
                    const isEditing = editingId === memo.id;

                    if (isEditing) {
                        return (
                            <div key={memo.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '0.75rem', borderRadius: '8px', backgroundColor: 'rgba(0,0,0,0.05)', border: '1px solid var(--card-border)' }}>
                                <input
                                    autoFocus
                                    value={editValue.title}
                                    onChange={e => setEditValue({ ...editValue, title: e.target.value })}
                                    style={{ padding: '0.4rem 0.6rem', borderRadius: '4px', border: '1px solid var(--card-border)', background: 'var(--bg-color)', color: 'var(--text-primary)', fontSize: '0.9rem', outline: 'none' }}
                                />
                                <textarea
                                    value={editValue.content}
                                    onChange={e => setEditValue({ ...editValue, content: e.target.value })}
                                    rows={4}
                                    style={{ padding: '0.4rem 0.6rem', borderRadius: '4px', border: '1px solid var(--card-border)', background: 'var(--bg-color)', color: 'var(--text-primary)', fontSize: '0.85rem', outline: 'none', resize: 'vertical', fontFamily: 'monospace' }}
                                />
                                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                    <button onClick={() => setEditingId(null)} style={{ background: 'transparent', border: '1px solid var(--card-border)', color: 'var(--text-secondary)', borderRadius: '4px', padding: '0.2rem 0.6rem', cursor: 'pointer', fontSize: '0.8rem' }}>Cancel</button>
                                    <button onClick={() => saveEdit(memo.id)} style={{ background: 'var(--accent)', color: 'white', border: 'none', borderRadius: '4px', padding: '0.2rem 0.6rem', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '500' }}><Check size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />Save</button>
                                </div>
                            </div>
                        );
                    }

                    return (
                        <div key={memo.id} style={{ borderRadius: '8px', border: '1px solid var(--card-border)', overflow: 'hidden', backgroundColor: 'var(--card-bg)', transition: 'all 0.2s ease', flexShrink: 0, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                            <div
                                onClick={() => toggleExpand(memo.id)}
                                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', cursor: 'pointer' }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500', color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                                    {isExpanded ? <ChevronDown size={16} color="var(--text-secondary)" /> : <ChevronRight size={16} color="var(--text-secondary)" />}
                                    {memo.title}
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    {copiedId === memo.id ? (
                                        <span style={{ fontSize: '0.7rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.2rem', padding: '0.1rem 0.3rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '4px' }}><CheckCircle2 size={10} /> Copied</span>
                                    ) : (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); copyToClipboard(memo.content, memo.id); }}
                                            style={{ background: 'transparent', border: '1px solid var(--card-border)', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.1rem 0.4rem', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.7rem', transition: 'all 0.2s' }}
                                            title="Copy Content"
                                            onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
                                            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--card-border)'; }}
                                        >
                                            <Copy size={10} /> Copy
                                        </button>
                                    )}
                                    <button
                                        onClick={(e) => { e.stopPropagation(); startEdit(memo); }}
                                        style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.2rem', opacity: 0.5 }}
                                        title="Edit"
                                        onMouseEnter={e => e.currentTarget.style.opacity = 1}
                                        onMouseLeave={e => e.currentTarget.style.opacity = 0.5}
                                    >
                                        <Edit2 size={12} />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); deleteMemo(memo.id); }}
                                        style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.2rem', opacity: 0.5 }}
                                        title="Delete"
                                        onMouseEnter={e => { e.currentTarget.style.opacity = 1; e.currentTarget.style.color = '#ef4444'; }}
                                        onMouseLeave={e => { e.currentTarget.style.opacity = 0.5; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                                    >
                                        <Trash2 size={12} />
                                    </button>
                                </div>
                            </div>

                            {isExpanded && (
                                <div style={{ padding: '0 0.75rem 0.75rem 0.75rem', position: 'relative' }}>
                                    <div style={{
                                        padding: '0.75rem',
                                        backgroundColor: 'var(--bg-color)',
                                        borderRadius: '6px',
                                        border: '1px solid var(--card-border)',
                                        fontSize: '0.8rem',
                                        color: 'var(--text-secondary)',
                                        fontFamily: 'monospace',
                                        whiteSpace: 'pre-wrap',
                                        wordBreak: 'break-word',
                                        maxHeight: '200px',
                                        overflowY: 'auto'
                                    }}>
                                        {memo.content || <em style={{ opacity: 0.5 }}>No content</em>}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
                {memos.length === 0 && !isAdding && (
                    <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.8rem', border: '1px dashed var(--card-border)', borderRadius: '8px' }}>
                        No memos saved yet.<br />Click "+ Add" to save useful prompts.
                    </div>
                )}
            </div>
        </div>
    );
};

export default MemoBoard;
