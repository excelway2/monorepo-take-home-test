# Full-Stack Take-Home Test

## Overview

This take-home test involves developing a project management application using Angular (frontend) and NestJS with Prisma (backend), managed within an Nx monorepo. The application will focus on managing projects and boards, with an emphasis on tasks management including priority setting and interactive features.

## Estimated Time for Completion

- **Junior Developer**: Approximately 4-6 hours.
- **Senior Developer**: Approximately 2-3 hours.

These are guidelines and actual times may vary based on individual experience and familiarity with the specific technologies used.

### Task Description

Your task is to implement a project management application with the following features:

- **Projects**: View a list of all projects, each displaying the count of tasks.
- **Boards**: View boards within a project, with functionality to navigate to board details.
- **Tasks**: Within a board, implement functionality to add, update, delete, and reorder tasks.

Refer to the `SPECIFICATIONS.md` file for detailed requirements on the application features, including user interface and navigation guidelines.

### Bonus Challenge

- **Task Priority Colors**: As an optional enhancement, implement a feature to visually represent task priority (Low, Medium, High) by changing the color of the task cards or list elements.

### Submission Guidelines

- Ensure your application meets as many of the outlined requirements as possible.
- Document any assumptions or decisions you made in the `NOTES.md` file.
- If you are unable to finish all aspects of the test, please still submit what you have completed. We are interested in seeing your approach and understanding your thought process.
- Once you are ready, push your changes to a new branch and open a pull request for review.

## Evaluation Criteria

- Functionality: Does the application work as required? What functionalities were implemented?
- Code Quality: Is the code clean, well-organized, and properly documented?
- User Interface: Is the UI functional, user-friendly, and aligned with the specifications?
- Integration: How effectively does the frontend communicate with the backend, especially in task management and data presentation?

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
