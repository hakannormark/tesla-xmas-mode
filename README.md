# Tesla Xmas Mode — Coca-Cola Holiday Edition (3D Pixar Cinema)

En dynamisk **3D-julupplevelse** byggd med Three.js WebGL, fotografisk bloom (`UnrealBloomPass`), PBR-material, **GPU-blend shapes & fjäderfysik för Pixar-karaktärer**, **realtidsvärld från OpenStreetMap + GPS**, samt **volymetriskt ljus** för Teslas webbläsare (och enkel test hemma på dator/surfplatta) med **5 valbara 3D-lägen**, **realtidsgenererat Web Audio-ljud** (utan externa ljudfiler), **riktig Nordpolen-kompass**, **Boring Company-tunnel**, **väderfrost**, **5 Elon-universe-påskägg** samt grafikläget **Pixar Ultra / Eco (MCU2)**.

## De 5 3D-lägena

1. **Coca-Cola Winter Express (3D Pixar Panorama)** — Filmisk sidoåkning längs skulpterad 3D-Tomtesläde med 4 galopperande renar & Rudolph med levande **blend shapes** (`Ho-Ho-Ho`, blinkningar, spetsade öron, vindduk & 4-takts galopp) över snöiga alptoppar, norrsken, sprakande eldstäder, **animerade skogsdjur (ren/hjort, räv, uggla, hare)** samt **OpenStreetMap-synkade sjöar, stadssiluett & trävägvisare**. Tryck på skärmen för att släppa en 3D-fallskärmsjulklapp.
2. **Holidays Are Coming: Electric Caravan (3D Coca-Cola Caravan)** — Glödande 3D-konvoj av 3 röda Tesla Semis (`HOLIDAY EXPRESS`) med volymetriska strålkastare och julgrans-Cybertruck som tänder en gyllene ljusvåg längs den snöiga dalen bland skogens djur. Tryck för en rullande 3D Tesla Light Show-våg.
3. **North Pole Flight Deck (3D OSM Skogsvärld)** — 3D-flygning genom verkliga **OpenStreetMap-byggnader, kyrktorn, korsande gator, vatten och skogar** omskapade till ett gnistrande snöigt skogslandskap fullt av igenkännbara byggnader, träskyltar och **animerade djur längs skogsbrynen**. Över 85 km/h lyfter släden upp ovanför molnen i Plaid-fart. Tryck för att skjuta 3D-stjärnringar.
4. **The Enchanted Snowglobe (3D Crystal Snowglobe)** — En äkta 3D-kristallglob på sammetsröd och mässingsförgylld sockel med miniatyrby, kretsande 3D-släde och snö- & guldflingor som virvlar av bilens G-krafter, flankerad av vintage julmätare (`Renväxel`) och riktig **Nordpolen-kompass**. Tryck för att skaka globen!
5. **Elon Holiday Timeline (2006–2026)** — Kör förbi **14 fullskaliga Elon-händelser längs vintervägen** med gyllene tidsportaler, vägledande Tomtesläde och animerade skogsdjur — där milstolpar från **Secret Master Plan (2006)** och **Tesla Private at $420 — Funding Secured (2018)** till **Starman**, **Cybertruck Armor Glass** och **Mechazilla Catch (2024)** dyker upp i 3D längs vägrenen och över himlen.

## Testa lokalt

```bash
npm install
npm run dev
```

Öppna URL:en i webbläsaren (t.ex. `http://localhost:5173/tesla-xmas-mode/`).

### Kortkommandon vid test på dator
- `1`–`5`: Hoppa direkt till läge 1–5
- `Esc`: Tillbaka till menyn
- `Mellanslag`: Trigga lägets interaktion (julklapp / ljusvåg / stjärnring / skaka globen / fira milstolpe)
- `T`: Slå på/av Boring Company-tunnel
- `E`: Trigga nästa Elon-påskägg (`Starman`, `Starlink`, `Starship`, `Supercharger`, `Cybertruck`)

## Kör direkt i Teslan (Live via GitHub Pages)

Öppna följande HTTPS-länk i bilens webbläsare (krävs för bilens GPS & OpenStreetMap):

- **https://hakannormark.github.io/tesla-xmas-mode/**

Klicka på **Starta Julmagin**, skruva upp bilens rattvolym och välj **GPS (Bil)** längst ner i menyn (eller under **⚙ Kontroller**). I **Demo Drive** kan du även stega genom den svenska julruttens OpenStreetMap-biomer via **📍 Nästa demo-plats** i kontrollpanelen. Testa gärna **Ljudtest** om bilen behöver **Media Player**-läget för webbläsarljud.

### Valfria egna `.glb`-modeller
Appen innehåller proportionerliga 3D-skulpturer av **Tesla Semi**, **Cybertruck**, **SpaceX Starship + Super Heavy**, **Roadster + Starman**, **V4 Supercharger** och **Optimus Gen 2** som fungerar direkt utan externa filer. Vill du lägga in egna `.glb`-filer (t.ex. exporterade via `tesla-model-extractor`) kan du lägga dem i `public/models/` och lista filnamnen i `public/models/manifest.json` (`"semi"`, `"cybertruck"`, `"starship"`, `"roadster"`, `"optimus"`).
