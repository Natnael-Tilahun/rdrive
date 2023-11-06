import React, { useState } from 'react';
import { Listbox, ListboxItem } from '@nextui-org/react';
import { BsChatSquareDots, BsFillJournalBookmarkFill } from 'react-icons/bs';
import { MdPrivacyTip } from 'react-icons/md';
import { BiUserPin } from 'react-icons/bi';
import siteConfig from '../../config/site.config';
import Popover from '../UI/Popover';
import { GoChevronDown } from 'react-icons/go';

const Legal = () => {
  const [openPopover, setOpenPopover] = useState(false);
  const Icon =" text-default-500 dark:text-white pointer-events-none flex-shrink-0 h-6 w-6";
  return (
    <Popover
        content={
          <Listbox variant="faded" aria-label="Legal Links" key="legal-links" className="w-full">
          <ListboxItem
            key="About US"
            href='/about'
            startContent={<BiUserPin className={Icon} />}
          >
            <p className="dark:text-white">About US</p>
          </ListboxItem>
          <ListboxItem
            key="Privacy Policy"
            href='/policy'
            startContent={<MdPrivacyTip className={Icon} />}
          >
            <p className="dark:text-white">Privacy Policy</p>
          </ListboxItem>
          <ListboxItem
            key="Terms of Service"
            href='/terms' 
            showDivider
            startContent={<BsFillJournalBookmarkFill className={Icon} />}
          >
            <p className="dark:text-white">Terms of Service</p>
          </ListboxItem>
          <ListboxItem
            key="Report & Feedback"
            href={`${siteConfig.telegram}`}
            target='_blank'
            className="text-danger"
            color="danger"
            startContent={<BsChatSquareDots className="text-danger h-6 w-6" />}
          >
            Report & Feedback
          </ListboxItem>
          </Listbox>
        }
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
      >
        <button className="flex items-center gap-1" onClick={() => setOpenPopover(!openPopover)}>
            Legal <GoChevronDown className={`h-4 w-4 transition-transform transform ${openPopover ?"rotate-180" :''}`} />
          </button>
    </Popover>
  );
};

export default Legal;
