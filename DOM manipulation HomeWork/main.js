document.addEventListener("DOMContentLoaded", function () {
  const studentInput = document.getElementById("studentName");
  const addButton = document.getElementById("addStudent");
  const studentList = document.getElementById("studentList");
  const pickButton = document.getElementById("pickStudent");
  const selectedStudentDiv = document.getElementById("selectedStudent");

  let students = [];

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function addStudent() {
    const name = studentInput.value.trim();
    if (name === "") return;

    const color = getRandomColor();
    const avatarUrl = `https://api.dicebear.com/7.x/adventurer/svg?seed=${name}`;

    const student = { name, color, avatarUrl };
    students.push(student);
    renderStudentList();

    studentInput.value = "";
  }

  function renderStudentList() {
    studentList.innerHTML = "";

    students.forEach((student, index) => {
      const li = document.createElement("li");
      li.classList.add("student-item");

      const studentInfo = document.createElement("div");
      studentInfo.classList.add("student-info");

      const colorCircle = document.createElement("div");
      colorCircle.classList.add("color-circle");
      colorCircle.style.backgroundColor = student.color;

      const avatar = document.createElement("img");
      avatar.src = student.avatarUrl;
      avatar.alt = "Avatar";
      avatar.classList.add("avatar");

      const nameSpan = document.createElement("span");
      nameSpan.textContent = student.name;

      studentInfo.appendChild(colorCircle);
      studentInfo.appendChild(avatar);
      studentInfo.appendChild(nameSpan);

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("delete-btn");
      deleteButton.addEventListener("click", () => {
        students.splice(index, 1);
        renderStudentList();
      });

      li.appendChild(studentInfo);
      li.appendChild(deleteButton);
      studentList.appendChild(li);
    });
  }

  function pickRandomStudent() {
    if (students.length === 0) return;

    const randomIndex = Math.floor(Math.random() * students.length);
    const selectedStudent = students[randomIndex];

    selectedStudentDiv.innerHTML = `
            <h2>Selected Student</h2>
            <img src="${selectedStudent.avatarUrl}" class="avatar" style="border: 4px solid ${selectedStudent.color};">
            <p style="color: ${selectedStudent.color};">${selectedStudent.name}</p>
        `;
    selectedStudentDiv.classList.remove("hidden");
  }

  addButton.addEventListener("click", addStudent);
  pickButton.addEventListener("click", pickRandomStudent);
});
