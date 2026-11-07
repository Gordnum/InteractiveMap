# Peta Nusantara

An interactive map of Indonesian culture for SDN Jatake Pagedangan students
(Civics O project, Kelompok 1, UMN).

## How to open
- **Easiest:** double-click `index.html`. It works offline because no server or database is needed.
  (Without internet, the page falls back to a regular font instead of the decorative one.)
- **Publish online:** upload this whole folder to GitHub Pages, Netlify, or Vercel.

## Features
- **Jelajah:** click a province to see its name, capital, a short description, and what it's known for
  (traditional house, clothing, dances, musical instruments, regional songs, food, traditional weapons,
  traditions, famous places, nature and animals, and a "Tahukah kamu?" fact). The 🔊 button reads the
  info aloud. You can filter by island group and search by province or capital name.
- **Kuis:** 10 random multiple-choice questions, generated automatically from the province data.
- **Tebak Lokasi:** a game where students click the right province on the map.
- **Photos:** each province card has a gallery of about 3 photos of landmarks or famous things. Click a photo to enlarge it for the projector.
  The quiz also has "Tebak Foto" (guess the photo) questions.
- A ⭐ counter tracks which provinces each student has opened (saved in the browser).

## Folder structure
```
index.html          main page
css/style.css       styling
js/app.js           map, quiz, and game logic
data/provinces.js   culture data for the 38 provinces  <- edit this to add or fix content
data/map-paths.js   province shapes (SVG)
data/images.js      photo list + credits (author, license, source)
images/             the photo files
```

To fix or add content, edit `data/provinces.js`. Each province uses the same fields.
Leave a field as `null` if the information is unknown; it then won't be shown or used in the quiz.

## Adding or replacing a photo
Put the image file in `images/`, then add an entry to `data/images.js`:
`{ "src": "images/file-name.jpg", "caption": "...", "author": "...", "license": "...", "source": "link" }`.
Always record the author and license for photos taken from the internet.

## Credits
Province boundary data: "Indonesia GeoJSON & TopoJSON Maps (38 Provinces)" by Deny Herianto,
https://github.com/denyherianto/indonesia-geojson-topojson-maps-with-38-provinces
(CC BY 4.0), converted to SVG and simplified.

Photos: Wikimedia Commons. Each photo's author and license are shown below it and listed under
"lihat sumber foto" in the page footer.
