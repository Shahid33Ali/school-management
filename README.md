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
- Add a new student, Get all students with pagination ,delete,update, photo uploadatiion etc.

### **2. Teachers**
- Add a new teacher, Get all teachers with pagination and filtering,Photo Uploadation, Assigning to class etc.

### **3. Classes**
- Adding classes updatiing them and also aitomatically increasing count on an addition to class of a student.

### **4. Authentication**
- JWT-based authentication for admin access.
- Protect routes to ensure only authorized users can perform operations.

### **5. Profile Image Management**
- Upload and update profile images for students and teachers using Cloudinary and Multer.

### **6. Pdf Gemeration of a Class with Class and Teachers**
- endpint to download pdf directly as pdf as mentioned in api emdpoimt of report generation.

### **7. Zod validation of Request Body**
- Body validations so that validated request go to the database.

### **8. Attendance Tracking and Marking**
- attendance marking endpoints for all classes and tracking using get requests.

### **9. Exams and Marks Generation**
- Exams and Results Generation of students.
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
- **PUT** `/teachers/:id/upload/photo`: allows student to add photo by themeselves the other PUT request is authenticated.
-   - **Request Body:**
    ```json
    {
      "image": "Updated_image_URL"
    }
    ```

#### **Classes**
- **POST** `/classes`: Creates a new class. Recommended to not give count as we add student he/she will be directly added to class and increase count
  - **Request Body:**
    ```json
    {
      "name": "Grade 10A",
      "teacherId": "Teacher_ObjectId",
      "studentCount": 30 
    }
    ```

- **GET** `/classes/?page=2`: Fetches all classes with pagination and filtering using request paramaters such as page .
- **GET** `/classes/:id`: Fetches a class by ID.
- **DELETE** `/classes/:id`: Soft deletes a class.
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
 - **GET** `/results/:id`: Fetches a exam by id .
   
 #### **Report Generation in Pdf**
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
   
 ---

## Environment Variables

The project requires the following environment variables to be set up in a `.env` file:

```plaintext
# Cloudinary configuration for storing profile images
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Database connection URL
DB_URL=your_database_url

# JWT Secret for authentication
JWT_SECRET=your_jwt_secret

# Admin credentials for initial setup
ADMIN_USER=your_admin_email
ADMIN_PASSWORD=your_admin_password

#PORT
PORT=The port of your choice

```

## Project Setup

Follow these steps to set up and run the project locally:

### 1. Clone the Repository
```bash
git clone https://github.com/Shahid33Ali/school-management.git
cd school-management
npm install
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables
Create a .env file in the root directory and add the following environment variables as mentioned in the environment variables

### 4. Run the Server
- for development
 
```bash
npm run dev
```
- for production
  
```bash
npm start
```


