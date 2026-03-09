import { useState, useEffect } from 'react';
import './index.css';
import { courses as initialCourses } from './data';
import WeeklyRoutine from './components/WeeklyRoutine';
import DeadlineTimeline from './components/DeadlineTimeline';
import CourseManager from './components/CourseManager';
import WeeklyChecklistTable from './components/WeeklyChecklistTable';
import MemoBoard from './components/MemoBoard';
import CloudSyncPanel from './components/CloudSyncPanel';
import { Sun, Moon, Github } from 'lucide-react';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  const [refreshKey, setRefreshKey] = useState(0);

  const [courses, setCourses] = useState(() => {
    const version = localStorage.getItem('app_data_version');
    if (version !== '1.6_fit1047') {
      const savedTheme = localStorage.getItem('theme');
      localStorage.clear();
      localStorage.setItem('app_data_version', '1.6_fit1047');
      if (savedTheme) localStorage.setItem('theme', savedTheme);
      return initialCourses;
    }

    const saved = localStorage.getItem('courses_data');
    if (saved) {
      let parsed = JSON.parse(saved);
      // Migrate old data if it exists
      parsed = parsed.map(c => {
        if (c.id === 'FIT1049') {
          if (c.name.includes('偏文科')) c.name = 'FIT1049 职业';
          if (c.tasks) c.tasks = c.tasks.map(t => (t.name === 'Portfolio Task 1' && t.weight === '5%') ? { ...t, weight: '10%' } : t);
        }
        return c;
      });
      return parsed;
    }
    return initialCourses;
  });

  useEffect(() => {
    localStorage.setItem('courses_data', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '1rem', position: 'relative' }}>
        <CloudSyncPanel onPullComplete={() => { setRefreshKey(k => k + 1); window.location.reload(); }} />
        <button
          onClick={toggleTheme}
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            backdropFilter: 'blur(10px)',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-primary)',
            transition: 'all 0.2s',
            boxShadow: '0 4px 12px var(--glass-shadow)'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <h1 style={{
          fontSize: '3rem',
          fontWeight: '800',
          color: 'var(--accent)',
          marginBottom: '0.5rem',
          letterSpacing: '-0.02em'
        }}>
          Semester Dashboard
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
          Track your deadlines, check weekly routines, and write reflections.
        </p>
      </header>

      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem', alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <CourseManager courses={courses} setCourses={setCourses} />
        </div>
        <div style={{ flexShrink: 0, zIndex: 10 }}>
          <MemoBoard />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <WeeklyChecklistTable courses={courses} />
          <DeadlineTimeline courses={courses} />
        </div>
        <div style={{ position: 'sticky', top: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <WeeklyRoutine courses={courses} />
        </div>
      </div>

      <footer style={{
        marginTop: '3rem',
        padding: '2rem 0',
        borderTop: '1px solid var(--card-border)',
        color: 'var(--text-secondary)',
        fontSize: '0.85rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.8rem',
        opacity: 0.8
      }}>
        <span>Developed by Mozzie</span>
        <span style={{ opacity: 0.4 }}>•</span>
        <a
          href="https://github.com/JinyiLu-0x/ToDoList"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem',
            color: 'inherit',
            textDecoration: 'none',
            transition: 'color 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
          onMouseLeave={e => e.currentTarget.style.color = 'inherit'}
        >
          <Github size={14} />
          <span>GitHub</span>
        </a>
      </footer>
    </div>
  );
}

export default App;
