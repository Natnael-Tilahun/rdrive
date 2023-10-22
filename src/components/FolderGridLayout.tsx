import React, { useEffect, useState } from 'react';
import Link from "next/link";
import siteConfig from "../config/site.config";
import isHiddenFolder from '../utils/isHiddenFolder';
import { OdFolderChildren } from "../types";
import {ChildName } from "./FileListing";
import { Button, Card, CardBody, Chip, Divider, Image, Skeleton } from '@nextui-org/react';
import { fetchHeartCounts, incrementHeartCount } from '../supabase/Heart';
import { HeartFilledIcon } from './icons';
import { formatNumber, humanFileSize } from '../utils/fileDetails';
import { useTranslation } from 'react-i18next';

const FolderGridLayout = ({ path, folderChildren }: { path: string, folderChildren: OdFolderChildren[] }) => {
  const getItemPath = (name: string) => `${path === '/' ? '' : path}/${encodeURIComponent(name)}`;
  const visibleFolderChildren = folderChildren.filter((child) => !isHiddenFolder(child) && !isHiddenFolder(child.folder));
  const [heartCounts, setHeartCounts] = useState({});
  const [isLoaded, setIsLoaded] = React.useState(false);
  const { t } = useTranslation()

  useEffect(() => {
    if (Object.keys(heartCounts).length === 0) {
      fetchHeartCounts(visibleFolderChildren)
        .then(counts => {
          setHeartCounts(counts);
          setIsLoaded(true);
        });
    }
  }, [visibleFolderChildren, heartCounts]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {visibleFolderChildren.map((child, index) => (
        <Card className="border dark:border-gray-700" key={child.id + index} isPressable isHoverable shadow='none' isBlurred>
          <CardBody className='p-1 overflow-hidden'>
          <div className='absolute top-0 right-0 z-20 m-1 opacity-0 transition-all duration-100 group-hover:opacity-100'>
            <Skeleton isLoaded={isLoaded} className="rounded-full">
            <Button
                  onClick={async () => {
                    await incrementHeartCount(child.id);
                    setHeartCounts((counts) => ({
                      ...counts,
                      [child.id]: (counts[child.id] || 0) + 1,
                    }));
                  }}
                  className="bg-white bg-opacity-70 dark:bg-opacity-50 backdrop-blur-md border dark:border-gray-700 overflow-hidden dark:bg-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-850 items-center -space-x-1 -p-2"
                  startContent={<HeartFilledIcon className='h-5 w-5 text-danger'/>}
                  size='sm'
                  radius='full'
                >
                  <h1>{formatNumber(heartCounts[child.id] || 0)}</h1>
                </Button>
            </Skeleton>
          </div>           
            <Link href={getItemPath(child.name)} passHref>
              <div className="text-black dark:text-white p-4">
                <div className="relative h-36 md:h-44 flex items-center justify-center">
                  <Image
                    className="h-36 md:h-40 object-contain object-center my-10"
                    src={child.thumbnailUrl || siteConfig.noimage}
                    alt={child.name}
                    isBlurred
                    loading='lazy'
                    disableSkeleton
                  />                 
                </div>
                <div className="flex items-start justify-center space-x-2">
                    <ChildName name={child.name.replaceAll('-', ' ').replaceAll('_', ' ')} folder={Boolean(child.folder)} />
                </div>
              </div>
            </Link>
            <Divider className='dark:bg-gray-700' />
            <div className="flex items-center justify-evenly mt-1.5 mb-0.5 cursor-default text-center text-sm">
              {/*still bug on folder child count*/}
              {t('{{count}} item(s)', { count: child.folder?.childCount ? child.folder.childCount - 1 : 0 })}
              <Divider orientation="vertical" className='dark:bg-gray-700' />
              {humanFileSize(child.size)}
            </div>
          </CardBody> 
        </Card>
      ))}
    </div>
  );
}

export default FolderGridLayout;
