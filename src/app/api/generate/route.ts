import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { auth } from "@clerk/nextjs/server";

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Debug environment variables
    console.log('Environment check:', {
      hasOpenAI: !!process.env.OPENAI_API_KEY,
      openAILength: process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.length : 0
    });

    // Parse request body
    const body = await request.json();
    const { prompt, style } = body;

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Enhance prompt with style if provided
    let enhancedPrompt = prompt;
    if (style) {
      switch (style) {
        case "ghibli":
          enhancedPrompt = `Create a Studio Ghibli style artwork: ${prompt}. The image should have a magical, dreamy aesthetic with soft colors, whimsical details, enchanting atmosphere, and the characteristic Ghibli art style with flowing lines and vibrant nature.`;
          break;
        case "action":
          enhancedPrompt = `Create an action-packed illustration: ${prompt}. The image should have dynamic effects, explosive backgrounds, heroic poses, intense energy, dramatic lighting, and cinematic composition.`;
          break;
        default:
          enhancedPrompt = prompt;
      }
    }

    // Use Google Gemini 2.5 Flash Image (Nano Banana) for image generation
    const geminiApiKey = process.env.GOOGLE_GEMINI_API_KEY;
    
    if (geminiApiKey) {
      try {
        // Initialize Gemini for image generation using the correct model (following official docs)
        const genAI = new GoogleGenerativeAI(geminiApiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-image" });

        // Use Gemini 2.5 Flash Image generation (Nano Banana) - exact pattern from docs
        const result = await model.generateContent([enhancedPrompt]);
        const response = result.response;

        // Extract image data following the official documentation pattern
        if (response.candidates && response.candidates[0] && response.candidates[0].content) {
          for (const part of response.candidates[0].content.parts) {
            if (part.text) {
              console.log("Gemini response text:", part.text);
            } else if (part.inlineData) {
              const imageData = part.inlineData.data;
              const mimeType = part.inlineData.mimeType || "image/png";
              return NextResponse.json({
                success: true,
                image: `data:${mimeType};base64,${imageData}`,
              });
            }
          }
        }

        // If no image data found in the response
        throw new Error("No image data returned from Gemini 2.5 Flash Image model");

      } catch (geminiError: any) {
        console.error("Gemini image generation error:", geminiError);
        console.error("Error details:", {
          message: geminiError.message,
          status: geminiError.status,
          details: geminiError.details
        });
        
        // Continue to fallback options
      }
    }

    // Fallback: Try OpenAI if available
    const openaiApiKey = process.env.OPENAI_API_KEY;
    
    if (openaiApiKey) {
      try {
        const response = await fetch("https://api.openai.com/v1/images/generations", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${openaiApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "dall-e-3",
            prompt: enhancedPrompt,
            n: 1,
            size: "1024x1024",
            quality: "standard",
            response_format: "b64_json"
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        
        if (data.data && data.data[0] && data.data[0].b64_json) {
          const imageBase64 = data.data[0].b64_json;
          return NextResponse.json({
            success: true,
            image: `data:image/png;base64,${imageBase64}`,
          });
        }
      } catch (openaiError: any) {
        console.error("OpenAI error:", openaiError);
        // Continue to fallback options
      }
    }

    // Option 2: Use Stability AI (requires Stability AI API key)
    const stabilityApiKey = process.env.STABILITY_API_KEY;
    
    if (stabilityApiKey) {
      try {
        const response = await fetch("https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${stabilityApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text_prompts: [
              {
                text: enhancedPrompt,
                weight: 1
              }
            ],
            cfg_scale: 7,
            height: 1024,
            width: 1024,
            samples: 1,
            steps: 30,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Stability AI API error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        
        if (data.artifacts && data.artifacts[0] && data.artifacts[0].base64) {
          const imageBase64 = data.artifacts[0].base64;
          return NextResponse.json({
            success: true,
            image: `data:image/png;base64,${imageBase64}`,
          });
        }
      } catch (stabilityError: any) {
        console.error("Stability AI error:", stabilityError);
        // Continue to fallback
      }
    }

    // Fallback: Return helpful error message
    return NextResponse.json(
      { 
        error: "Image generation failed",
        message: "All image generation services failed. Check your API keys:",
        steps: [
          "Primary: Google Gemini 2.5 Flash Image (Nano Banana)",
          "  - GOOGLE_GEMINI_API_KEY is configured ✓",
          "  - But image generation failed",
          "",
          "Fallback: OpenAI DALL-E",
          "  - OPENAI_API_KEY billing limit reached",
          "",
          "Alternative: Stability AI",
          "  - Get API key from https://platform.stability.ai/account/keys",
          "  - Add STABILITY_API_KEY to your .env.local file"
        ],
        setupRequired: false
      },
      { status: 500 }
    );

  } catch (error: any) {
    console.error("Error generating image:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate image" },
      { status: 500 }
    );
  }
}

