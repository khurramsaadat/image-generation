# Simple AI Image Generation Setup

Since Google Vertex AI requires complex OAuth 2 authentication, here are simpler alternatives that work with just API keys:

## Option 1: OpenAI DALL-E (Recommended)

1. **Get OpenAI API Key**
   - Visit [OpenAI API Keys](https://platform.openai.com/api-keys)
   - Sign up or log in
   - Create a new API key
   - Copy the key

2. **Add to Environment Variables**
   ```env
   # Add to your .env.local file
   OPENAI_API_KEY=sk-your-openai-api-key-here
   ```

3. **Features**
   - High-quality image generation
   - DALL-E 3 model
   - 1024x1024 resolution
   - Works with API key authentication

## Option 2: Stability AI

1. **Get Stability AI API Key**
   - Visit [Stability AI Account](https://platform.stability.ai/account/keys)
   - Sign up or log in
   - Create a new API key
   - Copy the key

2. **Add to Environment Variables**
   ```env
   # Add to your .env.local file
   STABILITY_API_KEY=sk-your-stability-api-key-here
   ```

3. **Features**
   - Stable Diffusion XL model
   - 1024x1024 resolution
   - Good quality image generation

## Current .env.local Setup

Your `.env.local` file should look like this:

```env
# Clerk Authentication (existing)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret

# Google Gemini (for image analysis in editing)
GOOGLE_GEMINI_API_KEY=your_gemini_api_key

# Choose ONE of these for image generation:
OPENAI_API_KEY=sk-your-openai-api-key-here
# OR
STABILITY_API_KEY=sk-your-stability-api-key-here
```

## How It Works

### Text-to-Image Generation
1. User enters a text prompt
2. App enhances prompt with style (Ghibli/Action)
3. Sends request to OpenAI DALL-E or Stability AI
4. Returns generated image for download

### Image Editing
1. User uploads an image
2. Gemini analyzes the image and describes it
3. App combines analysis with edit instructions
4. Generates new image based on analysis + edits
5. Returns edited image for download

## Testing

1. Add one of the API keys to `.env.local`
2. Restart your dev server: `npm run dev`
3. Go to `/dashboard`
4. Try generating an image from text
5. Try uploading and editing an image

## Costs

- **OpenAI DALL-E**: ~$0.040 per image (1024x1024)
- **Stability AI**: ~$0.020 per image (1024x1024)
- **Gemini**: Free tier available for image analysis

## Troubleshooting

### "No image generation service configured"
- Make sure you added either `OPENAI_API_KEY` or `STABILITY_API_KEY` to `.env.local`
- Restart your dev server after adding environment variables

### "Invalid API key"
- Check that your API key is correct
- Make sure it starts with `sk-` for OpenAI
- Verify the key hasn't expired

### "Insufficient credits"
- Check your account balance on the respective platform
- Add credits to your account if needed

## Why This Approach?

Google Vertex AI requires:
- Google Cloud Project setup
- OAuth 2 authentication (not just API key)
- Service account configuration
- Complex authentication flow

OpenAI and Stability AI are much simpler:
- Just need an API key
- Direct API calls
- No complex setup required
- Better for development and testing

Choose the option that works best for your needs!
