//resimleri diziye atıp kullanıcaz
const icons = [
  "cat-svgrepo-com.svg",
  "chameleon-svgrepo-com.svg",
  "deer-svgrepo-com.svg",
  "elephant-svgrepo-com.svg",
  "elk-svgrepo-com.svg",
  "frog-svgrepo-com.svg",
  "hippopotamus-svgrepo-com.svg",
  "horse-svgrepo-com.svg",
  "ostrich-svgrepo-com.svg",
  "parrot-svgrepo-com.svg",
  "rat-svgrepo-com.svg",
  "rhinoceros-svgrepo-com.svg",
  "seal-svgrepo-com.svg",
  "sloth-svgrepo-com.svg",
  "whale-svgrepo-com.svg",
];

let cards = [];
let flippedCards = [];
let matchedCards = [];

const gameBoard = document.getElementById("game-board");
const restartButton = document.getElementById("restart-button");

//oyunu başlat
initializeGame();

function initializeGame() {
  //butonu oyun bitene kadar gizle
  restartButton.style.display = "none";
  restartButton.removeEventListener("click", restartGame);

  //kart dizisini oluştur //random 10 dizi
  cards = [];
  const randomIcons = [];
  cards = shuffleCards(cards);
  while (randomIcons.length < 10) {
    const randomIndex = Math.floor(Math.random() * icons.length);
    const randomIcon = icons[randomIndex];

    if (!randomIcons.includes(randomIcon)) {
      randomIcons.push(randomIcon);
      const card1 = createCard(randomIcon);
      const card2 = createCard(randomIcon);
      cards.push(card1, card2);
    }
  }

  // kartları karıştır
  shuffleCards(cards);

  // Oyun tahtasına kartları ekle
  gameBoard.innerHTML = "";
  cards.forEach((card) => gameBoard.appendChild(card));

  // dinleyiciler
  cards.forEach((card) => card.addEventListener("click", flipCard));

  // kartların ön yüzlerini dönük tut
  cards.forEach((card) => card.classList.add("flipped"));

  // 2 saniye sonra kartların arkasını döndür
  setTimeout(() => {
    cards.forEach((card) => {
      card.classList.remove("flipped");
      card.addEventListener("click", flipCard);
    });
  }, 2000);

  matchedCards = [];
}

function createCard(icon) {
  const card = document.createElement("div");
  card.classList.add("card","col-2");

  const front = document.createElement("img");
  front.src = "icons/" + icon;
  front.alt = "Card";
  card.appendChild(front);

  /*const back = document.createElement("div");
  back.classList.add("card-back");
  card.appendChild(back);*/

  return card;
}

//kartları karıştırma döngüsü / iç içe döngü
function shuffleCards(array) {
  // Fisher--Yates Algorithm
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function flipCard() {
  if (
    flippedCards.length < 2 &&
    !this.classList.contains("flipped") &&
    !this.classList.contains("matched")
  ) {
    this.classList.add("flipped");
    flippedCards.push(this);
    //  kartlar açılma sesi
    var sesAc = new Audio("sounds/card.mp3");
    sesAc.play();

    if (flippedCards.length === 2) {
      const firstCard = flippedCards[0];
      const secondCard = flippedCards[1];

      if (firstCard.firstChild.src === secondCard.firstChild.src) {
        //resimlerin yolu aynı ise matchle
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        matchedCards.push(firstCard, secondCard);
        flippedCards = [];
        // doğru kart açılma sesi
        var sesDogru = new Audio("sounds/success.mp3");
        sesDogru.play();
        if (matchedCards.length === cards.length) {
          //tüm kartlar eşleştiğinde
          endGame();
          // tüm kartlar eşleşme sesi
          var sesBitti = new Audio("sounds/complete.mp3");
          sesBitti.play();
        }
      } else {
        setTimeout(() => {
          //eşleşmeyenden classı sil
          firstCard.classList.remove("flipped");
          secondCard.classList.remove("flipped");
          flippedCards = [];

          // yanlış kart
          var sesYanlis = new Audio("sounds/error.mp3");
          sesYanlis.play();
        }, 1500);
        setTimeout(() => {
          firstCard.classList.add("wrong-card");
          secondCard.classList.add("wrong-card");
        }, 1000);

        setTimeout(() => {
          //eşleşmeyenden classı sil
          firstCard.classList.remove("wrong-card");
          secondCard.classList.remove("wrong-card");
        }, 1800);
      }
    }
  }
}

//oyunu başlat tekrardan

function endGame() {
  cards.forEach((card) => card.removeEventListener("click", flipCard));
  restartButton.style.display = "block";
  restartButton.addEventListener("click", restartGame);
}

function restartGame() {
  initializeGame();
  restartButton.style.display = "none";
}

 

 