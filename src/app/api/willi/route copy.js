import { NextResponse } from "next/server";
//gemini-pro-vision
      //gemini-2.0-flash-preview-image-generation
      import {
        GoogleGenAI,
      } from '@google/genai';    

export async function POST(request) {
  const { prompt, image } = await request.json();
  try {

    
    async function main() {
        let info;
        const ai = new GoogleGenAI({
          apiKey: process.env.GOOGLE_GEMINI_API_KEY,
        });
        const config = {
          responseModalities: [
              'IMAGE',
              'TEXT',
          ],
          responseMimeType: 'text/plain',
          aspectRatio: "1:1",
        };

        // ENV: GOOGLE_GEMINI_API_MODET_TEXT="gemini-2.0-flash-001"
        //const model = process.env.GOOGLE_GEMINI_API_MODET_IMAGE;
        const model = "gemini-2.0-flash-001";

        let base64Data;
        if (image) {
            base64Data = image.replace(/^data:image\/[^;]+;base64,/, '');
          }
        const contents = [
          {
            role: 'user',
            parts: [
              {
                text: `${prompt}`,
              },
              {
              inlineData: {
                mimeType: "image/jpeg", 
                data: base64Data
              }
            }
            ],
          },
        ];

         

          
        const response = await ai.models.generateContentStream({
          model,
          config,
          contents,
        });
        for await (const chunk of response) {
          if (!chunk.candidates || !chunk.candidates[0].content || !chunk.candidates[0].content.parts) {
            continue;
          }
          if (chunk.candidates?.[0]?.content?.parts?.[0]?.inlineData) {
            const inlineData = chunk.candidates[0].content.parts[0].inlineData;
            return inlineData
          }
          else {
            info = chunk.text
          }
        }
      }

      
      
      const result = await main(); 
      console.log('Resultado de Gemini API:', result);

          let imageBase64 = null;
          
          if (result.candidates && result.candidates[0] && result.candidates[0].content && result.candidates[0].content.parts) {
            for (const part of result.candidates[0].content.parts) {
              if (part.inlineData && part.inlineData.data) {
                imageBase64 = part.inlineData.data;
                break;
              }
            }
          }

          if (!imageBase64) {
            console.error('Estructura de respuesta inesperada:', result);
            return NextResponse.json({ 
              error: 'La respuesta de la API no contenía una imagen válida. Es posible que el modelo no haya generado una imagen esta vez. Intenta de nuevo con un prompt más específico como "genera una imagen de..."'
            }, { status: 500 });
          }

          const cleanBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');

          return NextResponse.json({ imageBase64: cleanBase64 });

    

  } catch (error) {
   // console.error("Error generating content:", error);
    return NextResponse.json({ error: `Failed to generate content ${error}` }, { status: 500 });
  }
}