const domandaElemento = document.getElementById("domanda");
const puzzle = document.getElementById("puzzle");
const keyboard = document.getElementById("keyboard");
const risolvi = document.getElementById("risolvi");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
const errore = document.getElementById("errore");
const sbagliato = document.getElementById("sbagliato");
const peccato = document.getElementById("peccato");

const domande = [
    {
        domanda: "Luogo della proposta:",
        frase: "CAPANNA GNIFFETTI SUL MONTE ROSA"
    },
    {
        domanda: "Luogo primo bacio:",
        frase: "AULA MAGNA DEL | DIPARTIMENTO | DI FISICA"
    }
];

let lettereScoperte = [];
let frase = "";
let domanda = "";
let domandaCorrente = 0;

function caricaDomanda() {
    domanda = domande[domandaCorrente].domanda;
    frase = domande[domandaCorrente].frase;
    lettereScoperte = [];
    domandaElemento.innerHTML = domanda;
    aggiornaPuzzle();
}


function aggiornaPuzzle() {
    puzzle.innerHTML = "";

    for (let carattere of frase) {

        if (carattere === "|") {
            const aCapo = document.createElement("div");
            aCapo.classList.add("aCapo");
            puzzle.appendChild(aCapo);

        } else if (carattere === " ") {
            const spazio = document.createElement("div");
            spazio.classList.add("spazio");
            puzzle.appendChild(spazio);

        } else {
            const casella = document.createElement("div");
            casella.classList.add("casella");

            if (lettereScoperte.includes(carattere)) {
                casella.innerHTML = carattere;
            }

            puzzle.appendChild(casella);
        }
    }
}


caricaDomanda();


//TASTIERA
for (let codice = 65; codice <= 90; codice++) {
    const lettera = String.fromCharCode(codice);
    const bottone = document.createElement("button");
    bottone.innerHTML = lettera;
    keyboard.appendChild(bottone);
    bottone.addEventListener("click", function() {
        // Evita di premere due volte la stessa lettera
        if (lettereScoperte.includes(lettera)) {
            return;
        }
        lettereScoperte.push(lettera);
        aggiornaPuzzle();
        // CONTROLLO SE LA LETTERA ESISTE
        if (!frase.includes(lettera)) {
            errore.style.display = "block";
            setTimeout(function() {
                errore.style.display = "none";
            }, 1000);
        }
    });
}


// RISOLVI
risolvi.addEventListener("click", function() {

    lettereScoperte = [...new Set(frase.replaceAll(" ", "").split(""))];

    aggiornaPuzzle();

});

// SOLUZIONE ERRATA
sbagliato.addEventListener("click", function() {

    peccato.style.display = "block";

    setTimeout(function() {
        peccato.style.display = "none";
    }, 2000);

});

// PROSSIMA DOMANDA
next.addEventListener("click", function() {

    domandaCorrente = domandaCorrente+1;
    caricaDomanda();
});

// PRECEDENTE DOMANDA
prev.addEventListener("click", function() {

    domandaCorrente = domandaCorrente-1;
    caricaDomanda();
});