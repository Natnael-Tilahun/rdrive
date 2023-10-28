import siteConfig from '../config/site.config';
import { FiShare } from 'react-icons/fi';
import { RiShareFill } from 'react-icons/ri';
import { GoReport } from 'react-icons/go';
import { useClipboard } from 'use-clipboard-copy';
import { getBaseUrl } from '../utils/getBaseUrl';
import { useRouter } from 'next/router';
import { Button, Image } from '@nextui-org/react';
import { useState } from 'react';
import Modal from './UI/Model';

export default function Share() {
  const { query, asPath } = useRouter();
  const clipboard = useClipboard();
  const hasFileExtension = /\.[^]+$/.test(asPath);
  const URL = `/api/og/?path=${hasFileExtension ? `${asPath}/` : `${asPath}`}`;
  const title = (query.path && Array.isArray(query.path) ? query.path[query.path.length - 1] : '').replaceAll('-', ' ').replaceAll('_', ' ');
  const [showModal, setShowModal] = useState(false);

  const copyLinkToClipboard = () => {
    clipboard.copy(`${getBaseUrl()}${asPath}`);
  };

  const reportOnTelegram = () => {
    const customUrl = `${siteConfig.telegram}`;
    const currentUrl = `${getBaseUrl()}${asPath}`;
    navigator.clipboard.writeText(currentUrl).then(() => {
      window.open(customUrl, '_blank');
    });
  };

  const shareCurrentUrl = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ url: window.location.href });
      } else {
        throw new Error('Web Share API not supported');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <main>
      <Button
        isIconOnly
        className="bg-white bg-opacity-70 dark:bg-opacity-50 backdrop-blur-md border dark:border-gray-700 overflow-hidden dark:bg-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-850"
        radius="full"
        onPress={() => setShowModal(true)}
      >
        <FiShare size={18} />
      </Button>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <div className="flex flex-col items-center w-full mx-auto gap-3">
          <h1 className="text-xl font-semibold pr-3 line-clamp-1">Share {title}</h1>
          <Image src={URL} alt={title} width={1280} height={640} className="rounded-md" />
          <div className="flex w-full h-full items-center justify-between gap-2">
            <Button
              className="w-full bg-indigo-500 text-white hover:bg-indigo-600"
              onPress={shareCurrentUrl}
            >
              <div className="flex items-center justify-center w-8 h-8">
                <RiShareFill size={22} />
              </div>
              <div>Share</div>
            </Button>
            <Button
              className="w-full bg-red-600 text-white hover:bg-red-700"
              onPress={reportOnTelegram}
            >
              <div className="flex items-center justify-center w-8 h-8">
                <GoReport size={22} />
              </div>
              <div>Report Link</div>
            </Button>
          </div>
        </div>
      </Modal>
    </main>
  );
}
