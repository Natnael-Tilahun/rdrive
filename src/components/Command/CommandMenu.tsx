import axios from 'axios'
import useSWR from 'swr'
import { useState } from 'react'
import AwesomeDebouncePromise from 'awesome-debounce-promise'
import { useAsync } from 'react-async-hook'
import useConstant from 'use-constant'
import { useTranslation } from 'next-i18next'

import Link from 'next/link'
import { Button, Input } from '@nextui-org/react'
import siteConfig from '../../config/site.config'
import { OdDriveItem, OdSearchResult } from '../../types'
import { getConnectedAccounts } from '../../utils/getConnectedAccounts'
import Modal from './Model'
import { fetcher } from '../../utils/fetchWithSWR'
import isHiddenFolder from '../../utils/isHiddenFolder'
import { SearchSkeleton } from '../Skeleton'
import { GoSearch } from 'react-icons/go'
import { formatDate, humanFileSize } from '../../utils/fileDetails'
import { useHotkeys } from 'react-hotkeys-hook'
import useDeviceOS from '../../utils/useDeviceOS'
import { getFileIcon } from '../../utils/getFileIcon'
import { FaFolder } from 'react-icons/fa'
import { CommandList } from './CommandList'

function mapAbsolutePath(path: string): string {
  const absolutePath = path.split(siteConfig.baseDirectory === '/' ? 'root:' : siteConfig.baseDirectory)
  return absolutePath.length > 1
    ? absolutePath[1]
        .split('/')
        .map(p => encodeURIComponent(decodeURIComponent(p)))
        .join('/')
    : ''
}

function useDriveItemSearch() {
  const [query, setQuery] = useState('')
  const searchDriveItem = async (q: string) => {
    const { data } = await axios.get<OdSearchResult>(`/api/search/?q=${q}`, {
      headers: {
        'x-connected-accounts': getConnectedAccounts()
      }
    })

    data.map(item => {
      item['path'] =
        'path' in item.parentReference
          ?
            `${mapAbsolutePath(item.parentReference.path)}/${encodeURIComponent(item.name)}`
          : 
            ''
    })

    return data
  }

  const debouncedDriveItemSearch = useConstant(() => AwesomeDebouncePromise(searchDriveItem, 1000))
  const results = useAsync(async () => {
    if (query.length === 0) {
      return []
    } else {
      return debouncedDriveItemSearch(query)
    }
  }, [query])

  return {
    query,
    setQuery,
    results,
  }
}

function SearchResultItemTemplate({
  driveItem,
  driveItemPath,
  disabled,
}: {
  driveItem: OdSearchResult[number]
  driveItemPath: string
  itemDescription: string
  disabled: boolean
}) {
  const isFile = !!driveItem.file;
  const FileIcon = isFile ? getFileIcon(driveItem.name) : FaFolder;
  const hasExtension = () => {
    const fileName = driveItem.name;
    return fileName.includes('.') && !fileName.endsWith('/');
  };
  const FileUrl = () => {
    const urlParts = driveItemPath.split('/');
    const fileName = urlParts[urlParts.length - 1];
    if (hasExtension()) {
      return driveItemPath.replace(fileName, `#${fileName}`);
    } else {
      return driveItemPath;
    }
  };

  return (
    <Link href={FileUrl()} passHref
        className={`flex items-center space-x-4 border-b border-gray-400/30 px-4 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-850 ${
          disabled ? 'pointer-events-none cursor-not-allowed' : 'cursor-pointer'
        }`}>
          <div className="w-5 flex-shrink-0 text-center"><FileIcon className='w-5 h-5'/></div>
        <div>
          <div className="text-sm font-medium leading-8 line-clamp-1">{driveItem.name}</div>
          <div className="font-mono text-xs opacity-60 space-x-2" >
                    {driveItem.size > 0 && (
                  <>
                    <span>{humanFileSize(driveItem.size)}</span>
                    <span>|</span>
                  </>
                )}
                  <span>{formatDate(driveItem.lastModifiedDateTime)}</span>
          </div>
        </div>
    </Link>
  )
}

