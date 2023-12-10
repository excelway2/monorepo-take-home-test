import { UpdateprojectComponent } from './../../../../libs/ui/src/lib/updateproject/updateproject.component';
import { CreateprojectComponent } from './../../../../libs/ui/src/lib/createproject/createproject.component';
import { ProjectdetailsComponent } from './../../../../libs/ui/src/lib/projectdetails/projectdetails.component';
import { Route } from '@angular/router';
import { ProjectsComponent } from '@monorepo-take-home-test/ui';

export const appRoutes: Route[] = [
  { path: '', component: ProjectsComponent },
  { path: 'projects/create', component: CreateprojectComponent },
  { path: 'projects/:id', component: ProjectdetailsComponent },
  { path: 'projects/edit/:id', component: UpdateprojectComponent },


];

