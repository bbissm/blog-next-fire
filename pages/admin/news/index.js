import styles from '../../../styles/Admin.module.css';

import kebabCase from "lodash.kebabcase";
import { useRouter } from "next/router";
import { useState } from "react";
import AuthCheck from "../../../components/AuthCheck";
import { firestore, auth } from "../../../lib/firebase";
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
      const uid = auth.currentUser.uid;

      const ref = firestore.collection('news').doc(slug);
  
      // Tip: give all fields a default value here
      const data = {
        title,
        slug,
        published: false,
        teaser,
        content,
        uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
  
      await ref.set(data);
  
      toast.success('News created!')
  
      // Imperative navigation after doc is set
      // router.push(`/admin/news/${slug}`);
    };
  
    return (
      <>
      <h1 className="mb-6">Add News</h1>
      <form onSubmit={createNews} className="mb-12">
        <div class="mb-5">
          <label for="title" class="block text-gray-700 text-sm font-bold mb-2">News Title</label>
          <input 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title" 
            className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required />
        </div>
        <div class="mb-5">
          <label for="teaser" class="block text-gray-700 text-sm font-bold mb-2">News Teaser</label>
          <input
            value={teaser}
            onChange={(e) => setTeaser(e.target.value)}
            className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="teaser"
            required />
        </div>
        <div className="mb-5">
          <label for="content" class="block text-gray-700 text-sm font-bold mb-2">News Content</label>
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="content" 
            rows="4"/>
        </div>
        <div class="flex items-start mb-6">
          <div class="flex items-center h-5">
            <input 
            type="text" 
            aria-label="disabled input 2" 
            className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            value={slug} 
            disabled readonly />
          </div>
          <label class="block text-gray-700 text-sm font-bold ml-2">Slug</label>
        </div>
        <button 
        type="submit" 
        disabled={!isValid}
        className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
          Create New Post
          </button>
      </form> 
    
    </>
    );
}