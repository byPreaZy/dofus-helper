import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">Dofus Helper</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/achat" className="nav-link">Achat</Link>
            </li>
            <li className="nav-item">
              <Link to="/vente" className="nav-link">Vente</Link>
            </li>
            <li className="nav-item">
              <Link to="/rentabilite" className="nav-link">Rentabilité</Link>
            </li>
            <li className="nav-item">
              <Link to="/tableau" className="nav-link">Tableau des Ressources</Link>
            </li>
            <li className="nav-item">
              <Link to="/categorie" className="nav-link">Catégorie</Link>
            </li>
            <li className="nav-item">
              <Link to="/ressource" className="nav-link">Ressource</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
