export function getCurrentTime() {
  return Date.now();
}

// returns seconds between two timestamps
export function diffSeconds(start, end) {
  return Math.floor((end - start) / 1000);
}
