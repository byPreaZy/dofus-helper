import React, { useState, useEffect } from 'react';

const Vente = ({ onVente, achats, ressources }) => {
  const [nom, setNom] = useState('');
  const [quantite, setQuantite] = useState(1);
  const [nombreLots, setNombreLots] = useState(1);
  const [prixLot, setPrixLot] = useState(0);
  const [categorie, setCategorie] = useState('');
  const [ressourcesFiltrees, setRessourcesFiltrees] = useState([]);
  const [categoriesFiltrees, setCategoriesFiltrees] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const categoriesAchetees = [...new Set(achats.map(a => ressources.find(r => r.name.fr === a.nom)?.type.fr).filter(Boolean))];
    setCategoriesFiltrees(categoriesAchetees);
  }, [achats, ressources]);

  useEffect(() => {
    if (categorie) {
      const filtreRessources = ressources.filter(r => r.type.fr === categorie && achats.some(a => a.nom === r.name.fr));
      setRessourcesFiltrees(filtreRessources);
    } else {
      setRessourcesFiltrees([]);
    }
  }, [categorie, achats, ressources]);

  const handleVente = () => {
    if (!nom || !quantite || !nombreLots || !prixLot) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    const prixTotal = prixLot * nombreLots * 0.98; // Soustraire 2% de taxe
    const prixUnitaire = prixTotal / (quantite * nombreLots);
    onVente({ nom, quantite: quantite * nombreLots, prixUnitaire: prixUnitaire });
    setNom('');
    setQuantite(1);
    setNombreLots(1);
    setPrixLot(0);
    setCategorie('');
    setError('');
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Vente</h2>
      <div className="form-group">
        <label>Catégorie de la ressource:</label>
        <select className="form-control" value={categorie} onChange={(e) => setCategorie(e.target.value)}>
          <option value="">Sélectionnez une catégorie</option>
          {categoriesFiltrees.map((cat, index) => (
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
      <button className="btn btn-primary btn-block" onClick={handleVente}>Vendre</button>
      {error && <p className="text-danger">{error}</p>}
      {nom && ressourcesFiltrees.find(r => r.name.fr === nom) && (
        <div className="mt-3 text-center">
          <img src={ressourcesFiltrees.find(r => r.name.fr === nom).img} alt={nom} style={{ width: '100px' }} />
        </div>
      )}
    </div>
  );
};

export default Vente;
