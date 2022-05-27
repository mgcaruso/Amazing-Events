var form = document.querySelector("#contact-form");
var dataCollected = {};
form.addEventListener("submit", e => {
    collectData(e);
})

function collectData(event){
    event.preventDefault()
    let inputs = event.target;
    if(inputs[0].value === "" && inputs[1].value === "" && inputs[2].value === ""){
        alert("You need to complete the form.")
    }else{
        for (let i = 0; i < inputs.length; i++) {
            dataCollected = {
                name: inputs[0].value,
                email: inputs[1].value,
                message: inputs[2].value
            }
        }
        form.innerHTML = `<div class="d-flex flex-column justify-content-center align-items-center" 
        <h6 class="form-sent text-center"> INFORMATION SENT </h6>
        <img class="sent" src="../assets/check.png"></img>
        <p>We received the following data: </p> 
        <ul style="list-style-type: none;">
            <li>Name:  <span style="color:pink">${dataCollected.name}</span></li>
            <li>Email: <span style="color:pink">${dataCollected.email}</span></li>
            <li>Message: <span style="color:pink">${dataCollected.message}</span></li>
        </ul>
        </div>
        `
        return dataCollected;
    }
}

