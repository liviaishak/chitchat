import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props){
      super(props);
      this.state = {
        username: "", content: "", sentAt:"", roomId:"", messages: []
      };

      this.messagesRef = this.props.firebase.database().ref('messages');
      this.createMessage = this.createMessage.bind(this);
      this.handleUserChange = this.handleUserChange.bind(this);
      this.handleContentChange = this.handleContentChange.bind(this);

  }

  handleUserChange(e){
    e.preventDefault();
    this.setState({username: e.target.value,
                    sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
                    roomId: this.props.activeRoom});
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) });
    });
  }

  handleContentChange(e) {
    e.preventDefault();
    this.setState({content: e.target.value,
                    sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
                    roomId: this.props.activeRoom});

  }

  createMessage(e){
  e.preventDefault();
  console.log(this.state);
   this.messagesRef.push({
    username: this.state.username,
    content: this.state.content,
    sentAt: this.state.sentAt,
    roomId: this.state.roomId
  });
  this.setState({ username: "", content: "", sentAt: "",roomId:""});
}


  render() {
    return (
      <section className="MessageList">
        <form className="addMessage">
           <input type='text' value={this.state.userName} placeholder="Type Your Name" onChange = {this.handleUserChange} />
           <input type='text' value={this.state.content} placeholder="Type Your Message" onChange = {this.handleContentChange} />
           <button type="submit" onClick={this.createMessage}>Send</button>
        </form>
        <table className="MessageList">
          {this.state.messages.map( (message) =>
            <tr key={message.key} className={message.roomId === this.props.activeRoom?'messageShow':'messageNoShow'}>
             <h2>{message.username}</h2>
             <p>{message.content}</p>
           </tr>
          )}
        </table>
      </section>

    );
  }
 }


export default MessageList;
