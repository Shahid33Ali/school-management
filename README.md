# School Management System

## Objective

The goal of this project is to develop a backend API for managing a school system. The API allows for the management of students, teachers, and classes, including storing profile images on Cloudinary.
Also bonus features of Attendance, Exams , Results and Report Genreration are also added
---

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **File Storage**: Cloudinary and Multer as miiddleware for storing profile images
- **Authentication**: JWT (JSON Web Tokens)
- **Pdf Generator**: pdfkit
  
---

## Features

### **1. Students**
- Add a new student.
- Get all students with pagination and class filtering.
- Get a single student by ID.
- Update a student’s information (name, class, profile image).
- Soft delete a student.

### **2. Teachers**
- Add a new teacher.
- Get all teachers with pagination.
- Get a teacher by ID.
- Update a teacher’s information (name, subject, profile image).
- Soft delete a teacher.

### **3. Classes**
- Create a class.
- Assign a teacher to a class.
- Get all classes with pagination.
- Update class details (name, teacher).
- Delete a class.

### **4. Authentication**
- JWT-based authentication for admin access.
- Protect routes to ensure only authorized users can perform operations.

### **5. Profile Image Management**
- Upload and update profile images for students and teachers using Cloudinary.

---

## Optional Bonus Features

- Attendance tracking for students.
- Manage exams and results for students.
- Generate reports for a class listing all students and their assigned teacher.

---

## API Endpoints

### Base URL: `http://localhost:3000/api` (or replace with your deployed URL)

#### **Authentication**
- **POST** `/auth/login`: Logs in an admin user (returns JWT token).
- **POST** `/auth/register`: Registers a new admin user.

#### **Students**
- **POST** `/students`: Adds a new student.
  - **Request Body:**
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "classId": "ObjectId",
      "profileImageUrl": "Cloudinary_URL"
    }
    ```

- **GET** `/students`: Fetches all students with optional filtering by class.
- **GET** `/students/:id`: Fetches a student by ID.
- **PUT** `/students/:id`: Updates a student’s details.
  - **Request Body:**
    ```json
    {
      "name": "John Doe",
      "email": "john_updated@example.com",
      "classId": "Updated_ClassId",
      "profileImageUrl": "Updated_Cloudinary_URL"
    }
    ```

- **DELETE** `/students/:id`: Soft deletes a student.

#### **Teachers**
- **POST** `/teachers`: Adds a new teacher.
  - **Request Body:**
    ```json
    {
      "name": "Jane Smith",
      "email": "jane@example.com",
      "subject": "Math",
      "profileImageUrl": "Cloudinary_URL"
    }
    ```

- **GET** `/teachers`: Fetches all teachers.
- **GET** `/teachers/:id`: Fetches a teacher by ID.
- **PUT** `/teachers/:id`: Updates a teacher’s details.
  - **Request Body:**
    ```json
    {
      "name": "Jane Smith",
      "subject": "Science",
      "profileImageUrl": "Updated_Cloudinary_URL"
    }
    ```

- **DELETE** `/teachers/:id`: Soft deletes a teacher.

#### **Classes**
- **POST** `/classes`: Creates a new class.
  - **Request Body:**
    ```json
    {
      "name": "Grade 10A",
      "teacherId": "Teacher_ObjectId",
      "studentCount": 30
    }
    ```

- **GET** `/classes`: Fetches all classes.
- **GET** `/classes/:id`: Fetches a class by ID.
- **PUT** `/classes/:id`: Updates class details.
  - **Request Body:**
    ```json
    {
      "name": "Grade 10B",
      "teacherId": "Updated_Teacher_ObjectId"
    }
 
