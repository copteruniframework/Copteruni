const elName = document.getElementById("myName");
const btnOk = document.getElementById("btnOk");

let myName = "mE";
let myAge = 37;
let isStudent = true;

let message = myName + " ist " + myAge + " Jahre alt.";

elName.innerText = message;

let punkte = 69;
let sollPunkte = 100;

if (punkte >= sollPunkte) {
  console.log(punkte + ">=" + sollPunkte);
} else {
  console.log(punkte + "<" + sollPunkte);
}

punkte >= sollPunkte
  ? console.log(punkte + ">=" + sollPunkte)
  : console.log(punkte + "<" + sollPunkte);

// console.log("elName: " + typeof elName);
// console.log("myName: " + typeof myName);
// console.log("myAge: " + typeof myAge);
// console.log("isStudent: " + typeof isStudent);
// console.log(message);

nameAndAge(myName, myAge);

function nameAndAge(name, age) {
  console.log(name + age);
}

lowerOrHigher(6, 5);

function lowerOrHigher(no1, no2) {
  no1 >= no2 ? console.log(no1 + ">=" + no2) : console.log(no1 + "<" + no2);
}

let tiere = ["Hund", "Katze", "Maus"];

let zahlen = [1, 2, 3];
for (let i = 0; i < zahlen.length; i++) {
  // console.log("Index " + i + ": " + zahlen[i]);
}

// for (Initialisierung; Bedingung; Schritt) {
//   // Code, der bei jedem Durchlauf ausgeführt wird
// }

for (let i = 0; i <= 10; i++) {
  // console.log(i);
}

// for (let element of array) {
//   // Zugriff auf jedes Element im Array
// }
for (let tier of tiere) {
  console.log(tier);
}

function printTypeOf(input) {
  console.log("Type: " + typeof input);
}

// while (Bedingung) {
//   // Code wird ausgeführt, solange die Bedingung true ist
// }

let person = {
  name: "Max",
  alter: 30,
  istStudent: false,
  begruessung: function () {
    console.log("Hallo, ich heiße " + this.name);
  },
};

console.log(person.name); // Ausgabe: Max
console.log(person["alter"]); // Ausgabe: 30
person.begruessung(); // Ausgabe: Hallo, ich heiße Max

let auto = {
  marke: "Tesla",
  modell: "Model 3",
  baujahr: 2022,
  beschreibung() {
    console.log(this.marke);
  },
};

let autos = [
  { marke: "Tesla", modell: "Model 3", baujahr: 2022 },
  { marke: "Audi", modell: "A4", baujahr: 2016 },
];

let personen = [
  { name: "Jan", auto: autos[0] },
  { name: "Max", auto: autos[1] },
];

auto.beschreibung();
printTypeOf(auto.baujahr);

auto.marke = "Audi";

auto.beschreibung();

console.log(personen[0].name + personen[0].auto.marke);
console.log(personen[0].auto.marke);

btnOk.addEventListener("click", () => {
  elName.innerText = "Du hast geklickt!";
});

btnOk.addEventListener("mouseenter", () => {
  btnOk.style.backgroundColor = "red";
});

btnOk.addEventListener("mouseleave", () => {
  btnOk.style.backgroundColor = "";
});

// Formular
let myForm = document.getElementById("myForm");
