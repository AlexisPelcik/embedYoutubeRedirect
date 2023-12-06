// content.js

let previousUrl = window.location.href;

console.log("embed redirect content script loaded.");

const observer = new MutationObserver(function(mutations) {
  if (previousUrl === window.location.href) return;
  previousUrl = window.location.href;
  browser.runtime.sendMessage({ action: "youtubeVideoDetected" });
});

const config = { childList: true, subtree: true };
const targetNode = document.body;

observer.observe(targetNode, config);

if (window.location.href.includes("youtube.com/watch")) {
  observer.observe(targetNode, config);
  browser.runtime.sendMessage({ action: "youtubeVideoDetected" });
}

