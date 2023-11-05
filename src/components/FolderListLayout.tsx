import type { OdFolderChildren } from '../types'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { formatDate } from '../utils/fileDetails'
import isHiddenFolder from '../utils/isHiddenFolder'
import { getPreviewType } from '../utils/getPreviewType'
import { getExtension } from '../utils/getFileIcon'
import {incrementDownloadCount,  getDownloadCount} from '../supabase/Downloads'
import Credit from './Cards/Credit'
import FolderCard from './Cards/FolderCard'
import { Permalink } from '../utils/hooks/Permalink'
import FileListItem from './UI/FileListItem'
import Preview from './Previews/Preview'
import Modal from './Previews/Modal'

const FolderListLayout = ({ path, folderChildren }) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<OdFolderChildren | null>(null);
  const getItemPath = (name: string) => `${path === '/' ? '' : path}/${encodeURIComponent(name)}`;
  const visibleFolderChildren = folderChildren.filter((c: OdFolderChildren) => !isHiddenFolder(c));
  const [downloadCounts, setDownloadCounts] = useState<any>({});
  const latestModifiedDate = visibleFolderChildren.reduce((latestDate, c) => {
    const modifiedDate = new Date(c.lastModifiedDateTime);
    return modifiedDate > latestDate ? modifiedDate : latestDate;
  }, new Date(0));

  useEffect(() => {
    if (Object.keys(downloadCounts).length === 0) {
      fetchDownloadCounts(visibleFolderChildren, setDownloadCounts);
    }
  }, [visibleFolderChildren, downloadCounts]);

  return (
    <main>
      <FolderCard date={formatDate(latestModifiedDate)} />
      <div className="overflow-hidden rounded-lg border dark:border-gray-700">
        <Credit path={path} item={t('{{count}} item(s)', { count: visibleFolderChildren.length })} />
        {visibleFolderChildren.map((c: OdFolderChildren) => {
          const { isSelected, itemRef } = Permalink(c.name);
          return (
            <div ref={itemRef} key={c.id} className={`border-t dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-850 ${isSelected ? 'bg-yellow-50 dark:bg-yellow-100 dark:bg-opacity-50' : ''}`}>
              {getPreviewType(getExtension(c.name), { video: Boolean(c.video) }) ? (
                <div onClick={() => {setSelectedItem(c);  setShowModal(true);}} >
                  <FileListItem fileContent={c} downloadCount={downloadCounts[c.id] || 0} />
                </div>
              ) : !c.folder ? (
                <Link
                  href={`/api/raw/?path=${getItemPath(c.name)}`}
                  target="_blank"
                  onClick={async () => {
                    await incrementDownloadCount(c.id);
                    setDownloadCounts((counts) => ({
                      ...counts,
                      [c.id]: (counts[c.id] || 0) + 1,
                    }));
                  }}
                >
                  <FileListItem fileContent={c} downloadCount={downloadCounts[c.id] || 0} />
                </Link>
              ) : (
                <Link href={`${path === '/' ? '' : path}/${encodeURIComponent(c.name)}`} passHref>
                  <FileListItem fileContent={c} downloadCount={downloadCounts[c.id] || 0} />
                </Link>
              )}
            </div>
          );
        })}
        {showModal && selectedItem && (
          <Modal showModal={showModal} setShowModal={setShowModal}>
            <Preview file={selectedItem} path={getItemPath(selectedItem.name)} />
          </Modal>
        )}
      </div>
    </main>
  );
};

export default FolderListLayout;

async function fetchDownloadCounts(visibleFolderChildren, setDownloadCounts) {
  const counts = {};
  for (const c of visibleFolderChildren) {
  counts[c.id] = await getDownloadCount(c.id);
  }
  setDownloadCounts(counts);
  }