import React from 'react';
import logo from '../assets/images/logo.png'; // Assurez-vous que le logo est dans le dossier public ou src

const Home = () => {
  return (
    <div className="container text-center mt-5">
      <img src={logo} className="img-fluid" alt="Logo" style={{ maxWidth: '100%', height: 'auto' }} />
      <h1 className="mt-4">Bienvenue sur Dofus Helper</h1>
    </div>
  );
};

export default Home;
