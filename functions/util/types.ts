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

export interface ContentFormat {
  url: string,
  quality: string,
  size: string, // Disk space
  length: string, // Amount of time you will waste consuming this content
}

export interface ContentInfo {
  title: string,
  author: string,
}