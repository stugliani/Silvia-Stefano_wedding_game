const domandaElemento = document.getElementById("domanda");
const puzzle = document.getElementById("puzzle");
const keyboard = document.getElementById("keyboard");
const risolvi = document.getElementById("risolvi");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
const errore = document.getElementById("errore");
const peccato = document.getElementById("peccato");
const corretto = document.getElementById("corretto");
const tentativo = document.getElementById("tentativo");
const rispostaInput = document.getElementById("rispostaInput");
const invia = document.getElementById("invia");
const annulla = document.getElementById("annulla");

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
    chiudiTentativo();
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


// Mostra un elemento per un certo tempo
function mostraTemporaneo(elemento, millisecondi) {
    elemento.style.display = "block";
    setTimeout(function() {
        elemento.style.display = "none";
    }, millisecondi);
}


// Normalizza un testo per il confronto:
// maiuscolo, senza accenti, senza spazi, senza "|" e punteggiatura
function normalizza(testo) {
    return testo
        .toUpperCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^A-Z0-9]/g, "");
}


function apriTentativo() {
    tentativo.style.display = "block";
    rispostaInput.value = "";
    rispostaInput.focus();
}

function chiudiTentativo() {
    tentativo.style.display = "none";
    rispostaInput.blur();
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
            mostraTemporaneo(errore, 1000);
        }
    });
}


// CONOSCI GLI SPOSI -> apre il campo di testo
risolvi.addEventListener("click", function() {
    if (tentativo.style.display === "block") {
        chiudiTentativo();
    } else {
        apriTentativo();
    }
});

// INVIA LA RISPOSTA
function controllaRisposta() {
    const risposta = normalizza(rispostaInput.value);

    if (risposta === "") {
        return;
    }

    chiudiTentativo();

    if (risposta === normalizza(frase)) {
        // CORRETTA: scopre tutta la frase e mostra la scritta
        lettereScoperte = [...new Set(frase.replaceAll(" ", "").replaceAll("|", "").split(""))];
        aggiornaPuzzle();
        mostraTemporaneo(corretto, 3000);
    } else {
        // SBAGLIATA: X rossa con AHI AHI AHI
        mostraTemporaneo(peccato, 2000);
    }
}

invia.addEventListener("click", controllaRisposta);

rispostaInput.addEventListener("keydown", function(evento) {
    if (evento.key === "Enter") {
        controllaRisposta();
    }
});

annulla.addEventListener("click", chiudiTentativo);


// PROSSIMA DOMANDA
next.addEventListener("click", function() {
    if (domandaCorrente < domande.length - 1) {
        domandaCorrente = domandaCorrente + 1;
    }
    caricaDomanda();
});

// PRECEDENTE DOMANDA
prev.addEventListener("click", function() {
    if (domandaCorrente > 0) {
        domandaCorrente = domandaCorrente - 1;
    }
    caricaDomanda();
});
