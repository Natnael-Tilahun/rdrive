import { FC } from 'react'
import { getPreviewType, preview } from '../../utils/getPreviewType'
import { getExtension } from '../../utils/getFileIcon'
import type { OdFolderChildren, OdFileObject } from '../../types'
import MarkdownPreview from './previews/Markdown'
import AudioPreview from './previews/Audio'
import VideoPreview from './previews/Video'
import PDFPreview from './previews/PDF'
import ImagePreview from './previews/Image'

const FilePreview: FC<{file: OdFolderChildren, path}> = ({file, path}) => {
    const previewType = getPreviewType(getExtension(file.name), { video: Boolean(file.video) })
    let c = file as OdFileObject
    if (previewType) {
      switch (previewType) {
        case preview.image:
          return <ImagePreview file={c} path={path} />
        case preview.markdown:
          return <MarkdownPreview file={c} path={path} />
        case preview.video:
          return <VideoPreview file={c} path={path}/>
        case preview.audio:
          return <AudioPreview file={c} path={path}/>
        case preview.pdf:
          return <PDFPreview file={c} path={path}/>
      }
    } 
  }

export default FilePreview;