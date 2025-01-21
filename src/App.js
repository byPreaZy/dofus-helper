import React, { useState, useEffect } from 'react';
import Achat from './components/Achat';
import Vente from './components/Vente';
import Rentabilite from './components/Rentabilite';
import TableauRessources from './components/TableauRessources';
import saveData from './utils/saveData';
import ressourcesData from './data/rss.json'; // Importez le fichier JSON
import './index.css';

const App = () => {
  const [achats, setAchats] = useState([]);
  const [ventes, setVentes] = useState([]);

  const handleAchat = (achat) => {
    setAchats([...achats, achat]);
  };

  const handleVente = (vente) => {
    setVentes([...ventes, vente]);
  };

  const handleSave = () => {
    const data = { achats, ventes };
    saveData(data, 'data.json');
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Gestion d'Achat/Vente</h1>
      <Achat onAchat={handleAchat} ressources={ressourcesData} />
      <Vente onVente={handleVente} achats={achats} ressources={ressourcesData} />
      <Rentabilite achats={achats} ventes={ventes} />
      <TableauRessources achats={achats} ventes={ventes} />
      <button className="btn btn-primary btn-block mt-4" onClick={handleSave}>Sauvegarder les données</button>
    </div>
  );
};

export default App;
