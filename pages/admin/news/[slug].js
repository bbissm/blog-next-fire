import styles from '../../../styles/Admin.module.css';
import AuthCheck from '../../../components/AuthCheck';
import { firestore, auth, serverTimestamp } from '../../../lib/firebase';

import { useState } from 'react';
import { useRouter } from 'next/router';

import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import toast from 'react-hot-toast';
import ImageUploader from '../../../components/ImageUploader';
import Image from 'next/image';

export default function AdminNewsEdit(props) {
  return (
    <AuthCheck>
        <NewsManager />
    </AuthCheck>
  );
}

function NewsManager() {
  const [preview, setPreview] = useState(false);

  const router = useRouter();
  const { slug } = router.query;

  const newsRef = firestore.collection('news').doc(slug);
  const [news] = useDocumentData(newsRef);

  return (
    <main className={styles.container}>
      {news && (
        <>
          <section>
            <h1>{news.title}</h1>
            <p>ID: {news.slug}</p>

            <NewsForm newsRef={newsRef} defaultValues={news} preview={preview} />
          </section>

          <aside>
          <h3>Tools</h3>
            <button onClick={() => setPreview(!preview)}>{preview ? 'Edit' : 'Preview'}</button>
            <Link href={`/${news.username}/${news.slug}`}>
              <button className="btn-blue">Live view</button>
            </Link>
          </aside>
        </>
      )}
    </main>
  );
}

function NewsForm({ defaultValues, newsRef, preview }) {
  const { register, handleSubmit, reset, watch, formState } = useForm({ defaultValues, mode: 'onChange' });

  const { isValid, isDirty, errors } = formState;

  const updateNews = async ({ content, published }) => {
    await newsRef.update({
      content,
      published,
      updatedAt: serverTimestamp(),
    });

    reset({ content, published });

    toast.success('News updated successfully!')
  };

  return (
    <>
    <ImageUploader />
    <form onSubmit={handleSubmit(updateNews)}>
      {preview && (
        <div className="card">
            <ReactMarkdown>{watch('content')}</ReactMarkdown>
            {console.log(watch('content'))}
        </div>
      )}

      <div className={preview ? styles.hidden : styles.controls}>
  
        <textarea 
        rows="30"
        className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        {...register('content', {maxLength:{value:2000,message:'Max value is 2000'}, minLength:{value:10,message:'Min value is 10'}, required: "This is required."})}></textarea>
        
        {console.log(errors)}
        {errors.content && <p className="text-danger">{errors.content.message}</p>}

      
        <fieldset>
          <input className={styles.checkbox} type="checkbox" {...register('published')} />
          <label>Published</label>
        </fieldset>

        <button type="submit" className="btn-green" disabled={!isDirty || !isValid}>
          Save Changes
        </button>
      </div>
    </form>
    </>
  
  );
}