// // Sample questions. DONT touch this data
const questions = [
    {
        text: "Which language is primarily used for web app development?",
        options: ["C#", "Python", "JavaScript", "Swift"],
        correct: 2
    },
    {
        text: "Which of the following is a relational database management system?",
        options: ["Oracle", "Scala", "Perl", "Java"],
        correct: 0
    },
    {
        text: "What does HTML stand for?",
        options: ["Hyperlink and Text Markup Language", "High Technology Modern Language", "Hyper Text Markup Language", "Home Tool Markup Language"],
        correct: 2
    },
    {
        text: "What does CSS stand for?",
        options: ["Cascading Stylesheets", "Cascading Styling Styles", "Cascading Sheets for Stylings", "Cascaded Stylesheets"],
        correct: 0
    },
    {
        text: "Which of the following is not an object-oriented programming language?",
        options: ["Java", "C#", "Scala", "C"],
        correct: 3
    },
    {
        text: "Which tool is used to ensure code quality in JavaScript?",
        options: ["JSLint", "TypeScript", "Babel", "Webpack"],
        correct: 0
    },
    {
        text: "What is the primary use of the Git command 'clone'?",
        options: ["To stage changes", "To copy a repository", "To switch to a different branch", "To list all the files in a repository"],
        correct: 1
    },
    {
        text: "What does API stand for in the context of programming?",
        options: ["Apple Pie Interface", "Application Programming Interface", "Advanced Peripheral Integration", "Application Process Integration"],
        correct: 1
    },
    {
        text: "Javascript is a single threaded programming language",
        options: ["True", "False"],
        correct: 0
    },
    {
        text: "API calls in Javascript can be done using the following method",
        options: ["setTimeout()", "setInterval()", "fetch()", "get()"],
        correct: 2
    },
];


// To initialize variables for tracking the current question and score
let currentQuestionIndex = 0;
let score = 0;

// Get references to DOM elements
const questionElement = document.getElementById("question");
const answerListElement = document.getElementById("answer-list");
const submitButton = document.getElementById("submit");
const nextButton = document.getElementById("next");

// Function to load and display the current question
function loadQuestion() {
    const question = questions[currentQuestionIndex];
    questionElement.textContent = question.text;
    answerListElement.innerHTML = '';

    // Creates answer options
    question.options.forEach((option, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <label>
                <input type="radio" name="answer" value="${index}">
                ${option}
            </label>
        `;
        answerListElement.appendChild(listItem);  // Adds the created list item to the answer list element    
        });

    // Shows submit button and hide next button
    nextButton.hidden = true;
    submitButton.hidden = false;
}

// Event listener for submit button
submitButton.addEventListener("click", () => {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');

    // Check if an answer is selected
    if (!selectedAnswer) {
        alert("Please select an answer!");
        return;
    }

    const correctAnswerIndex = questions[currentQuestionIndex].correct;
    const selectedAnswerIndex = parseInt(selectedAnswer.value);

    // Check if the answer is correct and update the score
    if (selectedAnswerIndex === correctAnswerIndex) {
        score++;
        answerListElement.children[selectedAnswerIndex].style.backgroundColor = "lightgreen";
    } else {
        answerListElement.children[selectedAnswerIndex].style.backgroundColor = "lightcoral";
        answerListElement.children[correctAnswerIndex].style.backgroundColor = "lightgreen";
    }

    // Show next button and hide submit button
    nextButton.hidden = false;
    submitButton.hidden = true;
    disableAnswers();
});

// Function to disable answer options after submission
function disableAnswers() {
    const radioButtons = answerListElement.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.disabled = true;
    });
}

// Event listener for next button
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;

    // Check if there are more questions, otherwise show results
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

// Function to display the final results
function showResults() {
    questionElement.textContent = "Quiz Completed!";
    answerListElement.innerHTML = `
        <h2>Your Score: ${score}/${questions.length}</h2>
        <p>Percentage: ${((score / questions.length) * 100).toFixed(2)}%</p>
    `;
    submitButton.hidden = true;
    nextButton.hidden = true;

    // Create and add restart button
    const restartButton = document.createElement('button');
    restartButton.textContent = "Restart Quiz";
    restartButton.addEventListener('click', restartQuiz);
    answerListElement.appendChild(restartButton);
}

// Function to restart the quiz
function restartQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    loadQuestion();
}
// Load the first question on startup
loadQuestion();
