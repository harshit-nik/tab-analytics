// ----------------------------
// IMPORTS
// ----------------------------
import { getCurrentTime, diffSeconds } from "./utils/time.js";
import { getData, saveData } from "./utils/storage.js";

let activeTabId = null;
let activeStartTime = null;
let activeDomain = null;

console.log("Service Worker Loaded");


/* ----------------------------
   END PREVIOUS SESSION 
-----------------------------*/
async function endPreviousSession() {
  if (!activeDomain || !activeStartTime) return;

  
  const blockedDomains = ["newtab", "extensions", "services.google.com"];

  if (
    blockedDomains.includes(activeDomain) ||
    activeDomain.includes("chrome")
  ) {
    console.log("Blocked domain skipped:", activeDomain);
    return; 
  }

  const endTime = getCurrentTime();
  const timeSpent = diffSeconds(activeStartTime, endTime); 

  let stats = await getData();


  if (!stats[activeDomain]) {
    stats[activeDomain] = { totalTime: 0, visits: 0, byDate: {} };
  }

  stats[activeDomain].totalTime += timeSpent;
  stats[activeDomain].visits += 1;

  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const dateKey = `${yyyy}-${mm}-${dd}`;

  if (!stats[activeDomain].byDate) stats[activeDomain].byDate = {};
  if (!stats[activeDomain].byDate[dateKey]) stats[activeDomain].byDate[dateKey] = 0;
  stats[activeDomain].byDate[dateKey] += timeSpent;

  await saveData(stats);
  console.log("Saved session:", activeDomain, timeSpent, "s on", dateKey);
}



// ============================
// DOMAIN EXTRACTOR
// ============================
function extractDomain(url) {
  try {
    const host = new URL(url).hostname;

    
    if (
      url.startsWith("chrome://") ||
      url.startsWith("chrome-extension://")
    ) {
      return null;
    }

    return host;
  } catch (err) {
    return null; 
  }
}


// ============================
// TAB ACTIVATED EVENT
// ============================
chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  console.log("Tab Activated:", tabId);

  await endPreviousSession(); 

  chrome.tabs.get(tabId, (tab) => {
    if (!tab || !tab.url) return;

    activeTabId = tabId;
    activeStartTime = getCurrentTime();
    activeDomain = extractDomain(tab.url);

    console.log("Activated Domain:", activeDomain);
  });
});


// ============================
// URL UPDATED EVENT
// ============================
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (tabId !== activeTabId || !changeInfo.url) return;

  console.log("URL Updated:", changeInfo.url);

  await endPreviousSession(); 

  activeStartTime = getCurrentTime();
  activeDomain = extractDomain(changeInfo.url);

  console.log("Updated Domain:", activeDomain);
});


// ============================
// WINDOW FOCUS CHANGED
// ============================
chrome.windows.onFocusChanged.addListener(async (windowId) => {
  console.log("Window focus changed:", windowId);

  await endPreviousSession(); 

  if (windowId === chrome.windows.WINDOW_ID_NONE) {
  
    activeTabId = null;
    activeStartTime = null;
    activeDomain = null;
    return;
  }

  
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    if (!tabs || !tabs[0]) return;

    activeTabId = tabs[0].id;
    activeStartTime = getCurrentTime();
    activeDomain = extractDomain(tabs[0].url);

    console.log("Focus Domain:", activeDomain);
  });
});
