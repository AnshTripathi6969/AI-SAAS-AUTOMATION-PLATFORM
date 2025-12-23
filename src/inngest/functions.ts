import prisma from "@/lib/db";
import { inngest } from "./client";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";
//import { createOpenAI } from "@ai-sdk/openai"

const google = createGoogleGenerativeAI();
//const openai = createOpenAI();

export const execute = inngest.createFunction(
  { id: "execute-ai"},
  { event: "execute/ai" },
  async ({ event, step }) => {
    await step.sleep("pretend" , "5s"); 

    const { steps: geminiSteps } = await step.ai.wrap(
      "gemini-generate-text" ,
      generateText, 
      {
      model: google("gemini-2.5-flash"),
      system: "You are a helpful assistant.",
      prompt: "What is 2 + 2?",
      } 
    );
    
    /*  USE IF YOU HAVE OPENAI KEY AND HAVE MINIMUM 5$ / 447INR in your openai  */
    //  const { steps: openaiSteps } = await step.ai.wrap(
    //   "openai-generate-text" ,
    //   generateText, 
    //   {
    //   model: openai("gpt-5-chat-latest"),
    //   system: "You are a helpful assistant.",
    //   prompt: "What is 2 + 2?",
    //   } 
    // ); 

    return {
      geminiSteps,
      //openaiSteps,
    };
  },
);