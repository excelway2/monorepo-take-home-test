import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsService } from '../projects.service';
import { Observable } from 'rxjs';
import { Project } from '@prisma/client';
import { ViewProjectComponent } from '../view-project/view-project.component';

@Component({
  selector: 'monorepo-take-home-test-projects',
  standalone: true,
  imports: [CommonModule,ViewProjectComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent implements OnInit {
  // public $projects: Observable<Project[]> = new Observable<Project[]>();
  projects:Project[]=[];
  modalVisibleView:boolean=false;
  projectSelected!:Project;

  imageUrl =
    'https://www.excelway.co/wp-content/uploads/2021/03/logo-color-h.svg';

  constructor(public projectsService: ProjectsService) {}

  ngOnInit(): void {
    // this.$projects = this.projectsService.getAllProjects();
    this.getAllProjects();
  }
  getAllProjects(){
this.projectsService.getAllProjects().subscribe(data=>this.projects=data)
  }
  
  visible(project:Project){
    this.modalVisibleView=!this.modalVisibleView;
    this.projectSelected=project;
  }
  deletProjectById(projectId:string){
    this.projectsService.deleteProject(projectId).subscribe(
      () => {
        console.log('Project deleted successfully.'+projectId);
        // Optionally, you can perform additional actions after successful deletion.
      },
      (error) => {
        console.error('Error deleting project:', error);
        // Handle error scenarios if needed.
      }
    );

  }
  
}
