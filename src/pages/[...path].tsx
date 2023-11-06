import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import siteConfig from '../config/site.config'
import Breadcrumb from '../components/Breadcrumb'
import { getOdConcealedAccessTokens } from '../utils/odAuthTokenStore'
import Seo from '../components/Meta/Seo'
import Description from '../utils/description'
import dynamic from 'next/dynamic'
const FileListing = dynamic(() => import('../components/FileListing'))

export default function Route({ connectedAccounts, ogImage }) {
  const { query, asPath } = useRouter()
  const fileName = (query.path && Array.isArray(query.path) ? query.path[query.path.length - 1] : '').replaceAll('-', ' ').replaceAll('_', ' ');
  const extensionIndex = fileName.lastIndexOf('.');
  const title = extensionIndex !== -1 ? fileName.slice(0, extensionIndex) : fileName;

  const seo = {
    title: `${title} | ${siteConfig.title}`,
    description: Description(),
    keywords: `${title}, flash-file, flash-tool, EMMC ISP Pinouts, Operating Systems, Graphic Design, Multimedia, Development, Education, ${siteConfig.title}`,
    url: `${siteConfig.domain}${asPath}`,
    ogImage,
    color: '#000000',
  }

  return (
    <main className="my-4">
        <Seo {...seo} />
        <nav className="border dark:border-gray-700 rounded-lg flex items-center justify-between p-2 my-4">
            <Breadcrumb query={query} />
        </nav>
        <FileListing query={query} />
        <input type="hidden" id="connectedAccounts" value={connectedAccounts} />
    </main>
  )
}

export async function getServerSideProps({ resolvedUrl, locale }) {
  const connectedAccounts = await getOdConcealedAccessTokens()
  const ogImageUrl = `${siteConfig.domain}/api/og/?path=${resolvedUrl.split('?')[0]}`;

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      connectedAccounts,
      ogImage: ogImageUrl,
    },
  }
}
