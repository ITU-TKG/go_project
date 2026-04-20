import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Login from './Login'; 

const API = 'http://localhost:8080';

const toLocalDateStr = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', name: '', jender: '', due_date: '' });
  const [editingTodo, setEditingTodo] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const fetchAll = () => {
    fetch(`${API}/todos`).then(r => r.json()).then(d => {
      console.log('due_date:', d.map(t => t.due_date));
      setTodos(d || []);
    });
  };
  
  useEffect(() => { fetchAll(); }, []);

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }
  
  const addTodo = () => {
    if (!newTodo.title.trim() || !newTodo.name.trim()) return;
    fetch(`${API}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newTodo, done: false }),
    }).then(() => { setNewTodo({ title: '', name: '', jender: '', due_date: '' }); fetchAll(); });
  };

  const deleteTodo = (id) => {
    fetch(`${API}/todos/${id}`, { method: 'DELETE' }).then(fetchAll);
  };

  const saveTodo = () => {
    fetch(`${API}/todos/${editingTodo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingTodo),
    }).then(() => { setEditingTodo(null); fetchAll(); });
  };

  // 選択した日付でフィルター
  const filteredTodos = selectedDate
    ? todos.filter(t => t.due_date === selectedDate)
    : todos;

  // カレンダーのタイルにTodoがある日付をマーク
  const tileContent = ({ date }) => {
    const dateStr = toLocalDateStr(date);
    const hasTodo = todos.some(t => t.due_date === dateStr);
    return hasTodo ? <div style={{ width: 6, height: 6, background: '#4CAF50', borderRadius: '50%', margin: '0 auto' }} /> : null;
  };

  const styles = {
    container: { maxWidth: 600, margin: '40px auto', fontFamily: 'sans-serif', padding: '0 16px' },
    section: { marginBottom: 40 },
    addRow: { display: 'flex', gap: 8, marginBottom: 12 },
    input: { flex: 1, padding: 8, fontSize: 14, borderRadius: 4, border: '1px solid #ccc' },
    btn: { padding: '8px 14px', borderRadius: 4, border: 'none', cursor: 'pointer', fontSize: 14 },
    listItem: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, padding: 8, background: '#f5f5f5', borderRadius: 4 },
  };

  return (
    <div style={styles.container}>
      <h1>Todo List</h1>
      
      {/* カレンダー */}
      <section style={styles.section}>
        <h2>カレンダー</h2>
        <Calendar
          onClickDay={date => {
            const dateStr = toLocalDateStr(date);
            setSelectedDate(prev => prev === dateStr ? null : dateStr); // 同じ日付クリックで解除
          }}
          tileContent={tileContent}
        />
        {selectedDate && (
          <p style={{ marginTop: 8 }}>
            📅 {selectedDate} のTodoを表示中
            <button onClick={() => setSelectedDate(null)} style={{ ...styles.btn, marginLeft: 8, background: '#9E9E9E', color: 'white' }}>解除</button>
          </p>
        )}
      </section>

      {/* 追加フォーム */}
      <section style={styles.section}>
        <div style={styles.addRow}>
          <input
            value={newTodo.title}
            onChange={e => setNewTodo({ ...newTodo, title: e.target.value })}
            placeholder="タスク..."
            style={styles.input}
          />
          <input
            value={newTodo.name}
            onChange={e => setNewTodo({ ...newTodo, name: e.target.value })}
            placeholder="名前..."
            style={{ ...styles.input, flex: 1 }}
          />
          <select
            value={newTodo.jender}
            onChange={e => setNewTodo({ ...newTodo, jender: e.target.value })}
            style={styles.input}
          >
            <option value="">選択してください</option>
            <option value="男性">男性</option>
            <option value="女性">女性</option>
            <option value="無回答">無回答</option>
          </select>
          <input
            type="date"
            value={newTodo.due_date}
            onChange={e => setNewTodo({ ...newTodo, due_date: e.target.value })}
            style={styles.input}
          />
          <button onClick={addTodo} style={{ ...styles.btn, background: '#4CAF50', color: 'white' }}>追加</button>
        </div>
      </section>

      {/* リスト */}
      <section style={styles.section}>
        <h2>Todos ({filteredTodos.length})</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {filteredTodos.map(t => (
            <li key={t.id} style={styles.listItem}>
              {editingTodo?.id === t.id ? (
                // 編集モード
                <>
                  <input
                    value={editingTodo.title}
                    onChange={e => setEditingTodo({ ...editingTodo, title: e.target.value })}
                    style={styles.input}
                    autoFocus
                  />
                  <input
                    value={editingTodo.name}
                    onChange={e => setEditingTodo({ ...editingTodo, name: e.target.value })}
                    style={styles.input}
                  />
                  <select
                    value={editingTodo.jender}
                    onChange={e => setEditingTodo({ ...editingTodo, jender: e.target.value })}
                    style={styles.input}
                  >
                    <option value="男性">男性</option>
                    <option value="女性">女性</option>
                    <option value="無回答">無回答</option>
                  </select>
                  <button onClick={saveTodo} style={{ ...styles.btn, background: '#2196F3', color: 'white' }}>保存</button>
                  <button onClick={() => setEditingTodo(null)} style={{ ...styles.btn, background: '#9E9E9E', color: 'white' }}>キャンセル</button>
                </>
              ) : (
                // 表示モード
                <>
                  <span style={{ flex: 1, textDecoration: t.done ? 'line-through' : 'none', color: t.done ? '#999' : '#000' }}>
                    {t.title} <span style={{ color: '#888', fontSize: 12 }}>— {t.name} ({t.jender})</span>
                  </span>
                  <button onClick={() => setEditingTodo(t)} style={{ ...styles.btn, background: '#FF9800', color: 'white' }}>✏️</button>
                  <button onClick={() => deleteTodo(t.id)} style={{ ...styles.btn, background: '#f44336', color: 'white' }}>🗑</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;