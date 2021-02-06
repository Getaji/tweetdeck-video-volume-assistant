import { browser } from "webextension-polyfill-ts";

let volume = 0.2;
let currentVideoElement = null;

browser.storage.sync
  .get("volume")
  .then((result) => (console.log(result), (volume = result.volume || 0.2)));

browser.runtime.onMessage.addListener((event) => {
  switch (event.type) {
    case "change-volume":
      volume = event.value;
      if (currentVideoElement) {
        currentVideoElement.volume = volume;
      }
      break;
  }
});

function setupVideoPlayer(video) {
  currentVideoElement = video;

  video.volume = volume;

  video.addEventListener("volumechange", () => {
    volume = video.volume;
    browser.storage.sync.set({ volume });
  });
}

function onModalNodeAdded(node) {
  if (node instanceof HTMLElement) {
    const video = node.querySelector("video");

    if (video) {
      setupVideoPlayer(video);
    }
  }
}

function onModalNodeRemoved(node) {
  currentVideoElement = null;
}

const modalObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    [...mutation.addedNodes].forEach(onModalNodeAdded);
    [...mutation.removedNodes].forEach(onModalNodeRemoved);
  });
});

/**
 * モーダルの管理要素 #open-modal が利用可能になった場合に呼び出される
 * @param {Node} node 追加されたモーダル管理要素
 */
function onReadyModal(node) {
  modalObserver.observe(node, { childList: true });
}

/**
 * ドキュメントに追加されたノードを処理する
 * @param {Node} node 追加されたノード
 */
function onDocumentNodeAdded(node) {
  if (node.id === "open-modal") {
    documentObserver.disconnect();
    onReadyModal(node);
  }
}

/**
 * ドキュメントの変更を監視する
 */
const documentObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    [...mutation.addedNodes].forEach(onDocumentNodeAdded);
    // [...mutation.removedNodes].forEach(onModalRemoved);
  });
});

documentObserver.observe(document, { subtree: true, childList: true });
