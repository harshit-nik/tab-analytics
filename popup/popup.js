import { getData, saveData } from "../utils/storage.js";

async function loadStats() {
  const stats = await getData();
  const container = document.getElementById("stats");

  container.innerHTML = "";

  const domains = Object.keys(stats);

  if (domains.length === 0) {
    container.innerHTML = "<p>No browsing data yet.</p>";
    return;
  }

  domains.forEach((domain) => {
    const d = stats[domain];

    const element = document.createElement("p");
    element.innerHTML = `<strong>${domain}</strong> — ${d.totalTime}s (${d.visits} visits)`;

    container.appendChild(element);
  });
}
document.getElementById("openDashboard").addEventListener("click", () => {
  chrome.tabs.create({
    url: chrome.runtime.getURL("dashboard/dashboard.html"),
  });
});

document.getElementById("clear").addEventListener("click", async () => {
  await saveData({});
  loadStats();
});

loadStats();
