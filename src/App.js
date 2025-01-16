import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Achat from './components/Achat';
import Vente from './components/Vente';
import Rentabilite from './components/Rentabilite';
import TableauRessources from './components/TableauRessources';
import Categorie from './components/Categorie';
import Ressource from './components/Ressource';
import Navbar from './components/Navbar';
import { loadData , saveData } from './utils/saveData';

const App = () => {
  const [achats, setAchats] = useState([]);
  const [ventes, setVentes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ressources, setRessources] = useState([]);

  useEffect(() => {
    const loadedAchats = loadData('achats') || [];
    const loadedVentes = loadData('ventes') || [];
    const loadedCategories = loadData('categories') || [];
    const loadedRessources = loadData('ressources') || [];

    setAchats(loadedAchats);
    setVentes(loadedVentes);
    setCategories(loadedCategories);
    setRessources(loadedRessources);
  }, []);

  const handleAchat = (achat) => {
    setAchats([...achats, achat]);
    saveData('achats', achats);
  };

  const handleVente = (vente) => {
    setVentes([...ventes, vente]);
    saveData('ventes', ventes);
  };

  const handleCategorie = (categorie) => {
    setCategories([...categories, categorie]);
    saveData('categories', categories);
  };

  const handleRessource = (ressource) => {
    setRessources([...ressources, ressource]);
    saveData('ressources', ressources);
  };

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/achat" element={<Achat onAchat={handleAchat} categories={categories} ressources={ressources} />} />
        <Route path="/vente" element={<Vente onVente={handleVente} categories={categories} ressources={ressources} />} />
        <Route path="/rentabilite" element={<Rentabilite achats={achats} ventes={ventes} />} />
        <Route path="/tableau" element={<TableauRessources achats={achats} ventes={ventes} />} />
        <Route path="/categorie" element={<Categorie onCategorie={handleCategorie} />} />
        <Route path="/ressource" element={<Ressource onRessource={handleRessource} categories={categories} />} />
      </Routes>
    </div>
  );
};

export default App;
