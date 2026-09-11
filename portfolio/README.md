# Ian Thorng Dy — Portfolio Website

A futuristic, glassmorphism-styled personal portfolio built for job applications to Computer Teacher positions. Pure HTML/CSS/JS — no backend, no build step required.

## Folder structure

```
portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── images/
│   │   ├── profile.jpg        (placeholder — replace with your photo)
│   │   ├── project-1.jpg      (placeholder)
│   │   ├── project-2.jpg      (placeholder)
│   │   └── project-3.jpg      (placeholder)
│   ├── icons/                 (empty — for any custom icons you add)
│   ├── Ian-Thorng-Dy-CV.pdf         (add your CV here — filename must match)
│   └── Ian-Thorng-Dy-Cover-Letter.pdf (add your cover letter here)
└── README.md
```

## 1. Running the site locally

Just double-click `index.html`, or open it directly in any browser (Chrome, Edge, Firefox). No server or install step is required — all fonts, Bootstrap, Font Awesome, and GSAP load from public CDNs, so you'll need an internet connection the first time each page loads.

If you prefer a local server (optional, avoids some browsers' file:// restrictions):
```bash
# From inside the portfolio folder
python3 -m http.server 8000
# then open http://localhost:8000
```

## 2. Adding your profile photo

Two ways to do this:

**A. Permanently (recommended for the live/deployed site)**
Replace `assets/images/profile.jpg` with your own photo, keeping the same filename. A square image (at least 800×800px) works best since it's cropped into a circle.

**B. Live, in the browser (built into the site)**
Click the "Change Photo" button beneath the profile picture on the homepage. You can upload a JPG, PNG, or WEBP file — it previews immediately and is saved in your browser's `localStorage`, so it persists next time you open the site on the same browser. Click "Reset Photo" to go back to the default image. Note: this is a per-browser change only — it does not edit the actual file, so use method A if you want the change to show up for every visitor.

## 3. Adding your CV and cover letter

1. Export your CV as a PDF named exactly `Ian-Thorng-Dy-CV.pdf` and place it inside the `assets/` folder.
2. Export your cover letter as a PDF named exactly `Ian-Thorng-Dy-Cover-Letter.pdf` and place it inside the `assets/` folder.
3. The "Download CV" and "View Cover Letter" buttons throughout the site already point to these exact paths — no code changes needed as long as the filenames match.

## 4. Adding / editing projects

Open `index.html` and find the `<!-- ============ PROJECTS ============ -->` section. Each project is a `.project-card` block. For each one, update:

- `<img src="assets/images/project-1.jpg" ...>` — swap in your own screenshot (drop the image file into `assets/images/`)
- `<h3>Software Development Project</h3>` — project title
- `<p>Add project description here.</p>` — project description
- The `<span class="tag-mini">Tech Stack</span>` — replace with the technologies used (duplicate the `<span>` for multiple tags)
- The two `<a href="#">` links under `.project-links` — point these to your GitHub repo and live demo URL

You can duplicate an entire `.col-lg-4` block to add a fourth project, or delete one to have only two.

## 5. Changing colors

All colors are defined once at the top of `css/style.css` inside the `:root { ... }` block:

```css
:root {
  --bg-primary: #050509;
  --bg-secondary: #0D1220;
  --neon-purple: #A855F7;
  --neon-blue: #3B82F6;
  --neon-cyan: #22D3EE;
  --neon-pink: #EC4899;
  --neon-orange: #F59E0B;
  --text-white: #F8FAFC;
  --text-muted: #94A3B8;
}
```

Changing any of these values updates the color everywhere it's used (buttons, glows, gradients, timeline, icons, etc.) — no need to hunt through the rest of the stylesheet.

## 6. Editing personal/contact info in one place

`js/script.js` contains a small `portfolioData` object near the top of the file with your name, title, email, phone, and location. Update it there if these details change — it's kept separate from the hard-coded HTML so it's easy to find.

## 7. Contact form behavior

This is a frontend-only site, so the contact form does **not** send real emails. When submitted with valid input, it shows a confirmation message ("Thank you! Your message has been prepared.") and prepares a `mailto:` link behind the scenes. If you want the form to actually deliver messages, connect it to a form backend service (e.g. Formspree, EmailJS) or your own server endpoint — this requires a small code change in `js/script.js` inside `initContactForm()`.

## 8. Accessibility & responsiveness

The site is built mobile-first with Bootstrap's grid and custom breakpoints down to 320px, respects `prefers-reduced-motion`, and includes visible focus states, semantic headings, and alt text throughout. Test on a real phone or your browser's device toolbar before sending to employers.

---

Learn Today • Teach Tomorrow • Make a Difference
