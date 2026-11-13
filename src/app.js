// Import Firebase SDKs from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-check.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { executeHybridInference } from "./hybridEngine.js";

// Firebase Configuration (Replace with your project credentials)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize App Check (reCAPTCHA v3)
try {
    initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider('YOUR_RECAPTCHA_SITE_KEY'),
        isTokenAutoRefreshEnabled: true
    });
} catch (e) {
    console.warn("App Check initialization skipped or failed in local environment:", e);
}

// Authenticate user anonymously on load
signInAnonymously(auth)
    .then(() => {
        console.log("Authenticated anonymously for session telemetry.");
    })
    .catch((error) => {
        console.error("Auth error:", error);
    });

// UI Event Binding
document.getElementById("sendBtn").addEventListener("click", async () => {
    const promptInput = document.getElementById("promptInput").value.trim();
    const outputBox = document.getElementById("outputBox");

    if (!promptInput) {
        alert("Please enter a prompt first.");
        return;
    }

    outputBox.textContent = "Executing hybrid inference...";

    try {
        // Execute inference via Hybrid Engine (On-Device vs Cloud Fallback)
        const result = await executeHybridInference(promptInput);
        
        outputBox.textContent = `[Mode: ${result.mode.toUpperCase()}]\n\n${result.response}`;

        // Log telemetry and execution state to Cloud Firestore
        await addDoc(collection(db, "inference_logs"), {
            prompt: promptInput,
            response: result.response,
            mode: result.mode,
            timestamp: serverTimestamp()
        });

    } catch (error) {
        console.error("Execution error:", error);
        outputBox.textContent = `Error: ${error.message}`;
    }
});
