let data = [];

// add data
function addProject(event) {
  event.preventDefault();

  let projectName = document.getElementById("project-name").value;
  let startDate = document.getElementById("start-date").value;
  let endDate = document.getElementById("end-date").value;
  let desc = document.getElementById("desc").value;
  let img = document.getElementById("image").value;
  let image = document.getElementById("image").files; // Untuk menangkap image, pdf, dll. Ini akan mengambil seluruh data files, tapi yang dibutuhkan adalah url/path-nya

  console.log("Img Value :", img);
  console.log("Img Files[0] :", image[0]);

  // Logic input data
  if (
    projectName == "" ||
    startDate == "" ||
    endDate == "" ||
    desc == "" ||
    img == ""
  ) {
    return alert("All input field must be not empty");
  } else {
    alert("New Card Created Successfully");
  }

  // End logic input data
  let getImage = URL.createObjectURL(image[0]); // fungsi URL.createObjectURL untuk menangkap url gambar / path. Posisi dibawah kondisi karena, jika diatas kondisi akan error karena gambar belum ada gambar yang di inputkan
  // console.log("URL Gambar :", getImage)[0];

  // Logic get all checked
  let result = [];
  let checkboxes = document.getElementsByName("mycheckbox");

  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked == true) {
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
  };

  data.push(blog);
  getBlog();
}

// edit data
function editProject(id) {
  // Find the project by id
  const project = data.find(item => item.id === id);

  if (!project) return;

  // Populate the form with the project data
  document.getElementById("project-name").value = project.title;
  document.getElementById("start-date").value = project.startDate;
  document.getElementById("end-date").value = project.endDate;
  document.getElementById("desc").value = project.desc;

  // Set the checkboxes
  let checkboxes = document.getElementsByName("mycheckbox");
  for (let checkbox of checkboxes) {
    checkbox.checked = project.tech.includes(checkbox.value);
  }

  // Handle file input (image)
  // Note: File input cannot be pre-filled for security reasons, need to re-upload

  // Change the form submission to update the existing project
  document.getElementById("form-project").onsubmit = function(event) {
    event.preventDefault();
    updateProject(id);
  };
}

// update data
function updateProject(id) {
  const projectIndex = data.findIndex((item) => item.id === id);
  if (projectIndex === -1) return;

  let projectName = document.getElementById("project-name").value;
  let startDate = document.getElementById("start-date").value;
  let endDate = document.getElementById("end-date").value;
  let desc = document.getElementById("desc").value;
  let img = document.getElementById("image").value;
  let image = document.getElementById("image").files;

  if (projectName == "" || startDate == "" || endDate == "" || desc == "") {
    return alert("All input fields must not be empty");
  }

  let getImage = image.length
    ? URL.createObjectURL(image[0])
    : data[projectIndex].image;

  let result = [];
  let checkboxes = document.getElementsByName("mycheckbox");
  for (let checkbox of checkboxes) {
    if (checkbox.checked) {
      result.push(checkbox.value);
    }
  }

  data[projectIndex] = {
    id: id,
    title: projectName,
    startDate: startDate,
    endDate: endDate,
    tech: result,
    desc: desc,
    image: getImage,
  };

  document.getElementById("form-project").reset();
  document.getElementById("form-project").onsubmit = addProject;

  getBlog();
}

// delete data
function deleteProject(id) {
  data = data.filter((item) => item.id !== id);
  getBlog();
}

// Funvtion add data to card
function getBlog() {
  let cardContainer = document.getElementById("card-container");
  let form = document.getElementById("form-project");

  cardContainer.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    cardContainer.innerHTML += `<div class="cards">
                                        <img src="${data[i].image}">
                                        <h3><a href="blog.html?${data[i].id}">${
      data[i].title
    } - ${renderTime(data[i].startDate)}</a></h3>
                                        <p class="date">durasi: ${getDistanceTime(
                                          data[i].startDate,
                                          data[i].endDate
                                        )}</p>
                                        <p class="desc">${data[i].desc}</p>
                                        <div class="icons">
                                            ${
                                              data[i].tech.includes("node")
                                                ? '<img src="img/node.png"/>'
                                                : ""
                                            }
                                            ${
                                              data[i].tech.includes("angular")
                                                ? '<img src="img/angular.png"/>'
                                                : ""
                                            }
                                            ${
                                              data[i].tech.includes("react")
                                                ? '<img src="img/react.png"/>'
                                                : ""
                                            }
                                            ${
                                              data[i].tech.includes(
                                                "typescript"
                                              )
                                                ? '<img src="img/typescript.png"/>'
                                                : ""
                                            }
                                        </div>
                                        <div>
                                            <button type="button" class="edit btn-edit" onclick="editProject(${
                                              data[i].id
                                            })">Edit</button>
                                            <button type="button" class="delete btn-delete" onclick="deleteProject(${
                                              data[i].id
                                            })">Delete</button>
                                        </div>
                                    </div>`;
  }
  form.reset();
}

