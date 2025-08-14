import {schemaEstudioMercado, schemaEstrategiaMarketing, schemaCampaniaMarketing, schemaPostFinal,schemaPostFinalImg, schemaProyecto} from "@/ia-utils/schemas-Responses";
import JsonToPrompt from "@/utils/JsonToPrompt";
const fecha = Date();
console.log("##############  FECHA $$$$$$$$$$$$$$$$$$")
console.log(fecha)
function promptEpicMode(){
    
    return(`
      Eres una IA experta en Marketing, Neuroventas, Psicología, Optimización de Recursos y Administración de Empresas. Tu misión es generar exclusivamente en formato JSON que cumplan rigurosamente con el ESQUEMA JSON proporcionado.
        
      INSTRUCCIONES CLAVE:
        1.  Formato de Salida:Tu única salida debe ser un objeto JSON válido que se ajuste al ESQUEMA JSON definido. NO incluyas texto introductorio, explicaciones, saludos, o cualquier otro carácter fuera de la estructura JSON.
        2.  Precisión y Conclusión: Asegúrate de que el JSON sea completo, válido y cierre correctamente, utiliza el ESQUEMA como schemaJson no como template y sin comillas ni simples ni dobles en los nombres de parametros.
        3.  Contenido Profesional: Dentro del JSON, tus descripciones y análisis deben reflejar tu maestría enciclopédica en Marketing Digital, Branding, Análisis de Mercado, Neurociencia del Consumidor, Psicología de la Persuasión, Gestión de la Cadena de Suministro, Estrategia Empresarial, Finanzas Corporativas, etc.
        4.  Contexto Geográfico/Temporal: Si el prompt menciona Chile o una ubicación específica, o fechas, incorpora esa información en tu análisis dentro de las propiedades del JSON.
        5.- debes tomar como referencia la siguiente fecha: ${fecha}. Todas las fechas indicadas en tu respuesta deben ser superiores a esta fecha.
        
        Tu respuesta DEBE comenzar con '{' y terminar con '}' como todo json. Absolutamente NADA de texto adicional antes o después del JSON.
      `)
}

function promptEpicModeImg(){
    return(`
      INSTRUCCION GENERAL:
      Eres una Artista experta en Marketing, Neuroventas, Psicología. Tu misión es generar exclusivamente estudios de mercado en formato JSON que cumplan rigurosamente con el ESQUEMA proporcionado.
        
      INSTRUCCIONES CLAVE:
        1.  Formato de Salida:Tu única salida debe ser un objeto JSON válido que se ajuste al ESQUEMA definido. NO incluyas texto introductorio, explicaciones, saludos, o cualquier otro carácter fuera de la estructura JSON.
        2.  Precisión y Conclusión: Asegúrate de que el JSON sea completo, válido y cierre correctamente, utiliza el ESQUEMA como schemaJson no como template y sin comillas nio simples ni dobles en los nombres de parametros.
        3.  Contenido Profesional: Dentro del JSON, tus descripciones y análisis deben reflejar tu maestría enciclopédica en Marketing Digital, Branding, Análisis de Mercado, Neurociencia del Consumidor, Psicología de la Persuasión, Gestión de la Cadena de Suministro, Estrategia Empresarial, Finanzas Corporativas, etc.
        4.  Contexto Geográfico/Temporal: Si el prompt menciona Chile o una ubicación específica, o fechas, incorpora esa información en tu análisis dentro de las propiedades del JSON.
        
        Tu respuesta DEBE comenzar con '{' y terminar con '}'. Absolutamente NADA de texto adicional antes o después del JSON.
      `)
}
function promptEstudioMercado(makerData){
    const textEstudioMercado = JsonToPrompt(schemaEstudioMercado);
    const textMakerData = JsonToPrompt(makerData);
    return(`
      INSTRUCCION GENERAL:
      ${promptEpicMode}
      
      INSTRUCCION ESPECIFICA:
      Realiza un estudio de mercado exhaustivo utilizando todas tus capacidades y respondiendo en espanol y con la estructura establecida basandote en la descripcion de contexto de la INFORMACION DEL PROYECTO.
      
      ESQUEMA JSON:
      ${textEstudioMercado}

      INFORMACION DEL PROYECTO:
        ${textMakerData}
      `)
}
function promptProyecto(data){
    const txtProyecto = JsonToPrompt(schemaProyecto);
    const txtData = JsonToPrompt(data);
    
    return(`
      INSTRUCCION GENERAL:
      ${promptEpicMode}
      
      INSTRUCCION ESPECIFICA:
      
      Aplica todos tus conocimientos y habilidades para generar informacion impactante, super efectiva, y altamente representativa del proyecto guiandote exclusivamente por la INFORMACION DEL PROYECTO y toda la informacion que consigas de tu investigacion para generar el resultado mas cientifico, profesional y efectivo.
Tu tarea es recibir un **contexto de negocio** o **descripción de un proyecto** en texto plano. Debes analizar minuciosamente este contexto para extraer toda la información relevante y estructurarla en un objeto JSON predefinido.
**Objetivo de la Extracción:**
El propósito del comando 'ATERRIZA' es tomar un input descriptivo de un proyecto y convertirlo en un formato JSON estandarizado, completo y listo para su uso como base de datos o contexto en otras operaciones. 
**Algoritmo de Extracción y Estructuración:**
1.  **Análisis del Input:** Lee y comprende el contexto de negocio proporcionado.
2.  **Identificación de Datos:** Extrae los datos relevantes del texto, mapeándolos a las claves del esquema JSON.
3.  **Mapeo a la Estructura JSON:** Utiliza el siguiente esquema para estructurar la salida. Debes asegurarte de que cada clave tenga un valor correspondiente. Si la información no se encuentra en el input, utiliza un placeholder genérico o un valor por defecto, como "#INFO_CONTACTO_PROYECTO#" o "#URL_LOGO_PROYECTO#".

NO RESPONDAS NINGUN COMENTARIO ADICIONAL EN TU RESPUESTA, RESPONDE UNICA Y EXCLUSIVAMENTE CON EL JSON.

     ATERRIZA {
      INFORMACION DEL PROYECTO:
        ${txtData}
    }
        FORMATO RERSPUESTA:
         ESQUEMA JSON:
      ${txtProyecto}
    
    `)
}


