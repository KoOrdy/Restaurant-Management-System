# 🍽️ Restaurant Management System — Full Stack


```bash
git clone https://github.com/KoOrdy/Restaurant-Management-System.git
cd Restaurant-Management-System
````

---

A complete restaurant management platform built with **React (Frontend)**, **.NET Web API (Backend)**, and **FastAPI (AI Microservice)**. The system supports multi-role access (Admin, Restaurant Manager, Customer) and uses an **AI-powered summarization service** for customer reviews.

---

## 🔧 Technologies Used

* 🧠 **AI**: FastAPI + Hugging Face `facebook/bart-large-cnn`
* 🖥️ **Frontend**: React.js, React Router, Context API
* ⚙️ **Backend**: .NET 8 Web API, EF Core, JWT, Role-based Auth, SMTP, SignalR (WebSocket)
* 🛢️ **Database**: SQL Server
* 🧪 **Testing**: Swagger / Postman
* 📡 **Communication**: REST API, WebSocket
* 🛡️ **Security**: JWT + Role-based Authorization

---

## 👥 System Roles & Features

### 👤 Admin

* Login / Logout
* Approve / Reject / Manage restaurant accounts
* CRUD food categories (Appetizers, Main Course, etc.)
* Manage reservations and orders
* Handle customer support requests

### 👨‍🍳 Restaurant Manager

* Login / Logout
* CRUD menu items (name, price, description, availability)
* View, accept, reject orders & table reservations
* Monitor seating capacity

### 🍴 Customer

* Register / Login / Logout
* Browse restaurant menus and search for dishes
* Place, track, or cancel orders
* Book, reschedule, or cancel table reservations
* Leave reviews and rate food/services

---

## 🧠 AI Review Summarization Microservice

Built with **FastAPI** and powered by `facebook/bart-large-cnn` for generating concise summaries of customer reviews.

### ⚙️ Setup

```bash
cd restaurant-review-summarizer

# Create virtual environment
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate

# Install dependencies
pip install fastapi uvicorn transformers torch

# Run server
uvicorn main:app --reload
```

### 📄 Docs

* Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)
* ReDoc: [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

## 🧩 React Frontend Setup

```bash
cd Restaurant_Management_System_Frontend

npm install
npm run dev
```

### 📁 Folder Structure

```
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
```

---

## ⚙️ .NET Backend Setup

### Prerequisites

* .NET 8 SDK
* SQL Server running
* SMTP credentials for emails
* JWT Secret configured

### Setup

```bash
cd Restaurant_Management_System_Backend

# Configure `appsettings.json`:
# - ConnectionStrings.DefaultConnection
# - JWT: Secret
# - SMTP: Host, Port, User, Pass
# - AIService: BaseUrl

# Apply database migrations
dotnet ef database update

# Run server
dotnet run
```

### 🔗 Swagger Docs

[http://localhost:5135/swagger/index.html](http://localhost:5135/swagger/index.html)

---

### 🗂️ Backend Folder Structure

```
├── Controllers
│   ├── AuthController.cs
│   ├── CategoryController.cs
│   ├── MenuItemController.cs
│   ├── ReservationController.cs
│   ├── OrderController.cs
│   ├── ReviewController.cs
│   └── ChatController.cs
│
├── Data
│   └── AppDbContext.cs
│
├── Dtos
│   ├── Auth
│   ├── Category
│   ├── MenuItem
│   ├── Reservation
│   ├── Order
│   ├── Review
│   └── Common
│
├── Helpers
│   ├── JwtHelper.cs
│   ├── ResponseHandler.cs
│   └── SMTPService.cs
│
├── Hubs
│   └── ChatHub.cs
│
├── Interfaces
│   ├── IAuthRepository.cs
│   ├── ICategoryRepository.cs
│   ├── IMenuItemRepository.cs
│   ├── IReservationRepository.cs
│   ├── IOrderRepository.cs
│   ├── IReviewRepository.cs
│   └── IChatRepository.cs
│
├── Middleware
│   └── ExceptionMiddleware.cs
│
├── Models
│   ├── User.cs
│   ├── Category.cs
│   ├── MenuItem.cs
│   ├── Reservation.cs
│   ├── Order.cs
│   ├── Review.cs
│   └── ChatMessage.cs
│
├── Repositories
│   ├── AuthRepository.cs
│   ├── CategoryRepository.cs
│   ├── MenuItemRepository.cs
│   ├── ReservationRepository.cs
│   ├── OrderRepository.cs
│   ├── ReviewRepository.cs
│   └── ChatRepository.cs
│
├── appsettings.json
├── Program.cs
└── Startup.cs
```

---

## 🌐 Environment Variables

Ensure the following are set:

```env
JWT_SECRET=your_jwt_secret
SMTP_USER=your_email_user
SMTP_PASS=your_email_password
AI_SERVICE_URL=http://localhost:8000
```

---

## 🔄 Real-Time Features (SignalR)

* Live chat between **Customer** and **Manager**
* Real-time updates for order status:
  *Pending → Preparing → Ready → Delivered*

---

## 🤝 Contribution

Feel free to fork, improve, and send pull requests. Contributions are more than welcome!

