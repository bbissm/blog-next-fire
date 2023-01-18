import Link from 'next/link';
import { useRouter } from 'next/router';
import LocaleSwitcher from '../../components/LocaleSwitcher';


export const getStaticProps = ({ locale, locales }) => {
    return {
        props: {
        locale,
        locales,
        },
    };
};

export default function GspPage(props) {
  const router = useRouter();
  const { defaultLocale } = router;

  return (
    <div>
      <h1>getStaticProps page</h1>
      <p>Current locale: {props.locale}</p>
      <p>Default locale: {defaultLocale}</p>
      <p>Configured locales: {JSON.stringify(props.locales)}</p>

      <LocaleSwitcher />

      <Link legacyBehavior href="/gsp/first">
        <a>To dynamic getStaticProps page</a>
      </Link>
      <br />

      <Link legacyBehavior href="/gssp">
        <a>To getServerSideProps page</a>
      </Link>
      <br />

      <Link legacyBehavior href="/">
        <a>To index page</a>
      </Link>
      <br />
    </div>
  );
}

