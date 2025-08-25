import React, { Suspense } from 'react';
import ContentManagerPlus from "@/components/contentsManagerPlus";
import type { CampaniaMarketingPageProps, CampaniaMarketingPlusData, EstrategiaMarketingData } from '@/types/marketingWorkflowTypes';


export default async function DynamicPage({ params }: CampaniaMarketingPageProps) {
  const parametros = await params;
  const { p: itemId } = parametros;

      let campaniasList: CampaniaMarketingPlusData[] | null = null;
      let estrategia: EstrategiaMarketingData | null = null;
      let errorMessageCampania: string | null = null;
      let errorMessageEstrategia: string | null = null;
      let errorMessage: string | null = null;

  try {

    const apiUrlCampania = `${process.env.NEXTAUTH_URL}/api/campania-marketing?p=${itemId as string}`; // Ruta a tu API Route dinámica
    const apiUrlEstrategia = `${process.env.NEXTAUTH_URL}/api/estrategia-marketing?p=${itemId as string}`; // Ruta a tu API Route dinámica

     const resCampania = await fetch(apiUrlCampania, {
      cache: 'no-store', // Opcional: Deshabilita el cacheo para siempre obtener datos frescos
    });

    

    if (!resCampania.ok) {
      // Si la respuesta no es exitosa (ej. 404, 500), parsea el error y setea el mensaje.
      const errorResponseCampania = await resCampania.json();
      errorMessageCampania = errorResponseCampania.message || `Error desconocido al cargar datos para ID: ${itemId}`;
      console.error(`Error fetching data for ID '${itemId}':`, errorMessageCampania);
    } else {
 
         const responseCampania  = await resCampania.json();
         let mydataCampania = responseCampania.data;

          if(mydataCampania){
            campaniasList = mydataCampania
            const resEstrategia = await fetch(apiUrlEstrategia, {
              cache: 'no-store', // Opcional: Deshabilita el cacheo para siempre obtener datos frescos
            });
            if(!resEstrategia.ok){
              // Si la respuesta no es exitosa (ej. 404, 500), parsea el error y setea el mensaje.
              const errorResponse = await resEstrategia.json();
              errorMessageEstrategia = errorResponse.message || `Error desconocido al cargar datos para ID: ${itemId}`;
              console.error(`Error fetching data for ID '${itemId}':`, errorMessageEstrategia); 
            }else{
              const responseEstrategia = await resEstrategia.json();
              let mydataEstrategia = responseEstrategia.data[0];
              if(mydataEstrategia){
                 estrategia = mydataEstrategia 
                 console.log("$$$$  ESTRATEGIA   $$$$$")
                 console.log(estrategia)
              }else{
                // Captura cualquier error de red o de ejecución durante el fetch.
                console.error('Error en Jsonificando Estrategia:');
                errorMessageEstrategia = `Error Jsonificando Estrategia`;
              }

            }
          }else{
            // Captura cualquier error de red o de ejecución durante el fetch.
            console.error('Error en Jsonificando Campania:');
            errorMessageCampania = `Error Jsonificando Campania`;
          }
    }
  } catch (error: any) {
    // Captura cualquier error de red o de ejecución durante el fetch.
    console.error('Error en DynamicPage durante el fetching:', error.message);
    errorMessage = `Error de conexión o inesperado: ${error.message}`;
  }

  console.log("@@@ Campanias List @@@@")
  console.log(campaniasList)
      return (
        <div>
            <div className="cardMKT williFlowItem">    
                <h2 className="mkt-subtitle">Flujo de Trabajo Marketing Digital</h2>
                <div className="cardMKTitemHidden">
                 <Suspense fallback={<p>Cargando...</p>}><ContentManagerPlus estrategia={estrategia} campanias={campaniasList} idProyecto={itemId}/></Suspense>
                </div> 
            </div>
        </div>    
    )
}
