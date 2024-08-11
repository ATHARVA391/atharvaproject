const quizData = [
    {
        question: "Which city hosted the 2020 Summer Olympics?",
        options: ["Tokyo", "Beijing", "London", "Rio de Janeiro"],
        answer: "Tokyo"
    },
    {
        question: "Who has won the most Olympic gold medals in swimming?",
        options: ["Michael Phelps", "Ryan Lochte", "Ian Thorpe", "Mark Spitz"],
        answer: "Michael Phelps"
    },
    {
        question: "Which country won the most medals in the 2016 Rio Olympics?",
        options: ["United States", "China", "Great Britain", "Russia"],
        answer: "United States"
    },
    {
        question: "In which year were the first modern Olympic Games held?",
        options: ["1896", "1900", "1912", "1924"],
        answer: "1896"
    },
    {
        question: "Which sport is known as the 'King of Sports' at the Olympics?",
        options: ["Football (Soccer)", "Basketball", "Athletics", "Swimming"],
        answer: "Athletics"
    }
];

let currentQuestionIndex = 0;

const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submit');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const resultContainer = document.getElementById('result');
const progressText = document.getElementById('progress-text');
const currentQuestionElem = document.getElementById('current-question');
const totalQuestionsElem = document.getElementById('total-questions');

function loadQuestion(index) {
    const questionData = quizData[index];
    quizContainer.innerHTML = `
        <div class="question active">
            <p>${index + 1}. ${questionData.question}</p>
            <div class="options">
                ${questionData.options.map(option => `
                    <label>
                        <input type="radio" name="question${index}" value="${option}">
                        <span>${option}</span>
                    </label>
                `).join('')}
            </div>
        </div>
    `;
    updateProgress();
    document.querySelectorAll('.question').forEach(el => el.classList.remove('active'));
    setTimeout(() => {
        document.querySelector('.question').classList.add('active');
    }, 100);
}

function updateProgress() {
    currentQuestionElem.textContent = currentQuestionIndex + 1;
    totalQuestionsElem.textContent = quizData.length;
    prevButton.disabled = currentQuestionIndex === 0;
    nextButton.disabled = currentQuestionIndex === quizData.length - 1;
    submitButton.disabled = !document.querySelector(`input[name="question${currentQuestionIndex}"]:checked`);
}

function getResult() {
    let score = 0;
    quizData.forEach((item, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption && selectedOption.value === item.answer) {
            score++;
        }
    });
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}`;
}

function navigateQuestion(direction) {
    if (direction === 'next') {
        currentQuestionIndex++;
    } else if (direction === 'prev') {
        currentQuestionIndex--;
    }
    loadQuestion(currentQuestionIndex);
}

document.addEventListener('change', () => {
    submitButton.disabled = !document.querySelector(`input[name="question${currentQuestionIndex}"]:checked`);
});

nextButton.addEventListener('click', () => {
    navigateQuestion('next');
    loadQuestion(currentQuestionIndex);
});

prevButton.addEventListener('click', () => {
    navigateQuestion('prev');
    loadQuestion(currentQuestionIndex);
});

submitButton.addEventListener('click', getResult);

loadQuestion(currentQuestionIndex);
