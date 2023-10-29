import Link from 'next/link'
import siteConfig from '../config/site.config'
import { SearchBar } from './SearchBar';
import Hover from './UI/Tooltip';
import { FiUpload } from 'react-icons/fi';
import { Image } from '@nextui-org/react';
import { SiGithubsponsors } from 'react-icons/si';
import { CommandMenu } from './Command/CommandMenu';
import { GoSearch } from 'react-icons/go';

const Navbar = () => {
  return (
    <div className="sticky mx-auto w-full justify-between flex top-0 z-30 border-b bg-white bg-opacity-70 dark:bg-opacity-70 backdrop-blur-md dark:border-gray-700 dark:bg-black select-none px-0 md:px-2">
      <div className="my-3 px-2">
            <Link href="/" passHref>
            <Image src={siteConfig.icon} alt={siteConfig.title} width={40} height={40} isBlurred disableSkeleton />
            </Link>
      </div>
      <div className="flex my-3">
      <CommandMenu>
        <div className="flex items-center gap-1 border dark:border-gray-700 p-1.5 rounded-lg">
        <GoSearch  size={20}/>
        <div className="items-center gap-1 hidden md:flex">
        Type
              <div className="rounded-lg px-2 py-1 text-xs font-medium bg-gradient-to-t dark:from-[#0D1117] dark:to-gray-850 overflow-hidden border dark:border-gray-700">/</div>
              to search
        </div>
        </div>
      </CommandMenu> 

      {/* will work on it tomorrow  */}

{/* <div className='border dark:border-gray-700 rounded-md py-2 px-2'>
          <Hover tipChildren="Upload">
            <Link
              href={siteConfig.upload}
              target="_blank"
              aria-label="Upload Files Here"
              className='text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white'>
              <FiUpload className="h-4 w-4" />
            </Link>
          </Hover>
        </div>
        <div className='border dark:border-gray-700 rounded-md py-2 px-2'>
          <Hover tipChildren="Sponsor">
            <Link
              href='/sponsor'
              aria-label="Show Your Love"
              className='text-danger'>
              <SiGithubsponsors className="h-4 w-4" />
            </Link>
          </Hover>
        </div> */}
      </div>
    </div>
  );
}

export default Navbar;
