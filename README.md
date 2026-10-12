# Royal Decor Studios — Website

**“We Décor Your Emotion”**
Premium event decoration studio website for Mohali, Chandigarh, Zirakpur, Kharar, Panchkula & nearby areas.

A fully responsive, fast, SEO-optimized static website (plain HTML + CSS + JavaScript — no build step, no database). All enquiries are routed to **WhatsApp +91 9501354811** and phone calls.

---

## 📁 Folder structure

```
royal-decor-studios/
├── index.html        # Home — hero, services, why us, process, gallery, reviews, areas, booking
├── about.html        # About Us
├── services.html     # All 10 services with WhatsApp "Get a Quote" buttons
├── gallery.html      # Filterable gallery + lightbox
├── contact.html      # Contact cards, availability checker, booking form
├── privacy.html      # Privacy Policy
├── terms.html        # Terms & Conditions
├── css/style.css     # All styles (design system: cream / beige / muted gold / ink)
├── js/main.js        # Nav, reveal animations, gallery filter, lightbox, WhatsApp forms
├── images/           # All photography (compressed JPEGs)
├── robots.txt
├── sitemap.xml
└── README.md
```

---

## ✏️ How to edit (most common changes)

### Contact details (phone / WhatsApp)
Search the `.html` files for `9501354811` and `+91 9501354811` and replace with the new number. WhatsApp deep links use the international format without `+`, e.g. `https://wa.me/919501354811`.

### Services
Edit the cards on `index.html` and the rows on `services.html` (each row has `id="svc-birthday"`, `id="svc-wedding"`, … so footer links keep working).

### Photos — IMPORTANT
The images in `/images` are **sample styling visuals** used so the site launches with a complete, premium look. **Replace them with real photographs from Royal Decor Studios' own completed projects** before sharing the site publicly. Keep the same filenames and the site will update automatically. Never present sample/stock photos as completed client projects.

Recommended image sizes: 1400 px wide JPEG, quality ~80 (the existing files are already compressed this way).

### Business hours
Search for `9:00 AM` in the HTML files and update (marked with an `EDIT` comment in the footer).

### Instagram link
The footer Instagram link points to the studio's profile: `https://www.instagram.com/royal_decorstudio/`. To change it, search the `.html` files for `royal_decorstudio` and update every occurrence (footers + the `sameAs` entry in the JSON-LD on `index.html`).

### Domain
Search for `royaldecorstudio.in` (in `<link rel="canonical">`, `sitemap.xml`, `robots.txt`) and replace with the real domain.

---

## 🔌 Integrations (optional)

### Google Analytics (GA4)
Uncomment the GA block in the `<head>` of each page and replace `G-XXXXXXXXXX` with your Measurement ID.

### Google Search Console
1. Verify the site (HTML meta tag method).
2. Uncomment the `google-site-verification` meta tag in each page's `<head>` and insert your code.
3. Submit `sitemap.xml` in Search Console.

### Google Reviews
The reviews section links customers to your Google reviews and includes a marked container for a genuine Google reviews widget. To show live reviews, connect a trusted Google reviews widget to the studio's **Google Place ID** (hook documented in `js/main.js`). **Never add fabricated reviews, names or ratings.**

### Google Maps embed
A Google Maps embed is intentionally **not** included because the studio's exact business location is not yet confirmed. Once confirmed, add an embed on `contact.html` where the placeholder comment is, using the confirmed location only — do not invent a street address.

---

## 🚀 Going live (SSL/HTTPS ready)

The site is plain static files — it works on any host with HTTPS:

