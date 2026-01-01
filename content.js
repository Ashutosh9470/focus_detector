function notifyActivity() {
  chrome.runtime.sendMessage({ type: "USER_ACTIVE" });
}

// User interaction signals
["scroll", "mousemove", "keydown", "click"].forEach(event => {
  window.addEventListener(event, notifyActivity, { passive: true });
});

// Tab switch / minimize detection
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    chrome.runtime.sendMessage({
      type: "FOCUS_UPDATE",
      level: "low",
      reason: "tab_switch"
    });
    console.log("Tab switched → Focus LOW");
  }
});
