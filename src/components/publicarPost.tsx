import { useState, useEffect } from 'react';
import { Calendar, Clock, Image, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

// Interfaces
interface PublishResult {
  success: boolean;
  source?: string;
  postId?: string;
  scheduledTime?: number;
  message: string;
  error?: string;
}

interface PublicPostProps {
  texto: any;
  imagen: any; // base64 image
  timestamp: any; // Unix timestamp
}

// Handler de Facebook simplificado
class FacebookPostHandler {
  private accessToken?: string = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  private pageId?: string = process.env.FACEBOOK_PAGE_ID;
  private baseUrl: string = 'https://graph.facebook.com/v18.0';

  constructor(accessToken: string, pageId: string) {
    this.accessToken = accessToken;
    this.pageId = pageId;
  }

  
  async uploadImage(base64Image: string): Promise<string> {
    const url = `${this.baseUrl}/${this.pageId}/photos`;
    
    const payload = {
      source: `data:image/jpeg;base64,${base64Image}`,
      published: false,
      access_token: this.accessToken
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Error subiendo imagen: ${error.error?.message || response.statusText}`);
    }

    const result = await response.json();
    return result.id;
  }

  async createScheduledPost(source: string, message: string, scheduledTime?: number): Promise<string> {
    const url = `${this.baseUrl}/${this.pageId}/feed`;
 
    const payload = {
      message: message,
      source: source,
      published: scheduledTime ? false : true,
      access_token: this.accessToken,
      ...(scheduledTime && { scheduled_publish_time: scheduledTime })
    };
    console.log("############ PAYLOAD TO FACEBOOK ####")
    console.log(payload)
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Error creando post: ${error.error?.message || response.statusText}`);
    }

    const result = await response.json();
    return result.id;
  }

  async publishPostWithImage(source: string, message: string, scheduledTime?: number): Promise<PublishResult> {
    try {
      //const mediaFbid = await this.uploadImage(base64Image);
      const postId = await this.createScheduledPost(source, message, scheduledTime);
      
      return {
        success: true,
        source,
        postId,
        scheduledTime,
        message: scheduledTime ? 'Post programado exitosamente' : 'Post publicado exitosamente'
      };
    } catch (err) {
      return {
        success: false,
        message: 'Error en el proceso de publicación',
        error: String(err)
      };
    }
  }

  static dateToUnixTimestamp(date: Date): number {
    return Math.floor(date.getTime() / 1000);
  }

  static isValidScheduleTime(timestamp: number): boolean {
    const now = Date.now() / 1000;
    const tenMinutesFromNow = now + (10 * 60);
    const sixMonthsFromNow = now + (6 * 30 * 24 * 60 * 60);
    return timestamp >= tenMinutesFromNow && timestamp <= sixMonthsFromNow;
  }
}

