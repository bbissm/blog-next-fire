import AuthCheck from '../../../components/AuthCheck';
import PostFeed from '../../../components/PostFeed';
import { firestore, auth, serverTimestamp, postToJSON } from '../../../lib/firebase';
import { useCollection, useDocument, useDocumentData } from 'react-firebase-hooks/firestore';
import { useRouter } from 'next/router';

export async function getServerSideProps({locale}) {
  
  //First get all entries from posts collection
  const ref = firestore.collection('posts');
  const postsQuery = firestore
    .collectionGroup('posts');
  const tmpPosts = (await postsQuery.get()).docs.map(postToJSON);

  // Get all multilangual content from locales collection with current language
  const querySnapshot = await firestore.collectionGroup('locales')
  .where('uid','==',locale)
  .get();
  const locales = querySnapshot?.docs.map((doc) => doc.data())
  
  // Check for locales entry with post slug as pid and filter undefined output out.

  const posts = tmpPosts?.map((post) => {
    let localeContent = locales.filter(localeEntry => post.slug === localeEntry.pid)
    if(localeContent[0] !== undefined){
      const {content,title} = localeContent[0];
      return {
        ...post, content, title
      };
    }else{
      return {post}
    }
  }).filter(notUndefined => notUndefined !== undefined)

  return {
    props: { posts }, // will be passed to the page component as props
  };
}

export default function AdminPostsPage({posts}) {
  const router = useRouter();
  const {locale, locales, defaultLocale} = router;

  return (
    <main>
      <AuthCheck>
        <h1 className="mb-6">Manage Posts</h1>
        <PostList posts={posts}/>
      </AuthCheck>
    </main>
  );
}

function PostList({posts}) {
  return (
    <>
      <PostFeed posts={posts} admin />
    </>
  );
}