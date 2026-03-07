import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { backendService } from '../services/backendService';
import { Cloud, UploadCloud, DownloadCloud, Loader2, AlertCircle, KeyRound } from 'lucide-react';

export default function CloudSyncPanel({ onPullComplete }) {
    const [session, setSession] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [authLoading, setAuthLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
        return () => subscription.unsubscribe();
    }, []);

    const showMessage = (text, type = 'success') => {
        setMessage({ text, type });
        setTimeout(() => setMessage({ text: '', type: '' }), 5000);
    };

    const handleLogin = async (e) => {
        if (e) e.preventDefault();
        setAuthLoading(true);
        try {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
        } catch (error) {
            showMessage(error.message, 'error');
        } finally {
            setAuthLoading(false);
        }
    };

    const handleTestAccountLogin = async () => {
        setEmail('ai@test.com');
        setPassword('test');
        setAuthLoading(true);
        try {
            const { error } = await supabase.auth.signInWithPassword({ email: 'ai@test.com', password: 'test' });
            if (error) throw error;
        } catch (error) {
            showMessage(error.message, 'error');
        } finally {
            setAuthLoading(false);
        }
    };

    const handlePush = async () => {
        setLoading(true);
        try {
            await backendService.pushAllToCloud();
            showMessage('✅ 备份成功！');
        } catch (error) {
            console.error(error);
            showMessage('备份失败: ' + error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handlePull = async () => {
        setLoading(true);
        try {
            const result = await backendService.pullAllFromCloud();
            if (!result) {
                showMessage('云端没有备份数据', 'error');
            } else {
                onPullComplete?.();
                showMessage('✅ 恢复成功！');
            }
            setIsMenuOpen(false);
        } catch (error) {
            console.error(error);
            showMessage('恢复失败: ' + error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ position: 'absolute', left: 0, top: 0, zIndex: 50 }}>
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                style={{
                    background: session ? 'var(--accent)' : 'var(--card-bg)',
                    border: '1px solid var(--card-border)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '8px',
                    padding: '0.6rem 1.2rem',
                    display: 'flex', alignItems: 'center', gap: '0.6rem',
                    cursor: 'pointer',
                    color: session ? 'white' : 'var(--text-primary)',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: '0 4px 12px var(--glass-shadow)',
                    fontWeight: '600',
                    fontSize: '0.95rem'
                }}
            >
                <Cloud size={18} />
                {session ? '已连接' : '云端同步'}
            </button>

            {isMenuOpen && (
                <div style={{
                    position: 'absolute', top: '3rem', left: 0, width: '300px',
                    background: 'var(--card-bg)', border: '1px solid var(--card-border)',
                    borderRadius: '12px', padding: '1.5rem',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                    display: 'flex', flexDirection: 'column', gap: '1rem',
                    textAlign: 'left'
                }}>
                    {!session ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            <h3 style={{ margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
                                <Cloud size={20} color="var(--accent)" /> 登录云端
                            </h3>

                            <button
                                onClick={handleTestAccountLogin}
                                disabled={authLoading}
                                style={{
                                    background: 'var(--card-bg)', color: '#10b981', border: '1px solid #10b981',
                                    padding: '0.7rem', borderRadius: '8px', cursor: 'pointer',
                                    fontWeight: 'bold', display: 'flex', alignItems: 'center',
                                    justifyContent: 'center', gap: '0.5rem', transition: 'all 0.2s',
                                    opacity: authLoading ? 0.7 : 1
                                }}
                                onMouseEnter={e => { e.currentTarget.style.background = '#10b981'; e.currentTarget.style.color = 'white'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'var(--card-bg)'; e.currentTarget.style.color = '#10b981'; }}
                            >
                                <KeyRound size={16} />
                                {authLoading ? '登录中...' : '访客一键登录体验'}
                            </button>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ flex: 1, height: '1px', background: 'var(--card-border)' }}></div>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>or</span>
                                <div style={{ flex: 1, height: '1px', background: 'var(--card-border)' }}></div>
                            </div>

                            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                <input type="email" placeholder="邮箱 (Email)" value={email} onChange={e => setEmail(e.target.value)} required
                                    style={{ padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'var(--bg-color)', color: 'var(--text-primary)', outline: 'none' }}
                                    onFocus={e => e.currentTarget.style.borderColor = 'var(--accent)'} onBlur={e => e.currentTarget.style.borderColor = 'var(--card-border)'} />
                                <input type="password" placeholder="密码 (Password)" value={password} onChange={e => setPassword(e.target.value)} required
                                    style={{ padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'var(--bg-color)', color: 'var(--text-primary)', outline: 'none' }}
                                    onFocus={e => e.currentTarget.style.borderColor = 'var(--accent)'} onBlur={e => e.currentTarget.style.borderColor = 'var(--card-border)'} />
                                <button type="submit" disabled={authLoading} style={{ background: 'var(--accent)', color: 'white', border: 'none', padding: '0.7rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginTop: '0.2rem', transition: 'opacity 0.2s', opacity: authLoading ? 0.7 : 1 }}>
                                    {authLoading ? '登录中...' : '账号登录'}
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.8rem', borderBottom: '1px solid var(--card-border)' }}>
                                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '500' }}>{session.user.email}</span>
                                <button onClick={() => supabase.auth.signOut()} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}>退出</button>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                <button onClick={handlePush} disabled={loading} style={{ background: 'var(--bg-color)', border: '1px solid var(--card-border)', color: 'var(--text-primary)', padding: '0.7rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: '600', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--text-primary)'} onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--card-border)'}>
                                    {loading ? <Loader2 size={16} className="animate-spin" /> : <UploadCloud size={16} />}
                                    同步到云端 (Push)
                                </button>
                                <button onClick={handlePull} disabled={loading} style={{ background: 'var(--bg-color)', border: '1px solid var(--card-border)', color: 'var(--text-primary)', padding: '0.7rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: '600', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--text-primary)'} onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--card-border)'}>
                                    {loading ? <Loader2 size={16} className="animate-spin" /> : <DownloadCloud size={16} />}
                                    从云端恢复 (Pull)
                                </button>
                            </div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', opacity: 0.8, display: 'flex', gap: '4px', alignItems: 'center', justifyContent: 'center', marginTop: '0.2rem' }}>
                                <AlertCircle size={12} /> 恢复操作会用云端数据覆盖本地
                            </div>
                        </div>
                    )}
                    {message.text && (
                        <div style={{ fontSize: '0.8rem', padding: '0.4rem', borderRadius: '6px', background: message.type === 'error' ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)', color: message.type === 'error' ? '#ef4444' : '#10b981', textAlign: 'center' }}>
                            {message.text}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
