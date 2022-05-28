let dataForDetails;
var tbodyPast = document.querySelector("#tbody-past"); 
var tbodyUp = document.querySelector("#tbody-upcoming");
var generalTr = document.querySelector("#general-tr");

async function fetchData(){
    
    await fetch(`https://amazing-events.herokuapp.com/api/events`)
    .then( resp => resp.json())
    .then( json => {

        dataForDetails = json.events;
    
        //EVENTOS PASADOS Y FUTUROS
        pastEvents = dataForDetails.filter( event => event.date < json.currentDate);
        upcomingEvents = dataForDetails.filter( event => event.date > json.currentDate);



        //PRIMERA TABLA--------------------------------------------------------------:
        let percentageAttendance = pastEvents.map( e => {
            let newObj = {
                name: e.name,
                "percentage of assistance": ((parseInt(e.assistance)*100)/parseInt(e.capacity)).toFixed(2)
            }
            return newObj
        } )

        let percentage = percentageAttendance.sort( (a,b) => b["percentage of assistance"] - a["percentage of assistance"]);
        let highestAttendanceEvent = percentage[0];
        let lowestPercentageEvent = percentage[percentage.length - 1];
        let maxCapacityEvent = dataForDetails.sort( (a,b) => Number(b.capacity) - Number(a.capacity))[0];

        displayDataOnTable(highestAttendanceEvent, lowestPercentageEvent, maxCapacityEvent)


        //---------------------------------------------------------------------------------//

        //Creamos un array limpio con todas las categorias.
        let cat = pastEvents.map( e => e.category)
        let catSet = new Set(cat)
        let allCategories = [...catSet] //todas las categorias
    
    
    

        //Imprimir los datos en las tablas (past y upcoming events)
        let statisticsObjUpcoming = orderByCategory(allCategories, upcomingEvents);
        let statisticsObjPast = orderByCategory(allCategories, pastEvents)
        displayCategoriesStatistics(tbodyUp,statisticsObjUpcoming, "Estimated: " )
        displayCategoriesStatistics(tbodyPast, statisticsObjPast, "" )
        
        // displayCategoriesStatistics(tbodyUp,orderByCategory(allCategories, upcomingEvents))
    

    
    }
)}


//INTENTO DE ACTUALIZACION DE LA FUNCION -sirve para eventos pasados y futuros cambiándole el segundo parámetro a la función
function orderByCategory(arrCateg,arrEv){

    return arrCateg.map( categoria => {
        let insideObj = {};
        let eventVariable;
        //Recorremos el array de eventos
        let total = 0;
        arrEv.forEach( evento => {
            //Chequeamos si la categoria del evento es igual a la categoria del array de categorias.
            if(evento.category === categoria){
                /*Agregamos una propiedad al objeto creado anteriormente con el nombre de la categoria del evento en cada
                iteración*/
                insideObj.category = categoria;

                eventVariable = evento.assistance ? evento.assistance : evento.estimate;
                evento.assistance = Number(evento.assistance);
                evento.estimate = Number(evento.estimate);
                evento.price = Number(evento.price)
                /*Agregamos otra propiedad que indica la recaudacion total de esa categoria*/
                insideObj.revenue = 0;
                insideObj.revenue += (evento.price * Number(eventVariable));
                insideObj.eventos = arrEv.filter( e => e.category === categoria);
                // //porcentaje total de asistencia
                 total += ((eventVariable * 100)/evento.capacity) //porentaje de cada evento
                console.log(insideObj.eventos)
                insideObj["attendance average"] = Number(total)/insideObj.eventos.length
                console.log(insideObj)
            }
        }) 
        return insideObj;
    })
}


//Función que muestra los valores de la primera tabla.
function displayDataOnTable(highestAtt,lowestAtt,maxCapacity){
    generalTr.innerHTML = `<td>${highestAtt.name}: ${highestAtt["percentage of assistance"]}% </td>
    <td>${lowestAtt.name}: ${lowestAtt["percentage of assistance"]}% </td> 
    <td>${maxCapacity.name}: ${maxCapacity.capacity} </td>
    `
}


//Función que imprime los valores de la segunda tabla.

function displayCategoriesStatistics(box,arr,estimated){
    arr.forEach( category => {
        if(Object.keys(category).length !== 0){
            let tr = document.createElement("tr");
            tr.classList.add("centered")
            tr.innerHTML = `<td>${category.category}</td> 
            <td>${estimated} $ ${category.revenue}</td>
            <td>${estimated} ${(category["attendance average"]).toFixed(2)} %</td>`
            box.appendChild(tr);
        }else{
            return; //si la categoria (el objeto dentro del arreglo) está vacía, no la agrega en la tabla.
        }
    }) 
}   



fetchData();