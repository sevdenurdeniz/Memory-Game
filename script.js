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
  //kart dizisini oluştur
  cards = [];
  for (let i = 0; i < 10; i++) {
    //20 tane kart oluşturur bu döngü
    const icon = icons[i % icons.length]; //döngü içinde tekrar tekrar kullanılsın
    const card1 = createCard(icon);
    const card2 = createCard(icon);
    cards.push(card1, card2);
  }

  // kartları karıştır
  shuffleCards(cards);

  // Oyun tahtasına kartları ekle
  gameBoard.innerHTML = "";
  cards.forEach((card) => gameBoard.appendChild(card));

  // dinleyiciler
  cards.forEach((card) => card.addEventListener("click", flipCard));
  restartButton.addEventListener("click", restartGame);

  // kartların ön yüzlerini dönük tut
  cards.forEach((card) => card.classList.add("flipped"));

  // 2 saniye sonra kartların arkasını döndür
  setTimeout(() => {
    cards.forEach((card) => {
      card.classList.remove("flipped");
      card.addEventListener("click", flipCard);
    });
  }, 2000);
}

function createCard(icon) {
  const card = document.createElement("div");
  card.classList.add("card", "col-lg-2", "col-12", "m-lg-3");

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
  for (let i = array.length - 1; i > 0; i--) {   
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function flipCard() {   
  if (
    flippedCards.length < 2 &&
    !this.classList.contains("flipped") &&      
    !this.classList.contains("matched")
  ) {
    this.classList.add("flipped");
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      const firstCard = flippedCards[0];
      const secondCard = flippedCards[1];

      if (firstCard.firstChild.src === secondCard.firstChild.src) {   //resimlerin yolu aynı ise matchle
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        matchedCards.push(firstCard, secondCard);
        flippedCards = [];

        if (matchedCards.length === cards.length) { //tüm kartlar eşleştiğinde
          endGame();
        }
      } else {
        setTimeout(() => {   //eşleşmeyenden classı sil
          firstCard.classList.remove("flipped");
          secondCard.classList.remove("flipped");
          flippedCards = [];
        }, 1000);
      }
    }
  }
}

//oyunu başlat tekrardan

function endGame() {
  cards.forEach((card) => card.removeEventListener("click", flipCard));
  restartButton.style.display = "block";
}

 function restartGame() {
  restartButton.style.display = "none";
  initializeGame();
} 
