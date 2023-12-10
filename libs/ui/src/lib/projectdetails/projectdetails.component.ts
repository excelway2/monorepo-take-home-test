import { ActivatedRoute, ParamMap, RouterModule , Router} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Project } from '@prisma/client';
import { Observable } from 'rxjs';
import { ProjectsService } from '../projects.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'monorepo-take-home-test-projectdetails',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './projectdetails.component.html',
  styleUrl: './projectdetails.component.css'
})
export class ProjectdetailsComponent implements OnInit{

  constructor(public projectsService: ProjectsService , private activatedRoute: ActivatedRoute,  private router: Router) {}

  public $selectedProject: Observable<Project | null> = new Observable<Project | null>();
  imageUrl = 'https://www.excelway.co/wp-content/uploads/2021/03/logo-color-h.svg';

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
       const projectId = params.get('id');
       if (projectId !== null) {
         this.getProjectById(projectId);
       }
    });
   }

  getProjectById(id: string): void {
    this.$selectedProject = this.projectsService.getProjectById(id);

  }

  deleteProject(projectId: string) {
        this.projectsService.deleteProject(projectId).subscribe(
          () => {
            console.log('Project deleted successfully');
            this.router.navigate(['']);
          },
          (error) => {
            console.log('Error occurred while deleting project:', error);
          }
        );
     }
}
