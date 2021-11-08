import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Loader from '../components/Loader'
import toast from 'react-hot-toast'

export default function Home() {
  return (
      <>
      <Loader show />
        testdsad
        <Link 
          prefetch={false}
          href={{
            pathname: '/[username]',
            query: {username: 'martin'}    
        }}
        >
        <a>My Profile</a>
        </Link>
        <div>
          <button onClick={() => toast.success('hello toast!')}>
            Toast me
          </button>
        </div>
      </>
  )
}
