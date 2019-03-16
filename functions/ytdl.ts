import * as ytdl from 'ytdl-core';

export async function handler(event, context) {
  const { url, options } = JSON.parse(event.body);
  if (!url) return {
    statusCode: 400,
    body: JSON.stringify({ message: `Body must contain url property` })
  }
  const info = await ytdl.getInfo(url, options);

  let bestFormat: ContentFormat;
  // if (options.filter.toLowerCase() === 'audioonly') {
  const result = getBestM4a(info);
  if (!result) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'boo' })
    }
  }
  bestFormat = result;
  // }

  const contentInfo: ContentInfo = {
    author: info.author.name,
    title: info.title,
  };

  return {
    statusCode: 200,
    body: JSON.stringify({ ...bestFormat, ...contentInfo }),
  };
}

// TODO ytdl.videoInfo typings are incorrect
// Using any for now cuz too lazy to fix
export function getBestM4a(info: any): ContentFormat | null {
  const streamingData = info.player_response.streamingData;
  const formats = streamingData.formats.concat(streamingData.adaptiveFormats);

  if (!formats.length) {
    return null;
  }

  const [content] = formats
    .filter(f => f.itag >= AudioQuality.LOW && f.itag <= AudioQuality.HIGH) // All m4as
    .sort((a, b) => b.itag - a.itag) // Filter descending by audio quality

  let quality: string;
  for (var enumMember in AudioQuality) {
    if (AudioQuality[enumMember]) {
      quality = enumMember;
      break;
    }
  }
  return {
    url: content.url,
    length: content.approxDurationMs,
    quality: quality || content.itag,
    size: content.contentLength
  }
}

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