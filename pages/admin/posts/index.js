import AuthCheck from '../../../components/AuthCheck';
import PostFeed from '../../../components/PostFeed';
import { firestore, auth, serverTimestamp } from '../../../lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

export default function AdminPostsPage(props) {
  return (
    <main>
      <AuthCheck>
        <h1 className="mb-6">Manage Posts</h1>
        <PostList />
      </AuthCheck>
    </main>
  );
}

function PostList() {
  const ref = firestore.collection('users').doc(auth.currentUser.uid).collection('posts');
  const query = ref.orderBy('createdAt');
  const [querySnapshot] = useCollection(query);

  const posts = querySnapshot?.docs.map((doc) => doc.data());

  return (
    <>
      <PostFeed posts={posts} admin />
    </>
  );
}