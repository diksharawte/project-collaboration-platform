# Project Collaboration Platform
A platform where people can post project ideas, find contributors based on skills, and track everyone's contributions — like GitHub for team-building, minus the code hosting.

## Problem It Solves
Finding teammates for personal or open-source projects is hard. Existing platforms either focus only on code (GitHub), only on hackathons (Devpost), or don't track contributions at all. This platform combines project discovery, collaboration requests, and contribution tracking in one place.

## Features
- **User Authentication** — Secure signup/login with token-based authentication
- **Project Posting** — Post project ideas with category, description, and status
- **Contribution Requests** — Users can request to join projects
- **Contributor Tracking** — Track who's officially part of which project and their role
- **Task Management** — Break down projects into trackable tasks

## Tech Stack
**Frontend:** React, Axios
**Backend:** Django, Django REST Framework
**Database:** MySQL
**Authentication:** Token-based Authentication (DRF)

## Architecture
## Database Models
- **Project** — Stores project ideas (title, description, category, status, owner)
- **ContributionRequest** — Tracks join requests (pending/accepted/rejected)
- **Contributor** — Stores officially accepted team members and their roles
- **Task** — Tracks project tasks and their status (todo/in-progress/done)

## Getting Started
### Backend Setup
```bash
cd p1
python -m venv venv
venv\Scripts\activate
pip install django djangorestframework mysqlclient django-cors-headers
python manage.py migrate
python manage.py runserver
```
### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
## API Endpoints
| Endpoint | Method | Description |
|---|---|---|
| `/api/signup/` | POST | Create a new user account |
| `/api/login/` | POST | Login and get auth token |
| `/api/projects/` | GET, POST | List all projects / Create a new project |
| `/api/requests/` | GET, POST | List all contribution requests / Send a request |
| `/api/contributors/` | GET, POST | List all contributors / Add a contributor |
| `/api/tasks/` | GET, POST | List all tasks / Create a task |

## Future Improvements
- Reputation/trust score for contributors
- Smart matching based on skills
- Real-time notifications
- Public contributor portfolio pages

## Author
Diksha Rawte