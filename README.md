#-----Tab Analytics — Chrome Extension

A smart browser time-tracking extension built for productivity.

#-----Overview

Tab Analytics is a lightweight Chrome extension that tracks how much time you spend on websites and provides a clean overview of total time and visits.
Perfect for students, developers, and anyone who wants to manage digital productivity.

#-----Features

Tracks time spent per domain in real time

Counts number of visits per website

Maintains daily usage history (date-wise)

Dashboard provides a quick overview

Export data as CSV

One-click Clear Data

Works fully offline — data stored in chrome.storage.local

#-----Project Structure
TAB-ANALYTICS/
├── manifest.json
├── background.js
├── popup/
│   ├── popup.html
│   └── popup.js
├── dashboard/
│   ├── dashboard.html
│   ├── dashboard.js
│   └── dashboard.css
└── utils/
    ├── storage.js
    └── time.js

#-----Tech Stack

JavaScript (ES6)

Chrome Extensions API

HTML + CSS

#-----Installation (Developer Mode)

Clone or download the repository

Open Chrome → chrome://extensions/

Enable Developer Mode

Click Load Unpacked → Select project folder

The extension will load instantly.

#-----How It Works

background.js → Monitors active tab and updates time every second

storage.js → Saves domain → time, visits, and date-wise stats

dashboard.js → Builds tables and overview dashboard

popup.js → Shows quick stats and opens dashboard

#-----License — MIT License

Open-sourced under MIT License for free public and developer use.

Anyone can use the code

Anyone can modify it

Anyone can redistribute it

No legal responsibility.

