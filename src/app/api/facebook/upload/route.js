// app/api/facebook/upload/route.js

export async function POST(request) {
  try {
    const { imageUrl, message = '' } = await request.json();

    // Validaciones
    if (!imageUrl) {
      return Response.json({ 
        error: 'Image URL is required' 
      }, { status: 400 });
    }

    // Obtener variables de entorno
    const pageAccessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
    const pageId = process.env.FACEBOOK_PAGE_ID;

    if (!pageAccessToken) {
      return Response.json({ 
        error: 'Facebook Page Access Token not configured' 
      }, { status: 500 });
    }

    if (!pageId) {
      return Response.json({ 
        error: 'Facebook Page ID not configured' 
      }, { status: 500 });
    }

    // Preparar los datos para Facebook Graph API
    const formData = new FormData();
    formData.append('url', imageUrl);
    formData.append('access_token', pageAccessToken);
    formData.append('published', 'true');
    
    if (message) {
      formData.append('message', message);
    }

    // Hacer la petición a Facebook Graph API
    const facebookApiUrl = `https://graph.facebook.com/v18.0/${pageId}/photos`;
    
    const response = await fetch(facebookApiUrl, {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    // Manejar errores de Facebook API
    if (!response.ok || data.error) {
      console.error('Facebook API Error:', data.error);
      
      return Response.json({
        success: false,
        error: 'Facebook API Error',
        details: data.error?.message || 'Unknown error occurred',
        errorCode: data.error?.code || null,
        errorType: data.error?.type || null
      }, { status: response.status || 500 });
    }

    // Respuesta exitosa
    return Response.json({
      success: true,
      photoId: data.id,
      postId: data.post_id || null,
      message: 'Photo uploaded successfully to Facebook page',
      pageId: pageId
    });

  } catch (error) {
    console.error('Error uploading to Facebook:', error);
    
    return Response.json({
      success: false,
      error: 'Failed to upload photo to Facebook',
      details: error.message
    }, { status: 500 });
  }
}

// Método GET para verificar el estado de la API y configuración
export async function GET() {
  const pageAccessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  const pageId = process.env.FACEBOOK_PAGE_ID;

  return Response.json({
    message: 'Facebook Page Photo Upload API',
    version: '2.0',
    endpoint: '/api/facebook/upload',
    method: 'POST',
    configuration: {
      pageAccessToken: pageAccessToken ? '✅ Configured' : '❌ Missing',
      pageId: pageId ? '✅ Configured' : '❌ Missing',
      pageIdValue: pageId || 'Not configured'
    },
    requiredFields: ['imageUrl'],
    optionalFields: ['message'],
    example: {
      request: {
        imageUrl: 'https://example.com/image.jpg',
        message: 'Optional description message'
      }
    }
  });
}