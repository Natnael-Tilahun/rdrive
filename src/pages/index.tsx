import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import siteConfig from '../config/site.config';
import { getOdConcealedAccessTokens } from '../utils/odAuthTokenStore';
import Seo from '../components/Meta/Seo';
import dynamic from 'next/dynamic';
const FileListing = dynamic(() => import('../components/FileListing'));

export default function Home({ connectedAccounts }) {
  const seo = {
    title: `${siteConfig.title} - Get access to Flash File, Dump File, QCN File, MDM File, FRP, Flash Tool, EMMC ISP Pinouts, Windows Files.`,
    description: 'RDRIVE Provide Mobile Firmwares Drivers Flash Tool FRP Dump FIle EMMC ISP PinOut Samsung MDM File Windows Files.',
    keywords: 'RDRIVE.ORG, rdrive, RDRIVE, therockstarind, flash file, flash tool, firmware, emmc isp pinouts, test point, dump file, windows, qcn file',
    url: `${siteConfig.domain}`,
    ogImage: `${siteConfig.domain}/icons/512.png`,
    color: '#000000',
  };

  return (
      <main className="my-4">
        <Seo {...seo} />
        <FileListing />
        <input type="hidden" id="connectedAccounts" value={connectedAccounts} />
      </main>
  );
}

export async function getServerSideProps({locale }) {
  const connectedAccounts = await getOdConcealedAccessTokens();
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      connectedAccounts,
    },
  };
}
