import { useState } from 'react';

export async function getServerSideProps({ query }) {
    const res = await fetch(`http://restapi.loc:88/articles`)
    const articles = await res.json()

  return {
    props: { articles }, // will be passed to the page article as props
  };
}


export default function NewsPage(props) {
  const {articles} = props;
  return (
    <main>
      <div className="grid grid-cols-4 gap-4">
        {articles.map((article, index) => {
          return(
              <ul>
                <h2 className='font-weight-700'>{article.id}. {article.title}</h2>
              </ul>
          )
        })}
      </div>
    </main>
  );
}