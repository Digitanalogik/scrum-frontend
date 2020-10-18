import React, { Component } from 'react';
import { Client } from '@stomp/stompjs';
import Header from 'components/Header';
import Table from 'components/Table';
import Input from 'components/Input';
import RoomControl from 'components/RoomControl';
import './ScrumPokerStyle.css'

class ScrumPokerApp extends Component {

  state = {
    serverTime: null,
    localTime: null,
    name: "Scrum Lad",
    room: null,
    players: null
  }

  componentDidMount() {
    console.log("Component did mount!");

    this.client = new Client();

    this.client.configure({
      brokerURL: 'ws://localhost:8080/stomp',
      onConnect: () => {
        console.log("onConnect");

        this.client.subscribe('/queue/now', message => {
          console.log("MESSAGE!", message);
          try {
            console.log("Got message:", message.body);
            /*
            const date = new Date(message.body);
            this.setState({ localTime: date.toLocaleString() })
            */
            this.setState({ serverTime: message.body });
          } catch {
            console.log("Something odd happened while converting server message to local date/time! message.body =", message.body);
            this.setState({ serverTime: message.body})
          }
        })

        this.client.subscribe('/room/listen', message => {
          console.log("SERVER MESSAGE:", message);
          this.setState({ player: message.body });
          // alert(message.body);
          // alert(message.body);
        });

        this.client.subscribe('/room/vote', message => {
          console.log("SOMEBODY VOTED:", message);
          //alert(message.body);
      
          //this.setState({ player: message.body });
          // alert(message.body);
        });

        this.client.subscribe('/room/done', message => {
          console.log("ALL DONE!", message);
          alert(message.body);
      
          //this.setState({ player: message.body });
          // alert(message.body);
        });


      }
    });

    this.client.activate();
    //setWebsocket(client);
    console.log("WebSocket set!", this.client); 
  }

  clickHandler = () => {
    this.client.publish({destination: '/poker/vote', body: "Moi!"});
  }

  voteHandler = (param) => {
    const vote = { room: "casino", player: this.state.name, vote: param };
    console.log("ScrumPokerApp - voteHandler, param =", param);
    this.client.publish({destination: '/poker/vote', body: JSON.stringify(vote)});
  }

  /*
  useEffect(() => {
    let client = new Client();
    client.configure({
      brokerURL: 'ws://localhost:8080/scrumpoker',
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
  */

  changeName = (e) => {
    this.setState({ name: e.target.value });
  }

  render() {
    return (
      <div className="Page">
        <Header>
          <Input id="Player" value={this.state.name} change={this.changeName} />
          <RoomControl />
          <p>
            Server time: {this.state.serverTime ? this.state.serverTime : 'no data'}
          </p>
          <p>
            <button onClick={this.clickHandler}>Click me</button>
          </p>
        </Header>
        <Table room="casino" onVote={this.voteHandler} />
      </div>
    );  
  }
}

export default ScrumPokerApp;
