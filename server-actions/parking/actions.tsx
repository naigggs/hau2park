"use server";

import { createClient } from "@/utils/supabase/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function chatGetParkingSpot() {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("parkingHAU")
      .select("spot_no, is_occupied");
  
    // TODO: Handle error logic
    if (error) {
      console.log(error);
      return;
    }

    console.log(data);
  
    const GEMINI_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!GEMINI_KEY) {
      throw new Error("NEXT_PUBLIC_GEMINI_API_KEY is not defined");
    }
  
    const genAI = new GoogleGenerativeAI(GEMINI_KEY);
  
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro-exp-0827",
      systemInstruction:
        "The AI should introduce itself as HAU2PARK and recommend a vacant parking spot based on the available data. Dont mention the data. Act like a human. Make it that the AI will allocate the user to the given parking spot.",
    });
  
    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };
  
    const chatSession = model.startChat({
      generationConfig,
    });
  
    const result = await chatSession.sendMessage(`Data: ${JSON.stringify(data)}`);
    console.log(result.response.text());
}
