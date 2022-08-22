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
        <>
          <li>
            <Link href="/components">
              <button className="btn-gray">Components</button>
            </Link>
          </li>
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
          
        </>
        {/* user is signed-in and has username */}
        {username ? (
          <>
            <li>
              <Link href={`/${username}`}>
                <img src={user?.photoURL || '/hacker.png'} />
              </Link>
            </li>
          </>
        ) : (
        <li>
            <Link href="/enter">
              <button className="btn-gray">Log in</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}