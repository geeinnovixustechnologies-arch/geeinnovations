import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth.js';
import { handleFileUpload, validateFileType, validateFileSize } from '@/lib/storage.js';

// POST /api/upload - Upload file to Tigris S3
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file');
    const folder = formData.get('folder') || 'uploads';

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
      'application/pdf', 'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain', 'application/rtf',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv',
      'application/zip', 'application/x-rar-compressed', 'application/x-7z-compressed'
    ];

    if (!validateFileType(file, allowedTypes)) {
      return NextResponse.json(
        { success: false, message: 'File type not allowed' },
        { status: 400 }
      );
    }

    // Validate file size (50MB max)
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (!validateFileSize(file, maxSize)) {
      return NextResponse.json(
        { success: false, message: 'File size too large. Maximum size is 50MB.' },
        { status: 400 }
      );
    }

    // Upload file
    const result = await handleFileUpload(file, folder);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'File uploaded successfully',
        data: {
          key: result.key,
          url: result.url,
          name: result.name,
          size: result.size,
          type: result.type
        }
      });
    } else {
      return NextResponse.json(
        { success: false, message: result.error },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to upload file' },
      { status: 500 }
    );
  }
}

