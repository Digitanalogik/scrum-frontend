import React from 'react';
import Header from 'components/Header';
import Table from 'components/Table';
import './ScrumPokerStyle.css'

const ScrumPokerApp = () => {
  return (
    <div className="Page">
      <Header />
      <Table room="casino" />
    </div>
  );
}

export default ScrumPokerApp;
