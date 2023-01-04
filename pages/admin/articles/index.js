import { useEffect, useState } from "react";
import AuthCheck from "../../../components/AuthCheck";

export default function AdminPostsPage(props) {
  const { data } = props;


    return (
      <main>
        <AuthCheck>
          <h1 className="mb-6">All Articles</h1>
          {data.map((article, index) => {
              return (
                <h2 key={article.id}>{article.id}. {article.title}</h2>
              )
          })}
        </AuthCheck>
      </main>
    );
  }

  export async function getServerSideProps() {
    try {
      const response = await fetch("http://restapi.loc:88/articles");
      const data = await response.json();
  
      return {
        props: {
          data,
        },
      };
    } catch (error) {
      console.log(error);
      return {  props: { data: [] }  };
    }
  }

  