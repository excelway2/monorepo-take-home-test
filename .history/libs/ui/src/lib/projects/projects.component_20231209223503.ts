// Import necessary Angular Material modules and other dependencies
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsService } from '../projects.service';
import { Observable, throwError } from 'rxjs';
import { Project } from '@prisma/client';
import { catchError, map, take } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { EditProjectComponent } from './components/edit-project/edit-project.component';
import { EditProjectService } from './services/edit-project.service';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  // Component selector and properties
  selector: 'monorepo-take-home-test-projects',
  standalone: true,

  // Imported modules for the component
  imports: [
    CommonModule,
    AddProjectComponent,
    EditProjectComponent,
    RouterLink,
    RouterOutlet,
    DragDropModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  
  // Component's HTML and CSS files
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent implements OnInit {
  // Declaration of variables
  public $projects: Observable<Project[]> = new Observable<Project[]>();
  imageUrl = 'https://www.excelway.co/wp-content/uploads/2021/03/logo-color-h.svg';

  constructor(public projectsService: ProjectsService, private _editProjectService: EditProjectService) {}

  ngOnInit(): void {
    // Load projects on component initialization
    this.loadProjects();    
  }

  // Function to load projects
  loadProjects = () => {
    this.$projects = this.projectsService.getAllProjects();
  }

  // Function to delete a project
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

  // Function to handle the drop event for reordering projects
  // I still have a bug in this method and exactly when i drop the item (i can't retrieve the correct data at the drop event)
  onDrop(event: CdkDragDrop<Project[]>): void {
    if (event.previousIndex !== event.currentIndex && event.currentIndex >= 0) {
      this.$projects.pipe(take(1)).subscribe((projects) => {
        if (event.previousIndex !== event.currentIndex && projects) {
          const projectId1 = projects[event.previousIndex].id;
          const order1 = event.previousIndex;
          const projectId2 = projects[event.currentIndex].id;
          const order2 = event.currentIndex;

          // Call service method to update project order
          this.projectsService.updateOrderBetweenProjects(projectId1, order1, projectId2, order2)
            .pipe(
              catchError(error => {
                console.error('Error updating order between projects:', error);
                return [];
              })
            )
            .subscribe(() => {
              this.loadProjects(); // Reload projects after reordering
            });
        }
      });
    }
  }
}
