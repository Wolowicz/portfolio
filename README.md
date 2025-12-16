# 3D Portfolio Website

A modern, scroll-driven 3D portfolio website built with React, Three.js, and React Three Fiber.

## Features

- 🎨 Immersive 3D room scene
- 📜 Scroll-based camera animations
- ⚡ Built with Vite for fast development
- 🎭 Smooth transitions and interactions
- 📱 Fully responsive design
- 🚀 Production-ready and optimized

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **Three.js** - 3D library
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for R3F

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn package manager

## Installation

1. **Navigate to the project directory:**
   ```bash
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Add your 3D model:**
   
   Place your `room.glb` file in the `public/` folder:
   ```
   public/
   └── room.glb
   ```

   **IMPORTANT:** You must provide your own 3D room model. The model should be:
   - Named `room.glb`
   - In GLB format (GLTF Binary)
   - Optimized for web (recommended < 5MB)
   - Positioned at origin (0, 0, 0)

   **Where to get a 3D room model:**
   - Create your own in Blender (free)
   - Download from Sketchfab (many free models)
   - Use [Poly Pizza](https://poly.pizza/)
   - Search "room 3d model glb" on free 3D asset sites

## Running the Project

### Development Mode

Start the development server:

```bash
npm run dev
```

The site will open automatically at `http://localhost:3000`

### Build for Production

Create an optimized production build:

```bash
npm run build
```

The built files will be in the `dist/` folder.

### Analyze Bundle

To generate a bundle analysis (visual report), run:

```bash
npm run build:analyze
```

This creates `dist/stats.html` — open it to inspect chunk sizes and library contributions.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
portfolio/
├── public/
│   └── room.glb              # Your 3D room model (YOU MUST ADD THIS)
├── src/
│   ├── canvas/
│   │   ├── Scene.jsx         # Main 3D canvas setup
│   │   └── Experience.jsx    # 3D scene composition
│   ├── components/
│   │   ├── Room.jsx          # Room model with scroll animations
│   │   └── Lights.jsx        # Scene lighting
│   ├── sections/
│   │   ├── Hero.jsx          # Hero section
│   │   ├── About.jsx         # About section
│   │   ├── Skills.jsx        # Skills section
│   │   ├── Projects.jsx      # Projects section
│   │   └── Contact.jsx       # Contact section
│   ├── styles/
│   │   ├── index.css         # Global styles
│   │   ├── App.css           # App layout styles
│   │   └── sections.css      # Section-specific styles
│   ├── App.jsx               # Main app component
│   └── main.jsx              # Entry point
├── index.html
├── vite.config.js
└── package.json
```

## Customization

### Update Personal Information

1. **Hero Section** - Edit `src/sections/Hero.jsx`:
   - Change "Your Name" to your actual name
   - Update role/title

2. **About Section** - Edit `src/sections/About.jsx`:
   - Update bio text
   - Modify statistics

3. **Skills Section** - Edit `src/sections/Skills.jsx`:
   - Add/remove skills
   - Update categories

4. **Projects Section** - Edit `src/sections/Projects.jsx`:
   - Add your actual projects
   - Update descriptions and tech stacks

5. **Contact Section** - Edit `src/sections/Contact.jsx`:
   - Update email address
   - Update social media links

### Adjust Camera Animation

Edit `src/components/Room.jsx` to modify camera positions and movements for each scroll section.

### Change Colors/Theme

Edit `src/styles/sections.css` to customize:
- Color gradients
- Background colors
- Hover effects
- Typography

## Deployment

### Deploy to Vercel

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy: Yes
   - Which scope: Select your account
   - Link to existing project: No
   - Project name: (press enter for default)
   - Directory: ./
   - Override settings: No

5. **For production deployment:**
   ```bash
   vercel --prod
   ```

### Alternative: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Vite configuration
6. Click "Deploy"

### Deploy to Netlify

1. Build the project:
   ```bash
   npm run build
   ```

2. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

3. Deploy:
   ```bash
   netlify deploy
   ```

4. Follow prompts and select the `dist` folder

5. For production:
   ```bash
   netlify deploy --prod
   ```

## Performance Tips

1. **Optimize your 3D model:**
   - Use Blender to reduce polygon count
   - Compress textures
   - Use Draco compression for GLB files

2. **Lazy load sections:**
   - Images and assets can be lazy loaded

3. **Enable caching:**
   - Configure proper cache headers on your hosting

## Troubleshooting

### Model not loading

- Ensure `room.glb` is in the `public/` folder
- Check browser console for errors
- Verify the GLB file is not corrupted
- Try a different GLB model to test

### Scroll not working

- Check that ScrollControls pages prop matches sections (currently 5)
- Ensure `.sections-container` height is set correctly

### Performance issues

- Reduce model complexity
- Lower texture resolutions
- Disable shadows if needed
- Check for memory leaks in browser DevTools

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

WebGL 2.0 support required.

## License

MIT License - Feel free to use this for your own portfolio!

## Credits

Built with ❤️ using React Three Fiber and Three.js

---

**Need help?** Check the documentation:
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Three.js](https://threejs.org/docs/)
- [Vite](https://vitejs.dev/)
