# ImageGen - AI-Powered Image Transformation SaaS

Transform your photos into stunning Ghibli-style artwork or action-packed illustrations using GPT-4 Vision technology.

## 🚀 Features

- **AI Image Transformation**: Convert photos to Ghibli-style or action-packed artwork
- **Modern UI**: Built with Next.js 15, ShadCN UI, and Tailwind CSS
- **Authentication**: Secure user authentication with Clerk
- **Dark Mode**: Beautiful dark theme enabled by default
- **Responsive Design**: Mobile-first approach with animations

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4, ShadCN UI
- **Authentication**: Clerk
- **Icons**: React Icons
- **Language**: TypeScript
- **Deployment**: Netlify

## 📋 Environment Setup

### 1. Clone the Repository

```bash
git clone https://github.com/khurramsaadat/image-gen.git
cd image-gen
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the project root:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YWNjZXB0ZWQtaGVybWl0LTY3LmNsZXJrLmFjY291bnRzLmRldiQ
CLERK_SECRET_KEY=sk_test_plItqtiFPxM20UBBC9RA34lz4rKdMkOlLZkoACDddS
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🌐 Deployment

### Netlify Deployment

1. **Connect Repository**: Link your GitHub repository to Netlify

2. **Set Environment Variables**: In Netlify dashboard, go to:
   - Site settings → Build & deploy → Environment variables
   
   Add these variables:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YWNjZXB0ZWQtaGVybWl0LTY3LmNsZXJrLmFjY291bnRzLmRldiQ
   CLERK_SECRET_KEY=sk_test_plItqtiFPxM20UBBC9RA34lz4rKdMkOlLZkoACDddS
   ```

3. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`

4. **Deploy**: Trigger a new deployment

## 🔐 Clerk Authentication Setup

1. **Claim Your Clerk App**: Visit the [claim URL](https://dashboard.clerk.com/apps/claim?token=aphbsh38a5k3utclggp2hv2y9h23xr3ghm8pgxlo)

2. **Access API Keys**: Go to [API Keys Dashboard](https://dashboard.clerk.com/apps/app_35pdLytFa2gyXqaZ8SxhVsYnnI7/instances/ins_35pdM065KtHWyIydVo8Qjt5Wog6/api-keys)

3. **Configure Domain**: Add your production domain to Clerk settings

## 📁 Project Structure

```
src/
├── app/
│   ├── dashboard/          # Protected dashboard page
│   ├── layout.tsx          # Root layout with ClerkProvider
│   ├── page.tsx           # Landing page
│   └── globals.css        # Global styles with animations
├── components/ui/         # ShadCN UI components
├── lib/                   # Utility functions
└── middleware.ts          # Clerk middleware
```

## 🎨 Key Features

### Landing Page
- Animated hero section with floating effects
- Feature showcase with modern cards
- Email capture with authentication integration
- Responsive design with dark mode

### Authentication
- Sign up/Sign in with Clerk
- Protected dashboard route
- User profile management
- Session handling

### Dashboard
- Image upload interface
- Transformation history
- Account settings
- Usage statistics

## 🚀 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Features

1. Create new pages in `src/app/`
2. Add UI components in `src/components/ui/`
3. Update middleware for protected routes
4. Test authentication flows

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For support and questions:
- GitHub Issues: [Create an issue](https://github.com/khurramsaadat/image-gen/issues)
- Clerk Documentation: [Clerk Docs](https://clerk.com/docs)
- Next.js Documentation: [Next.js Docs](https://nextjs.org/docs)