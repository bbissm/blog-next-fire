import kebabCase from "lodash.kebabcase";
import { useRouter } from "next/router";
import { useState } from "react";
import AuthCheck from "../../../components/AuthCheck";
import toast from "react-hot-toast";

export default function AdminPostsPage(props) {
    return (
      <main>
        <AuthCheck>
          <h1 className="mb-6">Add Article</h1>
          <CreateNewArticle />
        </AuthCheck>
      </main>
    );
  }

function CreateNewArticle() {
    const router = useRouter();
    const [title, setTitle] = useState('');

    // Ensure slug is URL safe
    const slug = encodeURI(kebabCase(title));
  
    // Validate length
    const isValid = title.length > 3 && title.length < 100;
  
    // Create a new post in firestore
    const createArticle = async (e) => {
      e.preventDefault();
  
      // Tip: give all fields a default value here
      const data = { title:title };

      const response = await fetch(`http://restapi.loc:88/articles`, {
        method:'POST',
        body: JSON.stringify(data)
      })
      if (response.ok) {
        toast.success(`Article ${title} created! `);
      }
      // router.push(`/admin/Article/${slug}`);
    };
  
    return (
      <>
      <form onSubmit={createArticle} className="mb-12">
        <div className="mb-5">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Article Title</label>
          <input 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title" 
            className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required />
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