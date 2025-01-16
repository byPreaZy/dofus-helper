import React from 'react';

const TableauRessources = ({ achats, ventes }) => {
  const calculerBenefice = (achat, vente) => {
    const prixTotalVente = vente.quantite * vente.prixUnitaire * 0.98; // Soustraire 2% de taxe
    const coutAchat = vente.quantite * achat.prixUnitaire;
    const benefice = prixTotalVente - coutAchat;
    return benefice;
  };

  const calculerStockRestant = (achats, ventes) => {
    let stock = {};

    // Initialiser le stock avec les achats
    achats.forEach(achat => {
      if (!stock[achat.nom]) {
        stock[achat.nom] = { quantite: 0, prixTotal: 0 };
      }
      stock[achat.nom].quantite += achat.quantite;
      stock[achat.nom].prixTotal += achat.quantite * achat.prixUnitaire;
    });

    // Mettre à jour le stock avec les ventes
    ventes.forEach(vente => {
      if (stock[vente.nom]) {
        stock[vente.nom].quantite -= vente.quantite;
      }
    });

    return stock;
  };

  const stock = calculerStockRestant(achats, ventes);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Tableau des Ressources</h2>
      <table className="table table-bordered table-responsive">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Quantité Achetée</th>
            <th>Prix Unitaire Achat</th>
            <th>Quantité Vendue</th>
            <th>Prix Unitaire Vente</th>
            <th>Bénéfice</th>
            <th>Stock Restant</th>
          </tr>
        </thead>
        <tbody>
          {achats.map((achat, index) => {
            const vente = ventes.find(v => v.nom === achat.nom);
            return (
              <tr key={index}>
                <td>{achat.nom}</td>
                <td>{achat.quantite}</td>
                <td>{achat.prixUnitaire}</td>
                <td>{vente ? vente.quantite : 'N/A'}</td>
                <td>{vente ? vente.prixUnitaire : 'N/A'}</td>
                <td>{vente ? calculerBenefice(achat, vente) : 'N/A'}</td>
                <td>{stock[achat.nom] ? stock[achat.nom].quantite : 'N/A'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableauRessources;
