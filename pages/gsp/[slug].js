import Link from 'next/link'
import { useRouter } from 'next/router'
import LocaleSwitcher from '../../components/LocaleSwitcher'


export default function GspPage(props) {
  const router = useRouter()
  const { defaultLocale, isFallback, query } = router

  if (isFallback) {
    return 'Loading...'
  }

  return (
    <div>
      <h1>getStaticProps page</h1>
      <p>Current slug: {query.slug}</p>
      <p>Current locale: {props.locale}</p>
      <p>Default locale: {defaultLocale}</p>
      <p>Configured locales: {JSON.stringify(props.locales)}</p>

      <LocaleSwitcher />

      <Link legacyBehavior href="/gsp">
        <a>To getStaticProps page</a>
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
  )
}

export const getStaticProps = ({ locale, locales }) => {
  return {
    props: {
      locale,
      locales,
    },
  }
}

export const getStaticPaths = ({ locales }) => {
  const paths = []

  for (const locale of locales) {
    paths.push({ params: { slug: 'first' }, locale })
    paths.push({ params: { slug: 'second' }, locale })
  }

  return {
    paths,
    fallback: true,
  }
}