// Dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Scroll to top button
const scrollToTopButton = document.getElementById('scrollToTop');

window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopButton.style.display = "block";
    } else {
        scrollToTopButton.style.display = "none";
    }
};

scrollToTopButton.addEventListener('click', () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
});

// Image slideshow
let slideIndex = 0;
const slides = document.getElementsByClassName("slide");

function showSlides() {
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    slides[slideIndex-1].style.display = "block";
    setTimeout(showSlides, 5000); // Change image every 5 seconds
}

showSlides();

document.querySelector('.prev').addEventListener('click', () => {
    slideIndex -= 2;
    if (slideIndex < 0) {slideIndex = slides.length - 1}
    showSlides();
});

document.querySelector('.next').addEventListener('click', () => {
    showSlides();
});

// Quiz
const quizData = [
    {
        question: "What does CDN stand for?",
        options: ["Content Delivery Network", "Computer Data Network", "Centralized Data Node", "Content Distribution Network"],
        correctAnswer: 0
    },
    {
        question: "What is the main purpose of a CDN?",
        options: ["To create content", "To store user data", "To improve content delivery speed", "To encrypt data"],
        correctAnswer: 2
    },
    {
        question: "Which of the following is NOT a benefit of using a CDN?",
        options: ["Reduced latency", "Increased security", "Improved SEO", "Content creation"],
        correctAnswer: 3
    }
];

function renderQuiz() {
    const quizContainer = document.getElementById('quizContainer');
    quizData.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('quiz-question');
        questionElement.innerHTML = `
            <p>${index + 1}. ${question.question}</p>
            <div class="quiz-options">
                ${question.options.map((option, optionIndex) => `
                    <label>
                        <input type="radio" name="question${index}" value="${optionIndex}">
                        ${option}
                    </label>
                `).join('')}
            </div>
        `;
        quizContainer.appendChild(questionElement);
    });
}

renderQuiz();

document.getElementById('submitQuiz').addEventListener('click', () => {
    let score = 0;
    quizData.forEach((question, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption && parseInt(selectedOption.value) === question.correctAnswer) {
            score++;
        }
    });
    document.getElementById('quizResults').textContent = `You scored ${score} out of ${quizData.length}`;
});
