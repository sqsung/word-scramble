const wordText = document.querySelector('.word');
const hintText = document.querySelector('.hint span');
const timeText = document.querySelector('.time b')
const refreshBtn = document.querySelector('.refresh-word');
const checkBtn = document.querySelector('.check-word');
const inputField = document.querySelector('input');

let answer, timer;
let alreadyUsed = [];
let randomObj = '';

const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if (maxTime > 0) {
            maxTime--;
            return timeText.innerHTML = maxTime;
        }
        clearInterval(timer);
        alert(`Time out! ${answer.toUpperCase()} was the correct answer!`);
        initGame();
    }, 1000);
}

const initGame = () => {
    initTimer(30);
    if (alreadyUsed.length === 0) {
        randomObj = words[Math.floor(Math.random() * words.length)];
        let wordArr = randomObj.word.split('');
    } else {
        while (1) {
            randomObj = words[Math.floor(Math.random() * words.length)];
            let wordArr = randomObj.word.split('');

            if (!alreadyUsed.includes(randomObj.word)) break;
        }
    }
    
    console.log(randomObj);

    let wordArr = randomObj.word.split('');
    
    for(let i = wordArr.length; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); //getting random number
        let temp = wordArr[i];
        wordArr[i] = wordArr[j];
        wordArr[j] = temp;
    }

    wordText.innerHTML = wordArr.join('');
    hintText.innerHTML = randomObj.hint;
    answer = randomObj.word.toLowerCase();
    inputField.value = "";
    inputField.setAttribute('maxlength', answer.length);
}

initGame();

const checkWord = () => {
    let userSubmission = inputField.value.toLocaleLowerCase();
    if (!userSubmission) return alert (`Please enter a word to check!`);
    if (userSubmission !== answer) return alert(`${userSubmission.toUpperCase()} is not the answer!`);
    alert(`Awesome job! ${userSubmission.toUpperCase()} is the correct answer!`);
    alreadyUsed.push(answer);
    
    if (alreadyUsed.length === words.length) {
        return alert('Congrats! You have made it to the end!');
    }

    initGame();
}

refreshBtn.addEventListener('click', initGame);
checkBtn.addEventListener('click', checkWord);