"use client";



import React, { useEffect, useState, ChangeEvent } from "react";
import { Spinner } from '@heroui/react';
import PublicPost from "@/components/publicarPost"
import {
  ContentsManegerPlusProps,
  CampaniaMarketingPlusData,
  Semana,
  Dia,
  EstudioMercadoData,
  EstrategiaMarketingData,
  CampaniaMarketingData
} from "../types/marketingWorkflowTypes";
import GWV from "@/utils/GWV";
import { useSession } from 'next-auth/react'; // Importar useSession correctamente
import AddCampaniaModal from '@/components/add-campania-modal'
interface GeneratedContent {
  texto: string | null;
  imagen: string | null;
}

const ContentManagerPlus: React.FC<ContentsManegerPlusProps> = ({ estrategia,campanias,idProyecto,estudio,maker }) => {
  
    const { data: session, status } = useSession();
    const currentUserEmail = session?.user?.email;
    const [postError, setPostError] = useState<Map<string, string | null>>(new Map());
    const [price, setPrice] = useState<number | null>(null);
    const [generatedPosts, setGeneratedPosts] = useState<Map<string, GeneratedContent>>(new Map());
    const [generatingStates, setGeneratingStates] = useState<Map<string, boolean>>(new Map());
    const [selectedCampania, setSelectedCampania] = useState<any | null>(null);
    const [saldo, setSaldo] = useState<any | null>(null);
    const [isAddCampaniaModalOpen, setAddCampaniaModalOpen] = useState(false);
    const [newCampania, setNewCampania] = useState<any | null>(null);
    const [newInfoCampania,setInfoCampania] =  useState<any | null>(null);


    // DATA PARA LA CREACION DE CAMPAÑA
    const [dataCampaniaMarketing, setDataCampaniaMarketing] = useState<CampaniaMarketingData | null>(null);
      // Estados para controlar la existencia en BD (boolean o null inicial)

      //  SI NO HAY ESTRATEGIA 
          // mostrar boton IR A STEP BY STEP MKT FLOW

      // SI HAY ESTRATEGIA
          // Mostrar boton CREAR CAMPANIA
          
          

      //const [existeCampania, setExisteCampania] = useState<boolean | null>(initialCampania||null);



    const commonClasses = {
        container: "bg-white p-8 rounded-lg shadow-xl w-full max-w-6xl mx-auto my-8 font-sans",
        section: "mb-10 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-md border border-blue-100",
        sectionTitle: "text-3xl font-extrabold text-indigo-800 mb-6 pb-4 border-b-2 border-indigo-200 tracking-tight",
        postContainer: "p-3 bg-gray-50 rounded-md border border-gray-100 mb-4",
        generatedContentContainer: "bg-green-50 p-4 rounded-md mt-4 border border-green-200",
        errorText: "text-red-600 text-sm mt-1",
        buttonGroup: "flex flex-wrap gap-3 mt-4",
        buttonBase: "px-5 py-2 rounded-md font-semibold text-white transition-colors duration-200 ease-in-out",
        buttonGenerate: "bg-purple-600 hover:bg-purple-700 focus:ring-purple-500",
        buttonDisabled: "bg-gray-400 cursor-not-allowed",
    };

    let data: CampaniaMarketingPlusData | null = null;
    let errorMessage: string | null = null;


const handleAddCampaniaClick = (campania: any) => {
    setNewCampania(campania);
    setAddCampaniaModalOpen(true);
  };

  const handelSaveCampania = async () => { // Convertir a async para esperar la eliminación
    if (newCampania) {
      await generateCampania(newCampania); // Esperar a que se complete la eliminación
      closeAddCampaniaModal();
    }
  };

  const closeAddCampaniaModal = () => {
    setAddCampaniaModalOpen(false);
    setNewCampania(null); // Limpiar itemToDelete
  };

  const generateCampania = async (newCampania: any) => {
      if(maker && estudio && estrategia){
        try {
          const payload = {
            maker:"maker",
            estudio:"estudio",
            estrategia:"estrategia",
            item:"campania-marketing",
            mode: 'generate',
            projectId: idProyecto, 
          }
          const res = await fetch(`/api/willi/`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
              "Content-Type": "application/json"           
            },
      });
          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || `Error al eliminar: ${res}`);
          }
          const data = await res.json();
          alert("Eliminado correctamente"); // Considerar usar notificaciones menos intrusivas
          console.log(data);
          // La actualización de la lista se hará en handelConfirmDelete
        } catch (error: any) {
          console.error("Error en eliminar:", error);
          alert(`Error al eliminar: ${error.message}`);
        }
      }else{
        alert("se requiere generar el Estudio de Mercado y la Estrategia General de Marketing para el Proyecto, ejecuta el Paso a Paso de Marketing para poder generar una Campaña.")
      }  

    
  };

    const handelerSelectCampania = async () =>{
            try {
              const apiUrl = `/api/campania-marketing-plus?p=${idProyecto as string}`; // Ruta a tu API Route dinámica
              const res = await fetch(apiUrl, {
                cache: 'no-store', // Opcional: Deshabilita el cacheo para siempre obtener datos frescos
              });
              if (!res.ok) {
                const errorResponse = await res.json();
                errorMessage = errorResponse.message || `Error desconocido al cargar datos para ID: ${idProyecto}`;
                console.error(`Error fetching data for ID '${idProyecto}':`, errorMessage);
              } else {
              const response  = await res.json();
                  let mydata = response.data[0];
                    if(mydata){
                      setSelectedCampania(mydata)
                }else{
              errorMessage = `Error Jsonificando`;
                }
              }
            } catch (error: any) {
              errorMessage = `Error de conexión o inesperado: ${error.message}`;
            }
      }
  const generatePost = async (post:any) => {
              try {
                  let bodyData = JSON.stringify({ item: 'post-final', post: post });
                  let bodyData_img = JSON.stringify({ item: 'post-final-img', post: post });
                  const response = await fetch(`/api/willi`, {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                      },
                      body: bodyData,
                  });
                  const response_imagen = await fetch(`/api/willi`, {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                      },
                      body: bodyData_img,
                  });
                  if (response.ok) {
                      const res = await response.json();
                      const texto_final = res.texto;
                      if (response_imagen.ok) {
                          const res_img = await response_imagen.json();
                          const imagen_final = res_img[0].data;
                          const response_final = {
                              texto: texto_final,
                              imagen: imagen_final,
                          };
                          return response_final;
                      } else if (response_imagen.status === 404) {
                          return { texto: texto_final, imagen: null };
                      } else {
                          const errorData = await response_imagen.json();
                          return { texto: texto_final, imagen: null };
                      }
                  } else if (response.status === 404) {
                      return null;
                  }else{
                      return null;
                  }
              } catch (error) {
              }
          };
          const GeneratePost = async ({ week, day, post }:any) => {
              const getKey = (week:any, day:any) => `${week}_${day}`;
              const key = getKey(week, day);
              try {
                  const generated = await generatePost(post);
                  return { key, generated }; // `generated` puede ser `{texto, imagen}` o `null`
              } catch (err:any) {
                  return { key, generated: { texto: `Error al generar: ${err.message}`, imagen: null } };
              }
          };
          const ejecutarAccion = async (action:any, objectAction:any) =>{
              if (action === "generate-post") { // Usar === para comparación estricta
                  return await GeneratePost(objectAction);
              }
              if (action === "generate-estudio") {
                  const { mode, projectId, item } = objectAction;
                  try {
                      const result = await GWV(mode, projectId, item); // Asumir que GWV puede lanzar error o devolver null/estructura
                      return result; // o { key: "estudio_key", generated: result } si es necesario adaptar
                  } catch (error:any) {
                      return { key: "estudio_error", generated: { texto: `Error: ${error.message}` } }; // Ejemplo
                  }
              }
              if (action === "generate-estrategia") {
                  const { mode, projectId, item, estudio } = objectAction;
                  try {
                      const result = await GWV(mode, projectId, item, estudio);
                      return result;
                  } catch (error:any) {
                      return { key: "estrategia_error", generated: { texto: `Error: ${error.message}` } };
                  }
              }
              if (action === "generate-campania") {
                  const { mode, projectId, item, estudio, estrategia } = objectAction;
                  try {
                      const result = await GWV(mode, projectId, item, estudio, estrategia);
                      return result;
                  } catch (error:any) {
                      return { key: "campania_error", generated: { texto: `Error: ${error.message}` } };
                  }
              }
              return null; // O una estructura de error por defecto
          }

          const getPrice = async (action:any) => {
              if (!action) {
                  return null;
              }
              try {
                  const response = await fetch(`/api/pricing?a=${action}`); // No necesita headers ni method GET por defecto
                  if (!response.ok) {
                      const errorData = await response.json().catch(() => ({})); // Intenta parsear JSON, si falla, objeto vacío
                      return null;
                  }
                  const jsonPrice = await response.json();
                  return jsonPrice.price; // Asume que la API devuelve { price: X }
              } catch (e) {
                  return null;
              }
          }

          const validarSaldo = async (currentUserEmail:any) => {
              if (!currentUserEmail) {
                  return null;
              }
              try {
                  const response = await fetch(`/api/user-tokens/?e=${currentUserEmail}`);
                  if (!response.ok) {
                      return null;
                  }
                  const jsonData = await response.json();
                  return jsonData.tokens; // Asume { tokens: Y }
              } catch (e) {
                  return null;
              }
          }
          const descontarTokens = async (montoADejar:number, currentUserEmail:string) => {
              const bodyData = JSON.stringify({ tokens: montoADejar, email:currentUserEmail }); // La API debe interpretar esto como el nuevo saldo
              try {
                  const response = await fetch(`/api/user-tokens`, { // Asumiendo API RESTful
                      method: 'PUT',
                      headers: { 'Content-Type': 'application/json' },
                      body: bodyData,
                  });
                  if (!response.ok) {
                      const errorData = await response.json().catch(() => ({}));
                      return null; // O false
                  }
                  return await response.json(); // O true si la API devuelve el usuario actualizado o un success
              } catch (e) {
                  return null; // O false
              }
          }

          const rollBackTokens = async (saldoOriginal:any, currentUserEmail:any) => {
              return await descontarTokens(saldoOriginal, currentUserEmail); // Reutilizar descontarTokens
          }
          const useTokens = async (action:any, objectAction:any) => {
              if (currentUserEmail) {
                  const saldoActual = await validarSaldo(currentUserEmail);
                  const price = await getPrice(action);
                  if (price === null) { // getPrice ahora devuelve null en error
                      return { key: action, generated: { texto: `Error: No se pudo determinar el costo de la acción.`, imagen: null } };
                  }
                  if (saldoActual === null) {
                      return { key: action, generated: { texto: `Error: No se pudo verificar el saldo.`, imagen: null } };
                  }
                  if (saldoActual >= price) {
                      const saldoDespuesDelDescuento = saldoActual - price;
                      const descuentoExitoso = await descontarTokens(saldoDespuesDelDescuento, currentUserEmail);
                      if (descuentoExitoso) { // Asumiendo que descontarTokens devuelve algo truthy en éxito
                          const resultadoAccion = await ejecutarAccion(action, objectAction);
                          if (resultadoAccion && resultadoAccion.generated && typeof resultadoAccion.generated.texto === 'string' && resultadoAccion.generated.texto.startsWith("Error:")) {
                              await rollBackTokens(saldoActual, currentUserEmail); // Devolver tokens al saldo original
                              return resultadoAccion; // Devolver el error de la acción
                          }
                          if (resultadoAccion && resultadoAccion.key != null) { // Chequeo más robusto
                              return resultadoAccion;
                          } else {
                              await rollBackTokens(saldoActual, currentUserEmail); // Devolver tokens al saldo original
                              return {
                                  key: action,
                                  generated: {
                                      texto: "Oops! Fallo en la generación de contenido. Tus tokens han sido restaurados. Inténtalo de nuevo.",
                                      imagen: null
                                  }
                              };
                          }
                      } else {
                      return { key: action, generated: { texto: `Error: No se pudieron descontar los tokens ^saldoDespuesDelDescuento:${saldoDespuesDelDescuento}, currentUserEmail: ${currentUserEmail}.`, imagen: null } };
                      }
                  } else {
                      return { key: action, generated: { texto: "Saldo Insuficiente.", imagen: null } }; // Estructura consistente
                  }
              }
          }

