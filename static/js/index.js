const loader = document.querySelector("#loader")
function displayLoading() {
  loader.classList.add("display");
}
function hideLoading() {
  loader.classList.remove("display")
}

const dmodals = document.getElementById("hsmodals")
function displayModals(){
  dmodals.classList.remove("display-modals")
}
function hideModals(){
  dmodals.classList.add("display-modals")
}

function loadTable() {
  displayLoading()
  fetch("http://localhost:1337/api/kols")
    .then((response) => {
      return response.json();
    })
    .then((jsondata) => {
      let dataInfluencer = jsondata.data;
      // console.log(dataInfluencer.length)
      console.log(dataInfluencer.length)
      let sort = dataInfluencer.reverse()
      // console.log(dataInfluencer)
      // for (let dateSort of dataInfluencer) {
      //   var dateUpt = dateSort.attributes['updatedAt']
      //   var split = dateUpt.split('T')[0]
      //   console.log(split)
      // }
      // console.log(sort[0].id)
      $(document).ready(function () {
        $("#tableInfluencer").DataTable({
        //   lengthMenu: [
        //     [10, 25, 50, -1],
        //     [10, 25, 50, 'All'],
        // ],
          data: sort,
          scrolly: true,
          responsive: true,
          pagingType: 'full_numbers',
          columns: [
            {
              data: "attributes.profilePict", render: function (data) {
                return '<img src="' + data + '">'
              }
            },
            {
              data: "attributes.username", render: function (data) {
                return '<a target="__blank" href="https://instagram.com/' + data + '">' + data + '</a>'
              }
            },
            {
              data: "attributes.followers", render: function (data) {
                return data.toLocaleString()
              }
            },
            {
              data: "attributes.verified", render: function (data) {
                if (data === false) {
                  return '<p>-</p>'
                } else
                  return '<p>Verified <i class="fas fa-check-circle text-primary"></i></p>'
              }
            },
            {
              data: "attributes.tier",
            },
            {
              data: "attributes.gender",
            },
            {
              data: "attributes.category", render: function (data) {
                let catColor;
                if (data === "Automotive") {
                  catColor = "automotive"
                } else if (data === "Beauty") {
                  catColor = "beauty"
                } else if (data === "Culinary") {
                  catColor = "culinary"
                } else if (data === "Education") {
                  catColor = "education"
                } else if (data === "Entrepreneur") {
                  catColor = "enterpreneur"
                } else if (data === "Event") {
                  catColor = "event"
                } else if (data === "Family") {
                  catColor = "family"
                } else if (data === "Fashion") {
                  catColor = "fashion"
                } else if (data === "Financial Planning") {
                  catColor = "finance"
                } else if (data === "Games") {
                  catColor = "games"
                } else if (data === "Health") {
                  catColor = "health"
                } else if (data === "Kids") {
                  catColor = "kids"
                } else if (data === "Lifestyle") {
                  catColor = "lifestyle"
                } else if (data === "Movie") {
                  catColor = "movie"
                } else if (data === "Music") {
                  catColor = "music"
                } else if (data === "Relationship") {
                  catColor = "relationship"
                } else if (data === "Sport") {
                  catColor = "sport"
                } else if (data === "Technology") {
                  catColor = "technology"
                } else if (data === "Travel") {
                  catColor = "travel"
                }else if (data === "Culture") {
                  catColor = "culture"
                }
                return '<p class="badge" id="' + catColor + '">' + data + '</p>'
              }
            },
            // {
            //   data: "attributes.rc",
            // },
            {
              data: "attributes.updatedAt", render: function (data) {
                return data.split('T')[0]
              }
            },
            {
              data: "id", render: function (data, type) {
                return type === 'display' ?
                '<a class="btn btn-outline-success mx-1" type="button" data-bs-toggle="modal" data-bs-target="#viewModals" onClick="onView(' + data + ')""><i class="fas fa-eye"></i></a>' +
                '<a class="btn btn-outline-danger mx-1" type="button" onClick="userDelete(' + data + ')"><i class="fas fa-trash"></i></a>': data
              }
            },
            // {
            //   data: "id", render:function(data,type){
            //     return type === 'display'?
            //     '<a class="btn btn-outline-secondary" type="button" onClick="showUserEditBox('+data+')"">Edit</a>' :data
            //   }
            // },
          ],
          paging: true,
        });
        hideLoading()
      });
    });
}

loadTable()

