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
- Upload and update profile images for students and teachers using Cloudinary and Multer.

---

## Optional Bonus Features

- Attendance tracking for students.
- Manage exams and results for students.
- Generate reports for a class listing all students and their assigned teacher.

---

## API Endpoints

### Base URL: `http://localhost:3000/api` (or replace with your deployed URL)
### All endpoints i.e.  the post put and delete(except the upload photo put request in students and teacher routes) are authenticated for allowing only admin to do it.
### Only get request is free for all.

#### **Authentication**
- **POST** `/admin/login`: Logs in an admin user (returns JWT token).

#### **Students**
- **POST** `/students`: Adds a new student.
  - **Request Body:**
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "classId": "ObjectId",
      "image": "Photo Url"
    }
    ```

- **GET** `/students/page=1&classId=1234&`: Fetches all students with optional filtering by class and pages(10 per page)
- **GET** `/students/:id`: Fetches a student by ID.
- **PUT** `/students/:id`: Updates a student’s details.
  - **Request Body:**
    ```json
    {
      "name": "John Doe",
      "email": "john_updated@example.com",
      "classId": "Updated_ClassId",
      "image": "Updated_url"
    }
    ```

- **DELETE** `/students/:id`: Soft deletes a student.
- **PUT** `/students/:id/upload/photo`: allows student to add photo by themeselves the other PUT request is authenticated.


#### **Teachers**
- **POST** `/teachers`: Adds a new teacher.
  - **Request Body:**
    ```json
    {
      "name": "Jane Smith",
      "email": "jane@example.com",
      "subject": "Math",
      "image": "image_url"
    }
    ```

- **GET** `/teachers/?page=1&subject=Maths`: Fetches all teachers and gets response along with pagination and request parameters like paage and subject.
- **GET** `/teachers/:id`: Fetches a teacher by ID.
- **PUT** `/teachers/:id`: Updates a teacher’s details.
  - **Request Body:**
    ```json
    {
      "name": "Jane Smith",
      "subject": "Science",
      "image": "Updated_image_URL"
    }
    ```

- **DELETE** `/teachers/:id`: Soft deletes a teacher.
- **DELETE** `/teachers/:id`: Soft deletes a teacher.
- **PUT** `/teachers/:id/upload/photo`: allows student to add photo by themeselves the other PUT request is authenticated.
-   - **Request Body:**
    ```json
    {
      "image": "Updated_image_URL"
    }
    ```

#### **Classes**
- **POST** `/classes`: Creates a new class.
  - **Request Body:**
    ```json
    {
      "name": "Grade 10A",
      "teacherId": "Teacher_ObjectId",
      "studentCount": 30 //recommended to not give count as we add student he/she will be directly added to class and increase count
    }
    ```

- **GET** `/classes/?page=2`: Fetches all classes with pagination and filtering using request paramaters such as page .
- **GET** `/classes/:id`: Fetches a class by ID.
- **PUT** `/classes/:id`: Updates class details.
  - **Request Body:**
    ```json
    {
      "name": "Grade 10B",
      "teacherId": "Updated_Teacher_ObjectId"
    }
 
#### **Exams**
- **POST** `/exams`: Creates a new exam.
 - **Request Body:**
    ```json
    {
      "name": "Midterm Exam",
      "classId": "Class_ObjectId",
      "subject": "Maths",
      "date": "Date_of_Exam",
    }
   ```
- **GET** `/exams/?subject=Maths`: Fetches all exams and filtering using request paramaters such as subject .
- **GET** `/exams/:id`: Fetches a exam by id .

#### **Results**
- **POST** `/exams`: Creates results for all students of the class
 - **Request Body:**
    ```json
    {
      "examId": "Class_ObjectId",
      "results": [{
      "studentId":"121212",
      "marks":84
      },
      {"studentId":"12dda1212",
      "marks":64
      }
     ]
    }
   ```
 - **GET** `/results/?subject=Maths&classId=23131&studentId=3123131&grade=A&examId=313131`: Fetches all exams and filtering using request paramaters such as subject .
 -  **GET** `/results/:id`: Fetches a exam by id .
   
 #### **Report Gneration in Pdf**
 -  **GET** `/generate/report/:id`: Fetches a class by Id and all the students of the class and send a downloadable pdf document .

 #### **Attendance**
 - **POST** `/attendance`: Creates attendance for all students of the class (only once per day)
  - **Request Body:**
    ```json
    {
      "classId": "Class_ObjectId",
      "attendance": [{
      "studentId":"121212",
      "status":"Present"
      },
      {"studentId":"12dda1212",
      "attendance":"Absent"
      }
     ],
     "date":"10-11-2024"
    }
      ```
  - **PUT** `/attendance`: Updates attendance for all students of the class
  - **Request Body:**
    ```json
    {
      "classId": "Class_ObjectId",
      "attendance": [{
      "studentId":"121212",
      "status":"Present"
      },
      {"studentId":"12dda1212",
      "attendance":"Absent"
      }
     ],
     "date":"10-11-2024"
    }
    ```
 -  **GET** `/getAttendance/?classId=13131&studentId=31313&date=10-11-2024&status='Ansent'`: Fetching all the attendance and filtering based on the request parameters