const handleChangeTarget = () => {
  alert("change target")
}

  useEffect(() => {
    const getThisPrice = async () => {
      const responsePrice = await getPrice("generate-post");
      if (responsePrice !== null) {
        setPrice(responsePrice);
      } else {
        console.warn("MarketingContentManager: No se pudo obtener el precio para generate-post.");
      }
    };
      setSaldo(validarSaldo(currentUserEmail))
      getThisPrice();
  }, []);

  const SelectorCampanias: React.FC<any> = () =>{
    return(
    <div className="mb-1 p-6">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8 pb-4 border-b-4 border-indigo-400">
        Planificador de Contenido de Campañas Personalizadas
      </h1>
      <section>
        <div className={commonClasses.postContainer}>
        <select  className="text-2xl font-bold text-center text-gray-700 p-2 border-1 border-gray-900 rounded-lg" name="selectorDeCampanias" id="selectorDeCampanias" onChange={handelerSelectCampania}>
          <option>Selecciona una campaña para crear y publicar su contenido</option>
           {campanias?.map((campania) => (
          <option key={campania.nombre} value={campania.nombre}>{campania.nombre}</option>
           ))};
        </select>
         <button onClick={handleAddCampaniaClick} className="nav-button"> + Crear Nueva Campaña</button>
        
        
        <AddCampaniaModal
        isOpen={isAddCampaniaModalOpen}
        onClose={closeAddCampaniaModal}
        onConfirm={handelSaveCampania}
        title="Configurar Nueva Campaña"
        message={
          <>
            <p>Establece los lineamientos que harán única a esta campaña personalizada</p>
           
              <div className="mt-2 p-3 bg-gray-100 rounded">
                <p>
                  <strong>Objetivo</strong>
                  <textarea onChange={handleChange}   placeholder="Ejemplo: Vender el servicio de asesorías... o Dar a conocer nuestra promoción de Verano..."></textarea>
                </p>
                <p>
                  <input onChange={handleChange} type="checkbox" name="target-default" id="target-default" value="1" defaultChecked></input>usar Target de Negocio (<strong>{estrategia?.analisis_mercado_target.identificacion_target}</strong>)  
                  <br />o <br />

                  <strong>Definir un Target Especifico de Campaña</strong>
                  <textarea onChange={handleChange}  placeholder="Al definir un Target Especifico de Campaña aqui, reemplazará automaticamente al target de Negocio."></textarea>
                </p>
                 <p>
                  <strong>Fecha Inicio </strong>(Fecha Primera Publicacion)
                  <input onChange={handleChange}   type="date" name="fecha-inicio" id="fecha-inicio"></input>
                </p>
                 <p>
                  <strong>Diracion (Días)</strong>
                  <input onChange={handleChange}  type="number" min="5" max="30" step="5" defaultValue="5"></input> 
                </p>
              </div>
          
            <p className="mt-2 text-sm text-gray-500">Se generará una campaña completa con esta información y basado en toda la informacion del proyecto, estudio de mercado y estrategia general de marketing.</p>
          </>
        }
      />



        </div>
      </section>
    </div>     
          );
        }
  
    const handleChange = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      setInfoCampania({ ...newInfoCampania, [e.target.name]: e.target.value });
    };
  





  const getKey = (weekIndex: number, dayIndex: number) => `${weekIndex}_${dayIndex}`;
  const handleUseTokens = async (action: string, objectAction: any) => {
  const key = getKey(objectAction.week, objectAction.day);
  setGeneratingStates((prev) => new Map(prev).set(key, true));
  setPostError((prev) => new Map(prev).set(key, null));
    try {
      const exec = await useTokens(action, objectAction);
      if (exec && exec.generated) {
        if (typeof exec.generated.texto === 'string' && exec.generated.texto.startsWith("Error:")) {
          setPostError((prev) => new Map(prev).set(key, exec.generated.texto));
        } else if (exec.generated.texto === "Saldo Insuficiente.") {
          setPostError((prev) => new Map(prev).set(key, `Saldo insuficiente para generar este post.`));
        } else {
          setGeneratedPosts((prev) => {
            const newMap = new Map(prev);
            newMap.set(key, { texto: exec.generated.texto, imagen: exec.generated.imagen });
            return newMap;
          });
        }
      } else {
        setPostError((prev) => new Map(prev).set(key, "Error inesperado durante la generación del contenido."));
      }
    } catch (error: any) {
      setPostError((prev) => new Map(prev).set(key, error.message || "Error desconocido al procesar la acción."));
    } finally {
      setGeneratingStates((prev) => new Map(prev).set(key, false));
    }
  };

  if (!estrategia) {
    return (
      <div className={commonClasses.container}>
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Oops! Primero debes sentar las Bases Técnicas, Estudio de Mercado y Estrategia de Marketing general de tu proyecto. 
        </h2>
        <a href={`/mktviewer/${idProyecto}`}><button  className="button-add-item">Comenzar el Marketing WorkFlow...</button></a>
      </div>
    );
  }
  if (!campanias) {
    return (
      <div className={commonClasses.container}>
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Oops! No hay datos de campaña o planificación de contenido disponible.
        </h2>
        <button  className="button-add-item">Generar Nueva Campaña de Marketing RRSS Personalizada</button>
      </div>
    );
  }
