import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js'; //RoomList component rendered here
import MessageList from './components/MessageList.js'
import User from './components/User/User.js'



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
  var rootRef = firebase.database().ref();

//class App
  class App extends Component {

//constructor method (initializing state)
  constructor(props){
      super(props);

      this.state = {
        activeRoom:"",
        user:""
      };
      this.setActiveRoom = this.setActiveRoom.bind(this);
      this.setUser = this.setUser.bind(this);
  }

//create methods; every method has to .bind(this)
  setActiveRoom(room){
    this.setState({activeRoom : room})
  }

 setUser(user){
   this.setState({user:user});

 }

 //render method
  render() {

    let showMessages = this.state.activeRoom;
    let currentUser = this.state.user === null ? "Guest" : this.state.user.displayName;

    return (
      <div>
        <User firebase={firebase} setUser={this.setUser} currentUser={currentUser}  />
        <h1>{this.state.activeRoom.name || "Choose a room or Create one"}</h1>
        <RoomList firebase={firebase} setActiveRoom={this.setActiveRoom} />
         { showMessages ?
        <MessageList firebase={firebase} activeRoom={this.state.activeRoom.key} user={currentUser} />
        : null
        }
      </div>
    );
  }
}

export default App;
