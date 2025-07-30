"use client"
import React, { useState, useEffect } from 'react';

const UserDashboard = ({ userEmail }) => {
  // Estado para la información del usuario y el saldo de tokens
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Simula la carga inicial de datos del usuario
  useEffect(() => {
    // En una aplicación real, aquí harías una llamada a tu API
    // para obtener el saldo de tokens real del usuario.
    // Por ahora, simulamos un saldo inicial.
    setUserInfo(prevInfo => ({ ...prevInfo, tokenBalance: 10 })); // Ejemplo: usuario inicia con 10 tokens
  }, []);

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
          email: userInfo.email,
          tokens: 35 // El saldo final después de recibir el regalo
        }),
      });

      if (!response.ok) {
        // Si la respuesta no es 2xx, lanza un error
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al cobrar el TokenPack');
      }

      const data = await response.json();
      setUserInfo(prevInfo => ({ ...prevInfo, tokenBalance: data.updatedTokenBalance }));
      setMessage('¡TokenPack cobrado con éxito! Tu nuevo saldo es de ' + data.updatedTokenBalance + ' tokens.');

    } catch (err) {
      console.error("Error al cobrar TokenPack:", err);
      setError('Error al cobrar el TokenPack: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-dashboard-container">
      <div className="user-info-card">
        <p><strong>Email:</strong> {userEmail}</p>
      </div>

      <div className="gift-message-box">
        <p className="gift-message-text">
          <span className="highlight">¡Felicidades!</span> Estás a punto de recibir un <span className="highlight">Regalo de Lanzamiento</span> que te permitirá generar un **eWavePack completo** para tu proyecto. ¡Súbete a la Ola eWave!
        </p>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
        <button
          className="claim-button"
          onClick={getTokensPack}
          disabled={loading}
        >
          {loading ? 'Cargando...' : 'Cobrar TokenPack'}
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;