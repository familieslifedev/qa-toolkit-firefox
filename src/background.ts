import { initializeMessageListener, initializeInstallListener } from "~Services/Background/eventListeners";

// Initialize Background Message Handler
initializeMessageListener();

// Initialize Context Menu Controller
initializeInstallListener();
