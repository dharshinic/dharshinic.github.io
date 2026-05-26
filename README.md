# Dharshini Chembian — Personal Portfolio

A personal portfolio website documenting my journey through tech events, certifications, internships, and professional experience. Built with vanilla HTML, CSS, and JavaScript — no frameworks, no build tools.

🌐 **Live Site:** [dharshinic.github.io](https://dharshinic.github.io)

---

## About

This portfolio is more than a resume — it's a record of lived experiences. Every event I've attended, every certification I've earned, and every role I've held is documented here with context and reflection.

I work as a **Programmer Analyst at Cognizant**, specialising in enterprise integration using TIBCO BW and EMS. Outside of work, I attend tech events, write about what I learn, and share it here.

---

## Features

- **3D Particle Canvas Background** — depth-sorted floating particles with mouse parallax
- **Dark / Light Mode** — persisted across sessions via localStorage
- **Event Journal** — interactive timeline with image slideshow and fullscreen gallery
- **Digital Marketing Portfolio** — in-page PDF viewer with page navigation
- **Blog Pages** — individual event write-ups with scroll animations and image zoom
- **Certifications Showcase** — featured Google ACE cert + cert grid
- **Internship Accordion** — expandable experience entries
- **Contact Form** — powered by EmailJS, no backend required
- **Back to Top Button** — smooth scroll with fade-in animation
- **Custom Cursor** — ring cursor on desktop with hover interactions
- **Fully Responsive** — mobile-first layout with hamburger nav
- **PDF Viewer** — fullscreen modal with blurred backdrop, works on mobile

---

## Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 |
| Styling | CSS3 (custom properties, grid, flexbox) |
| Scripting | Vanilla JavaScript (ES6+) |
| Icons | Lucide Icons (CDN) |
| PDF Rendering | PDF.js (v2.14.305) |
| Contact Form | EmailJS Browser SDK v4 |
| Fonts | Google Fonts — DM Serif Display, Figtree |
| Hosting | GitHub Pages |

---

## Project Structure

```
portfolio/
│
├── index.html                  # Main portfolio page
├── style.css                   # All styles
├── script.js                   # All JavaScript
│
├── events/                     # Individual blog/event pages
│   ├── aws-summit.html
│   ├── data-streaming.html
│   ├── ai-devcon.html
│   ├── ai-memory.html
│   ├── microsoft-ai.html
│   ├── hello-cognizant.html
│   ├── bod.html
│   └── chess.html
│
├── images/                     # All event and profile images
│   ├── 0.jpeg                  
│   ├── 1.jpeg                  
│   ├── aws2.jpeg ... aws9.jpeg
│   ├── ds2.jpeg  ... ds4.jpeg
│   ├── aidevcon2.jpeg ... aidevcon6.jpeg
│   ├── aimem2.jpeg  ... aimem11.jpeg
│   ├── microsoft2.jpg ... microsoft9.jpeg
│   ├── hello2.jpg ... hello4.jpg
│   ├── bod2.jpg   ... bod7.jpg
│   └── chess2.jpg ... chess11.png
│
└── resources/                  # PDFs — certificates, resume, portfolio
    ├── resume.pdf
    ├── digital-marketing.pdf
    ├── google-ace.pdf
    ├── lss-green.pdf
    ├── lss-yellow.pdf
    ├── lss-white.pdf
    ├── github-copilot.pdf
    ├── boomi.pdf
    ├── ernet.pdf
    ├── sme.pdf
    ├── iot.pdf
    ├── nimetler.pdf
    ├── harnium.pdf
    ├── ipsr.pdf
    └── tricaa.pdf
```

---

## Running Locally

The site uses PDF.js, which requires a local server — opening `index.html` directly as a file will not work for the PDF viewer.

**Option 1 — Python (recommended, no install needed):**
```bash
cd path/to/portfolio
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

**Option 2 — VS Code Live Server:**
- Install the **Live Server** extension in VS Code
- Right-click `index.html` → **Open with Live Server**

**Option 3 — Node.js:**
```bash
npx serve .
```

---

## EmailJS Setup

The contact form uses EmailJS. To configure it for your own account:

1. Sign up at [emailjs.com](https://www.emailjs.com)
2. Create an email service and note your **Service ID**
3. Create an email template and note your **Template ID**
4. Copy your **Public Key** from Account settings
5. In `script.js`, update these three values:

```js
emailjs.init('YOUR_PUBLIC_KEY');

emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', { ... })
```

Your email template should use these variables:
- `{{from_name}}` — sender's name
- `{{from_email}}` — sender's email
- `{{message}}` — message body

---

## Events Documented

| Event | Date | Category |
|---|---|---|
| AWS Summit 2026 Bengaluru | April 2026 | Cloud |
| Data Streaming World Tour | April 2026 | Data |
| AI DevCon India 2026 | March 2026 | AI |
| AI Memory Matters | January 2026 | AI |
| Microsoft AI Tour | December 2025 | AI |
| Hello Cognizant | March 2025 | Career |
| Board of Directors Meeting | February 2025 | Leadership |
| 44th FIDE Chess Olympiad | August 2022 | Culture |

---

## Certifications

- **Google Associate Cloud Engineer** — Google Cloud ⭐ Featured
- **Lean Six Sigma Green Belt** — Quality Management
- **Lean Six Sigma Yellow Belt** — Quality Management
- **Lean Six Sigma White Belt** — Quality Management
- **GitHub Copilot** — GitHub
- **Boomi Associate Integration Developer** — Dell Boomi

---

## Internships

- SEO Analyst — Funnel Truffle
- R&D Intern — ERNET India
- Subject Matter Expert
- IoT Intern — Barola Tech
- SEO Writer — Nimetler
- Digital Content Strategist — Harnium
- Digital Marketing — IPSR
- Content Strategist — Tricaa

---

## Current Role

**Programmer Analyst — Cognizant** *(Aug 2024 – Present)*

Working on enterprise integration systems using TIBCO BusinessWorks and TIBCO EMS. Designing scalable, event-driven solutions and handling real-time messaging with exposure to production-grade architectures and system reliability.

**Skills:** TIBCO BW · TIBCO EMS · Integration · API & Workflow · REST · SOAP

---

## Connect

- **Email:** dharshinichembian@gmail.com
- **LinkedIn:** [linkedin.com/in/dharshinichembian](https://www.linkedin.com/in/dharshinichembian/)
- **GitHub:** [github.com/dharshinic](https://github.com/dharshinic)

---

## License

All content on this portfolio — writing, photographs, event narratives, and design — is the original work of Dharshini Chembian. Unauthorised reproduction or redistribution is not permitted.

The code structure may be used for personal reference, but should not be republished as-is without modification.

© 2026 Dharshini Chembian. All rights reserved.
