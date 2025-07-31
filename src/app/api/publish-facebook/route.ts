import { NextResponse } from 'next/server';

// --- Interfaces de Tipos ---

// 1. Tipo para el objeto Post que se recibe en el body de la solicitud
interface Post {
  texto: string;
  imagen: string;
}

// 2. Tipo para la estructura de error que puede devolver la API de Facebook
interface FacebookApiError {
  message: string;
  type: string;
  code: number;
  fbtrace_id: string;
}

// 3. Tipo para la respuesta esperada (éxito o error) de la API de Facebook
interface FacebookApiResponse {
  id?: string; // ID del post si la publicación fue exitosa
  error?: FacebookApiError; // Objeto de error si hubo un problema
  // Si Facebook devuelve otras propiedades en el éxito, puedes añadirlas aquí
  [key: string]: any; // Permite propiedades adicionales desconocidas para mayor flexibilidad
}

// 4. Tipo para la respuesta JSON de éxito de nuestra propia API
interface SuccessResponse {
  message: string;
  facebookPostId?: string;
  details?: FacebookApiResponse;
}

// 5. Tipo para la respuesta JSON de error de nuestra propia API
interface ErrorResponse {
  message: string;
  details?: string | FacebookApiError;
  error?: string; // Para errores internos del servidor
}

// --- Manejador de Ruta POST ---

/**
 * Maneja las solicitudes POST para publicar contenido en una página de Facebook.
 * Esta función es un Next.js Route Handler para el directorio 'app'.
 *
 * @param {Request} request El objeto Request de Next.js que contiene la solicitud HTTP entrante.
 * @returns {Promise<NextResponse<SuccessResponse | ErrorResponse>>} Una promesa que resuelve a un objeto NextResponse.
 */
export async function POST(request: Request): Promise<NextResponse<SuccessResponse | ErrorResponse>> {
  // Las validaciones de método HTTP se manejan automáticamente por Next.js
  // al exportar funciones nombradas como POST, GET, etc.

  // 1. Declaración y tipado de variables de entorno
  const FACEBOOK_PAGE_ACCESS_TOKEN: string | undefined = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  const FACEBOOK_PAGE_ID: string | undefined = process.env.FACEBOOK_PAGE_ID;

  // 2. Validación de credenciales de entorno
  if (!FACEBOOK_PAGE_ACCESS_TOKEN || !FACEBOOK_PAGE_ID) {
    console.error('Faltan credenciales de la API de Facebook en las variables de entorno.');
    return NextResponse.json(
      { message: 'Error de configuración del servidor: Faltan credenciales de Facebook.' },
      { status: 500 }
    );
  }

  let post: Post; // Declaramos la variable 'post' para que sea de tipo 'Post'

  try {
    // 3. Lectura y tipado del cuerpo de la solicitud
    const requestBody: { post: Post } = await request.json();
    post = requestBody.post; // Asignamos el objeto tipado
  } catch (parseError: any) {
    console.error('Error al parsear el cuerpo de la solicitud JSON:', parseError);
    return NextResponse.json(
      { message: 'Solicitud inválida: El cuerpo no es un JSON válido.' },
      { status: 400 }
    );
  }

  // 4. Validaciones de datos de entrada del 'post'
  if (!post || !post.texto || !post.texto || !post.imagen) {
    return NextResponse.json(
      { message: 'Faltan datos de post requeridos (texto, titulo, o imagen).' },
      { status: 400 }
    );
  }

  // 5. Tipado de variables para los parámetros de la API de Facebook
  const messageText: string = post.texto;
  const postTitle: string = post.texto;
  const imageUrl: string = post.imagen; // URL públicamente accesible para la imagen
  const postUrl: string = "https://ewave-cik7.onrender.com"; // URL a la que el enlace de tu post apuntará
  const topicCaption: string = post.texto || "Innovación Digital";

  // 6. Definición de la URL de la API de Facebook
  const facebookApiUrl: string = `https://graph.facebook.com/v19.0/${FACEBOOK_PAGE_ID}/feed`; // Usa la última versión de la API

  try {
    // 7. Realización de la solicitud a la API de Facebook
    const response: Response = await fetch(facebookApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token: FACEBOOK_PAGE_ACCESS_TOKEN,
        message: messageText,
        link: postUrl,
        name: postTitle,
        caption: `eWave by EPIC MEDIA WAVE - ${topicCaption}`,
        description: messageText,
        picture: imageUrl,
      }),
    });

    // 8. Lectura y tipado de la respuesta de Facebook
    const data: FacebookApiResponse = await response.json();

    // 9. Manejo de respuestas no exitosas de Facebook
    if (!response.ok) {
      console.error('Error de la API de Facebook:', data.error);
      return NextResponse.json(
        {
          message: 'Error al publicar en Facebook',
          details: data.error || 'Error desconocido de Facebook.'
        },
        { status: response.status }
      );
    }

    // 10. Manejo de respuesta exitosa
    console.log('Publicado con éxito en Facebook:', data);
    return NextResponse.json(
      { message: 'Post publicado con éxito!', facebookPostId: data.id, details: data },
      { status: 200 }
    );

  } catch (error: unknown) { // 11. Captura y tipado de errores genéricos de la red/código
    console.error('Error al llamar a la API de Facebook a través del backend:', error);
    // Asegurarse de que `error` sea tratado como un objeto `Error` para acceder a `.message`
    const errorMessage: string = error instanceof Error ? error.message : 'Un error desconocido ha ocurrido.';
    return NextResponse.json(
      { message: 'Error interno del servidor al publicar en Facebook.', error: errorMessage },
      { status: 500 }
    );
  }
}