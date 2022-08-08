import Link from 'next/link';

export default function NewsFeed({ news, admin }) {
  return news ? news.map((newsEntry) => <NewsItem newsEntry={newsEntry} key={newsEntry.slug} admin={admin} />) : null;
}

function NewsItem({ newsEntry, admin = false }) {
  // Naive method to calc word count and read time
  const wordCount = newsEntry?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);

  return (
    <div className="card">
      <h2>
          <a>{newsEntry.title}</a>
        </h2>
      <footer>
        <span>
          {wordCount} words. {minutesToRead} min read
        </span>
      </footer>

      {/* If admin view, show extra controls for user */}
      {admin && (
        <>
          <Link href={`/admin/${newsEntry.slug}`}>
            <h3>
              <button className="btn-blue">Edit</button>
            </h3>
          </Link>

          {newsEntry.published ? <p className="text-success">Live</p> : <p className="text-danger">Unpublished</p>}
        </>
      )}
    </div>
  );
}