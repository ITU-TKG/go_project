import React, { useState } from 'react';

const API = 'http://localhost:8080';

function Login({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const endpoint = isRegister ? '/register' : '/login';
    fetch(`${API}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then(r => r.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
          return;
        }
        if (!isRegister) {
          localStorage.setItem('token', data.token);
          onLogin();
        } else {
          setIsRegister(false);
          setError('登録しました！ログインしてください');
        }
      })
      .catch(() => setError('通信エラー'));
  };

  const styles = {
    container: { maxWidth: 400, margin: '100px auto', fontFamily: 'sans-serif', padding: '0 16px' },
    input: { width: '100%', padding: 10, fontSize: 14, borderRadius: 4, border: '1px solid #ccc', marginBottom: 12, boxSizing: 'border-box' },
    btn: { width: '100%', padding: 12, borderRadius: 4, border: 'none', cursor: 'pointer', fontSize: 14, background: '#4CAF50', color: 'white' },
    link: { color: '#2196F3', cursor: 'pointer', textDecoration: 'underline' },
    error: { color: 'red', marginBottom: 12 },
  };

  return (
    <div style={styles.container}>
      <h1>{isRegister ? '新規登録' : 'ログイン'}</h1>
      {error && <p style={styles.error}>{error}</p>}
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="メールアドレス..."
        style={styles.input}
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="パスワード..."
        style={styles.input}
      />
      <button onClick={handleSubmit} style={styles.btn}>
        {isRegister ? '登録' : 'ログイン'}
      </button>
      <p style={{ marginTop: 16, textAlign: 'center' }}>
        {isRegister
          ? <span>アカウントをお持ちの方は<span style={styles.link} onClick={() => setIsRegister(false)}>ログイン</span></span>
          : <span>アカウントをお持ちでない方は<span style={styles.link} onClick={() => setIsRegister(true)}>新規登録</span></span>
        }
      </p>
    </div>
  );
}

export default Login;