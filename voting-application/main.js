console.log("Just checking...");

const optiuniVot = [
  {
    id: "option_1",
    nume: "Cine sparge mai ușor aplicația?",
  },
  {
    id: "option_2",
    nume: "JavaScript când merge din prima",
  },
  {
    id: "option_3",
    nume: "CSS-ul perfect de la prima încercare",
  },
  {
    id: "option_4",
    nume: "Bug-ul care dispare când dai console.log()",
  },
  {
    id: "option_5",
    nume: "Framework-ul pe care îl învăț azi și uit mâine",
  },
];

const container = document.getElementById("voting-container");

function afiseazaOptiuni() {
  for (let i = 0; i < optiuniVot.length; i++) {
    let optiune = optiuniVot[i];

    let card = document.createElement("div");
    card.classList.add("voting-card");
    container.appendChild(card);

    let titlu = document.createElement("h3");
    titlu.textContent = optiune.nume;
    card.appendChild(titlu);

    let voturi = document.createElement("p");
    voturi.textContent = "Voturi: ...";
    voturi.id = "count-" + optiune.id;
    card.appendChild(voturi);

    let buton = document.createElement("button");
    buton.textContent = "Adaugă vot";
    buton.id = "btn-" + optiune.id;
    card.appendChild(buton);
  }
}

afiseazaOptiuni();
