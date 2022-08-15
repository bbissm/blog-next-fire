import { getUserWithUsername, postToJSON } from '../../lib/firebase'
import UserProfile from '../../components/UserProfile';
import PostFeed from '../../components/PostFeed';
import NewsFeed from '../../components/NewsFeed';
import { firestore, auth } from '../../lib/firebase';

export async function getServerSideProps({ query }) {
  const { username } = query;

  const userDoc = await getUserWithUsername(username);

  // If no user, short circuit to 404 page
  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  // JSON serializable data
  let user = null;
  let posts = null;
  let news = null;

  if (userDoc) {
    user = userDoc.data();
    const postsQuery = userDoc.ref
      .collection('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .limit(5);
    posts = (await postsQuery.get()).docs.map(postToJSON);
    
    const newsQuery = firestore.collection('news')
      .where('uid', '==', userDoc.id)
      //.orderBy('createdAt', 'desc')
      .limit(5);
    news = (await newsQuery.get()).docs.map(postToJSON);
  }

  return {
    props: { user, posts, news }, // will be passed to the page component as props
  };
}

export default function UserProfilePage({ user, posts, news }) {
  return (
    <main>
      <UserProfile user={user} />
      <h1>POSTS</h1>
      <PostFeed posts={posts} />
      <h1>NEWS</h1>
      <NewsFeed news={news} />
    </main>
  );
}