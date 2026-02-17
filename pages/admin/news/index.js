import AuthCheck from "../../../components/AuthCheck";
import { firestore } from "../../../lib/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import NewsFeed from "../../../components/NewsFeed";

export default function AdminPostsPage(props) {
    return (
      <main>
        <AuthCheck>
          <h1 className="mb-6">Manage News</h1>
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