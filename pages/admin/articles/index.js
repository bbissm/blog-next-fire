import { useEffect, useState } from "react";
import AuthCheck from "../../../components/AuthCheck";

export default function AdminPostsPage(props) {

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('http://restapi.loc:88/articles')
      .then((res) => res.json())
      .then((data) => {
        setArticles(data)
      })
  }, [])

    return (
      <main>
        <AuthCheck>
          <h1 className="mb-6">All Articles</h1>
          {articles.map((article, index) => {
              return (
                <h2>{article.id}. {article.title}</h2>
              )
          })}
        </AuthCheck>
      </main>
    );
  }