// Function Validation file
function fileValidation() {
  let cardContainer = document.getElementsByClassName("cards");
  let image = document.getElementById("image");
  let imageValue = image.value;
  let imageSize = image.files[0].size / 1000; //image.files[0].size untuk mengetahui ukuran file, lalu konversi dengan / 1000 agar nilai menjadi normal

  // Ekstensi file valid
  var extensionFileValid = /(\.jpg|\.jpeg|\.png|\.gif)/i; // Ekstensi file yang valid. i berfungsi untuk membaca ekstensi file dengan hruruf besar / kecil (png / PNG)

  if (!extensionFileValid.exec(imageValue)) {
    // jika imageValue yang dipanggil exec() tidak sama dengan ekstensi file
    alert("File extension must be (jpg, jpeg, png)");
    image.value = "";
    return false;
  } else if (imageSize > 2000) {
    alert("File exceeds size limit (maksimum file 2MB)");
    image.value = "";
    return false;
  } else {
    // Tampilkan file ke dalam card
    if (image.files == true && image.files[0] == true) {
      // jika image.file dan image.files[0] ada / telah lolos seleksi dari kondisi diatas
      var reader = new FileReader();
      // reader.onload = function(event) {
      //     cardContainer.innerHTML ='<img src="' + event.target.result + '"/>';
      // };
      reader.onload = function () {
        cardContainer.innerHTML = '<img src="' + result + '"/>';
      };
      reader.readAsDataURL(image.files[0]); // image.files[0] akan dibaca dengan reader dengan method readAsDataURL()
    }
  }
}

// Function render time
function renderTime(time) {
  // let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Des"];
  let date = new Date(time);
  let day = date.getDate();

  if (day < 10) {
    day = "0" + day;
  }
  return `${date.getFullYear()}`;
  // return `${day} ${months[date.getMonth()]} ${date.getFullYear()}`
}

// function distance start date - end date
function getDistanceTime(startDate, endDate) {
  let start = new Date(startDate);
  let end = new Date(endDate);

  let duration = end - start;

  if (duration < 0) {
    // alert("Start date must be greater than End date");
    return "-";
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
    if (year == 0) {
      year = "";
    } else {
      year += " year";
    }

    if (month == 0) {
      month = "";
    } else {
      month += " month";
    }

    if (day == 0) {
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
let label = document.querySelector("label.border-color");
let p = document.querySelector(".img-upload p");
let imgUpload = document.querySelector(".img-upload label img");

inputBorderColor1.forEach(function (ibc1) {
  ibc1.addEventListener("click", function (event) {
    inputBorderColor1.forEach(function (ibc1) {
      if (ibc1.classList.contains("violet-border")) {
        ibc1.classList.remove("violet-border");
      }
    });
    event.target.classList.add("violet-border");
    p.classList.remove("violet-border");
    imgUpload.classList.remove("violet-border");
  });

  btnSubmit.addEventListener("mouseover", function () {
    inputBorderColor1.forEach(function (ibc1) {
      ibc1.classList.remove("violet-border");
    });
  });
});

inputBorderColor2.addEventListener("mouseenter", function () {
  label.style.border = "1px solid black";
  inputBorderColor1.forEach(function (ibc1) {
    ibc1.classList.add("black-border");
  });

  inputBorderColor2.addEventListener("mouseleave", function () {
    label.style.border = "2px solid white";
    inputBorderColor1.forEach(function (ibc1) {
      ibc1.classList.remove("black-border");
      ibc1.classList.remove("violet-border");
    });
  });
});
// End logic input color

// Logic slide navbar
const slide = document.querySelector(".slide");
const menuToggle = document.querySelector(".menu-toggle input");
const nav = document.querySelector(".navbar ul");

menuToggle.addEventListener("click", function () {
  nav.classList.toggle("slide");
});
// End logic end navbar

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
