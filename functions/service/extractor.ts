import * as ytdl from 'ytdl-core';
import { AudioQuality, ContentDownloadable, ContentFormat, ContentInfo } from '../util/types';

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

export function getDownloadable(info: ytdl.videoInfo): ContentDownloadable | null {
  const contentInfo: ContentInfo = {
    author: info.author.name,
    title: info.title,
  };

  const bestFormat = getBestM4a(info);
  if (!bestFormat) return null;

  return { ...bestFormat, ...contentInfo }
}