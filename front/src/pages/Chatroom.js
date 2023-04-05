
const Chatroom=()=>{







  // const sendmessage =()=> {

  //     socket.emit("new_message", { message: document.getElementById("message").value })

  // }
  
  // socket.on("new_message", (data) => {

  //     document.getElementById("feedback").innerHTML = "";
  //     document.getElementById("message").value = "";
  //     const p = document.createElement("p");
  //     p.innerHTML = `  ${data.message}`;
  //     document.getElementById("chatroom").appendChild(p);
  //     alert( p)
  // })
  
  // document.getElementById("send_username").addEventListener("click", function () {
  
  //     socket.emit("change_username", { username: document.getElementById("username").value })
  // })
  
  
  // document.getElementById("message").addEventListener("keypress", function () {
  
  //     socket.emit("typing");
  
  // })
  
  // socket.on("typing", (data) => {
  
  //     document.getElementById("feedback").innerHTML = `<i>${data.username} is typing.... </i>`
  // })
  
  // document.getElementById("message").addEventListener("keyup", function () {
  
  //     socket.emit("stopTyping");
  
  // })
  
  // socket.on("stopTyping", () => {
  
  //     document.getElementById("feedback").innerHTML = ``;
  // })















    // const handleLeaveChat = () => {
    //   localStorage.removeItem('userName');
      
    //   window.location.reload();
    // }
    //   const [message, setMessage] = useState('');

    //   const handleSendMessage = (e) => {
    //     e.preventDefault();
    //     if (message.trim() && localStorage.getItem('userName')) {
    //       socket.emit('message', {
    //         text: message,
    //         name: localStorage.getItem('userName'),
    //         id: `${socket.id}${Math.random()}`,
    //         socketID: socket.id,
    //       });
    //     }
    //     setMessage('');
    //   };






    return(
<div id="ch">
{/* <header>
        <h1>Code chat </h1>
    </header>


        <section>
            <div id="change_username">
                <input type="text" id="username" placeholder="Enter username"></input>
                <button id="send_username">Enter nickname</button>
            </div>
        </section>
        
        <section id="chatroom">
            
            <div id="feedback"></div>

        </section>

        <section id="input_zone">
            <input type="text" id="message" placeholder="Enter message"></input>
            <button id="send_message" onClick={sendmessage}>Send message</button>
        </section> */}
</div>
        
    )
}

export default Chatroom