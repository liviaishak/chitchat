import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props){
      super(props);

      this.state = {
        rooms: [],
        newRoomName:""
      };

      this.roomsRef = this.props.firebase.database().ref('rooms');
      this.createRoom = this.createRoom.bind(this);
      this.handleChange = this.handleChange.bind(this);
  }

handleChange(text){
  this.setState({newRoomName: text.target.value})
}


componentDidMount() {
  this.roomsRef.on('child_added', snapshot => {
    const room = snapshot.val();
    room.key = snapshot.key;
    this.setState({ rooms: this.state.rooms.concat( room ) });
  });
}

createRoom(e) {
  e.preventDefault();
  this.roomsRef.push({name: this.state.newRoomName});
  this.setState({newRoomName : ""})
}

render() {

  const roomList = this.state.rooms.map((room) =>
    <li key={room.key}>{room.name} </li>
  );

  const roomForm = (
       <form className = 'newRoom' onSubmit={this.createRoom}>
         <input type='text' value={this.state.newRoomName} onChange = {this.handleChange} />
         <button className='create-room' type='submit'>Create Room</button>
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
