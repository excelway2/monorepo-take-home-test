import { Component } from '@angular/core';
import { Priority, Project, SingleProjectRes } from '../models/project';
import { ProjectsService } from '../projects.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'monorepo-take-home-test-view-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-project.component.html',
  styleUrl: './view-project.component.css'
})
export class ViewProjectComponent {

  imageUrl =
    'https://www.excelway.co/wp-content/uploads/2021/03/logo-color-h.svg';

    id: string= ""
  

  myProject: Project = {
    id: "",
    title: "",
    description: undefined,
    created_at: new Date(),
    updated_at: new Date(),
    priority: Priority.LOW,
    order: 0
  };

  constructor(
    private projectService: ProjectsService,
    private route: ActivatedRoute){}  
  
    ngOnInit(): void {
      this.route.params.subscribe((params: any) => {
        if (params.id) {
          this.id = params.id;
          this.getProjectDetails(this.id);
        }
      });
    }
  
    getProjectDetails(id: string) {
      this.projectService.getOnlyProject(id).subscribe((res: SingleProjectRes) => {
          this.myProject = res.project;
          console.log(this.myProject)
        },
        (error) => {
          console.error(error);
        }
      );
    }

}
