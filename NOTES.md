// PrismaClient vs Custom Service

at the beginning of the project I intended to work with ProjectsService that has PrismaClient within it, but I changed my mind after facing some errors and got back to using PrismaClient since its all what the app needs since its a simple crud app.

//Http method

I worked with PATCH instead of PUT because PUT will send the all the fields data even the fields that weren t changed. PATCH sends only the changed fields which will minimize the data sent.

//Order incrementation

To not allow user to insert order , I implemendted the PRISMA built-in functionality for auto-incrementing  @default(autoincrement()). This was easier instead of creating a whole function I only added the autoincrement() to the prisma.schema.

// Try-Catch Blocks

I used Try-Catch Blocks only based on my experience with Node/Express. However, I will defenitely consider trying Exception Filters and Global Exception Filters in my future nestJs projects.

// For the Front-End I had a learning curve

Working with the Nx monorepo structure was a bit tricky, especially with the switch to Angular 17. I've realized that understanding how Nx organizes things is important. So, I'm taking some time to figure out the workflow.

I had also issues to bypass the standlone error, since it became the new default in angular 17. This turned out to be a chance to explore the Angular 17 more deeply.