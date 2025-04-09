import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { mkdir } from 'fs/promises';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Ensure the uploads directory exists
    const uploadsDir = join(process.env.HOME || '', 'Downloads', 'uploads');
    await mkdir(uploadsDir, { recursive: true });

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save the file
    const filePath = join(uploadsDir, file.name);
    await writeFile(filePath, buffer);

    // Call the test API (httpbin.org)
    const apiResponse = await fetch('https://httpbin.org/post', {
      method: 'POST',
      body: buffer,
      headers: {
        'Content-Type': 'application/pdf',
      },
    });

    const apiResult = await apiResponse.json();

    return NextResponse.json({
      message: 'File uploaded and processed successfully',
      path: filePath,
      apiResponse: {
        status: apiResponse.status,
        data: apiResult.data, // This will contain the base64 encoded file
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 }
    );
  }
} 