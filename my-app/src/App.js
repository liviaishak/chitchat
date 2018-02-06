import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js'; //RoomList component rendered here


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
  render() {
    return (
      <div className="App">
        <main>
          <RoomList firebase={firebase} />
        </main>
      </div>
    );
  }
}

export default App;
