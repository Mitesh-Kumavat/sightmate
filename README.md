# ![Banner](https://github.com/user-attachments/assets/a1493b84-e4e2-456e-a791-ce35ee2bcf2f)  
# 🚀 **SightMate – Your AI-Powered Companion for the Visually Impaired**

---

## 📌 Problem Statement

**Track:** *Problem Statement 1 – Weave AI Magic With Groq* 
-- 
Visually impaired individuals face significant challenges navigating public spaces, accessing information, and staying informed. SightMate solves this by combining vision, audio, and language models into an accessible AI-first platform.

---

## 🎯 Objective

SightMate is an AI-driven, voice-first assistant designed to empower blind and visually impaired individuals. It helps users with:

- Real-time road guidance  
- Document & currency reading  
- Personalized voice interactions  
- Artistic scene understanding  
- Daily news summaries  

Built using Groq’s ultra-fast LLM inference SightMate creates a truly **assistive and inclusive experience**.

---

## 🧠 Team & Approach

**👥 Team Name:** `Lucid Reapers`

| Name            | Role               | Links |
|-----------------|--------------------|-------|
| Mitesh Kumavat  | Backend Developer  | [GitHub](https://github.com/mitesh-kumavat) \| [LinkedIn](https://linkedin.com/in/mitesh-kumavat) |
| Shivangi Gohel  | Frontend Developer | [GitHub](https://github.com/shivangi-gohel) \| [LinkedIn](https://www.linkedin.com/in/shivangi-gohel-54339b330/) |

**Approach:**  
Blind people deserve a modern, reliable, voice-first experience that goes beyond basic OCR or TTS. SightMate combines powerful LLMs with real-time computer vision and speech processing to truly assist in daily life.

---

## 🛠️ Tech Stack

### 📦 Core Stack:
- **Frontend:** Next.js, TailwindCSS, ShadCN, Framer Motion  
- **Backend:** FastAPI (Python)  
- **Database:** SQLite  
- **Hosting:** Vercel (Frontend) + Render (Backend)

### ⚡ Sponsor Tech:
- ✅ **Groq:** Used for ultra-fast inference with:
    - `LLaVA` for image-based understanding
    - `Mixtral` for LLM-based Q&A
    - `TTS` for expressive voice generation  
- ⬜ Monad  
- ⬜ Fluvio  
- ⬜ Base  
- ⬜ Screenpipe  
- ⬜ Stellar  

---

## ✨ Key Features

### 🛣️ Real-Time Scene Monitoring & Road Guidance
- Live camera stream interpreted using LLaVA
- Alerts user with audio feedback about obstacles or road conditions  


### 📰 Daily News Summarizer
- Fetches real-time news
- Summarizes with Mixtral LLM  
- Reads out top headlines in seconds  

### 📄 Document & Handwriting Reader
- Users show documents to the camera
- Extracted, summarized, and read out loud

### 💰 Indian Currency Recognition
- Detects INR denominations
- Adds up total and reads out count

### 🎨 Artistic Scene Description
- AI describes camera view in poetic or creative style  
- Designed to create joyful interaction with the environment

---

## 📽️ Demo & Deliverables

- 🎥 **Demo Video:** *[YouTube](https://youtu.be/tH8MsqGeQG0)*  
- 📊 **Pitch Deck / Slides:** *[Google Slides](https://docs.google.com/presentation/d/1U4Ki8yHpmM3ZujWhDRVU6rX4RqyjUyUcjV9CdKI9oHI/edit?usp=sharing)*

---

## ✅ Submission Checklist

- ✅ Followed 2 social channels & filled the form  
- [ ] Shared badges and submitted Bonus Task 1 (2 pts)  
- ✅ Signed up for Sprint.dev & completed Bonus Task 2 (3 pts)  

---

## 🧪 How to Run the Project

###  Requirements
- Python ≥ 3.9  
- Node.js ≥ 18.x  
- Groq API Key  

## 🧱 Environment Setup

- Copy the `.env.sample` file to `.env` and add your Groq API key.
- Make sure your Groq API key has enough credits to run `playai-tts` model and  	`meta-llama/llama-4-scout-17b-16e-instruct`
model.

### Clone the repository
```bash
git clone https://github.com/mitesh-kumavat/sightmate
cd sightmate
```

### Backend Setup
- open a terminal and run the following commands:
```bash
pip install -r requirements.txt

# Start FastAPI backend
uvicorn app.main:app --reload
```

### Frontend Setup
- open a new terminal and run the following commands:
```bash
cd frontend
npm install
npm run dev
```

---

## 🌱 Future Scope

- 👓 Smart Glasses Integration (Raspberry Pi or ESP32 Cam)
- 🧭 Indoor Navigation with Beacons
- 📱 Android App with voice activation
- 🧑‍🤝‍🧑 SOS Caretaker Dashboard
- 🌐 Multi-language translation for regional adoption
- 🔍 Object Finder (e.g. “Find my keys”)

---

## 📎 Resources & Acknowledgements

- [Groq API](https://console.groq.com/)
- FastAPI, Uvicorn, SQLModel  
- Special thanks to mentors.

---

## 🏁 Final Words

> SightMate isn’t just a project — it’s a mission.  
> A mission to make the world more inclusive, one intelligent voice at a time.

With Groq’s lightning-fast models and thoughtful design, we’re redefining how visually impaired people experience the world — through **sound, intelligence, and care.**

---