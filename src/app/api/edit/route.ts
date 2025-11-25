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

    // Get Gemini API key for image analysis (optional)
    const geminiApiKey = process.env.GOOGLE_GEMINI_API_KEY;

    // Parse request body
    const body = await request.json();
    const { image, prompt, style } = body;

    if (!image || typeof image !== "string") {
      return NextResponse.json(
        { error: "Image is required (base64 encoded)" },
        { status: 400 }
      );
    }

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Edit prompt is required" },
        { status: 400 }
      );
    }

    // Extract base64 data (remove data URL prefix if present)
    let imageBase64 = image;
    if (image.startsWith("data:image")) {
      imageBase64 = image.split(",")[1];
    }

    // Enhance prompt with style if provided
    let enhancedPrompt = prompt;
    if (style) {
      switch (style) {
        case "ghibli":
          enhancedPrompt = `Transform this image into Studio Ghibli style artwork: ${prompt}. Apply a magical, dreamy aesthetic with soft colors, whimsical details, enchanting atmosphere, and the characteristic Ghibli art style.`;
          break;
        case "action":
          enhancedPrompt = `Transform this image into an action-packed illustration: ${prompt}. Add dynamic effects, explosive backgrounds, heroic poses, intense energy, dramatic lighting, and cinematic composition.`;
          break;
        default:
          enhancedPrompt = prompt;
      }
    }


    // Use Gemini to analyze the image if available, otherwise use a simple approach
    let analysisText = "";
    
    if (geminiApiKey) {
      try {
        // Initialize Gemini for image analysis
        const genAI = new GoogleGenerativeAI(geminiApiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

        // Analyze the image with Gemini
        const analysisResult = await model.generateContent([
        {
          inlineData: {
            data: imageBase64,
            mimeType: "image/png",
          },
        },
          {
            text: `Analyze this image in detail. Describe what you see, including colors, objects, people, background, style, and composition. Then, based on this analysis and the following edit request: "${enhancedPrompt}", create a new detailed prompt for generating an edited version of this image.`,
          },
        ]);

        analysisText = analysisResult.response.text();
        console.log("Image analysis:", analysisText);
      } catch (geminiError: any) {
        console.log("Gemini analysis failed, using fallback:", geminiError.message);
        analysisText = `Image editing request: ${enhancedPrompt}. Generate a new image based on the uploaded image with these modifications.`;
      }
    } else {
      // Fallback without Gemini
      analysisText = `Image editing request: ${enhancedPrompt}. Generate a new image with these modifications applied to the original image style and composition.`;
    }

      // Create a new image based on the analysis and edit instructions
      // Option 1: Use OpenAI DALL-E for image editing
      const openaiApiKey = process.env.OPENAI_API_KEY;
      
      if (openaiApiKey) {
        try {
          // For image editing, we'll use DALL-E's image generation with the analysis as context
          const editPrompt = `Based on this image analysis: ${analysisText}\n\nApply these edits: ${enhancedPrompt}\n\nGenerate a new image that incorporates these changes while maintaining the original composition and style.`;
          
          const response = await fetch("https://api.openai.com/v1/images/generations", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${openaiApiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "dall-e-3",
              prompt: editPrompt,
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
            const editedImageBase64 = data.data[0].b64_json;
            return NextResponse.json({
              success: true,
              image: `data:image/png;base64,${editedImageBase64}`,
            });
          }
        } catch (openaiError: any) {
          console.error("OpenAI editing error:", openaiError);
          // Continue to fallback
        }
      }

      // Option 2: Use Stability AI for image editing
      const stabilityApiKey = process.env.STABILITY_API_KEY;
      
      if (stabilityApiKey) {
        try {
          const editPrompt = `Based on this image analysis: ${analysisText}\n\nApply these edits: ${enhancedPrompt}`;
          
          const response = await fetch("https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${stabilityApiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              text_prompts: [
                {
                  text: editPrompt,
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
            const editedImageBase64 = data.artifacts[0].base64;
            return NextResponse.json({
              success: true,
              image: `data:image/png;base64,${editedImageBase64}`,
            });
          }
        } catch (stabilityError: any) {
          console.error("Stability AI editing error:", stabilityError);
          // Continue to fallback
        }
      }

      // Fallback: Return helpful error message
      return NextResponse.json(
        { 
          error: "No image editing service configured",
          message: "To edit images, you need to set up one of these services:",
          steps: [
            "Option 1: OpenAI DALL-E",
            "  - Get API key from https://platform.openai.com/api-keys",
            "  - Add OPENAI_API_KEY to your .env.local file",
            "",
            "Option 2: Stability AI", 
            "  - Get API key from https://platform.stability.ai/account/keys",
            "  - Add STABILITY_API_KEY to your .env.local file",
            "",
            "Note: Image editing uses Gemini to analyze your image,",
            "then generates a new image based on your edit instructions."
          ],
          setupRequired: true
        },
        { status: 500 }
      );

  } catch (error: any) {
    console.error("Error editing image:", error);
    return NextResponse.json(
      { error: error.message || "Failed to edit image" },
      { status: 500 }
    );
  }
}

