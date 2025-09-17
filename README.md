# 🎵 Gumu Player

A beautiful, modern music player that streams from YouTube - built by a CSE student who was fed up with Spotify's premium prompts.

![Gumu Player](public/icon-512.png)

## 🚀 The Story Behind Gumu

Hi! I'm a second-year **CSE (AIML) student** at **Brainware University**. Fed up with Spotify's premium prompts interrupting my study sessions, I decided to build my own music player. 

**Gumu Player** is the result - a beautiful, free music streaming app that gives you unlimited access to millions of songs without any premium pressure.

## ✨ Features

- **🔍 Smart Search**: Search millions of songs from YouTube
- **🎵 Beautiful Player**: Modern UI with smooth animations and gradients
- **📱 PWA Support**: Install as an app with background playback
- **🎮 Media Controls**: Lock screen and notification controls
- **🔄 Advanced Autoplay**: Seamless song-to-song playback with queue management
- **📱 Responsive Design**: Perfect on all devices
- **⚡ Fast Performance**: Optimized YouTube API integration
- **🎨 Dark Theme**: Elegant interface with purple accents
- **🆓 Completely Free**: No premium prompts, no subscriptions, no limits

## 🎯 Why Gumu Player?

- **Student-Built**: Created by a student who understands the struggle
- **No Premium Pressure**: Enjoy unlimited music without constant upgrade prompts
- **Study-Friendly**: Designed for long coding/study sessions
- **Open Source Spirit**: Built with modern web technologies
- **Mobile-First**: Works perfectly on your phone for music on the go

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- YouTube Data API v3 key from [Google Cloud Console](https://console.cloud.google.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get YouTube API Key**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable YouTube Data API v3
   - Create credentials (API Key)
   - Restrict the key to YouTube Data API v3

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   - Navigate to `http://localhost:8080`
   - The app will use the configured API key

## 🎮 How to Use

1. **Search**: Enter song name, artist, or any music-related query
2. **Play**: Click on any track from search results
3. **Enjoy**: The entire search results become your queue with autoplay
4. **Controls**: Use the bottom player bar for all controls
5. **Repeat/Shuffle**: Toggle modes for different listening experiences
6. **Install**: Add to home screen for the best experience

## 📱 PWA Installation

### On Mobile (Android/iOS):
1. Open Gumu Player in your mobile browser
2. Look for "Add to Home Screen" prompt
3. Tap "Add" or "Install"
4. Enjoy background playback like a native app!

### On Desktop:
1. Look for the install icon in your browser's address bar
2. Click "Install" to add to your desktop
3. Launch directly from your desktop

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **APIs**: YouTube Data API v3 + YouTube IFrame Player API
- **PWA**: Service Workers + Web App Manifest
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **State Management**: React Hooks + Context

## 🎨 Design Philosophy

Gumu Player follows a **student-friendly** design philosophy:

- **Dark Theme**: Easy on the eyes during long study sessions
- **Purple Gradients**: Modern, vibrant, and energetic
- **Minimal UI**: No clutter, just pure music experience
- **Mobile-First**: Optimized for students always on the move
- **Performance-First**: Fast loading, smooth animations

## 🔧 Configuration

### API Integration
The app uses the YouTube Data API v3 with your personal API key. The key is stored securely and only used for searching music.

### PWA Features
- **Background Playback**: Music continues even when screen is off
- **Media Session**: Lock screen controls and notifications
- **Offline Support**: Basic offline functionality for cached content
- **Installation**: Add to home screen on any device

## 📋 API Usage & Limits

YouTube Data API v3 quotas:
- **Free Tier**: 10,000 units per day
- **Search**: ~100 units per search
- **Video Details**: 1 unit per video

**Tip**: Each search result gives you ~20 songs, so you can discover plenty of music within the daily limit!

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel via their CLI or GitHub integration
```

### Netlify
```bash
npm run build
# Deploy dist/ folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Deploy dist/ folder to gh-pages branch
```

## ⚖️ Legal & Compliance

**Important**: Gumu Player complies with YouTube's Terms of Service:

- ✅ Uses official YouTube APIs
- ✅ Respects YouTube's branding guidelines
- ✅ Does not download or cache video content
- ✅ Maintains YouTube's attribution requirements
- ✅ No ad-blocking or content modification

## 🧪 Testing

### Manual Testing Checklist:
- [ ] Search functionality works smoothly
- [ ] Autoplay continues between songs
- [ ] All player controls respond correctly
- [ ] PWA installation works on mobile
- [ ] Background playback functions properly
- [ ] Responsive design on all screen sizes
- [ ] About section displays correctly

## 👨‍💻 About the Developer

I'm a passionate **Computer Science & Engineering (AI/ML)** student at **Brainware University**. When I'm not coding or studying, I'm probably listening to music - which is exactly why I built Gumu Player!

**Connect with me:**
- GitHub: [Your GitHub Profile]
- LinkedIn: [Your LinkedIn Profile]
- University: Brainware University, CSE (AIML) - 2nd Year

## 🤝 Contributing

Fellow students and developers are welcome to contribute!

1. Fork the repository
2. Create a feature branch
3. Make your improvements
4. Test thoroughly
5. Submit a pull request

## 💝 Show Your Support

If you're a student who's also tired of premium prompts, give this project a ⭐! 

Share it with your friends who need free music streaming for their study sessions.

## 📄 License

This project is open source and available for educational purposes. Please respect YouTube's Terms of Service and copyright laws.

---

**Built with ❤️ by a broke CSE student for broke students everywhere** 🎓🎵

*"If you can't afford premium, build your own premium."*