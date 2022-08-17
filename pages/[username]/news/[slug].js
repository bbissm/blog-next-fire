import NewsContent from "../../components/NewsContent";
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { firestore, getUserWithUsername, postToJSON } from '../../lib/firebase';
import AuthCheck from '../../components/AuthCheck';
import Link from "next/dist/client/link";

export async function getStaticProps({ params }) {
    const { username, slug } = params;
    const userDoc = await getUserWithUsername(username);
    
    let post;
    let path;

    if (userDoc) {
      const newsQuery = firestore.collection('news').doc(slug)
        .where('uid', '==', userDoc.id)
        .limit(5);
      news = (await newsQuery.get()).docs.map(postToJSON);
  
      path = newsQuery.path;
    }
  
    return {
      props: { news, path },
      revalidate: 100, //regenrate this page on the server when new request come in after 100ms
    };
  }
  
  export async function getStaticPaths() {
    // Improve my using Admin SDK to select empty docs
    const snapshot = await firestore.collection('news').get();
    
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

export default function News(props) {
    const postRef = firestore.doc(props.path);

    const [realtimeNews] = useDocumentData(postRef);

    const post = realtimeNews || props.post;


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
                <NewsContent post={post} />
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