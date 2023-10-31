import Link from 'next/link';
import React from 'react';
import { BsFillUnlockFill, BsUsbSymbol, BsApple } from 'react-icons/bs';
import { FaRupeeSign } from 'react-icons/fa';
import { MdPhonelinkSetup } from 'react-icons/md';
import { SiGithubsponsors } from 'react-icons/si';
import { TbApps, TbDeviceGamepad2 } from 'react-icons/tb';

export function CommandList() {
  const size = 'w-5 h-5'
  const links = [
    {
      href: '/Apps',
      title: 'Apps',
      description: 'Download apps for Android, MacOS, Windows, and Linux',
      icon: <TbApps className={size} />,
    },
    {
      href: '/Games',
      title: 'Games',
      description: 'Download games for Android, MacOS, Windows, and Linux',
      icon: <TbDeviceGamepad2 className={size}/>,
    },
    {
      href: '/FRP',
      title: 'FRP Bypass Tools',
      description: 'Get FRP Bypass files and tools for your device',
      icon: <BsFillUnlockFill className={size}/>,
    },
    {
      href: '/Drivers',
      title: 'USB Drivers',
      description: 'Download Android USB flashing drivers',
      icon: <BsUsbSymbol className={size}/>,
    },
    {
      href: '/Flash-Tool',
      title: 'Flashing Tools',
      description: 'Tools for flashing mobile devices',
      icon: <MdPhonelinkSetup className={size}/>,
    },
    {
      href: '/iCloud',
      title: 'iCloud Bypass Solutions',
      description: 'Say goodbye to iCloud locks: Unlock now.',
      icon: <BsApple className={size}/>,
    },
    {
      href: '/service-center-price-list',
      title: 'Parts Price List',
      description: 'View the price list for parts at our service center',
      icon: <FaRupeeSign className={size}/>,
    },
    {
      href: '/sponsor',
      title: 'Become a Sponsor',
      description: 'Show your support and sponsor us',
      icon: <SiGithubsponsors className={size}/>,
    },
  ];

  return (
    <div>
      {links.map((link, index) => (
        <Link href={link.href} passHref key={index} className="flex items-center space-x-4 border-b border-gray-400/30 px-4 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-850">
            {link.icon}
            <div>
              <div className="text-sm font-medium leading-8 line-clamp-1">{link.title}</div>
              <div className="font-mono text-xs opacity-60 line-clamp-1">{link.description}</div>
            </div>
        </Link>
      ))}
    </div>
  );
}
