import React, { useState } from 'react';

const Ressource = ({ onRessource, categories }) => {
  const [nom, setNom] = useState('');
  const [categorie, setCategorie] = useState('');

  const handleRessource = () => {
    onRessource({ nom, categorie });
    setNom('');
    setCategorie('');
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Créer une Ressource</h2>
      <div className="form-group">
        <label>Nom de la ressource:</label>
        <input type="text" className="form-control" value={nom} onChange={(e) => setNom(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Catégorie:</label>
        <select className="form-control" value={categorie} onChange={(e) => setCategorie(e.target.value)}>
          <option value="">Sélectionnez une catégorie</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat.nom}>
              {cat.nom}
            </option>
          ))}
        </select>
      </div>
      <button className="btn btn-primary btn-block" onClick={handleRessource}>Créer</button>
    </div>
  );
};

export default Ressource;
