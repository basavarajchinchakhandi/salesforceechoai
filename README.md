# SalesforceEchoAi - Next.js Website

A modern, SEO-friendly Next.js website for Salesforce consulting services. Fully configurable without a database - all settings are managed through code.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd sfai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## ⚙️ Configuration

All site configuration is managed in `constants.tsx` - no database required! Simply edit the `COMPANY_CONFIG` object to customize your site.

### Quick Configuration Guide

Open `/constants.tsx` and update the `COMPANY_CONFIG` object:

#### Company Information
```typescript
export const COMPANY_CONFIG = {
  name: 'Your Company Name',
  nameShort: 'Short Name',
  tagline: 'Your Tagline',
  description: 'Your company description',
  logoText: 'L', // Single character for logo
  // ...
}
```

#### Contact Information
```typescript
contact: {
  email: 'your-email@company.com',
  phone: '+1 (555) 123-4567',
  businessHours: 'Mon-Fri: 9:00 AM - 6:00 PM EST',
  location: 'Your Location Description',
  legalEmail: 'legal@company.com',
  formAction: 'https://formsubmit.co/your-email@company.com', // Contact form endpoint
}
```

#### Social Media Links
```typescript
social: {
  linkedin: 'https://www.linkedin.com/company/yourcompany',
  twitter: 'https://twitter.com/yourcompany',
  youtube: 'https://www.youtube.com/@yourcompany',
}
```

#### Copyright & Legal
```typescript
copyright: {
  year: 2025,
  companyName: 'Your Company Name',
}
```

### Contact Form Setup

The contact form uses **FormSubmit** by default - the simplest solution with no signup required!

1. Update `formAction` in `COMPANY_CONFIG.contact.formAction`:
   ```typescript
   formAction: `https://formsubmit.co/your-email@company.com`
   ```

2. That's it! FormSubmit will automatically forward submissions to your email.

3. First submission will include a verification email - click the link to activate.

**Alternative Options:**
- **Formspree**: Sign up at [formspree.io](https://formspree.io) and use: `https://formspree.io/f/YOUR_FORM_ID`
- **EmailJS**: Sign up at [emailjs.com](https://www.emailjs.com) and configure in `app/contact/page.tsx`

### What Gets Updated Automatically

When you update `COMPANY_CONFIG`, these areas update automatically:
- ✅ Footer contact information
- ✅ Navbar company name and logo
- ✅ Contact page details
- ✅ Social media links throughout the site
- ✅ Email links (mailto:)
- ✅ Phone links (tel:)
- ✅ Copyright year and company name
- ✅ Site metadata (SEO)
- ✅ Legal page contact emails

## 📁 Project Structure

```
sfai/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── blog/              # Blog listing and dynamic posts
│   ├── contact/           # Contact form page
│   ├── faq/               # FAQ page
│   ├── pricing/           # Pricing page
│   ├── services/          # Services page
│   ├── privacy/           # Privacy policy
│   ├── terms/             # Terms of service
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Home page
│   ├── sitemap.ts         # Dynamic sitemap generation
│   └── robots.ts          # Robots.txt configuration
├── components/             # Reusable components
│   ├── Footer.tsx         # Site footer
│   └── Navbar.tsx         # Navigation bar
├── constants.tsx           # All site configuration and data
├── types.ts                # TypeScript type definitions
└── public/                 # Static assets
```

## 🎨 Customization

### Adding New Pages

1. Create a new folder in `app/` with your page name
2. Add `page.tsx` inside the folder
3. Add the route to `NAV_ITEMS` in `constants.tsx`

Example:
```typescript
// app/custom/page.tsx
export default function CustomPage() {
  return <div>Your content</div>
}

// constants.tsx
export const NAV_ITEMS: NavItem[] = [
  // ... existing items
  { name: 'Custom', path: '/custom' },
]
```

### Adding Blog Posts

Edit `BLOG_POSTS` array in `constants.tsx`:

```typescript
export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'your-post-id',
    title: 'Your Post Title',
    excerpt: 'Brief description',
    date: 'Jan 01, 2025',
    author: 'Author Name',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-...',
    category: 'Strategy',
    tags: ['Tag1', 'Tag2'],
    content: `<h2>Your Content</h2><p>...</p>`,
  },
]
```

### Modifying Services

Edit `SERVICES` array in `constants.tsx` to add, remove, or modify services.

### Updating Team Members

Edit `TEAM` array in `constants.tsx` to update team information.

## 🔍 SEO Features

- ✅ Server-side rendering (SSR)
- ✅ Static page generation for blog posts
- ✅ Automatic sitemap generation (`/sitemap.xml`)
- ✅ Robots.txt configuration (`/robots.txt`)
- ✅ Meta tags on all pages
- ✅ Open Graph tags for social sharing
- ✅ Structured data ready

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Vercel, Netlify, or any Node.js hosting

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy

### Netlify

1. Push your code to GitHub
2. Import your repository on [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `.next`
5. **Important**: Update `COMPANY_CONFIG.site.url` in `constants.tsx` to your Netlify URL (e.g., `https://your-app.netlify.app`)
6. The site is already configured with Suspense boundaries for Netlify compatibility

### Other Platforms

Any platform that supports Node.js and Next.js will work. Ensure:
- Node.js 18+ is available
- Build command: `npm run build`
- Start command: `npm start`

## 📝 Environment Variables

No environment variables required! All configuration is in `constants.tsx`.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 💡 Tips

- **Images**: Use Unsplash or similar services for high-quality images. Update image URLs in `constants.tsx`
- **Content**: All content is in `constants.tsx` - easy to update without touching code
- **Styling**: Tailwind CSS classes can be modified directly in components
- **Performance**: Images are optimized automatically by Next.js Image component

## 🆘 Troubleshooting

### Images not loading
- Check that image URLs are valid
- Ensure `next.config.js` includes the image domain in `remotePatterns`
- Try adding `unoptimized` prop to Image component

### Contact form not working
- Verify `formAction` URL in `COMPANY_CONFIG.contact.formAction`
- Check browser console for errors
- Ensure FormSubmit verification email is clicked (first time only)

### Build errors
- Run `npm install` to ensure all dependencies are installed
- Check Node.js version (requires 18+)
- Clear `.next` folder and rebuild: `rm -rf .next && npm run build`

## 📞 Support

For issues or questions, please open an issue on GitHub or contact the development team.

---

Built with ❤️ using Next.js
