import fs from 'fs';
import { google } from 'googleapis';
import 'dotenv/config';

const oauth2Client = new google.auth.OAuth2(
  process.env.YOUTUBE_CLIENT_ID,
  process.env.YOUTUBE_CLIENT_SECRET,
  process.env.YOUTUBE_REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: process.env.YOUTUBE_REFRESH_TOKEN });

const youtube = google.youtube({ version: 'v3', auth: oauth2Client });

export const uploadToYouTube = (data, callback) => {
  if (!data || typeof data !== 'object')
    return callback('bad_request');

  if (!data.filePath || typeof data.filePath !== 'string')
    return callback('bad_request');

  if (!data.title || typeof data.title !== 'string')
    return callback('bad_request');

  if (!data.description || typeof data.description !== 'string')
    return callback('bad_request');

  const videoFile = fs.createReadStream(data.filePath);

  youtube.videos.insert({
    part: 'snippet,status',
    requestBody: {
      snippet: {
        title: data.title,
        description: data.description
      },
      status: {
        privacyStatus: 'private',
      },
    },
    media: {
      body: videoFile,
    },
  })
    .then(response => callback(null, response.data.id))
    .catch(err => {
      console.error('YouTube Upload Error:', err);
      return callback('youtube_upload_error');
    });
};

export const deleteFromYouTube = (data, callback) => {
  if (!data || typeof data !== 'object')
    return callback('bad_request');

  if (!data.videoId || typeof data.videoId !== 'string')
    return callback('bad_request');

  youtube.videos.delete({
    id: data.videoId,
  })
    .then(() => callback(null))
    .catch(err => {
      console.error('YouTube Delete Error:', err);
      return callback('youtube_delete_error');
    });
};
