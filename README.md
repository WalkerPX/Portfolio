  # Walker.OS — Portfolio Website

**Walker Birchfield** — History Graduate & Creative Director

A simulated operating system experience that boots from a CRT monitor into a fully interactive desktop with draggable windows, a taskbar, and fullscreen apps.

## 🚀 Deploy to GitHub Pages

1. Drag and drop the **entire `walker-os/` folder** into a new GitHub repository
2. Go to **Settings → Pages** and set the source to **Deploy from branch: main, / (root)**
3. Your site will be live at `https://<username>.github.io/<repo-name>/`

No build step needed. This is pure HTML/CSS/JS.

## 📁 Project Structure

```
walker-os/
├── index.html            # Main Walker.OS page
├── gallery.html          # Full creative gallery page
├── gallery-data.js       # Gallery entries (edit to add new items)
├── assets/               # App icons and branding
│   ├── logo-w-transparent.png
│   ├── AboutIcon.png
│   ├── WorkIcon.png
│   ├── GalleryIcon.png
│   ├── ContactIcon.png
│   └── LinksIcon.png
├── photos/               # ← Drop your actual photos here
│   ├── football/         # Football photography
│   ├── baseball/         # Baseball photography
│   ├── design/           # Graphic design work
│   └── bts/              # Behind-the-scenes photos
└── README.md
```

## 📸 Adding New Photos

**Option A — Quick (just replace files):**
1. Drop your photo into the right `photos/` folder (e.g., `photos/football/`)
2. Rename it to match the existing filename (e.g., `ryan-browne-ball-state.jpg`)
3. The gallery automatically shows it

**Option B — Add new entries:**
1. Drop your photo into `photos/<category>/`
2. Open `gallery-data.js`
3. Add a new entry to the array:
   ```js
   { file: 'your-photo.jpg', title: 'Photo Title', desc: 'Short description' },
   ```
4. The full gallery page and the main OS gallery window will both pick it up

### Photo Guidelines
- Recommended size: 1600×1200px or larger
- Format: JPG or PNG
- Keep file names simple (no spaces — use hyphens)

## 🎨 Customization

- **Replace icons**: Swap the PNGs in `assets/` with your own (keep the same filenames)
- **Change colors**: Edit the `:root` CSS variables in `index.html`
- **Update resume links**: Replace the href in the Work window section of `index.html`

## ✨ Features

- CRT monitor boot sequence → OS desktop
- Draggable, resizable windows with fullscreen support
- Taskbar with icon-only apps + hover tooltips
- Animated window open/close from taskbar icons
- Max/min/close window controls
- Fullscreen tab bar for switching between maximized apps
- Power button with fade-to-monitor animation
- Seamless gallery round-trip with window state persistence
- 12-hour clock in system tray
