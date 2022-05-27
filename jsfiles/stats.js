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


        let highestAttendanceEvent = percentageAttendance.sort( (a,b) => b["percentage of assistance"] - a["percentage of assistance"])[0];
        let lowestPercentageEvent = percentageAttendance.sort( (a,b) => a["percentage of assistance"] - b["percentage of assistance"])[0];
        let maxCapacityEvent = dataForDetails.sort( (a,b) => Number(b.capacity) - Number(a.capacity))[0];
        console.log(maxCapacityEvent)

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
        arrEv.forEach( evento => {
            if(evento.category === categoria){
                //categoria
                insideObj.category = categoria;

                //recaudacion total
                insideObj.revenue = arrEv.filter( e => e.category === categoria ).reduce( (acc,evento) => {
                    eventVariable = evento.assistance ? evento.assistance : evento.estimate;
                    eventVariable = Number(eventVariable);
                    acc += evento.price * eventVariable;
                    return acc;
                },0),

                //eventos dentro de la categoria
                insideObj.eventos = arrEv.filter( e => e.category === categoria);

                //porcentaje total de asistencia
                insideObj["attendance average"] = arrEv.filter(e => e.category === categoria).map( e => (`${e.assistance ? e.assistance : e.estimate}`*100)/e.capacity).reduce( (acc,item) => {
                    acc += item
                    return acc
                })
                insideObj["attendance average"] = insideObj["attendance average"]/insideObj.eventos.length;
            }
        }) 
        return insideObj;
    })
}


//Función que muestra los valores de la primera tabla.
function displayDataOnTable(highestAtt,lowestAtt,maxCapacity){
    generalTr.innerHTML = `<td>${highestAtt.name}: ${highestAtt["percentage of assistance"]}% </td>`
    generalTr.innerHTML += `<td>${lowestAtt.name}: ${lowestAtt["percentage of assistance"]}% </td>`
    generalTr.innerHTML += `<td>${maxCapacity.name}: ${maxCapacity.capacity} </td>`
    
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