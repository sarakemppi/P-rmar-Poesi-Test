const words = [
  "noveller",
  "deckare",
  "klassiker",
  "poesi",
  "barnböcker",
  "fantasy",
  "biografier",
  "romaner",
];

const element = document.getElementById("changing-word");
const searchInput = document.querySelector(".search-input");
let wordIndex = 0;
let charIndex = 0;
let deleting = false;
let typingInterval;
let typingPaused = false;

function type() {
  const currentWord = words[wordIndex];

  if (!deleting) {
    element.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentWord.length) {
      deleting = true;
      setTimeout(type, 1500);
      return;
    }
  } else {
    element.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  const speed = deleting ? 60 : 100;
  typingInterval = setTimeout(type, speed);
}

type();

searchInput.addEventListener("input", function () {
  if (!typingPaused) {
    clearTimeout(typingInterval);
    typingPaused = true;
    element.textContent = "";
  }
});

searchInput.addEventListener("blur", function () {
  if (searchInput.value === "") {
    typingPaused = false;
    type();
  }
});
