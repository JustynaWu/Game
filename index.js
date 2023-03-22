class Hero {
  constructor(health, energy, mana) {
    this.health = health;
    this.energy = energy;
    this.mana = mana;
    this.attack();
    this.wait();
  }

  wait() {
    this.energy += 10;
  }

  attack() {
    const power = Math.floor(this.energy * Math.random());
    this.energy -= 30;

    return power;
  }

  defend() {
    this.energy -= 10;
    return Math.floor(Math.random() * 10);
  }

  hurt(points) {
    this.health -= points;

    if (this.health <= 0) {
      this.health = 0;
      goButton.classList.add("button-disabled");
    }
  }
}

class Paladin extends Hero {
  constructor(health, energy, mana) {
    super(health, energy, mana);
  }
}

class Magician extends Hero {
  constructor(health, energy, mana) {
    super(health, energy, mana);
  }

  wait() {
    this.mana += 10;
  }

  attack() {
    const power = Math.floor(this.mana * Math.random());
    this.mana -= 30;

    return power;
  }
}

// Create instances of heroes
const paladin = new Paladin(100, 100, 50);
const magician = new Magician(100, 50, 100);

// Getting HTML elements
const paladinHealth = document.querySelector("#paladinHealth");
const paladinEnergy = document.querySelector("#paladinEnergy");
const magicianHealth = document.querySelector("#magicianHealth");
const magicianMana = document.querySelector("#magicianMana");
const radioButtons = document.querySelectorAll("input[type=radio]");
const goButton = document.querySelector(".button-go");
const result = document.querySelector(".result");

// Updating hero stats
function updateStats() {
  paladinHealth.innerText = paladin.health;
  paladinEnergy.innerText = paladin.energy;
  magicianHealth.innerText = magician.health;
  magicianMana.innerText = magician.mana;
}

updateStats();

function playRound(hero1, hero2, hero1Action, hero2Action) {
  result.innerHTML = "";
  if (hero1Action === "wait") {
    hero1.wait();
  } else if (hero1Action === "attack") {
    const attack = hero1.attack();
    const defense = hero2.defend();

    if (attack > defense) {
      hero2.hurt(attack - defense);
    }
  } else if (hero1Action === "defend") {
    hero1.defend();
  }

  if (hero2Action === "wait") {
    hero2.wait();
  } else if (hero2Action === "attack") {
    const attack = hero2.attack();
    const defense = hero1.defend();
    if (attack > defense) {
      hero1.hurt(attack - defense);
    }
  } else if (hero2Action === "defend") {
    hero2.defend();
  }

  updateStats();

  if (hero1.health === 0) {
    result.innerHTML = "Magician won!";
  } else if (hero2.health === 0) {
    result.innerHTML = "Paladin won!";
  } else if (hero1.health === 0 && hero2.health === 0) {
    result.innerHTML = "There's a draw!";
  }
}

goButton.addEventListener("click", () => {
  const hero1Action = document.querySelector(
    'input[name="hero1-action"]:checked'
  ).value;
  const hero2Action = document.querySelector(
    'input[name="hero2-action"]:checked'
  ).value;

  playRound(paladin, magician, hero1Action, hero2Action);
});
