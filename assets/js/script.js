"use strict";

/**
 * Ibrahim Njie — Portfolio
 * Vanilla JS, no dependencies, no external script includes.
 * Handles: theme toggle, language toggle (i18n), mobile nav, scroll-spy,
 * reveal-on-scroll, and the contact form (Web3Forms via fetch, no page reload).
 */

(function () {
  const root = document.documentElement;
  const STORAGE_THEME = "ibn_theme";
  const STORAGE_LANG = "ibn_lang";

  /* ----------------------------------------------------------------
   * i18n dictionary
   * ------------------------------------------------------------- */
  const dict = {
    sv: {
      "meta.title": "Ibrahim Njie — IT-projektledare & IAM-koordinator",
      "meta.description":
        "Portfolio för Ibrahim Njie, IT-projektledare med erfarenhet av IAM, agil koordinering och samhällskritiska IT-miljöer.",
      "nav.about": "Om mig",
      "nav.experience": "Erfarenhet",
      "nav.skills": "Kompetens",
      "nav.projects": "Projekt",
      "nav.certifications": "Certifieringar",
      "nav.contact": "Kontakt",
      "nav.toggleMenu": "Öppna/stäng meny",
      "nav.toggleTheme": "Växla mörkt/ljust läge",
      "nav.toggleLang": "Switch to English",
      "nav.skipToContent": "Hoppa till innehåll",

      "hero.badge": "Öppen för nya möjligheter",
      "hero.role": "IT-projektledare & IAM-koordinator",
      "hero.tagline":
        "Jag driver och koordinerar komplexa initiativ i samhällskritiska IT-miljöer — med struktur, tydlighet och samarbete som ledord.",
      "hero.ctaContact": "Kontakta mig",
      "hero.ctaCv": "Ladda ner CV",
      "hero.meta.location": "Stockholm, Sverige",
      "hero.meta.lang": "Svenska & engelska",
      "hero.meta.cert": "PSM I-certifierad",
      "hero.linkedin.label": "Kontakt",
      "hero.linkedin.sub": "Fullständig profil, rekommendationer & nätverk",
      "hero.linkedin.cta": "Se profil",

      "stats.people.value": "28",
      "stats.people.label": "personer i gruppen “Operativ säkerhet” fick strukturerad uppföljning — agil och traditionell",
      "stats.teams.value": "5",
      "stats.teams.label": "team koordinerade under samma governance-modell",
      "stats.consultants.value": "20+",
      "stats.consultants.label": "konsulter i leveranspool med fullt stakeholder-ansvar",
      "stats.cert.value": "PSM I",
      "stats.cert.label": "certifierad Scrum Master via scrum.org",

      "about.eyebrow": "Om mig",
      "about.heading": "Möjliggörare för team i komplexa miljöer",
      "about.body1":
        "IT-projektledare med erfarenhet av att driva och koordinera komplexa initiativ i samhällskritiska enterprise-miljöer. Arbetar strukturerat tvärfunktionellt mellan IT, säkerhet, verksamhet och externa leverantörer – med fokus på planering, uppföljning, riskhantering och stakeholder management.",
      "about.body2":
        "Leder workshops, DEMOs och retrospectives i agila team, och kompletterar praktisk projektledarerfarenhet med en YH-examen i IT-projektledning och en Professional Scrum Master-certifiering (PSM I).",
      "about.privacy":
        "Den här sidan är helt statisk och laddar inga externa typsnitt. Den enda mätningen är en kakfri, GDPR-anpassad besöksräknare (Cloudflare Web Analytics) utan personuppgifter eller spårning mellan sidor — plus, om du väljer att skicka meddelandet, leverans av kontaktformuläret.",
      "about.detail1.title": "Samhällskritisk IT",
      "about.detail1.body": "IAM/IGA-koordinering i en av Sveriges mest komplexa driftmiljöer.",
      "about.detail2.title": "Agilt ledarskap",
      "about.detail2.body": "Workshops, DEMOs, retrospectives och backlog-arbete i praktiken.",
      "about.detail3.title": "Governance & struktur",
      "about.detail3.body": "Kanban, DoR/DoD och dokumentation som faktiskt följs.",
      "about.quote":
        "Jag tror på att vara rak och tydlig, även när det är obekvämt — det bygger förtroende snabbare än något annat. Processer och verktyg, AI inräknat, är bara bra om de faktiskt gör vardagen enklare för människorna som använder dem; jag glömmer aldrig bort det i jakten på effektivitet. Och jag investerar lika mycket i att bygga och hålla liv i relationer som i att optimera ett arbetsflöde — de flesta av mina bästa möjligheter har kommit från människor, inte processer.",

      "skills.eyebrow": "Kompetens",
      "skills.heading": "Kärnkompetenser",
      "skills.sub": "Ett urval av det jag arbetar med dagligen — från agil koordinering till identitetssäkerhet.",
      "skills.1.title": "IT-projektledning & agil koordinering",
      "skills.1.body": "Planering, uppföljning och leverans i tvärfunktionella team.",
      "skills.2.title": "Workshopledning, DEMOs & retrospectives",
      "skills.2.body": "Faciliterar agila ceremonier som faktiskt driver framsteg.",
      "skills.3.title": "Stakeholder management & leverantörsstyrning",
      "skills.3.body": "Koordinerar mellan verksamhet, IT och externa parter.",
      "skills.4.title": "Risk-, beroende- & uppföljningshantering",
      "skills.4.body": "Strukturerad uppföljning mot deadlines och leveranskrav.",
      "skills.5.title": "RFI-processer, kravhantering & sourcing",
      "skills.5.body": "Deltar i strategiska initiativ kring upphandling och krav.",
      "skills.6.title": "IAM & Access Governance (IGA)",
      "skills.6.body": "Identitetslivscykler, behörighetsstyrning och säkerhet.",
      "skills.7.title": "Entra ID, Active Directory & hybrididentitet",
      "skills.7.body": "Insyn i drift och arkitektur kring identitetsplattformar.",
      "skills.8.title": "Atlassian Suite (Jira, Confluence, JSM)",
      "skills.8.body": "Äger board-struktur, governance och dokumentation.",
      "skills.9.title": "Dokumentation, struktur & diarieföring",
      "skills.9.body": "Tydlig spårbarhet och ordning i komplexa initiativ.",
      "skills.10.title": "Process- & strukturoptimering",
      "skills.10.body": "Effektiviserar arbets-, säkerhets- och strukturprocesser, med tydliga kommunikationsplaner som stöd.",

      "exp.eyebrow": "Erfarenhet",
      "exp.heading": "Arbetslivserfarenhet",
      "exp.sub": "Från samhällskritisk IAM-koordinering till leveransansvar för en konsultpool på 20 personer.",
      "exp.1.role": "IT-Projektledare / IAM-koordinator",
      "exp.1.company": "Trafikförvaltningen, Region Stockholm",
      "exp.1.dates": "2025–2026",
      "exp.1.b1": "Koordinerade initiativ inom IAM, IGA och identitetssäkerhet i en av Sveriges mest komplexa och samhällskritiska IT-miljöer",
      "exp.1.b2": "Forumansvarig för samtliga 12 projektledare inom sektionen Infrastruktur & Plattformar – faciliterade erfarenhetsutbyte och förbättringsplaner mellan projektledarna samt optimerade onboarding av nya PM:s; höll även workshops, DEMOs och retrospectives",
      "exp.1.b3": "Ägde Kanban-board och uppföljningsansvar i Jira/Atlassian för hela gruppen “Operativ säkerhet” — 28 personer i 5 team; migrerade planering från PowerPoint till en dynamisk Atlassian-vy; tog fram Definition of Ready (DoR) och Definition of Done (DoD)",
      "exp.1.b4": "Koordinerade mellan IT, säkerhet, verksamhet, arkitekter och externa leverantörer",
      "exp.1.b5": "Deltog i strategiska initiativ kring sourcing, RFI-processer och kravarbete",
      "exp.1.b6": "Drev “AI-champions” — ett organisationsövergripande initiativ för AI-kompetens, inklusive en AI-FAQ baserad på NIS2 och GDPR",
      "exp.2.role": "IT-Projektledare (Praktik)",
      "exp.2.company": "Nvrmind, Stockholm",
      "exp.2.dates": "2025",
      "exp.2.b1": "Ledde utvecklingsprojekt för säljstödsystem åt extern kund i agil miljö",
      "exp.2.b2": "Ansvarade för planering, koordinering och uppföljning av leverans",
      "exp.2.b3": "Samlade in krav och omsatte dessa till Epic- och User Story-breakdowns samt backlog refinement",
      "exp.2.b4": "Säkerställde kommunikation mellan kund och utvecklingsteam, följde upp tidslinjer i GitHub",
      "exp.3.role": "Senior Bemanningsansvarig",
      "exp.3.company": "Vårdbron, Stockholm",
      "exp.3.dates": "2020–2024",
      "exp.3.note": "Kompletterande koordinerings- och leveranskompetens",
      "exp.3.b1": "Leveransansvar för en konsultpool om cirka 20 specialister i en verksamhetskritisk miljö",
      "exp.3.b2": "Ägde stakeholder management mellan kunder (regioner, kommuner, privata vårdaktörer) och konsulter, inklusive konflikthantering",
      "exp.3.b3": "Hanterade upphandlingar, avtal, vitesrisker/vitestvister och ekonomiska mål",
      "exp.3.b4": "Rekryteringsansvar och löneförhandlingar för konsulter i poolen",

      "projects.eyebrow": "Utvalda initiativ",
      "projects.heading": "Projekt & initiativ",
      "projects.sub": "Konkreta exempel på hur jag arbetar — situation, insats och resultat.",
      "projects.1.tag": "Strategisk hemtagning",
      "projects.1.title": "“Egen rådighet” — hemtagning av IAM, IGA & IDP",
      "projects.1.s": "Situation: Trafikförvaltningens IAM, IGA och IDP (både publik och intern identitetsplattform) förvaltades av en extern leverantör — begränsad egen rådighet och sårbarhet vid förändringar.",
      "projects.1.a": "Insats: Deltog i det stora hemtagningsprojektet — bidrog i offentliga upphandlingar och RFI-processer, traditionell projektledning med beroenden till stakeholders över hela verksamheten, budgetering, riskanalyser, projektspecifikationer, arkitektur, diarieföring, statusrapportering och kravhantering, allt inom ramarna för NIS2 och GDPR.",
      "projects.1.r": "Resultat: Ökad egen kontroll över kritisk identitetsinfrastruktur och minskat beroende av extern leverantör.",
      "projects.2.tag": "Samverkan & arbetssätt",
      "projects.2.title": "Silo-nedbrytning över hela IT-avdelningen (300 personer)",
      "projects.2.s": "Situation: IT-avdelningen, cirka 300 personer, arbetade i silos med olika arbetssätt mellan grupper — det försvårade samverkan och kommunikation tvärs över avdelningen.",
      "projects.2.a": "Insats: Deltog tillsammans med Scrum Masters och agila coacher i ett avdelningsövergripande initiativ för att bryta silos, hitta gemensamma arbetssätt och optimera kommunikationen mellan grupper som annars arbetade på mycket olika sätt.",
      "projects.2.r": "Resultat: Ökad samverkan och tydligare gemensamma arbetssätt över hela IT-avdelningen.",
      "projects.3.tag": "Datakvalitet & spårbarhet",
      "projects.3.title": "“Identitetsregister” — konsolidering av spridda identiteter",
      "projects.3.scope.value": "30 000+",
      "projects.3.scope.label": "mänskliga & icke-mänskliga identiteter",
      "projects.budget.value": "25–50 Mkr",
      "projects.budget.label": "projektets budgetomfattning",
      "projects.3.s": "Situation: Cirka 30 000 identiteter — mänskliga och icke-mänskliga — var, och är delvis fortfarande, fragmenterade över många olika system inom Trafikförvaltningen och bland partners, underleverantörer och trafikutövare, vilket försvårade överblick och spårbarhet.",
      "projects.3.a": "Insats: Bidrog till ett omfattande projekt för att samla dessa i ett gemensamt identitetsregister, med fokus på säkerhet, spårbarhet och datakvalitet över hela ekosystemet av parter.",
      "projects.3.r": "Resultat: Bättre överblick över samtliga identiteter — mänskliga och icke-mänskliga — i hela leverantörskedjan, vilket stärkte säkerhet och datakvalitet.",
      "projects.4.tag": "Drift & IGA",
      "projects.4.title": "“Identitetssäkerhet” — driftstöd för Omada",
      "projects.4.s": "Situation: Ett pågående driftprojekt kring Omada (IGA-systemet) behövde stöd i uppföljning och dokumentationshantering.",
      "projects.4.a": "Insats: Stöttade som specialist i uppföljning av Omada, med ansvar för dokumentationshantering, diarieföring och löpande koordinering.",
      "projects.4.r": "Resultat: Ett mindre men viktigt driftprojekt som höll systemet och dess dokumentation i gott skick.",
      "projects.5.tag": "Governance",
      "projects.5.title": "Från PowerPoint till Atlassian",
      "projects.5.s": "Situation: Projektplanering för gruppen “Operativ säkerhet” skedde manuellt i PowerPoint — svårt att följa upp status i realtid för 28 personer.",
      "projects.5.a": "Insats: Migrerade hela planeringen till en dynamisk Jira/Atlassian-vy, tog fram DoR/DoD som leveranskriterier och höll workshops för både fastanställda och konsulter.",
      "projects.5.r": "Resultat: Samlad, uppdaterad överblick för 5 team och tydligare leveranskriterier i hela gruppen.",
      "projects.6.tag": "AI & säkerhet",
      "projects.6.title": "AI-Champions",
      "projects.6.s": "Situation: Behov av samlad vägledning kring AI-verktyg (t.ex. Copilot) utifrån NIS2, GDPR och informationssäkerhet.",
      "projects.6.a": "Insats: Drev initiativet tillsammans med andra projektledare och agila coacher, utvärderade Microsoft 365 Copilot ur ett cybersäkerhetsperspektiv och tog fram en AI-FAQ.",
      "projects.6.r": "Resultat: Tydligare riktlinjer för var data får behandlas och vad som gäller för infosäkerhetsklassad dokumentation.",
      "projects.7.tag": "Kundleverans",
      "projects.7.title": "Säljstödsystem för extern kund",
      "projects.7.s": "Situation: En extern kund behövde ett nytt säljstödsystem utvecklat i agil takt, med två utvecklarpraktikanter i teamet.",
      "projects.7.a": "Insats: Ledde planering och krav → backlog, Epic- och User Story-breakdowns, koordinerade utvecklarteamet och följde upp i GitHub.",
      "projects.7.r": "Resultat: Levererad kundlösning med tydlig kommunikation och uppföljning genom hela projektet.",
      "projects.chip.procurement": "Upphandling",
      "projects.chip.dataquality": "Datakvalitet",
      "projects.chip.records": "Diarieföring",
      "projects.chip.collab": "Samverkan",
      "projects.chip.agilecoaches": "Agila coacher",
      "projects.chip.silos": "Silo-nedbrytning",

      "certs.eyebrow": "Meriter",
      "certs.heading": "Certifieringar & utbildning",
      "certs.psm.title": "Professional Scrum Master I (PSM I)",
      "certs.psm.issuer": "scrum.org",
      "certs.psm.body": "Utfärdad 2025-05-29.",
      "certs.psm.link": "Verifiera certifikat",
      "certs.edu.title": "Yrkeshögskoleexamen — IT-Projektledning",
      "certs.edu.issuer": "300 YH-poäng",
      "certs.edu.body": "2024–2025.",

      "tools.eyebrow": "Verktyg",
      "tools.heading": "Verktyg & metoder",
      "tools.group1": "IAM & Infrastruktur",
      "tools.group2": "Projekt & samarbete",
      "tools.group3": "Metoder & arbetssätt",
      "tools.group4": "Strategi & verksamhet",
      "tools.group5": "AI & automatisering",
      "tools.chip.aicode": "AI-kod & terminaler",
      "tools.showMore": "Visa {n} till",
      "tools.showLess": "Visa färre",
      "tools.chip.crm": "CRM-system",
      "tools.chip.agile": "Agila metoder",
      "tools.chip.waterfall": "Vattenfallsmetoder",
      "tools.chip.workshop": "Workshopledning",
      "tools.chip.planning": "Projektplanering",
      "tools.chip.governance": "Projektstyrning",
      "tools.chip.delivery": "Projektleverans",
      "tools.chip.processopt": "Processoptimering",
      "tools.chip.structopt": "Strukturoptimering",
      "tools.chip.commplan": "Kommunikationsplaner",
      "tools.chip.salarynego": "Löneförhandling",
      "tools.chip.conflict": "Konflikthantering",
      "tools.chip.certs": "Arbetsgivar- & tjänstgöringsintyg",
      "tools.chip.recruitment": "Rekrytering",
      "tools.chip.staffing": "Konsultbemanning",
      "tools.chip.procurement2": "Upphandlingar",
      "tools.chip.agilecoach": "Agil coach",
      "tools.chip.teamcoach": "Teamcoach",
      "tools.chip.indivcoach": "Individuell coach",
      "tools.chip.bizgov": "Verksamhetsstyrning",
      "tools.chip.transformation": "Transformationsarbete",
      "tools.chip.itbiz": "IT/verksamhetsgränslandet",
      "tools.chip.strategic": "Strategisk projektledning",
      "tools.chip.bizdev": "Verksamhetsutveckling",
      "tools.chip.itmgmt": "IT-ledning",
      "tools.chip.public": "Offentlig sektor",

      "contact.eyebrow": "Kontakt",
      "contact.heading": "Nyfiken på ett samarbete?",
      "contact.sub":
        "Hör gärna av dig direkt via e-post/LinkedIn, eller skicka ett meddelande via formuläret — jag återkommer så snart jag kan.",
      "contact.email.label": "E-post",
      "contact.phone.label": "Telefon",
      "contact.linkedin.label": "LinkedIn",
      "contact.location.label": "Plats",
      "contact.location.value": "Stockholm, Sverige",
      "contact.form.name": "Namn",
      "contact.form.email": "E-post",
      "contact.form.message": "Meddelande",
      "contact.form.submit": "Skicka meddelande",
      "contact.form.sending": "Skickar…",
      "contact.form.hint":
        "Meddelandet skickas krypterat till min e-post via Web3Forms. Jag lagrar det inte på den här sidan, och det finns ingen spårning/analys.",
      "contact.form.success": "Tack! Meddelandet är skickat — jag återkommer så snart jag kan.",
      "contact.form.error": "Något gick fel. Prova gärna igen, eller maila mig direkt på ibrahim.njie1995@gmail.com.",
      "contact.form.notConfigured":
        "Formuläret är inte aktiverat än — maila mig gärna direkt på ibrahim.njie1995@gmail.com så länge.",

      "footer.rights": "Alla rättigheter förbehållna.",
      "footer.top": "Till toppen",
    },

    en: {
      "meta.title": "Ibrahim Njie — IT Project Manager & IAM Coordinator",
      "meta.description":
        "Portfolio for Ibrahim Njie, IT Project Manager with experience in IAM, agile coordination and enterprise environments critical to society.",
      "nav.about": "About",
      "nav.experience": "Experience",
      "nav.skills": "Skills",
      "nav.projects": "Projects",
      "nav.certifications": "Certifications",
      "nav.contact": "Contact",
      "nav.toggleMenu": "Open/close menu",
      "nav.toggleTheme": "Toggle dark/light mode",
      "nav.toggleLang": "Byt till svenska",
      "nav.skipToContent": "Skip to content",

      "hero.badge": "Open to new opportunities",
      "hero.role": "IT Project Manager & IAM Coordinator",
      "hero.tagline":
        "I drive and coordinate complex initiatives in enterprise environments critical to society — with structure, clarity, and collaboration as guiding principles.",
      "hero.ctaContact": "Get in touch",
      "hero.ctaCv": "Download CV",
      "hero.meta.location": "Stockholm, Sweden",
      "hero.meta.lang": "Swedish & English",
      "hero.meta.cert": "PSM I certified",
      "hero.linkedin.label": "Connect",
      "hero.linkedin.sub": "Full profile, recommendations & network",
      "hero.linkedin.cta": "View profile",

      "stats.people.value": "28",
      "stats.people.label": "people in the “Operational Security” group brought under structured follow-up — agile and traditional",
      "stats.teams.value": "5",
      "stats.teams.label": "teams coordinated under the same governance model",
      "stats.consultants.value": "20+",
      "stats.consultants.label": "consultants in a delivery pool with full stakeholder ownership",
      "stats.cert.value": "PSM I",
      "stats.cert.label": "certified Scrum Master via scrum.org",

      "about.eyebrow": "About",
      "about.heading": "An enabler for teams in complex environments",
      "about.body1":
        "IT Project Manager with experience driving and coordinating complex initiatives in enterprise environments critical to society. Works in a structured, cross-functional way across IT, security, business, and external suppliers – with a focus on planning, follow-up, risk management, and stakeholder management.",
      "about.body2":
        "Leads workshops, demos, and retrospectives in agile teams, and complements hands-on project management experience with a post-secondary vocational degree (YH) in IT Project Management and a Professional Scrum Master certification (PSM I).",
      "about.privacy":
        "This site is fully static and loads no external fonts. The only measurement is a cookie-free, GDPR-friendly visit counter (Cloudflare Web Analytics) with no personal data or cross-site tracking — plus, if you choose to send it, delivery of the contact form.",
      "about.detail1.title": "Critical infrastructure",
      "about.detail1.body": "IAM/IGA coordination in one of Sweden's most complex operating environments.",
      "about.detail2.title": "Agile leadership",
      "about.detail2.body": "Workshops, demos, retrospectives, and hands-on backlog work.",
      "about.detail3.title": "Governance & structure",
      "about.detail3.body": "Kanban, DoR/DoD, and documentation people actually use.",
      "about.quote":
        "I believe in being direct and clear, even when it's uncomfortable — it builds trust faster than anything else. Process and tools, AI included, are only worth something if they actually make life easier for the people using them; I never lose sight of that in the pursuit of efficiency. And I invest as much in building and maintaining relationships as I do in optimizing a workflow — most of my best opportunities have come from people, not processes.",

      "skills.eyebrow": "Skills",
      "skills.heading": "Core competencies",
      "skills.sub": "A selection of what I work with day to day — from agile coordination to identity security.",
      "skills.1.title": "IT project management & agile coordination",
      "skills.1.body": "Planning, follow-up, and delivery across cross-functional teams.",
      "skills.2.title": "Workshop facilitation, demos & retrospectives",
      "skills.2.body": "Facilitates agile ceremonies that actually drive progress.",
      "skills.3.title": "Stakeholder management & supplier governance",
      "skills.3.body": "Coordinates between business, IT, and external parties.",
      "skills.4.title": "Risk, dependency & follow-up management",
      "skills.4.body": "Structured tracking against deadlines and delivery requirements.",
      "skills.5.title": "RFI processes, requirements & sourcing",
      "skills.5.body": "Involved in strategic procurement and requirements work.",
      "skills.6.title": "IAM & Access Governance (IGA)",
      "skills.6.body": "Identity lifecycles, access governance, and security.",
      "skills.7.title": "Entra ID, Active Directory & hybrid identity",
      "skills.7.body": "Working insight into operations and architecture around identity platforms.",
      "skills.8.title": "Atlassian Suite (Jira, Confluence, JSM)",
      "skills.8.body": "Owns board structure, governance, and documentation.",
      "skills.9.title": "Documentation, structure & records management",
      "skills.9.body": "Clear traceability and order in complex initiatives.",
      "skills.10.title": "Process & structure optimization",
      "skills.10.body": "Streamlines work, security, and structural processes, backed by clear communication plans.",

      "exp.eyebrow": "Experience",
      "exp.heading": "Work experience",
      "exp.sub": "From critical-infrastructure IAM coordination to delivery ownership for a 20-person consultant pool.",
      "exp.1.role": "IT Project Manager / IAM Coordinator",
      "exp.1.company": "Trafikförvaltningen, Region Stockholm",
      "exp.1.dates": "2025–2026",
      "exp.1.b1": "Coordinated initiatives within IAM, IGA, and identity security in one of Sweden's most complex, society-critical IT environments",
      "exp.1.b2": "Forum lead for all 12 project managers within the Infrastructure & Platforms section – facilitated peer knowledge-sharing and improvement plans between PMs, and optimized onboarding for new PMs; also ran workshops, demos, and retrospectives",
      "exp.1.b3": "Owned the Kanban board and follow-up responsibility in Jira/Atlassian for the entire “Operational Security” group — 28 people across 5 teams; migrated planning from PowerPoint to a dynamic Atlassian view; introduced Definition of Ready (DoR) and Definition of Done (DoD)",
      "exp.1.b4": "Coordinated between IT, security, business, architects, and external suppliers",
      "exp.1.b5": "Took part in strategic initiatives around sourcing, RFI processes, and requirements work",
      "exp.1.b6": "Drove “AI Champions” — an organization-wide initiative to build AI competence, including an AI FAQ grounded in NIS2 and GDPR",
      "exp.2.role": "IT Project Manager (Internship)",
      "exp.2.company": "Nvrmind, Stockholm",
      "exp.2.dates": "2025",
      "exp.2.b1": "Led a development project for a sales-support system for an external client in an agile setting",
      "exp.2.b2": "Responsible for planning, coordination, and delivery follow-up",
      "exp.2.b3": "Gathered requirements and translated them into epic and user-story breakdowns plus backlog refinement",
      "exp.2.b4": "Ensured communication between client and development team, tracked timelines in GitHub",
      "exp.3.role": "Senior Staffing Manager",
      "exp.3.company": "Vårdbron, Stockholm",
      "exp.3.dates": "2020–2024",
      "exp.3.note": "Complementary coordination and delivery experience",
      "exp.3.b1": "Delivery ownership for a consultant pool of around 20 specialists in a business-critical environment",
      "exp.3.b2": "Owned stakeholder management between clients (regions, municipalities, private healthcare providers) and consultants, including conflict resolution",
      "exp.3.b3": "Managed procurement, contracts, penalty-clause risk/disputes, and financial targets",
      "exp.3.b4": "Recruitment responsibility and salary negotiations for consultants in the pool",

      "projects.eyebrow": "Selected work",
      "projects.heading": "Projects & initiatives",
      "projects.sub": "Concrete examples of how I work — situation, action, and result.",
      "projects.1.tag": "Strategic insourcing",
      "projects.1.title": "Taking Back Control (“Egen rådighet”) — IAM, IGA & IDP Insourcing",
      "projects.1.s": "Situation: Trafikförvaltningen's IAM, IGA, and IDP (both public and internal identity platform) were managed by an external supplier — limited in-house control and exposure to vendor-driven change.",
      "projects.1.a": "Action: Took part in the large-scale insourcing project — contributed to public procurements and RFI processes, traditional project management with dependencies across stakeholders organization-wide, budgeting, risk analyses, project specifications, architecture, records management, status reporting, and requirements management, all within the frame of NIS2 and GDPR.",
      "projects.1.r": "Result: Increased in-house control over critical identity infrastructure and reduced dependency on the external supplier.",
      "projects.2.tag": "Collaboration & ways of working",
      "projects.2.title": "Breaking Down Silos Across IT (300 People)",
      "projects.2.s": "Situation: The IT department, around 300 people, worked in silos with differing ways of working across groups — making collaboration and communication across the department difficult.",
      "projects.2.a": "Action: Took part together with Scrum Masters and agile coaches in a department-wide initiative to break down silos, establish shared ways of working, and optimize communication between groups that otherwise worked in very different ways.",
      "projects.2.r": "Result: Increased collaboration and clearer shared ways of working across the entire IT department.",
      "projects.3.tag": "Data quality & traceability",
      "projects.3.title": "“Identitetsregister” — Identity Register Consolidation",
      "projects.3.scope.value": "30,000+",
      "projects.3.scope.label": "human & non-human identities",
      "projects.budget.value": "25–50M SEK",
      "projects.budget.label": "project budget scope",
      "projects.3.s": "Situation: Roughly 30,000 identities — human and non-human — were, and to some extent still are, fragmented across many different systems within Trafikförvaltningen and among partners, subcontractors, and transport operators, making oversight and traceability difficult.",
      "projects.3.a": "Action: Contributed to a large-scale project consolidating these into a shared identity register, with a focus on security, traceability, and data quality across the entire ecosystem of parties.",
      "projects.3.r": "Result: Improved visibility into all identities — human and non-human — across the full supply chain, strengthening both security and data quality.",
      "projects.4.tag": "Operations & IGA",
      "projects.4.title": "“Identitetssäkerhet” — Omada Operations Support",
      "projects.4.s": "Situation: An ongoing operational project around Omada (the IGA system) needed support with follow-up and documentation management.",
      "projects.4.a": "Action: Supported as a specialist in following up on Omada, responsible for documentation management, records handling, and ongoing coordination.",
      "projects.4.r": "Result: A smaller but important operational project that kept the system and its documentation in good shape.",
      "projects.5.tag": "Governance",
      "projects.5.title": "From PowerPoint to Atlassian",
      "projects.5.s": "Situation: Project planning for the “Operational Security” group was done manually in PowerPoint — hard to track real-time status for 28 people.",
      "projects.5.a": "Action: Migrated the entire planning process to a dynamic Jira/Atlassian view, introduced DoR/DoD as delivery criteria, and ran workshops for both employees and consultants.",
      "projects.5.r": "Result: A shared, up-to-date overview for 5 teams and clearer delivery criteria across the group.",
      "projects.6.tag": "AI & security",
      "projects.6.title": "AI Champions",
      "projects.6.s": "Situation: Need for unified guidance on AI tools (e.g. Copilot) grounded in NIS2, GDPR, and information security.",
      "projects.6.a": "Action: Drove the initiative together with other project managers and agile coaches, evaluated Microsoft 365 Copilot from a cybersecurity perspective, and produced an AI FAQ.",
      "projects.6.r": "Result: Clearer guidelines on where data may be processed and what applies to information-security-classified documentation.",
      "projects.7.tag": "Client delivery",
      "projects.7.title": "Sales-support system for an external client",
      "projects.7.s": "Situation: An external client needed a new sales-support system built at agile pace, with two developer interns on the team.",
      "projects.7.a": "Action: Led planning and requirements → backlog, epic and user-story breakdowns, coordinated the development team, and tracked progress in GitHub.",
      "projects.7.r": "Result: Delivered client solution with clear communication and follow-up throughout the project.",
      "projects.chip.procurement": "Procurement",
      "projects.chip.dataquality": "Data quality",
      "projects.chip.records": "Records management",
      "projects.chip.collab": "Collaboration",
      "projects.chip.agilecoaches": "Agile coaches",
      "projects.chip.silos": "Breaking silos",

      "certs.eyebrow": "Credentials",
      "certs.heading": "Certifications & education",
      "certs.psm.title": "Professional Scrum Master I (PSM I)",
      "certs.psm.issuer": "scrum.org",
      "certs.psm.body": "Issued 2025-05-29.",
      "certs.psm.link": "Verify certificate",
      "certs.edu.title": "Post-secondary vocational degree — IT Project Management",
      "certs.edu.issuer": "300 YH credits",
      "certs.edu.body": "2024–2025.",

      "tools.eyebrow": "Tools",
      "tools.heading": "Tools & methods",
      "tools.group1": "IAM & infrastructure",
      "tools.group2": "Project & collaboration",
      "tools.group3": "Methods & ways of working",
      "tools.group4": "Strategy & business",
      "tools.group5": "AI & automation",
      "tools.chip.aicode": "AI code & terminals",
      "tools.showMore": "Show {n} more",
      "tools.showLess": "Show less",
      "tools.chip.crm": "CRM systems",
      "tools.chip.agile": "Agile methods",
      "tools.chip.waterfall": "Waterfall methods",
      "tools.chip.workshop": "Workshop facilitation",
      "tools.chip.planning": "Project planning",
      "tools.chip.governance": "Project governance",
      "tools.chip.delivery": "Project delivery",
      "tools.chip.processopt": "Process optimization",
      "tools.chip.structopt": "Structure optimization",
      "tools.chip.commplan": "Communication plans",
      "tools.chip.salarynego": "Salary negotiation",
      "tools.chip.conflict": "Conflict management",
      "tools.chip.certs": "Employer & service certificates",
      "tools.chip.recruitment": "Recruitment",
      "tools.chip.staffing": "Consultant staffing",
      "tools.chip.procurement2": "Procurement",
      "tools.chip.agilecoach": "Agile coach",
      "tools.chip.teamcoach": "Team coach",
      "tools.chip.indivcoach": "Individual coach",
      "tools.chip.bizgov": "Business governance",
      "tools.chip.transformation": "Transformation initiatives",
      "tools.chip.itbiz": "IT/business interface",
      "tools.chip.strategic": "Strategic project management",
      "tools.chip.bizdev": "Organizational development",
      "tools.chip.itmgmt": "IT management",
      "tools.chip.public": "Public sector",

      "contact.eyebrow": "Contact",
      "contact.heading": "Interested in working together?",
      "contact.sub":
        "Feel free to reach out directly via email/LinkedIn, or send a message through the form — I'll get back to you as soon as I can.",
      "contact.email.label": "Email",
      "contact.phone.label": "Phone",
      "contact.linkedin.label": "LinkedIn",
      "contact.location.label": "Location",
      "contact.location.value": "Stockholm, Sweden",
      "contact.form.name": "Name",
      "contact.form.email": "Email",
      "contact.form.message": "Message",
      "contact.form.submit": "Send message",
      "contact.form.sending": "Sending…",
      "contact.form.hint":
        "Your message is delivered to my email via Web3Forms. It isn't stored on this site, and there's no tracking or analytics.",
      "contact.form.success": "Thanks! Your message has been sent — I'll get back to you soon.",
      "contact.form.error": "Something went wrong. Please try again, or email me directly at ibrahim.njie1995@gmail.com.",
      "contact.form.notConfigured":
        "The form isn't enabled yet — please email me directly at ibrahim.njie1995@gmail.com for now.",

      "footer.rights": "All rights reserved.",
      "footer.top": "Back to top",
    },
  };

  /* ----------------------------------------------------------------
   * Theme
   * ------------------------------------------------------------- */
  function initTheme() {
    const saved = localStorage.getItem(STORAGE_THEME);
    if (saved === "dark" || saved === "light") {
      root.setAttribute("data-theme", saved);
    }
  }

  function toggleTheme() {
    // Dark navy is the committed default regardless of OS preference —
    // only an explicit prior choice can make "light" the current state.
    const current = root.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem(STORAGE_THEME, next);
  }

  /* ----------------------------------------------------------------
   * Language
   * ------------------------------------------------------------- */
  function getLang() {
    const saved = localStorage.getItem(STORAGE_LANG);
    if (saved === "sv" || saved === "en") return saved;
    return "en";
  }

  function applyLang(lang) {
    const strings = dict[lang] || dict.sv;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (strings[key] !== undefined) {
        el.textContent = strings[key];
      }
    });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      if (strings[key] !== undefined) {
        el.textContent = strings[key]; // textContent only — never innerHTML with dynamic strings
      }
    });
    document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      const spec = el.getAttribute("data-i18n-attr"); // format: "attr:key"
      const [attr, key] = spec.split(":");
      if (attr && strings[key] !== undefined) {
        el.setAttribute(attr, strings[key]);
      }
    });

    root.setAttribute("lang", lang);
    document.title = strings["meta.title"];
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", strings["meta.description"]);

    const cvLink = document.getElementById("cv-download");
    if (cvLink) {
      cvLink.setAttribute(
        "href",
        lang === "en" ? "assets/cv/CV_Ibrahim_Njie_EN.pdf?v=4" : "assets/cv/CV_Ibrahim_Njie_SV.pdf?v=4"
      );
    }

    document.querySelectorAll("[data-lang-label]").forEach((el) => {
      el.textContent = lang === "sv" ? "EN" : "SV";
    });

    localStorage.setItem(STORAGE_LANG, lang);
  }

  function toggleLang() {
    const next = getLang() === "sv" ? "en" : "sv";
    applyLang(next);
    refreshToolsToggleLabels();
  }

  /* ----------------------------------------------------------------
   * Hero background: a small network graph (nodes + connecting lines)
   * drifting over a procedurally-drawn city skyline silhouette — an
   * IT/OT "structure & communication" motif, entirely generated in
   * Canvas (no image asset, no external library). Respects
   * prefers-reduced-motion by drawing one static frame instead of
   * looping, and repaints on resize/theme change.
   * ------------------------------------------------------------- */
  function initNetworkCanvas() {
    const canvas = document.getElementById("network-canvas");
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes = [];
    let rafId = null;

    function seededRandom(seed) {
      // Deterministic pseudo-random so the skyline doesn't reshuffle on
      // every resize/repaint — just a cheap sine-based hash, not crypto.
      const x = Math.sin(seed * 12.9898) * 43758.5453;
      return x - Math.floor(x);
    }

    function buildNodes() {
      const count = Math.max(16, Math.min(46, Math.round((width * height) / 26000)));
      nodes = Array.from({ length: count }, (_, i) => ({
        x: seededRandom(i * 3.1 + 1) * width,
        y: seededRandom(i * 7.7 + 2) * height * 0.68,
        vx: (seededRandom(i * 5.3 + 3) - 0.5) * 0.18,
        vy: (seededRandom(i * 9.1 + 4) - 0.5) * 0.18,
        r: seededRandom(i * 2.2 + 5) * 1.3 + 1.1,
      }));
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildNodes();
      drawFrame();
    }

    function drawSkyline() {
      const skylineBase = height;
      const bandHeight = height * 0.34;
      const bandTop = height - bandHeight;
      let x = -10;
      let i = 0;
      while (x < width + 10) {
        const w = 14 + seededRandom(i * 4.4 + 10) * 26;
        const h = bandHeight * (0.18 + seededRandom(i * 6.6 + 20) * 0.85);
        const y = skylineBase - h;
        ctx.fillStyle = "rgba(5, 9, 17, 0.85)";
        ctx.fillRect(x, y, w, h);
        // window lights, sparse
        const rows = Math.max(1, Math.floor(h / 14));
        const cols = Math.max(1, Math.floor(w / 9));
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            if (seededRandom(i * 100 + r * 10 + c) > 0.72) {
              ctx.fillStyle = "rgba(133, 180, 255, 0.55)";
              ctx.fillRect(x + 3 + c * 9, y + 6 + r * 14, 2.5, 3.5);
            }
          }
        }
        i++;
        x += w + 3;
      }
      void bandTop;
    }

    function drawFrame() {
      ctx.clearRect(0, 0, width, height);

      const maxDist = Math.min(150, width / 5);
      for (let a = 0; a < nodes.length; a++) {
        for (let b = a + 1; b < nodes.length; b++) {
          const dx = nodes[a].x - nodes[b].x;
          const dy = nodes[a].y - nodes[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.32;
            ctx.strokeStyle = "rgba(90, 150, 255," + alpha + ")";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[a].x, nodes[a].y);
            ctx.lineTo(nodes[b].x, nodes[b].y);
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.fillStyle = "rgba(140, 190, 255, 0.9)";
        ctx.shadowColor = "rgba(76, 141, 255, 0.9)";
        ctx.shadowBlur = 7;
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.shadowBlur = 0;

      drawSkyline();
    }

    // Run the drift/glow animation for a short while to make an impression,
    // then settle on a still frame — an always-on rAF + O(n²) line-distance
    // loop has a real CPU/battery cost on a page left open, for no benefit
    // once the visitor has seen it once.
    const SETTLE_AFTER_MS = 8000;
    let animStart = null;

    function step(timestamp) {
      if (animStart === null) animStart = timestamp;
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height * 0.68) n.vy *= -1;
      });
      drawFrame();
      if (timestamp - animStart < SETTLE_AFTER_MS) {
        rafId = requestAnimationFrame(step);
      } else {
        rafId = null;
      }
    }

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
      // A resize (e.g. rotating a phone) is worth a fresh few seconds of
      // motion rather than staying frozen on a now oddly-cropped frame.
      animStart = null;
      if (!reduceMotion && !rafId) rafId = requestAnimationFrame(step);
    });

    resize();
    if (!reduceMotion) {
      rafId = requestAnimationFrame(step);
    }
    void rafId;
  }

  /* ----------------------------------------------------------------
   * Tools & methods: fold the long tail of each chip group behind a
   * "show N more" toggle instead of dumping everything at once. The
   * extra chips stay in the DOM either way — text search, Ctrl+F and
   * crawlers still see the full list — only the visual wall is trimmed.
   * ------------------------------------------------------------- */
  const VISIBLE_CHIPS = 6;

  function setToggleLabel(toggle, row, expanded) {
    const strings = dict[getLang()] || dict.sv;
    toggle.textContent = expanded
      ? strings["tools.showLess"]
      : strings["tools.showMore"].replace("{n}", row.dataset.hiddenCount || "");
  }

  function initToolsOverflow() {
    document.querySelectorAll(".tools-group .chip-row").forEach((row) => {
      const chips = Array.from(row.querySelectorAll(".chip"));
      // Folding away just one chip isn't worth a click — only bother once
      // there's a real long tail to hide.
      if (chips.length <= VISIBLE_CHIPS + 1) return;

      chips.slice(VISIBLE_CHIPS).forEach((chip) => chip.classList.add("chip--extra"));
      row.dataset.hiddenCount = String(chips.length - VISIBLE_CHIPS);

      const toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "chip chip-toggle";
      toggle.setAttribute("aria-expanded", "false");
      toggle.addEventListener("click", () => {
        const expanded = row.classList.toggle("expanded");
        toggle.setAttribute("aria-expanded", String(expanded));
        setToggleLabel(toggle, row, expanded);
      });
      row.appendChild(toggle);
      setToggleLabel(toggle, row, false);
    });
  }

  function refreshToolsToggleLabels() {
    document.querySelectorAll(".chip-toggle").forEach((toggle) => {
      const row = toggle.closest(".chip-row");
      setToggleLabel(toggle, row, row.classList.contains("expanded"));
    });
  }

  /* ----------------------------------------------------------------
   * Mobile nav
   * ------------------------------------------------------------- */
  function initMobileNav() {
    const toggle = document.getElementById("nav-toggle");
    const panel = document.getElementById("nav-mobile");
    if (!toggle || !panel) return;

    const links = Array.from(panel.querySelectorAll("a"));

    function setOpen(open) {
      panel.setAttribute("data-open", String(open));
      panel.setAttribute("aria-hidden", String(!open));
      toggle.setAttribute("aria-expanded", String(open));
      // The panel is visually collapsed via max-height, which does NOT
      // remove its links from the tab order on its own — do that
      // explicitly so keyboard users can't tab into an invisible menu.
      links.forEach((a) => a.setAttribute("tabindex", open ? "0" : "-1"));
    }

    setOpen(false);

    toggle.addEventListener("click", () => {
      setOpen(panel.getAttribute("data-open") !== "true");
    });

    links.forEach((a) => a.addEventListener("click", () => setOpen(false)));

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });
  }

  /* ----------------------------------------------------------------
   * Scroll-spy for active nav link
   * ------------------------------------------------------------- */
  function initScrollSpy() {
    const links = Array.from(document.querySelectorAll(".nav-desktop a[href^='#']"));
    if (!links.length) return;
    const sections = links
      .map((l) => document.querySelector(l.getAttribute("href")))
      .filter(Boolean);

    if (!("IntersectionObserver" in window) || !sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            links.forEach((l) => l.removeAttribute("aria-current"));
            const match = links.find((l) => l.getAttribute("href") === `#${entry.target.id}`);
            if (match) match.setAttribute("aria-current", "true");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
  }

  /* ----------------------------------------------------------------
   * Reveal-on-scroll
   * ------------------------------------------------------------- */
  function initReveal() {
    const items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    items.forEach((el) => observer.observe(el));
  }

  /* ----------------------------------------------------------------
   * Contact form (Web3Forms, no page reload, spam-resistant)
   *
   * To activate: get a free access key at https://web3forms.com
   * (enter your email, confirm it, paste the key below or into the
   * hidden "access_key" input in index.html). Until a real key is
   * set, submissions are blocked client-side with a clear message —
   * nothing is silently lost.
   * ------------------------------------------------------------- */
  function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    const status = document.getElementById("form-status");
    const submitBtn = form.querySelector('button[type="submit"]');
    const loadedAt = Date.now();

    function setStatus(state, message) {
      status.setAttribute("data-state", state);
      status.textContent = message;
    }

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const lang = getLang();
      const strings = dict[lang] || dict.sv;

      const accessKey = form.querySelector('input[name="access_key"]').value.trim();
      if (!accessKey || accessKey.startsWith("REPLACE_")) {
        setStatus("error", strings["contact.form.notConfigured"]);
        return;
      }

      // Honeypot: bots tend to fill every field, humans never see this one.
      const honeypot = form.querySelector('input[name="website"]');
      if (honeypot && honeypot.value) {
        // Silently drop — behave as if it succeeded so bots learn nothing.
        form.reset();
        setStatus("success", strings["contact.form.success"]);
        return;
      }

      // Simple time-trap: instant submits are almost always automated.
      if (Date.now() - loadedAt < 1500) {
        setStatus("error", strings["contact.form.error"]);
        return;
      }

      submitBtn.disabled = true;
      const originalLabel = submitBtn.textContent;
      submitBtn.textContent = strings["contact.form.sending"];

      try {
        const formData = new FormData(form);
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
        });
        const result = await response.json();

        if (result && result.success) {
          form.reset();
          setStatus("success", strings["contact.form.success"]);
        } else {
          setStatus("error", strings["contact.form.error"]);
        }
      } catch (err) {
        setStatus("error", strings["contact.form.error"]);
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      }
    });
  }

  /* ----------------------------------------------------------------
   * Wire up header controls + init
   * ------------------------------------------------------------- */
  function initControls() {
    const themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) themeBtn.addEventListener("click", toggleTheme);

    const langBtn = document.getElementById("lang-toggle");
    if (langBtn) langBtn.addEventListener("click", toggleLang);

    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  }

  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    applyLang(getLang());
    initControls();
    initNetworkCanvas();
    initToolsOverflow();
    initMobileNav();
    initScrollSpy();
    initReveal();
    initContactForm();
  });
})();
