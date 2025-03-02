import React from 'react';

const Rentabilite = ({ achats, ventes }) => {
  const calculerRentabilite = () => {
    let beneficeTotal = 0;
    let stock = {};

    // Initialiser le stock avec les achats
    achats.forEach(achat => {
      if (!stock[achat.nom]) {
        stock[achat.nom] = { quantite: 0, prixTotal: 0 };
      }
      stock[achat.nom].quantite += achat.quantite;
      stock[achat.nom].prixTotal += achat.quantite * achat.prixUnitaire;
    });

    // Calculer le bénéfice total en fonction des ventes
    ventes.forEach(vente => {
      if (stock[vente.nom]) {
        const prixTotalVente = vente.quantite * vente.prixUnitaire * 0.98; // Soustraire 2% de taxe
        const coutAchat = vente.quantite * achats.find(a => a.nom === vente.nom).prixUnitaire;
        const beneficeParVente = prixTotalVente - coutAchat;
        beneficeTotal += beneficeParVente;
        stock[vente.nom].quantite -= vente.quantite;
      }
    });

    return beneficeTotal;
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Rentabilité</h2>
      <p className="text-center">Bénéfice potentiel : {calculerRentabilite()} kamas</p>
    </div>
  );
};

export default Rentabilite;
