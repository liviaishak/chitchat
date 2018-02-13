import React, { Component } from 'react';

class MessageList extends Component {

//constructor method
  constructor(props){
      super(props);

//set states of the objects
      this.state = {
        username: "",
        content: "",
        sentAt: "",
        roomId: "",
        messages: []
      };
//bind(this) each method
      this.messagesRef = this.props.firebase.database().ref('messages');
      this.createMessage = this.createMessage.bind(this);
      this.addMessage = this.addMessage.bind(this);

  };

//componentDidMount method
  componentDidMount() {
		this.messagesRef.on('child_added', snapshot => {
			const message = snapshot.val();
			message.key = snapshot.key;
			this.setState({ messages: this.state.messages.concat( message ) });
		});
  }

//methods
  addMessage(e){
    e.preventDefault();
    this.setState(
      {
        content: e.target.value,
        sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
        roomId: this.props.activeRoom
      })
  }

  createMessage(e){
  e.preventDefault();
  console.log(this.state);
   this.messagesRef.push(
 {
    content: this.state.content,
    sentAt: this.state.sentAt,
    roomId: this.state.roomId
  }
);

  this.setState({
    message:"",
    sentAt:"",
    roomId:"",
})
  e.target.reset()
};

render() {
  let activeRoom = this.props.activeRoom

   let currentMessages = (
     this.state.messages.map((message)=> {
       if (message.roomId === activeRoom) {
         return <ol key={message.key}>{message.content}</ol>
       }
       return null;
     })
   );

   let messageWindow= (

       <form onSubmit={this.createMessage}>
         <h3>Message Form</h3>
         <textarea type='text' placeholder="Enter message here" onChange={this.addMessage}/>
         <input type="submit" value="Submit"/>
       </form>
   )
   return (
     <div>
       <div>
          {messageWindow}
      </div>
       <div>
         {currentMessages}
       </div>
     </div>
      )
    }
  }

export default MessageList;
