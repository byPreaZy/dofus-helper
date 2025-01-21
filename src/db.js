const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/dofus.db');

// Créer les tables nécessaires
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS achats (id INTEGER PRIMARY KEY, nom TEXT, quantite INTEGER, prixUnitaire REAL)");
  db.run("CREATE TABLE IF NOT EXISTS ventes (id INTEGER PRIMARY KEY, nom TEXT, quantite INTEGER, prixUnitaire REAL)");
});

const saveAchat = (achat) => {
  const stmt = db.prepare("INSERT INTO achats (nom, quantite, prixUnitaire) VALUES (?, ?, ?)");
  stmt.run(achat.nom, achat.quantite, achat.prixUnitaire);
  stmt.finalize();
};

const saveVente = (vente) => {
  const stmt = db.prepare("INSERT INTO ventes (nom, quantite, prixUnitaire) VALUES (?, ?, ?)");
  stmt.run(vente.nom, vente.quantite, vente.prixUnitaire);
  stmt.finalize();
};

const deleteAchat = (achat) => {
  const stmt = db.prepare("DELETE FROM achats WHERE nom = ? AND quantite = ? AND prixUnitaire = ?");
  stmt.run(achat.nom, achat.quantite, achat.prixUnitaire);
  stmt.finalize();
};

const deleteVente = (vente) => {
  const stmt = db.prepare("DELETE FROM ventes WHERE nom = ? AND quantite = ? AND prixUnitaire = ?");
  stmt.run(vente.nom, vente.quantite, vente.prixUnitaire);
  stmt.finalize();
};

const getAchats = (callback) => {
  db.all("SELECT * FROM achats", [], (err, rows) => {
    callback(err, rows);
  });
};

const getVentes = (callback) => {
  db.all("SELECT * FROM ventes", [], (err, rows) => {
    callback(err, rows);
  });
};

module.exports = {
  saveAchat,
  saveVente,
  deleteAchat,
  deleteVente,
  getAchats,
  getVentes,
};
