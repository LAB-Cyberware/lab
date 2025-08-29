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
 
  const PayFlow = () => {
    window.open('https://www.flow.cl/app/web/pagarBtnPago.php?token=ic6f17f5f08187341e2fafcff2a279f482062911')
    return;
  }


  return (
    <div className="user-dashboard-container">
      <div className="user-info-card">
        <p><strong>Email:</strong> {userEmail}</p>
      </div>

      <div className="gift-message-box">
        <p className="gift-message-text">
          <span className="highlight">¡Felicidades!</span> Estás a punto de dar un salto Cuantico. ¡Súbete a la Ola eWave! Logra tu  proceso de recarga de Tokens en cualquiera de los siguientes enlaces:
        </p>

        <button className='token-charge'>
            <a href={`https://wa.me/56920905973?text=Quiero%20recargar%20tokens%20eWave%for-${userEmail}`}>
              Recargar Tokens
            </a>
          </button>
        <button onClick={PayFlow} className='hover:cursor-pointer'>
          <img src={'https://sandbox.flow.cl/img/botones/btn-pagar-celeste.png'} />
        </button>

      </div>
    </div>
  );
};


export default BuyTokens;