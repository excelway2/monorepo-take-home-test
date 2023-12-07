# Full-Stack Take-Home Test

## Overview

This take-home test involves developing a simple project management application using Angular (frontend) and NestJS with Prisma (backend), managed within an Nx monorepo. The application will focus on managing projects, allowing users to view, create, edit, and delete projects, with an emphasis on simplicity and basic functionality.

## Estimated Time for Completion

- **Junior Developer**: Approximately 1-3 hours.

These are guidelines and actual times may vary based on individual experience and familiarity with the specific technologies used.

## Task Description

Your task is to implement a project management application with the following features:

- **Projects**: Implement functionality to view, add, edit, and delete projects. Each project should have a title, description, and priority.

### Bonus Challenge

- **Drag-and-Drop Reordering**: As an optional enhancement, implement drag-and-drop functionality to reorder the projects in the list or card view.

Refer to the `SPECIFICATIONS.md` file for detailed requirements on the application features, including user interface and navigation guidelines.

### Submission Guidelines

- Ensure your application meets as many of the outlined requirements as possible.
- Document any assumptions or decisions you made in the `NOTES.md` file.
- If you are unable to finish all aspects of the test, please still submit what you have completed. We are interested in seeing your approach and understanding your thought process.
- Once you are ready, push your changes to a new branch and open a pull request for review.

## Evaluation Criteria

- Functionality: Does the application work as required? What functionalities were implemented?
- Code Quality: Is the code clean, well-organized, and properly documented?
- User Interface: Is the UI functional, user-friendly, and aligned with the specifications?
- Integration: How effectively does the frontend communicate with the backend, especially in project management?

We appreciate the time and effort you put into this test. Good luck!

## Getting Started

### Prerequisites

- Node.js (LTS version)
- npm (or yarn)
- Docker (for running the PostgreSQL database)
- Git

### Setting Up the Project

1. **Clone the Repository**

   ```
   git clone [repository-url]
   ```

1. **Cd to the Repository**

   ```
   cd [repository-name]
   ```

1. **Install Dependencies**

   ```
   npm install
   ```

1. **Database Setup**

- Set up the PostgreSQL database using Docker:

  ```
   docker-compose up -d postgres
  ```

- Run the database migrations:

  ```
  npx prisma migrate dev
  ```

- Seed the database with initial data:

  ```
  npx prisma db seed
  ```

- **Using Prisma Studio**:
  Prisma Studio is an intuitive GUI for exploring and manipulating your database. It's an excellent tool for visualizing the data model and managing the data within your database. To use Prisma Studio:

- Start Prisma Studio by running:
  ```
  npx prisma studio
  ```
- Prisma Studio will open in your default web browser.
- Use the GUI to explore your database tables, view records, and even insert or modify data if needed.
- This can be particularly useful for verifying the results of your API operations and understanding the database schema.

5. **Start the Applications**

- Start the NestJS backend:

  ```
  npx nx serve backend-nest
  ```

- In a new terminal, start the Angular frontend:

  ```
  npx nx serve frontend-angular
  ```

6. **Access the Application**

- The frontend application will be available at `http://localhost:4200`.
- The backend API will be running on `http://localhost:3333`.
