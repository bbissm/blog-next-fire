import {auth, googleAuthProvider} from '../lib/firebase'
//nfe
function enter() {
    // 1. user signed out <SignInButton />
  // 2. user signed in, but missing username <UsernameForm />
  // 3. user signed in, has username <SignOutButton />
    const user = null
    const username = null
    return (
        <div>
            {user ?
                !username ? <UsernameForm /> : <SignOutButton />
                :
                <SignInButton />
            }
        </div>
    );
}

export default enter;

function SignInButton() {
    const signInWithGoogle = async () => {
        await auth.signInWithPopup(googleAuthProvider)
    }
    return (
        <button className="btn-google" onClick={signInWithGoogle}>
          <img src={'/google.png'} /> Sign in with Google
        </button>
      );
}

function SignOutButton() {
    return <button onClick={() =>auth.signOut()}>Sign out</button>
}

function UsernameForm() {
    
}