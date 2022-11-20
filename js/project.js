
let data = [];

function addProject(event) {
    event.preventDefault();
    
    let projectName = document.getElementById("project-name").value;
    let startDate = document.getElementById("start-date").value;
    let endDate = document.getElementById("end-date").value;
    let desc = document.getElementById("desc").value; 
    let img = document.getElementById("image").value; 
    let image = document.getElementById("image").files; // Untuk menangkap image, pdf, dll. Ini akan mengambil seluruh data files, tapi yang dibutuhkan adalah url/path-nya
    
    // console.log("Gambar :", image[0]); 
    // console.log("URL Gambar :", getImage);
    
    // Logic input data
    if(projectName == "" || startDate == "" || endDate == "" || desc == "" || img == "" ){
        return alert("All input field must be not empty");
    }  else {
        alert("New Card Created Successfully");
    }
    // End logic input data

    let getImage = URL.createObjectURL(image[0]); // fungsi URL.createObjectURL untuk menangkap url gambar / path. Posisi dibawah kondisi karena, jika diatas kondisi akan error karena gambar belum ada gambar yang di inputkan

    // Logic get all checked
    let result = []
    let checkboxes = document.getElementsByName("mycheckbox");

    for(let i = 0; i < checkboxes.length; i++) {
        if(checkboxes[i].checked == true) {
            result.push(checkboxes[i].value);
        } 
    }
    // End logic get all checked

    let uniqId = Date.now();
    let blog = {
        id: uniqId,
        title: projectName,
        startDate: startDate,
        endDate: endDate,
        tech: result,
        desc: desc,
        image: getImage,
    }

    data.push(blog);
    getBlog();
}


// Funvtion add data to card
function getBlog() {
    let cardContainer = document.getElementById("card-container");
    let allInput = document.querySelectorAll(".refresh");
    let checkboxes = document.querySelectorAll(".mycheckbox");

    cardContainer.innerHTML = ''; 

    for(let i = 0; i < data.length; i++) {
        cardContainer.innerHTML += `<div class="cards">
                                        <img src="${data[i].image}">
                                        <h3><a href="blog.html?${data[i].id}">${data[i].title} - ${renderTime(data[i].startDate)}</a></h3>
                                        <p class="date">durasi: ${getDistanceTime(data[i].startDate, data[i].endDate)}</p>
                                        <p class="desc">${data[i].desc}</p>
                                        <div class="icons">
                                            ${data[i].tech.includes("node") ? '<img src="img/node.png"/>': ""}
                                            ${data[i].tech.includes("angular") ? '<img src="img/angular.png"/>' : ""}
                                            ${data[i].tech.includes("react") ? '<img src="img/react.png"/>' : ""}
                                            ${data[i].tech.includes("typescript") ? '<img src="img/typescript.png"/>' : ""}
                                        </div>
                                        <div>
                                            <button type="submit" id="edit" class="edit btn-edit">edit</button>
                                            <button type="submit" id="delete" class="delete btn-delete">Delete</button>
                                        </div>
                                    </div>`
    };
    allInput.forEach(function(i) {
        i.value = "";
    })
}

// Function render time
function renderTime(time){
    // let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Des"];
    let date = new Date(time);
    let day = date.getDate();

    if(day < 10) {
        day = "0" + day
    }
    return `${date.getFullYear()}`;
    // return `${day} ${months[date.getMonth()]} ${date.getFullYear()}`
}

// function distance start date - end date
function getDistanceTime(startDate, endDate) {
    let start = new Date(startDate);
    let end = new Date(endDate);

    let duration = (end - start);

    if(duration < 0) {
        // alert("Start date must be greater than End date");
        return "-"   
    } else if (duration == 0) {
        return 0 + " day";
    } else {
        // Konversi waktu
        let second = duration / 1000;
        let minute = Math.floor(second / 60);
        second = second % 60;
        let hour = Math.floor(minute / 60);
        minute = minute % 60;
        let day = Math.floor(hour / 24);
        hour = hour % 24;
        let month = Math.floor(day / 30);
        day = day % 30;
        let year = Math.floor(month / 12);
        month = month % 12;

        // Cek kondisi
        if(year == 0) {
            year = "";
        } else {
            year += " year";
        }
        
        if(month == 0){
            month = ""
        } else {
            month += " month"
        }

        if(day == 0){
            day = "";
        } else {
            day += " day";
        }

        return `${year} ${month} ${day}`;

        // if(distanceWeeks > 0){
        //     return `${distanceWeeks} weeks ago`;
        // } else if (distanceDays > 0) {
        //     return `${distanceDays} days ago`;
        // } else if (distanceHours > 0) {
        //     return `${distanceHours} hours ago`;
        // } else if (distanceMinutes > 0) {
        //     return `${distanceMinutes} minutes ago`;
        // } else {
        //     return `${distanceSeconds} seconds ago`;
        // }
    }
}

// --------------------------------------------------------------------
// Logic input color
let inputBorderColor1 = document.querySelectorAll(".border-color");
let inputBorderColor2 = document.querySelector(".form-container form");
let btnSubmit = document.querySelector(".btn-submit");
let p = document.querySelector(".img-upload p")
let imgUpload = document.querySelector(".img-upload label img")

inputBorderColor1.forEach(function(ibc1) {
    ibc1.addEventListener('click', function(event) {
        
        inputBorderColor1.forEach(function(ibc1) {
            if(ibc1.classList.contains("input-color")){
                ibc1.classList.remove("input-color");
            }
        });    
        event.target.classList.add("input-color");
        p.classList.remove("input-color");
        imgUpload.classList.remove("input-color");  
    });
 
    btnSubmit.addEventListener('mouseover', function() {
        inputBorderColor1.forEach(function(ibc1) {
            ibc1.classList.remove("input-color");
        }); 
    });  
});

inputBorderColor2.addEventListener('mouseenter', function(){
    inputBorderColor1.forEach(function(ibc1){
        ibc1.classList.add("input-border");
    });
    
    inputBorderColor2.addEventListener('mouseleave', function(){
        inputBorderColor1.forEach(function(ibc1){
            ibc1.classList.remove("input-border");
        });
    });
});
// End logic input color

// Logic navbar color
// let navbar = document.querySelectorAll(".nav-link");

// navbar.forEach(function(nav) {
//     nav.addEventListener("click", function(event) {
//         navbar.forEach(function(nav){
//             if(nav.classList.contains("active")){
//                 nav.classList.remove("active");
//             }
//         });
//         // event.preventDefault();
//         event.target.classList.add("active");
//     });
// });
// End logic navbar color





