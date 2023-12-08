import { Route } from '@angular/router';
import { HomeComponent } from '../app/components/Home/home.component';
import { ProjectDetailComponent } from '../app/components/Details/project-detail.component';
import { AddProjectComponent } from '../app/components/AddProject/add-project.component';

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'projects/:id', component: ProjectDetailComponent },
  { path: 'add-project', component: AddProjectComponent },
];
