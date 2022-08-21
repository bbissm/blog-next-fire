import Navbar from '../components/Navbar'
import '../styles/globals.css'
import {Toaster} from 'react-hot-toast'
import { UserContext } from '../lib/context'
import { useEffect, useAuthState, auth } from 'react'
import {useUserData} from '../lib/hooks'
import SideMenu from '../components/SideMenu';

function MyApp({ Component, pageProps }) {

  const userData = useUserData();

  const {user, username} = userData;

  return (
    <>
    <UserContext.Provider value={userData}>
      <Navbar />
      {username ? <SideMenu username={username} /> : ''}
      <Component {...pageProps} />
      <Toaster/>
    </UserContext.Provider>
    </>
  )
}

export default MyApp
