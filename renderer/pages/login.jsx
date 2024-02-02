import React from 'react'
import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/login.scss'

export default function HomePage() {
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here, such as validation and authentication
    if (password === 'yourSecretPassword') {
      // Successful login logic
      alert('Login successful!');
    } else {
      // Failed login logic
      setErrorMessage('Incorrect password');
    }
  };



  return (
    <>
    <Head>
      <title>Login</title>
    </Head>
    <div className='loginform'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Password:</label>
          <input
            type='password'
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div>
          <button type='submit'>Login</button>
        </div>
        {errorMessage && <div className='error'>{errorMessage}</div>}
      </form>
    </div>
  </>
  )
}


