"use client";
import { ChangeEvent, FormEvent, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import { useSession } from 'next-auth/react';
import GWV from "@/utils/GWV";

export default function AddProyectoClient() {
  const { data: session } = useSession();
  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string | null>(null);
  const [fondoPreviewUrl, setFondoPreviewUrl] = useState<string | null>(null);
  const [currentUserEmail, setCurrentUserMail] = useState<string | null>(null);

    const [postError, setPostError] = useState<Map<string, string | null>>(new Map());
  

  const [newProyecto, setNewProyecto] = useState<{
    nombre: string;
    descripcion: string;
    mision: string;
    vision: string;
    texto: string;
    frase: string;
    mail: string;
    fono: string;
    logo: string;
    fondo: string;
    user: string;
  }>({
    nombre: "",
    descripcion: "",
    mision: "",
    vision: "",
    texto: "",
    frase: "",
    mail: "",
    fono: "",
    logo: "",
    fondo: "",
    user: session?.user?.email || "",
  });


  const [userStory, setUserStory] = useState<{
    [key: string]: string;
    historia: string;
  }>({
    historia: "",
  });

  const router = useRouter();

  useEffect(() => {
    if (session?.user?.email) {
      const email = session?.user?.email as string
      setCurrentUserMail(email)
      setNewProyecto((prevProyecto) => ({
        ...prevProyecto,
        user: email,
      }));
    }
  }, [session]);

  const createProyecto = async () => {
    const res = await fetch("/api/proyecto", {
      method: "POST",
      body: JSON.stringify(newProyecto),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    router.push("/proyectos");
    console.log(data);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewProyecto({ ...newProyecto, [e.target.name]: e.target.value });
    console.log(newProyecto);
  };


  
  const handleMakeDataChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    
    setUserStory({ ...userStory, [e.target.name]: e.target.value });
    console.log(userStory);

  };

  const llenarFormulario = (data: any) => {
    
    for (const key in data) {
      const element = document.querySelector(`[name="${key}"]`) as HTMLInputElement | HTMLTextAreaElement;
      if (element && element.tagName !== 'BUTTON') {
        element.value = data[key as keyof any] || '';
      }
    }
  };
  const handleMakeData = async () => {
   const objectAction ={ item: "proyecto", maker: {user:currentUserEmail,info:userStory}}
   try {

      const exec = await useTokens("generate-proyecto", objectAction);



      if (exec && exec.generated) {

        
         //
        const thisProyecto = exec.generated as any
           setNewProyecto(thisProyecto);
            llenarFormulario(newProyecto)
            
            console.log("newProyecto");
            console.log(newProyecto);
            console.log("thisProyecto");
            console.log(thisProyecto);
      } else {

        console.error("Generando Proyecto: Error al llamar a useTokens o procesar su resultado:");


      }

    } catch (error: any) {

      console.error("MarketingContentManager: Error al llamar a useTokens o procesar su resultado:", error);

    } finally {

    }
    
    
  };

  const handleLogoUpload = (result: any, widget: any) => {
    if (result && result.info && result.info.secure_url) {
      setNewProyecto((prevData) => ({
        ...prevData!,
        logo: result.info.secure_url,
      }));
      setLogoPreviewUrl(result.info.secure_url);
      widget.close();
    }
  };

  const handleFondoUpload = (result: any, widget: any) => {
    if (result && result.info && result.info.secure_url) {
      setNewProyecto((prevData) => ({
        ...prevData!,
        fondo: result.info.secure_url,
      }));
      setFondoPreviewUrl(result.info.secure_url);
      widget.close();
    }
  };


   /* SUITE useTokens*/
  
  
  
           
            const ejecutarAccion = async (action:any, objectAction:any) =>{
  
               
                if (action === "generate-proyecto") {
  
                    try {
  
                      const url = `/api/willi`;
                      const payload = {
                        "item": "proyecto",
                        "maker": {objectAction}
                      };

                      const response = await fetch(url, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                      });
                      const responseJson = await response.json();  
                      const repuesta = { key: "proyecto", generated: responseJson}
                        return repuesta; // o { key: "estudio_key", generated: result } si es necesario adaptar
  
                    } catch (error:any) {
  
                        return { key: "proyecto_error", generated: { texto: `Error: ${error.message}` } }; // Ejemplo
  
                    }
  
                }
  
               
  
                return null; // O una estructura de error por defecto
  
            }
  
  
  
            // displayTokensModal no se usa actualmente, se podría eliminar o implementar si es necesario.
  
  
  
            // -----------------------------------------------
  
            const getPrice = async (action:any) => {
  
                if (!action) {
  
                    return null;
  
                }
  
                try {
  
                    const response = await fetch(`/api/pricing?a=${action}`); // No necesita headers ni method GET por defecto
  
                    if (!response.ok) {
  
                        const errorData = await response.json().catch(() => ({})); // Intenta parsear JSON, si falla, objeto vacío
  
                        // No usar alert aquí, mejor propagar el error o null.
  
                        return null;
  
                    }
  
                    const jsonPrice = await response.json();
  
                    return jsonPrice.price; // Asume que la API devuelve { price: X }
  
                } catch (e) {
  
                    return null;
  
                }
  
            }
  
            // -----------------------------------------------
  
  
  
            const validarSaldo = async (currentUserEmail:any) => {
  
                if (!currentUserEmail) {
  
                    return null;
  
                }
  
                try {
  
                    // El endpoint es /api/user-tokens/[email], no necesita query param 'e=' si se ajusta la API
  
                    // Asumiendo que la API está en /api/user-tokens/[email]
  
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
  
                // Esta función es esencialmente la misma que descontarTokens si la API SETea el saldo.
  
                console.log(`rollBackTokens: Restaurando saldo a ${saldoOriginal} para ${currentUserEmail}`);
  
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
  
  console.log("%%%%%%% useTokens (descuento exitoso ) resultadoAccion: %%%%%%")
  console.log(resultadoAccion)
  
                            // Verificar si la acción falló (ej. resultadoAccion.generated.texto contiene "Error:")
  
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
  
  
  
  


  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <h1>Nuevo Proyecto</h1>
        <img src="/step0.png" className="flow-img"/>
        <p>
          ¡Estamos listos para crear tus productos digitales! 🛠️ Para empezar, necesitamos conocer a fondo tu
          emprendimiento. Completa este formulario con toda la información clave. ¡Esta será la base para construir
          poderosas herramientas digitales impulsadas con IA para tu negocio!
        </p>
        
        <h2>Si aun no tienes esta informacion no pasa nada, cuentale tu historia a Willi, y él se encargara de crearla de manera profesional y optimizada con el boton de mas abajo.</h2>
        <textarea  onChange={handleMakeDataChange} name="historia" placeholder="Comenzando con el nombre de tu proyecto, agrega aqui todo lo que puedas decir sobre tu proyecto, no importa el formato de redaccion, solo trata de agregar la mayor cantidad de informacion posible que defina tu idea."></textarea>
        <input onClick={handleMakeData} type="button" className="boton-crear-proyecto" value="Willi, Ayudame a redactar mi proyecto!" />

<hr />
        <h2> O Si ya tienes clara toda esta información completa el formulario de abajo [Recomendado]</h2>

        <input onChange={handleChange} name="nombre" type="text" placeholder="Nombre del Proyecto" />
        <textarea onChange={handleChange} name="descripcion" placeholder="Descripción breve"></textarea>
        <textarea onChange={handleChange} name="mision" placeholder="Mision"></textarea>
        <textarea onChange={handleChange} name="vision" placeholder="Vision"></textarea>

        <textarea onChange={handleChange} name="texto" placeholder="Texto Atractivo Principal"></textarea>
        <input onChange={handleChange} name="frase" type="text" placeholder="Frase Corta Descriptiva" />
        <input onChange={handleChange} name="mail" type="email" placeholder="Correo Electrónico de Contacto" />
        <input onChange={handleChange} name="fono" type="text" placeholder="Número de Teléfono" />
      </form>
      <CldUploadWidget uploadPreset="ewavepack" onSuccess={handleLogoUpload}>
        {({ open }) => {
          const handleOpenLogoWidget = useCallback(() => {
            open();
          }, [open]);
          return (
            <button className="upload-button" name="logo" onClick={handleOpenLogoWidget}>
              Carga la imagen del Logotipo
            </button>
          );
        }}
      </CldUploadWidget>
      {logoPreviewUrl && (
        <div>
          <p>Vista previa del Logo:</p>
          <img src={logoPreviewUrl} alt="Vista previa del logo" style={{ maxWidth: "100px", maxHeight: "100px" }} />
        </div>
      )}
      <CldUploadWidget uploadPreset="ewavepack" onSuccess={handleFondoUpload}>
        {({ open }) => {
          const handleOpenFondoWidget = useCallback(() => {
            open();
          }, [open]);
          return (
            <button className="upload-button" name="fondo" onClick={handleOpenFondoWidget}>
              Carga el fondo de la eWebApp
            </button>
          );
        }}
      </CldUploadWidget>
      {fondoPreviewUrl && (
        <div>
          <p>Vista previa del Fondo:</p>
          <img src={fondoPreviewUrl} alt="Vista previa del fondo" style={{ maxWidth: "100px", maxHeight: "100px" }} />
        </div>
      )}
      <hr />
      <div className="btncancelar">
        <a href="/proyectos">
          <input type="button" className="boton-cancelar" value="Cancelar" />
        </a>
      </div>
      <div className="btnfinalizar">
        <input type="button" onClick={createProyecto} className="boton-crear-proyecto" value="Guardar" />
      </div>
    </div>
  );
}