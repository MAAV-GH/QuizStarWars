const startButton = document.querySelector(".start");     //bouton "Commencer le quiz"                
const pageIntro = document.querySelector(".page.intro");            
const pageQuestion1 = document.querySelector(".page.question1");
const pageQuestion2 = document.querySelector(".page.question2");     
const pageQuestion3 = document.querySelector(".page.question3");     
const pageQuestion4 = document.querySelector(".page.question4");     
const pageQuestion5 = document.querySelector(".page.question5");
const pageScore = document.querySelector(".page.score");
let pageActive = pageIntro;     //initialisation de la page active sur la page d'intro              
let answer = document.querySelectorAll(".answer");     //réponses possibles
let correctAnswersCounter = 0;     //compteur de bonnes réponses
let validationButton = pageActive.querySelector(".validation");
let nextQuestionButton = pageActive.querySelector(".nextQuestionButton");
let solution = pageActive.querySelector(".solution"); //explication + bouton question suivante

//////////////////////////////////////////

// Fonction MAJ page active
function updatePageActive() {
    pageActive = document.querySelector(".active");
    updateValidationButton();
    boutonValidationClick();
    updateNextQuestionButton();   
};

// Fonction pour qu'une seule réponse ne soit sélectionnée
// selectedAnswer = answer sur laquelle user clique
function selectAnswer (selectedAnswer) {    
    pageActive.querySelectorAll(".answer").forEach(answer => {
        answer.classList.remove("selectedAnswerCSS");
    })
    selectedAnswer.classList.toggle("selectedAnswerCSS");

    updateValidationButton();
};


// Fonction qui vérifie si une réponse est sélectionnée et donc débloquer bouton validation
function updateValidationButton() {
    validationButton = pageActive.querySelector(".validation");

    if (validationButton) {

        validationButton.classList.remove("validationAllowed");
        validationButton.disabled = true;

        if (pageActive.querySelector(".selectedAnswerCSS")) {
        validationButton.classList.add("validationAllowed");
        validationButton.disabled = false;
        }
    }   
};


// Rendre bouton validation cliquable
function boutonValidationClick() {
    if (validationButton) {
        validationButton.removeEventListener("click", verification);  // Retirer l'ancien événement
        validationButton.addEventListener("click", verification); // Ajouter l'événement au nouveau bouton
    }
}


// Fonction de vérification de la réponse sélectionnée avec la réponse attendue
function verification () {
    const selectedAnswer = pageActive.querySelector(".selectedAnswerCSS")
    const correctAnswer = pageActive.querySelector(".correct");
    if (selectedAnswer && correctAnswer) {   //vérification que les éléments sont présents pour appliquer verification


        if (selectedAnswer.textContent.trim() == correctAnswer.textContent.trim()){
            selectedAnswer.classList.add("rightAnswer")
            correctAnswersCounter += 1;     //incrémentation de 1 du compteur de bonnes réponses
            console.log(correctAnswersCounter)
        } else {
            selectedAnswer.classList.add("falseAnswer");
            correctAnswer.classList.add("rightAnswer");
        }
    showAnswer();
    updateNextQuestionButton();
    }
};

// Faire apparaître l'explication et le bouton Question Suivante
function showAnswer () {
    solution = pageActive.querySelector(".solution");
    solution.classList.add("revealedSolution", "revealed");

    validationButton.classList.remove("validationAllowed");
    validationButton.disabled = true;

    pageActive.querySelectorAll(".answer").forEach(answer => {
        answer.style.pointerEvents = "none";
    })
};

// MAJ bouton Question suivante -> enlève l'ancien évènement pour mettre le nouveau
function updateNextQuestionButton () {
    nextQuestionButton = pageActive.querySelector(".nextQuestionButton");
    
    if (pageActive == pageQuestion5) {
        nextQuestionButton.innerText = "Résultats";
    } 
    if (nextQuestionButton) {
        nextQuestionButton.removeEventListener("click", nextQuestion);
        nextQuestionButton.addEventListener("click", nextQuestion);

    }
};

// Passer à la question suivante en cliquant sur le bouton Question Suivante
function nextQuestion () {  
    nextPage();
    updatePageActive();
    updateValidationButton();

    solution.classList.remove("revealedSolution"); //Cacher la solution à chaque changement de page 
    solution = pageActive.querySelector(".solution");
};

// Changement de page
function nextPage() {
    if (pageActive == pageQuestion1){
        pageQuestion1.classList.remove("active");
        pageQuestion2.classList.add("active");
    }
    else if (pageActive == pageQuestion2){
        pageQuestion2.classList.remove("active");
        pageQuestion3.classList.add("active");
    }
    else if (pageActive == pageQuestion3){
        pageQuestion3.classList.remove("active");
        pageQuestion4.classList.add("active");
    }
    else if (pageActive == pageQuestion4){
        pageQuestion4.classList.remove("active");
        pageQuestion5.classList.add("active");
    }
    else if (pageActive == pageQuestion5){
        pageQuestion5.classList.remove("active");
        pageScore.classList.add("active");
    }

    updatePageActive();

    if (pageActive == pageScore) {
        annonceScore();
    
    }
    
};

// Annonce du score sur 5
function annonceScore() {
    let scoreText = document.querySelector(".scoreText");
    if (correctAnswersCounter <= 2) {
        scoreText.innerText = "Ton score est de " + correctAnswersCounter +"/5"
        scoreText.style.boxShadow = "0px 0px 50px rgb(180, 50, 50)";
    } 
    
    else if (correctAnswersCounter == 3) {
        scoreText.innerText = "Ton score est de " + correctAnswersCounter +"/5"
        scoreText.style.boxShadow = "0px 0px 50px rgb(100, 150, 255)";
    } 
    
    else if (correctAnswersCounter >3) {
        scoreText.innerText = "Ton score est de " + correctAnswersCounter +"/5"
        scoreText.style.boxShadow = "0px 0px 50px rgb(60, 160, 90)";
    }

    messagePersoScore();
};

// Message personnalisé en fonction du score obtenu
function messagePersoScore() {
    let scoreMessage = document.querySelector(".scoreMessage");
    if (correctAnswersCounter == 5) {
        scoreMessage.innerText = "Maître Jedi ! La Force est puissante en toi.";
    } else if (correctAnswersCounter == 4) {
        scoreMessage.innerText = "Chevalier Jedi ! Encore un petit effort.";
    } else if (correctAnswersCounter == 3) {
        scoreMessage.innerText = "Padawan ! Ton entraînement doit continuer.";
    } else if (correctAnswersCounter == 2) {
        scoreMessage.innerText = "Contrebandier ! Tu navigues à l'aveugle.";
    } else if (correctAnswersCounter == 1) {
        scoreMessage.innerText = "Stormtrooper ! Tu vises mais tu rates...souvent.";
    } else {
        scoreMessage.innerText = "Bantha Fodder ! Même Jar Jar en sait plus.";
    }
};

////////////////////////////////////////////////////

//Commencer le quiz
startButton.addEventListener("click", () => {
        
    pageIntro.classList.remove("active");
    pageQuestion1.classList.add("active");
    updatePageActive();
});

// Rendre les réponses cliquables
document.querySelectorAll(".answer").forEach(answer => {
    answer.addEventListener("click", () => selectAnswer(answer));
});