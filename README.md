# The Life Line: Animated Portfolio

An immersive, scroll-driven portfolio website that transforms a traditional resume into a dynamic storytelling experience using advanced web animations.

## 🎯 Project Overview

**The Life Line Portfolio** is a single-page application that narrates a professional journey through interactive scroll animations. Built with Next.js and GSAP, it features a fixed vertical "Life Line" indicator that progressively fills as users scroll through different career chapters.

## ✨ Key Features

- **Interactive Life Line**: Fixed vertical scroll indicator with animated progress
- **Chapter-Based Narrative**: 6 distinct sections telling a chronological story
- **Advanced GSAP Animations**: Smooth 60fps animations with ScrollTrigger
- **Responsive Design**: Optimized for all devices with graceful animation adaptation
- **Performance Optimized**: Sub-2s load time with efficient animation rendering

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: GSAP with ScrollTrigger plugin
- **Language**: TypeScript
- **Font**: Inter (Google Fonts)

## 🏗️ Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and CSS variables
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main page component
└── components/
    ├── LifeLine.tsx         # Fixed scroll indicator
    ├── HeroSection.tsx      # Introduction section
    ├── FoundationSection.tsx # Education & core skills
    ├── EarlyDiscoveriesSection.tsx # First experiences
    ├── AscentSection.tsx    # Major achievements (pinned)
    ├── CurrentFrontierSection.tsx # Current work (3D effects)
    └── ConnectSection.tsx   # Contact form & social links
```

## 🚀 Getting Started

1. **Clone and Install**
   ```bash
   cd lifeline-portfolio
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Design System

### Color Palette
- **Background**: `#0a0a0a` (Deep black)
- **Foreground**: `#ededed` (Light gray)
- **Accent Gradient**: Purple → Pink → Cyan (`#8b5cf6` → `#ec4899` → `#06b6d4`)

### Animation Principles
- **Smooth Performance**: All animations maintain 60fps
- **Progressive Enhancement**: Animations degrade gracefully on slower devices
- **Scroll-Driven**: Primary interactions tied to scroll position
- **Contextual**: Each section has unique animation patterns

## 📱 Responsive Behavior

- **Desktop**: Full animation suite with complex transitions
- **Tablet**: Simplified animations with maintained functionality
- **Mobile**: Essential animations only, optimized for touch

## 🎯 Success Metrics

- **Engagement**: Target >90 seconds average time on page
- **Completion**: >75% of users reach final section
- **Performance**: 85+ Lighthouse score
- **Conversion**: >5% contact form interaction rate

## 🔧 Customization

### Personal Information
Update the following files with your information:
- `src/components/HeroSection.tsx` - Name and title
- `src/components/FoundationSection.tsx` - Education and skills
- `src/components/EarlyDiscoveriesSection.tsx` - Early experiences
- `src/components/AscentSection.tsx` - Major projects and achievements
- `src/components/CurrentFrontierSection.tsx` - Current work
- `src/components/ConnectSection.tsx` - Contact information and social links

### Styling
- Modify `src/app/globals.css` for color scheme changes
- Update CSS custom properties in `:root` for theme adjustments

## 🚀 Deployment

Deploy easily on Vercel:

```bash
npm run build
```

Or use the Vercel CLI:
```bash
vercel --prod
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ using Next.js and GSAP**