// Form Alert
function required() {
  var empt = document.forms["form1"]["username"].value;
  if (empt == "") {
    alert("Please input a Value");
    return false;
  }
  else {
    alert('Code has accepted : you can try another');
    return true;
  }
}

// Create Data
function userCreate() {
  const profilepict = document.getElementById("profilepict").value;
  const verified = document.getElementById("verified").value;
  const username = document.getElementById("username").value;
  const category = document.getElementById("category").value;
  const followers = document.getElementById("followers").value;
  const er = document.getElementById("er").value;
  const contact = document.getElementById("contact").value;
  const ratecard = document.getElementById("ratecard").value;
  const tier = document.getElementById("tier").value;
  const gender = document.getElementById("gender").value;
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:1337/api/kols/");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify(
    {
      "data":
      {
        "profilePict": profilepict, "username": username, "verified": verified, "category": category, "followers": followers, "er": er,
        "cp": contact, "rc": ratecard, "tier": tier, "gender": gender
      }
    }
  ));
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      // loadTable();
      $('#staticBackdrop').modal('hide')
      // alert(objects.data.attributes.username)
      // Swal.fire("test")
      location.reload()
      // Swal.fire(objects.data.attributes.username + "<br>" + " Success Created");
    } else {
      document.getElementById("alert-warning").style.display = "block"
    }
  };
}

// // Before Delete
// function viewDelete(id) {
//   console.log(id)
//   const xhttp = new XMLHttpRequest();
//   xhttp.open("GET", "http://localhost:1337/api/kols/" + id);
//   xhttp.send();
//   xhttp.onreadystatechange = function () {
//     if (this.readyState == 4 && this.status == 200) {
//       const objects = JSON.parse(this.responseText)
//       console.log(objects)
//     }
//   }
// }

// On Delete
function userDelete(id) {
  Swal.fire({
    title: 'Do you want to delete this data?',
    showConfirmButton: false,
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Save',
    denyButtonText: `Delete`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isDenied) {
      const xhttp = new XMLHttpRequest();
      // var result = confirm("Are you sure to delete?");
      if (result) {
        xhttp.open("DELETE", "http://localhost:1337/api/kols/" + id);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.send(JSON.stringify(
          {
            "data":
            {
              "id": id
            }
          }
        ));
        xhttp.onreadystatechange = function () {
          if (this.status === 200) {
            // const objects = JSON.parse(this.responseText);
            // Swal.fire("deleted");
            location.reload()
            // location.reload();
            console.log(this.status)
          }
        };
      }
    }
  })
}

// Before Edit
function onView(id) {
  hideModals()
  // console.log(id)
  // console.log(id)
  // console.log(catColor)
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:1337/api/kols/" + id);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      let user = objects.data;
      displayModals()
      // console.log(user);
      document.getElementById("v_profile").src = user.attributes.profilePict
      document.getElementById("e_display").innerHTML = user.attributes.username
      document.getElementById("e_display").href = "https://instagram.com/" + user.attributes.username
      document.getElementById("show_ratecard").href = user.attributes.rc
      document.getElementById("show_contact").innerHTML = user.attributes.cp
      document.getElementById("e_category").innerHTML = user.attributes.category
      document.getElementById("d_create").innerHTML = user.attributes.createdAt.split('T')[0]
      document.getElementById("d_update").innerHTML = user.attributes.updatedAt.split('T')[0]
      let id = document.getElementById("e_id").defaultValue = user.id
      const username = document.getElementById("e_username").defaultValue = user.attributes.username
      const tier = document.getElementById("e_tier").defaultValue = user.attributes.tier
      const er = document.getElementById("e_er").defaultValue = user.attributes.er
      const category = document.getElementById("e_category").defaultValue = user.attributes.category
      const followers = document.getElementById("e_followers").defaultValue = user.attributes.followers
      const contact = document.getElementById("e_contact").defaultValue = user.attributes.cp
      const ratecard = document.getElementById("e_rateCard").defaultValue = user.attributes.rc
      const verified = document.getElementById("e_verified").defaultValue = user.attributes.verified
      const profilePict = document.getElementById("e_profilePict").defaultValue = user.attributes.profilePict
      console.log(id)
      preConfirm: () => {
        editData();
        viewDelete(id)
      }
    };
  }
}

