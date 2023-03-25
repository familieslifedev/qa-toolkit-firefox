import * as backgroundMessageHandler from "./Utils/backgroundMessageHandler"
export {}

console.log('background loaded');

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.type === "checkURL") {
//     fetch(request.url)
//       .then(response => {
//         if (response.status === 200) {
//           sendResponse({ success: true });
//           chrome.tabs.create({
//             url: request.url,
//           })
//         } else {
//           sendResponse({ success: false });
//         }
//       })
//       .catch(error => {
//         console.error(error);
//         sendResponse({ success: false });
//       });
//     return true;
//   }
// });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const handler = backgroundMessageHandler[request.type];
  if (handler) {
    handler(request, sender, sendResponse);
  } else {
    console.error("Unknown message type:", request.type);
  }
});
