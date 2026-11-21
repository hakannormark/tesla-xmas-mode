# Tesla Xmas Mode — Coca-Cola Holiday Edition (3D Pixar Cinema)

En dynamisk **3D-julupplevelse** byggd med Three.js WebGL, fotografisk bloom (`UnrealBloomPass`), PBR-material och volymetriskt ljus för Teslas webbläsare (och enkel test hemma på dator/surfplatta) med **4 valbara 3D-lägen**, **GPS-synkad fart & svängar**, **realtidsgenererat Web Audio-ljud** (utan externa ljudfiler), **riktig Nordpolen-kompass**, **Boring Company-tunnel**, **väderfrost**, **5 Elon-universe-påskägg** samt grafikläget **Pixar Ultra / Eco (MCU2)**.

## De 4 3D-lägena

1. **Coca-Cola Winter Express (3D Pixar Panorama)** — Filmisk sidoåkning längs skulpterad 3D-Tomtesläde med 4 galopperande renar & Rudolph över snöiga alptoppar, norrsken, glödande julstugor och volymetriska gatlyktor. Tryck på skärmen för att släppa en 3D-fallskärmsjulklapp.
2. **Holidays Are Coming: Electric Caravan (3D Coca-Cola Caravan)** — Glödande 3D-konvoj av 3 röda Tesla Semis (`HOLIDAY EXPRESS`) med volymetriska strålkastare och julgrans-Cybertruck som tänder en gyllene ljusvåg längs den snöiga dalen. Tryck för en rullande 3D Tesla Light Show-våg.
3. **North Pole Flight Deck (3D Plaid Flight)** — 3D-jakt bakom Tomtesläden på en väg som böjer sig efter dina svängar. Över 85 km/h aktiveras **Sleigh Plaid Mode** då släden lyfter upp ovanför molnen in i norrskenet. Tryck för att skjuta 3D-stjärnringar.
4. **The Enchanted Snowglobe (3D Crystal Snowglobe)** — En äkta 3D-kristallglob på sammetsröd och mässingsförgylld sockel med miniatyrby, kretsande 3D-släde och 620 snö- & guldflingor som virvlar av bilens G-krafter, flankerad av vintage julmätare (`Renväxel`) och riktig **Nordpolen-kompass**. Tryck för att skaka globen!

## Testa lokalt

```bash
npm install
npm run dev
```

Öppna URL:en i webbläsaren (t.ex. `http://localhost:5173`).

### Kortkommandon vid test på dator
- `1`–`4`: Hoppa direkt till läge 1–4
- `Esc`: Tillbaka till menyn
- `Mellanslag`: Trigga lägets interaktion (julklapp / ljusvåg / stjärnring / skaka globen)
- `T`: Slå på/av Boring Company-tunnel
- `E`: Trigga nästa Elon-påskägg (`Starman`, `Starlink`, `Starship`, `Supercharger`, `Cybertruck`)

## Kör direkt i Teslan (Live via GitHub Pages)

Öppna följande HTTPS-länk i bilens webbläsare (krävs för bilens GPS):

- **https://hakannormark.github.io/tesla-xmas-mode/**

Klicka på **Starta Julmagin**, skruva upp bilens rattvolym och välj **GPS (Bil)** längst ner i menyn (eller under **⚙ Kontroller**). Testa gärna **Ljudtest** om bilen behöver **Media Player**-läget för webbläsarljud.

### Valfria egna `.glb`-modeller
Appen innehåller proportionerliga 3D-skulpturer av **Tesla Semi**, **Cybertruck**, **SpaceX Starship + Super Heavy**, **Roadster + Starman**, **V4 Supercharger** och **Optimus Gen 2** som fungerar direkt utan externa filer. Vill du lägga in egna `.glb`-filer (t.ex. exporterade via `tesla-model-extractor`) kan du lägga dem i `public/models/` och lista filnamnen i `public/models/manifest.json` (`"semi"`, `"cybertruck"`, `"starship"`, `"roadster"`, `"optimus"`).
