# Project Management Application Specifications

## Overview

This document outlines the specifications for enhancing a project management application. Built using Angular (frontend) and NestJS with Prisma (backend), the application focuses on managing projects, boards, and tasks, with an added functionality to display the count of tasks within each project. An initial setup and a 'get all projects' service implementation are provided as examples.

## Core Functionalities

### 1. Projects

- **View Projects**: Enhance the existing implementation to display a list of all projects. Each project should include the title and a dynamically calculated count of all tasks within it.
- **Interactive Navigation**: Implement interactive navigation to view details of each project's boards.

### 2. Boards

- **View Boards**: Develop functionality to view boards within a selected project, displaying each board's title and a summary of tasks.
- **Board Details**: Create a detailed view for each board, accessible by clicking on a board, showing the tasks associated with it.

### 3. Tasks

- **Task Management**: Enable users to create, delete, and update tasks within a board.
- **Interactive Task Reordering**: Implement drag-and-drop functionality to reorder tasks within a board.
- **Task Display**: Present tasks using either a list or card format to enhance visual appeal and interactivity.

## Bonus Challenge

- **Task Priority Colors**: Implement a visual representation of task priority. This can be done by applying different colors or styles to tasks based on their priority level (Low, Medium, High). Consider using conditional class binding or other Angular techniques to achieve this.

## User Interface and Navigation

### Utilizing Angular Material

- Use Angular Material for UI components to ensure a cohesive and user-friendly design. Customize styling as needed.
- For tasks, `MatList` or `MatCard` can be used depending on the chosen format. Ensure that the drag-and-drop functionality is intuitive in both formats.

### Routing

- Implement intuitive routing to facilitate smooth navigation between projects, boards, and task details.

## API Endpoints

### Projects

- `GET /projects`: Enhance to include the count of all tasks within each project.

### Boards

- `GET /boards/:projectId`: Implement to retrieve boards for a selected project, with task summary.

### Tasks

- `POST /tasks`: Add a new task within a board.
- `GET /tasks/:boardId`: Fetch tasks for a specific board.
- `PUT /tasks/:taskId`: Update a task, including its priority.
- `DELETE /tasks/:taskId`: Remove a task.
- `PUT /tasks/:taskId/reorder`: Modify the order of tasks after drag-and-drop actions.

## Additional Guidelines

- Focus on creating an intuitive UI/UX using Angular Material. The tasks' display should facilitate easy interaction and task management.
- Ensure the application is responsive and accessible across different devices.
- Implement error handling, validation, and optionally data loading states to enhance user experience.

By tackling these specifications, you're not just building an application; you're sharpening your full-stack development skills with a practical, hands-on project. This is a chance to showcase your abilities in creating an intuitive and functional user interface. Enjoy the challenge and let your coding creativity flow!
