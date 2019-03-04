
 const employeeCards = document.querySelector('.employee-cards'); 

 function capitalize(item) {
    let newWord = item[0].toUpperCase() + item.slice(1);
    return newWord; 
  }


// Getting data from the random users API 
fetch('https://randomuser.me/api/?seed=foobar&results=12&inc=picture,name,email,location,phone,dob,')
    .then(response => response.json())
    .then(data => {
        data.results.forEach(function(employee){
            console.log(employee);
            let photo = employee.picture.large;
            let firstName = capitalize(employee.name.first);
            let lastName = capitalize(employee.name.last);
            let fullName = firstName + " " + lastName;
            let city = capitalize(employee.location.city);
            let email = employee.email;
            let phone = employee.phone;
            let address = employee.location.street + "," + " " + employee.location.state + " " + employee.location.postcode;
            let birthday = employee.dob.date;

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
        })
    })

 // HELPER FUNCTIONS


