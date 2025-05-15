# 🍽️ Restaurant Management System — Full Stack

A complete restaurant management platform built with React (Frontend), .NET Web API (Backend), and FastAPI (AI Microservice). The system supports multi-role access (Admin, Restaurant Manager, Customer) and uses an AI-powered summarization service for customer reviews.

---

## 🔧 Technologies Used

- 🧠 AI: FastAPI + Hugging Face (`facebook/bart-large-cnn`)
- 🖥️ Frontend: React.js, React Router, Context API
- ⚙️ Backend: .NET 8 Web API, EF Core, JWT, Role-based Auth, SMTP, SignalR (WebSocket)
- 🛢️ Database: SQL Server
- 🧪 Testing: Swagger / Postman
- 📡 Communication: REST API, WebSocket
- 🛡️ Security: JWT + Role-based Authorization

---

## 👤 System Roles & Features

### Admin
- Login/Logout
- Approve / reject / manage restaurants
- CRUD categories (Appetizers, Main Course…)
- Manage reservations and orders
- Handle customer support

### Restaurant Manager
- Login/Logout
- Manage menu (CRUD items)
- View, accept, reject orders & reservations
- Monitor seating capacity

### Customer
- Register/Login/Logout
- Browse menus & search dishes
- Place and track orders
- Book/reschedule/cancel table reservations
- Submit reviews & ratings

---

## 🧠 AI Review Summarization (Microservice)

Built with FastAPI and uses `facebook/bart-large-cnn` to summarize reviews.

# Clone
git clone https://github.com/Mohamed-0-Turki/restaurant-review-summarizer.git
cd restaurant-review-summarizer

# Virtual Environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install
pip install fastapi uvicorn transformers torch

# Run
uvicorn main:app --reload

Docs:

Swagger: http://localhost:8000/docs

ReDoc: http://localhost:8000/redoc

🧩 React Frontend Setup
# Clone
git clone https://github.com/Mohamed-0-Turki/restaurant-management-system.git
cd restaurant-management-system

# Install deps
npm install

# Run development server
npm run dev

📁 Frontend Structure

├── public
├── src
│   ├── assets
│   ├── components
│   ├── config
│   ├── hooks
│   ├── pages
│   ├── router
│   ├── services
│   ├── utils
│   ├── validation
│   └── main.jsx

⚙️ .NET Backend Setup
Prerequisites:
.NET 8 SDK

SQL Server running

SMTP credentials for mail

JWT Secret in appsettings

# 1. Clone the backend project
git clone https://github.com/YOUR_NAME/restaurant-api.git
cd restaurant-api

# 2. Configure connection string + JWT + SMTP in appsettings.json

# 3. Apply EF Core migrations (if using)
dotnet ef database update

# 4. Run the server
dotnet run


🧪 API Docs
Once running:

Swagger: http://localhost:5135/swagger/index.html


📡 Environment Variables
Create .env or set variables for:

JWT_SECRET

SMTP_USER

SMTP_PASS

AI_SERVICE_URL (e.g., http://localhost:8000)

🔄 Real-Time Support (SignalR)
WebSocket for chat and live order status (Customer ↔ Manager)


