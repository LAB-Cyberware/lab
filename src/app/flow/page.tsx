'use client'

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const BuyTokens35: React.FC = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentTokens, setCurrentTokens] = useState<number>(0);

  useEffect(() => {
    const autoAddTokens = async () => {
      const userEmail = session?.user?.email;
      
      if (userEmail) {
        setLoading(true);
        try {
          const getCurrentResponse = await fetch(`/api/user-tokens?e=${userEmail}`);
          if (!getCurrentResponse.ok) {
            throw new Error('Error al obtener saldo actual');
          }
          const currentData = await getCurrentResponse.json();
          const currentTokensCount = currentData.tokens;
          
          const updateResponse = await fetch('/api/user-tokens', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: userEmail,
              tokens: currentTokensCount + 35,
            }),
          });

          if (!updateResponse.ok) {
            const errorData = await updateResponse.json();
            throw new Error(errorData.message || 'Error al actualizar tokens');
          }

          const updatedData = await updateResponse.json();
          setCurrentTokens(updatedData.tokens);
          
        } catch (err: any) {
          console.error("Error al procesar tokens:", err);
          setError('Error al procesar la compra: ' + err.message);
        } finally {
          setLoading(false);
        }
      } else {
        setError("No estás autenticado.");
      }
    };

    if (session !== undefined) {
      autoAddTokens();
    }
  }, [session]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 p-6">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-6"></div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Procesando tu compra...</h1>
          <p className="text-gray-600">Agregando tokens a tu cuenta...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="bg-white rounded-xl shadow-xl p-10 max-w-lg w-full text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-3xl font-bold text-green-600 mb-4">¡COMPRA EXITOSA!</h1>
        
        <div className="space-y-3 mb-8">
          <p className="text-lg text-gray-700 flex items-center justify-center gap-2">
            <span className="text-green-500">✅</span>
            Pago procesado correctamente
          </p>
          <p className="text-lg text-gray-700 flex items-center justify-center gap-2">
            <span className="text-yellow-500">💰</span>
            +35 tokens agregados a tu cuenta
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-6 mb-8 border border-green-200">
          <p className="text-2xl font-bold text-gray-800">
            Nuevo saldo: <span className="text-green-600">{currentTokens} tokens</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BuyTokens35;