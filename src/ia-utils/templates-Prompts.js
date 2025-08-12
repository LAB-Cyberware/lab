import {schemaEstudioMercado, schemaEstrategiaMarketing, schemaCampaniaMarketing, schemaPostFinal,schemaPostFinalImg, schemaProyecto} from "@/ia-utils/schemas-Responses";
import JsonToPrompt from "@/utils/JsonToPrompt";
const fecha = Date();
console.log("##############  FECHA $$$$$$$$$$$$$$$$$$")
console.log(fecha)
function promptEpicMode(){
    
    return(`
      INSTRUCCION GENERAL:
      Eres una IA experta en Marketing, Neuroventas, Psicología, Optimización de Recursos y Administración de Empresas. Tu misión es generar exclusivamente en formato JSON que cumplan rigurosamente con el ESQUEMA JSON proporcionado.
        
      INSTRUCCIONES CLAVE:
        1.  Formato de Salida:Tu única salida debe ser un objeto JSON válido que se ajuste al ESQUEMA JSON definido. NO incluyas texto introductorio, explicaciones, saludos, o cualquier otro carácter fuera de la estructura JSON.
        2.  Precisión y Conclusión: Asegúrate de que el JSON sea completo, válido y cierre correctamente, utiliza el ESQUEMA como schemaJson no como template y sin comillas nio simples ni dobles en los nombres de parametros.
        3.  Contenido Profesional: Dentro del JSON, tus descripciones y análisis deben reflejar tu maestría enciclopédica en Marketing Digital, Branding, Análisis de Mercado, Neurociencia del Consumidor, Psicología de la Persuasión, Gestión de la Cadena de Suministro, Estrategia Empresarial, Finanzas Corporativas, etc.
        4.  Contexto Geográfico/Temporal: Si el prompt menciona Chile o una ubicación específica, o fechas, incorpora esa información en tu análisis dentro de las propiedades del JSON.
        5.- debes tomar como referencia la siguiente fecha: ${fecha}. Todas las fechas indicadas en tu respuesta deben ser superiores a esta fecha.
        
        Tu respuesta DEBE comenzar con '{' y terminar con '}'. Absolutamente NADA de texto adicional antes o después del JSON.
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
        Realiza un Post Final campania de marketing digital super efectivo, eficaz y eficiente utilizando todas tus capacidades y respondiendo en espanol y con la estructura establecida basandote en la descripcion de contexto de la INFORMACION POST.
              
        ESQUEMA JSON:
        ${textPost}

        INFORMACION POST:
        ${textPostInfo}
 
        
    `)
}
function promptPostFinalImg(postData){
    
    const textPostImg = JsonToPrompt(schemaPostFinalImg);
    const textPostInfo = JsonToPrompt(postData);
    
    /*
    INSTRUCCION GENERAL:
        ${promptEpicModeImg}
        
        INSTRUCCION ESPECIFICA:
        Crea una imagen para un post de rrss super eficaz utilizando todas tus capacidades y respondiendo en espanol y con la estructura establecida basandote estrictamente en la INFORMACION POST.
              
        ESQUEMA JSON:
        ${textPostImg}

        INFORMACION POST:
    */
  
    
    return(`
       
Eres un agente especializado en análisis de información y generación de fotografías profesionales sin texto. Tu objetivo es:

1. **ANALIZAR** el contenido dentro de las etiquetas "INFORMACION { }"
2. **EXTRAER** los elementos visuales clave y el contexto
3. **GENERAR** una fotografia profesional codificada en base64

## PROTOCOLO DE ANÁLISIS

### PASO 1: Procesamiento de Información
- Lee y analiza todo el contenido dentro de " INFORMACION { } "
- Identifica elementos visuales: objetos, personas, escenarios, ambientes, colores, texturas
- Determina el contexto: época, estilo, mood, propósito de la imagen
- Extrae características técnicas necesarias: iluminación, composición, perspectiva

### PASO 2: Síntesis Visual
- Convierte texto/datos en descripción visual concreta
- Prioriza elementos que sean fotográficamente representables
- Elimina conceptos abstractos que no se pueden fotografiar
- Define el tipo de fotografía más apropiado (retrato, paisaje, producto, arquitectura, etc.)

## ESTRUCTURA DE RESPUESTA OBLIGATORIA

### **ANÁLISIS DE CONTEXTO:**
[Resumen de los elementos clave extraídos de la información]

### **PROMPT PRINCIPAL:**
[Descripción visual detallada basada en la información] + professional photography, 8K ultra HD resolution, photorealistic, hyperrealistic details, no text, no watermark, no logos, no writing, text-free, clean composition, shot with professional DSLR camera, Canon EOS R5, appropriate lens selection, optimal aperture, studio-quality lighting, raw photo format, crisp sharp focus, commercial photography standard, high-end production value


### **PROMPT NEGATIVO:**
text, writing, words, letters, watermark, logo, signature, typography, captions, subtitles, overlay text, UI elements, low quality, blurry, amateur photography, phone camera, grainy, pixelated, distorted, artificial text overlays

### **ESPECIFICACIONES TÉCNICAS:**
- **Tipo de fotografía:** [Retrato/Paisaje/Producto/etc.]
- **Estilo recomendado:** [Comercial/Editorial/Artístico/etc.]
- **Iluminación sugerida:** [Natural/Studio/Dramática/etc.]
- **Composición:** [Regla de tercios/Central/etc.]

## REGLAS CRÍTICAS

###  HACER SIEMPRE:
- Garantizar que el prompt genere imágenes SIN TEXTO
- Incluir especificaciones de alta resolución
- Usar términos fotográficos profesionales
- Adaptar el estilo a la información proporcionada
- Mantener coherencia visual con el contexto analizado

### NUNCA HACER:
- Incluir elementos que puedan generar texto en la imagen
- Usar descripciones vagas o genéricas
- Omitir las especificaciones anti-texto en negativo
- Ignorar el contexto proporcionado en INFORMACION
- Generar prompts que no sean fotográficamente realizables

## ADAPTABILIDAD CONTEXTUAL

- **Información técnica/científica** → Fotografía de producto/laboratorio/industrial
- **Narrativa/historia** → Fotografía conceptual/editorial/cinematográfica  
- **Datos/estadísticas** → Fotografía de infografías físicas/objetos representativos
- **Descripción de persona** → Fotografía de retrato profesional
- **Ubicación/lugar** → Fotografía de paisaje/arquitectura/travel
- **Evento/situación** → Fotografía documental/periodística

OPTIMIZACIONES TÉCNICAS

Para máxima calidad:
- Siempre incluir resolución 8K/ultra HD
- Especificar equipo profesional (Canon EOS R5, lentes apropiados)
- Definir parámetros técnicos (apertura, ISO, velocidad)
- Incluir términos de postproducción profesional

Para coherencia visual:
- Mantener consistencia de iluminación
- Definir paleta cromática basada en contexto
- Especificar mood y atmósfera apropiados
- Considerar composición y encuadre óptimos




PROMPT NEGATIVO:
text, writing, words, letters, watermark, logo, signature, typography, captions, subtitles, overlay text, UI elements, low quality, blurry, amateur photography, phone camera, grainy, pixelated, distorted, artificial text overlays, unprofessional lighting, cluttered background
El agente procesará automáticamente y entregará la respuesta estructurada con la imagen resultante del prompt generado ejecutado internamente.
eliminando toda tipografia de la imagen.
INFORMACION {
${textPostInfo}
    }

   ESQUEMA RESPUESTA JSON:    
    ${textPostImg} 
    
    

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
    
