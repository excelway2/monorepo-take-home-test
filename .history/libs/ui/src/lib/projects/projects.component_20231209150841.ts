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
  public projects: Project[] = []
  
  imageUrl =
    'https://www.excelway.co/wp-content/uploads/2021/03/logo-color-h.svg';

  constructor(public projectsService: ProjectsService, private _editProjectService: EditProjectService) {}

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

  onDrop(event: CdkDragDrop<any[]>): void {
    const previousIndex = event.previousIndex;
    const currentIndex = event.currentIndex;
  
    this.projectsService.getAllProjects().pipe(
      take(1) // Take only the first emitted value to avoid memory leaks
    ).subscribe((projects: Project[]) => {
      // Reorder projects in the frontend
      const draggedProject = this.$projects[previousIndex];
      this.$projects = this.arrayMove(this.$projects, previousIndex, currentIndex);
  
      // Call API to update order between projects
      const projectId1 = projects[previousIndex].id;
      const projectId2 = projects[currentIndex].id;
      const order1 = previousIndex;
      const order2 = currentIndex;
  
      this.projectsService.updateOrderBetweenProjects(projectId1, order1, projectId2, order2)
        .subscribe(() => {
          // Success - Projects order updated in the backend
        }, error => {
          console.error('Error updating order between projects:', error);
          // Handle error as needed
        });
    });
  }
  
  // Function to reorder array elements
  arrayMove(array: any[], fromIndex: number, toIndex: number): any[] {
    const element = array[fromIndex];
    array.splice(fromIndex, 1);
    array.splice(toIndex, 0, element);
    return array;
  }
  
}