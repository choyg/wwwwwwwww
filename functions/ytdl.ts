import * as ytdl from 'ytdl-core';
import { getDownloadable } from './service/extractor';

export async function handler(event, context) {
  const { url, options } = JSON.parse(event.body);
  if (!url) return {
    statusCode: 400,
    body: JSON.stringify({ message: `Body must contain url property` })
  }
  const info = await ytdl.getInfo(url, options);
  const downloadable = getDownloadable(info);

  if (!downloadable) return {
    status: 400,
    body: JSON.stringify({ message: 'Could not extract video' })
  }

  return {
    statusCode: 200,
    body: JSON.stringify(downloadable),
  };
}