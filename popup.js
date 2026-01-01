const badge = document.getElementById("statusBadge");
const cameraBtn = document.getElementById("cameraBtn");

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "FOCUS_UPDATE") {
    badge.textContent = message.level.toUpperCase();

    if (message.level === "low") {
      badge.classList.add("low");
    } else {
      badge.classList.remove("low");
    }
  }
});

cameraBtn.addEventListener("click", () => {
  chrome.runtime.sendMessage({ type: "START_CAMERA" });
  cameraBtn.textContent = "Camera Enabled";
});
