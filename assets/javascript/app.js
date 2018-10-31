// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyBgbCLijbugaJGfGYLPJP-dyXlm_NqKspc",
    authDomain: "kevin-obrien-project-23955.firebaseapp.com",
    databaseURL: "https://kevin-obrien-project-23955.firebaseio.com",
    projectId: "kevin-obrien-project-23955",
    storageBucket: "kevin-obrien-project-23955.appspot.com",
    messagingSenderId: "285802607552"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // 2. Button for adding Employees
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val()
    var destination = $("#destination-input").val()
    var firstTrainTime =$("#first-train-input").val();
    var frequency = $("#frequency-input").val();
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      destination: destination,
      firstTrainTime: firstTrainTime,
      frequency: frequency
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    // // Logs everything to console
    // console.log(newTrain.name);
    // console.log(newTrain.destination);
    // console.log(newTrain.firstTrainTime);
    // console.log(newTrain.frequency);
  
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var TrainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().firstTrainTime;
    var frequency = childSnapshot.val().frequency;
  
 
    // calculate next arrival
    // var nextArrive = moment.unix(empStart).format("MM/DD/YYYY");
  
    //current time - first train time 
    // var frequency = frequency;
    // var firstTime=firstTrainTime;

    var firstTimeConverted = moment(firstTrainTime, "kk:mm").subtract(1, "years");

    // var currentTime = moment();

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    //% to get remainder
    var remainder = diffTime % frequency;

    var minAway = frequency - remainder;

    var nextArrival = moment().add(minAway, "minutes").format("kk:mm");
    //add to current time

    // Calculate the months worked using hardcore math
    // To calculate the months worked
    // var empMonths = moment().diff(moment(empStart, "X"), "months");
    // console.log(empMonths);
  
    // Calculate the minutes away
    // var minAway = empMonths * empRate;
    // console.log(empBilled);
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(TrainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(nextArrival),
      $("<td>").text(minAway),
    //   $("<td>").text(empBilled)
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
  
  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case
  