// Initial variables setup

let menuChoice = "";
let healthServices = [];
let healthServicesId = 1;
let menuResponse = false;
let isapreResponse = false;
let serviceTypeResponse = false;
let ageResponse = false;
let availabilityResponse = false;
let basePrice = 0;
let serviceType = "";
let serviceTypeFactor = 0;
let ageFactor = 0;
let totalPrice = 0;
let healthServicesArray = [];
let deleteChoice;
let filteredServicesArray = [];
let healthServicesAvailability = [
    {name: "medicina general", availableDoctors: 10, availableDate: "hoy"},
    {name: "medicina familiar", availableDoctors: 5, availableDate: "hoy"},
    {name: "medicina interna", availableDoctors: 4, availableDate: "miércoles 24 de julio"},
    {name: "cirugia", availableDoctors: 4, availableDate: "viernes 26 de julio"},
    {name: "ginecologia", availableDoctors: 4, availableDate: "lunes 29 de julio"},
    {name: "psiquiatria", availableDoctors: 5, availableDate: "miércoles 14 de agosto"},
    {name: "dermatologia", availableDoctors: 2, availableDate: "lunes 26 de agosto"},
]
let searchName;

// Add services menu
// Conditional adds the base ISAPRE plan price

// Main menu

mainMenu = () => {
    while (menuResponse == false){
        menuChoice = prompt("Bienvenido a la plataforma Nathaniel de telemedicina.\n\n Ingrese su opción:\n - (agregar) agregar consulta\n - (disponibilidad) checkear médicos y próxima hora disponible\n - (revisar) revisar consultas agregadas\n - (eliminar) eliminar consultas\n - (salir) salir")
        
        if (menuChoice == "agregar") {
            addServices();
            }
        
        else if (menuChoice == "disponibilidad") {
            checkAvailability();
            }

        else if (menuChoice == "revisar"){
            checkCurrentServices();
            }

        else if (menuChoice == "eliminar"){
            deleteCurrentServices();
            }
        
        else if (menuChoice == "salir"){
            alert("Saliendo de la plataforma. ¡Gracias por preferirnos!");
            menuResponse = true;
            }

        else{
            alert("Opción inválida, ingrese nuevamente");
            }
    }
       
}

addServices = () => {
    while (isapreResponse == false) {
        isapreCompany = prompt("Por favor ingrese su previsión \n\n Opciones:\n - banmedica\n - consalud\n - colmena\n - cruzblanca\n - masvida\n - vidatres\n - esencial");
        switch (isapreCompany){
            case "banmedica":
            case "consalud":
                console.log(`ISAPRE ${isapreCompany}`);
                basePrice = 8000;
                isapreResponse = true;
                break;
            case "colmena":
            case "cruzblanca":
            case "masvida":
                console.log(`ISAPRE ${isapreCompany}`);
                basePrice = 11000;
                isapreResponse = true;
                break;
            case "vidatres":
            case "esencial":
                console.log(`ISAPRE ${isapreCompany}`);
                basePrice = 16000;
                isapreResponse = true;
                break;
            default:
                alert("Dato incorrecto, ingrese nuevamente");
        }
        }

// Conditional that checks type of service required

    while (serviceTypeResponse == false) {
        serviceType = prompt("Por favor ingrese su especialidad \n\n Opciones:\n - general\n - familiar\n - interna\n - cirugia\n - ginecologia\n - psiquiatria\n - dermatologia");
        switch (serviceType){
            case "general":
                console.log(`Especialidad ${serviceTypeFactor}`);
                serviceTypeFactor = 1;
                serviceTypeResponse = true;
                break;
            case "familiar":
                console.log(`Especialidad ${serviceTypeFactor}`);
                serviceTypeFactor = 1.3;
                serviceTypeResponse = true;
                break;
            case "interna":
            case "cirugia":
            case "ginecologia":
                console.log(`Especialidad ${serviceTypeFactor}`);
                serviceTypeFactor = 1.5;
                serviceTypeResponse = true;
                break;
            case "psiquiatria":
            case "dermatologia":
                console.log(`Especialidad ${serviceTypeFactor}`);
                serviceTypeFactor = 1.8;
                serviceTypeResponse = true;
                break;
            default:
                alert("Dato incorrecto, ingrese nuevamente");
        }
        }


// Conditional adds age multiplier (measured in years) on plans

    while (ageResponse == false) {
        patientAge = Number(prompt("Ingrese su edad en años"));
        if (patientAge >= 65) {
            ageFactor = 1.65;
            console.log(`Edad en tramo 65 años o más, factor multiplicador ${ageFactor}`);
            ageResponse = true;
            }
        
        else if (patientAge >= 45){
            ageFactor = 1.5;
            console.log(`Edad en tramo 45-64 años, factor multiplicador ${ageFactor}`);
            ageResponse = true;
            }
        
        else if (patientAge >= 35){
            ageFactor = 1.35;
            console.log(`Edad en tramo 35-44 años, factor multiplicador ${ageFactor}`);
            ageResponse = true;
            }
    
        else if (patientAge >= 18){
            ageFactor = 1.25;
            console.log(`Edad en tramo 18-34 años, factor multiplicador ${ageFactor}`);
            ageResponse = true;
            }

        else if (patientAge <= 19){
            ageFactor = 1;
            console.log(`Tramo de menor de edad, factor multiplicador ${ageFactor}`);
            ageResponse = true;
            }
        else{
            alert("Dato inválido, ingrese nuevamente");
        }
        }

        calculateTotalPrice(basePrice, serviceTypeFactor, ageFactor);

// Function that calculates the total service price

    function calculateTotalPrice (basePrice, serviceTypeFactor, ageFactor){
        totalPrice = basePrice * serviceTypeFactor * ageFactor;
        return totalPrice;
    }

// Adds the service to healthServices array, displays totalprice, resets response booleans and goes back to main menu
        
    alert(`Atención agregada correctamente.\nPrecio total de atención: $${totalPrice}`);
    healthServiceObject = {id: healthServicesId, service: serviceType, factor: (serviceTypeFactor * ageFactor), price: totalPrice};
    healthServices.push(healthServiceObject);
    console.log(healthServices);
    console.log(`ID de la atención: ${healthServicesId}`);
    healthServicesId++;
    resetResponse();    
    }

