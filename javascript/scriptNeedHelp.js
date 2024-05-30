class ChatHistory 
{
    constructor(){
        this.messages = [];
    }
    
    addMessage(message)
    {
        this.messages.push(message);
        console.log(this.messages);
    }

    getHistory()
    {
        return this.messages ;
    }

}

var historyMessages = new ChatHistory();

// Function for retrieving and processing JSON
function fetchJSON(url) {
    // Retrieve JSON from supplied URL
    fetch(url)
    //then is a method that returns a promise and takes as a parameter a 
    //callback function that will be executed once the promise has been resolved.
    .then(response => {
    // Check if the answer is correct
    if (!response.ok) {
        // If the answer is not correct, throw an error
        throw new Error('Network response was not ok');
    }
        // If the answer is correct, return the JSON
        return response.json();
    })
    //then here will retrieve the JSON returned by the promise
    .then(data => {
    // Check if JSON is empty or malformed
    if (Object.keys(data).length === 0 && data.constructor === Object) {
        // If the JSON is empty or badly formed, throw an error
        throw new Error('Empty JSON or malformed JSON');
        }
    //The JSON is displayed in the console. This is an object containing the chatbot's chatbot's intentions
   console.log(data);
   console.log(historyMessages.getHistory());
   // Pass intentions to the sendMessage function to be defined later
   sendMessage(data.intents);
   })
   //catch is a method that returns a promise and takes as parameter a
  //callback function that will be executed in the event of an error
   .catch(error => {
   // In the event of an error, display an error message in the console
   console.error('There was a problem with the fetch operation:', error);
   }) ;
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
        fetchJSON('../json/intents.json');
    }
}

function sendMessage(intents)
{
    var input = document.getElementById("user_input").value;
    showMessage(input,'user');
    var bot = processMessage(intents,input);
    if(bot!==1)
    {
        showMessage(bot, 'bot');
        
    }
    document.getElementById("user_input").value="";
    
}


function showMessage(message,type)
{
    var p = document.getElementById("chat-box");
    const messageElement =document.createElement('div');
    messageElement.textContent = message;
    const timestamp = new Date().toLocaleString();
    messageElement.innerHTML = `${message} <span class="timestamp">${timestamp}</span>`;
    historyMessages.addMessage({message,type});
    p.appendChild(messageElement);
    p.scrollTop = p.scrollHeight;
    messageElement.classList.add(type === 'user' ? 'user-message' : 'bot-message');
}

function showgift()
{
    var p = document.getElementById("chat-box");
    const messageElement =document.createElement('div');
    const timestamp = new Date().toLocaleString();
    messageElement.innerHTML = `<img id="fuck" src ="../img/json/cryingman-crying.gif" height="400"> <span class="timestamp">${timestamp}</span>`;
    p.appendChild(messageElement);
    p.scrollTop = p.scrollHeight;
    messageElement.classList.add(type === 'user' ? 'user-message' : 'bot-message');
}
// Function to process the user's message
function processMessage(intents, message) {
    // By default, the response is "I'm sorry, I'm not sure I understand."
    let response = "I'm sorry, I'm not sure I understand.";
    // Browse chatbot intentions
    if(message == "fuck" || message == "fuck you" || message == "you suck" || message == "bitch" || message == "pachyderm" || message == "smartass" || message == "dickhead"|| message == "bitchy bitch")
        {
            showgift()
            return 1;
        }
    else
    {
        intents.forEach(intent => {
            // Check if the user's message matches one of the patterns
            intent.patterns.forEach(pattern => {
            // Check if the user's message contains the pattern
            if (message.toLowerCase().includes(pattern.toLowerCase())) {
            // Select a random answer from the list
            response = intent.responses[Math.floor(Math.random() *
           intent.responses.length)];
            }
            });
            });
            // Return answer
            return response;
    }
   
    
   }


function saveMessages(){
console.log('Saving chat history...');
console.log(historyMessages.getHistory());
sessionStorage.setItem('chatHistory',
JSON.stringify(historyMessages.getHistory().map(msg => msg.message)));
console.log('Saving chat history...');

}
// Function to load messages from the browser session
function loadMessages() {
    // Recover message history from browser session
    const chatHistory = JSON.parse(sessionStorage.getItem('chatHistory'));
    if (chatHistory) 
    {
        
        chatHistory.forEach(message => 
            {
            showMessage(message, message.type);
            });
            const old = document.createElement('div');
            old.id = 'old';
            old.textContent = "-- old messsages --";
            var p = document.getElementById("chat-box").appendChild(old)
    }
        
    }



window.addEventListener('beforeunload',saveMessages);

window.addEventListener('load',loadMessages);

