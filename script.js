//fires when the entire page loads 
window.onload = initMap;
//Oviat north: north: 34.240428, south: 34.239782255611118, east: -118.528577, west: -118.530050,
//SRC north: 34.240544532538564, south: 34.239460248484, east: -118.52467241269989, west: -118.5251900790201,
//Chaparral hall  north: 34.2386087763517, south: 34.237908079297874, east: -118.52671893818422, west: -118.52725537996686,
//Addie Klotz Student Health Center north: 34.23840019169156, south: 34.23807645183619, east: -118.52599994599838, west: -118.52665976939102
const mapClick = document.getElementById("map");
const question1 = document.getElementById("ques1");
const answer_score = document.getElementById("score");
const question2 = document.getElementById("Q2");
const question3 = document.getElementById("Q3");
const question4 = document.getElementById("Q4");
const question5 = document.getElementById("Q5");
const latlongdisplay = document.getElementById("latlong");


//variables for question number and number of correct
var qNum = 1;
var correct = 0;


//timer variables 
var minutes = 0;
var seconds = 0;
var hund = 0;
var timer = 0;
var time;
var timerStart = false;
const theTimer = document.querySelector(".timer");


let map;

//function for creating our google map
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 34.23909679518696, lng: -118.52873992993582},
    zoom: 17,
    //satellite displays Google Earth satellite images.
    mapTypeId: 'satellite',
    //disable gestures on the map.
    gestureHandling: "none",
    //disables zooming in and out with the +/- buttons on the map
    zoomControl: false,
    //turn off the API's default UI buttons entirely
    disableDefaultUI: true,
  });
  
  //function to get lat/long when user doubleclicks with their mmouse 
  function dbclick(answer) {
    if(!timerStart) {
      startTimer();
    }
    //if the question number is less than 6 
    if(qNum < 6){
      //gets lat and long when user double clicks
      //https://developers.google.com/maps/documentation/javascript/reference/coordinates
      var lat = answer.latLng.lat(); // latitude in degrees
      var long = answer.latLng.lng(); // longitude in degrees
      
      var array = [lat, long];
      latlongdisplay.innerHTML = "Lat: " + array[0] + " Long: " + array[1];
      
      //call the checkAnswer function
      checkAnswer(lat,long);
      qNum++;
      
    } //if qNum = 6  then display the users score in the html page 
    if(qNum == 6){
      //cancels the timer https://developer.mozilla.org/en-US/docs/Web/API/clearInterval
      clearInterval(time);
      //variable to hold the timer string when is stops
     var t = theTimer.innerHTML;
      //display our score and time 
      answer_score.innerHTML = "Score: " + correct + " out of 5 correct with a time of  " + t + "!";
    }
  }
  //event listener for double clicking 
  //https://developer.mozilla.org/en-US/docs/Web/API/Element/dblclick_event
  map.addListener("dblclick",dbclick);
}



