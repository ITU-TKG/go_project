import React, { useEffect, useState } from 'react';

const API = 'http://localhost:8080';

function App() {
  const [tasks, setTasks] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newCustomer, setNewCustomer] = useState({ name: '', jender: '' });
  const [editingTask, setEditingTask] = useState(null);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const fetchAll = () => {
    fetch(`${API}/tasks`).then(r => r.json()).then(d => setTasks(d || []));
    fetch(`${API}/customers`).then(r => r.json()).then(d => setCustomers(d || []));
  };

  useEffect(() => { fetchAll(); }, []);

  // Task
  const addTask = () => {
    if (!newTask.trim()) return;
    fetch(`${API}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTask, done: false }),
    }).then(() => { setNewTask(''); fetchAll(); });
  };

  const deleteTask = (id) => {
    fetch(`${API}/tasks/${id}`, { method: 'DELETE' }).then(fetchAll);
  };

  const toggleTask = (task) => {
    fetch(`${API}/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: task.title, done: !task.done }),
    }).then(fetchAll);
  };

  const saveTask = (task) => {
    fetch(`${API}/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editingTask.title, done: editingTask.done }),
    }).then(() => { setEditingTask(null); fetchAll(); });
  };

  // Customer
  const addCustomer = () => {
    if (!newCustomer.name.trim() || !newCustomer.jender.trim()) return;
    fetch(`${API}/customers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCustomer),
    }).then(() => { setNewCustomer({ name: '', jender: '' }); fetchAll(); });
  };

  const deleteCustomer = (id) => {
    fetch(`${API}/customers/${id}`, { method: 'DELETE' }).then(fetchAll);
  };

  const saveCustomer = (customer) => {
    fetch(`${API}/customers/${customer.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editingCustomer.name, jender: editingCustomer.jender }),
    }).then(() => { setEditingCustomer(null); fetchAll(); });
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
      <h1>Tasks & Customers</h1>

      {/* Tasks */}
      <section style={styles.section}>
        <h2>Tasks ({tasks.length})</h2>
        <div style={styles.addRow}>
          <input
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addTask()}
            placeholder="新しいタスク..."
            style={styles.input}
          />
          <button onClick={addTask} style={{ ...styles.btn, background: '#4CAF50', color: 'white' }}>追加</button>
        </div>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {tasks.map(t => (
            <li key={t.id} style={styles.listItem}>
              {editingTask?.id === t.id ? (
                // 編集モード
                <>
                  <input
                    value={editingTask.title}
                    onChange={e => setEditingTask({ ...editingTask, title: e.target.value })}
                    style={{ ...styles.input, flex: 1 }}
                    autoFocus
                  />
                  <button onClick={() => saveTask(t)} style={{ ...styles.btn, background: '#2196F3', color: 'white' }}>保存</button>
                  <button onClick={() => setEditingTask(null)} style={{ ...styles.btn, background: '#9E9E9E', color: 'white' }}>キャンセル</button>
                </>
              ) : (
                // 表示モード
                <>
                  <input type="checkbox" checked={t.done} onChange={() => toggleTask(t)} />
                  <span style={{ flex: 1, textDecoration: t.done ? 'line-through' : 'none', color: t.done ? '#999' : '#000' }}>
                    {t.title}
                  </span>
                  <button onClick={() => setEditingTask(t)} style={{ ...styles.btn, background: '#FF9800', color: 'white' }}>✏️</button>
                  <button onClick={() => deleteTask(t.id)} style={{ ...styles.btn, background: '#f44336', color: 'white' }}>🗑</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Customers */}
      <section style={styles.section}>
        <h2>Customers ({customers.length})</h2>
        <div style={styles.addRow}>
          <input
            value={newCustomer.name}
            onChange={e => setNewCustomer({ ...newCustomer, name: e.target.value })}
            placeholder="名前..."
            style={{ ...styles.input, flex: 2 }}
          />
          <input
            value={newCustomer.jender}
            onChange={e => setNewCustomer({ ...newCustomer, jender: e.target.value })}
            placeholder="性別..."
            style={{ ...styles.input, flex: 1 }}
          />
          <button onClick={addCustomer} style={{ ...styles.btn, background: '#4CAF50', color: 'white' }}>追加</button>
        </div>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {customers.map(c => (
            <li key={c.id} style={styles.listItem}>
              {editingCustomer?.id === c.id ? (
                // 編集モード
                <>
                  <input
                    value={editingCustomer.name}
                    onChange={e => setEditingCustomer({ ...editingCustomer, name: e.target.value })}
                    placeholder="名前..."
                    style={{ ...styles.input, flex: 2 }}
                    autoFocus
                  />
                  <input
                    value={editingCustomer.jender}
                    onChange={e => setEditingCustomer({ ...editingCustomer, jender: e.target.value })}
                    placeholder="性別..."
                    style={{ ...styles.input, flex: 1 }}
                  />
                  <button onClick={() => saveCustomer(c)} style={{ ...styles.btn, background: '#2196F3', color: 'white' }}>保存</button>
                  <button onClick={() => setEditingCustomer(null)} style={{ ...styles.btn, background: '#9E9E9E', color: 'white' }}>キャンセル</button>
                </>
              ) : (
                // 表示モード
                <>
                  <span style={{ flex: 1 }}>{c.name} <span style={{ color: '#888' }}>({c.jender})</span></span>
                  <button onClick={() => setEditingCustomer(c)} style={{ ...styles.btn, background: '#FF9800', color: 'white' }}>✏️</button>
                  <button onClick={() => deleteCustomer(c.id)} style={{ ...styles.btn, background: '#f44336', color: 'white' }}>🗑</button>
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