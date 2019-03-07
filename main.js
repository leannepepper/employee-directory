
 const employeeCards = document.querySelector('.employee-cards'); 
 const modalContainer = document.querySelector(".modal-div");
 const modal = document.querySelector("#modal");
  
//  let index= 0; 

function capitalize(item) {
    let newWord = item[0].toUpperCase() + item.slice(1);
    return newWord; 
}

function newBirthday(date) {
    let year = date.slice(0, 4);
    let month = date.slice(5, 7); 
    let day = date.slice(8, 10);
    const newDate = `${month}/${day}/${year}`;
    return newDate; 
};

// get employee data and return an oject with needed properties 
function getEmployee(employee){
   let firstName = capitalize(employee.name.first);
   let lastName = capitalize(employee.name.last);
    return list = {
        photo: employee.picture.large,
        fullName: firstName + " " + lastName,
        city: capitalize(employee.location.city),
        email: employee.email,
        phone: employee.phone,
        address: employee.location.street + "," + " " + employee.location.state + " " + employee.location.postcode,
        birthday: newBirthday(employee.dob.date)           
    }
}
function createModal(arr,index){
    const modalHTML = `
    <div class="modal-information">
        <button class="modal-close">X</button>
        <img class="thumbnail modal-item" src='${arr[index].photo}' alt='employee photo'>
        <div class="employee-modal-information modal-item">
            <span class="full-name"> <strong>${arr[index].fullName}</strong></span>  
            <div class="email"> ${arr[index].email} </div>
            <div class="city"> ${arr[index].city} </div>
        </div>
        <div class="employee-modal-information extra modal-item">
            <div class="phone"> ${arr[index].phone} </div>
            <div class="address"> ${arr[index].address} </div>
            <div class="dob"> Birthday: ${arr[index].birthday}</div>
            <button class="previous-button"> < </button>
            <button class="next-button"> > </button>
        </div>  
    </div>
`;

return modalHTML;

}

// create employee cards 
function createCards(arr) {
    
    for(let i = 0; i <arr.length; i++ ){
        const card = document.createElement("div"); 
        card.setAttribute("class", "card"); 
        const html = `
        <img class="thumbnail" src='${arr[i].photo}' alt='employee photo'>
        <div class="employee-preview-information">
            <span class="full-name"> <strong>${arr[i].fullName}</strong></span>  
            <div class="email"> ${arr[i].email} </div>
            <div class="city"> ${arr[i].city} </div>
        </div>
        `;

    card.innerHTML = html;
    employeeCards.appendChild(card); 

    card.addEventListener('click', function(){
        modal.style.display = "block";
        modal.setAttribute("class", "modal");
        modal.innerHTML = createModal(arr,i); 

        // check index of modal to see if previous and next buttons are needed
        if(i <= 0) {
            document.querySelector(".previous-button").style.display = "none";
        } else {
            document.querySelector(".previous-button").style.display = ""; 
        }
        
        if(i >= 11) {
            document.querySelector(".next-button").style.display = "none"; 
        } else {
            document.querySelector(".next-button").style.display = ""; 
        }

// ************* BUTTON FUNCTIONS *************
        modal.addEventListener('click', function(e){
            console.log("click");
            if(e.target === document.querySelector(".modal-close")){
                modal.style.display = "none";
                
            } else if (e.target === document.querySelector(".previous-button")){
                modal.style.display = "block";
                modal.innerHTML = createModal(arr,--i); 
                console.log(i);
                
            } else if(e.target === document.querySelector(".next-button")){
                modal.style.display = "block";
                modal.innerHTML = createModal(arr,++i);   
                console.log(i);  
            }


        })

        // ************* END BUTTON FUNCTIONS *************

    }); // end card event listener 

    };

             
} // End For Loop and Create Cards
  





// Getting data from the random users API 
fetch('https://randomuser.me/api/?seed=foobar&results=12&nat=us&inc=picture,name,email,location,phone,dob,')
    .then(response => response.json())
    .then(data => { 
        const employees = data.results.map(getEmployee);
        createCards(employees); 
         
    })
   


      







