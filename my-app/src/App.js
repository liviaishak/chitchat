import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js'; //RoomList component rendered here
import MessageList from './components/MessageList.js'

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyC2k5NMbofr3AzRb-_Ojgy-HB4fgEN0huk",
    authDomain: "bloc-chat-ab99c.firebaseapp.com",
    databaseURL: "https://bloc-chat-ab99c.firebaseio.com",
    projectId: "bloc-chat-ab99c",
    storageBucket: "bloc-chat-ab99c.appspot.com",
    messagingSenderId: "536073229540"
  };
  firebase.initializeApp(config);

class App extends Component {

  constructor(props){
      super(props);

      this.state = {
        activeRoom:""
      };
      this.activeRoom = this.activeRoom.bind(this);
  }

  activeRoom(room){
    this.setState({activeRoom : room})
  }

  render() {
    return (
      <div className="App">
        <main>
          <RoomList firebase={firebase} activeRoom={this.activeRoom}/>
        </main>
        <div className="messageWindow">
        <h1>{this.state.activeRoom.name || 'Select Room'}</h1>
        <MessageList firebase={firebase} activeRoom={this.activeRoom.key}/>
      </div>
      </div>
    );
  }
}

export default App;
