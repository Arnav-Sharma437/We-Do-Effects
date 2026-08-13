import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure cloudinary using CLOUDINARY_URL environment variable automatically
// e.g. cloudinary://API_KEY:API_SECRET@CLOUD_NAME

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary via stream
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'we-do-effects' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    // @ts-expect-error - Cloudinary result type
    return NextResponse.json({ url: uploadResult.secure_url });
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: 'Image upload failed. Check Cloudinary config.' }, { status: 500 });
  }
}
