

var startdateEl = document.getElementById("startdate");
var enddateEl = document.getElementById("enddate");
var submitEl = document.getElementById("submit");



function onclickstarts(event){
    console.log('click')
    if(startdateEl.value == "" || enddateEl.value == ""){
        console.log("error")
        onthespots()
    }
    else{
        var aaa = startdateEl.value
        var bbb = enddateEl.value
        onthespot( aaa,bbb)
    }
    
}

let enme = ""
let astname = []
let astfast = []
let astavgsz = []
let astclose = []
let astcnt=0

function onthespot(a,b){
    console.log("success")

    let url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${a}&end_date=${b}&api_key=DEMO_KEY`   
    let options = {
            method: "GET"
        };

        fetch(url, options)
            .then(function(response) {
               let ressts = response.status
               console.log(ressts)
               let msg = response.data
               console.log(msg)
               if(ressts == "429"){
                errOvr()
               }
               else if(ressts > "200"){
                errorCont()
               }
               
                return response.json();
                
            })
            .then(function(jsonData) {
                
                 let aa = jsonData.near_earth_objects
                
                astcnt = jsonData.element_count
                for (let i in aa){
                  console.log(i)
                  enme = i
                  let rr = String(enme)
                  let bb =jsonData.near_earth_objects[rr]
                  for(let j in bb){
                    let yy = jsonData.near_earth_objects[rr][j].name
                    let clsast =aa[rr][j].close_approach_data[0].miss_distance.kilometers
                    let fastast = jsonData.near_earth_objects[rr][j].estimated_diameter.feet.estimated_diameter_max
                    let avgast = jsonData.near_earth_objects[rr][j].absolute_magnitude_h
                  
                    astavgsz.push(avgast * 100)
                    astfast.push(fastast)
                    astclose.push(clsast / 10000)
                    astname.push(yy)
                    
                  }
                  
                }
            })
            .then(function(response){
                showndatain()
            })
            .catch(function(error){
                console.log(error)
            });

}



function onthespots(event){
  console.log("error")
  let parEl = document.getElementById("parae");
  parEl.textContent="Enter Date Properly"
}


function errorCont(){
  var paraEl = document.getElementById("para");
  paraEl.textContent="Enter only 7 days difference in Start and End dates"
  var divEl = document.getElementById("div");
  divEl.classList.add("mr")
}

function errOvr(){
  var paraEl = document.getElementById("para");
  paraEl.textContent="You have exceeded your rate limit. Try again later... "
  var divEl = document.getElementById("div");
  divEl.classList.add("mr")

}



function showndatain(){
  var myChart = document.getElementById("myChart");
 //setup
 const labels = astname;
 const data = {
  labels: labels,
  datasets: [
    {
      label: 'Average Asteroids',
      data: astavgsz,
      borderColor: "red",
      backgroundColor: ("red", 2.5),
      borderWidth: 2,
      borderRadius: 5,
      borderSkipped: false,
      Headers:"red",
    },
    {
      label: 'Fast Asteroids',
      data: astfast,
      borderColor: "blue",
      backgroundColor: ("blue", 2.5),
      borderWidth: 2,
      borderRadius: 5,
      borderSkipped: false,
    },
    {
      label: 'Closest Asteroids',
      data: astclose,
      borderColor: "green",
      backgroundColor: ("green", 0.5),
      borderWidth: 2,
      borderRadius: 5,
      borderSkipped: false,
    }
  ]
};

 //config
 const config = {
   type: 'bar',
   data: data,
   options: {
     responsive: true,
     plugins: {
       legend: {
         position: 'top',
         innerHeight:"1px",
       },
       title: {
         display: true,
         text: ' Asteroid Data'
       }
     }
   },
 };
 
 var chchc = new Chart(myChart,config);
}


