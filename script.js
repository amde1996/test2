document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const studentId = document.getElementById("student-id").value;
  const password = document.getElementById("password").value;

  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ studentId, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        document.querySelector(".login-container").style.display = "none";
        document.getElementById("score-container").style.display = "block";
        const scoresTable = document
          .getElementById("scores-table")
          .getElementsByTagName("tbody")[0];
        scoresTable.innerHTML = "";
        data.scores.forEach((score) => {
          const row = scoresTable.insertRow();
          const subjectCell = row.insertCell(0);
          const scoreCell = row.insertCell(1);
          subjectCell.textContent = score.subject;
          scoreCell.textContent = score.score;
        });
      } else {
        document.getElementById("login-error").textContent = data.message;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

function logout() {
  document.querySelector(".login-container").style.display = "block";
  document.getElementById("score-container").style.display = "none";
  document.getElementById("student-id").value = "";
  document.getElementById("password").value = "";
}
