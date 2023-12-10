import { Route } from '@angular/router';
import { ProjectsComponent, UiComponent } from '@monorepo-take-home-test/ui';
import { EditProjectComponent } from './edit-project/edit-project.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: ProjectsComponent,
    title: 'Home page',
  },
  {
    path: 'edit/:id',
    component: EditProjectComponent,
    title: 'Home details',
  },
];
