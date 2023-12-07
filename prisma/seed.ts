import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create multiple projects
  const projects = [
    { title: 'Project Alpha', content: 'Description of Project Alpha' },
    { title: 'Project Beta', content: 'Description of Project Beta' },
    { title: 'Project Gamma', content: 'Description of Project Gamma' },
    { title: 'Project Delta', content: 'Description of Project Delta' },
  ];

  for (const project of projects) {
    const createdProject = await prisma.project.create({
      data: project,
    });

    // Seed some boards for each project
    await prisma.board.createMany({
      data: [
        {
          title: 'Board 1',
          content: 'Board 1 of ' + project.title,
          projectId: createdProject.id,
        },
        {
          title: 'Board 2',
          content: 'Board 2 of ' + project.title,
          projectId: createdProject.id,
        },
        {
          title: 'Board 3',
          content: 'Board 3 of ' + project.title,
          projectId: createdProject.id,
        },
        {
          title: 'Board 4',
          content: 'Board 4 of ' + project.title,
          projectId: createdProject.id,
        },
        {
          title: 'Board 5',
          content: 'Board 5 of ' + project.title,
          projectId: createdProject.id,
        },
      ],
    });
  }
}

main()
  .catch((err) => {
    console.error(err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