// Componente principal
const PublicPost = ({ 
  texto, 
  imagen, 
  timestamp 
}: PublicPostProps) => {
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PublishResult | null>(null);
  const [showResult, setShowResult] = useState(false);
  const accessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  const pageId = process.env.FACEBOOK_PAGE_ID;

  // Descomponer timestamp inicial
  useEffect(() => {
    
    if (timestamp) {
      try {
        const date = new Date(timestamp * 1000);
        const dateStr = date.toISOString().split('T')[0];
        const timeStr = date.toTimeString().slice(0, 5);
        setScheduledDate(dateStr);
        setScheduledTime(timeStr);
      } catch (err) {
        console.error('Error procesando timestamp:', err);
      }
    }
  }, [timestamp]);

  const getScheduledTimestamp = (): number | null => {
    if (!scheduledDate || !scheduledTime) return null;
    
    try {
      const dateTime = new Date(`${scheduledDate}T${scheduledTime}`);
      const timestamp = FacebookPostHandler.dateToUnixTimestamp(dateTime);
      
      if (!FacebookPostHandler.isValidScheduleTime(timestamp)) {
        alert('La fecha debe estar entre 10 minutos y 6 meses en el futuro');
        return null;
      }
      
      return timestamp;
    } catch (err) {
      console.error('Error procesando fecha:', err);
      return null;
    }
  };

  const handlePublish = async () => {
    if (!texto?.trim()) {
      alert('El texto del post está vacío');
      return;
    }
    
    if (!imagen) {
      alert('No se proporcionó imagen');
      return;
    }
    
    if (!accessToken || !pageId) {
      alert('Por favor configura el Access Token y Page ID');
      return;
    }

    setIsLoading(true);
    setResult(null);
    setShowResult(false);

    try {
      const handler = new FacebookPostHandler(accessToken, pageId);
      const timestampToUse = getScheduledTimestamp();
      
      if (scheduledDate && scheduledTime && timestampToUse === null) {
        setIsLoading(false);
        return;
      }
/////////////////////////
alert("info a publicar:")
alert(imagen)
alert(texto)
alert(timestampToUse)
let source =  `data:image/jpeg;base64,${imagen}`
////////////////////////
      const publishResult = await handler.publishPostWithImage(source, texto, timestampToUse || undefined);
      setResult(publishResult);
      setShowResult(true);

    } catch (err) {
      setResult({
        success: false,
        message: 'Error inesperado',
        error: String(err)
      });
      setShowResult(true);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDateTime = (timestamp?: number) => {
    if (!timestamp) return '';
    try {
      return new Date(timestamp * 1000).toLocaleString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (err) {
      return 'Fecha inválida';
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Send className="text-blue-600" />
        Programar Publicación en Facebook
      </h2>

      {/* Configuración */}
      <div className="mb-6">
        
      </div>

      {/* Vista previa del contenido */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Vista previa de la publicación</h3>
        
        {/* Texto del post */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Texto de la publicación
          </label>
          <div className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md min-h-[100px] whitespace-pre-wrap">
            {texto || 'Sin texto'}
          </div>
          <div className="text-right text-sm text-gray-500 mt-1">
            {texto?.length || 0} caracteres
          </div>
        </div>

        {/* Preview de imagen */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Imagen
          </label>
          {imagen ? (
            <div className="border border-gray-300 rounded-lg p-2 bg-white">
              <img
                src={`data:image/jpeg;base64,${imagen}`}
                alt="Preview de la publicación"
                className="max-w-full max-h-64 mx-auto rounded-lg"
              />
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-white">
              <Image className="mx-auto h-12 w-12 text-gray-400" />
              <p className="text-gray-500 mt-2">Sin imagen</p>
            </div>
          )}
        </div>
      </div>

      {/* Programación */}
      <div className="mb-6">
        <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Programar publicación (opcional)
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="date"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="time"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        {scheduledDate && scheduledTime && (
          <p className="text-sm text-gray-600 mt-2">
            Se publicará el {formatDateTime(getScheduledTimestamp() || undefined)}
          </p>
        )}
      </div>

      {/* Botón principal */}
      <button
        onClick={handlePublish}
        disabled={isLoading || !texto?.trim() || !imagen}
        className={`w-full py-3 px-6 rounded-md font-medium text-white flex items-center justify-center gap-2 transition-all ${
          isLoading || !texto?.trim() || !imagen
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 active:transform active:scale-95'
        }`}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Procesando...
          </>
        ) : (
          <>
            <Send className="h-5 w-5" />
            {scheduledDate && scheduledTime ? 'Programar' : 'Publicar'} esta Publicación en Facebook
          </>
        )}
      </button>

      {/* Resultado */}
      {showResult && result && (
        <div className={`mt-6 p-4 rounded-lg border ${
          result.success 
            ? 'bg-green-50 border-green-200 text-green-800' 
            : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          <div className="flex items-start gap-2">
            {result.success ? (
              <CheckCircle className="h-5 w-5 mt-0.5 text-green-600" />
            ) : (
              <AlertCircle className="h-5 w-5 mt-0.5 text-red-600" />
            )}
            <div className="flex-1">
              <p className="font-medium">{result.message}</p>
              {result.success && (
                <div className="mt-2 text-sm space-y-1">
                  {result.postId && <p>Post ID: {result.postId}</p>}
                  {result.source && <p>Media ID: {result.source}</p>}
                  {result.scheduledTime && (
                    <p>Programado para: {formatDateTime(result.scheduledTime)}</p>
                  )}
                </div>
              )}
              {result.error && (
                <p className="mt-2 text-sm">{result.error}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicPost;