const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/dofus.db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Créer les tables nécessaires
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS achats (id INTEGER PRIMARY KEY, nom TEXT, quantite INTEGER, prixUnitaire REAL)");
  db.run("CREATE TABLE IF NOT EXISTS ventes (id INTEGER PRIMARY KEY, nom TEXT, quantite INTEGER, prixUnitaire REAL)");
});

// Endpoints pour les achats
app.post('/achats', (req, res) => {
  const { nom, quantite, prixUnitaire } = req.body;
  const stmt = db.prepare("INSERT INTO achats (nom, quantite, prixUnitaire) VALUES (?, ?, ?)");
  stmt.run(nom, quantite, prixUnitaire);
  stmt.finalize();
  res.status(201).send({ nom, quantite, prixUnitaire });
});

app.get('/achats', (req, res) => {
  db.all("SELECT * FROM achats", [], (err, rows) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(rows);
    }
  });
});

app.delete('/achats/:id', (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare("DELETE FROM achats WHERE id = ?");
  stmt.run(id);
  stmt.finalize();
  res.status(204).send();
});

// Endpoints pour les ventes
app.post('/ventes', (req, res) => {
  const { nom, quantite, prixUnitaire } = req.body;
  const stmt = db.prepare("INSERT INTO ventes (nom, quantite, prixUnitaire) VALUES (?, ?, ?)");
  stmt.run(nom, quantite, prixUnitaire);
  stmt.finalize();
  res.status(201).send({ nom, quantite, prixUnitaire });
});

app.get('/ventes', (req, res) => {
  db.all("SELECT * FROM ventes", [], (err, rows) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(rows);
    }
  });
});

app.delete('/ventes/:id', (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare("DELETE FROM ventes WHERE id = ?");
  stmt.run(id);
  stmt.finalize();
  res.status(204).send();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
