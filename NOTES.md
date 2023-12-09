# Drag and drop highlighted ideas for implementation:

I have tried to implement te drag and drop feature using several methods, but I couldn't manage to make it work:

## ====> Here are some code snippets approaching the solution:

- Import the DragDropModule from @angular/cdk/drag-drop in the app.module.ts

- In the home.component.html, I implemented drag and drop behavior:

```
<div class="container">
  <h1>Welcome To Our Swimlane</h1>
  <button class="btn button add-button" (click)="navigateToAddProject()">Add Project</button>
  <div class="cards">
    <div *ngFor="let project of projects" class="card-container" cdkDrag>
      <mat-card class="cards" cdkDropList (cdkDropListDropped)="onDrop($event)">
        <mat-card-title>{{ project.title }}</mat-card-title>
        <mat-card-subtitle>{{ project.createdAt | date }}</mat-card-subtitle>
        <mat-card-content class="description">{{ project.description }}</mat-card-content>
        <mat-card-content class="order">Order: {{ project.order }}</mat-card-content>
        <button class="btn button view-button" (click)="viewProject(project.id)">View Project</button>
      </mat-card>
    </div>
  </div>
</div>
```

- In the home.component.ts, I defined the onDrop function to handle the drop event:

```
  onDrop(event: CdkDropListDroppedEvent<Project>) {
    const droppedProject = event.item.data;
    const previousIndex = event.previousIndex;
    const currentIndex = event.currentIndex;

    this.updateProjectOrder(droppedProject, previousIndex, currentIndex);

    this.projectService.updateProject(droppedProject.id, {
        order: currentIndex + 1,
    }).subscribe(() => {
    }, (error) => {
        console.error(error);
    });
}
```

- In the project.service.ts, I create a function to update the order property of the projects based on their positions:

```
    updateProjectOrder(project: Project, previousIndex: number, currentIndex: number) {
  project.order = currentIndex + 1; 

  if (previousIndex < currentIndex) {
    for (let i = previousIndex + 1; i <= currentIndex; i++) {
      this.projects[i].order--;
    }
  } else if (previousIndex > currentIndex) {
    for (let i = currentIndex; i < previousIndex; i++) {
      this.projects[i].order++;
    }
  }
}
```




