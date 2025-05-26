console.log("Just checking...");

const API_KEY = "fqoiAiKOJaEkG1kW/QDlVg==fkLxavWuIp7YIYgC";

const optiuniVot = [
  { id: "option_1", nume: "Cine sparge mai ușor aplicația?" },
  { id: "option_2", nume: "JavaScript când merge din prima" },
  { id: "option_3", nume: "CSS-ul perfect de la prima încercare" },
  { id: "option_4", nume: "Bug-ul care dispare când dai console.log()" },
  { id: "option_5", nume: "Framework-ul pe care îl învăț azi și uit mâine" },
];

const container = document.getElementById("voting-container");

function afiseazaOptiuni() {
  for (let i = 0; i < optiuniVot.length; i++) {
    let optiune = optiuniVot[i];

    let card = document.createElement("div");
    card.classList.add("voting-card");

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
    buton.addEventListener("click", () => {
      inregistreazaVot(optiune.id);
    });
    card.appendChild(buton);

    container.appendChild(card);
  }
  preiaVoturi();
}

function preiaVoturi() {
  for (let i = 0; i < optiuniVot.length; i++) {
    let optiune = optiuniVot[i];
    let url = `https://api.api-ninjas.com/v1/counter?id=${optiune.id}`;

    console.log("Trimit cerere către:", url);

    fetch(url, {
      method: "GET",
      headers: {
        "X-Api-Key": API_KEY,
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Eroare la răspunsul de la API");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Am primit date pentru", optiune.nume, ":", data);
        const pVoturi = document.getElementById("count-" + optiune.id);
        if (pVoturi) {
          pVoturi.textContent = "Voturi: " + data.value;
        } else {
          console.error("❌ Nu am găsit elementul <p> pentru", optiune.id);
        }
      })
      .catch((error) => {
        console.error("Eroare la preluarea voturilor:", error);
      });
  }
}

afiseazaOptiuni();

function inregistreazaVot(idOptiune) {
  const buton = document.getElementById("btn-" + idOptiune);
  const pargraf = document.getElementById("count-" + idOptiune);

  buton.disabled = true;
  buton.textContent = "Se încarcă...";

  const url = `https://api.api-ninjas.com/v1/counter?id=${idOptiune}&hit=true`;

  fetch(url, {
    method: "GET",
    headers: {
      "X-Api-Key": API_KEY,
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Eroare la votare");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Vot înregistrat pentru", idOptiune, "->", data);

      pargraf.textContent = "Voturi: " + data.value;
    })
    .catch((error) => {
      console.error("Eroare la trimiterea votului:", error);
      alert("A apărut o eroare. Încearcă din nou.");
    })
    .finally(() => {
      buton.disabled = false;
      buton.textContent = "Adaugă vot";
    });
}
