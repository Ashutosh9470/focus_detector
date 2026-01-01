let lastActivityTime = Date.now();
let currentFocus = "normal";
let cameraStream = null;

// Handle incoming signals
chrome.runtime.onMessage.addListener(async (message) => {
  if (message.type === "USER_ACTIVE") {
    lastActivityTime = Date.now();

    if (currentFocus === "low") {
      currentFocus = "normal";

      chrome.runtime.sendMessage({
        type: "FOCUS_UPDATE",
        level: "normal",
        reason: "user_returned"
      });

      console.log("User returned → Focus NORMAL");
    }
  }

  if (message.type === "FOCUS_UPDATE") {
    currentFocus = message.level;
    chrome.runtime.sendMessage(message);
  }

  if (message.type === "START_CAMERA") {
    if (cameraStream) return;

    try {
      cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
      console.log("Camera started");

      const track = cameraStream.getVideoTracks()[0];
      track.addEventListener("ended", () => {
        cameraStream = null;
        currentFocus = "low";

        chrome.runtime.sendMessage({
          type: "FOCUS_UPDATE",
          level: "low",
          reason: "camera_stopped"
        });

        console.log("Camera stopped → Focus LOW");
      });

    } catch (err) {
      console.error("Camera permission denied");
    }
  }
});


// Inactivity detector
setInterval(() => {
  const now = Date.now();
  if (now - lastActivityTime > 7000 && currentFocus !== "low") {
    currentFocus = "low";
    chrome.runtime.sendMessage({
      type: "FOCUS_UPDATE",
      level: "low",
      reason: "inactivity"
    });
    console.log("Inactivity → Focus LOW");
  }
}, 1000);
