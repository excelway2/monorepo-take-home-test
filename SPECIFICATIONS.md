# Project Management Application Specifications

## Overview

This document outlines the specifications for enhancing a project management application. Built using Angular (frontend) and NestJS with Prisma (backend), the application is designed to manage projects, featuring functionalities such as adding, updating, and deleting projects, along with managing their order and priority.

## Core Functionalities

### Projects

- **View Projects**: Implement functionality to display a list of all projects, showing the title, description, priority, and order.
- **Create Projects**: Allow users to add new projects with title, description, and priority.
- **Update Projects**: Enable editing the details of existing projects.
- **Delete Projects**: Provide the option to remove projects.
- **Maintain Order**: Implement logic to automatically assign and update the `order` field when projects are added or deleted.

### API Endpoints

- `GET /projects`: Retrieve all projects, sorted by the `order` field.
- `POST /projects`: Create a new project. The `order` field should be set to place the new project at the end of the list.
- `PUT /projects/:id`: Update an existing project.
- `DELETE /projects/:id`: Delete a project and adjust the `order` of remaining projects.

## Optional Bonus Challenge

- **Drag-and-Drop Reordering**: As an additional feature, implement drag-and-drop functionality to reorder projects within the list. This will involve updating the `order` field in the database based on the new order after a drag-and-drop action.

## User Interface and Navigation

### Utilizing Angular Material

- Use Angular Material components for a cohesive and user-friendly design.
- Implement forms for creating and updating projects, ensuring validation for required fields.
- If implementing the drag-and-drop feature, consider using Angular's CDK Drag-and-Drop module.

### Routing

- Include a route to a detailed view page for each project, where users can view more information and possibly edit or delete the project.

## Additional Guidelines

- Focus on a clean and intuitive UI/UX.
- Ensure the application is responsive and accessible across different devices.
- Properly handle errors and validations both on the frontend and backend.

By adhering to these specifications, you will create a functional project management application, focusing on fundamental full-stack development skills with an emphasis on data management and user interaction.
