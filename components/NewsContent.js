import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

//UI component for main news content
export default function NewsContent({ news }) {
    const createdAt = typeof news?.createdAt === 'number' ? new Date(news.createdAt) : news.createdAt.toDate() //Convert 

    return (
        <div className="card">
          <h1>{news?.title}</h1>
          <span className="text-sm">
            Written by{' '}
            <Link legacyBehavior href={`/${news.username}/`}>
              <a className="text-info">@{news.username}</a>
            </Link>{' '}
            on {createdAt.toISOString()}
          </span>
          <ReactMarkdown>{news?.content}</ReactMarkdown>
        </div>
      );

}