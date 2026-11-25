# Class-Sphere
ClassSphere is a centralized school communication and academic management platform designed to replace fragmented WhatsApp groups. Built with React and Tailwind CSS, it features role-based classroom isolation, dedicated notice boards, assignment tracking, and interactive doubt forums for students and teachers.
# 🏫 ClassSphere (v0 Clickable Prototype)
### *One School. Every Classroom. One Connected Platform.*

![Program](https://img.shields.io/badge/Program-YIIC%209%20%C2%B7%20Week%202-6366f1?style=flat-square)
![Status](https://img.shields.io/badge/Status-v0%20Clickable%20Prototype-4f46e5?style=flat-square)
![Tech](https://img.shields.io/badge/Built%20With-React%20%2B%20Tailwind%20CSS-0ea5e9?style=flat-square)

Welcome to **ClassSphere**! 🚀 Built for **YIIC 9 (Week 2)**, this is a centralized school communication and academic management platform designed to replace messy, fragmented WhatsApp groups with one organized digital space for students and teachers.

> **⚠️ Honest Prototype Note:** ClassSphere is currently at **Version 0 (v0)**—a fully clickable end-to-end frontend prototype using sample data and browser `localStorage`. It is designed to test the core user flow before connecting a real cloud database in Session 3!

---

## 🎯 The Problem It Solves
Important school notices, assignment deadlines, and student doubts constantly get buried in noisy WhatsApp groups. **ClassSphere** gives every classroom its own dedicated, distraction-free space for announcements, homework, and academic Q&A.

---

## 📱 Core Screens & End-to-End Flow (No Dead Ends)

A user can click through the entire experience from start to finish using preloaded sample data:

1. **🏠 Screen 1 — Landing Page & Role-Based Login**
   * Introduces ClassSphere with **1-Click Instant Demo Preview** buttons and a standard login form (with masked password input and show/hide toggle).
2. **📊 Screen 2 — Classroom Dashboard & Notice Board**
   * Displays class-specific overview cards and announcements. Enforces **Classroom Isolation** across `Class 5A`, `Class 5B`, and `Class 12A` (clicking an unauthorized class triggers a simulated `HTTP 403 Access Denied` alert).
3. **📝 Screen 3 — Assignments & Doubt Forum**
   * Students can view homework, mark assignments as `✓ Completed`, and post subject doubts. Teachers can publish new notices/assignments and reply to student doubts live.

---

## 🔑 Try the Live Demo Accounts

All prototype accounts use the password: **`demo123`** *(demonstration only — not real school accounts)*.

| Role | Name | User ID | Assigned Classroom(s) |
| :--- | :--- | :--- | :--- |
| 👨‍🎓 Student | Aarav Sharma | `student5a` | Class 5A |
| 👩‍🎓 Student | Ananya Verma | `student5b` | Class 5B |
| 👨‍🎓 Student | Rohan Kumar | `student12a` | Class 12A |
| 👩‍🏫 Class Teacher | Priya Sharma | `teacher5a` | Class 5A |
| 👨‍🏫 Subject Teacher | Rahul Mehta | `teacher` | Class 5B & Class 12A |

---

## 🧪 User Testing & Iteration (v0 → Tested)
As part of Week 2 testing, this prototype was tested silently with **2 users** to catch real usability friction:
* **Key Insight:** Users initially hesitated on the login screen and weren't sure how classroom permissions worked without explanation.
* **Fix Shipped:** Added **1-Click Demo Access** pills, clear role labels, a conventional show/hide password toggle, and explicit `🔒` lock indicators with an instant `HTTP 403` feedback banner when clicking unauthorized classes.

---

## 🗄️ What the App Must Remember (Session 3 Database Plan)
Right now, changes persist locally in your browser via `localStorage`. In **Session 3 (v1)**, these exact data tables will move to a real cloud database:

* **Users:** Name, Email, Role (`student` / `teacher`), Assigned Class(es)
* **Notices:** Title, Description, Category, Priority, Class ID, Teacher Name, Date
* **Assignments:** Title, Subject, Instructions, Deadline, Class ID, Completed Student IDs
* **Doubts:** Question, Subject, Class ID, Student Name, Teacher Reply, Resolved Status

🔒 **Privacy Commitment:** ClassSphere intentionally avoids storing sensitive personal data like phone numbers or home addresses—only a name and email are needed for login.

---

## 🚀 How to Run It
* **On GitHub Pages:** Open the live GitHub Pages URL (enabled via `Settings → Pages → main branch`) in any desktop or mobile browser.
* **Locally:** Download `index.html` and double-click it to run directly in Chrome/Safari—no `npm install` or build tools needed!

---

## 🗺️ Progress Tracker

### ✅ Completed (v0)
- [x] Clickable end-to-end flow across 3 core screens with preloaded sample data
- [x] Role-based classroom isolation (`5A`, `5B`, `12A`) with `HTTP 403` guard
- [x] Interactive Notice Board, Assignments tracker, and Doubt Forum
- [x] `localStorage` persistence + responsive mobile/desktop UI
- [x] User testing with 2 testers & usability fix shipped

### 🚧 Under Process (Next Up — Session 3 / v1)
- [ ] Connect a real cloud database (Firebase / Supabase) for multi-device real-time sync
- [ ] Upgrade to server-side authentication and database-level access rules
- [ ] Add real PDF/image file uploads for homework submissions
- [ ] Package as an installable Progressive Web App (PWA) for mobile phones

---

## 👨‍💻 Built By
**Bhaskar Anand**  
*Developing ClassSphere step by step for YIIC 9.* 🌟
