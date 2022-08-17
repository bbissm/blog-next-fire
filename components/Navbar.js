import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UserContext } from '../lib/context';
import { auth } from '../lib/firebase';
import AuthCheck from './AuthCheck';

// Top navbar
export default function Navbar() {
  const { user, username } = useContext(UserContext);

  const router = useRouter();

  const signOut =  () => {
    auth.signOut();
    router.reload();
  }

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <button className="btn-logo">NXT</button>
          </Link>
        </li>
       
        {/* user is signed-in and has username */}
        {username && (
          <>
            <li className="push-left">
              <button onClick={signOut}>Sign Out</button>
            </li>
            <li>
              <Link href="/admin/news">
                <button className="btn-green">Add News</button>
              </Link>
            </li>
            <li>
              <Link href="/admin/posts">
                <button className="btn-blue">Write Posts</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                <img src={user?.photoURL || '/hacker.png'} />
              </Link>
            </li>
          </>
        )}
        {/* user is not signed OR has not created username */}
        {!username && (
          <>
            <li>
              <Link href="/news">
                <button className="btn-green">News</button>
              </Link>
            </li>
            <li>
              <Link href="/posts">
                <button className="btn-blue">Posts</button>
              </Link>
            </li>
            <li>
              <Link href="/enter">
                <button className="btn-gray">Log in</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}