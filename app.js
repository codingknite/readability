//Initialization Function
init();

//All Variables
let generateButton, userInput, arrayOfWords, words, letters, sentences, characters, paragraphs, readability, writeBtn, editBtn;

generateButton = document.querySelector('.submit-btn');

//EVENT LISTENER FOR GENERATE WORD COUNT
generateButton.addEventListener('click', function () {
    //1. Get Input Value;
    userInput = document.getElementById('text-area').value;

    //2. Obtain Array of Words
    arrayOfWords = userInput.match(/[\S ]/gi).join('').split(' ');

    //3. Generate number of Words, Letters, Sentences, Characters, Paragraphs

    //Words
    words = arrayOfWords.length;

    //Letters
    letters = userInput.match(/[a-z]/gi).length;

    //Sentences (. ! ?)
    if (userInput.match(/[.!?]/g).length === null) {
        sentences = 0;
    } else {
        sentences = userInput.match(/[.!?]/g).length;
    };
    //Characters
    characters = userInput.match(/\S/g).length;

    //Paragraphs
    if (userInput.match(/\n/g) === null) {
        paragraphs = 0;
    } else {
        paragraphs = userInput.match(/\n/g).length;
    };

    //Calculate Readability
    readability = Math.floor((0.0588 * letters) - (0.296 * sentences) - 15.8);

    //Display To The UI
    document.querySelector('.word-count').textContent = words;
    document.querySelector('.letter-count').textContent = letters;
    document.querySelector('.sentence-count').textContent = sentences;
    document.querySelector('.char-count').textContent = characters;
    document.querySelector('.par-count').textContent = paragraphs;

    //Readability
    if (readability > 14) {
        document.querySelector('.grade').textContent = 'Post-Graduate';
        document.querySelector('.grade').style.color = 'red';
        document.querySelector('.outlook').textContent = 'Poor. Aim for 14.'
    } else if (readability < 1) {
        document.querySelector('.grade').textContent = 'Before Grade 1';
        document.querySelector('.grade').style.color = 'green';
        document.querySelector('.outlook').textContent = "Good";
    } else if (readability > 1 && readability <= 7) {
        document.querySelector('.grade').textContent = 'Grade ' + readability;
        document.querySelector('.grade').style.color = 'green';
        document.querySelector('.outlook').textContent = 'Fair';
    } else {
        document.querySelector('.grade').textContent = 'Grade ' + readability;
        document.querySelector('.grade').style.color = 'green';
        document.querySelector('.outlook').textContent = 'Good';
    };
});

//Write Button
writeBtn = document.querySelector('.write-btn');

writeBtn.addEventListener('click', function () {
    //1. Hide Readability Scores
    document.querySelector('.hemingway-app').style.visibility = 'hidden';
    document.querySelector('.readability').style.visibility = 'hidden';
    document.querySelector('.basic-info').style.visibility = 'hidden';
    writeBtn.classList.toggle('active');
    editBtn.classList.toggle('active');

    //2. Focus On Text Area
    moveCaretToEnd(document.getElementById('text-area'));
});

//Edit Button
editBtn = document.querySelector('.edit-btn');

editBtn.addEventListener('click', function () {
    //Display Readabily Scores
    document.querySelector('.hemingway-app').style.visibility = 'visible';
    document.querySelector('.readability').style.visibility = 'visible';
    document.querySelector('.basic-info').style.visibility = 'visible';
    writeBtn.classList.toggle('active');
    editBtn.classList.toggle('active');

    //Focus On Text Area
    moveCaretToEnd(document.getElementById('text-area'));
})

function moveCaretToEnd(el) {
    el.focus();
    if (typeof el.selectionStart == "number") {
        el.selectionStart = el.selectionEnd = el.value.length;
    } else if (typeof el.createTextRange != "undefined") {
        var range = el.createTextRange();
        range.collapse(false);
        range.select();
    }
}

function init() {
    document.querySelector('.word-count').textContent = 6;
    document.querySelector('.letter-count').textContent = 22;
    document.querySelector('.sentence-count').textContent = 1;
    document.querySelector('.char-count').textContent = 23;
    document.querySelector('.par-count').textContent = 0;
    document.querySelector('.grade').textContent = 'Before Grade 1';
    moveCaretToEnd(document.getElementById('text-area'));

    //In Edit Mode By Default
    document.querySelector('.edit-btn').classList.add('active');
};