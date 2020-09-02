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
    textarea: "text-area",
    hemingwayApp: '.hemingway-app',
    readability: '.readability',
    info: '.basic-info',
    activeClass: '.active',



};

//Initialization Function
const init = () => {
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
}

const empty = () => {
    document.querySelector(objectSelectors.wordCount).textContent = 0;
    document.querySelector(objectSelectors.letterCount).textContent = 0;
    document.querySelector(objectSelectors.sentenceCount).textContent = 0;
    document.querySelector(objectSelectors.characterCount).textContent = 0;
    document.querySelector(objectSelectors.paragraphCount).textContent = 0;
    document.querySelector(objectSelectors.readingTime).textContent = '0';
    document.querySelector(objectSelectors.grade).textContent = 'Before Grade 1';
};

const moveCaretToEnd = (eventElement) => {
    eventElement.focus();
    if (typeof eventElement.selectionStart == "number") {
        eventElement.selectionStart = eventElement.selectionEnd = eventElement.value.length;
    } else if (typeof eventElement.createTextRange != "undefined") {
        // why are you using `var` here? don't use var. Either `let` or `const`, as mentioned before, use `const` if you're not re-assigning the variable
        var range = eventElement.createTextRange();
        range.collapse(false);
        range.select();
    }
};

//CONFIGURATION VARIABLE
const WORDS_PER_MINUTE = 200;

init();

const generateButton = document.querySelector('.submit-btn');

//EVENT LISTENER FOR GENERATE WORD COUNT
generateButton.addEventListener('click', () => {
    //1. Get Input Value;
    const userInput = document.getElementById(objectSelectors.textarea).value;

    if (userInput !== '') {
        //2. Obtain Array of Words
        const arrayOfWords = userInput.match(/[\S ]/gi).join('').split(' ');

        //3. Generate number of Words, Letters, Sentences, Characters, Paragraphs
        //Words
        const wordsLength = arrayOfWords.length;

        //Letters
        const lettersLength = userInput.match(/[a-z]/gi).length;

        //Sentences (. ! ?)
        let sentencesLength = 0;
        if (!userInput.match(/[.!?]/g)) {
            sentencesLength = 0;
        } else {
            const sentencesLength = userInput.match(/[.!?]/g).length;
        };

        //Characters
        const charactersLength = userInput.match(/\S/g).length;

        //Paragraphs
        let paragraphsLength = 1;
        if (!userInput.match(/\n/g)) {
            paragraphsLength = 1;
        } else {
            paragraphsLength = userInput.match(/\n/g).length;
        };

        //Calculate Readability
        /*
        Formula = 0.0588 * L - 0.296 * S - 15.8
        Where L =  Average Number Of Letters Per 100 Words and S = Average number of letters per 100 words.
        */
        const averageOfLetters = Math.round((lettersLength / wordsLength) * 100);

        const averageOfSentences = Math.round((sentencesLength / wordsLength) * 100);

        const readability = Math.round((0.0588 * averageOfLetters) - (0.296 * averageOfSentences) - 15.8);

        //Reading Time 
        const readingTimeInSeconds = Math.round((wordsLength / WORDS_PER_MINUTE) * 60);

        if (readingTimeInSeconds > 0 && readingTimeInSeconds < 60) {
            const timeInSeconds = readingTimeInSeconds + ' Seconds';
            document.querySelector(objectSelectors.readingTime).textContent = timeInSeconds;
        } else if (readingTimeInSeconds >= 60 && readingTimeInSeconds < 3600) {
            const timeInMinutes = Math.round(readingTimeInSeconds / 60) + ' Minutes';
            document.querySelector(objectSelectors.readingTime).textContent = timeInMinutes;
        } else {
            const timeInHours = Math.round(readingTimeInSeconds / 3600) + ' Hours';
            document.querySelector(objectSelectors.readingTime).textContent = timeInHours;
        };

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
            document.querySelector(objectSelectors.grade).textContent = 'Postgraduate';
            document.querySelector(objectSelectors.grade).style.color = 'red';
            document.querySelector(objectSelectors.outlook).textContent = 'Poor. Aim for 11 - 14 ';
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

writeBtn.addEventListener('click', () => {
    //1. Hide Readability Scores
    document.querySelector(objectSelectors.hemingwayApp).style.visibility = 'hidden';
    document.querySelector(objectSelectors.readability).style.visibility = 'hidden';
    document.querySelector(objectSelectors.info).style.visibility = 'hidden';
    writeBtn.classList.toggle(objectSelectors.activeClass);
    editBtn.classList.toggle(objectSelectors.activeClass);

    //2. Focus On Text Area
    moveCaretToEnd(document.getElementById(objectSelectors.textarea));
});

//Edit Button
const editBtn = document.querySelector('.edit-btn');

editBtn.addEventListener('click', () => {
    //Display Readabily Scores
    document.querySelector(objectSelectors.hemingwayApp).style.visibility = 'visible';
    document.querySelector(objectSelectors.readability).style.visibility = 'visible';
    document.querySelector(objectSelectors.info).style.visibility = 'visible';
    writeBtn.classList.toggle(objectSelectors.activeClass);
    editBtn.classList.toggle(objectSelectors.activeClass);

    //Focus On Text Area
    moveCaretToEnd(document.getElementById(objectSelectors.textarea));
});