# 📊 Tab Analytics – Chrome Extension

A lightweight Chrome Extension that helps users track website usage, monitor browsing time, and analyze productivity through an interactive dashboard.

---

## 🚀 Features

- ⏱️ Tracks time spent on each website in real time
- 🌐 Counts total visits for every domain
- 📅 Maintains daily browsing history
- 📈 Interactive analytics dashboard
- 📂 Export browsing data as CSV
- 🗑️ One-click data reset
- 💾 Stores data locally using `chrome.storage.local`
- ⚡ Works completely offline

---

## 🛠️ Tech Stack

- JavaScript (ES6)
- HTML5
- CSS3
- Chrome Extensions API
- Chrome Storage API

---

## 📂 Project Structure

```text
TAB-ANALYTICS/
│
├── manifest.json
├── background.js
│
├── popup/
│   ├── popup.html
│   └── popup.js
│
├── dashboard/
│   ├── dashboard.html
│   ├── dashboard.js
│   └── dashboard.css
│
└── utils/
    ├── storage.js
    └── time.js
```

---

## ⚙️ Installation

1. Clone the repository

```bash
git clone https://github.com/harshit-nik/tab-analytics.git
```

2. Open Chrome

```
chrome://extensions
```

3. Enable **Developer Mode**

4. Click **Load unpacked**

5. Select the project folder

6. The extension is ready to use.

---

## 🧩 How It Works

- **background.js** → Tracks active tabs and updates browsing time.
- **storage.js** → Stores time, visits, and daily statistics.
- **popup.js** → Displays quick browsing statistics.
- **dashboard.js** → Generates analytics dashboard and CSV export.

---

## 💡 Future Improvements

- Weekly and Monthly Reports
- Productivity Score
- Website Categories
- Dark Mode
- Data Backup & Restore
- Browser Sync Support

---

## 📜 License

This project is licensed under the **MIT License**.
