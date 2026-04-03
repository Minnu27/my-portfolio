const yearNode = document.getElementById("year");
if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

const form = document.querySelector(".contact-form");
const note = document.querySelector(".form-note");
if (form && note) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "there").trim();
    note.textContent = `Thanks ${name}, your message has been recorded locally.`;
    form.reset();
  });
}

if (typeof Chart !== "undefined") {
  const baseOptions = {
    plugins: {
      legend: { labels: { color: "#edf2ff" } },
    },
    scales: {
      x: { ticks: { color: "#edf2ff" }, grid: { color: "rgba(255,255,255,0.08)" } },
      y: { ticks: { color: "#edf2ff" }, grid: { color: "rgba(255,255,255,0.08)" } },
    },
  };

  const modelCanvas = document.getElementById("modelChart");
  if (modelCanvas) {
    new Chart(modelCanvas, {
      type: "bar",
      data: {
        labels: ["Baseline", "Model V1", "Model V2", "Model V3"],
        datasets: [
          {
            label: "Accuracy (%)",
            data: [78, 84, 89, 92],
            backgroundColor: ["#4f669d", "#6f89c8", "#90b4ff", "#c5d8ff"],
          },
        ],
      },
      options: baseOptions,
    });
  }

  const engagementCanvas = document.getElementById("engagementChart");
  if (engagementCanvas) {
    new Chart(engagementCanvas, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Portal Active Users",
            data: [420, 510, 590, 640, 710, 790],
            borderColor: "#90b4ff",
            backgroundColor: "rgba(144,180,255,0.2)",
            tension: 0.3,
            fill: true,
          },
        ],
      },
      options: baseOptions,
    });
  }
}
