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
      "meta.title": "Ibrahim Njie — IT-projektledare & IAM-koordinator, Stockholm",
      "meta.description":
        "IT-projektledare & IAM-koordinator i Stockholm — IAM/IGA för 30 000+ identiteter i samhällskritisk infrastruktur. PSM I-certifierad. Portfolio & CV.",
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
        "Jag leder komplexa IT-projekt i samhällskritisk infrastruktur. Tekniken är sällan det svåra — det är människorna runt den.",
      "hero.ctaContact": "Kontakta mig",
      "hero.ctaCv": "Ladda ner CV",
      "hero.meta.location": "Stockholm, Sverige",
      "hero.meta.lang": "Svenska & engelska",
      "hero.meta.cert": "PSM I-certifierad",
      "hero.photoAlt":
        "Ibrahim Njie, IT-projektledare och IAM-koordinator, fotograferad på ett kontor i Stockholm",
      "hero.linkedin.cta": "LinkedIn-profil",

      "stats.identities.value": "30 000+",
      "stats.identities.label": "mänskliga och icke-mänskliga identiteter i scope",
      "stats.budget.value": "25–50 Mkr",
      "stats.budget.label": "budgetomfattning i projekten jag arbetat i",
      "stats.people.value": "28",
      "stats.people.label": "personer i 5 team på tavlan jag ägde",
      "stats.forum.value": "12",
      "stats.forum.label": "projektledare i forumet jag ledde",

      "about.eyebrow": "Om mig",
      "about.heading": "Jag lärde mig intressenthantering innan jag lärde mig Jira",
      "about.body1":
        "Innan IT tillbringade jag fyra år med att driva en pool på ett tjugotal vårdkonsulter — förhandla avtal, hantera vitestvister och medla när en kund och en konsult faktiskt var oense. Ingenting lär dig intressenthantering snabbare än ett uppdrag som spricker en fredag eftermiddag.",
      "about.body2":
        "2024 vidareutbildade jag mig: en YH-examen i IT-projektledning, sedan PSM I. Senast koordinerade jag IAM, IGA och identitetssäkerhet på Trafikförvaltningen, Region Stockholm — en miljö där fel behörighet inte är ett supportärende, utan en NIS2-fråga. Området var nytt för mig. Den där delen där femton personer vill olika saker och någon måste få det att gå ihop var det inte.",
      "about.body3":
        "Det är kortversionen av varför jag jobbar som jag gör: jag tar hellre det obekväma samtalet tidigt än förvaltar en risklista full av sådant ingen ville säga högt.",
      "about.privacy":
        "Lever som jag lär: sidan är helt statisk, laddar ingenting från tredje part och mäter besök utan kakor eller personuppgifter.",
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
      "skills.1.title": "IAM, IGA & identitetsplattformar",
      "skills.1.body": "Identitetslivscykler och behörighetsstyrning i Entra ID, Active Directory och Omada — för både mänskliga och icke-mänskliga identiteter.",
      "skills.2.title": "IT-projektledning & agil leverans",
      "skills.2.body": "Planering och uppföljning i tvärfunktionella team, plus de workshops, DEMOs och retrospectives som håller det i rullning.",
      "skills.3.title": "Stakeholder management & leverantörsstyrning",
      "skills.3.body": "Håller ihop verksamhet, IT, säkerhet, arkitekter och externa leverantörer — även när de är oense.",
      "skills.4.title": "Offentlig upphandling, RFI & kravhantering",
      "skills.4.body": "Sourcing och kravarbete inom offentliga regelverk, NIS2 och GDPR.",
      "skills.5.title": "Risk, beroenden & processoptimering",
      "skills.5.body": "Följer upp det som kan spåra ur en leverans, och tar bort friktionen som bromsar den.",
      "skills.6.title": "Atlassian, dokumentation & spårbarhet",
      "skills.6.body": "Board-struktur, DoR/DoD och diarieföring i Jira, Confluence och JSM — dokumentation som faktiskt används.",

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
      "exp.2.b1": "Ledde ett team på fem som byggde ett skräddarsytt säljstödsystem som ersatte en extern kunds Salesforce-lösning",
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
      "projects.7.title": "Bytte ut Salesforce mot ett skräddarsytt säljstödsystem",
      "projects.7.scope.value": "5",
      "projects.7.scope.label": "personer i teamet jag ledde",
      "projects.7.s": "Situation: En extern kund körde sin säljprocess i Salesforce, men behövde ett system byggt utifrån hur verksamheten faktiskt fungerade – i stället för att anpassa verksamheten efter plattformen.",
      "projects.7.a": "Insats: Ledde projektet och ett internt team på fem personer inklusive mig själv, som projektledare. Ägde kundkontakt och leveransuppföljning och drev arbetet i Scrum – vilket spelade roll, eftersom kraven ändrades under bygget och varje ändring behövde tas om hand utan att teamet tappade fart.",
      "projects.7.r": "Resultat: En levererad, skräddarsydd ersättare för en standardplattform, och en kundrelation som höll genom ett rörligt scope.",
      "projects.chip.custombuild": "Skräddarsytt bygge",
      "projects.chip.procurement": "Upphandling",
      "projects.chip.dataquality": "Datakvalitet",
      "projects.chip.collab": "Samverkan",
      "projects.chip.agilecoaches": "Agila coacher",
      "projects.chip.silos": "Silo-nedbrytning",

      "certs.eyebrow": "Meriter",
      "certs.heading": "Certifieringar & utbildning",
      "certs.psm.title": "Professional Scrum Master I (PSM I)",
      "certs.psm.issuer": "scrum.org",
      "certs.psm.body": "Utfärdad 2025-05-29.",
      "certs.psm.link": "Visa certifikat",
      "certs.psm.verify": "Verifiera hos Scrum.org",
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
      "tools.showMore": "Visa {n} till",
      "tools.showLess": "Visa färre",
      "tools.chip.agilewaterfall": "Agilt & vattenfall",
      "tools.chip.workshop": "Workshopledning",
      "tools.chip.agilecoach": "Agil coach",
      "tools.chip.coaching": "Team- & individcoachning",
      "tools.chip.processopt": "Processoptimering",
      "tools.chip.procurement2": "Offentlig upphandling",
      "tools.chip.bizgov": "Verksamhets- & enterprise governance",
      "tools.chip.transformation": "Transformationsarbete",
      "tools.chip.strategic": "Strategisk projektledning",
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
      "contact.form.error": "Något gick fel. Prova gärna igen, eller maila mig direkt på contact@ibrahimnjie.com.",
      "contact.form.notConfigured":
        "Formuläret är inte aktiverat än — maila mig gärna direkt på contact@ibrahimnjie.com så länge.",

      "footer.rights": "Alla rättigheter förbehållna.",
      "footer.top": "Till toppen",
    },

    en: {
      "meta.title": "Ibrahim Njie — IT Project Manager & IAM Coordinator, Stockholm",
      "meta.description":
        "IT Project Manager & IAM Coordinator in Stockholm — IAM/IGA across 30,000+ identities in society-critical infrastructure. PSM I certified. Portfolio & CV.",
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
        "I lead complex IT projects in critical infrastructure. The technology is rarely the hard part — the people around it are.",
      "hero.ctaContact": "Get in touch",
      "hero.ctaCv": "Download CV",
      "hero.meta.location": "Stockholm, Sweden",
      "hero.meta.lang": "Swedish & English",
      "hero.meta.cert": "PSM I certified",
      "hero.photoAlt":
        "Ibrahim Njie, IT Project Manager and IAM Coordinator, photographed in an office in Stockholm",
      "hero.linkedin.cta": "LinkedIn profile",

      "stats.identities.value": "30,000+",
      "stats.identities.label": "human and non-human identities in scope",
      "stats.budget.value": "25–50M SEK",
      "stats.budget.label": "budget scope of the projects I've worked in",
      "stats.people.value": "28",
      "stats.people.label": "people across 5 teams on the board I owned",
      "stats.forum.value": "12",
      "stats.forum.label": "project managers in the forum I led",

      "about.eyebrow": "About",
      "about.heading": "I learned stakeholder management before I learned Jira",
      "about.body1":
        "Before IT, I spent four years running a pool of around 20 healthcare consultants — negotiating contracts, handling penalty-clause disputes, and mediating when a client and a consultant genuinely disagreed. Nothing teaches you stakeholder management faster than a placement falling apart on a Friday afternoon.",
      "about.body2":
        "In 2024 I retrained: a vocational degree (YH) in IT Project Management, then PSM I. Most recently I coordinated IAM, IGA, and identity security at Trafikförvaltningen, Region Stockholm — an environment where getting access wrong isn't a support ticket, it's a NIS2 question. The domain was new to me. The part where fifteen people want different things and someone has to make it add up was not.",
      "about.body3":
        "That's the short version of why I work the way I do: I'd rather have the uncomfortable conversation early than manage a risk register full of things nobody wanted to say out loud.",
      "about.privacy":
        "Practising what I work with: this site is fully static, loads nothing from third parties, and measures visits without cookies or personal data.",
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
      "skills.1.title": "IAM, IGA & identity platforms",
      "skills.1.body": "Identity lifecycles and access governance across Entra ID, Active Directory, and Omada — human and non-human alike.",
      "skills.2.title": "IT project management & agile delivery",
      "skills.2.body": "Planning and follow-up across cross-functional teams, plus the workshops, demos, and retrospectives that keep it moving.",
      "skills.3.title": "Stakeholder & supplier governance",
      "skills.3.body": "Holding the line between business, IT, security, architects, and external vendors — including when they disagree.",
      "skills.4.title": "Public procurement, RFI & requirements",
      "skills.4.body": "Sourcing and requirements work inside public-sector rules, NIS2, and GDPR.",
      "skills.5.title": "Risk, dependencies & process optimization",
      "skills.5.body": "Tracking what could derail a delivery, and removing the friction that slows it down.",
      "skills.6.title": "Atlassian, documentation & traceability",
      "skills.6.body": "Board structure, DoR/DoD, and records management in Jira, Confluence, and JSM — documentation people actually use.",

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
      "exp.2.b1": "Led a team of five building a custom sales-support system that replaced an external client’s Salesforce setup",
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
      "projects.7.title": "Replacing Salesforce With a Purpose-Built Sales-Support System",
      "projects.7.scope.value": "5",
      "projects.7.scope.label": "people in the team I led",
      "projects.7.s": "Situation: An external client was running its sales process on Salesforce, but needed a system built around how the business actually worked rather than adapting the business to the platform.",
      "projects.7.a": "Action: Led the project and an internal team of five, including myself, as project manager. Owned client contact and delivery follow-up, and ran the work in Scrum — which mattered, because requirements kept changing during the build and each change had to be absorbed without stalling the team.",
      "projects.7.r": "Result: A delivered, custom-built replacement for an off-the-shelf platform, and a client relationship that held through a moving scope.",
      "projects.chip.custombuild": "Custom build",
      "projects.chip.procurement": "Procurement",
      "projects.chip.dataquality": "Data quality",
      "projects.chip.collab": "Collaboration",
      "projects.chip.agilecoaches": "Agile coaches",
      "projects.chip.silos": "Breaking silos",

      "certs.eyebrow": "Credentials",
      "certs.heading": "Certifications & education",
      "certs.psm.title": "Professional Scrum Master I (PSM I)",
      "certs.psm.issuer": "scrum.org",
      "certs.psm.body": "Issued 2025-05-29.",
      "certs.psm.link": "View certificate",
      "certs.psm.verify": "Verify at Scrum.org",
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
      "tools.showMore": "Show {n} more",
      "tools.showLess": "Show less",
      "tools.chip.agilewaterfall": "Agile & waterfall",
      "tools.chip.workshop": "Workshop facilitation",
      "tools.chip.agilecoach": "Agile coach",
      "tools.chip.coaching": "Team & individual coaching",
      "tools.chip.processopt": "Process optimization",
      "tools.chip.procurement2": "Public procurement",
      "tools.chip.bizgov": "Business & enterprise governance",
      "tools.chip.transformation": "Transformation initiatives",
      "tools.chip.strategic": "Strategic project management",
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
      "contact.form.error": "Something went wrong. Please try again, or email me directly at contact@ibrahimnjie.com.",
      "contact.form.notConfigured":
        "The form isn't enabled yet — please email me directly at contact@ibrahimnjie.com for now.",

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

    // Suppress every transition for the duration of the swap. Without this,
    // an element that transitions a property whose value comes from a custom
    // property can stay stuck at the OLD token value after the theme changes
    // — .contact-card did exactly that, keeping the dark #e8edf8 text on the
    // light background at a measured 1.08:1 (effectively invisible). Killing
    // transitions for one frame fixes the whole class of bug instead of
    // patching the individual selectors that happen to hit it today.
    root.classList.add("theme-switching");
    root.setAttribute("data-theme", next);
    localStorage.setItem(STORAGE_THEME, next);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => root.classList.remove("theme-switching"));
    });
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
        lang === "en" ? "assets/cv/CV_Ibrahim_Njie_EN.pdf?v=5" : "assets/cv/CV_Ibrahim_Njie_SV.pdf?v=5"
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
