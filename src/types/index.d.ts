import {SVGProps} from "react";
import { Variants } from "framer-motion";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import React from "react";
import { IconType } from "react-icons/lib";
import { ReadTimeResults } from "reading-time";

// API response object for /api/?path=<path_to_file_or_folder>, this may return either a file or a folder.
// Pagination is also declared here with the 'next' parameter.
export type OdAPIResponse = { file?: OdFileObject; folder?: OdFolderObject; next?: string }
// A folder object returned from the OneDrive API. This contains the parameter 'value', which is an array of items
// inside the folder. The items may also be either files or folders.
export type OdFolderObject = {
  '@odata.count': number
  '@odata.context': string
  '@odata.nextLink'?: string
  value: Array<{
    id: string
    name: string
    size: number
    lastModifiedDateTime: string
    file?: { mimeType: string; hashes: { quickXorHash?: string; sha1Hash?: string; sha256Hash?: string } }
    folder?: { childCount: number; view: { sortBy: string; sortOrder: 'ascending'; viewType: 'thumbnails' } }
    image?: OdImageFile
    video?: OdVideoFile
    thumbnailUrl: string
  }>
}

export type OdFolderChildren = OdFolderObject['value'][number]
// A file object returned from the OneDrive API. This object may contain 'video' if the file is a video.
export type OdFileObject = {
  '@odata.context': string
  name: string
  size: number
  id: string
  lastModifiedDateTime: string
  file: { mimeType: string; hashes: { quickXorHash: string; sha1Hash?: string; sha256Hash?: string } }
  image?: OdImageFile
  video?: OdVideoFile
  thumbnailUrl: string
}
// A representation of a OneDrive image file. Some images do not return a width and height, so types are optional.
export type OdImageFile = {
  width?: number
  height?: number
}
// A representation of a OneDrive video file. All fields are declared here, but we mainly use 'width' and 'height'.
export type OdVideoFile = {
  width: number
  height: number
  duration: number
  bitrate: number
  frameRate: number
  audioBitsPerSample: number
  audioChannels: number
  audioFormat: string
  audioSamplesPerSecond: number
}
export type OdThumbnail = {
  id: string
  large: { height: number; width: number; url: string }
  medium: { height: number; width: number; url: string }
  small: { height: number; width: number; url: string }
}
// API response object for /api/search/?q=<query>. Likewise, this array of items may also contain either files or folders.
export type OdSearchResult = Array<{
  lastModifiedDateTime: string;
  size: number;
  id: string
  tokenId: string // indicate which token id this search result belongs to (tokens are stored in redis)
  name: string
  file?: OdFileObject
  folder?: OdFolderObject
  path: string
  parentReference: { id: string; name: string; path: string }
}>
// API response object for /api/item/?id={id}. This is primarily used for determining the path of the driveItem by ID.
export type OdDriveItem = {
  '@odata.context': string
  '@odata.etag': string
  id: string
  name: string
  parentReference: { driveId: string; driveType: string; id: string; path: string }
}


export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};



/* Custom Animated Components types */
export type AnimatedTAGProps = {
  variants: Variants;
  className?: string;
  children: React.ReactNode;
  infinity?: boolean;
};

/* Spotify Track  */
export type SpotifyTrack = {
  id: number;
  title: string;
  url: string;
  coverImage: {
    url: string;
  };
  artist: string;
};

/* Spotify Artist  */
export type SpotifyArtist = {
  id: number;
  name: string;
  url: string;
  coverImage: {
    url: string;
  };
  followers: string;
};

export type ProjectType = {
  id: string;
  name: string;
  coverImage: string;
  description: string;
  githubURL: string;
  previewURL?: string;
  tools?: string[];
  pinned?: boolean;
};

export type SkillType = {
  name: string;
  Icon: IconType;
};

export type CertificateType = {
  id: string;
  title: string;
  issuedDate: string;
  orgName: string;
  orgLogo: string;
  url: string;
  pinned: boolean;
};

export type SocialPlatform = {
  title: string;
  Icon: IconType;
  url: string;
};

export type UtilityType = {
  title: string;
  data: {
    name: string;
    description: string;
    Icon: IconType | JSX.Element;
    link: string;
  }[];
};

export type Utilities = {
  title: string;
  description: string;
  lastUpdate: string;
  data: UtilityType[];
};

export type FrontMatter = {
  slug: string;
  readingTime: ReadTimeResults;
  excerpt: string;
  title: string;
  date: string;
  keywords: string;
  image: string;
};

export type PostType = {
  meta: FrontMatter;
  source: MDXRemoteSerializeResult;
  tableOfContents: TableOfContents[];
};

export type TableOfContents = {
  level: number;
  heading: string;
};

export type SupportMe = {
  name: string;
  url: string;
  Icon: IconType;
};

export type Song = {
  album: string;
  artist: string;
  albumImageUrl: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
};

export type FormInput = {
  to_name: string;
  first_name: string;
  last_name: string;
  email: string;
  subject: string;
  message: string;
};

export type SpotifyAccessToken = {
  access_token: string;
};

export type GithubRepo = {
  stargazers_count: number;
  fork: boolean;
  forks_count: number;
};

export type PageData = {
  title: string;
  description: string;
  image: string;
  keywords: string;
};

export type PageMeta = {
  home: PageData;
  stats: PageData;
  utilities: PageData;
  blogs: PageData;
  bookmark: PageData;
  certificates: PageData;
  projects: PageData;
  about: PageData;
  privacy: PageData;
  snippets: PageData;
};

export type Snippet = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
};

export type MovieType = {
  id: number;
  name: string;
  image: string;
  url: string;
  year: number;
  watched: boolean;
  rating: number;
};


export type UserData = {
  followers: string;
  twitter_username: string;
  blog: string;
  bio: string;
  avatar_url: string;
  login: string;
  name: string;
};