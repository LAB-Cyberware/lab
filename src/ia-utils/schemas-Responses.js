const schemaProyecto = {
  type: "object",
  properties: {
    nombre: {
      type: "string",
      description: "El nombre identificativo del proyecto.",
      minLength: 1 // Asumiendo que required implica al menos 1 caracter
    },
    descripcion: {
      type: "string",
      description: "Descripción detallada del proyecto.",
      minLength: 1
    },
    mision: {
      type: "string",
      description: "Declaración de la misión del proyecto.",
      minLength: 1
    },
    vision: {
      type: "string",
      description: "Declaración de la visión del proyecto.",
      minLength: 1
    },
    logo: {
      type: "string",
      description: "URL o identificador del logo del proyecto.",
      minLength: 1
    },
    texto: {
      type: "string",
      description: "Contenido de texto principal del proyecto.",
      minLength: 1
    },
    frase: {
      type: "string",
      description: "Frase o eslogan del proyecto.",
      minLength: 1
    },
    fondo: {
      type: "string",
      description: "URL o identificador del fondo de la eWaveApp del proyecto.",
      minLength: 1
    },
    user: {
      type: "string",
      description: "Identificador del usuario propietario del proyecto.",
      minLength: 1
    },
    fono: {
      type: "string",
      description: "Número de teléfono de contacto del proyecto.",
      minLength: 1
    },
    mail: {
      type: "string",
      description: "Correo electrónico de contacto del proyecto.",
      format: "email", // Agregamos un formato de email para mejor validación
      minLength: 1
    }
  },
  required: [
    "nombre",
    "descripcion",
    "mision",
    "vision",
    "logo",
    "texto",
    "frase",
    "fondo",
    "user",
    "fono",
    "mail"
  ],
  additionalProperties: false // Opcional: prohíbe propiedades no definidas en el esquema
};

const schemaEstudioMercado = {
    id_proyecto: {
    type: "string",
    description: "valor de _id en INFORMACION PROYECTO"
    },
    resumen_competitivo: {
    type: "string",
    description: "Resumen de las principales tendencias y la intensidad de la competencia."
    },
    tendencias_clave_mercado: {
    type: "array",
    items: {
        type: "object",
        properties: {
        nombre: {
            type: "string",
            description: "Nombre de la tendencia."
        },
        descripcion: {
            type: "string",
            description: "Descripción de la tendencia."
        },
        relevancia: {
            type: "string",
            description: "Relevancia para el proyecto."
        }
        },
        required: ["nombre", "descripcion", "relevancia"]
    },
    description: "Tendencias clave identificadas en el mercado."
    },
    oportunidades_principales: {
    type: "array",
    items: {
        type: "object",
        properties: {
        nombre: {
            type: "string",
            description: "Nombre de la oportunidad."
        },
        descripcion: {
            type: "string",
            description: "Descripción de la oportunidad."
        },
        alineacion: {
            type: "string",
            description: "Cómo se alinea con el proyecto."
        }
        },
        required: ["nombre", "descripcion", "alineacion"]
    },
    description: "Principales oportunidades identificadas para el proyecto."
    },
    desafios_clave: {
    type: "array",
    items: {
        type: "object",
        properties: {
        nombre: {
            type: "string",
            description: "Nombre del desafío."
        },
        descripcion: {
            type: "string",
            description: "Descripción del desafío."
        }
        },
        required: ["nombre", "descripcion"]
    },
    description: "Desafíos clave identificados para el proyecto."
    },
    target_objetivo: {
    type: "string",
    description: "Definicion de targets principales basados en el análisis."
    },
    recomendaciones_iniciales: {
    type: "string",
    description: "Recomendaciones iniciales basadas en el análisis."
    }
}

