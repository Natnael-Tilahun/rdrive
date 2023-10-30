import Link from 'next/link'
import siteConfig from '../config/site.config'
import Hover from './UI/Tooltip';
import { FiUpload } from 'react-icons/fi';
import { Button, Image } from '@nextui-org/react';
import { SiGithubsponsors } from 'react-icons/si';
import { Search } from './Command/Search';

const Navbar = () => {
  return (
    <div className="sticky mx-auto w-full justify-between flex top-0 z-30 border-b bg-white bg-opacity-70 dark:bg-opacity-70 backdrop-blur-md dark:border-gray-700 dark:bg-black select-none px-2">
      <div className="my-2 md:my-3">
            <Link href="/" passHref>
            <Image src={siteConfig.icon} alt={siteConfig.title} width={40} height={40} isBlurred disableSkeleton />
            </Link>
      </div>
      <div className="flex my-2 md:my-3 gap-2">
        <Search />
        <Hover tipChildren="Upload">
        <Button
            isIconOnly
            className="bg-transparent border dark:border-gray-700 overflow-hidden font-sans dark:text-white hover:bg-gray-100 dark:hover:bg-gray-850"
            radius="sm"
        >
            <Link href={siteConfig.upload} target="_blank">
            <FiUpload className="h-4 w-4" />
            </Link>
        </Button>
        </Hover>
        <Hover tipChildren="Sponsor">
        <Button
            isIconOnly
            className="bg-transparent border dark:border-gray-700 overflow-hidden font-sans dark:text-white hover:bg-gray-100 dark:hover:bg-gray-850"
            radius="sm"
            aria-label="Show Your Love"
        >
              <Link href="/sponsor">
              <SiGithubsponsors className="h-4 w-4 text-danger" />
              </Link>
        </Button>
        </Hover>
      </div>
    </div>
  );
}

export default Navbar;
