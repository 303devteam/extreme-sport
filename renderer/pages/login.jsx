import styles from '../styles/Login.module.scss'
import { useRouter } from "next/router"
import { useState } from 'react'
import { Button } from '@mui/joy'
import logo from '../public/images/logo.png'
import Snackbar from '@mui/joy/Snackbar'
import { ErrorOutline } from '@mui/icons-material'
import loginSchema from '../validationSchemas/loginSchema'
import axios from 'axios'

export default function Login() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState(false)

  const handleLogin = () => {
    const data = {email, password}
    loginSchema.validate(data).then(() => {
      axios.post('http://localhost:8000/employees/login', data).then(res => {
        localStorage.setItem('user', JSON.stringify(res.data))
        router.push('/home')
      }).catch((err) => {
        setError(true)
        setTimeout(() => {
          setError(false)
        }, 5000)
      })
    }).catch((err) => {
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 5000)
    })
  }

  return (
    <>
      <div className={styles.main}>
        <img className={styles.logo} src={logo.src} width={100} height={100} />
        <div className={styles.formContainer}>
          <h1 className={styles.formHeader}>ExtremeSport Manager</h1>
          <input onChange={(e) => setEmail(e.target.value)} className={styles.formInput} placeholder="Email" type='email' />
          <input onChange={(e) => setPassword(e.target.value)} className={styles.formInput} placeholder="Password" type='password' />
          <Button onClick={handleLogin} style={{width: '140px', marginTop: 'auto'}}>Log In</Button>
        </div>
      </div>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={error}
        color='danger'
        variant='solid'
      >
        <ErrorOutline />
        Error Logging In!
      </Snackbar>
    </>
  )
}


