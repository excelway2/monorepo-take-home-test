import { Route } from '@angular/router';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { AddProjectComponent } from './path-to-add-project-component';

export const appRoutes: Route[] = [
    // {path: '', component: ProjectsComponent},
    {path: 'add', component: AddProjectComponent}
];
