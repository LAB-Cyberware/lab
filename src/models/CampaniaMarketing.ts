import {Schema, model, models} from 'mongoose';

// Sub-esquema para definicion_arte
const DefinicionArteSchema = new Schema({
  estilo_narracion: {
    type: String,
    required: [true, "El estilo de narración es requerido."],
    trim: true,
    minlength: [1, "El estilo de narración debe tener al menos 1 carácter."],
    maxlength: [250, "El estilo de narración no puede exceder los 250 caracteres."]
  },
  colores: {
    type: String,
    required: [true, "La paleta de colores es requerida."],
    trim: true,
    minlength: [1, "Los colores deben tener al menos 1 carácter."],
    maxlength: [150, "Los colores no pueden exceder los 150 caracteres."]
  },
  grafica_representativa_campania: {
    type: String,
    required: [true, "La gráfica representativa de la campaña es requerida."],
    trim: true,
    minlength: [1, "La descripción de la gráfica debe tener al menos 1 carácter."],
    maxlength: [500, "La descripción de la gráfica no puede exceder los 500 caracteres."]
  }
}); // _id se generará automáticamente

// Sub-esquema para post
const PostSchema = new Schema({
  objetivo: {
    type: String,
    required: [true, "El objetivo del post es requerido."],
    trim: true,
    minlength: [3, "El objetivo del post debe tener al menos 3 caracteres."],
    maxlength: [300, "El objetivo del post no puede exceder los 300 caracteres."]
  },
  definicion_arte: {
    type: String,
    required: [true, "La definición de arte del post es requerida."],
    trim: true,
    minlength: [10, "La definición de arte del post debe tener al menos 10 caracteres."],
    maxlength: [1000, "La definición de arte del post no puede exceder los 1000 caracteres."]
  },
  titulo: {
    type: String,
    required: [true, "El título del post es requerido."],
    trim: true,
    minlength: [3, "El título del post debe tener al menos 3 caracteres."],
    maxlength: [200, "El título del post no puede exceder los 200 caracteres."]
  },
  tema: {
    type: String,
    required: [true, "El tema del post es requerido."],
    trim: true,
    minlength: [3, "El tema del post debe tener al menos 3 caracteres."],
    maxlength: [200, "El tema del post no puede exceder los 200 caracteres."]
  },
  texto: {
    type: String,
    required: [true, "El texto del post es requerido."],
    trim: true,
    minlength: [10, "El texto del post debe tener al menos 10 caracteres."],
    maxlength: [2000, "El texto del post no puede exceder los 2000 caracteres."]
  },
  cta: {
    type: String,
    required: [true, "La llamada a la acción (CTA) es requerida."],
    trim: true,
    minlength: [3, "La CTA debe tener al menos 3 caracteres."],
    maxlength: [150, "La CTA no puede exceder los 150 caracteres."]
  },
  imagen: {
    type: String,
    required: [true, "La descripción de la imagen es requerida."],
    trim: true,
    minlength: [3, "La descripción de la imagen debe tener al menos 3 caracteres."],
    maxlength: [500, "La descripción de la imagen no puede exceder los 500 caracteres."]
  },
  hora: {
    type: String,
    required: [true, "La hora de publicación es requerida."],
    trim: true,
    // Validación Regex para formato HH:MM
    match: [/^([01]\d|2[0-3]):([0-5]\d)$/, "La hora debe estar en formato HH:MM (ej. 14:30)."]
  },
  canal: {
    type: String,
    required: [true, "El canal de publicación es requerido."], // Corregido: Ahora es requerido
    trim: true,
    minlength: [1, "El canal debe tener al menos 1 carácter."],
    maxlength: [100, "El canal no puede exceder los 100 caracteres."]
  },
  estado: {
    type: String,
    required: [true, "El estado del post es requerido."],
    trim: true,
    minlength: [1, "El estado debe tener al menos 1 carácter."],
    maxlength: [50, "El estado no puede exceder los 50 caracteres."]
  },
  fundamento: {
    type: String,
    required: [true, "El fundamento del post es requerido."],
    trim: true,
    minlength: [3, "El fundamento debe tener al menos 3 caracteres."],
    maxlength: [500, "El fundamento no puede exceder los 500 caracteres."]
  },
  recomendacion_creacion: {
    type: String,
    required: [true, "La recomendación de creación es requerida."],
    trim: true,
    minlength: [3, "La recomendación de creación debe tener al menos 3 caracteres."],
    maxlength: [1000, "La recomendación de creación no puede exceder los 1000 caracteres."]
  },
  recomendacion_publicacion_seguimiento: {
    type: String,
    required: [true, "La recomendación de publicación y seguimiento es requerida."],
    trim: true,
    minlength: [3, "La recomendación de publicación y seguimiento debe tener al menos 3 caracteres."],
    maxlength: [1000, "La recomendación de publicación y seguimiento no puede exceder los 1000 caracteres."]
  }
});

