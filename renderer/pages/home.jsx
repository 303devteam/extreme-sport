import styles from '../styles/Home.module.scss'
import { PeopleAlt, FitnessCenter, Engineering, LocalMall, CheckCircleOutline, Paid, Logout } from '@mui/icons-material';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Members from '../components/members';
import Packages from '../components/packages';
import Employees from '../components/employees';

export default function Home() {
  const [active, setActive] = useState('members')
  const [content, setContent] = useState(<Members />)
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  const router = useRouter()

  return(
    <>
      <div className={styles.main}>
        <div className={styles.navigation}>
          <div onClick={() => {setActive('members'); setContent(<Members />)}} className={active == 'members' ? styles.navItemActive : styles.navItem}>
            <PeopleAlt />
            <p className={active == 'members' ? styles.navTextActive : styles.navText}>Members</p>
          </div>
          <div onClick={() => {setActive('packages'); setContent(<Packages />)}} className={active == 'packages' ? styles.navItemActive : styles.navItem}>
            <FitnessCenter />
            <p className={active == 'packages' ? styles.navTextActive : styles.navText}>Packages</p>
          </div>
          <div onClick={() => {setActive('employees'); setContent(<Employees />)}} className={active == 'employees' ? styles.navItemActive : styles.navItem}>
            <Engineering />
            <p className={active == 'employees' ? styles.navTextActive : styles.navText}>Employees</p>
          </div>
          <div onClick={() => setActive('products')} className={active == 'products' ? styles.navItemActive : styles.navItem}>
            <LocalMall />
            <p className={active == 'products' ? styles.navTextActive : styles.navText}>Products</p>
          </div>
          <div onClick={() => setActive('checkins')} className={active == 'checkins' ? styles.navItemActive : styles.navItem}>
            <CheckCircleOutline />
            <p className={active == 'checkins' ? styles.navTextActive : styles.navText}>Check-Ins</p>
          </div>
          <div onClick={() => setActive('payments')} className={active == 'payments' ? styles.navItemActive : styles.navItem}>
            <Paid />
            <p className={active == 'payments' ? styles.navTextActive : styles.navText}>Payments</p>
          </div>
          <div onClick={() => {
            localStorage.removeItem('token')
            router.push('/login')
          }} className={styles.navItem}>
            <Logout />
            <p className={styles.navText}>Log Out</p>
          </div>
          <div className={styles.navItem} style={{marginTop: 'auto'}}>
            <p className={styles.tag}>{user.userType}</p>
            <p className={styles.navText}>{user.firstName} {user.lastName}</p>
          </div>
        </div>
        <div className={styles.content}>
          {content}
        </div>
      </div>
    </>
  )
}