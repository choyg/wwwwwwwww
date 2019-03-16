/**
 * m4a quality => itag
 */
export enum AudioQuality {
  LOW = 139, // 48k
  MEDIUM = 140, // 128k
  HIGH = 141, // 256k
}

/**
 * mp4 quality => itag
 */
export enum VideoQuality {
  LMAO = 133, // 240p
  LOW = 134, // 360p
  MEDIUM = 135, // 480p
  HIGH = 136, // 720p
}

/**
 * Format metadata of the downloadable content
 */
export interface ContentFormat {
  url: string, // Download url
  quality: string, // itag for now
  size: string, // Disk space
  length: string, // Amount of time you will waste consuming this content
}

/**
 * Content metadata of the YouTube video
 */
export interface ContentInfo {
  title: string, // Video url
  author: string, // Video author name
}

export type ContentDownloadable = ContentFormat & ContentInfo;