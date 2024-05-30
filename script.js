document.addEventListener('DOMContentLoaded', function () {
    const scoreElement = document.getElementById('score');
    const choicesContainer = document.getElementById('choices');
    const boxes = document.getElementById('boxes');
    const levelPopup = document.getElementById('level-popup');
    const startLevel2Button = document.getElementById('start-level-2');

    const colorNamesInEstonianLevel1 = {
        'Green': 'Roheline',
        'Blue': 'Sinine',
        'Red': 'Punane',
        'Black': 'Must',
        'White': 'Valge',
        'Yellow': 'Kollane',
        'Orange': 'Oranz',
        'Pink': 'Roosa',
        'Purple': 'Lilla',
        'Cyan': 'Helesinine'
    };

    const colorNamesInEstonianLevel2 = {
        'Turquoise': 'Türkiis',
        'Olive': 'Oliiv',
        'Teal': 'Sinakasroheline',
        'Maroon': 'Kastanpruun',
        'Navy': 'Tumesinine',
        'Lime': 'Laimiroheline',
        'Coral': 'Korall',
        'Magenta': 'Magenta',
        'Beige': 'Beež',
        'Aqua': 'Akvamariin'
    };

    const boxColors = {
        'Green': '#00FF00',
        'Blue': '#0000FF',
        'Red': '#FF0000',
        'Black': '#000000',
        'White': '#FFFFFF',
        'Yellow': '#FFFF00',
        'Orange': '#FFA500',
        'Pink': '#FFC0CB',
        'Purple': '#800080',
        'Cyan': '#00FFFF',
        'Turquoise': '#40E0D0',
        'Olive': '#808000',
        'Teal': '#008080',
        'Maroon': '#800000',
        'Navy': '#000080',
        'Lime': '#00FF00',
        'Coral': '#FF7F50',
        'Magenta': '#FF00FF',
        'Beige': '#F5F5DC',
        'Aqua': '#00FFFF'
    };

    let score = 0;
    let choices;
    let currentLevel = 1;

    function createBoxes(colors) {
        boxes.innerHTML = '';
        Object.keys(colors).forEach(color => {
            const box = createBox(color);
            box.style.backgroundColor = boxColors[color];
            boxes.appendChild(box);
        });
    }

    function createChoices(colors) {
        choicesContainer.innerHTML = '';
        const shuffledColors = shuffleArray(Object.keys(colors));
        shuffledColors.forEach(color => {
            const choice = document.createElement('h4');
            choice.className = 'color-choice';
            choice.dataset.color = color;
            choice.textContent = colors[color];
            choice.addEventListener('dragstart', dragStart);
            choice.setAttribute('draggable', true);
            choicesContainer.appendChild(choice);
        });
        choices = document.querySelectorAll('.color-choice');
    }

    function createBox(color) {
        const box = document.createElement('div');
        box.className = 'box';
        box.dataset.color = color;
        const colorName = document.createElement('h4');
        colorName.className = 'color-name';
        colorName.style.visibility = 'hidden';
        box.appendChild(colorName);
        return box;
    }

    function dragStart(e) {
        const color = e.target.dataset.color;
        e.dataTransfer.setData('text/plain', color);
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function drop(e) {
        e.preventDefault();
        const color = e.dataTransfer.getData('text/plain');
        const box = e.target.closest('.box');
        const colorNames = currentLevel === 1 ? colorNamesInEstonianLevel1 : colorNamesInEstonianLevel2;
        if (box && checkCorrect(color, box, colorNames)) {
            score++;
            updateScore();
            flashBackground('green', 500);
            const colorName = box.querySelector('.color-name');
            colorName.textContent = colorNames[color];
            colorName.style.visibility = 'visible';
            choices.forEach(choice => {
                if (choice.dataset.color === color) {
                    choice.remove();
                }
            });
            if (score === 10) {
                if (currentLevel === 1) {
                    showLevelPopup();
                } else {
                    alert('Congratulations! You completed all levels!');
                }
            }
        } else {
            flashBackground('red', 500);
        }
    }

    function checkCorrect(color, box, colorNames) {
        return color === box.dataset.color;
    }

    function updateScore() {
        scoreElement.textContent = `${score}/10`;
    }

    function flashBackground(color, duration) {
        document.body.style.backgroundColor = color;
        setTimeout(() => {
            document.body.style.backgroundColor = '';
        }, duration);
    }

    function showLevelPopup() {
        levelPopup.classList.remove('hidden');
    }

    function startLevel2() {
        currentLevel = 2;
        score = 0;
        updateScore();
        levelPopup.classList.add('hidden');
        createBoxes(colorNamesInEstonianLevel2);
        createChoices(colorNamesInEstonianLevel2);
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    createBoxes(colorNamesInEstonianLevel1);
    createChoices(colorNamesInEstonianLevel1);
    boxes.addEventListener('dragover', dragOver);
    boxes.addEventListener('drop', drop);
    startLevel2Button.addEventListener('click', startLevel2);
});