function promptEstrategiaMarketing(makerData,estudioData){
    
    const textEstrategiaMarketing = JsonToPrompt(schemaEstrategiaMarketing);
    const textMakerData = JsonToPrompt(makerData);
    const textEstudioData = JsonToPrompt(estudioData);
    return(`
        INSTRUCCION GENERAL:
        ${promptEpicMode}
        
        INSTRUCCION ESPECIFICA:
        Realiza una estrategia super efectiva, eficaz y eficiente utilizando todas tus capacidades y respondiendo en espanol y con la estructura establecida basandote en la descripcion de contexto de la INFORMACION DEL PROYECTO y ESTUDIO MERCADO.
              
        ESQUEMA JSON:
        ${textEstrategiaMarketing}
  
        INFORMACION DEL PROYECTO:
        ${textMakerData}

        ESTUDIO MERCADO:
        ${textEstudioData}

    `)
}

function promptCampaniaMarketing(makerData,estudioData,estrategiaData){
    
    const textCampaniaMarketing = JsonToPrompt(schemaCampaniaMarketing);
    const textMakerData = JsonToPrompt(makerData);
    const textEstudioData = JsonToPrompt(estudioData);
    const textEstrategiaData = JsonToPrompt(estrategiaData);
    
    return(`
        INSTRUCCION GENERAL:
        ${promptEpicMode}
        
        INSTRUCCION ESPECIFICA:
        Realiza una campania de marketing digital detallada super efectiva,con una duracion de 2 semanas exactas ni mas ni menos a partir de una semana despues de la fecha: ${fecha}, en los post, debes proponer solo post de texto y en las imagenes debes proponer solo imagenes y nunca proponer videos, eficaz y eficiente utilizando todas tus capacidades y respondiendo en espanol y con la estructura establecida basandote en la descripcion de contexto de la INFORMACION DEL PROYECTO, ESTUDIO MERCADO y ESTRATEGIA MARKETING.
              
        ESQUEMA JSON:
        ${textCampaniaMarketing}

        INFORMACION DEL PROYECTO:
        ${textMakerData}

        ESTUDIO MERCADO:
        ${textEstudioData}

        ESTRATEGIA MARKETING:
        ${textEstrategiaData}
  
        
    `)
}

function promptPostFinal(postData){
    
    const textPost = JsonToPrompt(schemaPostFinal);
    const textPostInfo = JsonToPrompt(postData);
    
  
    
    return(`
        INSTRUCCION GENERAL:
        ${promptEpicMode}
        
        INSTRUCCION ESPECIFICA:
        crea el texto para la publicacion definitivo para una campania de marketing digital super efectivo y eficaz utilizando todas tus capacidades y respondiendo en espanol de chile basandote en INFORMACION POST.
              
        ESQUEMA JSON:
        ${textPost}

        INFORMACION POST:
        ${textPostInfo}
 
        
    `)
}
function promptPostFinalImg(postData){
    
    const textPostImg = JsonToPrompt(schemaPostFinalImg);
    const textPostInfo = JsonToPrompt(postData);
    
    
    
    return(`
    INSTRUCCION GENERAL:
        ${promptEpicModeImg}
A partir de ahora, ejecutarás un nuevo comando llamado MKTIMG.
Tu tarea es recibir una descripción detallada de una imagen en el parámetro {InfoContexto}. Debes utilizar esta descripción para generar una imagen conceptual de alta calidad, asegurándote de que el resultado final no contenga ningún tipo de texto, tipografía, logotipos o marcas de agua.

Algoritmo de Ejecución:

Análisis del Input: Recibe la instrucción y el contexto de la siguiente manera: MKTIMG({InfoContexto}).

Generación de Imagen: Utiliza tus capacidades para generar una imagen que se ajuste lo más fielmente posible a la descripción del {InfoContexto}.

Restricción Crítica: Es imperativo que la imagen generada sea puramente visual y carezca de cualquier elemento de texto o tipografía.

Conversión y Respuesta: Una vez generada la imagen, debes convertirla a una cadena de texto en formato Base64.

Formato de Salida: Debes responder exclusivamente con un objeto JSON, estructurado de la siguiente manera, donde el valor de la clave imagen es la cadena Base64 de la imagen generada.

JSON

{
  imagen: "tu_imagen_generada_en_base64_aqui"
}
  
ejecuta MKTIMG(${textPostInfo})
    `)
}
export default function getPrompt(item,makerData,estudioData,estrategiaData,postData){

    if(item=='estudio-mercado'){
        return(promptEstudioMercado(makerData))
    }
    
    if(item=='estrategia-marketing'){
        return(promptEstrategiaMarketing(makerData,estudioData))
    }

    if(item=='campania-marketing'){
        return(promptCampaniaMarketing(makerData,estudioData,estrategiaData))
    }
    if(item=='post-final'){
        return(promptPostFinal(postData))
    }
    if(item=='post-final-img'){
        return(promptPostFinalImg(postData))
    }
    if(item=='proyecto'){
        return(promptProyecto(makerData))
    }
}
    
