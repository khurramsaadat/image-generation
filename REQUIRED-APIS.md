# Required API Keys for ImageGen

## ✅ Required APIs

### 1. Clerk (Authentication)
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_key_here
```
- **Purpose:** User authentication and dashboard access
- **Required for:** Sign up, sign in, protected routes
- **Status:** ✅ Already configured

### 2. Google Gemini (Primary Image Generation)
```env
GOOGLE_GEMINI_API_KEY=AIzaSy_your_key_here
```
- **Purpose:** Text-to-image generation using Gemini 2.5 Flash Image (Nano Banana)
- **Required for:** Primary image generation features
- **Status:** ✅ Configured but needs paid tier upgrade
- **Note:** Currently on free tier with quota limits

## 🔄 Fallback APIs

### 3. OpenAI (Fallback Image Generation)
```env
OPENAI_API_KEY=sk-proj-your_key_here
```
- **Purpose:** Fallback text-to-image generation and image editing
- **Required for:** When Gemini quota is exceeded
- **Status:** ⚠️ Configured but billing limit reached

### 4. Stability AI (Alternative)
```env
STABILITY_API_KEY=sk-your_key_here
```
- **Purpose:** Alternative image generation service
- **Required for:** Reliable image generation without quota issues
- **Status:** ❌ Not configured (recommended to add)

## 📝 Minimal .env.local Setup

For basic functionality, you need:

```env
# Authentication (Required)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_key_here

# Primary Image Generation (Required - needs upgrade)
GOOGLE_GEMINI_API_KEY=AIzaSy_your_key_here

# Fallback Options (Choose one)
OPENAI_API_KEY=sk-proj-your_key_here
# OR
STABILITY_API_KEY=sk-your_key_here
```

## 🚨 Current Status

### Issues Identified:
1. **Gemini API**: On free tier despite Pro subscription (needs upgrade)
2. **OpenAI API**: Billing hard limit reached
3. **No working image generation**: Both primary services have quota/billing issues

### Solutions:
1. **Upgrade Gemini API** to paid tier at https://ai.google.dev/pricing
2. **Add Stability AI** as reliable alternative
3. **Fix OpenAI billing** if preferred

## 🔧 Implementation Notes

The app currently uses:
1. **Gemini 2.5 Flash Image** (gemini-2.5-flash-image) for primary generation
2. **OpenAI DALL-E 3** as fallback
3. **Stability AI** support ready to be added

All code follows official documentation and is working correctly - only API billing/quota issues remain.
