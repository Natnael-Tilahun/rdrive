import { getExtension } from './getFileIcon'

export const preview = {
  markdown: 'markdown',
  image: 'image',
  pdf: 'pdf',
  video: 'video',
  audio: 'audio',
}

export const extensions = {
  gif: preview.image,
  jpeg: preview.image,
  jpg: preview.image,
  png: preview.image,
  webp: preview.image,

  md: preview.markdown,
  mdx: preview.markdown,
  markdown: preview.markdown,
  mdown: preview.markdown,

  pdf: preview.pdf,

  mp4: preview.video,
  flv: preview.video,
  webm: preview.video,
  m3u8: preview.video,
  mkv: preview.video,
  mov: preview.video,
  avi: preview.video, // won't work!

  mp3: preview.audio,
  m4a: preview.audio,
  aac: preview.audio,
  wav: preview.audio,
  ogg: preview.audio,
  oga: preview.audio,
  opus: preview.audio,
  flac: preview.audio,
}

export function getPreviewType(extension: string, flags?: { video?: boolean }): string | undefined {
  let previewType = extensions[extension]
  if (!previewType) {
    return previewType
  }

  // Files with '.ts' extensions may be TypeScript files or TS Video files, we check for the flag 'video'
  // to determine what preview renderer to use for '.ts' files.
  if (extension === 'ts') {
    if (flags?.video) {
      previewType = preview.video
    }
  }

  return previewType
}

export function getLanguageByFileName(filename: string): string {
  const extension = getExtension(filename);
  return extension;
}
