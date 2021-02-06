import { browser } from "webextension-polyfill-ts";
import debounce from "debounce";

import "../styles/popup.scss";

function sendMessage(message) {
  browser.tabs
    .query({
      url: "https://tweetdeck.twitter.com/*",
    })
    .then((targetTabs) => {
      for (let tab of targetTabs) {
        console.log(tab);
        try {
          browser.tabs.sendMessage(tab.id, message);
        } catch (e) {
          console.error(e);
        }
      }
    });
}

function onChangeVolumeInput(event) {
  const volumeRaw = parseInt(event.target.value);

  if (isNaN(volumeRaw)) return;

  const volume = volumeRaw / 100;

  sendMessage({ type: "change-volume", value: volume });
}

document.addEventListener("DOMContentLoaded", () => {
  const elInputVolume = document.getElementById("volumeRange");

  browser.storage.sync
    .get("volume")
    .then((result) => (elInputVolume.value = result.volume * 100));

  elInputVolume.addEventListener("change", debounce(onChangeVolumeInput, 500));
});
