const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const diktMappe = path.join(__dirname, 'dikt');

app.use(express.static('public'));

// Hent tilfeldig dikt
app.get('/api/tilfeldig', (req, res) => {
  fs.readdir(diktMappe, (err, filer) => {
    if (err) return res.status(500).send('Feil ved opplesing');

    const tilfeldigFil = filer[Math.floor(Math.random() * filer.length)];
    fs.readFile(path.join(diktMappe, tilfeldigFil), 'utf-8', (err, data) => {
      if (err) return res.status(500).send('Feil ved lesing av dikt');
      res.send({ tittel: tilfeldigFil.replace('.txt', ''), innhold: data });
    });
  });
});

// Hent liste over alle dikt
app.get('/api/alle', (req, res) => {
  fs.readdir(diktMappe, (err, filer) => {
    if (err) return res.status(500).send('Feil ved opplesing');
    res.send(filer.map(f => f.replace('.txt', '')));
  });
});

// Hent spesifikt dikt
app.get('/api/dikt/:navn', (req, res) => {
  const filsti = path.join(diktMappe, req.params.navn + '.txt');
  fs.readFile(filsti, 'utf-8', (err, data) => {
    if (err) return res.status(404).send('Dikt ikke funnet');
    res.send({ tittel: req.params.navn, innhold: data });
  });
});

app.listen(PORT, () => {
  console.log(`Server kjører på http://localhost:${PORT}`);
});
