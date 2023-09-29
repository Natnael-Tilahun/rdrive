import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getAccessToken, getOdConcealedAccessTokens } from '../utils/odAuthTokenStore';
import Seo from '../components/Meta/Seo';
import siteConfig from '../config/site.config';
import dynamic from 'next/dynamic';
import { Card, CardBody, Image } from '@nextui-org/react';
import Link from 'next/link';

const FileListing = dynamic(() => import('../components/FileListing'));

export default function FRP({ connectedAccounts, token }) {
  const seo = {
    title: `FRP Bypass - ${siteConfig.title}`,
    description: `Unlock your device with FRP Bypass. Find the necessary tools and resources to bypass Google Factory Reset Protection (FRP).`,
    keywords: `FRP Bypass, Factory Reset Protection, RDRIVE.ORG, rdrive, RDRIVE, therockstarind, Terms and rules, flash file, flash tool, firmware, emmc isp pinouts, test point, dump file, windows, qcn file`,
    url: `${siteConfig.domain}/frp`,
    ogImage: `${siteConfig.domain}/api/og/?link=/FRP-Files/`,
    color: '#000000',
  };

  const links = [
    {
      title: "Open Setting",
      img: "https://icons.iconarchive.com/icons/dtafalonso/android-lollipop/512/Settings-icon.png",
      link: "https://cutt.ly/xP6PdRP",
    },
    {
        title: "Google Search",
        img: "https://icon-library.com/images/google-search-icon/google-search-icon-23.jpg",
        link: "https://cutt.ly/rArZdsK",
    },
    {
        title: "Galaxy Store",
        img: "https://i.pinimg.com/originals/b1/47/47/b147478668fcb07bd72b253f178e3a01.png",
        link: "https://www.samsung.com/vn/apps/galaxy-store/",
    },
    {
        title: "Set Lock",
        img: "https://icons.iconarchive.com/icons/papirus-team/papirus-apps/512/system-lock-screen-icon.png",
        link: "https://cutt.ly/EArZzHh",
      },
      {
        title: "My Files",
        img: "https://play-lh.googleusercontent.com/lnpKvMilxwIke9dyR1y87hbQ-J3av7kUaHspJHrsE46oYJg-Uy6I90XAHuyaO1j15Q",
        link: "https://cutt.ly/qArZm3J",
      },
      {
        title: "S9 Launcher",
        img: "https://img.utdstc.com/icon/eb4/da0/eb4da080e9b9001c5a7abc731aaa9bafb1cbf25d3e45e4bdc1d8987438e89cd3:512",
        link: "https://galaxystore.samsung.com/detail/com.s9launcher.dir.launcher",
      },
      {
        title: "Alliancex",
        img: "https://alliancex.org/shield/wp-content/uploads/2021/01/shieldlogo.png",
        link: "https://cutt.ly/IArZPNE",
      },
      {
        title: "Open YouTube",
        img: "https://cdn-icons-png.flaticon.com/512/1384/1384060.png",
        link: "https://cutt.ly/EArZG22",
      },
      {
        title: "Download Alliancex",
        img: "https://alliancex.org/shield/wp-content/uploads/2021/01/shieldlogo.png",
        link: "https://galaxystore.samsung.com/detail/com.rrivenllc.shieldx?session_id=W_0a719781bf2f739158262639f4c63d35",
      },
      {
        title: "Open DialPad",
        img: "https://icons.iconarchive.com/icons/dtafalonso/android-lollipop/256/Phone-icon.png",
        link: "tel:123456789",
      },
      {
        title: "Open Gmail",
        img: "https://cdn-icons-png.flaticon.com/512/5968/5968534.png",
        link: "mailto:google@gmail.com",
      },
      {
        title: "Open Maps",
        img: "https://img.icons8.com/color/512/FFFFFF/google-maps-new.png",
        link: "https://cutt.ly/kNP2Etq",
      },
]

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-black">
      <Seo {...seo} />
      <main className="flex w-full flex-1 flex-col bg-white dark:bg-black">
        <Navbar />
        <div className="mx-auto w-full max-w-6xl p-2">
          <h1 className="my-4 text-center text-4xl font-bold">FRP Bypass</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {links.map((link, index) => (
              <Card
                shadow="none"
                className="border dark:border-gray-700"
                key={index}
                isPressable
                isHoverable
              >
                <CardBody className='p-1 overflow-hidden'>
                  <Link href={link.link} passHref target='_blank'>
                    <div className="relative h-36 md:h-44 flex items-center justify-center">
                      <Image
                        radius="lg"
                        alt={link.title}
                        className="h-36 md:h-40 object-contain object-center my-10"
                        src={link.img}
                        isBlurred
                      />
                    </div>
                    <div className="flex items-start justify-center space-x-2 font-semibold">
                      <h1>{link.title}</h1>
                    </div>
                  </Link>
                </CardBody>
              </Card>
            ))}
          </div>
          <div className="mt-6 mb-2">
            <FileListing query={{ path: ['FRP-Files'] }} token={token} />
          </div>
        </div>
      </main>
      <Footer token={token} />
      <input type="hidden" id="connectedAccounts" value={connectedAccounts} />
    </div>
  );
}

export async function getServerSideProps({ req, locale }) {
  const connectedAccounts = await getOdConcealedAccessTokens();
  const token = await getAccessToken(0);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      connectedAccounts,
      token,
    },
  };
}
