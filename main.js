
 const employeeCards = document.querySelector('.employee-cards'); 
 let employees = [];

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


// Getting data from the random users API 
fetch('https://randomuser.me/api/?seed=foobar&results=12&nat=us&inc=picture,name,email,location,phone,dob,')
    .then(response => response.json())
    .then(data => {
        employees = data.results;
        data.results.forEach(function(employee, i){
            // console.log(employee);
            let photo = employee.picture.large;
            let firstName = capitalize(employee.name.first);
            let lastName = capitalize(employee.name.last);
            let fullName = firstName + " " + lastName;
            let city = capitalize(employee.location.city);
            let email = employee.email;
            let phone = employee.phone;
            let address = employee.location.street + "," + " " + employee.location.state + " " + employee.location.postcode;
            let birthday = newBirthday(employee.dob.date);

            // create each employee card
            const card = document.createElement("div"); 
            card.setAttribute("class", "card"); 
            const html = `
            <img class="thumbnail" src='${photo}' alt='employee photo'>
            <div class="employee-preview-information">
                <span class="full-name"> <strong>${fullName}</strong></span>  
                <div class="email"> ${email} </div>
                <div class="city"> ${city} </div>
            </div>
        `;
        card.innerHTML = html;
        employeeCards.appendChild(card); 

        // create modal window onclick

        card.addEventListener('click', function addCardInformation() {
            const modalContainer = document.querySelector(".modal-div");
            const modal = document.createElement("div"); 
            modal.setAttribute("class", "modal"); 
            const modalHTML = `
                <div class="modal-information">
                    <button class="modal-close">X</button>
                    <img class="thumbnail modal-item" src='${photo}' alt='employee photo'>
                    <div class="employee-modal-information modal-item">
                        <span class="full-name"> <strong>${fullName}</strong></span>  
                        <div class="email"> ${email} </div>
                        <div class="city"> ${city} </div>
                    </div>
                    <div class="employee-modal-information extra modal-item">
                        <div class="phone"> ${phone} </div>
                        <div class="address"> ${address} </div>
                        <div class="dob"> Birthday: ${birthday}</div>
                    </div>  
                </div>
            `;
            modal.innerHTML = modalHTML; 
            modalContainer.appendChild(modal);

            // close modal functionality 
            document.querySelector(".modal-close").addEventListener('click', function(){
                modalContainer.removeChild(modal); 
            })
                
        });  // END CREATE MODAL WINDOW 

    })
})

 // HELPER FUNCTIONS


