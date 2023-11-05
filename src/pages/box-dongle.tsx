import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getAccessToken, getOdConcealedAccessTokens } from '../utils/odAuthTokenStore'
import Seo from '../components/Meta/Seo'
import siteConfig from '../config/site.config'
import { useEffect, useState } from 'react';
import MarkdownPreview from '../components/Previews/Markdown'
import { Card, CardBody, Image } from '@nextui-org/react'
import Link from 'next/link'

export default function Custom404({ connectedAccounts, token }) {
  const seo = {
    title: `Box Dongle | ${siteConfig.title}`,
    description: `We provide the Box Dongle service for free, allowing you to use it on your PC without any cracks. Download the USB Redirector Client and Radmin VPN to get started. Follow our step-by-step instructions to set up the Box Dongle. Join our network using Radmin VPN and use the provided credentials. Stay tuned for our instructional video.`,
    keywords: `Box Dongle, USB Redirector Client, Radmin VPN, Free service, PC usage, Step-by-step instructions, Network setup, Credentials,`,
    url: `${siteConfig.domain}/box-dongle`,
    ogImage: `${siteConfig.domain}/api/raw/?path=/assets/box/icon.png`,
    color: '#000000',
  };
  const links = [
    {
      title: "Octoplus Box",
      img: `${siteConfig.domain}/api/raw/?path=/assets/box/octoplus.png`,
      link: `${siteConfig.domain}/Flash-Tool/Octoplus/`
    },
    {
        title: "UMT Dongle",
        img: `${siteConfig.domain}/api/raw/?path=/assets/box/umt.png`,
        link: `${siteConfig.domain}/Flash-Tool/UMT-Dongle/`
    }
]
const [status, setStatus] = useState('');

useEffect(() => {
  const fetchStatus = async () => {
    try {
      const response = await fetch('/api/status');
      const data = await response.json();
      setStatus(data.status);
    } catch (error) {
      console.error(error);
    }
  };

  fetchStatus();
}, []);


  return (    
  <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-black">
  <Seo {...seo} />
  <main className="flex w-full flex-1 flex-col bg-white dark:bg-black">
    <Navbar />
    <div className="mx-auto w-full max-w-6xl p-1">
    <h1 className="my-4 text-center text-4xl font-bold">Still IN Production</h1>
      <h1 className="my-4 text-center text-4xl font-bold">Available Box & Dongle</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-2">
        {links.map((link, index) => (
          <Card
            shadow="none"
            className="border dark:border-gray-700"
            key={index}
            isPressable
            isHoverable
          >
            <CardBody className='p-4 overflow-hidden'>
              <Link href={link.link} passHref>
                <div className="relative h-52 flex items-center justify-center">
                  <Image
                    radius="lg"
                    alt={link.title}
                    className="h-52 object-contain object-center my-10"
                    src={link.img}
                    isBlurred
                  />
                </div>
                <div className="flex items-start justify-center mt-4 -mb-2 font-bold text-xl">
                {link.title}
                </div>
              </Link>
            </CardBody>
          </Card>
        ))}    
      </div>
      <h1 className="mt-6 text-center text-4xl font-bold">Status: {status}</h1>
      <MarkdownPreview file={{ name: 'readme.md' }} path={'Assets/Box'} standalone={false} />
    </div>
  </main>
  <Footer token={token} />
  <input type="hidden" id="connectedAccounts" value={connectedAccounts} />
</div>
)
}

export async function getServerSideProps({locale }) {
  const connectedAccounts = await getOdConcealedAccessTokens();

  const token = await getAccessToken(0);

  return {
          props: {
                  ...(await serverSideTranslations(locale, ['common'])),
                          connectedAccounts,
                          token,
                          
          },
  }
}