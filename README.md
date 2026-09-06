# 🍎 Fruit Bazaar

<p align="center">
  <img src="https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=java" />
  <img src="https://img.shields.io/badge/Spring_Boot-3.x-green?style=for-the-badge&logo=springboot" />
  <img src="https://img.shields.io/badge/PostgreSQL-Database-blue?style=for-the-badge&logo=postgresql" />
  <img src="https://img.shields.io/badge/Render-Deployed-purple?style=for-the-badge&logo=render" />
  <img src="https://img.shields.io/github/stars/Jafars07/Fruit-Bazaar?style=for-the-badge" />
</p>

<p align="center">
  <b>A Full-Stack E-Commerce Platform for Fresh Fruit Ordering</b>
</p>

---

## 🌐 Live Demo

🔗 **Application URL**

https://fruit-bazaar.onrender.com

### Deployment Status

![Render](https://img.shields.io/badge/Status-Live-success?style=flat-square)

---

## 📖 Overview

Fruit Bazaar is a full-stack e-commerce web application developed to simplify the online purchase of fresh fruits.

The platform provides secure authentication, product browsing, cart management, order placement, and an administrative dashboard for managing products and customer orders.

This project demonstrates real-world experience in building scalable web applications using Java, Spring Boot, Hibernate, PostgreSQL, REST APIs, and cloud deployment.

---

## ✨ Features

### 👤 Customer Features

- 🔐 Secure User Registration & Login
- 📧 OTP-Based Email Verification
- 🔍 Search & Filter Products
- 🍎 Browse Fruits by Category
- 🛒 Add Products to Cart
- 📦 Place Orders
- 🌙 Dark / Light Theme
- 📱 Responsive Design
- 🔑 Forgot Password Functionality

### 🛠️ Admin Features

- 🔐 Secure Admin Authentication
- ➕ Add Products
- ✏️ Update Products
- ❌ Delete Products
- 📦 Inventory Management
- 📋 View Customer Orders
- 📊 Monitor Platform Activity

---

## 🏗️ System Architecture

```text
User
  │
  ▼
Frontend (HTML, CSS, JS, Bootstrap)
  │
  ▼
Spring Boot REST APIs
  │
  ▼
Hibernate / JPA
  │
  ▼
PostgreSQL Database
```

---

## 🛠️ Tech Stack

### Frontend

| Technology | Usage |
|------------|--------|
| HTML5 | Structure |
| CSS3 | Styling |
| JavaScript | Dynamic Functionality |
| Bootstrap | Responsive UI |

### Backend

| Technology | Usage |
|------------|--------|
| Java | Core Language |
| Spring Boot | Backend Framework |
| Spring MVC | Web Layer |
| Hibernate/JPA | ORM |
| REST APIs | Communication |

### Database

| Technology | Usage |
|------------|--------|
| PostgreSQL | Production Database |
| MySQL | Development Database |

### Cloud Services

| Service | Purpose |
|----------|----------|
| Render | Application Hosting |
| Supabase | PostgreSQL Hosting |
| Cloudinary | Image Storage |

### Tools

- Maven
- Git
- GitHub
- Postman
- IntelliJ IDEA
- Eclipse

---

## 📂 Project Structure

```text
Fruit-Bazaar
│
├── src
│   ├── main
│   │   ├── java
│   │   │   ├── Controller
│   │   │   ├── Service
│   │   │   ├── Repository
│   │   │   ├── Entity
│   │   │   └── Config
│   │   │
│   │   ├── resources
│   │   │   └── application.properties
│   │   │
│   │   └── static
│
├── pom.xml
├── README.md
└── images
```

---

## 🔐 Authentication Flow

```text
User Registration
        │
        ▼
Generate OTP
        │
        ▼
Send OTP via Email
        │
        ▼
Verify OTP
        │
        ▼
Create Account
```

---

## ⚙️ Installation & Setup

### Prerequisites

- Java 17+
- Maven
- PostgreSQL / MySQL
- Git

---

### Clone Repository

```bash
git clone https://github.com/Jafars07/Fruit-Bazaar.git
cd Fruit-Bazaar
```

### Create Database

```sql
CREATE DATABASE fruit_bazaar;
```

### Configure Database

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/fruit_bazaar

spring.datasource.username=your_username

spring.datasource.password=your_password
```

### Run Application

```bash
mvn clean install

mvn spring-boot:run
```

Application runs at:

```text
http://localhost:8080
```

---

## 📸 Screenshots

### 🏠 Home Page

<img width="1773" height="896" alt="image" src="https://github.com/user-attachments/assets/d72b27fe-0774-42bf-921a-8d05b1768228" />


### 🍎 Product Listing

Add Screenshot Here

### 🛒 Shopping Cart

Add Screenshot Here

### 📦 Order Management

Add Screenshot Here

### ⚙️ Admin Dashboard

Add Screenshot Here

---

## 🎯 Learning Outcomes

Through this project, I gained practical experience in:

- Full-Stack Web Development
- Spring Boot Application Development
- Hibernate ORM
- REST API Design
- Authentication & Authorization
- Database Design
- Cloud Deployment
- Git & GitHub Workflow
- Responsive UI Development

---

## 🚀 Future Enhancements

- Online Payment Gateway Integration
- Order Tracking System
- Admin Analytics Dashboard
- Product Reviews & Ratings
- Wishlist Feature
- Email Notifications
- JWT Authentication

---

## 👨‍💻 Author

### Jafar Sadiq

📧 Email: jafarsadiq.dev@gmail.com

🔗 GitHub: https://github.com/Jafars07

🔗 LinkedIn: https://linkedin.com/in/jafar-sadiq

---

## ⭐ Support

If you found this project useful, please consider giving it a **Star ⭐** on GitHub.

Your support motivates future improvements and helps others discover the project.
