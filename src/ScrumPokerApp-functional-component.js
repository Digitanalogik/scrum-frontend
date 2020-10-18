import React, { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import Header from 'components/Header';
import Table from 'components/Table';
import Input from 'components/Input';
import RoomControl from 'components/RoomControl';
import './ScrumPokerStyle.css'

const ScrumPokerAppFC = () => {
  const [name, setName] = useState('Scrum Lad');
  const [websocket, setWebsocket] = useState(null);

  useEffect(() => {
    let client = new Client();
    client.configure({
      brokerURL: 'ws://localhost:8080/stomp',
      onConnect: () => {
        console.log("onConnect");
        client.subscribe('/scrum/poker', message => {
          console.log("MESSAGE!", message);
          alert(message.body);
        })
      }
    });
    client.activate();
    setWebsocket(client);
    console.log("WebSocket set ----> "); 
  }, [websocket, setWebsocket]);

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

export default ScrumPokerAppFC;
