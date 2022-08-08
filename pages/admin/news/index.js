import kebabCase from "lodash.kebabcase";
import { useRouter } from "next/router";
import { useState } from "react";
import AuthCheck from "../../../components/AuthCheck";
import { firestore } from "../../../lib/firebase";
import { serverTimestamp } from "firebase/firestore";
import toast from "react-hot-toast";
import { useCollection } from "react-firebase-hooks/firestore";
import NewsFeed from "../../../components/NewsFeed";

export default function AdminPostsPage(props) {
    return (
      <main>
        <AuthCheck>
          <CreateNewNews />
          <NewsList />
        </AuthCheck>
      </main>
    );
  }
function NewsList() {
    const ref = firestore.collection('news');
    const query = ref.orderBy('createdAt');
    const [querySnapshot] = useCollection(query);
  
    const news = querySnapshot?.docs.map((doc) => doc.data());
  
    return (
      <>
        <h1>Add News</h1>
        <NewsFeed news={news} admin />
      </>
    );
  }
function CreateNewNews() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [teaser, setTeaser] = useState('');
    const [content, setContent] = useState('');

    // Ensure slug is URL safe
    const slug = encodeURI(kebabCase(title));
  
    // Validate length
    const isValid = title.length > 3 && title.length < 100;
  
    // Create a new post in firestore
    const createNews = async (e) => {
      e.preventDefault();
      const ref = firestore.collection('news').doc(slug);
  
      // Tip: give all fields a default value here
      const data = {
        title,
        slug,
        published: false,
        teaser,
        content,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
  
      await ref.set(data);
  
      toast.success('News created!')
  
      // Imperative navigation after doc is set
      // router.push(`/admin/news/${slug}`);
    };
  
    return (
      <form onSubmit={createNews}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="My News entry title"
          className="input"
        />
        <textarea 
            value={teaser}
            onChange={(e) => setTeaser(e.target.value)}
            placeholder="Teaser"
            className="input" 
        />
        <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            className="input" 
        />
        <p>
          <strong>Slug:</strong> {slug}
        </p>
        <button type="submit" disabled={!isValid} className="btn-green">
          Create New Post
        </button>
      </form>
    );
}