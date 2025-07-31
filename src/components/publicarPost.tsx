// components/FacebookPublisher.jsx (or similar)
import React, { useState } from 'react';

/**
 * React Component to publish a Post to Facebook via a Next.js API Route.
 *
 * @param {object} initialPostData An example Post object to be published.
 */



interface pfProps {

  initialPostData: {
  texto:string|any;
  imagen:string|any;
}

}




const FacebookPublisher: React.FC<pfProps> = ({ initialPostData }) => {

  // Use a state for the post data, so it can be modified or pre-filled
  const [postToPublish, setPostToPublish] = useState(initialPostData || {
    

    definicion_arte: "Colores corporativos de eWave, estilo futurista.",
    titulo: "¡Lanzamiento Exclusivo eWave!",
    tema: "Innovación en AI para Proyectos",
    texto: "Prepárate para la nueva ola de innovación. Con eWave, tus proyectos alcanzarán niveles impensables. Descubre cómo la IA puede transformar tu visión en realidad.",
    cta: "Explora Ahora",
    imagen: "https://ewave.com/assets/images/ewave_launch_graphic.jpg", 
  });

  const [isPublishing, setIsPublishing] = useState(false);
  const [publishMessage, setPublishMessage] = useState('');
  const [publishError, setPublishError] = useState('');

  // Function to handle the publication request
  const handlePublishToFacebook = async () => {
    setIsPublishing(true);
    setPublishMessage('');
    setPublishError('');

    try {
      const response = await fetch('/api/publish-facebook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ post: postToPublish }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to publish post to Facebook.');
      }

      setPublishMessage(`¡Post publicado con éxito en Facebook! ID: ${data.facebookPostId}`);
      console.log('Facebook API response:', data);

    } catch (error:any) {
      setPublishError(`Error al publicar en Facebook: ${error.message}`);
      console.error('Client-side error publishing to Facebook:', error);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '700px', margin: 'auto', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
      <button
        onClick={handlePublishToFacebook}
        disabled={isPublishing}
        style={{
          padding: '12px 25px',
          fontSize: '1em',
          backgroundColor: '#1877F2', // Facebook blue
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: isPublishing ? 'not-allowed' : 'pointer',
          opacity: isPublishing ? 0.7 : 1,
          transition: 'background-color 0.3s ease'
        }}
      >
        {isPublishing ? 'Publicando...' : 'Publicar Post en Facebook'}
      </button>

      {publishMessage && <p style={{ color: 'green', marginTop: '15px' }}>{publishMessage}</p>}
      {publishError && <p style={{ color: 'red', marginTop: '15px' }}>{publishError}</p>}
    </div>
  );
};

export default FacebookPublisher;