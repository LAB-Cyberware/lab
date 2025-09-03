import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import getPrompt from "@/ia-utils/templates-Prompts";
import jsonPure from "@/utils/jsonPure";
import jsonToPrompt from "@/utils/JsonToPrompt";
import { GoogleGenAI } from '@google/genai';
import { overlayImagesServer } from "@/utils/LogoGenerator-Server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({
  model: process.env.GOOGLE_GEMINI_API_MODET_TEXT,
  system_instruction: {
    parts: [
      {
        text: `Eres una IA experta en Marketing, Neuroventas, Psicología, Sociología, Optimización de Recursos y Administración de Empresas`
      }
    ]
  },
  tools: [
    {
      codeExecution: {},
    }
  ]
});

export async function POST(req) {
  const dataR = await req.json();
  
  try {
    const finalPrompt = getPrompt(
      dataR.item,
      jsonToPrompt(dataR.maker),
      jsonToPrompt(dataR.estudio),
      jsonToPrompt(dataR.estrategia),
      jsonToPrompt(dataR.post)
    );

    if (dataR.item === "post-final-img") {
      const ai = new GoogleGenAI({
        apiKey: process.env.GOOGLE_GEMINI_API_KEY,
      });
      
      const config = {
        responseModalities: ['IMAGE', 'TEXT'],
        responseMimeType: 'text/plain',
        aspectRatio: "1:1",
      };

      const modelImg = process.env.GOOGLE_GEMINI_API_MODET_IMAGE;
      const contents = [
        {
          role: 'user',
          parts: [
            {
              text: finalPrompt,
            },
          ],
        },
      ];

      const response = await ai.models.generateContentStream({
        model: modelImg,
        config,
        contents,
      });

      for await (const chunk of response) {
        if (!chunk.candidates || !chunk.candidates[0].content || !chunk.candidates[0].content.parts) {
          continue;
        }
        
        if (chunk.candidates?.[0]?.content?.parts?.[0]?.inlineData) {
          const inlineData = chunk.candidates[0].content.parts[0].inlineData;

          const baseImageData = `data:${inlineData.mimeType};base64,${inlineData.data}`;
          
          const imageWithLogo = await overlayImagesServer(baseImageData, 'epic-media-wave-logo.png');
          
          const base64Data = imageWithLogo.split(',')[1];
          
          const williArray = [{ 
            data: {
              mimeType: 'image/png',
              data: base64Data
            }
          }];
          
          return NextResponse.json(williArray);
        }
      }
    } 
    else {
      const result = await model.generateContent(finalPrompt);
      const williTxt = result.response.text();
      const willJSON = jsonPure(williTxt);
      const data = JSON.parse(willJSON);
      
      return NextResponse.json(data);
    }

  } catch (error) {
    return NextResponse.json({ error: `Failed to generate content ${error}` }, { status: 500 });
  }
}