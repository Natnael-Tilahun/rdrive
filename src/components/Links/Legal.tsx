import React, { useState } from 'react';
import { Listbox, ListboxItem, cn } from '@nextui-org/react';
import { BsChatSquareDots, BsFillJournalBookmarkFill } from 'react-icons/bs';
import { MdPrivacyTip } from 'react-icons/md';
import { BiUserPin } from 'react-icons/bi';
import siteConfig from '../../config/site.config';
import Link from 'next/link';
import LinkPopover from '../UI/LinkPopover';

const Legal = () => {
  const Icon = "text-lg md:text-base text-default-500 dark:text-white pointer-events-none flex-shrink-0 h-6 w-6";
  return (
    <LinkPopover
     open="Legal"
      content={ 
      <Listbox variant="faded" aria-label="Legal Links" key="legal-links">
        <ListboxItem
          key="About US"
          startContent={<BiUserPin className={Icon} />}
        >
          <Link href='/about' className="dark:text-white text-lg md:text-base">About US</Link>
        </ListboxItem>
        <ListboxItem
          key="Privacy Policy"
          startContent={<MdPrivacyTip className={Icon} />}
        >
          <Link href='/privacy-policy' className="dark:text-white text-lg md:text-base">Privacy Policy</Link>
        </ListboxItem>
        <ListboxItem
          key="Terms of Service"
          showDivider
          startContent={<BsFillJournalBookmarkFill className={Icon} />}
        >
          <Link href='/terms' className="dark:text-white text-lg md:text-base">Terms of Service</Link>
        </ListboxItem>
        <ListboxItem
          key="Report & Feedback"
          className="text-danger"
          color="danger"
          startContent={<BsChatSquareDots className="text-xl text-danger h-6 w-6" />}
        >
          <Link href={`${siteConfig.telegram}`} target="_blank" className="text-lg md:text-base">Report & Feedback</Link>
        </ListboxItem>
        </Listbox>
      }
    />
  );
};

export default Legal;
