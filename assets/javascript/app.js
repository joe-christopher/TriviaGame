    //initialize global variables
    var startScreen;
    var gameHTML;
    var counter = 15;

    //same question for used for each trivia item
    var question = "What is the name of the following character?";

    //different answers for each trivia item
    var answerArray = [["Birdo", "Yoshi", "Pinky", "Koopa"], 
                    ["Daisy Kong","Dixie Kong","Danni Kong","Dipsy Kong"], 
                    ["Grandpa Toad", "Toadski", "Toadsworth", "Old Toad"], 
                    ["Kyoto","Koopa","Kamek","Komosan"], 
                    ["Old Man Kong", "Daddy Kong", "Gramps Kong", "Cranky Kong"], 
                    ["Luna","Star","Sparkle","Eclipse"], 
                    ["Woobio", "Wario", "Wadio", "Wutangio"], 
                    ["Pauline","Roslalina","Peach","Daisy"]];
    
    //array of images to guess 
    var imageArray =   ["<img class='center-block img-right' src='assets/images/birdo.png'>", 
                        "<img class='center-block img-right' src='assets/images/dixie.png'>", 
                        "<img class='center-block img-right' src='assets/images/toadsworth.png'>", 
                        "<img class='center-block img-right' src='assets/images/kamek.png'>", 
                        "<img class='center-block img-right' src='assets/images/cranky.png'>", 
                        "<img class='center-block img-right' src='assets/images/luna.png'>", 
                        "<img class='center-block img-right' src='assets/images/wario.png'>", 
                        "<img class='center-block img-right' src='assets//images/daisy.png'>"];

    //corrent answers array
    var correctAnswers = ["A. Birdo", "B. Dixie Kong", "C. Toadsworth", "C. Kamek", "D. Cranky Kong", "A. Luna", "B. Wario", "D. Daisy"];

    var questionCounter = 0;
    var selecterAnswer;
    var theClock;
    var correctTotal = 0;
    var incorrectTotal = 0;
    var unansweredTotal= 0;
    var clickSound = new Audio("assets/sounds/button-click.mp3");
   
    
    
    $(document).ready(function() {

    //function that creates the start button and initial screen
        function initialScreen() {
            startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
            $(".mainArea").html(startScreen);
        }
    
        initialScreen(); //call function to display screen before game starts
        
        //Create a function, generateHTML(), that is triggered by the start button, and generates the HTML
        
        $("body").on("click", ".start-button", function(event){
            //event.preventDefault();  // added line to test issue on GitHub Viewer
            clickSound.play();
            generateHTML();
            timerWrapper();
        
        }); // Closes start-button click
        
        $("body").on("click", ".answer", function(event){ //click on answer
            //answeredQuestion = true;
            clickSound.play();
            selectedAnswer = $(this).text();
            if(selectedAnswer === correctAnswers[questionCounter]) { //correct answer chosen
                clearInterval(theClock);
                generateWin();
            }
            else { //incorrect answer chosen
                clearInterval(theClock);
                generateLoss();
            }
        }); // Close .answer click
    
        $("body").on("click", ".reset-button", function(event){  //reset game button click
            clickSound.play();
            resetGame();
        });
    
    });  
    
    //did not answer in time
    function generateLossDueToTimeOut() {
        unansweredTotal++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + 
        "</span></p>" + imageArray[questionCounter]  + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>";
        $(".mainArea").html(gameHTML);
        setTimeout(wait, 2000);  
    }
    
    //correct answer chiosen
    function generateWin() {
        correctTotal++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + imageArray[questionCounter]  + 
        "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>";
        $(".mainArea").html(gameHTML);
        setTimeout(wait, 2000);
    }
    
    //incorrect answer chiosen
    function generateLoss() {
        incorrectTotal++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + 
        "</span></p>" + imageArray[questionCounter]  + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>";
        $(".mainArea").html(gameHTML);
        setTimeout(wait, 2000); 
    }
    
    function generateHTML() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>15</span></p><p class='text-center'>" + question + imageArray[questionCounter] +
        "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "
        +answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
        $(".mainArea").html(gameHTML);

    }
    
    //function passed to SetTimeout
    function wait() {
        if (questionCounter < 7) //not last question
        {
            questionCounter++;
            generateHTML();
            counter = 15;
            timerWrapper();
        }
        else //it was last question, display final stats
        {
            finalScreen();
        }
    }
    
    function timerWrapper() {
        theClock = setInterval(fifteenSeconds, 1000);
        
        function fifteenSeconds() {
            if (counter <= 0) 
            { //time ran out after 15 seconds, did no answer
                clearInterval(theClock);
                generateLossDueToTimeOut();
            }
            if (counter > 0) 
            {
                counter--;
            }
            $(".timer").html(counter); //display countdown timer
        }
    }
    
    //display final stats screen
    function finalScreen() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + 
        "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + 
        correctTotal + "</p>" + "<p>Wrong Answers: " + incorrectTotal + "</p>" + "<p>Unanswered: " + unansweredTotal+ "</p>" + 
        "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
        $(".mainArea").html(gameHTML);
    }
    
    //resets game when resset button clicked
    function resetGame() {
        questionCounter = 0;
        correctTotal = 0;
        incorrectTotal = 0;
        unansweredTotal= 0;
        counter = 15;
        generateHTML();
        timerWrapper();
    }
    

    