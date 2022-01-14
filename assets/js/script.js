const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'Which of the following is NOT an example of a data type:',
        choice1: 'numbers',
        choice2: 'booleans',
        choice3: 'strings',
        choice4: 'functions',
        answer: 4,
    },
    {
        question: 'What will the code, console.log(typeof "2"), display on the console?',
        choice1: 'number',
        choice2: 'string',
        choice3: 'true',
        choice4: 'false',
        answer: 2,
    },
    {
        question: 'What is the correct way to set a value to a variable?',
        choice1: 'var element = 2',
        choice2: 'varialbe element = 2',
        choice3: 'v element = 2',
        choice4: 'var element: 2',
        answer: 1,
    },
    {
        question: 'What is the correct way to call a function?',
        choice1: 'write out function',
        choice2: 'it automatically calls it',
        choice3: 'write out the function name with () at the end',
        choice4: 'write out the function name',
        answer: 3,
    },
    {
        question: 'Which of the following is the correct way to get an element from the HTML page:',
        choice1: 'document.getElementById()',
        choice2: '.getElementById',
        choice3: 'doc.getElementById()',
        choice4: 'getId()',
        answer: 1,
    }
]

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestions();
}

getNewQuestions = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);

        return window.location.assign('/end.html');
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestions();

        }, 1000)
    })
})

incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
}

startGame();
     