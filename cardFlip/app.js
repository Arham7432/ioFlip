let cardsArray = [
    { 'name': "Google Cloud", 'img': "https://www.svgrepo.com/show/353805/google-cloud.svg" },
    { 'name': "Angular", 'img': "https://www.svgrepo.com/show/353396/angular-icon.svg" },
    { 'name': "ChatGPT", 'img': "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Microsoft_icon.svg/2048px-Microsoft_icon.svg.png" },
    { 'name': "GitKraken", 'img': "https://www.svgrepo.com/show/353784/gitkraken.svg" },
    { 'name': "Thor Icon", 'img': "https://miro.medium.com/v2/resize:fit:700/0*oRRpMJ9XqkRnYLhW.png" },
    { 'name': "GitHub", 'img': "https://www.svgrepo.com/show/439171/github.svg" },
];

const parentDiv = document.querySelector('#card-section');

let duplicArray = cardsArray.concat(cardsArray);
let shuffledChild = duplicArray.sort(() => 0.5 - Math.random());
let clicksCount = 0;
let firstCard = null;
let secondCard = null;

const card_matches = () => {
    document.querySelectorAll('.card.flip').forEach((curElm) => {
        curElm.classList.add('card-match');
    });
};

const resetGame = () => {
    firstCard = null;
    secondCard = null;
    clicksCount = 0;

    document.querySelectorAll('.card.flip:not(.card-match)').forEach((curElm) => {
        curElm.classList.remove('flip');
    });
};

parentDiv.addEventListener('click', (event) => {
    const curCard = event.target.closest('.card');
    if (!curCard || curCard.classList.contains('flip') || curCard.classList.contains('card-match')) return;

    clicksCount++;

    curCard.classList.add('flip');

    if (clicksCount === 1) {
        firstCard = curCard;
    } else if (clicksCount === 2) {
        secondCard = curCard;

        if (firstCard.dataset.name === secondCard.dataset.name) {
            setTimeout(() => {
                card_matches();
                resetGame();
            }, 1000);
        } else {
            setTimeout(() => {
                resetGame();
            }, 1000);
        }
    }
});

shuffledChild.forEach((item) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = item.name;

    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');

    const img = document.createElement('img');
    img.src = item.img;
    img.alt = item.name;

    cardBack.appendChild(img);
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    parentDiv.appendChild(card);
});

const restartBtn = document.querySelector("#restartBtn")

restartBtn.addEventListener('click', () => {
    window.location.reload()
})