function SearchResultItemLoadRemote({ result }: { result: OdSearchResult[number] }) {
  const { data, error } = useSWR<OdDriveItem, { status: number; message: any }>(
    [`/api/item/?id=${result.id}&tokenId=${result.tokenId}`],
    fetcher
  );
  
  const { t } = useTranslation()

  if (error) {
    return (
      <SearchResultItemTemplate
        driveItem={result}
        driveItemPath={''}
        itemDescription={typeof error.message?.error === 'string' ? error.message.error : JSON.stringify(error.message)}
        disabled={true}
      />
    )
  }
  if (!data) {
    return (
      <SearchResultItemTemplate
        driveItem={result}
        driveItemPath={''}
        itemDescription={t('Loading ...')}
        disabled={true}
      />
    )
  }

  const driveItemPath = `${mapAbsolutePath(data.parentReference.path)}/${encodeURIComponent(data.name)}`
  return (
    <SearchResultItemTemplate
      driveItem={result}
      driveItemPath={driveItemPath}
      itemDescription={decodeURIComponent(driveItemPath)}
      disabled={false}
    />
  )
}

function SearchResultItem({ result }: { result: OdSearchResult[number] }) {
  if (result.path === '') {
    return <SearchResultItemLoadRemote result={result} />
  } else {
    const driveItemPath = decodeURIComponent(result.path)
    return (
      <SearchResultItemTemplate
        driveItem={result}
        driveItemPath={result.path}
        itemDescription={driveItemPath}
        disabled={false}
      />
    )
  }
}

export function CommandMenu() {
  const { query, setQuery, results } = useDriveItemSearch()
  const { t } = useTranslation()
  const [showModal, setShowModal] = useState(false);
  const os = useDeviceOS()
  const openCommandMenu = () => setShowModal(true)
  const closeModal = () => setShowModal(false);

  useHotkeys(`${os === 'mac' ? 'cmd' : 'ctrl'}+k`, e => {
    openCommandMenu();
    e.preventDefault();
  });
  
  useHotkeys('/', e => {
    openCommandMenu();
    e.preventDefault();
  });


  return (
    <>
    <Button
      className="bg-transparent border-none overflow-hiddendark:text-white"
      radius="full"
      onClick={openCommandMenu}
      onPress={() => setShowModal(true)}
    >
      Command Menu 
      <div className="flex gap-1.5">
      <div className="rounded-lg px-2 py-1 text-xs font-medium bg-gradient-to-t dark:from-[#0D1117] dark:to-gray-850 overflow-hidden border dark:border-gray-700">{os === 'mac' ? '⌘' : 'Ctrl'}</div>
      <div className="rounded-lg px-2 py-1 text-xs font-medium bg-gradient-to-t dark:from-[#0D1117] dark:to-gray-850 overflow-hidden border dark:border-gray-700">K</div>
      </div>
    </Button>
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <main>
      <Input
          classNames={{base: "bg-transparent", innerWrapper: "px-2", inputWrapper: "border-default-300 hover:border-default-300 border-b after:bg-default-300 after:h-[1px]"}}
          variant='underlined'
          type="search"
          placeholder={t('Search ...')}
          value={query}
          onChange={e => setQuery(e.target.value)}
          startContent={<GoSearch  />}
          radius="none"
          size="lg"
          autoFocus
        />
      <div className="max-h-[70vh] md:max-h-[40vh] overflow-x-hidden overflow-y-scroll search-scrollbar" onClick={closeModal}>
                  {results.loading && (
                    <SearchSkeleton />
                  )}
                  {results.error && (
                    <div className="px-4 py-12 text-center text-sm font-medium">
                      {t('Error: {{message}}', { message: results.error.message })}
                    </div>
                  )}
                  {results.result && (
                    <>
                    {results.result.length === 0 ? (
                    <>
                    <CommandList />
                    </>
                      ) : (
                        results.result.filter(result => !isHiddenFolder(result))
                          .map(result =><SearchResultItem key={result.id} result={result} />)
                      )}
                    </>
                  )}
                  <div className="hidden md:block h-12 bg-transparent"></div>
      </div>
      </main>
      </Modal>
      </>
  )
}