import React, { useState, useEffect } from 'react';
import Achat from './components/Achat';
import Vente from './components/Vente';
import Rentabilite from './components/Rentabilite';
import TableauRessources from './components/TableauRessources';
import ressourcesData from './data/rss.json'; // Importez le fichier JSON
import './index.css';

const App = () => {
  const [achats, setAchats] = useState([]);
  const [ventes, setVentes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/achats')
      .then(response => response.json())
      .then(data => setAchats(data))
      .catch(error => console.error('Erreur lors du chargement des achats:', error));

    fetch('http://localhost:3001/ventes')
      .then(response => response.json())
      .then(data => setVentes(data))
      .catch(error => console.error('Erreur lors du chargement des ventes:', error));
  }, []);

  const handleAchat = (achat) => {
    fetch('http://localhost:3001/achats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(achat)
    })
      .then(response => response.json())
      .then(data => setAchats([...achats, data]))
      .catch(error => console.error('Erreur lors de l\'ajout de l\'achat:', error));
  };

  const handleVente = (vente) => {
    fetch('http://localhost:3001/ventes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(vente)
    })
      .then(response => response.json())
      .then(data => setVentes([...ventes, data]))
      .catch(error => console.error('Erreur lors de l\'ajout de la vente:', error));
  };

  const handleDeleteAchat = (achat) => {
    fetch(`http://localhost:3001/achats/${achat.id}`, {
      method: 'DELETE'
    })
      .then(() => setAchats(achats.filter(a => a.id !== achat.id)))
      .catch(error => console.error('Erreur lors de la suppression de l\'achat:', error));
  };

  const handleDeleteVente = (vente) => {
    fetch(`http://localhost:3001/ventes/${vente.id}`, {
      method: 'DELETE'
    })
      .then(() => setVentes(ventes.filter(v => v.id !== vente.id)))
      .catch(error => console.error('Erreur lors de la suppression de la vente:', error));

    // Supprimer l'achat associé si la vente est supprimée
    const achatAssocie = achats.find(a => a.nom === vente.nom && a.quantite === vente.quantite);
    if (achatAssocie) {
      handleDeleteAchat(achatAssocie);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Gestion d'Achat/Vente</h1>
      <Achat onAchat={handleAchat} ressources={ressourcesData} />
      <Vente onVente={handleVente} achats={achats} ressources={ressourcesData} />
      <TableauRessources
        achats={achats}
        ventes={ventes}
        onDeleteAchat={handleDeleteAchat}
        onDeleteVente={handleDeleteVente}
      />
      <Rentabilite achats={achats} ventes={ventes} />
    </div>
  );
};

export default App;
