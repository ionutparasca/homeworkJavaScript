function getUserInfo() {
  let name = prompt("Introduceți numele dumneavoastră");
  let age = Number(prompt("Introduceți vârsta dumneavoastră"));
  let presence = confirm("Sunteți prezent?");

  return { name, age, presence };
}

let students = [];
let numberOfStudents = Number(prompt("Câți studenți doriți să introduceți?"));

for (let i = 0; i < numberOfStudents; i++) {
  let studentInfo = getUserInfo();
  students.push(studentInfo);
}

console.log("Lista studenților:", students);

function showAttendancePercentage(students) {
  if (students.length === 0) {
    alert("Nu există studenți înregistrați.");
    return;
  }

  let presentCount = students.filter((student) => student.presence).length;
  let percentage = (presentCount / students.length) * 100;

  alert(`Procentajul de prezență este: ${percentage.toFixed(2)}%`);
}

showAttendancePercentage(students);

function createTeams(numTeams, students) {
  let presentStudents = students.filter((student) => student.presence);

  if (presentStudents.length === 0) {
    console.log("Nu există studenți prezenți pentru a forma echipe.");
    return;
  }

  presentStudents.sort(() => Math.random() - 0.5);

  let teams = Array.from({ length: numTeams }, () => []);

  for (let i = 0; i < presentStudents.length; i++) {
    let teamIndex = i % numTeams;
    teams[teamIndex].push(presentStudents[i]);
  }

  teams.forEach((team, index) => {
    console.log(
      `Echipa ${index + 1}:`,
      team.map((student) => student.name).join(", ")
    );
  });
}

let numTeams = Number(prompt("Câte echipe doriți să formați?"));
createTeams(numTeams, students);
