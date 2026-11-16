/* ============================================================================
   DIVA AI OFFICIAL — SITE CONFIGURATION
   ----------------------------------------------------------------------------
   Root-level file: config.js   |   Edit this file to change the APK download,
   contact details or your custom domain.
   Every page reads these values automatically, so you never have to touch the
   HTML again.
   ========================================================================== */

window.DIVA_CONFIG = {
  /* --------------------------------------------------------------------------
     1) APK DOWNLOAD URL  →  REPLACE THIS WHEN YOU UPLOAD YOUR APK
     --------------------------------------------------------------------------
     Two easy options:

     OPTION A (recommended) — host the file inside this repository:
       1. Upload your APK to the SAME folder as index.html (repository root).
       2. Name it exactly:                  diva-ai-1.0.0.apk
       3. Leave the line below exactly as it is. Done.

     OPTION B — host the file anywhere else (Google Drive direct link,
     MediaFire, GitHub Releases, your own server...):
       Paste the full URL, for example:
       apkUrl: "https://github.com/yourname/diva/releases/download/v1.0.0/diva-ai.apk",
       apkUrl: "https://yourdomain.com/files/diva-ai-1.0.0.apk",
  ------------------------------------------------------------------------- */
  apkUrl: "https://github.com/akandaakibur13-wq/diva-ai-official/releases/download/v1.0.0/diva-ai-1.0.0.apk",
  /* --------------------------------------------------------------------------
     2) RELEASE DETAILS (shown on the Download page and in the footer)
  ------------------------------------------------------------------------- */
  version: "1.0.0",
  fileSize: "24.8 MB",
  releaseDate: "16 November 2026",
  minAndroid: "Android 7.0 (Nougat)",
  testedUpTo: "Android 15",
  architecture: "Universal (arm64-v8a · armeabi-v7a)",
  packageName: "com.divaai.official",
  /* Optional: paste the SHA-256 of your APK so users can verify the file.
     Leave it as an empty string to hide the row completely. */
  sha256: "6bed933100c209252e334e9fa4798813b66cd478d311c08f0a6c006eb8936ba1",

  /* --------------------------------------------------------------------------
     3) CONTACT + BRAND (used by the Contact page, footer and mail links)
  ------------------------------------------------------------------------- */
  contactEmail: "support@divaai.app",
  telegram: "https://t.me/divaai",
  instagram: "https://instagram.com/divaai",
  youtube: "https://youtube.com/@divaai",

  /* --------------------------------------------------------------------------
     4) CUSTOM DOMAIN — change this to your own domain after you connect one.
        It powers the <link rel="canonical"> and social-preview (og:url) tags.
        Leave it empty ("") to skip canonical tags entirely.
  ------------------------------------------------------------------------- */
  siteUrl: ""

  /* --------------------------------------------------------------------------
     5) FUTURE CUSTOM DOMAIN (optional but recommended)
     --------------------------------------------------------------------------
     Every link in this website is *relative* and all files sit in the same
     folder as index.html, so the site works at a root domain
     (https://yourdomain.com), in a project sub-folder
     (https://user.github.io/repo/), or on any free static host — no rebuild
     needed.

     When your domain is ready:
       1. Deploy the site to your host (Netlify, Vercel, GitHub Pages,
          Cloudflare Pages, Hostinger… all support plain HTML).
       2. Point the domain in your host's dashboard (A / CNAME records).
       3. Set siteUrl above to "https://yourdomain.com" — this instantly
          writes the correct <link rel="canonical"> and og:url tags for SEO.
       4. GitHub Pages users: also add a file named CNAME (no extension)
          containing only your domain, in the same folder as index.html.

     NOTE ON FOLDER STRUCTURE
     --------------------------------------------------------------------------
     This build is FLAT: every file lives in the repository root next to
     index.html — style.css, fonts.css, config.js, main.js, diva-avatar.jpg,
     diva-avatar-sm.jpg, favicon.svg, apple-touch-icon.png, og-image.jpg,
     icon-192.png, icon-512.png, site.webmanifest and all .html pages.
     Keep it that way and all links keep working.
  ------------------------------------------------------------------------- */
};
