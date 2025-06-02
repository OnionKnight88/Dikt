const diktfiler = [
  "dikt/jakke.txt",
  "dikt/tanke.txt",
  "dikt/annetdikt.txt"
];

function hentTekst(filsti) {
  fetch(filsti)
    .then(response => response.text())
    .then(tekst => {
      document.getElementById("dikt-innhold").textContent = tekst;
    })
    .catch(err => {
      document.getElementById("dikt-innhold").textContent = "Kunne ikke laste dikt.";
    });
}

function lastTilfeldigDikt() {
  const tilfeldig = diktfiler[Math.floor(Math.random() * diktfiler.length)];
  hentTekst(tilfeldig);
}

// Last ett dikt med en gang
document.addEventListener("DOMContentLoaded", lastTilfeldigDikt);

document.addEventListener("DOMContentLoaded", () => {
  const listeElement = document.getElementById("dikt-liste");
  if (listeElement) {
    diktfiler.forEach(fil => {
      const navn = fil.split("/").pop().replace(".txt", "");
      const li = document.createElement("li");
      const lenke = document.createElement("a");
      lenke.href = "#";
      lenke.textContent = navn;
      lenke.onclick = () => hentTekst(fil);
      li.appendChild(lenke);
      listeElement.appendChild(li);
    });
  }
});
