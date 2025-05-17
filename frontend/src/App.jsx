import React, { useState, useEffect } from 'react';
import { DEPARTMENTS } from '../departments.js';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams
} from 'react-router-dom';
import './App.css';

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function CourseList({ search, department }) 
{
  const [courses, setCourses] = useState(null);
  const [error, setError] = useState('');
  
  useEffect(() => {
    setCourses(null);
    setError('');
    const val = new URLSearchParams();
    if (search)    val.set('search', search);
    if (department)val.set('dept', department);
    
  }, [search, department]);

  if (error)   return <p className="view-content error">{error}</p>;
  if (!courses)return <p className="view-content">Loading courses…</p>;

  return (
    <div className="view-content">
      <h1>Course Catalog</h1>
         <div className="course-grid">
            {courses.map(c => (
              <div key={c.code} className="card">
                <h3 className="card-title">{c.title}</h3>
                <div className="card-sub">{c.code}</div>
                <Link to={`/courses/${c.code}`} className="button-link">
                  View Details
                </Link>
              </div>
            ))}
          </div>
  
    </div>
  );
}

function CourseDetail() {
  const { code } = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setCourse(null);
    setError('');
  }, [code]);

  if (error)    return <p className="view-content error">{error}</p>;
  if (!course) return <p className="view-content">Loading course…</p>;

  return (
    <div className="detail-container">
      <div className="detail-main">
        <h1>{course.title}</h1>
        <p className="detail-code">{course.code}</p>
        <p><strong>Prerequisites:</strong> {course.prereqs.length ? course.prereqs.join(', ') : 'None'}</p>
        <p><strong>Credits:</strong> {course.credits}</p>
        <p>
          <strong>Description:</strong>{' '}
          <a href={course.descriptionUrl || '#'} target="_blank" rel="noreferrer">View</a>
        </p>
      </div>
      <div className="detail-side">
        <div className="card detail-card">
          <h3>Schedule Planner</h3>
          <p>{course.days} {course.timeStart}–{course.timeEnd}</p>
          <button className="button">Add to Schedule</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [search, setSearch]       = useState('');
  const [department, setDepartment] = useState('');

  return (
    <Router>
      {/* Header */}
      <header className="header">
        <div className="logo">RUBetter</div>
        <nav>
          <Link to="/">Courses</Link>
          <Link to="/schedule">My Schedule</Link>
        </nav>
      </header>

      {/* Sidebar + Main */}
      <div className="layout-grid">
        <aside className="sidebar">
          <h2>Search & Filter</h2>
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <label htmlFor="dept-select">Department</label>
          <select
            value={department}
            onChange={e => setDepartment(e.target.value)}
          >
            <option value="">--- Select a Subject Area ---</option>
            {DEPARTMENTS.map(d => (
              <option key={d.code} value={d.code}>
                {`${d.name.toUpperCase()} (${d.code})`}
              </option>
            ))}
          </select>
      </aside>

        <main className="main">
          <Routes>
            <Route
              path="/"
              element={<CourseList search={search} department={department} />}
            />
            <Route path="/courses/:code" element={<CourseDetail />} />
            <Route
              path="*"
              element={<p className="view-content">Page Not Found</p>}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