- **Netlify / Vercel / Cloudflare Pages:** drag & drop this folder (or connect a Git repo). HTTPS is automatic.
- **GitHub Pages:** push the folder to a repo, enable Pages. The included `.nojekyll` file makes it work as-is.
- **cPanel / shared hosting:** upload the folder contents to `public_html` (or a subfolder). Enable free SSL (Let's Encrypt) in your hosting panel.

After deploying: update the domain in canonical links, `sitemap.xml` and `robots.txt`, then submit the sitemap to Google Search Console.

---

## 🔍 SEO checklist (already done)

- Unique `<title>` and meta description on every page, built around: *event decorator in Mohali*, *birthday decoration in Mohali*, *wedding decorator in Chandigarh*, *balloon decoration near me*, *baby shower decoration in Mohali*, *roka decoration in Chandigarh*, *anniversary decoration in Mohali*, *car decoration in Mohali*
- Descriptive `alt` text on every image; semantic headings (one `h1` per page)
- `LocalBusiness` structured data (JSON-LD) with accurate info only — name, phone, service areas, hours; **no invented street address**
- Mobile-friendly, fast-loading (compressed, lazy-loaded images, minimal JS)
- Clean internal linking, canonical URLs, `robots.txt`, `sitemap.xml`
- Accessible: skip link, focus styles, aria labels, sufficient contrast, reduced-motion support

---

## 💬 How enquiries work

- Every **Get a Quote** / **Chat on WhatsApp** button opens `https://wa.me/919501354811` with a pre-filled message.
- The **booking form** validates input, then opens WhatsApp with a fully composed message (event type, date, location, name, phone, budget) and shows an on-page confirmation.
- The **availability checker** on the Contact page does the same for date-availability requests.
- **Call Now** buttons use `tel:+919501354811`.

---

© Royal Decor Studios · We Décor Your Emotion

---

## 🔗 Google Business Profile se website kaise link karein (step-by-step, Hinglish)

1. **Business profile kholein** — Google pe "Royal Decor Studios" search karein, ya seedha [business.google.com](https://business.google.com) kholein aur apne Google account se sign in karein.
2. **Edit profile** — Apni listing pe click karke **"Edit profile"** → **"Contact info"** section kholein.
3. **Website URL daalein** — "Website" field mein apni **live** website ka URL daalein:
   - `https://www.royaldecorstudio.in` (agar aap yeh domain le lein)
   - Ya deploy ke baad jo URL milega, jaise `https://royaldecorstudio.netlify.app`
   - Tracking ke liye UTM wala link bhi daal sakte hain:
     `https://www.royaldecorstudio.in/?utm_source=google&utm_medium=organic&utm_campaign=gmb`
4. **Save** karein.
5. **Website verify karein** (agar Google pooche) — sabse aasaan tareeka Google Search Console se:
   - [search.google.com/search-console](https://search.google.com/search-console) mein apni website add karein
   - "HTML tag" verification method chuniye
   - Jo `content="..."` code milega, usko har page ke `<head>` mein is line ko uncomment karke daal dein:
     `<meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />`
   - Search Console mein "Verify" karein, phir Business Profile mein website save karein.
   - Alternative: HTML file download karke site ke root folder mein daal dein.
6. **Sitemap submit karein** — Search Console mein `sitemap.xml` submit karein taaki site jaldi Google mein index ho.
7. **NAP match rakhein** — Google profile, website aur har jagah ek hi naam/phone rakhein: **Royal Decor Studios · +91 9501354811**. (Website mein already same hai ✅)

### Agar business Google pe abhi nahi hai toh pehle yeh karein:
- [business.google.com](https://business.google.com) → **Add your business**
- Name: **Royal Decor Studios**
- Category: **Event decorator** (ya "Event planner")
- Phone: **+91 9501354811**
- Service areas: Mohali, Chandigarh, Zirakpur, Kharar, Panchkula
- Verification: Google postcard ya video verification karega — uske baad profile live hogi aur website link add kar sakte hain.

### Website se Google Business link (reverse direction):
Jab aapka Google profile ka link mil jaye (Google Maps pe apni listing kholkar URL copy karein), toh bataiye — hum footer mein **"Find us on Google"** button add kar denge.
