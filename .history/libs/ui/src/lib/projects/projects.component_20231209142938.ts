import { RouterLink, RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsService } from '../projects.service';
import { Observable, throwError } from 'rxjs';
import { Project } from '@prisma/client';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2'
import { AddProjectComponent } from './components/add-project/add-project.component';
import { EditProjectComponent } from './components/edit-project/edit-project.component';


@Component({
  selector: 'monorepo-take-home-test-projects',
  standalone: true,
  imports: [
    CommonModule,
    AddProjectComponent,
    EditProjectComponent,
    RouterLink,
    RouterOutlet
  ],
  
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent implements OnInit {
  public $projects: Observable<Project[]> = new Observable<Project[]>();
  imageUrl =
    'https://www.excelway.co/wp-content/uploads/2021/03/logo-color-h.svg';

  constructor(public projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.$projects = this.projectsService.getAllProjects();
  }

  delete = (id: string): void => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.projectsService.deleteProject(id).pipe(
          catchError((error) => {
            console.error('Error deleting project:', error);
            // Rethrow the error for further handling if needed
            return throwError(error);
          })
        ).subscribe(deletedProject => {
          console.log('deleted project => ', deletedProject);
    
          // Remove the deleted project from the observable data
          this.$projects = this.$projects.pipe(
            map(projects => projects.filter(project => project.id !== id))
          );
        });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });   
  }

  onDrop(event: CdkDragDrop<Project[]>): void {
    const previousIndex = event.previousIndex;
    const currentIndex = event.currentIndex;

    // Rearrange the projects array based on the drag-and-drop action
    const projects = this.$projects.getValue(); // Retrieve the projects from the observable
    const draggedProject = projects[previousIndex];

    // Remove the dragged project from its previous position
    projects.splice(previousIndex, 1);
    // Insert the dragged project at the new position
    projects.splice(currentIndex, 0, draggedProject);

    // Update the projects observable with the new order
    this.$projects.next(projects);

    // Call your service method to update the backend with the new order
    // this.projectsService.updateProjectsOrder(projects);
  }
}