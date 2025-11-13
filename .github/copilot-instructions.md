## Quick orientation

This is a small static frontend project (plain HTML/CSS/JS) for the SustentArte site. There is no build system, package.json, or backend code in this repository — the app is served as static files under the project root.

Key files and folders
- `index.html` — splash page that redirects to the login page (`pages/login.html`).
- `pages/` — all app screens (login, cadastro, home, etc.). Note these pages live inside `pages/` and therefore use relative paths such as `../css/` and `../assets/`.
- `css/` — stylesheets (`style.css`, `login.css`, `cadastro.css`).
- `js/` — browser JS entry points (`login.js`, `main.js`).
- `assets/img/` — images and icons used across pages.

Architecture notes (what to know before editing)
- This is client-only UI code. There is no server-side application here.
- Auth/integration: `js/login.js` instantiates a Supabase client (see constants `SUPABASE_URL` and `SUPABASE_ANON_KEY`). Updating auth behavior likely requires editing `js/login.js` and the HTML forms under `pages/`.
- Relative path sensitivity: pages in `pages/` commonly use `../` to reach `css/` and `assets/`. When moving or renaming files, update relative paths accordingly (example: `pages/login.html` references `../js/login.js` and `../assets/img/...`).
- Inconsistent JS/HTML wiring: some pages use inline form handlers (e.g., `onsubmit="handleLogin()"` in `pages/login.html`) while `js/login.js` attaches listeners by `id` (e.g., `entrar`, `cadastro`). Always inspect the target HTML to confirm element ids and event wiring before changing or removing JS.

Developer workflows (what actually works locally)
- No build step. To preview locally, open `index.html` in a browser or serve the directory with a simple static server. Example (PowerShell):

```powershell
# from project root
python -m http.server 8000
# then open http://localhost:8000/
```

- VS Code Live Server extension also works and respects relative paths.

Project-specific conventions & patterns
- Filenames and UI text are in Portuguese. Look for `cadastro`, `login`, `redefinir-senha` when searching for flows.
- DOM-heavy scripts: JS in `js/` accesses elements by `document.getElementById(...)` and manipulates `window.location.href` for navigation.
- Single-purpose JS files — avoid bundling: JS files are included per-page (e.g., `pages/login.html` loads `../js/login.js`). Keep edits minimal and page-scoped unless intentionally refactoring.

Integration points & caution
- Supabase: `js/login.js` contains a Supabase URL and anon key. These are client-side (the anon key is expected to be public), but still be cautious when rotating credentials. If you move to server-side auth, store keys in environment configs.
- CDN: `pages/login.html` loads `@supabase/supabase-js` from jsdelivr. Any change to that integration should preserve the import script tag or replace it consistently across pages.

Examples to help edits
- To change login flow, edit `pages/login.html` (form and IDs: `email`, `senha`, `toggleSenha`) and `js/login.js` (Supabase calls and redirect to `../pages/home.html`).
- To change the splash delay, edit `js/main.js` (variable `tempoAnimacao` controls the redirect timeout).

When adding features
- Keep pages' relative paths intact. Test by serving the site (see workflow above).
- Validate IDs used in JS exist on the target HTML — there are a few mismatches in the repo, so prefer checking the specific page before editing global JS.

If anything here is unclear or you want me to expand on a section (example: map out all event handlers, or extract Supabase usage into a single config), tell me which part and I will iterate.
