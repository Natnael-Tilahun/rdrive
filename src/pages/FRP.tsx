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

export default function FRP({ connectedAccounts }) {
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
      link: "intent://com.android.settings/#Intent;scheme=android-app;end",
    },
    {
        title: "Google Search",
        img: "https://icon-library.com/images/google-search-icon/google-search-icon-23.jpg",
        link: "intent://com.google.android.googlequicksearchbox/#Intent;scheme=android-app;end",
    },
    {
      title: "Google Assistant",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Google_Assistant_logo.svg/512px-Google_Assistant_logo.svg.png",
      link: "intent://com.google.android.apps.googleassistant/#Intent;scheme=android-app;end",
  },
    {
        title: "Galaxy Store",
        img: "https://i.pinimg.com/originals/b1/47/47/b147478668fcb07bd72b253f178e3a01.png",
        link: "intent://com.sec.android.app.samsungapps/#Intent;scheme=android-app;end",
    },
    {
        title: "Set Lock",
        img: "https://icons.iconarchive.com/icons/papirus-team/papirus-apps/512/system-lock-screen-icon.png",
        link: "intent://com.google.android.gms/#Intent;scheme=promote_smartlock_scheme;end",
      },
      {
        title: "Login Account",
        img: "https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png",
        link: "intent://com.google.android.gsf.login.LoginActivity/#Intent;scheme=android-app;end",
      },
      {
        title: "Android Hidden Settings",
        img: "https://icons.iconarchive.com/icons/dtafalonso/android-lollipop/512/Settings-icon.png",
        link: "https://galaxy.store/setting",
      },
      {
        title: "ADB",
        img: "https://play-lh.googleusercontent.com/0PjZiGvdvLugufsxB4XH9gJkH_zG7gDsNH3sm6jO28QzV0jw_ROfhOk-3xGE-i1GV1M",
        link: "intent://com.sec.android.app.modemui.activities.usb.settings/#Intent;scheme=android-app;end",
      },
      {
        title: "USB Setting",
        img: "https://cdn3d.iconscout.com/3d/premium/thumb/usb-sign-7429753-6136611.png",
        link: "intent://com.sec.android.app.popupcalculator/#Intent;scheme=android-app;end",
      },
      {
        title: "*#0*#",
        img: "https://cdn3d.iconscout.com/3d/premium/thumb/telephone-3260419-2725112.png",
        link: "tel:*#0*#",
      },
      {
        title: "Samsung Touch ID",
        img: "https://cdn.iconscout.com/icon/free/png-256/free-fingerprint-4-71235.png",
        link: "intent://com.android.settings/com.samsung.android.settings.biometrics.fingerprint.FingerprintEntry/#Intent;scheme=android-app;end",
      },
      {
        title: "Samsung Secure Folder",
        img: "https://play-lh.googleusercontent.com/1EjZ4I1xWdQNN44skn8tJLcsynQotyIbmVi9ZX53fMgGNP95G2PQ3EgqeQXzUOXNmTk",
        link: "intent://com.samsung.knox.securefolder/#Intent;scheme=android-app;end",
      },
      {
        title: "Smart Switch App",
        img: "https://play-lh.googleusercontent.com/KlHY0O3groJhp-QsW4CBfxZuabFkfGOhjIjrlQw-b28Z6KXmYn3QSFbrtgZsJz4HYw=w240-h480-rw",
        link: "intent://com.sec.android.easymover/#Intent;scheme=android-app;end",
      },
      {
        title: "Mi File Manager",
        img: "https://play-lh.googleusercontent.com/CsKUzyo8C47ZO10jX6tTvDRoGlqVTxWU8pwnBMbs6DMkjuDbDO78a_OYPj77tVxbI5Q",
        link: "intent://com.mi.android.globalfileexplorer/#Intent;scheme=android-app;end",
      },
      {
        title: "Xiaomi ShareMe",
        img: "https://play-lh.googleusercontent.com/ZhFicdr0SwamztwjDzIi6Sf6Zey19yRpx1VGvPiCZpNM9G_zsLAbpvRuexz2EiDKdms",
        link: "intent://com.xiaomi.midrop/#Intent;scheme=android-app;end",
      },
      {
        title: "Vivo EasyShare",
        img: "https://play-lh.googleusercontent.com/S5x2zCnIUx7AzFU5WRIvr8uaMhHXyONGQeuN37hvIcTDt8oyzlT1srs-N_wK980e9SU=w240-h480-rw",
        link: "intent://com.vivo.easyshare/#Intent;scheme=android-app;end",
      },
      {
        title: "Xshare Mini",
        img: "https://play-lh.googleusercontent.com/Mb1MK3P3mnUqCpa8OzJRfG79xt5CTboDaWzr82gnmRVNw7uFZcpoW49_46EJ_WZUm20",
        link: "intent://com.infinix.xshare/#Intent;scheme=android-app;end",
      },
      {
        title: "OPPO Phone Clone",
        img: "https://play-lh.googleusercontent.com/32XpkqAKmqbxEnBXc2pOQ9oCEMg2ahR6d-7JyOM-cJ4cPYyNeKXOfclLZzR9CAMYw-HO",
        link: "intent://com.coloros.backuprestore/#Intent;scheme=android-app;end",
      },
      {
        title: "Samsung My Files",
        img: "https://play-lh.googleusercontent.com/lnpKvMilxwIke9dyR1y87hbQ-J3av7kUaHspJHrsE46oYJg-Uy6I90XAHuyaO1j15Q",
        link: "intent://com.sec.android.app.myfiles/#Intent;scheme=android-app;end",
      },
      {
        title: "S9 Launcher",
        img: "https://img.utdstc.com/icon/eb4/da0/eb4da080e9b9001c5a7abc731aaa9bafb1cbf25d3e45e4bdc1d8987438e89cd3:512",
        link: "https://galaxystore.samsung.com/detail/com.s9launcher.dir.launcher",
      },
      {
        title: "Home Launcher",
        img: "https://play-lh.googleusercontent.com/TUofHfRQ-996L9Jzdb6LrTFF8wJ9lZ3cWP_UV0Uk_zX6JBZuaBJz2lzfbR0QyXMqsDM",
        link: "intent://com.sec.android.app.launcher/#Intent;scheme=android-app;end",
      },
      {
        title: "Open Alliancex",
        img: "https://alliancex.org/shield/wp-content/uploads/2021/01/shieldlogo.png",
        link: "intent://com.rrivenllc.shieldx/#Intent;scheme=android-app;end",
      },
      {
        title: "Open Chrome",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/2048px-Google_Chrome_icon_%28February_2022%29.svg.png",
        link: "intent://com.android.chrome/#Intent;scheme=android-app;end",
      },
      {
        title: "Open YouTube",
        img: "https://cdn-icons-png.flaticon.com/512/1384/1384060.png",
        link: "intent://com.google.android.youtube/#Intent;scheme=android-app;end",
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
        link: "intent://com.google.android.apps.maps/#Intent;scheme=android-app;end",
      },
]

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-black">
      <Seo {...seo} />
      <main className="flex w-full flex-1 flex-col bg-white dark:bg-black">
        <Navbar />
        <div className="mx-auto w-full max-w-6xl p-1">
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
                  <Link href={link.link} passHref target='_blank' className="p-4">
                    <div className="relative h-36 md:h-44 flex items-center justify-center">
                      <Image
                        radius="lg"
                        alt={link.title}
                        className="h-36 md:h-40 object-contain object-center my-10"
                        src={link.img}
                        isBlurred
                      />
                    </div>
                    <div className="flex items-start justify-center space-x-2">
                      <h1 className="text-center">{link.title}</h1>
                    </div>
                  </Link>
                </CardBody>
              </Card>
            ))}
          </div>
          <div className="my-2">
            <FileListing query={{ path: ['FRP-Files'] }} />
          </div>
        </div>
      </main>
      <Footer />
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
