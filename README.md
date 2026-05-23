# DevPulse – Internal Tech Issue & Feature Tracker

A collaborative platform for software teams to report bugs, suggest features, and coordinate issue resolution efficiently.

---

# 🚀 Live URL

Backend Live Link: https://dev-pulse-mm.vercel.app/

---

# 📌 Project Features

- User Registration & Login with JWT Authentication
- Role-based Authorization System
- Create Bug Reports & Feature Requests
- Update and Delete Issues
- Public Issue Browsing
- Filter & Sort Issues
- Secure Password Hashing with bcrypt
- PostgreSQL Database Integration
- Raw SQL Queries using pool.query()
- Centralized Error Handling
- Modular Express Architecture

---

# 🛠️ Technology Stack

| Technology | Note |
|---|---|
| Node.js | LTS runtime (24.x or higher) |
| TypeScript | Latest stable version |
| Express.js | Modular router architecture |
| PostgreSQL | Relational database using native pg driver |
| Raw SQL | Direct pool.query() calls only |
| bcrypt | Password hashing |
| jsonwebtoken | JWT authentication |

---

# 👥 User Roles & Permissions

## contributor
- Register and log in
- Create new issues
- View all issues

## maintainer
- All contributor permissions
- Update any issue
- Delete any issue
- Change issue workflow status
- Access internal system metrics

---

# 🔐 Authentication & Authorization

## JWT Flow

Client sends credentials → Server validates user → Password compared using bcrypt → JWT generated → Client sends token in Authorization header → Server verifies token before protected operations.

## Security Rules

- Passwords are hashed before storing
- Passwords are never returned in API responses
- Protected routes require valid JWT
- Role verification middleware protects privileged routes

---

# 🗄️ Database Schema Summary

## Table: users

| Field | Description |
|---|---|
| id | Auto-incrementing primary key |
| name | User full name |
| email | Unique email address |
| password | Hashed password |
| role | contributor or maintainer |
| created_at | Account creation timestamp |
| updated_at | Last update timestamp |

---

## Table: issues

| Field | Description |
|---|---|
| id | Auto-incrementing primary key |
| title | Issue title (max 150 chars) |
| description | Detailed issue description |
| type | bug or feature_request |
| status | open, in_progress, resolved |
| reporter_id | User ID of issue creator |
| created_at | Issue creation timestamp |
| updated_at | Last update timestamp |

---