// Final alert message, displays total price when adding services

const calculateServicePrice = () => {
    totalPrice = calculateTotalPrice(basePrice, ageFactor);
    console.log(`Precio total: ${totalPrice}`);
    alert(`El precio total a pagar es de CLP$${totalPrice}\nPara concretar la reserva, tiene 2 posibilidades:\n - Correo electrónico nathaniel@ibco.cl\n - Whatsapp +56912345678`);
}

// Resets the response variables after adding a service

resetResponse = () => {
    isapreResponse = false;
    serviceTypeResponse = false;
    ageResponse = false;
    availabilityResponse = false;
}

// Function that does find method on healthServicesAvailability array, shows next available date

checkAvailability = () => {
    while (availabilityResponse == false) {
        searchName = prompt("Por favor ingrese su especialidad \n\n Opciones:\n - medicina general\n - medicina familiar\n - medicina interna\n - cirugia\n - ginecologia\n - psiquiatria\n - dermatologia");

        foundName = healthServicesAvailability.find((search) => search.name === searchName);
        if (foundName !== undefined) {
            alert(`Chequeando disponibilidad:\n - Especialidad: ${foundName.name}\n - Médicos disponibles: ${foundName.availableDoctors}\n - Próxima hora disponible: ${foundName.availableDate}`);
            availabilityResponse = true;
        }
        else {
            alert("Dato inválido, ingrese nuevamente");
        }
    }
    resetResponse();
}

// Function to show current services, uses forEach function

const checkCurrentServices = () => {
    if(healthServices.length < 1 || healthServices == undefined){
        alert("No tiene agregadas prestaciones, volviendo al menu principal");
    }
    else {
    healthServicesArray = healthServices.forEach(service => {
        alert(`ID de atención: ${service.id}\nServicio: ${service.service}\nPrecio: ${service.price}\n`);
    })
    }
}

// Function that checks if there are any services to delete, then if true, deletes services based on ID

const deleteCurrentServices = () => {
    if(healthServices.length < 1 || healthServices == undefined){
         alert("No tiene agregadas prestaciones, volviendo al menu principal");
     }
    else {
        deleteChoice = prompt(("Ingrese el ID de la atención a eliminar"));
        filteredServicesArray = healthServices.filter((service) => service.id != deleteChoice);
        console.log(filteredServicesArray);
        if (filteredServicesArray.length == healthServices.length){
            alert("No se ha podido eliminar la consulta")
            }
        else {
            healthServices = filteredServicesArray;
            alert(`El servicio con ID: ${deleteChoice} ha sido eliminado exitosamente`);
        }
        }

    }

// Executes main menu, starts the script

mainMenu();