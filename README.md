# #BuildHybridAI 2026: Hybrid Client Wrapper & Edge-Cloud Inference Engine

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Firebase AI Logic](https://img.shields.io/badge/Firebase-AI%20Logic-orange.svg)](https://firebase.google.com/docs/ai-logic/hybrid)
[![Platform: Web & Mobile](https://img.shields.io/badge/Platform-Web%20%7C%20Android%20%7C%20iOS-green.svg)](https://firebasehybridaihackathon.devpost.com/)

## 🎯 Overview
This project is an advanced client-side wrapper built for the Google **#BuildHybridAI 2026** hackathon. It demonstrates seamless hybrid inference capabilities by leveraging **Firebase AI Logic**—intelligently routing prompts between on-device models (such as Gemini Nano 4) for low-latency, private execution and cloud-based fallback models when handling complex computational demands.

---

## 🛠️ Architecture & Core Features
- **Hybrid Inference Engine**: Automatically detects local on-device AI capabilities (`window.ai` / Gemini Nano) and seamlessly falls back to cloud-hosted Gemini models via Firebase AI Logic.
- **Secure Authentication & App Check**: Integrated with Firebase Authentication (Anonymous/Custom) and App Check (reCAPTCHA v3) to protect backend resources from abuse.
- **Auditable State Tracking**: All execution interactions and mode switching telemetry are securely logged and synchronized via Cloud Firestore.

---

## 📂 Project Structure
```text
hybrid-ai-wrapper/
├── LICENSE                    # Apache 2.0 Open Source License
├── README.md                  # Project Documentation
├── firestore.rules            # Firestore Security Rules
├── package.json               # Dependencies and build scripts
└── src/
    ├── index.html             # Client UI Shell
    ├── app.js                 # Firebase Initialization & Event Handlers
    └── hybridEngine.js        # Hybrid Inference Routing Logic

# hybrid-ai-wrapper
Hybrid Client Wrapper &amp; Edge-Cloud Inference Engine for #BuildHybridAI 2026