if(selectedCampania){
  return(
<>
    <SelectorCampanias/>
    <div className="mb-1 p-6 text-center">
      <h2 className={commonClasses.sectionTitle}>{selectedCampania.nombre} </h2>
      <div className={commonClasses.postContainer}>
        <h3 className="text-xl text-center font-bold text-gray-500">Resumen Ejecutivo</h3><br></br>
        <p><strong>objetivo</strong><br></br> {selectedCampania.objetivo}</p><br></br>     
        <p><strong>target</strong><br></br> {selectedCampania.target}</p><br></br>
        <p><strong>tematica</strong><br></br> {selectedCampania.tematica}</p><br></br>
        <p><strong>duracion</strong><br></br> {selectedCampania.duracion} días</p><br></br>
        <p><strong>fecha_inicio</strong><br></br> {selectedCampania.fecha_inicio}</p><br></br>
        <p><strong>fecha_fin</strong><br></br> {selectedCampania.fecha_fin}</p><br></br>
        <p><strong>estilo_narracion</strong><br></br> {selectedCampania.definicion_arte.estilo_narracion}</p><br></br>
        <p><strong>grafica_representativa_campania</strong><br></br> {selectedCampania.definicion_arte.grafica_representativa_campania}</p><br></br>
        <p><strong>colores</strong><br></br> {selectedCampania.definicion_arte.colores}</p><br></br>

      </div>
    </div>
        
        {selectedCampania.contenido.map((semana: Semana, weekIndex: number) => (
          <div key={semana.numero} className="mb-8 p-6 bg-blue-50 rounded-lg shadow-md border border-blue-100">
            <h3 className="text-xl text-center font-bold text-blue-800 mb-3">Semana {semana.numero}</h3>
            {semana.dias.map((dia: Dia, dayIndex: number) => {
              const post = dia.post;
              const key = getKey(weekIndex, dayIndex);
              const generatedContent = generatedPosts.get(key);
              const isGenerating = generatingStates.get(key) || false;
              const currentPostError = postError.get(key);
              return (
                <div key={dia.fecha} className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 mb-4">
                  <h5 className="text-base font-semibold text-gray-900 mb-2">Información Técnica para publicación del <span className="text-md font-bold text-indigo-700 mb-2">Día: {dia.nombre} ({dia.fecha}) hora: [{post.hora}]</span></h5>
                  
<div className={commonClasses.postContainer}><p><strong>objetivo:</strong> {post.objetivo}</p></div>
<div className={commonClasses.postContainer}><p><strong>definicion_arte:</strong> {post.definicion_arte}</p></div>
<div className={commonClasses.postContainer}><p><strong>Título:</strong> {post.titulo}</p></div>
<div className={commonClasses.postContainer}><p><strong>tema:</strong> {post.tema}</p></div>
<div className={commonClasses.postContainer}><p><strong>Contenido:</strong> {post.texto}</p></div>
<div className={commonClasses.postContainer}><p><strong>CTA:</strong> {post.cta}</p></div>
<div className={commonClasses.postContainer}>{post.imagen && <p><strong>Imagen:</strong> {post.imagen}</p>}</div>
<div className={commonClasses.postContainer}><p><strong>fundamento:</strong> {post.fundamento}</p></div>
<div className={commonClasses.postContainer}><p><strong>recomendacion_creacion:</strong> {post.recomendacion_creacion}</p></div>  
<div className={commonClasses.postContainer}><p><strong>recomendacion_publicacion_seguimiento:</strong> {post.recomendacion_publicacion_seguimiento}</p></div>  
<div className={commonClasses.postContainer}><p><strong>ESTADO:</strong> {post.estado}</p></div> 

                    

                    



                  {generatedContent && (generatedContent.texto || generatedContent.imagen) && !currentPostError && (
                    <div className={commonClasses.generatedContentContainer}>
                      <h5 className="text-base font-semibold text-green-800 mb-2">Contenido Generado</h5>
                         <PublicPost 
                         texto={generatedContent.texto as string}
                         imagen={generatedContent.imagen as string}
                         timestamp={dia.fecha}
                         hora={post.hora}
                         />
                    </div>
                  )}
                  {isGenerating && (
                    <><Spinner classNames={{label: "text-foreground mt-4"}} label="wave" variant="wave" /><p className="text-purple-600 italic mt-2">Generando contenido...</p></>
                  )}
                  {currentPostError && (
                    <>
                    <p className={commonClasses.errorText}>{currentPostError}</p>
                    <a href="/dashboard"> <button className="rounded p-1 text-sm font-bold text-white bg-orange-500">conseguir TokensPack Gratis!</button></a>
                    <a href="/buytokens"> <button className="rounded p-1 text-sm font-bold text-white bg-blue-500">Recarga Tokens Aqui!</button></a>
                    </>
                  )}
                  <div className={commonClasses.buttonGroup}>
                    {status === 'authenticated' && ( // Solo mostrar el botón si la sesión está autenticada
                      <button
                        onClick={() =>
                          handleUseTokens("generate-post", { week: weekIndex, day: dayIndex, post})
                        }
                        className={`${commonClasses.buttonBase} ${commonClasses.buttonGenerate} ${
                          isGenerating || saldo === null || saldo < (price || 0) ? commonClasses.buttonDisabled : ""
                        }`}
                        disabled={isGenerating || price === null || saldo === null || saldo < (price || 0)}
                        title={
                          price === null ? "Precio no disponible" :
                          saldo === null ? "Cargando saldo..." :
                          saldo < (price || 0) ? "Saldo insuficiente" : "Generar post"
                        }
                      >
                        {isGenerating ? "Generando..." : `Generar Post  ${price !== null ? price : 'N/A'}`}
                      </button>
                    )}
                    {status === 'loading' && (
                       <><Spinner classNames={{label: "text-foreground mt-4"}} label="wave" variant="wave" /><p className="text-gray-500 italic">Cargando sesión...</p></>
                    )}
                    {status === 'unauthenticated' && (
                        <p className="text-red-500 italic">Debes iniciar sesión para generar contenido.</p>
                    )}
                  </div>
                </div>
              );
            })}
        

          </div>
        ))}
      <img src="/step6.png" className="flow-img"/>
      </>
  )
}

  return (
  <div className={commonClasses.container}>

    <SelectorCampanias/>
</div>    
  );
};
export default ContentManagerPlus;