// On Edit
function editData() {
  const id = document.getElementById("e_id").value
  const username = document.getElementById("e_username").value
  const tier = document.getElementById("e_tier").value
  const er = document.getElementById("e_er").value
  const category = document.getElementById("e_category").value
  const followers = document.getElementById("e_followers").value
  const contact = document.getElementById("e_contact").value
  const ratecard = document.getElementById("e_rateCard").value
  const verified = document.getElementById("e_verified").value
  const profilePict = document.getElementById("e_profilePict").value
  const xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "http://localhost:1337/api/kols/" + id);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify(
    {
      "data":
      {
        "id": id, "username": username, "tier": tier, "er": er, "category": category, "followers": followers,
        "cp": contact, "rc": ratecard, "verified": verified, "profilePict": profilePict,
      }
    }
  ));
  // console.log(JSON.stringify) 
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      // document.getElementById('loader').style.display = "block !important"
      location.reload()
      console.log("Success")
    }
  };
}

// Overview
function manipulate() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:1337/api/kols/");
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText).data
      document.getElementById("total-talent").innerHTML = objects.length

      let [Male, Female] = [0, 0]
      let
        [
          Automotive, Beauty, Culinary, Education, Enterpreneur, Event, Family, Fashion, Financial, Games, Health,
          Kids, Lifestyle, Movie, Music, Relationship, Sport, Technology, Travel
        ] =
          [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
      for (let i = 0; i < objects.length; i++) {
        if (objects[i].attributes.gender === "Male") Male++;
        else if (objects[i].attributes.gender === "Female") Female++
        if (objects[i].attributes.category === "Automotive") Automotive++;
        else if (objects[i].attributes.category === "Beauty") Beauty++;
        else if (objects[i].attributes.category === "Culinary") Culinary++;
        else if (objects[i].attributes.category === "Education") Education++;
        else if (objects[i].attributes.category === "Enterpreneur") Enterpreneur++;
        else if (objects[i].attributes.category === "Event") Event++;
        else if (objects[i].attributes.category === "Family") Family++;
        else if (objects[i].attributes.category === "Fashion") Fashion++;
        else if (objects[i].attributes.category === "Financial Planning") Financial++;
        else if (objects[i].attributes.category === "Games") Games++;
        else if (objects[i].attributes.category === "Health") Health++;
        else if (objects[i].attributes.category === "Kids") Kids++;
        else if (objects[i].attributes.category === "Lifestyle") Lifestyle++;
        else if (objects[i].attributes.category === "Movie") Movie++;
        else if (objects[i].attributes.category === "Music") Music++;
        else if (objects[i].attributes.category === "Relationship") Relationship++;
        else if (objects[i].attributes.category === "Sport") Sport++;
        else if (objects[i].attributes.category === "Technology") Technology++;
        else if (objects[i].attributes.category === "Travel") Travel++;
      }
      const chartJson =
        [
          { "name": "Automovite", "value": Automotive },
          { "name": "Beauty", "value": Beauty },
          { "name": "Culinary", "value": Culinary },
          { "name": "Education", "value": Education },
          { "name": "Enterpreneur", "value": Enterpreneur },
          { "name": "Event", "value": Event },
          { "name": "Family", "value": Family },
          { "name": "Fashion", "value": Fashion },
          { "name": "Financial Planning", "value": Financial },
          { "name": "Games", "value": Games },
          { "name": "Health", "value": Beauty },
          { "name": "Kids", "value": Kids },
          { "name": "Lifestyle", "value": Lifestyle },
          { "name": "Movie", "value": Movie },
          { "name": "Music", "value": Music },
          { "name": "Relationship", "value": Relationship },
          { "name": "Sport", "value": Sport },
          { "name": "Technology", "value": Technology },
          { "name": "Travel", "value": Travel },
        ]
      // console.log(chartJson)
      // Chart Category
      const chartCategory = new Chart(document.getElementById("myChart"), configCategory)
      $(document).ready(function () {
        const cName = chartJson.map(function (index) {
          return index.name
        })
        const cValue = chartJson.map(function (index) {
          return index.value
        })
        chartCategory.config.data.labels = cName;
        chartCategory.config.data.datasets[0].data = cValue
        chartCategory.update()
      })

      document.getElementById("count_male").innerHTML = Male,
        document.getElementById("count_female").innerHTML = Female
      let countCat = 0
      var int = [Automotive, Beauty, Culinary, Education, Enterpreneur, Event, Family, Fashion, Financial, Games, Health,
        Kids, Lifestyle, Movie, Music, Relationship, Sport, Technology, Travel]
      for (let ints of int) {
        if (ints > 0) {
          countCat++
        }
      }
      // End Chart Category
      // console.log(countCat)
      document.getElementById("total-category").innerHTML = countCat
      // console.log(Automotive + B)
      var total = Automotive + Beauty + Culinary + Education + Enterpreneur + Event + Family + Fashion + Financial + Games + Health + Kids + Lifestyle + Movie + Music + Relationship + Sport + Technology + Travel
    }
  }
}

