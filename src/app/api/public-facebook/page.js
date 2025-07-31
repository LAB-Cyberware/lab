// pages/api/publish-facebook.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // IMPORTANT: Retrieve your Page Access Token securely.
  // DO NOT hardcode this in production. Use environment variables.
  const FACEBOOK_PAGE_ACCESS_TOKEN = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  const FACEBOOK_PAGE_ID = process.env.FACEBOOK_PAGE_ID; // Your Facebook Page ID

  if (!FACEBOOK_PAGE_ACCESS_TOKEN || !FACEBOOK_PAGE_ID) {
    console.error('Missing Facebook API credentials in environment variables.');
    return res.status(500).json({ message: 'Server configuration error: Missing Facebook credentials.' });
  }

  const { post } = req.body; // The Post object sent from your client component

  if (!post || !post.texto || !post.titulo || !post.imagen) {
    return res.status(400).json({ message: 'Missing required post data.' });
  }

  const messageText = post.texto;
  const postTitle = post.titulo;
  const imageUrl = post.imagen; // Publicly accessible URL for the image
  const ctaText = post.cta || "Más Información";
  const postUrl = "https://www.tuproyectoewave.com/"; // URL your link will point to
  const topicCaption = post.tema || "Innovación Digital";
  const postDescription = post.fundamento || "Descubre cómo eWave puede transformar tu proyecto.";

  // Facebook Graph API Endpoint for Page Feed
  const facebookApiUrl = `https://graph.facebook.com/v19.0/${FACEBOOK_PAGE_ID}/feed`; // Use the latest API version

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
        // You can add more parameters here as needed, e.g., targeting
        // branding_fbp: 'your_fbp_id', // Example: Facebook Browser ID for branding
        // no_story: false, // Set to true to suppress story on user's timeline (for user posts)
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Error from Facebook API:', data.error);
      return res.status(response.status).json({
        message: 'Error publishing to Facebook',
        details: data.error || 'Unknown error from Facebook.'
      });
    }

    console.log('Successfully published to Facebook:', data);
    res.status(200).json({ message: 'Post published successfully!', facebookPostId: data.id, details: data });

  } catch (error) {
    console.error('Error calling Facebook API via backend:', error);
    res.status(500).json({ message: 'Internal server error while publishing to Facebook.', error: error.message });
  }
}