//Oviatt 34.240428, 34.239769047365314, -118.528577, -118.530050
//if the question number equals to 1 & the users lat is less than or equal to the north of the oviatt rectangle bound
//& the users lat is greater than or equal to the south of the oviatt rectangle bound
//& the users long is less than or equal to the east rectangle border
//& the users long is greater than or equal to the west rectangle border
//then create the rectangle and make the inside green
function checkAnswer(lat, long){
  if(qNum == 1 && lat <= 34.240428 && lat >= 34.239769047365314 && long <= -118.528577 && long >= -118.530050){
    var oviat = new google.maps.Rectangle({
      //color LawnGreen line around the rectangle
      strokeColor: "#7CFC00",
      //specifies the width of the line in pixels.
      strokeWeight: 3,
      //fills the rectangle with the color LawnGreen
      fillColor: "#7CFC00",
      map: map,
      bounds: {
        north: 34.240428,
        south: 34.239769047365314,
        east: -118.528577,
        west: -118.530050,
      },
    });
    //users answer is correct so increment correct by 1
    correct ++;
    //make the text color of id "score" green 
    answer_score.style.color = 'green';
    //display "Correct!" on the html page
    answer_score.innerHTML = "Correct!";
    //display question 2 on the html page
    question2.innerHTML = "2.) Addie Klotz Student Health Center";
  }
  //else create the rectangle and color it red
  else if(qNum == 1){
    var oviat = new google.maps.Rectangle({
      //color FireBrick red line around the rectangle
      strokeColor: "#B22222",
      //specifies the width of the line in pixels.
      strokeWeight: 3,
      //fills the rectangle with the color FireBrick red
      fillColor: "#B22222",
      map: map,
      bounds: {
        north: 34.240428,
        south: 34.239769047365314,
        east: -118.528577,
        west: -118.530050,
      },
    });
    //make the text color of id "score" red
    answer_score.style.color = 'red';
    //display "Wrong!" on the html page
    answer_score.innerHTML = "Wrong!";
    //display question 2 on the html pagge
    question2.innerHTML = "2.) Addie Klotz Student Health Center";
  }
  
  //Klotz  34.23840019169156, 34.23807645183619, -118.52599994599838, -118.52665976939102
  //same thing as above if statement but with the bounds of the klotz center
   if(qNum == 2 && lat <= 34.23840019169156 && lat >= 34.23807645183619 && long <= -118.52599994599838 && long >= -118.52665976939102){
    var klotz = new google.maps.Rectangle({
      //color LawnGreen line around the rectangle
      strokeColor: "#7CFC00",
      //specifies the width of the line in pixels.
      strokeWeight: 3,
      //fills the rectangle with the color LawnGreen
      fillColor: "#7CFC00",
      map: map,
      bounds: {
        north: 34.23840019169156, 
        south: 34.23807645183619,
        east: -118.52599994599838,
        west: -118.52665976939102,
      },
    });
    correct++;
    answer_score.style.color = 'green';
    answer_score.innerHTML = "Correct!";
    question3.innerHTML = "3.) Student Recreation Center";
   }
  else if(qNum == 2){
    var klotz = new google.maps.Rectangle({
      //color red line around the rectangle
      strokeColor: "#B22222",
      //specifies the width of the line in pixels.
      strokeWeight: 3,
      //fills the rectangle with the color FireBrick red
      fillColor: "#B22222",
      map: map,
      bounds: {
        north: 34.23840019169156, 
        south: 34.23807645183619,
        east: -118.52599994599838,
        west: -118.52665976939102,
      },
    });
    answer_score.style.color = 'red';
    answer_score.innerHTML = "Wrong!";
    question3.innerHTML = "3.) Student Recreation Center";
  }
  
  //Src 34.240633421099226, 34.23932961909077, -118.52467241269989, -118.5251900790201
  //Same thing for the SRC bounds
  if(qNum == 3 && lat <= 34.240633421099226 && lat >= 34.23932961909077 && long <= -118.52467241269989 && long >= -118.5251900790201){
    var src = new google.maps.Rectangle({
      //color LawnGreen line around the rectangle
      strokeColor: "#7CFC00",
      //specifies the width of the line in pixels.
      strokeWeight: 3,
      //fills the rectangle with the color LawnGreen
      fillColor: "#7CFC00",
      map: map,
      bounds: {
        north: 34.240633421099226, 
        south: 34.23932961909077, 
        east: -118.52467241269989, 
        west: -118.5251900790201,
      },
    });
    correct++;
    answer_score.style.color = 'green';
    answer_score.innerHTML = "Correct!";
    question4.innerHTML = "4.) Chaparral Hall";
  }
  else if(qNum == 3){
    var src = new google.maps.Rectangle({
      //color red line around the rectangle
      strokeColor: "#B22222",
      //specifies the width of the line in pixels.
      strokeWeight: 3,
      //fills the rectangle with the color FireBrick red
      fillColor: "#B22222",
      map: map,
      bounds: {
        north: 34.240633421099226, 
        south: 34.23932961909077, 
        east: -118.52467241269989, 
        west: -118.5251900790201,
      },
    });
    answer_score.style.color = 'red';
    answer_score.innerHTML = "Wrong!";
    question4.innerHTML = "4.) Chaparral Hall";
  }
  
  //Chap 34.2386087763517, 34.237908079297874, -118.52671893818422, -118.52725537996686
  //same thing for chaparral hall
  if(qNum == 4 && lat <= 34.2386087763517 && lat >= 34.237908079297874 && long <= -118.52671893818422 && long >= -118.52725537996686){
    var chaparral = new google.maps.Rectangle({
     //color LawnGreen line around the rectangle
      strokeColor: "#7CFC00",
      //specifies the width of the line in pixels.
      strokeWeight: 3,
      //fills the rectangle with the color LawnGreen
      fillColor: "#7CFC00",
      map: map,
      bounds: {
        north: 34.2386087763517, 
        south: 34.237908079297874, 
        east: -118.52671893818422, 
        west: -118.52725537996686,
      },
    });
    correct++;
    answer_score.style.color = 'green';
    answer_score.innerHTML = "Correct!";
    question5.innerHTML = "5.) University Hall";
   }
  else if(qNum == 4){
    var chaparral = new google.maps.Rectangle({
       //color red line around the rectangle
      strokeColor: "#B22222",
      //specifies the width of the line in pixels.
      strokeWeight: 3,
      //fills the rectangle with the color FireBrick red
      fillColor: "#B22222",
      map: map,
      bounds: {
        north: 34.2386087763517, 
        south: 34.237908079297874, 
        east: -118.52671893818422, 
        west: -118.52725537996686,
      },
    });
    answer_score.style.color = 'red';
    answer_score.innerHTML = "Wrong!";
    question5.innerHTML = "5.) University Hall";
  }
  
  //University Hall 34.24019660533894, 34.23928305437003, -118.53195858066057, -118.53232336107277
  //Lastly for University Hall
  if(qNum == 5 && lat <= 34.24019660533894 && lat >= 34.23928305437003 && long <= -118.53195858066057 && long >= -118.5323233610727){
    var university = new google.maps.Rectangle({
      //color LawnGreen line around the rectangle
      strokeColor: "#7CFC00",
      //specifies the width of the line in pixels.
      strokeWeight: 3,
      //fills the rectangle with the color LawnGreen
      fillColor: "#7CFC00",
      map: map,
      bounds: {
        north: 34.24019660533894, 
        south: 34.23928305437003, 
        east: -118.53195858066057, 
        west: -118.53232336107277,
      },
    });
    correct++;
    answer_score.style.color = 'green';
    answer_score.innerHTML = "Correct!";
   }
  else if(qNum == 5){
    var university = new google.maps.Rectangle({
       //color red line around the rectangle
      strokeColor: "#B22222",
      //specifies the width of the line in pixels.
      strokeWeight: 3,
      //fills the rectangle with the color FireBrick red
      fillColor: "#B22222",
      map: map,
      bounds: {
        north: 34.24019660533894, 
        south: 34.23928305437003, 
        east: -118.53195858066057, 
        west: -118.53232336107277,
      },
    });
    answer_score.style.color = 'green';
    answer_score.innerHTML = "Wrong!";
  }
  
}

//
function ourTimer() {
  var stopwatch = zero(minutes) + ':'+ zero(seconds) + ':' + zero(hund);
  //hundredths timer
  hund = Math.floor((timer - seconds * 100) - minutes * 6000); //The Math.floor() function returns the largest integer less than or equal to a given number. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor
  //seconds timer
  seconds = Math.floor((timer / 100) - (minutes * 60));
  //minutes timer
  minutes = Math.floor((timer / 6000)); //minutes
  //increases timer by 1
  timer = timer + 1;
  //changes theTimer to the stopwatch on the webpaage
  theTimer.innerHTML = stopwatch;
  return stopwatch;
}

function zero(number) {
  //if the number is less than 10 then set number with a zero in the front
  if(number < 10) {
    number = '0' + number;
  }
  return number;
}

function startTimer() {
    timerStart = true;
    time = setInterval(ourTimer, 10); // calls ourTimer function in intervals of 10 miliseconds https://developer.mozilla.org/en-US/docs/Web/API/setInterval 
  
  
}

//