const schemaEstrategiaMarketing = {
  id_proyecto: {
    type: "string",
    description: "valor de _id en INFORMACION PROYECTO"
  },
  title: "Estrategia General de Marketing - Modo EPIC",
  description: "Esquema para definir una estrategia de marketing integral bajo el modo operativo EPIC, con enfoque en proyectos específicos y el uso de etiquetas contextuales.",
  type: "object",
  properties: {
    id_proyecto: {
      type: "string",
      description: "valor de _id en INFORMACION PROYECTO"
    },
    nombre_estrategia: {
      type: "string",
      description: "Nombre identificativo de la estrategia de marketing (ej. 'Estrategia General de marketing para la marca del proyecto').",
      minLength: 3,
      maxLength: 200
    },
    objetivos_generales: {
      type: "array",
      description: "Lista de los objetivos principales de la estrategia. No puede estar vacía.",
      items: {
        type: "object",
        properties: {
          nombre: {
            type: "string",
            description: "Nombre corto del objetivo (ej. 'Conciencia de Marca').",
            maxLength: 100
          },
          descripcion: {
            type: "string",
            description: "Descripción detallada del objetivo.",
            maxLength: 500
          },
          metricas_clave: {
            type: "array",
            description: "Métricas clave para medir el éxito del objetivo.",
            items: {
              type: "string"
            },
            minItems: 1
          }
        },
        required: [
          "nombre",
          "descripcion",
          "metricas_clave"
        ]
      },
      minItems: 1
    },
    analisis_mercado_target: {
      type: "object",
      description: "Sección que describe la base del análisis de mercado y la identificación del público objetivo.",
      properties: {
        base_estudio_mercado: {
          type: "string",
          description: "Referencia a los hallazgos del #ESTUDIO_MERCADO#.",
          maxLength: 250
        },
        identificacion_target: {
          type: "string",
          description: "Referencia a la definición del #TARGET#.",
          maxLength: 250
        }
      },
      required: [
        "base_estudio_mercado",
        "identificacion_target"
      ]
    },
    pilares_estrategicos: {
      type: "array",
      description: "Principios fundamentales sobre los que se construye la estrategia. No puede estar vacío.",
      items: {
        type: "object",
        properties: {
          nombre: {
            type: "string",
            description: "Nombre del pilar estratégico.",
            maxLength: 100
          },
          descripcion: {
            type: "string",
            description: "Descripción del pilar.",
            maxLength: 500
          },
          canales_principales: {
            type: "array",
            description: "Canales principales asociados a este pilar.",
            items: {
              type: "string"
            },
            minItems: 1
          }
        },
        required: [
          "nombre",
          "descripcion",
          "canales_principales"
        ]
      },
      minItems: 1
    },
    canales_y_tacticas_iniciales: {
      type: "array",
      description: "Listado de canales de marketing y las tácticas iniciales a implementar en cada uno. No puede estar vacío.",
      items: {
        type: "object",
        properties: {
          canal: {
            type: "string",
            description: "Nombre del canal de marketing (ej. 'Web App', 'Redes Sociales').",
            maxLength: 100
          },
          tacticas: {
            type: "array",
            description: "Lista de tácticas específicas para ese canal.",
            items: {
              type: "string"
            },
            minItems: 1
          }
        },
        required: [
          "canal",
          "tacticas"
        ]
      },
      minItems: 1
    },
    plan_de_accion_fase_1: {
      type: "array",
      description: "Cronograma detallado de las primeras acciones de la estrategia. No puede estar vacío.",
      items: {
        type: "object",
        properties: {
          dia: {
            type: "string",
            description: "Día y semana de la acción (ej. 'Día 1, Semana 1').",
            maxLength: 50
          },
          descripcion: {
            type: "string",
            description: "Descripción de la acción a realizar.",
            maxLength: 500
          },
          responsable: {
            type: "string",
            description: "Equipo o rol responsable de la acción.",
            maxLength: 100
          }
        },
        required: [
          "dia",
          "descripcion",
          "responsable"
        ]
      },
      minItems: 1
    },
    consideraciones_adicionales: {
      type: "array",
      description: "Notas o puntos importantes adicionales a tener en cuenta para la estrategia. Puede estar vacío.",
      items: {
        type: "string"
      }
    }
  },
  required: [
    "id_proyecto",
    "nombre_estrategia",
    "objetivos_generales",
    "analisis_mercado_target",
    "pilares_estrategicos",
    "canales_y_tacticas_iniciales",
    "plan_de_accion_fase_1",
    "consideraciones_adicionales"
  ]
};

