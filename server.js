import express from 'express';
import qr from 'qr-image';

const app = express(); // Itt hozzuk létre az 'app'-ot

app.use(express.static('public')); 
app.use(express.urlencoded({ extended: true }));

app.post('/generate', (req, res) => {
    const url = req.body.url;
    const qr_png = qr.image(url, { type: 'png' });
    res.type('png');
    qr_png.pipe(res);
});

app.listen(3000, () => console.log("http://localhost:3000"));