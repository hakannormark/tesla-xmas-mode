# Vintervärlden · Julkarta i 3D (Tesla Xmas Mode)

En interaktiv **3D-julvärld i realtid** byggd med Three.js WebGL, PBR-material, MSAA och fotografisk bloom för Teslas webbläsare (och enkel förhandsvisning på dator eller surfplatta). Startsidan öppnar numera direkt **Vintervärlden** — en GPS-driven julkarta i Tesla FSD-stil — medan de klassiska lägena finns kvar under `./klassisk.html`.

- **Live på GitHub Pages:** **https://hakannormark.github.io/tesla-xmas-mode/**
- **Snabb demo på dator:** **https://hakannormark.github.io/tesla-xmas-mode/?demo=1**
- **Klassiska lägen:** **https://hakannormark.github.io/tesla-xmas-mode/klassisk.html** *(tidigare `/dev/`-bokmärken omdirigeras automatiskt till startsidan)*

## Huvudfunktioner i Vintervärlden

- **GPS-driven OpenStreetMap-vinterkarta**: Hämtar verkliga gator, rundade korsningar, julpyntade stugor, skogar, alpina siluetter och **Tesla Gigafactories** med solcellstak runt din position, med stöd för **Riktig höjddata** och en separat testrutt för höjdterräng.
- **Tesla FSD Reality View Christmas Edition**: Följer vägen med **`FSD Julbana`**, valbara fordon (**🎅 Släde** med renar & Rudolph, **🚛 Tesla Semi**, **📐 Cybertruck** och **🚀 Starman Roadster**) samt tre kameralägen (**FSD Vy**, **Kartvy**, **Filmisk**) som automatiskt centrerar tillbaka efter 5 sekunders inaktivitet.
- **Live-himlen & Starman-flyg**: Riktiga ADS-B-flygplan i närheten visas på himlen som **Starman i körsbärsröd Tesla Roadster** med kallgasraketer (klicka på ett flyg för flygbolag, rutt och höjd i julgranar), tillsammans med **ISS med tomteluva**, Mars, **SpaceX-uppskjutningsnedräkning**, norrsken, väderdata och svensk julkalender (**1–4 Advent**, **Lucia 13 dec**, **Julafton 24 dec**).
- **Levande vintervärld & interaktioner**: Mötande jul- och Teslatrafik, Coca-Cola/Tesla-julkaravan, Cybertruck-plogbil, **Boring-tunneln**, **Elon-tidslinje**, snabbknappar längs nederkanten (**🎁 Julklapp**, **❄ Snöboll**, **🎺 Tut**, **🎅 Ho-Ho**, **✨ Ljus**) samt frost på skärmen som kan torkas bort med fingret eller musen.
- **Grafik & bilstereo-ljud**: Välj mellan **Pixar Ultra** och **Eco (MCU2)**, färgteman (**Klassisk**, **Nordisk**, **Cyber 2099**), himmel (**Auto**, **Midnatt**, **Blå**, **Dag**), syntetiserat Web Audio-ljud + `Ho-Ho-Ho`-röst, ljudrutt (**Direkt** / **Media Player**), kupémikrofon och **Ljudtest**.

## Testa lokalt

```bash
npm install
npm run dev
```

Bygg och förhandsvisa produktionsbundlen lokalt:

```bash
npm run build
npm run preview
```

Tips: lägg till `?demo=1` på URL:en för att starta demorutten direkt i webbläsaren på datorn.

### Kortkommandon i Vintervärlden
- `Mellanslag`: Trigga julinteraktion på skärmen
- `C`: Växla kamera (`FSD Vy` / `Kartvy` / `Filmisk`)
- `H`: Tut / julkaravanhälsning
- `T`: Slå på/av Boring Company-tunneln
- `E`: Trigga nästa jul-/Elon-händelse (`Starlink`, `Starship`, `Starman`, `Supercharger`, `Cybertruck-plog`)
- `Esc`: Stäng kontrollpanelen

## Klassiska lägen (`klassisk.html`)

De ursprungliga fem 3D-lägena finns kvar via knappen **Klassiska lägen →** i kontrollpanelen eller direkt på `./klassisk.html`:

1. **Coca-Cola Winter Express (3D Pixar Panorama)** — Filmisk sidoåkning längs skulpterad 3D-Tomtesläde med renar, skogsdjur och OSM-synkade omgivningar.
2. **Holidays Are Coming: Electric Caravan** — Glödande 3D-konvoj av Coca-Cola- och Tesla-Semis med volymetriska strålkastare och julgrans-Cybertruck.
3. **North Pole Flight Deck** — Flaggskeppsläge med formgjuten vinterväg, mötande karavaner, Gigafactories och Elon-händelser.
4. **The Enchanted Snowglobe** — 3D-kristallglob på sammetsröd sockel med snö- och guldflingor som virvlar av bilens G-krafter samt Nordpolen-kompass.
5. **Elon Holiday Timeline (2006–2026)** — 14 Elon-milstolpar längs vintervägen med gyllene tidsportaler.

### Kortkommandon i Klassiska lägen
- `1`–`5`: Hoppa direkt till läge 1–5
- `Esc`: Tillbaka till menyn
- `Mellanslag`: Trigga lägets interaktion
- `T`: Slå på/av Boring Company-tunnel
- `E`: Trigga nästa Elon-påskägg

## Valfria egna `.glb`-modeller

Appen innehåller inbyggda 3D-modeller av **Tesla Semi**, **Cybertruck**, **SpaceX Starship + Super Heavy**, **Roadster + Starman**, **V4 Supercharger** och **Optimus Gen 2** som fungerar direkt utan externa filer. Vill du använda egna `.glb`-filer kan du lägga dem i `public/models/` och ange filnamnen i [public/models/manifest.json](public/models/manifest.json) (`"semi"`, `"cybertruck"`, `"starship"`, `"roadster"`, `"optimus"`).
