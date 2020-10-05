import React, { useState } from 'react';
import Header from 'components/Header';
import Table from 'components/Table';
import Input from 'components/Input';
import RoomControl from 'components/RoomControl';
import './ScrumPokerStyle.css'

const ScrumPokerApp = () => {
  const [name, setName] = useState('Scrum Lad')

  function changeName(e) {
    setName(e.target.value);
  }

  return (
    <div className="Page">
      <Header>
        <Input id="Player" value={name} change={changeName} />
        <RoomControl />
      </Header>
      <Table room="casino" />


    </div>
  );
}

export default ScrumPokerApp;
