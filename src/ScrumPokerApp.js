import React, { Component } from 'react';
import { Client } from '@stomp/stompjs';
import queryString from 'query-string';
import Header from 'components/Header';
import Table from 'components/Table';
import Result from 'components/Result';
import './ScrumPokerStyle.css'

class ScrumPokerApp extends Component {

  state = {
    name: "",
    room: "",
    players: null,
    allVoted: false,
    votes: []
  }

  componentDidMount() {
    // console.log("URL params:", window.location.search);
    const parsed = queryString.parse(window.location.search);
    // console.log("URL parsed:", parsed);
    if (typeof parsed.player !== 'undefined') {
      this.setState({ name: parsed.player });
    } else {
      this.setState({ name: "Scrum Lad"})
    }
    if (typeof parsed.room !== 'undefined') {
      this.setState({ room: parsed.room });
    } else {
      this.setState({ room: "Casino" });
    }

    this.client = new Client();

    this.client.configure({
      brokerURL: 'ws://localhost:8080/scrumpoker',
      onConnect: () => {
        this.client.subscribe('/room/listen', message => {
          console.log("SERVER MESSAGE:", message);
          this.setState({ player: message.body });
        });

        this.client.subscribe('/room/vote', message => {
          // this.setState({ votes: [...this.state.votes, message.body]})
          console.log("SOMEBODY VOTED:", message.body);
        });

        this.client.subscribe('/room/done', message => {
          this.setState({ votes: JSON.parse(message.body), allVoted: true });
          console.log("ALL DONE!", message.body);
          // alert(message.body);
        });
      }
    });

    this.client.activate();
    console.log("WebSocket set!", this.client); 
  }

  voteHandler = (param) => {
    const vote = { room: this.state.room, player: this.state.name, vote: param };
    this.client.publish({destination: '/poker/vote', body: JSON.stringify(vote)});
  }

  changeName = (e) => {
    this.setState({ name: e.target.value });
  }

  render() {
    return (
      <div className="Page">
        <Header label="Player" player={this.state.name} room={this.state.room} onChangeName={this.changeName} />
        {this.state.allVoted === false
        ? (<Table room={this.state.room} onVote={this.voteHandler} />)
        : (<Result votes={this.state.votes} />)}
      </div>
    );  
  }
}

export default ScrumPokerApp;
