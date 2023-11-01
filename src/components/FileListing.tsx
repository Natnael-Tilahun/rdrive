import { OdFileObject, OdFolderChildren, OdFolderObject } from '../types'
import { DriveItemType } from "../types/DriveItemType"
import { ParsedUrlQuery } from 'querystring'
import { FC, Fragment, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import useLocalStorage from '../utils/useLocalStorage'
import { getPreviewType, preview } from '../utils/getPreviewType'
import { useProtectedSWRInfinite } from '../utils/fetchWithSWR'
import { getExtension, getRawExtension, getFileIcon } from '../utils/getFileIcon'
import { layouts } from './SwitchLayout'
import FourOhFour from './FourOhFour'
import Auth from './Auth'
import MarkdownPreview from './previews/MarkdownPreview'
import AudioPreview from './previews/AudioPreview'
import VideoPreview from './previews/VideoPreview'
import PDFPreview from './previews/PDFPreview'
import ImagePreview from './previews/ImagePreview'
import { PreviewContainer } from './previews/Containers'
import FolderListLayout from './FolderListLayout'
import FolderGridLayout from './FolderGridLayout'
import Loading, { LoadingIcon } from './Loading'
import { FaChevronCircleDown, FaFolder } from 'react-icons/fa'
import { Image } from '@nextui-org/react'
import Modal from './UI/Model';

/**
 * Convert url query into path string
 *
 * @param query Url query property
 * @returns Path string
 */
const queryToPath = (query?: ParsedUrlQuery) => {
  if (query) {
    const { path } = query
    if (!path) return '/'
    if (typeof path === 'string') return `/${encodeURIComponent(path)}`
    return `/${path.map(p => encodeURIComponent(p)).join('/')}`
  }
  return '/'
}

export const ChildName: FC<{ name: string; folder?: boolean }> = ({ name, folder }) => {
  const original = name;
  const extension = folder ? '' : getRawExtension(original);
  const prename = folder ? original : original.substring(0, original.length - extension.length);

  return (
    <span className="truncate before:float-right before:content-[attr(data-tail)]" data-tail={extension}>
      {prename}
    </span>
  );
};

export const ChildIcon: FC<{ child: OdFolderChildren }> = ({ child }) => {
  const isFile = 'file' in child;
  const isFolder = 'folder' in child;

  if (isFolder) {
    return <FaFolder />;
  }

  if (isFile) {
    const FileIcon = getFileIcon(child.name, { video: Boolean(child.video) });
    return <FileIcon className='w-5 h-5'/>;
  }
  
};

const FilePreviewItem: FC<{file: OdFolderChildren}> = ({file}) => {
  const previewType = getPreviewType(getExtension(file.name), { video: Boolean(file.video) })
  let c = file as OdFileObject
  if (previewType) {
    switch (previewType) {
      case preview.image:
        return <ImagePreview file={c} />
      case preview.markdown:
        return <MarkdownPreview file={c} path={""} />
      case preview.video:
        return <VideoPreview file={c} />
      case preview.audio:
        return <AudioPreview file={c} />
      case preview.pdf:
        return <PDFPreview file={c} />
    }
  } 
}



const FileListing: FC<{ query?: ParsedUrlQuery, token?: string }> = ({ query }) => {
  const router = useRouter()
  const [layout, _] = useLocalStorage('preferredLayout', layouts[1])
  
  const [modalVal, setModalVal] = useState({showModal: false, file: null})
  const setModalDisp = () => { setModalVal({...modalVal, showModal: !modalVal.showModal}) }

  const { t } = useTranslation()
  const path = queryToPath(query)
  const { data, error, size, setSize } = useProtectedSWRInfinite(path)
  if (error) {
    // If error includes 403 which means the user has not completed initial setup, redirect to OAuth page
    if (error.status === 403) {
      router.push('/add-drive/step-1')
      return <div />
    }

    if (error.status === 404) {
      router.push('/notfound')
      return <div />
    }

    return (
      <PreviewContainer>
        {error.status === 401 ? <Auth redirect={path} /> : <FourOhFour errorMsg='' />}
      </PreviewContainer>
    )
  }
  if (!data) {
    return (
      <Loading  />
  )
  } 

  const responses: any[] = data ? [].concat(...data) : []
// console.log(responses)
  const isLoadingInitialData = !data && !error
  const isLoadingMore = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd = isEmpty || (data && typeof data[data.length - 1]?.next === 'undefined')
  const onlyOnePage = data && typeof data[0].next === 'undefined'
  const fileSystemEntries = () => {
    const fileSystemEntryTypes : number[] = []; // will contain 0s and 1s. 0 = folder, 1 = file
    return {
      addEntry: (driveItem: any) => {
        const itemType = 'file' in driveItem ? DriveItemType.File : DriveItemType.Folder;
        fileSystemEntryTypes.push(itemType);
      },
      get hasFoldersOnly() {
        return fileSystemEntryTypes.every(_itemType => _itemType === DriveItemType.Folder)
      }
    }
  }

  if ('folder' in responses[0]) {
    const entries = fileSystemEntries();

    // Expand list of API returns into flattened file data
    let folderChildren = [].concat(...responses.map(r => r.folder.value)) as OdFolderObject['value']
    // Omit icon file from file listing and sort A-Z
    folderChildren = folderChildren.filter((child: OdFolderChildren) => !/icon\./i.test(child.name))
  .sort((child: OdFolderChildren, nextChild: OdFolderChildren) => {
    entries.addEntry(child);
    const A = child.name.toLowerCase();
    const Z = nextChild.name.toLowerCase();
    if (A < Z ) {
      return 1;
    }
    if (A > Z) {
      return 1;
    }
    return 0;
  });


    if(folderChildren.length == 1){
      entries.addEntry(folderChildren[0]);
    }

    // Find README.md file to render
    const readmeFile = folderChildren.find(c => c.name.toLowerCase() === 'readme.md')
    // Folder layout component props
    const folderProps = {
      toast,
      path,
      folderChildren,
      setModalVal
    }
    // console.log(folderProps)
    console.log(folderChildren)
    return (
      <>
        <Toaster />
        {folderChildren && folderChildren.length > 0 ? (
          <>
            {layout.name === 'Grid' && entries.hasFoldersOnly ? (
              <FolderGridLayout {...folderProps} />
            ) : (
              <Fragment>
                <FolderListLayout {...folderProps} />
                <Modal showModal={modalVal.showModal} setShowModal={setModalDisp}>
                <div className="flex flex-col items-center w-full mx-auto gap-3 my-2">
                  <FilePreviewItem file={modalVal.file as OdFileObject}/>
                </div>
              </Modal>
            </Fragment>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Image src="/icons/ghost/400.png" className='my-5' height={300} width={300} alt="folder is empty" isBlurred disableSkeleton />
            <h1 className='text-3xl text-gray-500'>folder is empty</h1>
          </div>

        )}
        {!onlyOnePage && (
          <div className="bg-white dark:bg-black dark:text-gray-100 p-4">
            <button
              className={`flex w-full items-center justify-center space-x-2 p-2 disabled:cursor-not-allowed border dark:border-gray-700 rounded-lg ${
                isLoadingMore || isReachingEnd ? 'opacity-60' : 'hover:bg-gray-100 dark:hover:bg-gray-850'
              }`}
              onClick={() => setSize(size + 1)}
              disabled={isLoadingMore || isReachingEnd}
            >
              {isLoadingMore ? (
                <>
                  <LoadingIcon />
                  <span>{t('Loading ...')}</span>{' '}
                </>
              ) : isReachingEnd ? (
                <span>{t('No more files')}</span>
              ) : (
                <>
                  <span>{t('Load more')}</span>
                  <FaChevronCircleDown />
                </>
              )}
            </button>
          </div>
        )}

        {readmeFile && (
          <div className="mt-4">
            <MarkdownPreview file={readmeFile} path={path} standalone={false} />
          </div>
        )}
      </>
      
    )
  }

  if ('file' in responses[0] && responses.length === 1) {
    const file = responses[0].file as OdFileObject
    // console.log(file)
    const previewType = getPreviewType(getExtension(file.name), { video: Boolean(file.video) })

    if (previewType) {
      switch (previewType) {
        case preview.image:
          return <ImagePreview file={file} />

        case preview.markdown:
          return <MarkdownPreview file={file} path={path} />

        case preview.video:
          return <VideoPreview file={file} />

        case preview.audio:
          return <AudioPreview file={file} />

        case preview.pdf:
          return <PDFPreview file={file} />

      }
    } 
  }
}

export default FileListing;