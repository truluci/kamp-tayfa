import { google } from 'googleapis';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const oauth2Client = new google.auth.OAuth2(
  process.env.YOUTUBE_CLIENT_ID,
  process.env.YOUTUBE_CLIENT_SECRET,
  process.env.YOUTUBE_REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: process.env.YOUTUBE_REFRESH_TOKEN });

const youtube = google.youtube({ version: 'v3', auth: oauth2Client });

export const uploadToYouTube = async ({ filePath, title, description }, callback) => {
  try {
    const videoFile = fs.createReadStream(filePath);

    const response = await youtube.videos.insert({
      part: 'snippet,status',
      requestBody: {
        snippet: {
          title,
          description,
          categoryId: '24', // Change if needed
        },
        status: {
          privacyStatus: 'private',
        },
      },
      media: {
        body: videoFile,
      },
    });

    return callback(null, response.data.id);
  } catch (err) {
    console.error('YouTube Upload Error:', err);
    return callback('youtube_upload_error');
  }
};
