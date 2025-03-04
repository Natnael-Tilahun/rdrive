import type { OdFileObject } from '../../../types'
import { FC, useEffect, useRef } from 'react'

import ReactAudioPlayer from 'react-audio-player'
import { useTranslation } from 'next-i18next'
import { FcMusic } from 'react-icons/fc'
import { LoadingIcon } from '../../Loading'
import { formatDate } from '../../../utils/fileDetails'
import { useAppDispatch, useAppSelector, RootState } from '../../../redux/store';
import { setPlayerStatus, setPlayerVolume, setBrokenThumbnail } from '../../../redux/features/audioPreviewSlice';
import { Image } from '@nextui-org/react'

enum PlayerState {
  Loading,
  Ready,
  Playing,
  Paused,
}

const AudioPreview: FC<{ file: OdFileObject, path }> = ({ file, path }) => {
  const dispatch = useAppDispatch();
  const playerStatus = useAppSelector((state:RootState) => state.audioPreview.playerStatus);
  const playerVolume = useAppSelector((state:RootState) => state.audioPreview.playerVolume);
  const brokenThumbnail = useAppSelector((state:RootState) => state.audioPreview.brokenThumbnail);
  const { t } = useTranslation()
  const rapRef = useRef<ReactAudioPlayer>(null)
  // Render audio thumbnail, and also check for broken thumbnails
  const thumbnail = `/api/thumbnail/?path=${path}`
 

  useEffect(() => {
    // Manually get the HTML audio element and set onplaying event.
    // - As the default event callbacks provided by the React component does not guarantee playing state to be set
    // - properly when the user seeks through the timeline or the audio is buffered.
    const rap = rapRef.current?.audioEl.current
    if (rap) {
      rap.oncanplay = () => dispatch(setPlayerStatus(PlayerState.Ready));
      rap.onended = () => dispatch(setPlayerStatus(PlayerState.Paused));
      rap.onpause = () => dispatch(setPlayerStatus(PlayerState.Paused));
      rap.onplay = () => dispatch(setPlayerStatus(PlayerState.Playing));
      rap.onplaying = () => dispatch(setPlayerStatus(PlayerState.Playing));
      rap.onseeking = () => dispatch(setPlayerStatus(PlayerState.Loading));
      rap.onwaiting = () => dispatch(setPlayerStatus(PlayerState.Loading));
      rap.onerror = () => dispatch(setPlayerStatus(PlayerState.Paused));
      rap.onvolumechange = () => dispatch(setPlayerVolume(rap.volume));
    }
  }, [dispatch])
  return (
      <main>
        <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 p-8">
          <div className="relative flex aspect-square w-full items-center justify-center rounded-lg bg-gray-100 transition-all duration-75 dark:bg-gray-700 md:w-48">
            <div
              className={`absolute flex h-full w-full items-center justify-center transition-all duration-300 ${
                playerStatus === PlayerState.Loading
                  ? 'bg-white opacity-80 dark:bg-black'
                  : 'bg-transparent opacity-0'
              }`}
            >
              <LoadingIcon />
            </div>
            {!brokenThumbnail ? (
              <div className="absolute m-4 rounded-lg-full shadow-lg">
                <Image
                  className={`h-full w-full rounded-lg-full object-cover object-top ${
                    playerStatus === PlayerState.Playing ? 'animate-spin-slow' : ''
                  }`}
                  src={thumbnail}
                  alt={file.name}
                  width={1}
                  height={1}
                  onError={() => dispatch(setBrokenThumbnail(true))}
                />
              </div>
            ) : (
              <FcMusic
                className={`z-10 h-5 w-5 ${playerStatus === PlayerState.Playing ? 'animate-spin' : ''}`}
              />
            )}
          </div>
          <div className="flex w-full flex-col justify-between">
            <div>
              <div className="mb-2 font-medium">{file.name}</div>
              <div className="mb-4 text-sm text-gray-500">
                {t('Upload Date:') + ' ' + formatDate(file.lastModifiedDateTime)}
              </div>
            </div>
            <ReactAudioPlayer
              className="h-11 w-full"
              src={`/api/raw/?path=${path}`}
              ref={rapRef}
              controls
              preload="auto"
              volume={playerVolume}
            />
          </div>
        </div>
      </main>
  );
};

export default AudioPreview;