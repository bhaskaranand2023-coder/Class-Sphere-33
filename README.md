# ClassSphere — Full-Stack School Academic Platform

**One School. Every Classroom. One Connected Platform.**

A full-stack EdTech web application built with **Node.js + Express** (backend REST API with salted password hashing, token auth, and server-side classroom isolation) and **React + Tailwind CSS** (responsive SaaS frontend).

## Features
- **Real Server-Side Authentication:** Login and Sign Up with salted `scrypt` password hashing and Bearer token sessions.
- **Server-Enforced Classroom Isolation (RBAC):** Three independent classrooms (`5A`, `5B`, `12A`). Accessing an unauthorized classroom triggers a real `HTTP 403 Forbidden` response from the Express backend.
- **Live Synced Modules:** Notice Board, Assignments & Homework Tracker, Academic Doubt Forum, and Class Roster persisted in a JSON database (`data/database.json`).
- **Zero Hardcoded API Keys:** Safe to host in a public GitHub repository.

## Demo Accounts (Password: `demo123`)
| Role | Name | User ID | Class(es) |
| :--- | :--- | :--- | :--- |
| Student | Aarav Sharma | `student5a` | 5A |
| Student | Ananya Verma | `student5b` | 5B |
| Student | Rohan Kumar | `student12a` | 12A |
| Class Teacher | Priya Sharma | `teacher5a` | 5A |
| Subject Teacher | Rahul Mehta | `teacher` | 5B, 12A |

## Run Locally
```bash
npm install
npm start
```
Then open `http://localhost:3000`.
