var bookings;
var edit = false;
var currentUserId;
function booked() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value
    let phone = document.getElementById('phone').value

    const obj = {
        name,
        email,
        phone

    }

    if (edit === false) {
        axios.post("https://crudcrud.com/api/5727ff58b8f54a75a27efa318c71a702/appointmentData", obj).then((response) => {
            displayBookings();
            console.log('post')
            document.getElementById('name').value = "";
            document.getElementById('email').value = "";
            document.getElementById('phone').value = ""
        }).catch((err) => {
            console.log(err);
        })
    }
    else {
        axios.put(`https://crudcrud.com/api/5727ff58b8f54a75a27efa318c71a702/appointmentData/${currentUserId}`, obj).then((response) => {
            displayBookings();
            console.log("put")
            document.getElementById('name').value = "";
            document.getElementById('email').value = "";
            document.getElementById('phone').value = ""
        }).catch((err) => {
            console.log(err);
        })
    }
}
window.addEventListener("DOMContentLoaded", () => {
    displayBookings();

})
function displayBookings() {
    axios.get("https://crudcrud.com/api/5727ff58b8f54a75a27efa318c71a702/appointmentData")
        .then((response) => {
            bookings = response.data;
            var bookingList = document.getElementById("booking-list");
            bookingList.innerHTML = "";
            for (var i = 0; i < bookings.length; i++) {
                var booking = bookings[i];
                var listItem = document.createElement("li");
                listItem.textContent = booking.name + " | " + booking.email + " | " + booking.phone;

                var editButton = createEditButton(booking._id);
                var deleteButton = createDeleteButton(booking._id);

                listItem.appendChild(editButton);
                listItem.appendChild(deleteButton);
                bookingList.appendChild(listItem);
            }
        });
}

// Function to create an edit button with a closure to capture the correct index
function createEditButton(id) {
    var editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function () {
        editBooking(id);
    });
    return editButton;
}

// Function to create a delete button with a closure to capture the correct index
function createDeleteButton(id) {
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
        deleteBooking(id);
    });
    return deleteButton;
}


function editBooking(index) {
    var editProfile;
    console.log(bookings);
    console.log(index);
    for (var i = 0; i < bookings.length; i++) {
        if (index === bookings[i]._id) {
            editProfile = bookings[i];
            break;
        }
    }
    currentUserId = index;
    console.log(editProfile);
    document.getElementById("name").value = editProfile.name;
    document.getElementById("email").value = editProfile.email;
    document.getElementById("phone").value = editProfile.phone;
    edit = true;

}

function deleteBooking(index) {
    var deleteProfile;
    console.log(index);
    for (var i = 0; i < bookings.length; i++) {
        if (index === bookings[i]._id) {
            deleteProfile = bookings[i];
            break;
        }
    }

    axios.delete(`https://crudcrud.com/api/5727ff58b8f54a75a27efa318c71a702/appointmentData/${index}`).then((response) => {
        displayBookings();
    })
}