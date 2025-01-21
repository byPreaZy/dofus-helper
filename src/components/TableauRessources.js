import React from 'react';

const TableauRessources = ({ achats, ventes, onDeleteAchat, onDeleteVente }) => {
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
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center mb-4">Achats</h3>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Quantité Achetée</th>
                <th>Prix Unitaire Achat</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {achats.map((achat, index) => (
                <tr key={index}>
                  <td>{achat.nom}</td>
                  <td>{achat.quantite}</td>
                  <td>{achat.prixUnitaire}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => onDeleteAchat(achat)}
                      disabled={ventes.some(vente => vente.nom === achat.nom)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-6">
          <h3 className="text-center mb-4">Ventes</h3>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Quantité Vendue</th>
                <th>Prix Unitaire Vente</th>
                <th>Bénéfice</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {ventes.map((vente, index) => {
                const achat = achats.find(a => a.nom === vente.nom);
                return (
                  <tr key={index}>
                    <td>{vente.nom}</td>
                    <td>{vente.quantite}</td>
                    <td>{vente.prixUnitaire}</td>
                    <td>{achat ? calculerBenefice(achat, vente) : 'N/A'}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => onDeleteVente(vente)}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-center mb-4">Stock Restant</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Stock Restant</th>
            </tr>
          </thead>
          <tbody>
            {achats.map((achat, index) => (
              <tr key={index}>
                <td>{achat.nom}</td>
                <td>{stock[achat.nom] ? stock[achat.nom].quantite : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableauRessources;
