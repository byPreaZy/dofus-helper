import React, { useState } from 'react';

const Categorie = ({ onCategorie }) => {
  const [nom, setNom] = useState('');

  const handleCategorie = () => {
    onCategorie({ nom });
    setNom('');
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Créer une Catégorie</h2>
      <div className="form-group">
        <label>Nom de la catégorie:</label>
        <input type="text" className="form-control" value={nom} onChange={(e) => setNom(e.target.value)} />
      </div>
      <button className="btn btn-primary btn-block" onClick={handleCategorie}>Créer</button>
    </div>
  );
};

export default Categorie;
