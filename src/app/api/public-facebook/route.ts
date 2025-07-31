import type { NextApiRequest, NextApiResponse } from 'next';

// Define una interfaz para el objeto Post que esperas recibir
// Esto mejora la seguridad de tipos y la legibilidad
interface Post {
  texto: string;
  titulo: string;
  imagen: string;
  cta?: string; // Opcional, ya que tiene un valor por defecto
  tema?: string; // Opcional
  fundamento?: string; // Opcional
}

// Define una interfaz para la respuesta esperada de Facebook
interface FacebookApiError {
  message: string;
  type: string;
  code: number;
  fbtrace_id: string;
}

interface FacebookApiResponse {
  id?: string; // ID del post si es exitoso
  error?: FacebookApiError; // Objeto de error si falla
  // Otros campos que Facebook pueda devolver
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    // TypeScript nos ayuda a asegurar que solo respondamos con el tipo de respuesta correcto
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // IMPORTANTE: Recupera tu Token de Acceso de Página de forma segura.
  // NO lo dejes hardcodeado en producción. Usa variables de entorno.
  const FACEBOOK_PAGE_ACCESS_TOKEN = process.env.FACEBOOK_PAGE_ACCESS_TOKEN as string | undefined;
  const FACEBOOK_PAGE_ID = process.env.FACEBOOK_PAGE_ID as string | undefined; // ID de tu Página de Facebook

  if (!FACEBOOK_PAGE_ACCESS_TOKEN || !FACEBOOK_PAGE_ID) {
    console.error('Faltan credenciales de la API de Facebook en las variables de entorno.');
    return res.status(500).json({ message: 'Error de configuración del servidor: Faltan credenciales de Facebook.' });
  }

  // Asegúrate de que el cuerpo de la solicitud tenga la forma esperada
  const { post } = req.body as { post: Post }; // Casteamos req.body para tipar 'post'

  // Validaciones de datos de entrada básicas
  if (!post || !post.texto || !post.titulo || !post.imagen) {
    return res.status(400).json({ message: 'Faltan datos de post requeridos (texto, titulo, o imagen).' });
  }

  const messageText = post.texto;
  const postTitle = post.titulo;
  const imageUrl = post.imagen; // URL públicamente accesible para la imagen
  const ctaText = post.cta || "Más Información";
  const postUrl = "https://www.tuproyectoewave.com/"; // URL a la que el enlace de tu post apuntará
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
        caption: `www.tuproyectoewave.com - ${topicCaption}`,
        description: postDescription,
        picture: imageUrl,
        // Puedes añadir más parámetros aquí según sea necesario, por ejemplo, segmentación
        // branding_fbp: 'your_fbp_id', // Ejemplo: ID de navegador de Facebook para branding
        // no_story: false, // Establece a true para suprimir la historia en la línea de tiempo del usuario (para posts de usuario)
      }),
    });

    // Casteamos la respuesta JSON para que TypeScript la entienda
    const data: FacebookApiResponse = await response.json();

    if (!response.ok) {
      console.error('Error de la API de Facebook:', data.error);
      return res.status(response.status).json({
        message: 'Error al publicar en Facebook',
        details: data.error || 'Error desconocido de Facebook.'
      });
    }

    console.log('Publicado con éxito en Facebook:', data);
    res.status(200).json({ message: 'Post publicado con éxito!', facebookPostId: data.id, details: data });

  } catch (error: any) { // Capturamos el error y lo tipamos como 'any' o 'Error'
    console.error('Error al llamar a la API de Facebook a través del backend:', error);
    res.status(500).json({ message: 'Error interno del servidor al publicar en Facebook.', error: error.message });
  }
}