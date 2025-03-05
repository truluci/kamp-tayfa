import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

export const uploadToR2 = (data, callback) => {
  if (!data || typeof data !== 'object')
    return callback('bad_request');

  if (!data.filePath || typeof data.filePath !== 'string')
    return callback('bad_request');

  if (!data.bucket || typeof data.bucket !== 'string')
    return callback('bad_request');

  const uniqueFilename = `${Date.now()}-${path.basename(data.filePath)}`;
  const fileStream = fs.createReadStream(data.filePath);

  const uploadParams = {
    Bucket: data.bucket,
    Key: uniqueFilename,
    Body: fileStream,
    ContentType: "image/jpg",
  };

  s3.send(new PutObjectCommand(uploadParams))
    .then(() => callback(null, uniqueFilename))
    .catch((err) => {
      console.error("R2 Upload Error:", err);
      return callback('r2_upload_error');
    });
};