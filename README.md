# Ibrahim Njie — Portfolio

Statisk, responsiv portfoliosida. Ren HTML/CSS/JS — inga byggverktyg, inga
paketberoenden, inga externa typsnitt eller skript-CDN:er. Det håller sidan
snabb, enkel att underhålla och minimerar attackytan (se **Säkerhet** nedan).

## Struktur
```
index.html              Hela sidan (en sida, ankarlänkar mellan sektioner)
assets/css/style.css     Design, layout, ljust/mörkt läge
assets/js/script.js      Språkväxling (SV/EN), tema, meny, kontaktformulär
assets/img/favicon.svg   Ikon (initialer "IN")
assets/cv/*.pdf          CV att ladda ner, SV + EN
manifest.json            Grundläggande web app-manifest
robots.txt, sitemap.xml  För sökmotorer
_headers, vercel.json    Extra säkerhetsheaders — används INTE av GitHub
                         Pages (som inte stödjer egna headers), men redo om
                         sidan någon gång flyttas till Netlify/Vercel
```

## Innehåll & källa
Allt innehåll (profiltext, erfarenhet, kompetenser) är hämtat från
`masterprofil.md` i Jobbsök Agent-projektet samt de kompetensord du skickat
in separat. Uppdatera innehåll direkt i `index.html` (texterna finns dubbelt,
en gång på svenska som fallback-text i HTML:en, och en gång i
`assets/js/script.js` under `dict.sv` / `dict.en` — det är JS-ordlistan som
faktiskt visas, så **ändra där**, inte bara i HTML-fallbacken).

## Publicera på GitHub Pages
Repot `https://github.com/Ibbe95/ftw` är redan skapat och tomt. Från den här
mappen:

```bash
git init
git add .
git commit -m "Första version av portfoliosidan"
git branch -M main
git remote add origin https://github.com/Ibbe95/ftw.git
git push -u origin main
```

Aktivera sedan GitHub Pages: repo → **Settings → Pages** → under "Build and
deployment", välj **Deploy from a branch**, branch `main`, mapp `/ (root)`.
Sidan blir tillgänglig på `https://ibbe95.github.io/ftw/` inom någon minut.

Vill du ha ett eget domännamn senare (t.ex. `ibrahimnjie.se`) läggs det till
under samma Pages-inställning ("Custom domain") — hör av dig så hjälper jag
till att peka DNS rätt när du köpt en domän.

## Aktivera kontaktformuläret
Formuläret postar till [Web3Forms](https://web3forms.com) — gratis, ingen
egen backend, ingen inloggning krävs (bara din e-post):

1. Gå till https://web3forms.com, ange din e-post, hämta din **Access Key**
   ur bekräftelsemejlet.
2. Öppna `index.html`, sök upp `REPLACE_WITH_YOUR_WEB3FORMS_KEY` och byt ut
   mot din nyckel.
3. Committa och pusha ändringen.

Tills nyckeln bytts ut visar formuläret ett tydligt felmeddelande istället
för att tyst tappa meddelanden — mailto/telefon/LinkedIn-länkarna i
kontaktsektionen fungerar alltid, oavsett formulärstatus.

## Säkerhet
Sidan är designad för minimal attackyta:
- **Helt statisk** — ingen databas, inget serverskript att attackera.
- **Noll tredjepartsberoenden** vid normal sidvisning — inga CDN-skript,
  inga externa typsnitt (systemtypsnitt används). Den enda externa
  nätverksanropet är det valfria POST-anropet till Web3Forms vid
  formulärskick, och det är explicit vitlistat i Content-Security-Policy.
- **Strikt CSP** via `<meta http-equiv="Content-Security-Policy">` i
  `index.html` — blockerar inline-skript, okända skriptkällor och
  okända anslutningsmål.
- **Spamskydd på formuläret**: dolt honeypot-fält + tidsspärr (avvisar
  submits som sker orimligt snabbt efter sidladdning) + Web3Forms egna
  serversidiga spamfilter.
- **Ingen spårning/analys** — inga analytics-skript, inga cookies utöver
  det du själv väljer (t.ex. tema-/språkval sparas i `localStorage`, som
  aldrig lämnar din enhet).
- **Begränsning på GitHub Pages:** GH Pages kan inte skicka egna
  HTTP-headers (t.ex. `X-Frame-Options`, `Strict-Transport-Security`), bara
  det en `<meta>`-tagg klarar av. `_headers` (Netlify) och `vercel.json`
  (Vercel) i repot ger fullt skydd om sidan någon gång flyttas dit — GitHub
  Pages ger ändå HTTPS automatiskt, vilket täcker det viktigaste.

## Byta ut platshållar-innehåll
- **Foto:** Hero-sektionen använder en initial-baserad grafik istället för
  foto (`hero-visual` i `index.html`). Vill du lägga in ett riktigt foto,
  lägg filen i `assets/img/`, och byt ut `<div class="hero-visual">`-blocket
  mot en `<img>`-tagg (kom ihåg `alt`-text och rimlig filstorlek, gärna
  WebP för snabb laddning).
- **CV:** ligger i `assets/cv/`. Ersätt filerna när du uppdaterar ditt CV
  (behåll samma filnamn så slipper du ändra kod).

## Lokal förhandsgranskning
Öppna `index.html` direkt i webbläsaren, eller kör en enkel lokal server
(rekommenderas för att undvika `file://`-begränsningar i vissa webbläsare):

```bash
python -m http.server 8080
```

och besök `http://localhost:8080`.
