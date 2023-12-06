browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "youtubeVideoDetected") {

    browser.tabs.query({ active: true, currentWindow: true, url: "*://www.youtube.com/watch?v=*"}, (tabs) => {
      const currentTab = tabs[0];

      if (!currentTab) return;
      const videoId = new URLSearchParams(currentTab.url.split('?')[1]).get('v');
      if (videoId) {
        const embedLink = `https://www.youtube.com/embed/${videoId}`;
        browser.tabs.create({ url: embedLink, active: true, index: currentTab.index + 1 });
      }
    });
  }
});