//Selectors Object
const objectSelectors = {
    wordCount: '.word-count',
    letterCount: '.letter-count',
    sentenceCount: '.sentence-count',
    characterCount: '.char-count',
    paragraphCount: '.par-count',
    readingTime: '.reading-time',
    grade: '.grade',
    outlook: '.outlook',
    textarea: "text-area"
};

//Initialization Function
// Put the function init on top of this. In fact, put ALL YOUR FUNCTIONS (init, moveCaretToEnd, empty) below `objectSelectors`.
// The reasons behind this is that you should have your functions on top of your usage.
// If you don't do that, you may get errors anytime for declaration something like "You can't access a function before it's declared".
init();

const generateButton = document.querySelector('.submit-btn');

//EVENT LISTENER FOR GENERATE WORD COUNT
// Lets move this function to ES6. ES5 is very old and you should not use it, it's pretty bad
// ES6: () => {} 
// ex: generateButton.addEventListener('click', () => {.................});
generateButton.addEventListener('click', function () {

    // Do we even need many `let`? I'm seeing a lot of variables that are used only for declaration and not modification like `charactersLength` (i may be looking wrong), but if your variables
    // are only for declaration and usage then use a const. Use let strictly for variables that you will need to redefine.
    let wordsLength, sentencesLength, charactersLength, paragraphsLength;
    //1. Get Input Value;
    const userInput = document.getElementById(objectSelectors.textarea).value;

    if (userInput !== '') {
        //2. Obtain Array of Words
        const arrayOfWords = userInput.match(/[\S ]/gi).join('').split(' ');

        //3. Generate number of Words, Letters, Sentences, Characters, Paragraphs
        //Words
        wordsLength = arrayOfWords.length;

        //Letters
        lettersLength = userInput.match(/[a-z]/gi).length;

        //Sentences (. ! ?)
        if (!userInput.match(/[.!?]/g)) {
            sentencesLength = 0;
        } else {
            sentencesLength = userInput.match(/[.!?]/g).length;
        };

        //Characters
        charactersLength = userInput.match(/\S/g).length;

        //Paragraphs
        paragraphsLength = 1;
        if (!userInput.match(/\n/g)) {
            paragraphsLength = paragraphsLength;
        } else {
            paragraphsLength = userInput.match(/\n/g).length;
        };

        //Calculate Readability
        /*
        Formula = 0.0588 * L - 0.296 * S - 15.8
        Where L =  Average Number Of Letters Per 100 Words and S = Average number of letters per 100 words.
        */
        let averageOfLetters = Math.round((lettersLength / wordsLength) * 100);

        let averageOfSentences = Math.round((sentencesLength / wordsLength) * 100);

        const readability = Math.round((0.0588 * averageOfLetters) - (0.296 * averageOfSentences) - 15.8);

        //Reading Time 
        let timeInSeconds, timeInMinutes, timeInHours;

        // Move this to the main scope, and rename `WORDS_PER_MINUTE` so `const WORDS_PER_MINUTE` . 
        // This is because this is a configuration variable, configuration variable we write in upper case to indicate they are readonly
        // we also declare them in the main scope because they are configuration and may be needed in the future.
        const wordsPerMinute = 200;

        let readingTimeInSeconds = Math.round((wordsLength / wordsPerMinute) * 60);

        if (readingTimeInSeconds > 0 && readingTimeInSeconds < 60) {
            timeInSeconds = readingTimeInSeconds + ' Seconds';
            document.querySelector(objectSelectors.readingTime).textContent = timeInSeconds;
        } else if (readingTimeInSeconds >= 60 && readingTimeInSeconds < 3600) {
            timeInMinutes = Math.round(readingTimeInSeconds / 60) + ' Minutes';
            document.querySelector(objectSelectors.readingTime).textContent = timeInMinutes;
        } else {
            timeInHours = Math.round(readingTimeInSeconds / 3600) + ' Hours';
            document.querySelector(objectSelectors.readingTime).textContent = timeInHours;
        };


        console.log(averageOfLetters);
        console.log(averageOfSentences);
        console.log(readability);

        //Display To The UI
        document.querySelector(objectSelectors.wordCount).textContent = wordsLength;
        document.querySelector(objectSelectors.letterCount).textContent = lettersLength;
        document.querySelector(objectSelectors.sentenceCount).textContent = sentencesLength;
        document.querySelector(objectSelectors.characterCount).textContent = charactersLength;
        document.querySelector(objectSelectors.paragraphCount).textContent = paragraphsLength;

        //Readability
        if (readability < 0) {
            document.querySelector(objectSelectors.grade).textContent = 'Before Grade 1';
            document.querySelector(objectSelectors.grade).style.color = 'green';
            document.querySelector(objectSelectors.outlook).textContent = 'Good'
        } else if (readability > 0 && readability < 11) {
            document.querySelector(objectSelectors.grade).textContent = 'Grade ' + readability;
            document.querySelector(objectSelectors.grade).style.color = 'green';
            document.querySelector(objectSelectors.outlook).textContent = 'Good'
        } else if (readability >= 11 && readability < 14) {
            document.querySelector(objectSelectors.grade).textContent = 'Grade ' + readability;
            document.querySelector(objectSelectors.grade).style.color = 'tomato';
            document.querySelector(objectSelectors.outlook).textContent = 'Fair. Aim For ' + (readability - 1);
        } else {
            document.querySelector(objectSelectors.grade).textContent = 'Grade ' + readability;
            document.querySelector(objectSelectors.grade).style.color = 'red';
            document.querySelector(objectSelectors.outlook).textContent = 'Poor. Aim For ' + (readability - 1);
        };
    } else {
        //Set All To Zero
        empty();

        //Focus On Text Area
        document.getElementById(objectSelectors.textarea).focus();
    };
});

