import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props){
      super(props);

      this.state = { //initialize state
        rooms: [], //store list of rooms under firebase
        name:"" //new room name input
      };

      this.roomsRef = this.props.firebase.database().ref('rooms'); //firebase ref of the room list
      this.createRoom = this.createRoom.bind(this);
      this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() { //lifecycle
    this.roomsRef.on('value', snapshot => {
      const roomChange = [];
      snapshot.forEach((room) => {
        roomChange.push({
          key: room.key,
          name: room.val().name
        });
      });
      this.setState({ rooms: roomChange})
    });
  }

handleChange(e){ //trigger UI
  e.preventDefault();
  this.setState({name: e.target.value}) //put inside the name
}

createRoom(e) {
  e.preventDefault();
  this.roomsRef.push({name: this.state.name});
  this.setState({name : ""})
}

selectRoom(room) {
  this.props.setActiveRoom(room);
}

render() {

  const roomList = this.state.rooms.map((room, index) =>
    <li key={room.key} onClick={(e) => this.selectRoom(room,e)}>{room.name} </li>
  );

  const roomForm = (
       <form className = 'newRoom' onSubmit={this.createRoom}>
         <h2>Add a room:</h2>
         <input type='text' value={this.state.name} onChange = {this.handleChange} />
         <button className='create-room' type='submit' onClick={this.createRoom}>Create Room</button>
       </form>
     );

  return (
    <section className="roomList">
      <h1 className='title'>Bloc Chat</h1>
      <ul className='sidebar-list'>
      {roomList}
      </ul>
      {roomForm}
    </section>
  );
 }
}

export default RoomList;
