🍎 Fruit Bazaar

A full-stack e-commerce web application designed to simplify the online purchase of fresh fruits. Fruit Bazaar provides a seamless shopping experience with secure user authentication, product browsing, cart management, and order processing. The platform also includes a dedicated admin dashboard for managing products, inventory, and customer orders efficiently.

🚀 Features
👤 User Features
Secure User Registration and Login
OTP-Based Authentication
Browse Fruits by Category
Search and Filter Products
Add Products to Shopping Cart
Place and Track Orders
Responsive User Interface
Dark/Light Theme Support
Secure Session Management
🛠️ Admin Features
Admin Authentication
Add New Products
Update Product Information
Delete Products
Manage Product Inventory
View and Manage Customer Orders
Monitor Platform Activity
🏗️ Tech Stack
Frontend
HTML5
CSS3
JavaScript
Bootstrap
Backend
Java
Spring Boot
Spring MVC
Hibernate (JPA)
RESTful APIs
Database
PostgreSQL (Production)
MySQL (Development)
Cloud & Services
Render (Application Hosting)
Supabase (Database Hosting)
Cloudinary (Image Storage)
Tools & Technologies
Maven
Git & GitHub
IntelliJ IDEA / Eclipse
Postman
📂 Project Structure
Fruit-Bazaar
│
├── src
│   ├── main
│   │   ├── java
│   │   │   ├── controller
│   │   │   ├── service
│   │   │   ├── repository
│   │   │   ├── entity
│   │   │   └── config
│   │   │
│   │   ├── resources
│   │   │   ├── application.properties
│   │   │   └── static
│   │   │
│   │   └── webapp
│
├── pom.xml
├── README.md
└── screenshots
✨ Key Functionalities
Authentication System
User Registration with OTP Verification
Secure Login & Logout
Password Encryption using BCrypt
Forgot Password & Password Reset Functionality
Product Management
Product Listing
Product Search & Filtering
Product Categorization
Product Image Management
Shopping Experience
Add to Cart
Quantity Management
Order Placement
Order Confirmation
Admin Dashboard
Product CRUD Operations
Inventory Management
Customer Order Monitoring
⚙️ Installation & Setup
Prerequisites
Java 17+
Maven
PostgreSQL or MySQL
Git
IDE (IntelliJ IDEA / Eclipse / VS Code)
Clone the Repository
git clone https://github.com/Jafars07/Fruit-Bazaar.git
cd Fruit-Bazaar
Configure Database

Create a database:

CREATE DATABASE fruit_bazaar;

Update your database credentials in:

spring.datasource.url=jdbc:mysql://localhost:3306/fruit_bazaar
spring.datasource.username=your_username
spring.datasource.password=your_password
Run the Application
mvn clean install
mvn spring-boot:run

Application will be available at:

http://localhost:8080
📸 Screenshots
🏠 Home Page
<img width="902" height="827" alt="image" src="https://github.com/user-attachments/assets/44c8430c-d17d-4f7e-ba55-484475968f80" />

(Add Screenshot)

🍎 Product Listing

(Add Screenshot)

🛒 Shopping Cart

(Add Screenshot)

📦 Order Management

(Add Screenshot)

⚙️ Admin Dashboard

(Add Screenshot)

🎯 Learning Outcomes

This project helped me gain practical experience in:

Full-Stack Web Application Development
Spring Boot & REST API Development
Hibernate & JPA ORM
Database Design and Management
Authentication & Authorization
Session Management
Cloud Deployment
Version Control with Git & GitHub
Responsive Web Design
Real-World E-Commerce Application Development
🌐 Live Demo

🔗 Application URL
https://fruit-bazaar.onrender.com

👨‍💻 Author
Jafar Sadiq
GitHub: https://github.com/Jafars07
LinkedIn: https://linkedin.com/in/jafar-sadiq
⭐ Support

If you found this project helpful, consider giving it a Star ⭐ on GitHub. Your support helps improve the project and encourages future development.
