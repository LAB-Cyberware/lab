// app/api/facebook/post/route.js

export async function POST(request) {
  try {
    const { message, cloudinaryImage, scheduledTime } = await request.json();
    
    // Validaciones
    if (!message) {
      return Response.json({ 
        error: 'Message is required' 
      }, { status: 400 });
    }

    if (!cloudinaryImage) {
      return Response.json({ 
        error: 'Media Cloudinary (imageUrl) is required' 
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

      /*
    
    // Validar formato de scheduledTime si se proporciona
    if (scheduledTime) {
      const scheduledDate = new Date(scheduledTime);
      const now = new Date();
      
      // Verificar que la fecha sea válida
      if (isNaN(scheduledDate.getTime())) {
        return Response.json({ 
          error: 'Invalid scheduledTime format. Use ISO string or Unix timestamp' 
        }, { status: 400 });
      }

      // Verificar que la fecha sea en el futuro
      
      if (scheduledDate <= now) {
        return Response.json({ 
          error: 'Scheduled time must be in the future' 
        }, { status: 400 });
      }
    

      // Facebook requiere al menos 10 minutos en el futuro
      const tenMinutesFromNow = new Date(now.getTime() + 10 * 60 * 1000);
      if (scheduledDate < tenMinutesFromNow) {
        return Response.json({ 
          error: 'Scheduled time must be at least 10 minutes from now' 
        }, { status: 400 });
      }
    }
*/
    // Preparar payload para Facebook Graph API
    //attached_media: [{ media_fbid: mediaFbid }],
    const payload = {
      message: message,
       link: cloudinaryImage,
      published: false,
      scheduled_publish_time: scheduledTime,
      access_token: pageAccessToken
    };
 
    
    const facebookApiUrl = `https://graph.facebook.com/v18.0/${pageId}/feed`;
    
    const response = await fetch(facebookApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
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
        errorType: data.error?.type || null,
        errorSubcode: data.error?.error_subcode || null
      }, { status: response.status || 500 });
    }

    // Respuesta exitosa
    const result = {
      success: true,
      postId: data.id,
      message: scheduledTime ? 'Post scheduled successfully' : 'Post published successfully',
      pageId: pageId,
      isScheduled: !!scheduledTime
    };

    // Agregar información de programación si aplica
    if (scheduledTime) {
      result.scheduledFor = scheduledTime;
      result.scheduledTimestamp = payload.scheduled_publish_time;
    }

    return Response.json(result);

  } catch (error) {
    console.error('Error creating Facebook post:', error);
    
    return Response.json({
      success: false,
      error: 'Failed to create Facebook post',
      details: error.message
    }, { status: 500 });
  }
}

// Método GET para verificar el estado de la API
export async function GET() {
  const pageAccessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  const pageId = process.env.FACEBOOK_PAGE_ID;

  return Response.json({
    message: 'Facebook Scheduled Post API',
    version: '1.0',
    endpoint: '/api/facebook/post',
    method: 'POST',
    configuration: {
      pageAccessToken: pageAccessToken ? '✅ Configured' : '❌ Missing',
      pageId: pageId ? '✅ Configured' : '❌ Missing',
      pageIdValue: pageId || 'Not configured'
    },
    requiredFields: ['message','scheduledTime'],
      scheduling: {
      minAdvanceTime: '10 minutes',
      timeFormat: 'ISO string or Unix timestamp',
      examples: [
        '2024-12-25T15:30:00Z',
        '1735137000'
      ]
    },
    example: {
      immediatePost: {
        message: 'Check out this amazing photo!',
        imageUrl: '123456789012345'
      },
      scheduledPost: {
        message: 'Scheduled post with photo',
        imageUrl: '123456789012345',
        scheduledTime: '2024-12-25T15:30:00Z'
      }
    }
  });
}