import Navbar from '../components/Navbar'
import '../styles/globals.css'
import {Toaster} from 'react-hot-toast'
import { UserContext } from '../lib/context'
import { useEffect, useAuthState, auth } from 'react'
import {useUserData} from '../lib/hooks'
import SideMenu from '../components/SideMenu';

import { library, faSolid } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faMicrochip } from '@fortawesome/free-solid-svg-icons'


function MyApp({ Component, pageProps }) {

  library.add(fab, faMicrochip)

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
