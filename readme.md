📄 README for Task Pilot
# 🛩️ Task Pilot

A full-featured Task Management Backend (Trello-like system) built using Node.js, Express, and MongoDB.

Task Pilot allows users to collaborate in teams, create boards, manage tasks, and control access using role-based permissions.

---

## 🚀 Features

### 🔐 Authentication
- User registration & login
- JWT-based authentication
- Protected routes

### 👥 Team Management
- Create teams
- Invite users via unique invite code
- Join teams
- Role-based access (Admin / Member)

### 📊 Board System
- Create boards inside teams
- Admin-only board creation
- Fetch boards by team

### ✅ Task Management
- Create tasks inside boards
- Assign tasks to team members
- Update task status (todo → in-progress → done)
- Update task details
- Delete tasks

### 🔐 Authorization (RBAC)
- Admin controls boards
- Members can create & manage tasks
- Only assigned user or creator can update tasks
- Only admin/creator can delete tasks

---

## 🧱 Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Cookie Parser

---

## 📂 Project Structure


src/
│
├── controllers/
├── models/
├── routes/
├── middleware/
├── db/
└── app.js


---

## 🔗 API Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout

### Teams
- POST /api/teams
- POST /api/teams/join
- GET /api/teams

### Boards
- POST /api/boards
- GET /api/boards/:teamId

### Tasks
- POST /api/tasks
- GET /api/tasks/:boardId
- PUT /api/tasks/:taskId/assign
- PUT /api/tasks/:taskId/status
- PUT /api/tasks/:taskId
- DELETE /api/tasks/:taskId

---

## 🔄 Workflow

User → Team → Board → Task

- Users join teams  
- Teams contain boards  
- Boards contain tasks  
- Tasks are assigned to team members  

---

## 🧠 Key Concepts Implemented

- RESTful API design
- Role-Based Access Control (RBAC)
- MongoDB relationships (Embedding + Referencing)
- Authentication & Authorization
- Scalable backend architecture

---

## 🛠️ Setup Instructions

```bash
# Clone repo
git clone https://github.com/sunnyrawal/task-pilot.git

# Install dependencies
npm install

# Create .env file
JWT_SECRET=your_secret
MONGO_URI=your_uri

# Run server
npm run dev

📌 Future Improvements

Task comments
Priority levels
Due date filters
Notifications system



🙌 Author

Built with ❤️ by Shani


