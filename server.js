import express from 'express';
import qr from 'qr-image';
import fs from 'fs';
import path from 'path'; // <--- Ezt ellenőrizd, hogy ott van-e!
import { fileURLToPath } from 'url';

// 1. Útvonal-előkészítés (ES Modulokhoz kell)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// 2. Middleware-ek (Beállítások)
app.use(express.static('public')); 
app.use(express.urlencoded({ extended: true }));

// 3. IDE MÁSOLD BE: A Főoldal kezelése
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 4. A QR generáló rész (ez már megvan neked)
app.post('/generate', (req, res) => {
    const url = req.body.url;
    const qr_png = qr.image(url, { type: 'png' });
    const stream = qr_png.pipe(fs.createWriteStream('./public/qr_img.png'));

    stream.on('finish', () => {
        res.redirect('/'); 
    });
});

// 5. Szerver indítása (Ez legyen mindig a legutolsó!)
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});