const schemaCampaniaMarketing = {
  id_proyecto: {
    type: "string",
    description: "valor de _id en INFORMACION PROYECTO",
    minLength: 1 // Asegura que no sea una cadena vacía
  },
  nombre: {
    type: "string",
    description: "Nombre identificativo de la campaña.",
    minLength: 3,
    maxLength: 200
  },
  objetivo: {
    type: "string",
    description: "Objetivo principal y medible de la campaña.",
    minLength: 3,
    maxLength: 500
  },
  target: {
    type: "string",
    description: "Descripción del público objetivo de la campaña.",
    minLength: 3,
    maxLength: 500
  },
  tematica: {
    type: "string",
    description: "Tema central o eje conceptual de la campaña.",
    minLength: 3,
    maxLength: 200
  },
  definicion_arte: {
    type: "object",
    description: "Define el estilo visual y narrativo de la campaña.",
    properties: {
      estilo_narracion: {
        type: "string",
        description: "Estilo de la narrativa de la campaña (ej. emotivo, informativo, humorístico).",
        minLength: 1,
        maxLength: 250
      },
      colores: {
        type: "string",
        description: "Paleta de colores principal de la campaña (ej. 'RGB: 255,0,0; CMYK: 0,100,100,0').",
        minLength: 1,
        maxLength: 150
      },
      grafica_representativa_campania: {
        type: "string",
        description: "Descripción de un elemento visual representativo de la campaña que pueda ser utilizado en cualquier creacion, como un ornamento, un efecto, o algun juego de vectores con los colores de la campania.",
        minLength: 1,
        maxLength: 500
      }
    },
    required: ["estilo_narracion", "colores", "grafica_representativa_campania"]
  },
  duracion: {
    type: "number",
    description: "Duración total de la campaña en días.",
    minimum: 1
  },
  fecha_inicio: {
    type: "string",
    format: "date",
    description: "Fecha de inicio de la campaña (YYYY-MM-DD)."
  },
  fecha_fin: {
    type: "string",
    format: "date",
    description: "Fecha de fin de la campaña (YYYY-MM-DD)."
  },
  contenido: {
    type: "array",
    description: "Array de objetos que representan las semanas de contenido de la campaña.",
    items: {
      type: "object",
      properties: {
        numero: {
          type: "number",
          description: "Número de la semana dentro de la campaña.",
          minimum: 1
        },
        dias: {
          type: "array",
          description: "Array de objetos que representan los días de contenido de la semana.",
          items: {
            type: "object",
            properties: {
              nombre: {
                type: "string",
                description: "Nombre del día de la semana (ej. 'Lunes', 'Martes').",
                minLength: 1,
                maxLength: 50
              },
              fecha: {
                type: "string",
                format: "date",
                description: "Fecha específica del día (YYYY-MM-DD)."
              },
              post: {
                type: "object",
                description: "Objeto que describe un post individual.",
                properties: {
                  objetivo: {
                    type: "string",
                    description: "Objetivo específico de este post.",
                    minLength: 3,
                    maxLength: 300
                  },
                  definicion_arte: {
                    type: "string",
                    description: "todo el objeto definicion de arte de la campania redactado en este parametro como un parrafo, todos los post deben tener el mismo valor en este parametro.",
                    minLength: 10,
                    maxLength: 1000
                  },
                  titulo: {
                    type: "string",
                    description: "Título del post.",
                    minLength: 3,
                    maxLength: 200
                  },
                  tema: {
                    type: "string",
                    description: "Tema principal del post.",
                    minLength: 3,
                    maxLength: 200
                  },
                  texto: {
                    type: "string",
                    description: "Texto concreto del el post, debe contener toda la informacion necesaria para cumplir con el objetivo del post, por ejemplo si se deben destacar funcionalidades o caracteristicas de algun producto o servicio estas debes estar literalmente expuestas en este parametro.",
                    minLength: 10,
                    maxLength: 2000
                  },
                  cta: {
                    type: "string",
                    description: "Llamado a la accion.",
                    minLength: 3,
                    maxLength: 150
                  },
                  imagen: {
                    type: "string",
                    description: "Descripción de la imagen representativa propuesta para el post.",
                    minLength: 3,
                    maxLength: 500
                  },
                  hora: {
                    type: "string",
                    format: "time",
                    description: "Hora de publicación del post (HH:MM).",
                    pattern: "^([01]\\d|2[0-3]):([0-5]\\d)$" // Regex para HH:MM
                  },
                  canal: {
                    type: "string",
                    description: "Canal de publicación del post (ej. 'Instagram', 'Blog', 'Facebook').",
                    minLength: 1,
                    maxLength: 100
                  },
                  estado: {
                    type: "string",
                    description: "Estado actual del post (ej. 'Pendiente', 'Publicado', 'Revisión').",
                    minLength: 1,
                    maxLength: 50
                  },
                  fundamento: {
                    type: "string",
                    description: "Justificación o razón de ser del post.",
                    minLength: 3,
                    maxLength: 500
                  },
                  recomendacion_creacion: {
                    type: "string",
                    description: "Recomendaciones específicas para la creación del contenido del post.",
                    minLength: 3,
                    maxLength: 1000
                  },
                  recomendacion_publicacion_seguimiento: {
                    type: "string",
                    description: "Recomendaciones para la publicación y el seguimiento posterior del post.",
                    minLength: 3,
                    maxLength: 1000
                  }
                },
                required: [
                  "objetivo",
                  "definicion_arte",
                  "titulo",
                  "tema",
                  "texto",
                  "cta", // Asegurado que cta sea requerido también en JSON
                  "imagen",
                  "hora",
                  "canal",
                  "estado",
                  "fundamento",
                  "recomendacion_creacion",
                  "recomendacion_publicacion_seguimiento"
                ]
              }
            },
            required: ["nombre", "fecha", "post"]
          },
          minItems: 1 // Los días dentro de una semana no pueden estar vacíos
        }
      },
      required: ["numero", "dias"]
    },
    minItems: 1 // Las semanas de contenido no pueden estar vacías
  }
};
    const schemaPostFinal = {
      texto: "Texto definitivo para publicar en redes sociales, incluye CTA y hashtags"
    }
    const schemaPostFinalImg = {
      imagen: "Imagen codificada en base64"
    }
  

export { schemaEstudioMercado, schemaEstrategiaMarketing, schemaCampaniaMarketing, schemaPostFinal, schemaPostFinalImg, schemaProyecto };