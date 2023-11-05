import type { OdFileObject } from '../../types'

import { FC, useEffect } from 'react'

import axios from 'axios'
import Plyr from 'plyr-react'
import { useAsync } from 'react-async-hook'

import { getExtension } from '../../utils/getFileIcon'
import FourOhFour from '../FourOhFour'
import Loading from '../Loading'

import 'plyr-react/plyr.css'


const VideoPlayer: FC<{
  videoName: string
  videoUrl: string
  width?: number
  height?: number
  thumbnail: string
  isFlv: boolean
  mpegts: any
}> = ({ videoName, videoUrl, width, height, thumbnail, isFlv, mpegts }) => {
  useEffect(() => {
    axios
    if (isFlv) {
      const loadFlv = () => {
        const video = document.getElementById('plyr')
        const flv = mpegts.createPlayer({ url: videoUrl, type: 'flv' })
        flv.attachMediaElement(video)
        flv.load()
      }
      loadFlv()
    }
  }, [videoUrl, isFlv, mpegts])

  const plyrSource = {
    type: 'video',
    title: videoName,
    poster: thumbnail,
    tracks: [{ kind: 'captions', label: videoName, src: '', default: true }],
  }
  const plyrOptions: Plyr.Options = {
    ratio: `${width ?? 16}:${height ?? 9}`,
    fullscreen: { iosNative: true },
  }
  if (!isFlv) {
    plyrSource['sources'] = [{ src: videoUrl }]
  }
  return <Plyr id="plyr" source={plyrSource as Plyr.SourceInfo} options={plyrOptions} />
}

const VideoPreview: FC<{ file: OdFileObject, path }> = ({ file, path }) => {
  const isFlv = getExtension(file.name) === 'flv'
  const {
    loading,
    error,
    result: mpegts,
  } = useAsync(async () => {
    if (isFlv) {
      return (await import('mpegts.js')).default
    }
  }, [isFlv])

  return (
      <main className="p-4 md:p-8 space-y-6">
            {error ? (
              <FourOhFour errorMsg={error.message} />
            ) : loading && isFlv ? (
              <Loading />
            ) : (
              <VideoPlayer
                videoName={file.name}
                videoUrl={`/api/raw/?path=${path}`}
                width={file.video?.width}
                height={file.video?.height}
                thumbnail={`/api/thumbnail/?path=${path}`}
                isFlv={isFlv}
                mpegts={mpegts}
              />
            )}
        <h1 className="text-xl md:text-2xl text-center font-semibold line-clamp-1">{file.name}</h1>
      </main>
  )
}

export default VideoPreview
