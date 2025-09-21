import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Tigris S3 Configuration
const s3Client = new S3Client({
  region: process.env.TIGRIS_REGION || "auto",
  endpoint: process.env.TIGRIS_ENDPOINT,
  credentials: {
    accessKeyId: process.env.TIGRIS_ACCESS_KEY_ID,
    secretAccessKey: process.env.TIGRIS_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true, // Required for Tigris
});

const BUCKET_NAME = process.env.TIGRIS_BUCKET_NAME;

// Upload file to Tigris S3
export async function uploadFile(file, key, contentType) {
  try {
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: file,
      ContentType: contentType,
      ACL: "public-read", // Make file publicly accessible
    });

    const result = await s3Client.send(command);
    return {
      success: true,
      key,
      url: `${process.env.TIGRIS_ENDPOINT}/${BUCKET_NAME}/${key}`,
      etag: result.ETag,
    };
  } catch (error) {
    console.error("Upload error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// Get signed URL for file access
export async function getSignedUrlForFile(key, expiresIn = 3600) {
  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn });
    return {
      success: true,
      url: signedUrl,
    };
  } catch (error) {
    console.error("Get signed URL error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// Delete file from Tigris S3
export async function deleteFile(key) {
  try {
    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    await s3Client.send(command);
    return {
      success: true,
    };
  } catch (error) {
    console.error("Delete error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// Generate unique file key
export function generateFileKey(originalName, folder = "uploads") {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const extension = originalName.split(".").pop();
  const sanitizedName = originalName.replace(/[^a-zA-Z0-9.-]/g, "_");

  return `${folder}/${timestamp}_${randomString}_${sanitizedName}`;
}

// Get file URL
export function getFileUrl(key) {
  return `${process.env.TIGRIS_ENDPOINT}/${BUCKET_NAME}/${key}`;
}

// File upload handler for API routes
export async function handleFileUpload(file, folder = "uploads") {
  try {
    const key = generateFileKey(file.name, folder);
    const result = await uploadFile(file, key, file.type);

    if (result.success) {
      return {
        success: true,
        key,
        url: result.url,
        size: file.size,
        type: file.type,
        name: file.name,
      };
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.error("File upload handler error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// Validate file type
export function validateFileType(
  file,
  allowedTypes = ["image/jpeg", "image/png", "image/gif", "application/pdf"]
) {
  return allowedTypes.includes(file.type);
}

// Validate file size (in bytes)
export function validateFileSize(file, maxSize = 10 * 1024 * 1024) {
  // 10MB default
  return file.size <= maxSize;
}

// Get file extension
export function getFileExtension(filename) {
  return filename.split(".").pop().toLowerCase();
}

// Check if file is image
export function isImageFile(filename) {
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp", "svg"];
  const extension = getFileExtension(filename);
  return imageExtensions.includes(extension);
}

// Check if file is document
export function isDocumentFile(filename) {
  const documentExtensions = ["pdf", "doc", "docx", "txt", "rtf"];
  const extension = getFileExtension(filename);
  return documentExtensions.includes(extension);
}

// Check if file is archive
export function isArchiveFile(filename) {
  const archiveExtensions = ["zip", "rar", "7z", "tar", "gz"];
  const extension = getFileExtension(filename);
  return archiveExtensions.includes(extension);
}

