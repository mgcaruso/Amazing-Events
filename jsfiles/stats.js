
var dataForDetails, pastEvents, upcomingEvents;
async function getDataforStats(){
    await fetch(`https://amazing-events.herokuapp.com/api/events`)
    .then( resp => resp.json())
    .then( json => { 
        dataForDetails = json.events;
    
    //EVENTOS PASADOS Y FUTUROS
    pastEvents = dataForDetails.filter( event => event.date < json.currentDate);
    upcomingEvents = dataForDetails.filter( event => event.date > json.currentDate);
    

    //EVENTS With largest capacity:
    let maxCapacity = Math.max(...dataForDetails.map( e => e.capacity));
    let highestCapacityEvent = dataForDetails.filter( e => {if(e.capacity == maxCapacity) return e});
    //EVENT With highest percentage of attendance:
    
    //Metemos en una variable percentageOfAttendance, el resultado del mapeo de past events. Mapeamos el arreglo y de ese mapeo creamos un nuevo objeto con dos propiedades: el nombre del evento y el porcentaje de asistencia. este ultimo calculado comparando la asistencia con la capacidad del evento.
    //Calculamos la asistencia multiplicandola por 100 y dividiéndola por la capacidad;

    let percentageAttendance = pastEvents.map( e => {
        let newObj = {
            name: e.name,
            "percentage of assistance": ((parseInt(e.assistance)*100)/parseInt(e.capacity)).toFixed(2)
        }
        return newObj
    } )
    let maxPercentage = Math.max(...percentageAttendance.map( e => e["percentage of assistance"]));    
    let highestPercentageEvent = percentageAttendance.filter ( e => e["percentage of assistance"] == maxPercentage );

    


    
    //EVENT With highest lowest of attendance:
    
    let minPercentage = Math.min(...percentageAttendance.map( e => e["percentage of assistance"]));    
    let lowestPercentageEvent = percentageAttendance.filter ( e => e["percentage of assistance"] == minPercentage );


    function AttendAndRevenuePerCategory(categoria, arr){
        let categoriaArr = arr.filter( e => e.category === categoria);//me retorna un array con los eventos pertenecientes a esa categoria.
        let totalRevenue = 0;
        let porcentaje = 0;
        categoriaArr.map( e => {
            totalRevenue += (e.price * e.assistance) ;
            e.porcentaje = parseFloat(((parseFloat(e.assistance)*100)/parseFloat(e.capacity)).toFixed(2))
        } )
        
        categoriaArr.map(e => porcentaje += e.porcentaje)
        

        let resultado = {
            category: categoria,
            "revenue": totalRevenue,
            "attendance average": (porcentaje/categoriaArr.length).toFixed(2) //cambiar 
        }; 


        return resultado;
    }

    //AHORA PODEMOS USAR LA FUNCION PARA GUARDAR EN UNA VARIABLE UN OBJETO CON TODOS LOS DATOS QUE NECESITAMOS PARA SUBIRLOS A LA TABLA



    //PAST EVENTS
    let foodFair = AttendAndRevenuePerCategory("Food Fair", pastEvents)
    let museum = AttendAndRevenuePerCategory("Museum", pastEvents)
    let costumeParty = AttendAndRevenuePerCategory("Costume Party", pastEvents)
    let musicConcert = AttendAndRevenuePerCategory("Music Concert", pastEvents)
    let race = AttendAndRevenuePerCategory("Race", pastEvents)
    let bookExchange = AttendAndRevenuePerCategory("Book Exchange", pastEvents)
    let cinema = AttendAndRevenuePerCategory("Cinema", pastEvents)



    var allCat = [foodFair,museum,costumeParty,musicConcert,race,bookExchange,cinema];


    var generalTr = document.querySelector("#general-tr");


    function displayDataOnTable(){
        generalTr.innerHTML = `<td>${highestPercentageEvent[0].name}: ${highestPercentageEvent[0]["percentage of assistance"]}% </td>`
        generalTr.innerHTML += `<td>${lowestPercentageEvent[0].name}: ${lowestPercentageEvent[0]["percentage of assistance"]}% </td>`
        generalTr.innerHTML += `<td>${highestCapacityEvent[0].name}: ${highestCapacityEvent[0].capacity} </td>`
        
    }
    

    var tbodyPast = document.querySelector("#tbody-past"); 
    var tbodyUp = document.querySelector("#tbody-upcoming")

    function displayCategoriesStatistics(box,arr){
        arr.forEach( category => {
            let tr = document.createElement("tr");
            tr.innerHTML = `<td>${category.category}</td> 
            <td>${category.revenue}</td>
            <td>${category["attendance average"]}</td>`
            box.appendChild(tr);
        }) 
    }   
    displayDataOnTable();
    displayCategoriesStatistics(tbodyPast,allCat);

    
    function AttendAndRevenuePerCategoryUpcoming(categoria, arr){
        let categoriaArr = arr.filter( e => e.category === categoria);//me retorna un array con los eventos pertenecientes a esa categoria.

        console.log(categoriaArr.length)
        let totalRevenue = 0;
        let porcentaje = 0;
        categoriaArr.map( e => {
            totalRevenue += (e.price * e.estimate) ;
            e.porcentaje = parseFloat(((parseFloat(e.estimate)*100)/parseFloat(e.capacity)).toFixed(2))
        } )
        
        categoriaArr.map(e => porcentaje += e.porcentaje)
        let resultado;
        if(categoriaArr.length > 0){
            resultado = {
                category: categoria,
                "revenue": `$${totalRevenue}`,
                "attendance average": `${(porcentaje/categoriaArr.length).toFixed(2)}%` //cambiar 
            }; 
        }else{
            resultado = {
                category: categoria, 
                "revenue": "-",
                "attendance average": "-",
            }
        }


        return resultado;
    }

    let foodFairUp = AttendAndRevenuePerCategoryUpcoming("Food Fair", upcomingEvents)
    console.log(foodFairUp)
    let museumUp = AttendAndRevenuePerCategoryUpcoming("Museum", upcomingEvents)
    let costumePartyUp = AttendAndRevenuePerCategoryUpcoming("Costume Party", upcomingEvents)
    let musicConcertUp = AttendAndRevenuePerCategoryUpcoming("Music Concert", upcomingEvents)
    let raceUp = AttendAndRevenuePerCategoryUpcoming("Race", upcomingEvents)
    let bookExchangeUp = AttendAndRevenuePerCategoryUpcoming("Book Exchange", upcomingEvents)
    let cinemaUp = AttendAndRevenuePerCategoryUpcoming("Cinema", upcomingEvents)

    let allCatUp = [foodFairUp, museumUp, costumePartyUp, musicConcertUp, museumUp, raceUp, bookExchangeUp, cinemaUp];
    displayCategoriesStatistics(tbodyUp,allCatUp);

    
})
}

getDataforStats();

