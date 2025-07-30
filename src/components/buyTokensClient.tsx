"use client"
import React, { useState, useEffect } from 'react';




// --- Componente principal del Flujo de Marketing ---
interface BuyTokensProps {
        userEmail:string|null;
}
  
const BuyTokens: React.FC<BuyTokensProps> = ({userEmail}) => {

  // Estado para la información del usuario y el saldo de tokens
  /*
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  
  // Función para llamar a la API y cobrar los tokens
  const getTokensPack = async () => {
   
    setLoading(true);
    setMessage('');
    setError('');
    try {
      const response = await fetch('/api/user-tokens', { // Reemplaza con la URL real de tu API
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Podrías necesitar un token de autenticación aquí, ej:
          // 'Authorization': `Bearer ${userAuthToken}`,
        },
        body: JSON.stringify({
          email: userEmail,
          tokens: 35 // El saldo final después de recibir el regalo
        }),
      });

      if (!response.ok) {
        // Si la respuesta no es 2xx, lanza un error
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al cobrar el TokenPack');
      }

      const data = await response.json();
      setMessage('¡TokenPack cobrado con éxito! Tu nuevo saldo es de 35 tokens.');

    } catch (err:any) {
      console.error("Error al cobrar TokenPack:", err);
      setError('Error al cobrar el TokenPack: ' + err.message);
    } finally {
      setLoading(false);
    }
  */
 

  return (
    <div className="user-dashboard-container">
      <div className="user-info-card">
        <p><strong>Email:</strong> {userEmail}</p>
      </div>

      <div className="gift-message-box">
        <p className="gift-message-text">
          <span className="highlight">¡Felicidades!</span> Estás a punto de dar un salto Cuantico. ¡Súbete a la Ola eWave! Pronto habilitaremos el pago en linea, por ahora, agiliza el proceso de recarga de Tokens en el siguiente enlace:
        </p>

        <a href={`https://wa.me/56920905973?text=Quiero%20recargar%20tokens%20eWave%for-${userEmail}`}><button className="contact-button">Recargar Tokens</button></a>

      </div>
    </div>
  );
};


export default BuyTokens;