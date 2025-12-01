export async function getData() {
  return new Promise((resolve) => {
    chrome.storage.local.get(["stats"], (result) => {
      resolve(result.stats || {});
    });
  });
}

export async function saveData(data) {
  return new Promise((resolve) => {
    // data is the stats object
    chrome.storage.local.set({ stats: data }, () => resolve());
  });
}
