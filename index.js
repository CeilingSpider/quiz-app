let questionNumber = 0;
let score = 0;

//renders HTML for question-answer format
function generateQuestion() {
    if (questionNumber < STORE.length) {
        return `<div class="question-${questionNumber}">
        <p>${STORE[questionNumber].question}</p>
        <form>
            <fieldset>
                <ul>
                <li class= "answerItem">
                    <label class="answerOption">
                    <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required>
                    <span>${STORE[questionNumber].answers[0]}</span>
                    </label>
                </li>
                <li class= "answerItem">
                    <label class="answerOption">
                    <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" required>
                    <span>${STORE[questionNumber].answers[1]}</span>
                    </label>
                </li>
                <li class= "answerItem">
                    <label class="answerOption">
                    <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" required>
                    <span>${STORE[questionNumber].answers[2]}</span>
                    </label>
                </li>
                <li class= "answerItem">
                    <label class="answerOption">
                    <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer" required>
                    <span>${STORE[questionNumber].answers[3]}</span>
                    </label>
                </li>
                </ul>
            <button type="submit" class="buttonSubmit">Submit</button>
            </fieldset>
        </form>
        </div>`;
    } else {
        renderResults();
        restartQuiz();
        $('.questionNumber').text(10)
    }
}

//increment question number
function changeQuestionNumber () {
      questionNumber ++;
    
      $('.questionNumber').text(questionNumber+1);
  }

//increment score
function changeScore () {
    score ++;
  }

//start quiz, hide start div and show question div
function startQuiz() {
    $('.quizStart').on('click', '.buttonStart', function(event) {
//hide start div
    $('.quizStart').remove();
//show question div
    $('.questionAnswerForm').css('display', 'block');
//question number starts with 1
    $('.questionNumber').text(1);
    });
}

//render question in DOM
    function renderQuestion() {
        $('.questionAnswerForm').html(generateQuestion());
    }

//user selects answer and gets feedback based on whether or not it is correct

function userSelectAnswer() {
    $('form').on('submit', function (event) {
        event.preventDefault();
        let selected = $('input:checked');
        let answer = selected.val();
        let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
        if (answer === correctAnswer) {
          selected.parent().addClass('correct');
          ifAnswerCorrect();
        } else {
          selected.parent().addClass('wrong');
          ifAnswerWrong();
        }
      });
}

function ifAnswerCorrect () {
    userAnswerFeedbackCorrect();
    updateScore();
  }
  
  function ifAnswerWrong () {
    userAnswerFeedbackWrong();
  }

//after answering a question, user receives 1 of 2 responses, score is updated

//if answer is correct response
function userAnswerFeedbackCorrect () {
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    $('.questionAnswerForm').html(`<div class="correctFeedback"><img class="feedbackImg" src="https://i.imgur.com/3aHDcXG.jpg" alt="Chris Trager giving you a thumbs up"/>
    <h2>You are correct!</h2><button type=button class="buttonNext">Next</button></div>`);
  }

//if answer is wrong response
function userAnswerFeedbackWrong () {
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    $('.questionAnswerForm').html(`<div class="wrongFeedback"><h2>You got it wrong!</h2>
    <img class="feedbackImg" src="https://i.imgur.com/Yp0oEHt.jpg" alt="an angry April Ludgate snarling at you"/>
    <p>The correct answer is <span>"${correctAnswer}"</span></p><button type="submit" button class="buttonNext">Next</button></div>`);
  }

//update score progress
function updateScore () {
    changeScore();
    $('.score').text(score);
  }


//after answering all questions, display HTML for end of quiz results
// dependent on score (3 possible screens)
function renderResults () {
    if (score >= 8) {
      $('.questionAnswerForm').html(`<div class="feedback"><h2>Good work, I'm proud of you.</h2>
      <img class="resultsImg" src="https://i.imgur.com/K1yKaSl.jpg" alt="Ron Swanson, holding a saw"/><h3>You got ${score} / 10</h3><p>"Never half ass two things. Whole ass one thing."</p>
      <button class="buttonReload">Restart Quiz</button></div>`);
    } else if (score < 8 && score >= 4) {
      $('.questionAnswerForm').html(`<div class="feedback"><h2>Almost there!</h2>
      <img class="resultsImg" src="https://i.imgur.com/knBRsyK.jpg" alt="Ben Wyatt holding a Cone of Dunshire"/><h3>You got ${score} / 10</h3><p>"Are the cones a metaphor? Well, yes and no."</p><button class="buttonReload">Restart Quiz</button></div>`);
    } else {
      $('.questionAnswerForm').html(`<div class="feedback"><h2>Dammit, Jerry!</h2>
      <img class="resultsImg" src="https://i.imgur.com/bLPJTPt.jpg" alt="Jerry, holding a phone and looking scared"/><h3>You got ${score} / 10</h3><p>"Aw, Jeez..."</p><button class="buttonReload">Restart Quiz</button></div>`);
    }
  } 


//what happens when user clicks 'next'
function renderNextQuestion () {
    $('main').on('click', '.buttonNext', function (event) {
      changeQuestionNumber();
      renderQuestion();
      userSelectAnswer();
    });
  }
//reload quiz and start over, shows at end of quiz
function restartQuiz () {
    $('main').on('click', '.buttonReload', function (event) {
      location.reload();
    });
  }

//run quiz functions
function createQuiz () {
    startQuiz();
    renderQuestion();
    userSelectAnswer();
    renderNextQuestion();
  }
  
  $(createQuiz);