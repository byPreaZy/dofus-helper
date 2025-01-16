import React, { useState } from 'react';

const Vente = ({ onVente, ressources = [] }) => {
  const [nom, setNom] = useState('');
  const [quantite, setQuantite] = useState(1);
  const [nombreLots, setNombreLots] = useState(1);
  const [prixTotal, setPrixTotal] = useState(0);

  const handleVente = () => {
    const prixUnitaire = prixTotal / (quantite * nombreLots);
    onVente({ nom, quantite: quantite * nombreLots, prixUnitaire });
    setNom('');
    setQuantite(1);
    setNombreLots(1);
    setPrixTotal(0);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Vente</h2>
      <div className="form-group">
        <label>Nom de la ressource:</label>
        <select className="form-control" value={nom} onChange={(e) => setNom(e.target.value)}>
          <option value="">Sélectionnez une ressource</option>
          {ressources.map((ressource, index) => (
            <option key={index} value={ressource.nom}>
              {ressource.nom}
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
        <label>Prix total:</label>
        <input type="number" className="form-control" value={prixTotal} onChange={(e) => setPrixTotal(Number(e.target.value))} />
      </div>
      <button className="btn btn-primary btn-block" onClick={handleVente}>Vendre</button>
    </div>
  );
};

export default Vente;
