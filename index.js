var bookings;
function booked(){
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value
    let phone = document.getElementById('phone').value

    const obj={
        name,
        email,
        phone

    }
    axios.post("https://crudcrud.com/api/87112d1039ef4c9e93a9edbe6cdd5811/appointmentData",obj).then((response)=>{
        displayBookings();
        console.log(response);
    }).catch((err)=>{
        console.log(err);
    })
}

function displayBookings(){
    axios.get("https://crudcrud.com/api/87112d1039ef4c9e93a9edbe6cdd5811/appointmentData").then((response)=>{
     bookings = response.data;
    var bookingList = document.getElementById("booking-list");
    bookingList.innerHTML="";
    for(var i=0;i<bookings.length;i++){
        var booking = bookings[i];
        var listItem = document.createElement("li");
        listItem.textContent=booking.name +" | "+booking.email + " | " + booking.phone;
        
        var editButton = document.createElement("button");
        editButton.textContent="Edit";
        editButton.setAttribute("data-index",booking._id);

        editButton.addEventListener("click",function(){
            var index = booking._id;
            console.log(index);
            editBooking(index);
        })

        var deleteButton = document.createElement("button");
        deleteButton.textContent="Delete";
        deleteButton.setAttribute("data-index",booking._id);
        deleteButton.addEventListener("click",function(){
            var index = booking._id;
            deleteBooking(index);
        })




        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        bookingList.appendChild(listItem);
    }
    })
   
    
}

function editBooking(index){
    var editProfile;
    console.log(bookings);
    console.log(index);
    for(var i=0;i<bookings.length;i++){
        if(index ===bookings[i]._id){
            editProfile=bookings[i];
            break;
        }
    }
    console.log(editProfile);
    document.getElementById("name").value = editProfile.name;
      document.getElementById("email").value = editProfile.email;
      document.getElementById("phone").value = editProfile.phone;
deleteBooking(index);  
    
}

function deleteBooking(index){
    var deleteProfile;
    console.log(index);
    for(var i=0;i<bookings.length;i++){
        if(index ===bookings[i]._id){
            deleteProfile=bookings[i];
            break;
        }
    }

    axios.delete(`https://crudcrud.com/api/87112d1039ef4c9e93a9edbe6cdd5811/appointmentData/${index}`).then((response)=>{
        displayBookings();
    })
}