import { getData } from "../utils/storage.js";

async function renderDashboard() {
    const stats = await getData();

    // -----------------------------
    // 1. CALCULATE TOTAL TIME + VISITS
    // -----------------------------
    let totalTime = 0;
    let totalVisits = 0;

    Object.values(stats).forEach(site => {
        totalTime += site.totalTime || 0;
        totalVisits += site.visits || 0;
    });

    document.getElementById("totalTime").textContent = totalTime + "s";
    document.getElementById("totalVisits").textContent = totalVisits;

    // -----------------------------
    // 2. POPULATE TOP SITES TABLE
    // -----------------------------
    const tableBody = document.getElementById("domainTable");
    tableBody.innerHTML = "";

    // convert stats object → array for sorting
    const sorted = Object.entries(stats)
        .sort((a, b) => b[1].totalTime - a[1].totalTime);

    if (sorted.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="3">No data yet</td></tr>`;
        return;
    }

    sorted.forEach(([domain, data]) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${domain}</td>
            <td>${data.totalTime || 0}</td>
            <td>${data.visits || 0}</td>
        `;

        tableBody.appendChild(row);
    });
}

// Run dashboard
renderDashboard();
