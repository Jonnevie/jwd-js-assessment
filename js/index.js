/* ***************************
  JWD JavaScript Assessment

  This code is unfinished. You will need to study it to figure out what it does. Then you will need to use this and
  your own code, to finish the app. 
  
  The tasks you need to do are below.

    TASKS TODO:
      1. Calculate the score as the total of the number of correct answers

      2. Add an Event listener for the submit button, which will display the score and highlight 
         the correct answers when the button is clicked. Use the code from lines 67 to 86 to help you.

      3. Add 2 more questions to the app (each question must have 4 options).

      4. Reload the page when the reset button is clicked (hint: search window.location)

      5. Add a countdown timer - when the time is up, end the quiz, display the score and highlight the correct answers
*************************** */
//timer function, count down from 1 min then stop quiz
const quizWrap = document.querySelector("#quizWrap");
let score = 0
let time = document.getElementById("time");


window.addEventListener("DOMContentLoaded", () => {
  const start = document.querySelector("#start");

  function countdown() {
    let seconds = 59;
    function tick() {
     
      seconds--;
      time.innerHTML =
        "0:" + (seconds < 10 ? "0" : "") + String(seconds);  //ternary to make it readable
      if (seconds > 0) {
        setTimeout(tick, 1000);
      } else {
        quizWrap.style.pointerEvents = 'none'
        calculateScore();
        time.innerHTML= (`<p style='color: red'> Time's Up! you got ${score} out of 5.</p>`);
        btnSubmit.style.pointerEvents ='none';
      }
    }
    tick();
  }

  start.addEventListener("click", function (e) {
    document.querySelector("#quizBlock").style.display = "block";
    start.style.display = "none";
    countdown()
  });

  // quizArray QUESTIONS & ANSWERS
  // q = QUESTION, o = OPTIONS, a = CORRECT ANSWER
  // Basic ideas from https://code-boxx.com/simple-javascript-quiz/
  const quizArray = [
    {
      q: "Which is the third planet from the sun?",
      o: ["Saturn", "Earth", "Pluto", "Mars"],
      a: 1, // array index 1 - so Earth is the correct answer here
    },
    {
      q: "Which is the largest ocean on Earth?",
      o: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      a: 3,
    },
    {
      q: "What is the capital of Australia",
      o: ["Sydney", "Canberra", "Melbourne", "Perth"],
      a: 1,
    },
    {
      q: "Third Month of the Year?",
      o: ["January", "March", "December", "Burrito"],
      a: 1,
    },
    {
      q: "Who loves warm hugs?",
      o: ["Maleficent", "Simba", "Louisa", "Olaf"],
      a: 3,
    },
  ];

  // function to Display the quiz questions and answers from the object
  const displayQuiz = () => {
   
    let quizDisplay = "";
    quizArray.map((quizItem, index) => {
      quizDisplay += `<ul class="list-group">
                   Q - ${quizItem.q}
                    <li class="list-group-item mt-2" id="li_${index}_0"><input type="radio" name="radio${index}" id="radio_${index}_0"> ${quizItem.o[0]}</li>

                    <li class="list-group-item" id="li_${index}_1"><input type="radio" name="radio${index}" id="radio_${index}_1"> ${quizItem.o[1]}</li>

                    <li class="list-group-item"  id="li_${index}_2"><input type="radio" name="radio${index}" id="radio_${index}_2"> ${quizItem.o[2]}</li>

                    <li class="list-group-item"  id="li_${index}_3"><input type="radio" name="radio${index}" id="radio_${index}_3"> ${quizItem.o[3]}</li>

                    </ul>
                    <div>&nbsp;</div>`;
      quizWrap.innerHTML = quizDisplay;
    });


  };

  btnSubmit = document.getElementById("btnSubmit");
  btnSubmit.addEventListener("click", function () {
    calculateScore();
    alert(`You got ${score} out of 5.`);
    quizWrap.style.pointerEvents = 'none';
    time.style.display= 'none';
  
  });

  // Calculate the score
  const calculateScore = () => {
    
    quizArray.map((quizItem, index) => {
      for (let i = 0; i < 4; i++) {
        //highlight the li if it is the correct answer
        let li = `li_${index}_${i}`;
        let r = `radio_${index}_${i}`;
        liElement = document.querySelector('#' + li);
        radioElement = document.querySelector('#' + r);

console.log(radioElement.checked);  // checking what this is (true/false if clicked)
console.log(quizItem.a)             // this returns  answer x4 (each question has 4  answer options)

        if (quizItem.a == i) {
        liElement.style.backgroundColor = 'lightGreen';
        }
        if (quizItem.a == radioElement.checked) {
          score++  // ??
        }
      }
    });
  };

  // call the displayQuiz function
  displayQuiz();
});

btnReset = document.getElementById("btnReset");
btnReset.addEventListener("click", function () {
  window.location.reload();
});
