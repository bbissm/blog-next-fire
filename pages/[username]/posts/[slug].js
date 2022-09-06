import PostContent from "../../../components/PostContent";
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { firestore, getUserWithUsername, postToJSON } from '../../../lib/firebase';
import HeartButton from '../../../components/HeartButton';
import AuthCheck from '../../../components/AuthCheck';
import Link from "next/dist/client/link";
import { useRouter } from "next/router";
import LocaleSwitcher from "../../../components/LocaleSwitcher";


export async function getStaticProps({ params }) {
  console.log(params)
    const { username, slug, locale, locales } = params;
    const userDoc = await getUserWithUsername(username);
    
    let post;
    let path;
  
    if (userDoc) {
      const postRef = userDoc.ref.collection('posts').doc(slug);

      post = postToJSON(await postRef.get());
  
      path = postRef.path;
    }
  
    return {
      props: { post, path },
      revalidate: 100, //regenrate this page on the server when new request come in after 100ms
    };
  }
  
  export async function getStaticPaths({locales}) {
    console.log(locales)
    // Improve my using Admin SDK to select empty docs
    const snapshot = await firestore.collectionGroup('posts').get();
    
    const paths = snapshot.docs.map((doc) => {
      const { slug, username } = doc.data();
      return {
        params: { username, slug },
      };
    });
  
    return {
      // must be in this format:
      // paths: [
      //   { params: { username, slug }}
      // ],
      paths,
      fallback: 'blocking', //cache the page on the cdn, after created a new post, before calling that page 
    };
  }

export default function Post(props) {
    const {defaultLocale, isFallback, query} = useRouter();
    const postRef = firestore.doc(props.path);

    const [realtimePost] = useDocumentData(postRef);

    const post = realtimePost || props.post;


    return (
        <main>
            <AuthCheck
              fallback={
                <Link href="/enter">
                  <button>💗 Sign Up</button>
                </Link>
              }
            >
              <section>
                <PostContent post={post} />
              </section>
              <aside className="card">
                  <p> 
                  <strong>{post.heartCount || 0} 🤍</strong>
                  </p>
                  <HeartButton postRef={postRef} />
              </aside>
            </AuthCheck>
        </main>
      );
}