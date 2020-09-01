//Initialization Function
init();

//All Variables
// Don't declare your variables outside the scopes they will be needed. Variables must be declared under the scope they are used 
// so they can be available for garbage-collection and it's better in terms of security
// use `let` for variables you will constantly re-define and `const` for variables you will only define once.
// Const must be defined at the time of usage. ex: `you cannot do : const generateButton;` you must assign a value when defining it
let generateButton, userInput, arrayOfWords, words, letters, sentences, characters, paragraphs, readability, writeBtn, editBtn;

generateButton = document.querySelector('.submit-btn');

//EVENT LISTENER FOR GENERATE WORD COUNT
generateButton.addEventListener('click', function () {
    //1. Get Input Value;
    // Use const here: `userInput`
    userInput = document.getElementById('text-area').value;

    //2. Obtain Array of Words
    // use const here too: `arrayOfWords`
    arrayOfWords = userInput.match(/[\S ]/gi).join('').split(' ');

    //3. Generate number of Words, Letters, Sentences, Characters, Paragraphs

    //Words
    // Change this for something more meaningful , like `wordsLength` and use const too.
    words = arrayOfWords.length;

    //Letters
    // More meaningful too `lettersLength` & use const as well
    letters = userInput.match(/[a-z]/gi).length;

    //Sentences (. ! ?)
    // 
    if (userInput.match(/[.!?]/g).length === null) {
        // More meaning full 
        sentences = 0;
    } else {
        // More meaning full
        sentences = userInput.match(/[.!?]/g).length;
    };
    //Characters
    // More meaning full & use const as well
    characters = userInput.match(/\S/g).length;

    //Paragraphs
    // Don't use `=== null` in this case, use  `!` like
    // if(!userInput.match(/\n/g))
    // `!` means if not defined or if null in this case.
    if (userInput.match(/\n/g) === null) {
        // More meaning full 
        paragraphs = 0;
    } else {
        // More meaning full
        paragraphs = userInput.match(/\n/g).length;
    };

    //Calculate Readability
    // Use const as well here
    readability = Math.floor((0.0588 * letters) - (0.296 * sentences) - 15.8);

    //Display To The UI
    // extract these selectors into an object.
    // like
    // const objSelectors = { wordCount: ".word-count", letterCount: ".letter-count" };
    // then get them like : document.querySelector(objSelectors[wordCount])
    // this const object will have to go in the global scope (outside any function) because I see you call it from multiple functions...
    document.querySelector('.word-count').textContent = words;
    document.querySelector('.letter-count').textContent = letters;
    document.querySelector('.sentence-count').textContent = sentences;
    document.querySelector('.char-count').textContent = characters;
    document.querySelector('.par-count').textContent = paragraphs;

    //Readability
    // Too much repeated selectors for grade & outlook, extract them as well and put them into the `objSelectors` object I previously recommended
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
// use const here too
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
// use const here too
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

// change `el` to `elementEvent` : el is too vague, unreadable
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
    // Use the selectors you put in the global object you created previously with my recommendation, the `objSelectors` object.
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
