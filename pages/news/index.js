import { useState } from 'react';
import Loader from '../../components/Loader';
import NewsFeed from '../../components/NewsFeed';
import { firestore, fromMillis, postToJSON } from '../../lib/firebase';

const LIMIT = 3;

export async function getServerSideProps({ query }) {
  // JSON serializable data
  let news = null;
    const newsQuery = firestore
        .collection('news')
        //.where('published', '==', true)
        .orderBy('createdAt', 'desc')
        .limit(LIMIT);

    news = (await newsQuery.get()).docs.map(postToJSON);

  return {
    props: { news }, // will be passed to the page component as props
  };
}


export default function NewsPage(props) {
    
    const [loading, setLoading] = useState(false);
    const [news, setNews] = useState(props.news);
  
    const [newsEnd, setNewsEnd] = useState(false);

    const getMoreNews = async () => {
        setLoading(true);
        const last = news[news.length - 1];
        const cursor = typeof last.createdAt === 'number' ? fromMillis(last.createdAt) : last.createdAt;

        const query = firestore
        .collectionGroup('news')
        //.where('published', '==', true)
        .orderBy('createdAt', 'desc')
        .startAfter(cursor)
        .limit(LIMIT);

        const newNews = (await query.get()).docs.map((doc) => doc.data());

        setNews(news.concat(newNews));
        setLoading(false);

        if (newNews.length < LIMIT) {
            setNewsEnd(true);
        }
  };
  return (
    <main>
      <NewsFeed news={news} />
        {!loading && !newsEnd && <button onClick={getMoreNews}>Load more</button>}

        <Loader show={loading} />

        {newsEnd && 'You have reached the end!'}
    </main>
  );
}