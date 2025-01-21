import React, { useState, useEffect } from 'react';

const Achat = ({ onAchat, ressources }) => {
  const [nom, setNom] = useState('');
  const [quantite, setQuantite] = useState(1);
  const [nombreLots, setNombreLots] = useState(1);
  const [prixLot, setPrixLot] = useState(0);
  const [categorie, setCategorie] = useState('');
  const [ressourcesFiltrees, setRessourcesFiltrees] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (categorie) {
      const filtreRessources = ressources.filter(r => r.type.fr === categorie).sort((a, b) => a.name.fr.localeCompare(b.name.fr));
      setRessourcesFiltrees(filtreRessources);
    } else {
      setRessourcesFiltrees([]);
    }
  }, [categorie, ressources]);

  const handleAchat = () => {
    if (!nom || !quantite || !nombreLots || !prixLot) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    const prixTotal = prixLot * nombreLots;
    const prixUnitaire = prixTotal / (quantite * nombreLots);
    onAchat({ nom, quantite: quantite * nombreLots, prixUnitaire });
    setNom('');
    setQuantite(1);
    setNombreLots(1);
    setPrixLot(0);
    setCategorie('');
    setError('');
  };

  const categories = [...new Set(ressources.map(r => r.type.fr))].sort((a, b) => a.localeCompare(b));

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Achat</h2>
      <div className="form-group">
        <label>Catégorie de la ressource:</label>
        <select className="form-control" value={categorie} onChange={(e) => setCategorie(e.target.value)}>
          <option value="">Sélectionnez une catégorie</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Nom de la ressource:</label>
        <select className="form-control" value={nom} onChange={(e) => setNom(e.target.value)}>
          <option value="">Sélectionnez une ressource</option>
          {ressourcesFiltrees.map((ressource, index) => (
            <option key={index} value={ressource.name.fr}>
              {ressource.name.fr}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Quantité par lot:</label>
        <select className="form-control" value={quantite} onChange={(e) => setQuantite(Number(e.target.value))}>
          <option value={1}>1</option>
          <option value={10}>10</option>
          <option value={100}>100</option>
        </select>
      </div>
      <div className="form-group">
        <label>Nombre de lots:</label>
        <input type="number" className="form-control" value={nombreLots} onChange={(e) => setNombreLots(Number(e.target.value))} />
      </div>
      <div className="form-group">
        <label>Prix du lot:</label>
        <input type="number" className="form-control" value={prixLot} onChange={(e) => setPrixLot(Number(e.target.value))} />
      </div>
      <button className="btn btn-primary btn-block" onClick={handleAchat}>Acheter</button>
      {error && <p className="text-danger">{error}</p>}
      {nom && ressourcesFiltrees.find(r => r.name.fr === nom) && (
        <div className="mt-3 text-center">
          <img src={ressourcesFiltrees.find(r => r.name.fr === nom).img} alt={nom} style={{ width: '100px' }} />
        </div>
      )}
    </div>
  );
};

export default Achat;
