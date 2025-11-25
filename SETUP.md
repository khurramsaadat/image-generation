# AI Image Generation Setup Guide

This guide will help you set up Google Gemini API and Vertex AI for image generation and editing features.

## Prerequisites

1. **Google Cloud Account** - Sign up at [Google Cloud Console](https://console.cloud.google.com/)
2. **Gemini API Key** - Get from [Google AI Studio](https://aistudio.google.com/apikey)
3. **Vertex AI Enabled** - Enable Vertex AI API in your Google Cloud Project

## Step 1: Get Your Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

## Step 2: Set Up Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - **Vertex AI API**
   - **Imagen API** (for image generation)

### Enable APIs:

```bash
# Using gcloud CLI (optional)
gcloud services enable aiplatform.googleapis.com
gcloud services enable generativelanguage.googleapis.com
```

Or enable them in the [Google Cloud Console](https://console.cloud.google.com/apis/library)

## Step 3: Configure Environment Variables

Create or update your `.env.local` file in the project root:

```env
# Clerk Authentication (existing)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Google Gemini API
GOOGLE_GEMINI_API_KEY=your_gemini_api_key_here

# Google Cloud Project (required for Vertex AI Imagen)
GOOGLE_CLOUD_PROJECT_ID=your-google-cloud-project-id
GOOGLE_CLOUD_LOCATION=us-central1
```

## Step 4: Authentication Setup

For Vertex AI to work, you need to authenticate. You have two options:

### Option A: Service Account (Recommended for Production)

1. Create a service account in Google Cloud Console
2. Grant it "Vertex AI User" role
3. Download the JSON key file
4. Set the path in `.env.local`:

```env
GOOGLE_APPLICATION_CREDENTIALS=path/to/your/service-account-key.json
```

### Option B: Application Default Credentials (Development)

If running locally with `gcloud` CLI installed:

```bash
gcloud auth application-default login
```

## Step 5: Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/dashboard`
3. Try generating an image with a text prompt
4. Try uploading and editing an image

## Troubleshooting

### Error: "Gemini API key not configured"
- Make sure `GOOGLE_GEMINI_API_KEY` is set in `.env.local`
- Restart your dev server after adding environment variables

### Error: "Image generation requires Google Cloud Project setup"
- Make sure `GOOGLE_CLOUD_PROJECT_ID` is set in `.env.local`
- Verify Vertex AI API is enabled in your Google Cloud project

### Error: "Vertex AI API error: 401 Unauthorized"
- Check that your API key has proper permissions
- For Vertex AI, you may need to use service account authentication
- Verify the API key is valid and not expired

### Error: "Vertex AI API error: 403 Forbidden"
- Make sure Vertex AI API is enabled in your project
- Check that your account has "Vertex AI User" role
- Verify billing is enabled for your Google Cloud project

## API Costs

- **Gemini API**: Free tier available, then pay-as-you-go
- **Vertex AI Imagen**: Pay-per-use pricing
- Check [Google Cloud Pricing](https://cloud.google.com/vertex-ai/pricing) for current rates

## Security Notes

- **Never commit** `.env.local` to version control
- Keep your API keys secure
- Use environment variables in production (Vercel, Netlify, etc.)
- Rotate API keys regularly

## Production Deployment

When deploying to production (Vercel, Netlify, etc.):

1. Add all environment variables in your hosting platform's dashboard
2. Make sure `GOOGLE_APPLICATION_CREDENTIALS` is set if using service accounts
3. For serverless functions, you may need to embed service account keys as environment variables

## Support

- [Gemini API Documentation](https://ai.google.dev/docs)
- [Vertex AI Documentation](https://cloud.google.com/vertex-ai/docs)
- [Google Cloud Support](https://cloud.google.com/support)