//Write Button
const writeBtn = document.querySelector('.write-btn');

// Why Are we not using `objectSelectors` for the selectors here ??
// Lets trasnform the function here to a ES6 Function as well
writeBtn.addEventListener('click', function () {
    //1. Hide Readability Scores
    document.querySelector('.hemingway-app').style.visibility = 'hidden';
    document.querySelector('.readability').style.visibility = 'hidden';
    document.querySelector('.basic-info').style.visibility = 'hidden';
    writeBtn.classList.toggle('active');
    editBtn.classList.toggle('active');

    //2. Focus On Text Area
    moveCaretToEnd(document.getElementById(objectSelectors.textarea));
});

//Edit Button

const editBtn = document.querySelector('.edit-btn');


// Why Are we not using `objectSelectors` for the selectors here ??
// ES6 FUNCTION
editBtn.addEventListener('click', function () {
    //Display Readabily Scores
    document.querySelector('.hemingway-app').style.visibility = 'visible';
    document.querySelector('.readability').style.visibility = 'visible';
    document.querySelector('.basic-info').style.visibility = 'visible';
    writeBtn.classList.toggle('active');
    editBtn.classList.toggle('active');

    //Focus On Text Area
    moveCaretToEnd(document.getElementById(objectSelectors.textarea));
});

// trasnform this into a es6 function as follows:
// const moveCaretToEnd = (eventElement) => { 
//  ........................................... 
// }
function moveCaretToEnd(eventElement) {
    eventElement.focus();
    if (typeof eventElement.selectionStart == "number") {
        eventElement.selectionStart = eventElement.selectionEnd = eventElement.value.length;
    } else if (typeof eventElement.createTextRange != "undefined") {
        // why are you using `var` here? don't use var. Either `let` or `const`, as mentioned before, use `const` if you're not re-assigning the variable
        var range = eventElement.createTextRange();
        range.collapse(false);
        range.select();
    }
}
// Transform into es6
function init() {
    document.querySelector(objectSelectors.wordCount).textContent = 6;
    document.querySelector(objectSelectors.letterCount).textContent = 22;
    document.querySelector(objectSelectors.sentenceCount).textContent = 1;
    document.querySelector(objectSelectors.characterCount).textContent = 23;
    document.querySelector(objectSelectors.paragraphCount).textContent = 0;
    document.querySelector(objectSelectors.readingTime).textContent = '2 Seconds';
    document.querySelector(objectSelectors.grade).textContent = 'Before Grade 1';
    moveCaretToEnd(document.getElementById(objectSelectors.textarea));

    //In Edit Mode By Default
    document.querySelector('.edit-btn').classList.add('active');
};
// Transform into es6
function empty() {
    document.querySelector(objectSelectors.wordCount).textContent = 0;
    document.querySelector(objectSelectors.letterCount).textContent = 0;
    document.querySelector(objectSelectors.sentenceCount).textContent = 0;
    document.querySelector(objectSelectors.characterCount).textContent = 0;
    document.querySelector(objectSelectors.paragraphCount).textContent = 0;
    document.querySelector(objectSelectors.readingTime).textContent = '0';
    document.querySelector(objectSelectors.grade).textContent = 'Before Grade 1';
}

// Remember moving your functions to the top, below `objectSelectors`
