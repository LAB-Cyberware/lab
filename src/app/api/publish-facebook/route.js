// app/api/publish-facebook/route.js
import { NextResponse } from 'next/server';

// Define una interfaz o esquema esperado para el objeto Post (solo para referencia en JS)
// En TypeScript, esto sería una 'interface' formal.
// Para JS, se usa para documentar la estructura esperada.
/**
 * @typedef {object} Post
 * @property {string} texto
 * @property {string} titulo
 * @property {string} imagen
 * @property {string} [cta]
 * @property {string} [tema]
 * @property {string} [fundamento]
 */

/**
 * @typedef {object} FacebookApiError
 * @property {string} message
 * @property {string} type
 * @property {number} code
 * @property {string} fbtrace_id
 */

/**
 * @typedef {object} FacebookApiResponse
 * @property {string} [id]
 * @property {FacebookApiError} [error]
 */

/**
 * Maneja las solicitudes POST para publicar en Facebook.
 * @param {Request} request La solicitud HTTP entrante.
 * @returns {Promise<Response>} La respuesta HTTP.
 */
export async function POST(request) {
  // Aquí no necesitamos verificar `request.method` explícitamente porque
  // solo exportamos la función POST. Si llega otra solicitud HTTP, Next.js
  // devolverá un 405 automáticamente.

  // IMPORTANT: Recupera tu Token de Acceso de Página de forma segura.
  // NO lo dejes hardcodeado en producción. Usa variables de entorno.
  const FACEBOOK_PAGE_ACCESS_TOKEN = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  const FACEBOOK_PAGE_ID = process.env.FACEBOOK_PAGE_ID;

  if (!FACEBOOK_PAGE_ACCESS_TOKEN || !FACEBOOK_PAGE_ID) {
    console.error('Faltan credenciales de la API de Facebook en las variables de entorno.');
    return NextResponse.json(
      { message: 'Error de configuración del servidor: Faltan credenciales de Facebook.' },
      { status: 500 }
    );
  }

  // Lee el cuerpo de la solicitud JSON
  const requestBody = await request.json();
  /** @type {Post} */
  const post = requestBody.post;

  // Validaciones de datos de entrada básicas
  if (!post || !post.texto || !post.titulo || !post.imagen) {
    return NextResponse.json(
      { message: 'Faltan datos de post requeridos (texto, titulo, o imagen).' },
      { status: 400 }
    );
  }

  const messageText = post.texto;
  const postTitle = post.titulo;
  const imageUrl = post.imagen; // URL públicamente accesible para la imagen
  const ctaText = post.cta || "Más Información"; // Not used in this basic feed post, but kept for consistency
  const postUrl = "https://ewave-cik7.onrender.com"; // URL a la que el enlace de tu post apuntará
  const topicCaption = post.tema || "Innovación Digital";
  const postDescription = post.fundamento || "Descubre cómo eWave puede transformar tu proyecto.";

  // Endpoint de la API de Facebook Graph para el Feed de la Página
  const facebookApiUrl = `https://graph.facebook.com/v19.0/${FACEBOOK_PAGE_ID}/feed`; // Usa la última versión de la API

  try {
    const response = await fetch(facebookApiUrl, {
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
        description: postDescription,
        picture: imageUrl,
      }),
    });

    /** @type {FacebookApiResponse} */
    const data = await response.json();

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

    console.log('Publicado con éxito en Facebook:', data);
    return NextResponse.json(
      { message: 'Post publicado con éxito!', facebookPostId: data.id, details: data },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error al llamar a la API de Facebook a través del backend:', error);
    // Asegurarse de que `error` sea tratado como un objeto `Error` para acceder a `.message`
    const errorMessage = error instanceof Error ? error.message : 'Un error desconocido ha ocurrido.';
    return NextResponse.json(
      { message: 'Error interno del servidor al publicar en Facebook.', error: errorMessage },
      { status: 500 }
    );
  }
}