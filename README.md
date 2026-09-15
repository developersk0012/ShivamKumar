# AI Chat — Vercel version

GitHub Pages cannot run the `/api/chat` Node backend, which causes the `Unexpected token '<'` error because the browser receives an HTML page instead of JSON.

## Deploy
1. Upload this folder/repository to GitHub.
2. Import the repository into Vercel.
3. In Vercel → Settings → Environment Variables, add:
   `TABITOKEN_API_KEY` = your NEW API key.
4. Redeploy.
5. Open the Vercel URL.

Do NOT put the API key inside `public/index.html`.
