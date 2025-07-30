import React from 'react';
import BuyTokens from '@/components/buyTokensClient'; // Ajusta la ruta si es necesario
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
async function App() {
  const session = await getServerSession(authOptions);
  
    if (!session) {
      return (
        <div>
          <p>No estás autenticado. Redirigiendo...</p>
          <meta http-equiv="refresh" content="0; url=/api/auth/signin?callbackUrl=/dashboard" />
        </div>
      );
    }
  const currentUserEmail = session.user.email; 

  return (
    <div className="App">
      <header className="App-header">
        <h1>Bienvenido a eWave</h1>
      </header>
      <main>
        <BuyTokens userEmail={currentUserEmail} />
      </main>
    </div>
  );
}

export default App;