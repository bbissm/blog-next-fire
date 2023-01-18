import Link from 'next/link'
import { useRouter } from 'next/router'

export default function LocaleSwitcher() {
  const router = useRouter()
  const { locales, locale: activeLocale } = router
  const otherLocales = locales.filter((locale) => locale !== activeLocale)

  return (
    <div>
        {otherLocales.map((locale,index) => {
          const { pathname, query, asPath } = router;
          return (
            <Link legacyBehavior key={index} href={{ pathname, query }} as={asPath} locale={locale}>
              <a>&nbsp;{locale}&nbsp;</a>
            </Link>
          )
        })}
    </div>
  )
}