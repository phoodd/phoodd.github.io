document.addEventListener('DOMContentLoaded', function () {
    const scoreElement = document.getElementById('score');
    const choicesContainer = document.getElementById('choices');
    const boxes = document.getElementById('boxes');

    const colorNamesInEstonian = {
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

    let score = 0;
    let choices;

    createBoxes();
    createChoices();
    boxes.addEventListener('dragover', dragOver);
    boxes.addEventListener('drop', drop);

    function createBoxes() {
        Object.keys(colorNamesInEstonian).forEach(color => {
            const box = createBox(color);
            boxes.appendChild(box);
        });
    }

    function createChoices() {
        choicesContainer.innerHTML = '';
        Object.keys(colorNamesInEstonian).forEach(color => {
            const choice = document.createElement('h4');
            choice.className = 'color-choice';
            choice.dataset.color = color;
            choice.textContent = colorNamesInEstonian[color];
            choice.addEventListener('dragstart', dragStart);
            choice.setAttribute('draggable', true);
            choicesContainer.appendChild(choice);
        });
        choices = document.querySelectorAll('.color-choice');
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
    
        if (box && checkCorrect(color, box)) {
            score++;
            updateScore();
            flashBackground('green', 500);
            const colorName = box.querySelector('.color-name');
            colorName.textContent = colorNamesInEstonian[color];
            colorName.style.visibility = 'visible'; 
    
            choices.forEach(choice => {
                if (choice.dataset.color === color) {
                    choice.remove();
                }
            });
    
            if (score === 10) {
                alert('Tubli! Tegite mÃ¤ngu Ã¤ra. Vajutage OK, et proovida uuesti.');
                resetGame();
            }
        } else {
            flashBackground('red', 500);
        }
    }

    function createBox(color = 'grey') {
        const box = document.createElement('div');
        box.className = 'box';
        box.style.backgroundColor = color;

        const colorName = document.createElement('div');
        colorName.className = 'color-name';
        colorName.textContent = colorNamesInEstonian[color];
        colorName.style.visibility = 'hidden';
        box.appendChild(colorName);

        return box;
    }

    function checkCorrect(color, box) {
        const expectedColor = box.style.backgroundColor;
        return color.toLowerCase() === expectedColor.toLowerCase();
    }

    function updateScore() {
        scoreElement.textContent = `${score}/10`;
    }

    function flashBackground(color, duration) {
        document.body.style.backgroundColor = color;
        setTimeout(() => {
            document.body.style.backgroundColor = '#f0f0f0';
        }, duration);
    }

    function resetGame() {
        score = 0;
        updateScore();
        createChoices();
        boxes.querySelectorAll('.color-name').forEach(colorName => {
            colorName.style.visibility = 'hidden';
        });
    }
});