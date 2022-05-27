
var detailsBox = document.querySelector("#details-box");
var dataForDetails;
var id;
async function getDataForDetails(){
    await fetch('https://amazing-events.herokuapp.com/api/events').then(resp => resp.json()).then(
        //llamo a la api , ejecuto la función de details dentro de la respuesta de la api
    json => { displayDetails(detailsBox, json.events);})}



function displayDetails(box,arr){
    id = location.search;
    console.log(`id es ${id}, location search ${location.search}`)
    id = id.split("=");
    id = id[1];
        arr.filter ( event => {
            if(id == event["_id"]){
                    box.innerHTML = ` <div class="row d-flex flex-sm-column flex-md-column flex-lg-row flex-xl-row flex-xxl-row py-2 justify-content-center" style="min-height: 13rem;">
                    <div class="col-sm-12 col-md-23 col-lg-5 col-xl-5 col-xxl-5 details-pic" style="min-height: 22rem;">
                        <div class="image-box h-100 w-100 color-in" style="background-image: url(${event.image}); min-height: 15rem;"></div>
                    </div>
                    <div class="big-card-text col-sm-12 col-md-12 col-lg-5 col-xl-5 col-xxl-5 d-flex flex-column align-items-center justify-content-center p-4" style="min-height: 13rem;">
                            <div class="text-container">
                                <div class="typed-out">
                                    <h5 class="mb-0 py-1 card-title text-uppercase fade-in">${event.name}</h5>
                                </div>
                            </div>
                            <div class="big-cat-box d-flex flex-column">
                                <div class="box d-flex flex-lg-row">
                                    <p class="card-text w-50">Name:</p>
                                    <span class="info w-50">${event.name}</span>
                                </div>
                                <div class="box">
                                    <p class="card-text w-50">Date:</p>
                                    <span class="info w-50">${event.date}</span>
                                </div>
                                <div class="box">
                                    <p class="card-text w-50">Description:</p>
                                    <span class="info w-50 text-justify">${event.description}</span>
                                </div>
                                <div class="box">
                                    <p class="card-text w-50">Category:</p>
                                    <span class="info w-50">${event.category}</span>
                                </div>
                                <div class="box">
                                    <p class="card-text w-50">Place:</p>
                                    <span class="info w-50">${event.place}</span>
                                </div>
                                <div class="box">
                                    <p class="card-text w-50">Capacity:</p>
                                    <span class="info w-50">${event.capacity}</span>
                                </div>  
                                <div class="box">
                                    <p class="card-text w-50">${event.assistance ? `Assistance: ` : `Estimate: `}</p>
                                    <span class="info w-50">${event.assistance ? event.assistance : event.estimate}</span>                        
                                </div>  
                                <div class="box">
                                    <p class="card-text w-50">Price:</p>
                                    <span class="info w-50">$${event.price}</span>
                                </div>
                            </div>
                        </div>
                    </div>`
                    }
        })   
}

getDataForDetails()
