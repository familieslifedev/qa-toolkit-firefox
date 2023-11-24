import { initializeMessageListener, initializeInstallListener } from "~Services/Background/eventListeners";

console.log("background script loaded");

// Initialize Background Message Handler
initializeMessageListener();

// Initialize Context Menu Controller
initializeInstallListener();
