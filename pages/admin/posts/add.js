import AuthCheck from '../../../components/AuthCheck';
import { UserContext } from '../../../lib/context';
import { firestore, auth, serverTimestamp } from '../../../lib/firebase';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import kebabCase from 'lodash.kebabcase';
import toast from 'react-hot-toast';

export default function AdminPostsPage(props) {
  return (
    <main>
      <AuthCheck>
        <CreateNewPost />
      </AuthCheck>
    </main>
  );
}

function CreateNewPost() {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState('');
  const [teaser, setTeaser] = useState('');
  const [content, setContent] = useState('');

  // Ensure slug is URL safe
  const slug = encodeURI(kebabCase(title));

  // Validate length
  const isValid = title.length > 3 && title.length < 100;

  // Create a new post in firestore
  const createPost = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;
    const ref = firestore.collection('users').doc(uid).collection('posts').doc(slug);

    // Tip: give all fields a default value here
    const data = {
      title,
      slug,
      uid,
      username,
      published: false,
      content,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0,
    };

    await ref.set(data);

    toast.success('Post created!')

    // Imperative navigation after doc is set
    router.push(`/admin/posts/${slug}`);

  };

  return (
    <>
    <h1>Add Posts</h1>
    <form onSubmit={createPost} className="mb-12">
        <div className="mb-5">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Post Title</label>
          <input 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title" 
            className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required />
        </div>
        <div className="mb-5">
          <label htmlFor="teaser" className="block text-gray-700 text-sm font-bold mb-2">Post Teaser</label>
          <input
            value={teaser}
            onChange={(e) => setTeaser(e.target.value)}
            className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="teaser"
            required />
        </div>
        <div className="mb-5">
          <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">Post Content</label>
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="content" 
            rows="4"/>
        </div>
        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input 
            type="text" 
            aria-label="disabled input 2" 
            className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            value={slug} 
            disabled readOnly />
          </div>
          <label className="block text-gray-700 text-sm font-bold ml-2">Slug</label>
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