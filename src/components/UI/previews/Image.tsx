import type { OdFileObject } from '../../../types'
import { FC } from 'react'
import { Image } from '@nextui-org/react'

const ImagePreview: FC<{ file: OdFileObject, path }> = ({ file, path }) => {

  return (
    <main className="p-2 md:p-4 space-y-6 max-h-[80vh]">
        <Image
          className="mx-auto rounded-lg"
          src={`/api/raw/?path=${path}`}
          alt={file.name}
          width={file.image?.width}
          height={file.image?.height}
          isBlurred
        />
        <h1 className="text-xl md:text-2xl text-center font-semibold line-clamp-1">{file.name}</h1>
    </main>
  )
}

export default ImagePreview