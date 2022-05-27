//Función genérica para mostrar las tarjetas. Toma un contenedor y un array como parámetros.

function displayCards(container,array){
    if(array.length < 1){
        displayNoFoundCard(cardsBox)
    }else{
        container.innerHTML = "";
        array.forEach( (event) => {
            container.innerHTML += `<div class="card m-2 fade-in" style="width: 17rem;">
                <img class="h-50 bg-cover card-img-top" src="${event.image}" alt="${event.name}">
                <div class="box1 card-body">
                <h5 class="card-title text-start">${event.name}</h5>
                <h6 class="card-text">${event.description}</h6>
                <h6 class="card-text">Date: ${event.date}</h6>
                </div>
                <div class="box2 card-body d-flex align-items-center justify-content-between gap-2">
                <p class="card-text m-0">$${event.price}</p>
                <a href="../subPages/details.html?id=${event["_id"]}" class="btn ver-mas">See details</a>
                </div>`;
        });
    }
}


//Función que devuelve un array de eventos según la fecha (según sea menor o mayor que la fecha actual del obj "data")
function filterEventsbyDate(array,fecha){
    return array.filter( event => {
        return pastEventsBox ? event.date < fecha : event.date > fecha;
    })

}

//Función para mostrar los checkboxes dinámicamente.
function displayCheckboxes(container, arr){
    arr.filter( (element,i) => {
        container.innerHTML += `<div class="form-check">
        <input class="form-check-input checkbox" type="checkbox" value="${element}" id="${i}">
        <label class="form-check-label" for="${i}">
            ${element}
        </label>
    </div>`
    })
}


function displayNoFoundCard(container){
    let selectedCategory = inputsCheckedArr;
    let h5Combined = `<h5>Sorry! No results found for '<span style="color: #ba075c">${inputSearch.value}</span>' in <span style="color: purple">${selectedCategory}</span>. </h5>`
    let h5Categ = `<h5>Sorry! No results found within: <span style="color: purple">${selectedCategory}</span>. 😓</h5>`
    let h5Search = `<h5>Sorry! No results found for '<span style="color: #ba075c">${inputSearch.value}</span>'. 😥</h5>`
    let template = `<div class="container fade-in">
                        <div class="row">
                            <div class="col-12 d-flex flex-column align-items-center justify-content-center">
                                <img style="width: 12rem; margin-left: 2rem" src="../assets/not-found.gif" alt="no results">
                                    ${inputSearch.value !== "" && inputsCheckedArr.length < 1 ? h5Search : 
                                    inputSearch.value === "" && inputsCheckedArr.length > 0 ? h5Categ : 
                                    h5Combined}
                                        </div>
                                    </div>`;
    container.innerHTML = template;
}

//condiciones de filtrado y mostrado de tarjetas segun el array filtrado:
function conditionsForFilter(){
    let filteredArray = [];
    switch(true){
        case inputValue === "" && inputsCheckedArr.length < 1:
            filteredArray = arrayARecorrer;
                break;
        case inputValue !== "" && inputsCheckedArr.length < 1:
            let bySearch = arrayARecorrer.filter( e => {if(e.name.toLowerCase().includes(inputValue) || e.description.toLowerCase().includes(inputValue) ) {return e }})
            filteredArray = bySearch;
                break;
        case inputValue === "" && inputsCheckedArr.length > 0:
            let byCategory = arrayARecorrer.filter( e => inputsCheckedArr.includes(e.category))   
            filteredArray = byCategory; 
                break;
        case inputValue !== "" && inputsCheckedArr.length > 0:
            let combinedFilters = arrayARecorrer.filter( e => inputsCheckedArr.includes(e.category)).filter( e => e.name.toLowerCase().includes(inputValue) || e.description.toLowerCase().includes(inputValue));
            filteredArray = combinedFilters; 
                break;
    }
    displayCards(cardsBox, filteredArray)
}