import {Schema, model, models} from 'mongoose';

// --- Sub-esquemas para los tipos anidados ---

// Esquema para ObjetivoGeneral
const ObjetivoGeneralSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre del objetivo es requerido."],
    trim: true,
    maxlength: [100, "El nombre del objetivo no puede exceder los 100 caracteres."]
  },
  descripcion: {
    type: String,
    required: [true, "La descripción del objetivo es requerida."],
    trim: true,
    maxlength: [500, "La descripción del objetivo no puede exceder los 500 caracteres."]
  },
  metricas_clave: {
    type: [String], // Array de strings
    default: [],
    // Validación para asegurar que el array de métricas clave no esté vacío si hay elementos
    validate: {
      validator: (v: string[]) => Array.isArray(v) && v.length > 0,
      message: 'Las métricas clave deben ser un array de strings y no puede estar vacío.'
    },
    required: [true, "Las métricas clave son requeridas y no pueden estar vacías."]
  }
}); // Eliminado _id: false

// Esquema para AnalisisMercadoTarget
const AnalisisMercadoTargetSchema = new Schema({
  base_estudio_mercado: {
    type: String,
    required: [true, "La referencia al estudio de mercado es requerida."],
    trim: true,
    maxlength: [250, "La referencia al estudio de mercado no puede exceder los 250 caracteres."]
  },
  identificacion_target: {
    type: String,
    required: [true, "La identificación del target es requerida."],
    trim: true,
    maxlength: [250, "La identificación del target no puede exceder los 250 caracteres."]
  }
}); // Eliminado _id: false

// Esquema para PilarEstrategico
const PilarEstrategicoSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre del pilar es requerido."],
    trim: true,
    maxlength: [100, "El nombre del pilar no puede exceder los 100 caracteres."]
  },
  descripcion: {
    type: String,
    required: [true, "La descripción del pilar es requerida."],
    trim: true,
    maxlength: [500, "La descripción del pilar no puede exceder los 500 caracteres."]
  },
  canales_principales: {
    type: [String], // Array de strings
    default: [],
    // Validación para asegurar que el array de canales principales no esté vacío
    validate: {
      validator: (v: string[]) => Array.isArray(v) && v.length > 0,
      message: 'Los canales principales deben ser un array de strings y no puede estar vacío.'
    },
    required: [true, "Los canales principales son requeridos y no pueden estar vacíos."]
  }
}); // Eliminado _id: false

// Esquema para CanalYTacticaInicial
const CanalYTacticaInicialSchema = new Schema({
  canal: {
    type: String,
    required: [true, "El nombre del canal es requerido."],
    trim: true,
    maxlength: [100, "El nombre del canal no puede exceder los 100 caracteres."]
  },
  tacticas: {
    type: [String], // Array de strings
    default: [],
    // Validación para asegurar que el array de tácticas no esté vacío
    validate: {
      validator: (v: string[]) => Array.isArray(v) && v.length > 0,
      message: 'Las tácticas deben ser un array de strings y no puede estar vacío.'
    },
    required: [true, "Las tácticas son requeridas y no pueden estar vacías."]
  }
}); // Eliminado _id: false

// Esquema para PlanDeAccionFase1Item
const PlanDeAccionFase1ItemSchema = new Schema({
  dia: {
    type: String,
    required: [true, "El día y semana de la acción es requerido."],
    trim: true,
    maxlength: [50, "El día no puede exceder los 50 caracteres."]
  },
  descripcion: {
    type: String,
    required: [true, "La descripción de la acción es requerida."],
    trim: true,
    maxlength: [500, "La descripción de la acción no puede exceder los 500 caracteres."]
  },
  responsable: {
    type: String,
    required: [true, "El responsable de la acción es requerido."],
    trim: true,
    maxlength: [100, "El responsable no puede exceder los 100 caracteres."]
  }
}); // Eliminado _id: false

// --- Esquema Principal para EstrategiaMarketing ---

const EstrategiaMarketingSchema = new Schema({
  id_proyecto: {
    type: String,
    required: true,
    // Eliminado 'description' ya que no es una opción de Mongoose para propiedades
  },
  nombre_estrategia: {
    type: String,
    required: [true, "El nombre de la estrategia es requerido."],
    trim: true,
    minlength: [3, "El nombre de la estrategia debe tener al menos 3 caracteres."],
    maxlength: [200, "El nombre de la estrategia no puede exceder los 200 caracteres."]
  },
  objetivos_generales: {
    type: [ObjetivoGeneralSchema], // Array de subdocumentos
    default: [], // Aunque haya un default, la validación de length abajo se aplicará
    required: [true, "Los objetivos generales son requeridos y no pueden estar vacíos."],
    validate: {
      validator: (v: any[]) => Array.isArray(v) && v.length > 0,
      message: 'Los objetivos generales deben ser un array y no puede estar vacío.'
    }
  },
  analisis_mercado_target: {
    type: AnalisisMercadoTargetSchema, // Subdocumento único
    required: [true, "El análisis de mercado y target es requerido."]
  },
  pilares_estrategicos: {
    type: [PilarEstrategicoSchema], // Array de subdocumentos
    default: [],
    required: [true, "Los pilares estratégicos son requeridos y no pueden estar vacíos."],
    validate: {
      validator: (v: any[]) => Array.isArray(v) && v.length > 0,
      message: 'Los pilares estratégicos deben ser un array y no puede estar vacío.'
    }
  },
  canales_y_tacticas_iniciales: {
    type: [CanalYTacticaInicialSchema], // Array de subdocumentos
    default: [],
    required: [true, "Los canales y tácticas iniciales son requeridos y no pueden estar vacíos."],
    validate: {
      validator: (v: any[]) => Array.isArray(v) && v.length > 0,
      message: 'Los canales y tácticas iniciales deben ser un array y no puede estar vacío.'
    }
  },
  plan_de_accion_fase_1: {
    type: [PlanDeAccionFase1ItemSchema], // Array de subdocumentos
    default: [],
    required: [true, "El plan de acción de la fase 1 es requerido y no puede estar vacío."],
    validate: {
      validator: (v: any[]) => Array.isArray(v) && v.length > 0,
      message: 'El plan de acción de la fase 1 debe ser un array y no puede estar vacío.'
    }
  },
  consideraciones_adicionales: {
    type: [String], // Array de strings
    default: [],
    required: [true, "Las consideraciones adicionales son requeridas."]
    // No se añade validación minItems: 1 aquí, ya que has indicado que "Puede estar vacío."
  }
}, {
  timestamps: true // Añade campos `createdAt` y `updatedAt` automáticamente
});

export default models.EstrategiaMarketing || model('EstrategiaMarketing', EstrategiaMarketingSchema);