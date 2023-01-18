import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UserContext } from '../lib/context';
import { auth } from '../lib/firebase';
import AuthCheck from './AuthCheck';
import LocaleSwitcher from './LocaleSwitcher';

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
          <Link legacyBehavior href="/">
            <button className="btn-logo">NXT</button>
          </Link>
        </li>
        <>
          <li>
            <Link legacyBehavior href="/articles">
              <button className="btn-gray">Articles</button>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="/components">
              <button className="btn-gray">Components</button>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="/news">
              <button className="btn-green">News</button>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="/posts">
              <button className="btn-blue">Posts</button>
            </Link>
          </li>
          
        </>
        {/* user is signed-in and has username */}
        {username ? (
          <>
            <li>
              <Link legacyBehavior href={`/${username}`}>
                <img src={user?.photoURL || '/hacker.png'} />
              </Link>
            </li>
          </>
        ) : (
        <li>
            <Link legacyBehavior href="/enter">
              <button className="btn-gray">Log in</button>
            </Link>
          </li>
        )}
        <li>
          <LocaleSwitcher />
        </li>
      </ul>
    </nav>
  );
}