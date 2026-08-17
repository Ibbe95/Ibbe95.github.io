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
**Steg 1 — byt repo-namn (ger en ren adress utan `/ftw/`-suffix):**
Gå till `https://github.com/Ibbe95/ftw` → **Settings** → byt "Repository name"
till exakt `Ibbe95.github.io` → **Rename**. Det här är GitHub:s specialnamn
för ett personligt sajt-repo — det gör att Pages hamnar direkt på
`https://ibbe95.github.io/` istället för `https://ibbe95.github.io/ftw/`.

**Steg 2 — pusha koden** (repot är redan git-initierat lokalt med en commit
klar, se `git log` i den här mappen). Antingen via GitHub Desktop
(**Add Local Repository** → peka på den här mappen → **Push origin**), eller
i terminalen:

```bash
git remote set-url origin https://github.com/Ibbe95/Ibbe95.github.io.git
git push -u origin main
```

**Steg 3 — aktivera GitHub Pages:** repo → **Settings → Pages** → under
"Build and deployment", välj **Deploy from a branch**, branch `main`, mapp
`/ (root)`. Sidan blir tillgänglig på `https://ibbe95.github.io/` inom någon
minut.

## Koppla eget domännamn (t.ex. `ibrahimnjie.se`)
Domänköpet gör du själv hos en registrar som stödjer `.se` (t.ex.
[Loopia](https://www.loopia.se), [One.com](https://www.one.com/sv/) eller
[Binero](https://www.binero.se)) — det är ett köp jag inte kan göra åt dig.
När du har domänen, hör av dig så hjälper jag till med:

1. Lägg till en fil `CNAME` i repo-roten med bara domännamnet i, t.ex.
   `ibrahimnjie.se`.
2. Hos din registrar, peka domänen mot GitHub Pages: antingen en
   **ALIAS/ANAME**-post mot `ibbe95.github.io`, eller fyra **A-poster** mot
   GitHub Pages IP-adresser (`185.199.108.153`, `.109.153`, `.110.153`,
   `.111.153`) — vilket som stöds beror på din registrar.
3. I **Settings → Pages** på GitHub, fyll i domänen under "Custom domain"
   och vänta på att DNS-kontrollen blir grön (kan ta upp till någon timme).
4. Uppdatera `og:url`/`canonical` i `index.html` samt `robots.txt` och
   `sitemap.xml` till den nya domänen — säg till så fixar jag det.

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
- **Foto:** Hero-sektionen är kopplad till `assets/img/portrait.jpg` — lägg
  bildfilen där (exakt det filnamnet) så dyker den upp automatiskt, beskuren
  till en rundad kvadrat med en lätt ramdetalj bakom. Saknas filen visas
  initial-grafiken ("IN") som fallback istället för en trasig bild-ikon.
  Rimlig storlek: kvadratisk eller stående beskärning, minst ~800×800px,
  komprimerad till under ~300 KB (t.ex. via [squoosh.app](https://squoosh.app)).
- **CV:** ligger i `assets/cv/`. Ersätt filerna när du uppdaterar ditt CV
  (behåll samma filnamn så slipper du ändra kod).

## Lokal förhandsgranskning
Öppna `index.html` direkt i webbläsaren, eller kör en enkel lokal server
(rekommenderas för att undvika `file://`-begränsningar i vissa webbläsare):

```bash
python -m http.server 8080
```

och besök `http://localhost:8080`.
