import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { RouterLink, RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsService } from '../projects.service';
import { Observable, throwError } from 'rxjs';
import { Project } from '@prisma/client';
import { catchError, map, take } from 'rxjs/operators';
import Swal from 'sweetalert2'
import { AddProjectComponent } from './components/add-project/add-project.component';
import { EditProjectComponent } from './components/edit-project/edit-project.component';
import { EditProjectService } from './services/edit-project.service';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';



@Component({
  selector: 'monorepo-take-home-test-projects',
  standalone: true,
  imports: [
    CommonModule,
    AddProjectComponent,
    EditProjectComponent,
    RouterLink,
    RouterOutlet,
    DragDropModule,
    MatCardModule,
    MatButtonModule,
  ],
  
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent implements OnInit {
  public $projects: Observable<Project[]> = new Observable<Project[]>();
  public projects: Project[] = []
  
  imageUrl =
    'https://www.excelway.co/wp-content/uploads/2021/03/logo-color-h.svg';

  constructor(public projectsService: ProjectsService, private _editProjectService: EditProjectService) {}

  ngOnInit(): void {
   this.loadProjects()
    this.$projects.subscribe(prj => {
      this.projects = prj
    })
  }

  loadProjects = () => {
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
    console.log('Previous index:', event.previousIndex);
    console.log('Current index:', event.currentIndex);

    // Reorder projects in the frontend
    moveItemInArray(this.projects, event.previousIndex, event.currentIndex);

    // Update order field in each project object
    this.projects.forEach((project, index) => {
      project.order = index + 1; // Update order based on the new index
    });

    // Update the backend with the new order information for each project
    this.projects.forEach((project) => {
      this._editProjectService.updateProject(project.id, { order: project.order })
        .pipe(
          catchError(error => {
            console.error('Error updating project order:', error);
            // Handle error as needed
            return [];
          })
        )
        .subscribe(updatedProject => {
          // Handle success response if needed
          console.log('Updated project order:', updatedProject);
         this.loadProjects()
        });
    });
  }
}