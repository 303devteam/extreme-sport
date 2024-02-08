import styles from '../styles/Login.module.scss'
import { useRouter } from "next/router"
import { useState } from 'react'
import { Button } from '@mui/joy'
import logo from '../public/images/logo.png'
import Snackbar from '@mui/joy/Snackbar'
import { ErrorOutline } from '@mui/icons-material'

export default function Login() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  return (
    <>
      <div className={styles.main}>
        <img className={styles.logo} src={logo.src} width={100} height={100} />
        <div className={styles.formContainer}>
          <h1 className={styles.formHeader}>ExtremeSport Manager</h1>
          <input onChange={(e) => setEmail(e.target.value)} className={styles.formInput} placeholder="Email" type='email' />
          <input onChange={(e) => setPassword(e.target.value)} className={styles.formInput} placeholder="Password" type='password' />
          <Button onClick={() => router.push('/home')} style={{width: '140px', marginTop: 'auto'}}>Log In</Button>
        </div>
      </div>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open
        color='danger'
        variant='solid'
      >
        <ErrorOutline />
        Password does not match!
      </Snackbar>
    </>
  )
}


