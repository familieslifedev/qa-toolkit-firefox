import { initializeMessageListener, initializeInstallListener } from "~Services/Background/eventListeners";

console.log("Background script loaded successfully.");

// Initialize Background Message Handler
initializeMessageListener();

// Initialize Context Menu Controller
initializeInstallListener();
