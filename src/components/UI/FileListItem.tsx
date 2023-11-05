import { ChildIcon, ChildName } from '../FileListing'
import { humanFileSize, formatDate } from '../../utils/fileDetails'
import type { OdFolderChildren } from '../../types'
import { RiDownloadLine } from 'react-icons/ri'
import { FC } from 'react'

const FileListItem: FC<{ fileContent: OdFolderChildren; downloadCount: number }> = ({ fileContent: c, downloadCount }) => {  
    return (  
        <div className={`md:grid grid-cols-11 flex md:flex-row items-center space-x-2 justify-between py-2.5 mx-2`}>
            <div className="col-span-12 flex items-center space-x-2 md:col-span-6 line-clamp-3 ml-0 md:ml-2">
                <div className="w-5 flex-shrink-0 text-center">
                  <ChildIcon child={c} />
                </div>
                <ChildName name={c.name.replaceAll('-', ' ').replaceAll('_', ' ')} folder={Boolean(c.folder)} />
            </div>
            <div className="col-span-3 text-center text-sm tracking-widest md:block hidden">
                {formatDate(c.lastModifiedDateTime)}
            </div>
            <div className="text-center tracking-widest text-sm md:block hidden">
                {humanFileSize(c.size)}
            </div>
            <div className="text-center tracking-widest md:block">
            {c.folder ? (
              ''
              ) : ( 
                <div className="flex justify-center items-center space-x-1 cursor-pointer">
                  <span>{downloadCount}</span>
                  <RiDownloadLine />
                </div>       
              )}
            </div>
        </div>
    )
  }
  export default FileListItem;