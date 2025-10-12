# Expense-Tracker
A simple expense tracker application built with React and Spring Boot.
## Features
- Add, edit, and delete expenses
- View expenses by category and date
- Responsive design for mobile and desktop
## Technologies Used
Backend: Spring Boot, Firebase Admin SDK
Database: Firebase Cloud Firestore (or MongoDB, optional)
Authentication: Firebase Authentication
Push Notifications: Firebase Cloud Messaging (FCM)
Build Tool: Maven

## Prerequisites
Java 11 or higher
Spring Boot 2.5 or higher
Firebase project (creates service account, enables Auth, Firestore, FCM)
Maven

## Architecture of Backend
The backend of the Expense Tracker application is built using Spring Boot, which provides a robust framework for developing RESTful APIs. The architecture follows a layered approach, separating concerns into different layers for better maintainability and scalability.
### Layers
1. **Controller Layer**: This layer handles incoming HTTP requests and maps them to appropriate service
    methods. It uses Spring's `@RestController` annotation to define REST endpoints.
2. **Service Layer**: This layer contains the business logic of the application. It processes data received from the controller layer and interacts with the repository layer to perform CRUD operations.
3. **Repository Layer**: This layer is responsible for data access and interaction with the database. It uses Spring Data JPA to simplify database operations and provides an abstraction over the underlying data source.
4. **Model Layer**: This layer defines the data structures used in the application, typically represented as Java classes annotated with JPA annotations to map them to database tables.
### Technologies    
- **Spring Boot**: Provides the framework for building the backend application.
- **Spring Data JPA**: Simplifies database interactions and provides a repository abstraction.
- **Hibernate**: An ORM (Object-Relational Mapping) tool used for mapping Java objects to database tables.
- **Firebase**: Used for authentication, push notifications, and real-time database functionalities.


