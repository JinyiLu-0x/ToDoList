import { supabase } from '../lib/supabaseClient';

export const backendService = {
    async pushAllToCloud() {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) throw new Error('Not logged in');

        const payload = {
            user_id: session.user.id,
            timeline_data: JSON.parse(localStorage.getItem('timeline_data') || '[]'),
            weekly_checklist: JSON.parse(localStorage.getItem('weekly_checklist') || '{}'),
            checklist_history: JSON.parse(localStorage.getItem('checklist_history') || '{}'),
            routine_items: JSON.parse(localStorage.getItem('routine_items') || '[]'),
            routine_checks: JSON.parse(localStorage.getItem('routine_checks') || '{}'),
            courses_data: JSON.parse(localStorage.getItem('courses_data') || '[]'),
            memo_data: JSON.parse(localStorage.getItem('memo_board_data') || '[]'),
            updated_at: new Date().toISOString()
        };

        const { error } = await supabase.from('app_state').upsert(payload, { onConflict: 'user_id' });
        if (error) throw new Error('Push failed: ' + error.message);
    },

    async pullAllFromCloud() {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) throw new Error('Not logged in');

        const { data, error } = await supabase.from('app_state').select('*').eq('user_id', session.user.id).single();
        if (error && error.code !== 'PGRST116') throw new Error('Pull failed: ' + error.message);
        if (!data) return null;

        if (data.timeline_data) localStorage.setItem('timeline_data', JSON.stringify(data.timeline_data));
        if (data.weekly_checklist) localStorage.setItem('weekly_checklist', JSON.stringify(data.weekly_checklist));
        if (data.checklist_history) localStorage.setItem('checklist_history', JSON.stringify(data.checklist_history));
        if (data.routine_items) localStorage.setItem('routine_items', JSON.stringify(data.routine_items));
        if (data.routine_checks) localStorage.setItem('routine_checks', JSON.stringify(data.routine_checks));
        if (data.courses_data) localStorage.setItem('courses_data', JSON.stringify(data.courses_data));
        if (data.memo_data) localStorage.setItem('memo_board_data', JSON.stringify(data.memo_data));

        return data;
    }
};
