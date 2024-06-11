function handleKeyPress(event) {
    if (event.key === "Enter") {
        fetchJSON('../json/intents.json');
    }
}

function checkform(){
    var user = 0;
    var check = document.getElementById('name').value.trim();
    if(check.trim()!=='')
        {
          user ++;      
        }
    var check = document.getElementById('surname').value;
    if(check.trim()!=='')
        {
            user ++;      
        }
    var check = document.getElementById('mail').value;
    if(check.trim()!=='')
        {
            user ++;      
        }
    
    var selectInput = document.getElementById('status').value;
    if(selectInput!=='null')
        {
            user ++;      
        }
    var selectInput = document.getElementById('concern').value;
    if(selectInput!=='null')
        {
            user ++;      
        }
    var check = document.getElementById('q3').value;
    if(check.trim()!=='')
        {
            user ++;      
        }
    return user;
}   

function clean()
{
    document.getElementById('name').value= "";
    document.getElementById('surname').value= "";
    document.getElementById('mail').value= "";
    document.getElementById('status').value= "null";
    document.getElementById('concern').value= "null";
    document.getElementById('q3').value= "";
}

function FormConfirm(){
    var u = checkform();
    if( u !== 6)
        {
            alert("Please fill in all fields");
        }

    else
    {
        
        alert("Thank you for your feedback !");
        clean();
    }
    
}