import styles from './auth.module.scss';

import { FormEvent, useState } from 'react';

type AuthProps = {
  setToken: (token: string) => void
}

const Auth = ({setToken}: AuthProps) => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/auth', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          "login": login,
          "password": password
        })
      })
      if (!res.ok) {
        return;
      }

      const json = await res.json();

      localStorage.setItem('token', json.token);
      setToken(json.token);
    }
    catch (err) {
      console.error(err);
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.cell}>
          <label htmlFor="" className={styles.label}>Login</label>
          <input type="text" className={styles.input} onChange={(e) => setLogin(e.target.value)}/>
        </div>
        <div className={styles.cell}>
          <label htmlFor="" className={styles.label}>Hasło</label>
          <input type="password" className={styles.input} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button className={styles.button} type='button' onClick={(e) => handleLogin(e)}>zaloguj</button>
      </form>
    </div>
  );
};

export default Auth;