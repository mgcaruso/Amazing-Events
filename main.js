
//---------------------------------DECLARATION OF MAIN VARIABLES -------------------------------------------//
/*Declaro las variables globales con las que voy a trabajar dentro de la función getData desde donde obtengo los datos
de la API*/
var indexBox,pastEventsBox,upcomingEventsBox,checkboxesBox, eventId,arrOfEvents,inputSearch,inputsCheckedArr,inputValue,cardsBox,arrayARecorrer,combinedWithCategArr,allCategArr, set, categoriesArr, allCheckboxesInput, enStorage;

/*Función asíncrona que obtiene los datos de la API. Hace el llamado utilizando el método fetch. Se utiliza el await para 
que el código dentro de la función no se ejecute hasta que se obtena la respuesta de la API. */
async function getData() {
    await fetch('https://amazing-events.herokuapp.com/api/events').then(response => response.json()).then(json => {
        //json es la data en concreto que obtenemos de la API en formato JSON
        dataFromAPI = json;
        
        
        //se le asigna valor a los contenedores utilizando los querySelectors para traer los elementos desde el HTML.
        //contenedores:
        indexBox = document.querySelector("#container");
        pastEventsBox = document.querySelector("#past-events-box");
        upcomingEventsBox = document.querySelector("#upcoming-events-box");
        checkboxesBox = document.querySelector(".checkboxesBox");
        
        
        eventId;
        //Seleccionamos la parte sobre la que queremos operar y la guardamos en la variable ya definida globalmente.
        arrOfEvents = dataFromAPI.events; //array que viene directo del database
        /*Guardamos en las siguientes variables el resultado de la función filterEventsByDate que ordena los eventos
        segun la fechaActual que figura en el json*/
        pastEvents = filterEventsbyDate(arrOfEvents,dataFromAPI.currentDate);
        upcomingEvents = filterEventsbyDate(arrOfEvents,dataFromAPI.currentDate);

        //traemos el inputSearch del html
        inputSearch = document.querySelector(".search-input");

        //Creamos un array vacio donde van a acumularse las categorias chequeadas
        inputsCheckedArr = [];
        //En inputValue, declarada inicialmente como un array vacio, se guardará lo que el usuario ingrese en el input search.
        inputValue = ""; 

        //contenedor donde aparecen las cards (depende de el contenedor que exista en el html donde se situe el usuario)//

        cardsBox = indexBox ? indexBox :
                            pastEventsBox ? pastEventsBox :
                                            upcomingEventsBox;

        //array a recorrer segun el caso (tambien depende de la existencia del contenedor del html)//

        arrayARecorrer = indexBox ? arrOfEvents :
                            pastEventsBox ? pastEvents:
                                            upcomingEvents;
                                            

        //(funciones declaradas en functions.js)
        //----------------------------------DISPLAY CARDS --------------------------------------------//

        //Traemos todos los inputs que fueron creados dinámicamente.
        allCheckboxesInput = document.querySelectorAll(".checkbox");

        //por default, ejecutamos la función que muestra las cartas, y luego las que tiene las condiciones que las filtra.
        displayCards(cardsBox,arrayARecorrer)
        conditionsForFilter()
        
        
        
        //----------------------------------DISPLAY CHECKBOXES --------------------------------------------//

        allCategArr = arrOfEvents.map(evento => evento.category); 
        set = new Set(allCategArr);
        categoriesArr = [...set];

        displayCheckboxes(checkboxesBox, categoriesArr);


        //---------------------------------FILTER BY CATEGORY - CHECKBOXES -------------------------------------------//

        //Traemos el array de checkboxes creado dinámicamente.
        allCheckboxesInput = document.querySelectorAll(".checkbox");
        enStorage = [];



        allCheckboxesInput.forEach( checkbox => checkbox.addEventListener("click", ()=> checkboxesFunction(checkbox)));

        function checkboxesFunction(checkbox){
            checkbox.checked ? inputsCheckedArr.push(checkbox.value) : inputsCheckedArr = inputsCheckedArr.filter( e => e !== checkbox.value);

            checkbox.checked ? localStorage.setItem(`id-${checkbox.value}`, checkbox.value ) : localStorage.removeItem(`id-${checkbox.value}`);
            conditionsForFilter(cardsBox)
        }

        //---------------------------------FILTER BY TITLE - SEARCH INPUT -------------------------------------------//
        
        inputSearch.addEventListener("keyup", ()=> inputValue = inputSearch.value.toLowerCase());
        
        document.addEventListener("keyup", e => {
            if(e.target.className.includes("search-input")) conditionsForFilter();
        })
        

    });
}

getData()






// //contenedores:
// var indexBox = document.querySelector("#container");
// var pastEventsBox = document.querySelector("#past-events-box");
// var upcomingEventsBox = document.querySelector("#upcoming-events-box");
// var checkboxesBox = document.querySelector(".checkboxesBox");

// let eventId;
// var arrOfEvents = addIdtoData(data.eventos); //array que viene directo del database
// var pastEvents = filterEventsbyDate(arrOfEvents);
// var upcomingEvents = filterEventsbyDate(arrOfEvents);

// var inputSearch = document.querySelector(".search-input");

// var inputsCheckedArr = [];
// var inputValue = "";

// //contenedor donde aparecen las cards//
// var cardsBox = indexBox ? indexBox :
//                     pastEventsBox ? pastEventsBox :
//                                     upcomingEventsBox;

// //array a recorrer segun el caso//

// var arrayARecorrer = indexBox ? arrOfEvents :
//                     pastEventsBox ? pastEvents:
//                                     upcomingEvents;
                                    
// var combinedWithCategArr;



// //(funciones declaradas en functions.js)
// //----------------------------------DISPLAY CARDS --------------------------------------------//

// window.onload = ()=>{
//     allCheckboxesInput.forEach( input => {
//         if(localStorage.getItem(`id-${input.value}`)) inputsCheckedArr.push(localStorage.getItem(`id-${input.value}`)) 
//         for(let value of inputsCheckedArr){if(input.value == value) input.checked = true; }
//         conditionsForFilter()
//     })
// }


// //----------------------------------DISPLAY CHECKBOXES --------------------------------------------//

// var allCategArr = arrOfEvents.map(evento => evento.category); 
// var set = new Set(allCategArr);
// var categoriesArr = [...set];

// displayCheckboxes(checkboxesBox, categoriesArr);


// //---------------------------------FILTER BY CATEGORY - CHECKBOXES -------------------------------------------//

// //Traemos el array de checkboxes creado dinámicamente.
// var allCheckboxesInput = document.querySelectorAll(".checkbox");
// var enStorage = [];



// allCheckboxesInput.forEach( checkbox => checkbox.addEventListener("click", ()=> checkboxesFunction(checkbox)));

// function checkboxesFunction(checkbox){
//     checkbox.checked ? inputsCheckedArr.push(checkbox.value) : inputsCheckedArr = inputsCheckedArr.filter( e => e !== checkbox.value);

//     checkbox.checked ? localStorage.setItem(`id-${checkbox.value}`, checkbox.value ) : localStorage.removeItem(`id-${checkbox.value}`);
//     conditionsForFilter(cardsBox)
// }

// //---------------------------------FILTER BY TITLE - SEARCH INPUT -------------------------------------------//

// inputSearch.addEventListener("keyup", ()=> inputValue = inputSearch.value.toLowerCase());

// document.addEventListener("keyup", e => {
//     if(e.target.className.includes("search-input")) conditionsForFilter();
// })

