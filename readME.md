   # Video Editing Agency Website

A responsive, single-page website for a video editing agency, built with **HTML, CSS and vanilla JavaScript**, bundled with **Vite**, and styled with **Bootstrap 5.3**. It showcases the agency's services and projects and lets visitors send an enquiry directly to the agency's WhatsApp.

**Live link:** `https://your-project.vercel.app` *(replace after deployment)*
**Repository:** `https://github.com/YOUR-USERNAME/video-editing-website` *(replace)*

---

## 1. Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| HTML5 | - | Page structure |
| CSS3 | - | Custom styling, animations, glowing borders |
| JavaScript (ES Modules) | - | Interactivity, animations, form logic (no framework) |
| [Node.js](https://nodejs.org) + npm | Node 18+ | Runs tooling and manages dependencies |
| [Vite](https://vitejs.dev) | latest | Dev server and production bundler |
| [Bootstrap](https://getbootstrap.com) | 5.3.3 | Grid, navbar, cards, buttons, forms |
| [Bootstrap Icons](https://icons.getbootstrap.com) | latest | Icons on service cards and the send button |
| [Fontsource](https://fontsource.org) (Google Fonts) | latest | Self-hosted fonts (Poppins) |

**Why these choices**

- **npm instead of CDN links:** everything is installed locally, so the site works offline and never breaks if a CDN goes down. Versions are locked in `package.json`, so any developer gets the exact same setup with `npm install`.
- **Vite:** browsers cannot read `import 'bootstrap'` directly. Vite resolves imports from `node_modules`, serves the site with live reload during development, and bundles and minifies everything into a `dist` folder for deployment. There is no JSX or framework here, so Vite is used only for bundling.
- **Fontsource instead of the Google Fonts link:** fonts are bundled with the site, which is faster, works offline and avoids third-party requests.

---

## 2. Features

- Fixed navbar that turns from transparent to dark blur on scroll
- Hero section with a looping background video, blur overlay and an animated "jumping letters" title
- Ripple click effect on navbar links
- "Our Services" grid cards with icons and hover animation
- Scroll-reveal animation: cards slide in from the left, bottom and right
- Contact form that opens WhatsApp with a pre-filled message
- Continuously glowing blue animated border on buttons and the contact heading
- Fully responsive (mobile, tablet, desktop)
- Respects `prefers-reduced-motion` (animations turn off for users who request it)

---

## 3. Project Structure

```
video-editing-website/
├── index.html            # All page markup (navbar, hero, services, contact)
├── package.json          # Dependencies and scripts
├── package-lock.json     # Exact dependency versions (do not delete)
├── vite.config.js         
├── .env                   
├── .gitignore            # Excludes node_modules, dist, .env
├── public/               # Files served as-is (referenced with "/")|__videoEditPro1.mp4  # Video of Hero section
│   │      # Shown while the video loads
│   └── videoEdit1.jpg ...videoEdit6.jpg   # Service card images
└── src/
    ├── main.js           # Imports + all JavaScript logic
    └── style.css         # All custom CSS
```

---

## 4. Getting Started

**Requirements:** Node.js 18 or higher (check with `node -v`).

```bash
# 1. Install dependencies (creates node_modules)
npm install

# 2. Start the development server
npm run dev
```

Open the local link shown in the terminal (usually `http://localhost:5173`). The browser refreshes automatically when you save a file.

### Available scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server with live reload |
| `npm run preview` | Previews the production build locally |

### How the dependencies were installed (for reference)

```bash
npm create vite@latest video-editing-website -- --template vanilla
cd my-website
npm install
npm install bootstrap@5.3.3
npm install bootstrap-icons
npm install @fontsource/lobster-two
npm install @fontsource/poppins
```

---

## 5. How It Works (Logic Explained)

### 5.1 Entry point: `src/main.js`

All libraries are imported here, so `index.html` needs only one script tag: `<script type="module" src="/src/main.js"></script>`.

```javascript
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';   // includes Popper (dropdowns, collapse)
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/700.css';
import './style.css';                                  // imported last so it can override Bootstrap
```

### 5.2 Fixed navbar (`fixed-top`)

- Bootstrap's `fixed-top` pins the navbar to the top of the page.
- JavaScript listens to the `scroll` event and toggles a `scrolled` class when `window.scrollY > 50`.
- CSS gives `.scrolled` a dark, blurred background (`backdrop-filter: blur`).
- `html { scroll-behavior: smooth; scroll-padding-top: 70px; }` makes anchor links scroll smoothly without hiding sections behind the navbar.
- The mobile menu is handled automatically by Bootstrap's collapse component.

### 5.3 Hero video overlay

- A `<video>` with `autoplay muted loop playsinline` sits behind the content (`position: absolute; object-fit: cover`).
- `muted` is required, as browsers block autoplay with sound. `playsinline` prevents fullscreen takeover on mobile.
- Bootstrap's `card-img-overlay` layer sits on top with `backdrop-filter: blur(6px)` and a semi-transparent dark background, so text stays readable.

### 5.4 "Jumping letters" title animation

1. JavaScript reads the title text and splits it into words, then letters.
2. Each word is wrapped in `<span class="word">` and each letter in `<span class="letter">`.
3. Each letter receives a CSS variable `--i` (0, 1, 2...).
4. CSS uses `animation-delay: calc(var(--i) * 0.06s)`, so letters jump one after another, creating a wave.
5. The original text is stored in `aria-label` and the spans are `aria-hidden`, so screen readers still read the title correctly.


### 5.6 Service cards and scroll reveal

- Cards use Bootstrap's grid: `col-12 col-md-6 col-lg-4` (1, 2 or 3 per row depending on screen size). `h-100` keeps card heights equal.
- JavaScript uses `IntersectionObserver` to detect when a card enters the viewport (15% visible).
- Cards get a direction class (left, bottom, right, repeating), start hidden and offset, and a `show` class transitions them to their natural position.
- `transitionDelay` staggers the cards in each row.
- The observer stops watching a card after it appears, so the animation plays once.
- `IntersectionObserver` works in all modern browsers (an earlier CSS `animation-timeline` approach was dropped because Firefox did not support it by default).
- If JavaScript fails, cards simply stay visible, since the hiding classes are added by JavaScript.

### 5.7 Contact form to WhatsApp

1. The form's `submit` event is intercepted with `e.preventDefault()`.
2. Name, email, phone and message are read and trimmed.
3. A formatted message is built using template literals (backticks and `${...}`), with `\n` for new lines and `*bold*` WhatsApp formatting.
4. The text is passed through `encodeURIComponent()` so special characters, spaces and emojis are URL-safe.
5. The URL `https://wa.me/<number>?text=<message>` is opened in a new tab.
6. WhatsApp opens with the message pre-filled. **The visitor must press Send themselves.** WhatsApp does not allow websites to send messages automatically.

The number must include the country code, with no `+`, spaces or leading zero (for example `923001234567`).

### 5.8 Glowing animated border

Applied with the `glow-btn` class (buttons) and on the contact heading.

- A `conic-gradient` creates a rotating colour wheel in which only a small segment is bright blue and the rest is transparent.
- The `background` uses two layers: a solid fill clipped to `padding-box` and the gradient clipped to `border-box`. The gradient is therefore only visible in the transparent border area.
- `@property --angle` registers the angle as an animatable CSS value. Without it, the browser cannot animate a custom property.
- `@keyframes spin-border` rotates `--angle` from `0deg` to `360deg` in a 3 second infinite loop.
- `filter: drop-shadow` adds the outer glow.
- The colours are set with `--btn-bg` and `--glow`, so each button can have its own colours.

### 5.9 Contact form styling

Theme colours are CSS variables in `:root` (`--blue`, `--blue-dark`, `--blue-soft`, `--offwhite`). Changing these changes the whole theme. The send button includes a Bootstrap Icons paper plane (`bi-send-fill`) that moves up and to the right on hover.

---

## 6. Customization Guide

| Task | Where |
|---|---|
| Change theme colours | `:root` variables in `src/style.css` |
| Change hero title and description | The `card-title` and `card-text` in `index.html` |
| Change hero video | Replace `public/videos/bg.mp4` (keep it under about 5 MB) |
| Change fonts | Install another `@fontsource/<font-name>` package, import it in `main.js`, update `font-family` in CSS |
| Change service cards | Edit the card blocks in `index.html`; icons are listed at icons.getbootstrap.com |
| Change WhatsApp number | `whatsappNumber` in `src/main.js` (or `.env`, see below) |
| Change glow colour or speed | `--glow`, `--btn-bg` and `3s` in the `.glow-btn` rule |

### Using a `.env` file for the WhatsApp number (optional)

Create `.env` in the project root:

```
VITE_WHATSAPP_NUMBER=923001234567
```

In `src/main.js`:

```javascript
const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
```

> **Note:** The number is still visible in the final built JavaScript. This only makes it easier to change. Anything in frontend code is public.

---

## 10. Author

Built by **MARIAM SAAD** as an internship project.
Contact: `samariam597@gmail.com`
