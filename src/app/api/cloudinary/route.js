// pages/api/upload-image.js (para Pages Router)
// o app/api/upload-image/route.js (para App Router)

import { v2 as cloudinary } from 'cloudinary';

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    const { imageBase64, folder = 'uploads' } = await request.json();

    // Validar que se reciba la imagen
    if (!imageBase64) {
      return Response.json({ error: 'Image base64 string is required' }, { status: 400 });
    }

    // Subir imagen a Cloudinary
    const uploadResult = await cloudinary.uploader.upload(imageBase64, {
      folder: folder,
      resource_type: 'image',
      transformation: [
        { quality: 'auto', fetch_format: 'auto' }
      ]
    });

    // Retornar la URL de la imagen
    return Response.json({
      success: true,
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
      width: uploadResult.width,
      height: uploadResult.height,
      format: uploadResult.format,
      bytes: uploadResult.bytes
    });

  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    return Response.json({
      success: false,
      error: 'Failed to upload image',
      details: error.message
    }, { status: 500 });
  }
}