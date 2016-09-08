/**
 * Tech Quiz by Anthony Delgado on 9/8/16 at RCB 2016
 */


window.onload = function () {
    //click events are done for you:
    $('#start').click(playGame);

    //forked functions from stop watch game
//        $('#lap').click(stopwatch.recordLap);
//        $('#stop').click(stopwatch.stop);
//        $('#reset').click(stopwatch.reset);
//        $('#start').click(stopwatch.start);
};

var counter;
var correctCount = 0;
var incorrectCount = 0;
var timedOutCount = 0;

var questions = [
    {
        "question": "Who owns Tumblr?",
        "answers": {
            1: "Google",
            2: "Facebook",
            3: "Microsoft",
            4: "Verizon"
        },
        "rightAnswer": 4
    },
    {
        "question": "Who owns YouTube?",
        "answers": {
            1: "Google",
            2: "Facebook",
            3: "Microsoft",
            4: "Verizon"
        },
        "rightAnswer": 1
    },
    {
        "question": "Who owns LinkedIn?",
        "answers": {
            1: "Google",
            2: "Facebook",
            3: "Microsoft",
            4: "Verizon"
        },
        "rightAnswer": 3
    },
    {
        "question": "Who invented the internet?",
        "answers": {
            1: "Mark Zuckerberg",
            2: "Bill Gates",
            3: "Robert Kahn",
            4: "Al Gore"
        },
        "rightAnswer": 3
    },
    {
        "question": "Who is the founder of FaceBook?",
        "answers": {
            1: "Elon Musk",
            2: "John Resig",
            3: "Mark Zuckerberg",
            4: "Steve Jobs"
        },
        "rightAnswer": 3
    },
    {
        "question": "Who is the founder of jQuery?",
        "answers": {
            1: "Elon Musk",
            2: "John Resig",
            3: "Mark Zuckerberg",
            4: "Steve Jobs"
        },
        "rightAnswer": 2
    },
    {
        "question": "Who is the founder of PayPal?",
        "answers": {
            1: "Elon Musk",
            2: "John Resig",
            3: "Mark Zuckerberg",
            4: "Steve Jobs"
        },
        "rightAnswer": 1
    },
    {
        "question": "Who is the founder of Tesla?",
        "answers": {
            1: "Elon Musk",
            2: "John Resig",
            3: "Mark Zuckerberg",
            4: "Steve Jobs"
        },
        "rightAnswer": 1
    },
    {
        "question": "Who is the founder of Apple?",
        "answers": {
            1: "Elon Musk",
            2: "John Resig",
            3: "Mark Zuckerberg",
            4: "Steve Jobs"
        },
        "rightAnswer": 4
    }
];

$.each(questions, function (key, value) {

    console.log(key + ": " + value.question);

    $.each(value.answers, function (key, value) {

        console.log(key + ": " + value);

    });

});

var totalQuestions = questions.length - 1;
var questionDiv = $('#question');
var answerButtonDiv = $('#answers');
var currentQID = 0;

function loadQuestion(id) {
    currentQID = id;
    //reset and start the clock
    stopwatch.stop();
    stopwatch.start(id);

    //Empty Last Q and A
    questionDiv.empty();
    answerButtonDiv.empty();

    questionDiv.text(questions[id].question);

    $.each(questions[id].answers, function (key, value) {

        var answerButton = $(document.createElement('a'));
        answerButton.addClass('btn btn-primary btn-lg btn-answer');
        answerButton.text(value);
        answerButton.attr('data-correct', questions[id].rightAnswer);
        answerButton.attr('data-answer', key);
        answerButton.attr('data-question', id);
//            answerButton.attr('onclick', 'checkAnswer(' + questions[id].rightAnswer + ',' + key + ',' + id + ')');
        answerButton.appendTo(answerButtonDiv);

    });

}
;

$(document).on('click', '.btn-answer', function () {

    checkAnswer($(this).data('correct'),$(this).data('answer'),$(this).data('question'));

} );



function playGame() {
    loadQuestion(0);
}
;

function nextQuestion() {

    stopwatch.stop();

    if (totalQuestions == currentQID) {

        gameOver();
    } else {

        currentQID++;
        loadQuestion(currentQID);
    }

}
;

function gameOver() {


    stopwatch.stop();
    $('#display').empty();

    //Empty Last Q and A
    questionDiv.empty();
    answerButtonDiv.empty();

    questionDiv.text('All done, heres how you did!');

    var theResults = $(document.createElement('span'));

    theResults.append('Correct: ' + correctCount);

    theResults.append(' Incorrect: ' + incorrectCount);

    theResults.append(' Unanswered: ' + timedOutCount);

    theResults.appendTo(answerButtonDiv);

}
;

function checkAnswer(correctAnswer, answeredAnswer, questionID) {

    if (correctAnswer == answeredAnswer) {

        correctCount++;
        console.log('Right!' + correctCount + ' correct so far!');

    } else {
        incorrectCount++;
        console.log('Wrong!' + incorrectCount + ' incorrect so far!');
    }


    if (totalQuestions == questionID) {

        gameOver();
    } else {

        questionID++;
        loadQuestion(questionID);
    }

}


var stopwatch = {
    time: 30,
    lap: 1,
    reset: function () {
        stopwatch.time = 0;
        stopwatch.lap = 1;
        //change the "display" div to "00:00"
        $('#display').text("00:00");
        //empty the "laps" div
        $('#lap').empty();
    },
    start: function (qID) {
        //Use setInterval to start the count here
        if (stopwatch.time === 0) {

            timedOutCount++;

            if (totalQuestions == qID) {
                gameOver();
            } else {
                qID++;
                loadQuestion(qID);
            }

        } else {
            counter = setInterval(stopwatch.count, 1000);
        }

    },
    stop: function () {
        //Use clearInterval to stop the count here
        $('#display').text('00:30');
        stopwatch.recordLap();
        stopwatch.time = 30;
        clearInterval(counter);

    },
    recordLap: function () {
        //Get the current time, pass that into the stopwatch.timeConverter function, and save the result in a variable
        var theTime = stopwatch.timeConverter(stopwatch.time);
        //Add the current lap and time to the "laps" div
        $('#laps').append(theTime);
        //increment lap by 1, remember we cant use "this" here
        stopwatch.lap++;
    },
    count: function () {
        if (stopwatch.time < 1) {
            nextQuestion();
            timedOutCount++;
        } else {

            //increment time by 1, remember we cant use "this" here
            stopwatch.time--;
            //Get the current time, pass that into the stopwatch.timeConverter function, and save the result in a variable
            var theTime = stopwatch.timeConverter(stopwatch.time);
            //Use the variable you just created to show the converted time in the "display" div
            $('#display').text(theTime);

        }
    },
    timeConverter: function (t) {
        //This function is done. You do not need to touch it. It takes the current time in seconds and converts it to minutes and seconds (mm:ss).
        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        if (minutes === 0) {
            minutes = "00";
        } else if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
    }
};
