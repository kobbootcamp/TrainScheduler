$(document).ready(function () {

    //show the start button to begin the game
    showStartButton();

    //variables
    var asked = [];  //questions that are asked are pushed into asked array
    var timer = 10;  //timer is set to 10 seconds
    var intervalId; //the interval variable
    var correctAnswerIs; //the correct letter choice
    var correctIndex; //index number of the correct answer
    var firstClick = true; //the first click is to start the game, the following click are to answer questions
    var allowClick = true; //sometimes we want to halt the clicking action

    //counters
    var numberCorrectAnswers = 0;
    var numberWrongAnswers = 0;

    //question object
    var question = {
        number: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        text: ["What was the first publicly traded U.S. company to reach a $1 trillion market cap?",
            "On the popular social website Reddit, what does AMA stand for?",
            "What do the letters CPU stand for when referring to the “brains” of a computer?",
            "On which popular website do users send tweets?",
            "The Connecticut Leather Company later became what toy company that was popular in the 1980s for its Cabbage Patch Kids and video game consoles?",
            "What does the acronym USB stand for when referring to a computer port?",
            "In 1975 an engineer created the first electronic camera while working for what company?",
            "Nintendo is a consumer electronics and video game company founded in what country?",
            "The first person shooter video game Doom was first released in what year?",
            "The companies HP, Microsoft and Apple were all started in a what?"],
        correctAnswer: ["B", "C", "A", "B", "D", "C", "D", "B", "B", "D"],
        choiceA: ["Walmart", "Advanced Measurement Approach", "Central Processing Unit",
            "FaceBook", "Mattel", "Uniform Serial Bandwidth", "Logitech", "USA", "1994", "Starbucks"],
        choiceB: ["Apple", "All Mods and Admins", "Central Policy Unit", "Twitter", "Fisher-Price",
            "Uniform Serial Bus", "Xerox", "Japan", "1993", "College campus"],
        choiceC: ["Intel", "Ask Me Anything", "Computer Power User", "Reddit", "Atari",
            "Universal Serial Bus", "Apple", "South Korea", "1990", "Dorm room"],
        choiceD: ["Microsoft", "American Medical Association", "Critical Patch Update",
            "SnapChat", "Coleco", "Uncommonly Swift Bandwidth", "Kodak", "Taiwan", "1997", "Garage"]


    };

    //wrong answer gif object
    var wrongAnswer = {
        gif: ["https://media.giphy.com/media/3o7qE1bQOcKqwBGUQ8/giphy.gif",
            "https://media.giphy.com/media/XQVEc2S7knPBm/giphy.gif",
            "https://media.giphy.com/media/xT39D14ZQGal0UwS1G/giphy.gif",
            "https://media.giphy.com/media/l396QUa4k8rFVK2xW/giphy.gif",
            "https://media.giphy.com/media/n5EiEUJjJ2hcQ/giphy.gif",
            "https://media.giphy.com/media/k5C3IjpVxFvJS/giphy.gif",
            "https://media.giphy.com/media/1zSz5MVw4zKg0/giphy.gif",
            "https://media.giphy.com/media/RddAJiGxTPQFa/giphy.gif",
            "https://media.giphy.com/media/TfS8MAR9ucLHW/giphy.gif",
            "https://media.giphy.com/media/wYyTHMm50f4Dm/giphy.gif",
            "https://media.giphy.com/media/4HcAjSnloKGut6CTxH/giphy.gif",
            "https://media.giphy.com/media/9J7i4fKvfqnRvpyNjM/giphy.gif",
            "https://media.giphy.com/media/gnE4FFhtFoLKM/giphy.gif",
            "https://media.giphy.com/media/w6etTIjCn7nExl9xI6/giphy.gif",
            "https://media.giphy.com/media/8GbvxxFHJDBa8/giphy.gif",
            "https://media.giphy.com/media/l0MYQLUe1kuJUUSHu/giphy.gif",
            "https://media.giphy.com/media/9Vb9gWFgb9a4zUXDSW/giphy.gif",
            "https://media.giphy.com/media/xT9DPBBQ4CM3bVTkek/giphy.gif",
            "https://media.giphy.com/media/rUQ3jVUsb5Hwc/giphy.gif",
            "https://media.giphy.com/media/PNug04TwLpA0i1d54D/giphy.gif"]
    };

    //correct answer gif object
    var rightAnswer = {
        gif: ["https://media.giphy.com/media/YTbZzCkRQCEJa/giphy.gif",
            "https://media.giphy.com/media/xUPGcMzwkOY01nj6hi/giphy.gif",
            "https://media.giphy.com/media/1PMVNNKVIL8Ig/giphy.gif",
            "https://media.giphy.com/media/l41m74ATRsVYOUI92/giphy.gif",
            "https://media.giphy.com/media/3FQ1YRBV0TnTi6eG4g/giphy.gif",
            "https://media.giphy.com/media/l3vRjj95cs0FCTVLO/giphy.gif",
            "https://media.giphy.com/media/hZj44bR9FVI3K/giphy.gif",
            "https://media.giphy.com/media/2wgZKbS5MTqRUpzmNm/giphy.gif",
            "https://media.giphy.com/media/cXRdGDNCsiGX6S0qOM/giphy.gif",
            "https://media.giphy.com/media/nXxOjZrbnbRxS/giphy.gif",
            "https://media.giphy.com/media/Wq6DnHvHchrTG/giphy.gif",
            "https://media.giphy.com/media/l0HlP2ms0eUc5nlHG/giphy.gif",
            "https://media.giphy.com/media/E99OMc6pkdvGw/giphy.gif",
            "https://media.giphy.com/media/ap6wcjRyi8HoA/giphy.gif",
            "https://media.giphy.com/media/l0MYy7QpDDVGVfAAw/giphy.gif",
            "https://media.giphy.com/media/l1J9wXoC8W4JFmREY/giphy.gif",
            "https://media.giphy.com/media/l0HlTyYgujdjMowg0/giphy.gif",
            "https://media.giphy.com/media/2Wf4hVaqoD6DbZFhj1/giphy.gif",
            "https://media.giphy.com/media/xT0xevrRDWAGgLaxm8/giphy.gif"]
    };

    //out of time gif object
    var outOfTime = {
        gif: ["https://media.giphy.com/media/xUySTEJYS5F1Cayg92/giphy.gif",
            "https://media.giphy.com/media/ZO91JK6HBDeCMQXkK4/giphy.gif",
            "https://media.giphy.com/media/26DNibhe8qS7c8dQk/giphy.gif",
            "https://media.giphy.com/media/9V1DWfcnh08x5L4vud/giphy.gif",
            "https://media.giphy.com/media/1XdfVRTyn5d31Q1lG0/giphy.gif",
            "https://media.giphy.com/media/JzOyy8vKMCwvK/giphy.gif",
            "https://media.giphy.com/media/d3yxg15kJppJilnW/giphy.gif",
            "https://media.giphy.com/media/3ohhwpUr8ieYNKsWKk/giphy.gif",
            "https://media.giphy.com/media/3ornjXizVZDbngmjRK/giphy.gif",
            "https://media.giphy.com/media/HcDfXRU7fqKLC/giphy.gif",
            "https://media.giphy.com/media/26n6xBpxNXExDfuKc/giphy.gif"]
    };


    function loadGif(type) {

        //check the type of gif to load
        if (type === "winner") {
            var pickRight = Math.floor(Math.random() * rightAnswer.gif.length)
            $("#gifHolder").attr("src", rightAnswer.gif[pickRight])
        }
        else if (type === "loser") {
            var pickWrong = Math.floor(Math.random() * wrongAnswer.gif.length)
            $("#gifHolder").attr("src", wrongAnswer.gif[pickWrong])

        }
        else if (type = "timesUp") {
            var slowPick = Math.floor(Math.random() * outOfTime.gif.length)
            $("#gifHolder").attr("src", outOfTime.gif[slowPick])

        }
    };


    function showGif() {

        //hide the buttons
        document.getElementById("A").style.display = "none";
        document.getElementById("B").style.display = "none";
        document.getElementById("C").style.display = "none";
        document.getElementById("D").style.display = "none";

        //display the gif
        document.getElementById("gifHolder").style.display = "block";
    }

    function showAnswerButtons() {

        //display the buttons
        resetButtons()

        //hide the gif
        document.getElementById("gifHolder").style.display = "none";

    }

    function postQuestion() {
        console.log(asked)
        //is game still on?
        if (asked.length < 10) {

            //get the next question
            var findNewQuestion = true;

            //keep looking until you find a question that hasn't been asked yet
            while (findNewQuestion) {

                //pick a random number
                var random = Math.floor(Math.random() * question.text.length)

                //check to see if the question has already been asked (part of the asked array)
                if (asked.indexOf(random) > 0) {

                    //question asked, pick new question
                    findNewQuestion = true;
                } else {
                    //not asked yet, exit loop
                    findNewQuestion = false;
                }
            }

            //add the question to the asked array
            asked.push(random);

            //load the answers
            loadAnswers(random)

            //update the index variable to the new question number
            correctIndex = random

            //update the variable that store the correct letter
            correctAnswerIs = question.correctAnswer[random]

            //show thew question in the #questionRow
            $("#questionRow").html(question.text[random])

            //show the answer buttons
            showAnswerButtons()

            //start the timer again
            startTimer();

        }
        else {
            //GAME OVER

            //display game over
            $("#timerRow").html("Game Over")

            //stop the timer
            stopTimer()

            //clear and hide the gif holder
            $("#gifHolder").attr("src", "")
            document.getElementById("gifHolder").style.display = "none";

            //show the results
            document.getElementById("correctAnswers").style.display = "block";
            document.getElementById("correctAnswers").innerHTML = "Correct Answers: " + numberCorrectAnswers;

            document.getElementById("incorrectAnswers").style.display = "block";
            document.getElementById("incorrectAnswers").innerHTML = "Incorrect Answers: " + numberWrongAnswers;

            //reset the game
            gameSetup()
        };

    }

    function resetButtons() {

        //show the answer buttons and change the background back to blue
        document.getElementById("A").style.display = "block";
        document.getElementById("A").style.background = "rgb(51, 102, 153)";  //blue
        document.getElementById("B").style.display = "block";
        document.getElementById("B").style.background = "rgb(51, 102, 153)"; //blue
        document.getElementById("C").style.display = "block";
        document.getElementById("C").style.background = "rgb(51, 102, 153)"; //blue
        document.getElementById("D").style.display = "block";
        document.getElementById("D").style.background = "rgb(51, 102, 153)"; //blue

    }
    function showStartButton() {

        //Hide the answer buttons
        document.getElementById("A").style.display = "none";
        document.getElementById("B").style.display = "none";
        document.getElementById("C").style.display = "none";
        document.getElementById("D").style.display = "none";

        //Hide the gif holder
        document.getElementById("gifHolder").style.display = "none";

        //show only the start button
        document.getElementById("start-button").style.display = "block";
        $("#start-button").html("START");
    };

    function gameSetup() {

        //intialize the asked array
        asked = [];

        //hide the gif
        document.getElementById("gifHolder").style.display = "none";
        document.getElementById("questionRow").style.display = "none";
        firstClick = true;
        showStartButton();

        //reset the counters
        numberCorrectAnswers = 0;
        numberWrongAnswers = 0;
    }

    function timesUp() {

        //don;t allow a click
        allowClick = false;

        //increment the wrong answer counter
        numberWrongAnswers++

        //state times up
        $("#timerRow").html("Times up!");

        //change the colors
        document.getElementById("timerRow").style.backgroundColor = "rgb(238, 186, 76)";  //yellow
        document.getElementById("timerRow").style.color = "rgb(237,233,232)"; //background white

        //display the correct answer
        showCorrectAnswer(correctIndex);

        //after 1 second of showing correct answer...show gifs
        setTimeout(function () {
            showGif();
            loadGif("timesUp");
        }, 1000);

        //after 3 seconds of gifs post new question
        setTimeout(function () {

            //clear and hide the gifholder
            $("#gifHolder").attr("src", "");
            document.getElementById("gifHolder").style.display = "none";

            //reset the colors of the timer row
            document.getElementById("timerRow").style.backgroundColor = "darkcyan"; 
            document.getElementById("timerRow").style.color = "rgb(237,233,232)";   //background white

            //reset the buttons
            resetButtons();

            //find the next question
            postQuestion();

            //now allow a click
            allowClick = true;

        }, 3000);


    };


    function correctAnswer() {

        //don;t allow a click
        allowClick = false;

        //increment the correct answer counter
        numberCorrectAnswers++;

        //stop timer
        stopTimer();

        //state answer is correct
        $("#timerRow").html("CORRECT!");

        //change the colors of the timer row
        document.getElementById("timerRow").style.backgroundColor = "rgb(35, 181, 175)"; //light green
        document.getElementById("timerRow").style.color = "rgb(237,233,232)";   //background white

        //show the correct answer
        showCorrectAnswer(correctIndex);

        //after 1 second of showing correct answer...show gifs
        setTimeout(function () {
            showGif();
            loadGif("winner");

        }, 1000);

        //after 3 seconds of gifs post new question
        setTimeout(function () {

            $("#gifHolder").attr("src", "");
            document.getElementById("gifHolder").style.display = "none";
            document.getElementById("timerRow").style.backgroundColor = "darkcyan"; //green
            document.getElementById("timerRow").style.color = "rgb(237,233,232)"; //background white
            resetButtons();
            postQuestion();

            //now allow a click
            allowClick = true;
        }, 3000);

    };

    function badAnswer() {

        //don't allow a click
        allowClick = false;

        //stop the timer
        stopTimer();

        //state answer is incorrect
        $("#timerRow").html("WRONG!");

        //change color of timer row
        document.getElementById("timerRow").style.backgroundColor = "rgb(227, 73, 59)"; //background white
        document.getElementById("timerRow").style.color = "rgb(237,233,232)"; //tomato red

        //increment the wrong answer counter
        numberWrongAnswers++;

        //show the correct answer
        showCorrectAnswer(correctIndex);

        //set time out for 1 second
        setTimeout(function () {

            //gif management
            showGif();
            loadGif("loser");

        }, 1000);


        //after 3 seconds of gifs post new question
        setTimeout(function () {
            $("#gifHolder").attr("src", "");
            document.getElementById("gifHolder").style.display = "none";
            document.getElementById("timerRow").style.backgroundColor = "darkcyan";
            document.getElementById("timerRow").style.color = "rgb(237,233,232)"; //background white
            resetButtons();
            postQuestion();

            //now allow a click
            allowClick = true;
        }, 4000);

    };
    function showCorrectAnswer(index) {
        var correctLetter = question.correctAnswer[index];

        switch (correctLetter) {
            case "A":
                document.getElementById("A").style.background = "rgb(238, 186, 76)"; //yelloworange
                break;
            case "B":
                document.getElementById("B").style.background = "rgb(238, 186, 76)"; //yelloworange
                break;
            case "C":
                document.getElementById("C").style.background = "rgb(238, 186, 76)"; //yelloworange
                break;
            case "D":
                document.getElementById("D").style.background = "rgb(238, 186, 76)"; //yelloworange
                break;
        }

    }

    function loadAnswers(questionID) {
        //load the choices 
        $("#A").html(question.choiceA[questionID]);
        $("#B").html(question.choiceB[questionID]);
        $("#C").html(question.choiceC[questionID]);
        $("#D").html(question.choiceD[questionID]);
    };

    function startTimer() {
        clearInterval(intervalId);
        timer = 10;
        intervalId = setInterval(function () {
            //  Decrease number by one.
            timer--;

            //  Show the number in the #show-number tag.
            $("#timerRow").html("Time remaining: " + timer);

            //  Once number hits zero...
            if (timer === 0) {

                //  ...run the stop function.
                stopTimer();

                //  Alert the user that time is up.
                timesUp();
            }
        }, 1000)


    };

    function stopTimer() {
        clearInterval(intervalId);
    };




    $(".btn").on("click", function () {

        //check to see if buttons are disabled
        if (allowClick) {

            if (firstClick) {
                firstClick = false;
                document.getElementById("start-button").style.display = "none";
                document.getElementById("questionRow").style.display = "block";
                document.getElementById("incorrectAnswers").style.display = "none";
                document.getElementById("correctAnswers").style.display = "none";
                postQuestion();
                startTimer();
            }
            else {

                if (correctAnswerIs == this.id) {
                    correctAnswer();
                }
                else {

                    badAnswer();

                }

            }
        }
    })

})
//https://media.giphy.com/media/26BGP98lm74FJgfNS/giphy.gif