manipulate()

const dataCategory = {
  labels: [
    "Lifestyle",
    "Fashion",
    "Beauty",
    "Education",
    "Travel",
    "Games",
    "Event",
    "Music",
    "Movie",
    "Family",
    "Health",
    "Automotive",
    "Financial Planning",
    "Kids",
    "Relationship",
    "Culture",
    "Technology",
    "Enterpreneur",
    "Culinary",
    "Sports",
  ],
  datasets: [
    {
      label: "Category Overview",
      // data: [
      //   60, 179, 196, 432, 445, 212, 135, 121, 100, 109, 112, 209, 405, 361,
      //   250, 310, 293, 277, 87, 387,
      // ],
      backgroundColor: ["rgb(77, 114, 222)"],
      fill: true,
      borderColor: "rgb(77, 114, 222)",
      tension: 0.1,
      hoverOffset: 4,
      skipNull: true,
    },
  ],
};
const configCategory = {
  type: "bar",
  data: dataCategory,
  options: {},
}


const tier = {
  labels: [
    "Lifestyle",
    "Fashion",
    "Beauty",
    "Education",
    "Travel",
    "Games",
    "Event",
    "Music",
    "Movie",
    "Family",
    "Health",
    "Automotive",
    "Financial Planning",
    "Kids",
    "Relationship",
    "Culture",
    "Technology",
    "Enterpreneur",
    "Culinary",
    "Sports",
  ],
  datasets: [
    {
      label: "Tier Influecer Overview",
      data: [
        54, 34, 27, 18, 7, 16, 3, 74, 93, 64, 81, 100, 56, 78, 36, 38, 84, 10, 52, 6
      ],
      backgroundColor: [
        'rgb(186, 144, 218)',
        ' rgb(4, 191, 243)',
        ' rgb(211, 15, 212)', //Beauty
        'rgb(206, 243, 19)', // Education
        'rgb(245, 126, 18)', //Travel
        'rgb(37, 101, 44)', //Games
        ' rgb(133, 87, 116)', //Event
        ' rgb(90, 231, 160)', //Music
        ' rgb(27, 137, 167)',//Movie
        'rgb(248, 154, 106)', //Family
        'rgb(45, 125, 115)', //Health
        'rgb(170, 22, 228)', //Automotive
        'rgb(32, 212, 47)', //Finance
        'rgb(130, 154, 208)', //Kids
        'rgb(53, 184, 199)', //Relationship
        'rgb(41, 145, 75)', //Culture
        'rgb(88, 201, 6)', //Technology
        'rgb(198, 165, 213)', //Enterpreneur
        'rgb(241, 137, 58)', //Culinary
        'rgb(253, 108, 211)', //Sport
      ],
      hoverOffset: 4,
    },
  ]
}

const configtier = {
  type: "doughnut",
  data: tier,
  options: {
    plugins: {
      legend: {
        position: 'top',
        display: false
      },
      title: {
        display: true,
        text: 'Tier Influencer Overview'
      }
    }
  },
}

const tierChart = new Chart(
  document.getElementById("chartTier"),
  configtier,
)
// End Chart Tier

function converTier(val) {
  let followers = val
  let tier;
  if (followers > 1000000) {
    tier = "Mega"
  } else if (followers > 500000 && followers <= 1000000) {
    tier = "Macro"
  } else if (followers > 50000 && followers <= 500000) {
    tier = "Mid-Tier"
  } else if (followers > 10000 && followers <= 50000) {
    tier = "Micro"
  } else {
    tier = "Nano"
  }
  document.getElementById("tier").value = tier
}

$(function () {
  $('input:radio[name="radios"]').change(function () {
    if ($(this).val() == '1') {
      return document.getElementById("verified").value = 1
    } else {
      return document.getElementById("verified").value = 0
    }
  });
});


// Multiple Post
function newF(){

// for (let i = 0; i < test.length; i++) {
//   const xhttp = new XMLHttpRequest();
// xhttp.open("POST", "http://localhost:1337/api/kols/");
// xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
// xhttp.send(JSON.stringify(
//   {
//     "data":
//     test[i]
//   }
// ));
// console.log("success")
// }
console.log(test.length)
}


// newF()