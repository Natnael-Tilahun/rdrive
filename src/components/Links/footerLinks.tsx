import React from 'react';
import Legal from './Legal';
import siteConfig from '../../config/site.config';
import Hover from '../UI/Tooltip';
import UnstyledLink from '../UI/UnstyledLink';
import Storage from '../Storage';

const FooterLinks = () => {
  const footerLinks: { href: string; text: string; tooltip: React.ReactNode }[] = [
    {
      href: '/FRP',
      text: 'FRP',
      tooltip: 'FRP Bypass Files & Tool',
    },
    {
      href: '/Drivers',
      text: 'Drivers',
      tooltip: 'Android USB Flashing Driver',
    },
    {
      href: '/Flash-Tool',
      text: 'Flash Tool',
      tooltip: 'Mobile Flashing Tools',
    },
    {
      href: '/iCloud',
      text: 'iCloud Bypass',
      tooltip: 'Say goodbye to iCloud locks: Unlock now.',
    },
    {
      href: '/service-center-price-list',
      text: 'Parts Price List',
      tooltip: 'All Brand Parts Service Center Price List',
    },
    {
      href: `/sponsor`,
      text: 'Sponsor',
      tooltip: 'Show Your Love',
    },
    // {
    //   href: `https://status.rdrive.org/`,
    //   text: 'Status',
    //   tooltip: 'APIs Status Check',
    // },

    {
      href: `${siteConfig.domain}/sitemap.xml`,
      text: 'Sitemap',
      tooltip: 'Sitemap Index URL',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:flex flex-wrap gap-3 md:gap-4 lg:gap-12 xl:gap-14 items-center text-sm cursor-default">
      {footerLinks.map(({ href, text, tooltip }, index) => (
        <React.Fragment key={href}>
          {index === footerLinks.length - 1 && <>{/*<Storage  />*/} <Legal /></>}
          <Hover tipChildren={tooltip}>
          <div>
            <UnstyledLink
              href={href}
              className="animated-underline focus:outline-none focus-visible:ring focus-visible:ring-primary-300"
            >
              {text}
            </UnstyledLink>
          </div>
          </Hover>
        </React.Fragment>
      ))}
    </div>
  );
};

export default FooterLinks;