// Sub-esquema para dia
const DiaSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre del día es requerido."],
    trim: true,
    minlength: [1, "El nombre del día debe tener al menos 1 carácter."],
    maxlength: [50, "El nombre del día no puede exceder los 50 caracteres."]
  },
  fecha: {
    type: Date, // Mongoose almacenará como Date
    required: [true, "La fecha del día es requerida."]
  },
  post: {
    type: PostSchema,
    required: [true, "El post es requerido."]
  }
});

// Sub-esquema para semana
const SemanaSchema = new Schema({
  numero: {
    type: Number,
    required: [true, "El número de semana es requerido."],
    min: [1, "El número de semana debe ser al menos 1."]
  },
  dias: {
    type: [DiaSchema], // Array de objetos DiaSchema
    required: [true, "Los días de la semana son requeridos y no pueden estar vacíos."],
    validate: { // Validación para asegurar que el array no esté vacío
      validator: (v: any[]) => Array.isArray(v) && v.length > 0,
      message: 'Los días de la semana no pueden estar vacíos.'
    }
  }
});

// Esquema principal para CampaniaMarketing
const CampaniaMarketingSchema = new Schema({
  id_proyecto: {
    type: String,
    required: [true, "El ID del proyecto es requerido."],
    minlength: [1, "El ID del proyecto debe tener al menos 1 carácter."]
  },
  nombre: {
    type: String,
    required: [true, "El nombre de la campaña es requerido."],
    trim: true,
    minlength: [3, "El nombre de la campaña debe tener al menos 3 caracteres."],
    maxlength: [200, "El nombre de la campaña no puede exceder los 200 caracteres."]
  },
  objetivo: {
    type: String,
    required: [true, "El objetivo de la campaña es requerido."],
    trim: true,
    minlength: [3, "El objetivo de la campaña debe tener al menos 3 caracteres."],
    maxlength: [500, "El objetivo de la campaña no puede exceder los 500 caracteres."]
  },
  target: {
    type: String,
    required: [true, "El público objetivo es requerido."],
    trim: true,
    minlength: [3, "El público objetivo debe tener al menos 3 caracteres."],
    maxlength: [500, "El público objetivo no puede exceder los 500 caracteres."]
  },
  tematica: {
    type: String,
    required: [true, "La temática de la campaña es requerida."],
    trim: true,
    minlength: [3, "La temática de la campaña debe tener al menos 3 caracteres."],
    maxlength: [200, "La temática de la campaña no puede exceder los 200 caracteres."]
  },
  definicion_arte: {
    type: DefinicionArteSchema,
    required: [true, "La definición de arte es requerida."]
  },
  duracion: {
    type: Number,
    required: [true, "La duración de la campaña es requerida."],
    min: [1, "La duración debe ser al menos 1 día."]
  },
  fecha_inicio: {
    type: Date,
    required: [true, "La fecha de inicio es requerida."]
  },
  fecha_fin: {
    type: Date,
    required: [true, "La fecha de fin es requerida."]
  },
  contenido: {
    type: [SemanaSchema], // Array de objetos SemanaSchema
    required: [true, "El contenido de la campaña es requerido y no puede estar vacío."],
    validate: { // Validación para asegurar que el array no esté vacío
      validator: (v: any[]) => Array.isArray(v) && v.length > 0,
      message: 'El contenido de la campaña (semanas) no puede estar vacío.'
    }
  }
}, {
  timestamps: true // Opcional: añade createdAt y updatedAt
});

export default models.CampaniaMarketing || model('CampaniaMarketing', CampaniaMarketingSchema);