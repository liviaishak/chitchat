import React, { Component } from 'react';

class RoomList extends Component {

//constructor method
  constructor(props){
      super(props);

//setting the state
      this.state = { //initialize state
        rooms: [], //store list of rooms under firebase
        name:"" //new room name input
      };

//every method bind(this)
      this.roomsRef = this.props.firebase.database().ref('rooms'); //firebase ref of the room list
      this.createRoom = this.createRoom.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.deleteRoom = this.deleteRoom.bind(this);

  }

//componentDidMount
  componentDidMount() { //after the initial rendering
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

//create methods
handleChange(e){ //trigger UI
  e.preventDefault(); //to prevent from loading to a new page
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

deleteRoom(roomkey) {
  this.roomsRef.child(roomkey).remove();
}

//render method
render() {

  const roomList = this.state.rooms.map((room, index) =>
    <li key={room.key} onClick={(e) => this.selectRoom(room,e)} > {room.name}
      <button key={room.key} onClick={(e) => this.deleteRoom(room.key)}> Delete </button>
    </li>

  );

  const roomForm = (
       <form className = 'newRoom' onSubmit={this.createRoom}>
         <h2>Add a room:</h2>
         <input type='text' value={this.state.name} placeholder="Enter room here" onChange = {this.handleChange} />
         <input type="submit" value="Create a room"/>
       </form>
     );

//return the render
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
