
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
  
  //Button for adding Train schedules
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val();
    var destination = $("#destination-input").val();
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
    
    //alert user success
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
  });
  
  // Listen for record being added to database
  database.ref().on("child_added", function(childSnapshot) {
      
    // Set local variables
    var TrainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().firstTrainTime;
    var frequency = childSnapshot.val().frequency;
  
    //-----------------------Calculate  -------------------------------

    //first train start time using military time - subtracting a year was recommended by class activity
    var firstTimeConverted = moment(firstTrainTime, "kk:mm").subtract(1, "years");

    //calculate the difference between now and the first train start time
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    //% to get remainder between the time differential and the frequency that the train arrives
    var remainder = diffTime % frequency;

    //calculate minutes away by frequency minus remainder
    var minAway = frequency - remainder;

    //calciulate next arrival by adding minAway to current time
    var nextArrival = moment().add(minAway, "minutes").format("kk:mm");
  
    // Create the new row for the added train
    var newRow = $("<tr>").append(
      $("<td>").text(TrainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(nextArrival),
      $("<td>").text(minAway),
    );
  
    // Append the new row to the train table
    $("#train-table > tbody").append(newRow);
  });
  